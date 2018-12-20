import Vue from 'vue'
import Vuex from 'vuex'
import { calculateTimes } from '../../shared/src/calculateSchedule'
import { fetchEvent, sendTransformation, fetchUsers } from './backend-api.js'
import { getLoggedInUser } from './auth'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    display: {
      pixelsPerHour: 100,
      snapToMinutes: 15,
      assignOngoing: false,
      assignSource: null,
      assignSourceSide: null,
      hoverHighlightTarget: null,
      hoverHighlightSide: null
    },
    event: {},
    schedules: {},
    elements: {},
    users: {},
    history: {
      undo: [],
      redo: []
    },
    lookup: {
      calculatedTimes: {}
    },
    dialogs: {
      editElement: null,
      editElementParent: null
    }
  },
  mutations: {
    setZoomFactor (state, pixelsPerHour) {
      state.display.pixelsPerHour = pixelsPerHour
    },
    setSnapToMinutes (state, snapToMinutes) {
      state.display.snapToMinutes = snapToMinutes
    },
    pushUndo (state, transformation) {
      state.history.undo.push(transformation)
      state.history.redo = []
    },
    popUndo (state) {
      const lastUndo = state.history.undo.pop()
      if (lastUndo) {
        state.history.redo.push(lastUndo)
      }
    },
    popRedo (state) {
      const lastRedo = state.history.redo.pop()
      if (lastRedo) {
        state.history.undo.push(lastRedo)
      }
    },
    setNestedElementProperty (state, { type, id, path, newValue, oldValue }) {
      try {
        const pathSplits = path.split('.')
        let iterObj = lookupItem(state, type, id)

        for (let i = 0; i < pathSplits.length - 1; i += 1) {
          iterObj = iterObj[pathSplits[i]]
        }
        if (iterObj[pathSplits.slice(-1)[0]] === oldValue) {
          Vue.set(iterObj, pathSplits.slice(-1)[0], newValue)
        }
      } catch (err) {}
    },
    insertNestedElementProperty (state, { type, id, path, newValue }) {
      try {
        const pathSplits = path.split('.')
        let iterObj = lookupItem(state, type, id)

        for (let i = 0; i < pathSplits.length; i += 1) {
          iterObj = iterObj[pathSplits[i]]
        }
        iterObj.splice(iterObj.length, 0, newValue)
      } catch (err) {}
    },
    deleteNestedElementProperty (state, { type, id, path, oldValue }) {
      try {
        const pathSplits = path.split('.')
        let iterObj = lookupItem(state, type, id)

        for (let i = 0; i < pathSplits.length; i += 1) {
          iterObj = iterObj[pathSplits[i]]
        }
        if (Array.isArray(iterObj)) {
          iterObj.splice(iterObj.indexOf(oldValue), 1)
        } else {
          delete iterObj[oldValue]
        }
      } catch (err) {}
    },
    addScheduleItem (state, { type, newValue }) {
      switch (type) {
        case 'element':
          state.elements[newValue._id] = newValue
          break
        case 'schedule':
          state.schedules[newValue._id] = newValue
          break
      }
    },
    removeScheduleItem (state, { type, oldValue }) {
      switch (type) {
        case 'element':
          delete state.elements[oldValue._id]
          break
        case 'schedule':
          delete state.schedules[oldValue._id]
          break
      }
    },
    startAssign (state, { source, side }) {
      state.display.assignOngoing = true
      state.display.assignSource = source
      state.display.assignSourceSide = side
    },
    endAssign (state) {
      state.display.assignOngoing = false
      state.display.assignSource = null
      state.display.assignSourceSide = null
    },
    hoverHighlight (state, { target, side }) {
      state.display.hoverHighlightTarget = target
      state.display.hoverHighlightSide = side
    },
    hoverHighlightClear (state) {
      state.display.hoverHighlightTarget = null
      state.display.hoverHighlightSide = null
    },
    recalculateSchedule (state) {
      state.lookup.calculatedTimes = calculateTimes(state.event, (type, id) => lookupItem(state, type, id))
    },
    showEditDialog (state, { elementID, scheduleID }) {
      state.dialogs.editElement = elementID
      state.dialogs.editElementParent = scheduleID
    },
    closeEditDialog (state) {
      state.dialogs.editElement = null
      state.dialogs.editElementParent = null
    },
    clearHistory (state) {
      state.history = {
        undo: [],
        redo: []
      }
    },
    loadEventData (state, eventData) {
      state.event = eventData.event
      state.schedules = eventData.schedules
      state.elements = eventData.elements
    },
    clearUsers (state) {
      state.users = {}
    },
    updateUsers (state, newUsers) {
      state.users = _.merge({}, state.users, newUsers)
    }
  },
  actions: {
    async loadEvent (context, eventId) {
      context.commit('clearHistory')
      context.commit('loadEventData', {event: {name: `loading ${eventId}`, schedules: []}, schedules: { elements: [] }, elements: {}})
      context.commit('recalculateSchedule')
      let eventData = await fetchEvent(eventId)
      context.commit('loadEventData', eventData)
      context.dispatch('loadUsers', context.state.event.usertoolRef)
      context.commit('recalculateSchedule')
    },
    update (context, transformation) {
      let action
      for (let i = 0; i < transformation.actions.length; i += 1) {
        action = transformation.actions[i]
        // ToDo error handling
        switch (action.action) {
          case 'set':
            context.commit('setNestedElementProperty', { type: action.idType, id: action.id, path: action.path, newValue: action.newValue, oldValue: action.oldValue })
            break
          case 'insert':
            context.commit('insertNestedElementProperty', { type: action.idType, id: action.id, path: action.path, newValue: action.newValue })
            break
          case 'delete':
            context.commit('deleteNestedElementProperty', { type: action.idType, id: action.id, path: action.path, oldValue: action.oldValue })
            break
          case 'addItem':
            context.commit('addScheduleItem', { type: action.idType, newValue: action.newValue })
            break
          case 'removeItem':
            context.commit('removeScheduleItem', { type: action.idType, oldValue: action.oldValue })
            break
        }
      }
      context.commit('recalculateSchedule')
    },
    addSchedule (context, newSchedule) {
      const transformation = {type: 'addSchedule',
        actions: [{
          idType: 'schedule', action: 'addItem', newValue: newSchedule
        }, {
          idType: 'event', id: context.state.event._id, path: 'schedules', action: 'insert', newValue: newSchedule._id
        }]}
      context.dispatch('apply', transformation)
    },
    removeSchedule (context, scheduleId) {
      const oldSchedule = context.getters.lookupSchedule(scheduleId)
      const transformation = {type: 'removeSchedule',
        actions: [{
          idType: 'event', id: context.state.event._id, path: 'schedules', action: 'delete', oldValue: scheduleId
        }, {
          idType: 'schedule', action: 'removeItem', oldValue: oldSchedule
        }]}

      let oldElement
      for (let i = 0; i < oldSchedule.elements.length; i += 1) {
        oldElement = context.getters.lookupElement(oldSchedule.elements[i])
        transformation.actions.splice(0, 0, {idType: 'element', action: 'removeItem', oldValue: oldElement})
      }

      context.dispatch('apply', transformation)
    },
    addElement (context, { newElement, parent }) {
      const transformation = {type: 'addElement',
        actions: [{
          idType: 'element', action: 'addItem', newValue: newElement
        }, {
          idType: 'schedule', id: parent, path: 'elements', action: 'insert', newValue: newElement._id
        }]}
      context.dispatch('apply', transformation)
    },
    removeElement (context, { elementId, parent }) {
      const oldElement = context.getters.lookupElement(elementId)
      const transformation = {type: 'removeElement',
        actions: [{
          idType: 'schedule', id: parent, path: 'elements', action: 'delete', oldValue: elementId
        }, {
          idType: 'element', action: 'removeItem', oldValue: oldElement
        }]}
      context.dispatch('apply', transformation)
    },
    undo (context) {
      const lastUndo = context.state.history.undo.slice(-1)[0]
      if (lastUndo) {
        const invertedTransformation = invertTransformation(lastUndo)

        invertedTransformation['time'] = new Date()
        invertedTransformation['userId'] = getLoggedInUser()
        sendTransformation(invertedTransformation)

        context.dispatch('update', invertedTransformation)
        context.commit('popUndo')
      }
    },
    redo (context) {
      const lastRedo = context.state.history.redo.slice(-1)[0]
      if (lastRedo) {
        sendTransformation(lastRedo)

        context.dispatch('update', lastRedo)
        context.commit('popRedo')
      }
    },
    apply (context, transformation) {
      transformation['time'] = new Date()
      transformation['userId'] = getLoggedInUser()

      sendTransformation(transformation)

      context.dispatch('update', transformation)
      context.commit('pushUndo', transformation)
    },
    async loadUsers (context, eventId) {
      context.commit('clearUsers')
      let users = await fetchUsers(eventId)
      context.commit('updateUsers', users)
    }
  },
  getters: {
    lookupElement: state => elementID => state.elements[elementID],
    lookupSchedule: state => scheduleID => state.schedules[scheduleID],
    lookup: state => (type, id) => lookupItem(state, type, id),
    getNestedProperty: (state, getters) => (idType, id, path) => {
      try {
        return path.split('.').reduce((iterObj, prop) => iterObj[prop], getters.lookup(idType, id))
      } catch (err) {
        return undefined
      }
    },
    getStartTime: state => element => state.lookup.calculatedTimes[element._id]['start'],
    getEndTime: state => element => state.lookup.calculatedTimes[element._id]['end'],
    getDuration: state => element => state.lookup.calculatedTimes[element._id]['duration'],
    pixelsPerHour: state => state.display.pixelsPerHour || 100,
    snapToMinutes: state => state.display.snapToMinutes || 15,
    getEventOffset: (state, getters) => element => getters.getStartTime(element) - state.event.start,
    getStartOfSchedule: (state, getters) => scheduleID => state.event.start + (getters.lookupSchedule(scheduleID).offset || 0),
    getEndOfSchedule: (state, getters) => (scheduleID) => {
      const schedule = getters.lookupSchedule(scheduleID)
      let end = state.event.start
      for (let i = 0; i < schedule.elements.length; i += 1) {
        const elementEnd = getters.getEndTime(getters.lookupElement(schedule.elements[i]))
        if (elementEnd > end) {
          end = elementEnd
        }
      }
      return end
    },
    eventDuration: state => state.event.end - state.event.start,
    assignState: state => ({ ongoing: state.display.assignOngoing, source: state.display.assignSource, side: state.display.assignSourceSide }),
    hoverHighlight: state => ({ target: state.display.hoverHighlightTarget, side: state.display.hoverHighlightSide })
  }
})

