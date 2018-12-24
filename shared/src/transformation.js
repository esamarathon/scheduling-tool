import _ from 'lodash'
import { hasCircularReference } from './calculateSchedule'

class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}

function mergeWithCustomizerReplaceArray (objValue, srcValue) {
  return (_.isArray(objValue) && _.isArray(srcValue)) ? srcValue : undefined
}

/**
 * Validate a transformation can be applied to the current event state
 *
 * If this returns true, the transformation is valid for the current event state and can be safely applied.
 *
 * Validation is carried out in two steps:
 *  * First all actions are validated individually to ensure they are syntactically correct and can be applied
 *    as an operation on the current event state.
 *  * Then all items modified by the transformation are validated against the outcome of applying the transformation
 *    to the current event state. This does not yet modify the state.
 *    This ensures that all accepted transformations always mutate a valid event state into another valid event state.
 *
 * @param {Object} transformation Transformation to validate
 * @param {function} lookupItem Function (model, id) => item which returns the instance of reference id @id of model @model or undefined if it cannot be found.
 *                              Needs to support at least model === 'event', model === 'schedule' and model === 'element'
 *
 * @returns {boolean} true if the transformation is valid and can be applied
 * @raises Validation errors
 */
function validateTransformation (transformation, lookupItem) {
  // stores modifications carried out by the transformation
  const modifications = {}
  // Validate each action individually
  _.forEach(transformation.actions, (action) => validateAction(action, lookupItem, modifications))

  // Proxy lookup function that overlays the modifications over the real event state
  const proxyLookupItem = function (type, id) {
    // If no modifications for an item are collected, simply return the real one from the event state
    if (modifications[type]) {
      if (!modifications[type].hasOwnProperty(id)) {
        return lookupItem(type, id)
      }
    } else {
      return lookupItem(type, id)
    }

    const realObj = lookupItem(type, id)
    const modifiedObj = modifications[type][id]
    // Deletions of items are recorded as an explicit undefined in the modifications table
    // As we previously checked if the property exists, this yields no false positives on untouched items
    if (modifiedObj === undefined) return undefined
    // If we have an addition of an item, the lookup will not have found it, so we simply return the new item
    if (!realObj) return modifiedObj
    // In all other cases we create a copy of the item with the modifications merged in
    // Arrays need to be overwritten instead of merged, so we use a customizer for that
    return _.mergeWith({}, realObj, modifiedObj, mergeWithCustomizerReplaceArray)
  }

  // known good time references for shortcutting
  const knownGood = {}

  _.forEach(modifications, (group, type) => {
    _.forEach(group, (item, id) => {
      item = proxyLookupItem(type, id)
      if (item) validateItem(type, item, proxyLookupItem, knownGood)
    })
  })
  return true
}

/**
 * Validate an action inside a transformation can be applied to the current event state
 *
 * If this returns true, the action is valid for the current event state and can be safely applied.
 *
 * This should probably only be called in the context of validateTransformation.
 *
 * @param {Object} action Action to validate
 * @param {function} lookupItem Function (model, id) => item which returns the instance of reference id @id of model @model or undefined if it cannot be found.
 *                              Needs to support at least model === 'event', model === 'schedule' and model === 'element'
 * @param {Object} modifications This object will have the modifications carried out by action set to. Modified inplace.
 *
 * @returns {boolean} true if the action is valid and can be applied
 * @raises Validation errors
 */