function lookupItem (state, type, id) {
  switch (type) {
    case 'element':
      return state.elements[id]
    case 'schedule':
      return state.schedules[id]
    case 'event':
      if (state.event._id === id) {
        return state.event
      }
      break
  }
  return undefined
}

function invertTransformation (transformation) {
  const ret = _.assign({}, transformation, {type: 'undo', actions: []})
  let action
  let newAction
  for (let i = 0; i < transformation.actions.length; i += 1) {
    action = transformation.actions[i]

    // ToDo error handling
    switch (action.action) {
      case 'set':
        newAction = _.assign({}, action, {newValue: action.oldValue, oldValue: action.newValue})
        break
      case 'insert':
        newAction = _.assign({}, action, {action: 'delete', newValue: action.oldValue, oldValue: action.newValue})
        break
      case 'delete':
        newAction = _.assign({}, action, {action: 'insert', newValue: action.oldValue, oldValue: action.newValue})
        break
      case 'addItem':
        newAction = _.assign({}, action, {action: 'removeItem', newValue: action.oldValue, oldValue: action.newValue})
        break
      case 'removeItem':
        newAction = _.assign({}, action, {action: 'addItem', newValue: action.oldValue, oldValue: action.newValue})
        break
    }
    ret.actions.splice(ret.actions.length, 0, newAction)
  }
  return ret
}