function validateAction (action, lookupItem, modifications) {
  if (modifications == null) {
    modifications = {}
  }
  // check action type
  if (!['set', 'insert', 'delete', 'addItem', 'removeItem'].includes(action.action)) {
    throw new ValidationError(`Invalid action type ${action.action}`)
  }

  let target
  let targetAttr
  // verify target id is valid
  if (['event', 'schedule', 'element'].includes(action.idType)) {
    if (['set', 'insert', 'delete'].includes(action.action)) {
      target = lookupItem(action.idType, action.id)
      if (target == null) {
        throw new ValidationError(`Could not find referenced item ${action.id} of type ${action.idType}`)
      }
    }
  } else {
    throw new ValidationError(`Invalid referenced item of type ${action.idType}`)
  }

  // action specific validations
  switch (action.action) {
    case 'addItem':
      if (action.newValue == null) {
        throw new ValidationError(`An addItem action requires a newValue to create.`)
      } else if (!action.newValue._id) {
        throw new ValidationError(`The new item ${action.newValue} must contain an _id.`)
      }
      if (action.oldValue != null) {
        throw new ValidationError(`An addItem action may not have an oldValue.`)
      }
      // Check if element with id already exists
      if (lookupItem(action.idType, action.newValue._id) != null) {
        throw new ValidationError(`A ${action.idType} with id ${action.newValue._id} already exists.`)
      }
      // Record the new element in the modifications. We need to clone it as later actions may end up
      // modifying properties
      _.set(modifications, `${action.idType}.${action.newValue._id}`, _.cloneDeep(action.newValue))
      break
    case 'removeItem':
      if (action.oldValue == null) {
        throw new ValidationError(`A removeItem action requires an oldValue to create.`)
      } else if (!action.oldValue._id) {
        throw new ValidationError(`The old item ${action.oldValue} must contain an _id.`)
      }
      if (action.newValue != null) {
        throw new ValidationError(`A removeItem action may not have a newValue.`)
      }
      if (!_.isEqual(action.oldValue, lookupItem(action.idType, action.oldValue._id))) {
        throw new ValidationError(`The item ${action.oldValue} to be removed does not match the stored value.`)
      }
      // Record an explicit undefined in the modifications to mark the element as deleted
      _.set(modifications, `${action.idType}.${action.oldValue._id}`, undefined)
      break
    case 'insert':
      if (action.newValue == null) {
        throw new ValidationError(`An insert action requires a newValue to create.`)
      }
      if (action.oldValue != null) {
        throw new ValidationError(`An insert action may not have an oldValue.`)
      }
      targetAttr = _.get(target, action.path, undefined)
      if (targetAttr == null) {
        throw new ValidationError(`${action.idType} with id ${action.id} does not have an attribute at ${action.path}.`)
      } else {
        if (!Array.isArray(targetAttr)) {
          throw new ValidationError(`${action.path} of ${action.idType} with id ${action.id} must be an array for an insert action.`)
        }
      }
      // Arrays need to be recorded in their full modified state to ensure overlay merging will work correctly
      // We check if we already have a modified state for this path and apply to that directly if so
      // Otherwise we first clone from the source item and then apply the insertion
      if (_.has(modifications, `${action.idType}.${action.id}.${action.path}`)) {
        _.get(modifications, `${action.idType}.${action.id}.${action.path}`).push(_.cloneDeep(action.newValue))
      } else {
        const targetCopy = _.clone(targetAttr)
        targetCopy.push(_.cloneDeep(action.newValue))
        _.set(modifications, `${action.idType}.${action.id}.${action.path}`, targetCopy)
      }
      break
    case 'delete':
      if (action.oldValue == null) {
        throw new ValidationError(`A delete action requires an oldValue to be removed.`)
      }
      if (action.newValue != null) {
        throw new ValidationError(`A delete action may not have a newValue.`)
      }
      targetAttr = _.get(target, action.path, undefined)
      if (targetAttr == null) {
        throw new ValidationError(`${action.idType} with id ${action.id} does not have an attribute at ${action.path}.`)
      } else {
        if (Array.isArray(targetAttr)) {
          if (targetAttr.indexOf(action.oldValue) === -1) {
            throw new ValidationError(`${action.path} of ${action.idType} with id ${action.id} does not contain ${action.oldValue} to be deleted.`)
          }
        } else if (!hasOwnProperty(targetAttr, action.oldValue)) {
          throw new ValidationError(`${action.path} of ${action.idType} with id ${action.id} does not contain ${action.oldValue} to be deleted.`)
        }
      }
      // Arrays need to be recorded in their full modified state to ensure overlay merging will work correctly
      // We check if we already have a modified state for this path and apply to that directly if so
      // Otherwise we first clone from the source item and then apply the deletion
      let targetModification
      if (_.has(modifications, `${action.idType}.${action.id}.${action.path}`)) {
        targetModification = _.get(modifications, `${action.idType}.${action.id}.${action.path}`)
      } else {
        targetModification = _.clone(targetAttr)
        _.set(modifications, `${action.idType}.${action.id}.${action.path}`, targetModification)
      }
      if (Array.isArray(targetModification)) {
        targetModification.splice(targetModification.indexOf(action.oldValue), 1)
      } else {
        delete targetModification[action.oldValue]
      }
      break
    case 'set':
      // Verify that the oldValue to be updated is still valid
      targetAttr = _.get(target, action.path)
      if (targetAttr !== action.oldValue) {
        throw new ValidationError(`Value ${targetAttr} of ${action.idType} with id ${action.id} at ${action.path} does not match ${action.oldValue}. Perhaps you are trying to modify an out of sync resource?`)
      }
      // And record the modification
      _.set(modifications, `${action.idType}.${action.id}.${action.path}`, _.cloneDeep(action.newValue))
      break
    default:
      break
  }
  return true
}

/**
 * Validate an item against the current event state
 *
 * If this returns true, the item is valid in the context of the current event state (represented by @lookupItem)
 *
 * @param {string} type The item type (model) of @item
 * @param {Object} item Item to validate
 * @param {function} lookupItem Function (model, id) => item which returns the instance of reference id @id of model @model or undefined if it cannot be found.
 *                              Needs to support at least model === 'event', model === 'schedule' and model === 'element'
 * @param {Object} knownGood Set of time definitions that are known to resolve, used for short circuiting. If you validate multiple items in succession,
 *                           this can be used to record known good results to speed up time validation for subsequent calls. Otherwise leave empty.
 *
 * @returns {boolean} true if the item is valid
 * @raises Validation errors
 */
function validateItem (type, item, lookupItem, knownGood = {}) {
  // Todo validate data and dataSchema?
  const id = item._id
  if (!id) {
    throw new ValidationError(`The ${type} ${item} has no _id.`)
  }

  if (type === 'element') {
    if (!['startOf', 'endOf', 'absolute'].includes(item.start.type)) {
      throw new ValidationError(`Invalid start time type ${item.start.type} for item ${id}`)
    }
    if (!['startOf', 'endOf', 'absolute', 'duration'].includes(item.end.type)) {
      throw new ValidationError(`Invalid end time type ${item.end.type} for item ${id}`)
    }
    if (item.foreignDataModel && !item.foreignData) {
      throw new ValidationError(`Item ${id} has foreign data model ${item.foreignDataModel} but references no foreign data.`)
    }

    // Validate the start and end times
    _.forEach(['start', 'end'], (timeType) => {
      const time = item[timeType]
      let stack = {}
      if (['startOf', 'endOf', 'duration'].includes(time.type)) {
        const targetItem = lookupItem('element', time.ref)
        if (time.type !== 'duration' && targetItem == null) {
          throw new ValidationError(`The ${timeType} time of element ${id} refers to unknown element ${time.ref}.`)
        }

        // Check for circular dependencies
        if (hasCircularReference(item, timeType, lookupItem, stack, knownGood)) {
          throw new ValidationError(`The ${timeType} time of element ${id} would create a circular dependency.`)
        }
        // And record the touched time definitions that are now known to also be resolveable
        _.merge(knownGood, stack)
      }
    })
  } else if (type === 'schedule') {
    _.forEach(item.elements, (elemId) => {
      if (!lookupItem('element', elemId)) {
        throw new ValidationError(`Schedule ${id} contains an unknown element ${elemId}.`)
      }
    })
  } else if (type === 'event') {
    if (!item.usertoolRef) {
      throw new ValidationError(`Event ${item} has no usertoolRef.`)
    }

    _.forEach(item.schedules, (schedId) => {
      if (!lookupItem('schedule', schedId)) {
        throw new ValidationError(`Event ${id} contains an unknown schedule ${schedId}.`)
      }
    })
  }
  return true
}

export { ValidationError, validateTransformation, validateItem }
