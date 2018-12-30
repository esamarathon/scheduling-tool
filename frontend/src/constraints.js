import store from './datamodel'
import _ from 'lodash'
import moment from 'moment'
import { sortedIntervals, usersOfElement, usersOfEvent, mergeWithCustomizerConcatArray, getElementName } from './scheduleUtils'

// feedback is posted to Vuex periodically on a timer to avoid strain on DOM calculations
function updateConstraintState (nonce, stack, findings) {
  if (nonce === store.state.constraints.nonce && store.state.constraints.state) {
    store.commit('setConstraintStackSize', stack.length)
    // ToDo there should be a better solution. Need to clone to ensure the reactive subproperties are
    // updated correctly, or changes are not propagated. This is probably unnecessarily slow
    store.commit('setConstraintFindings', _.clone(findings))
    setTimeout(updateConstraintState, 500, nonce, stack, findings)
  }
}

/* Use a dedicated MessageChannel to queue a function as a MacroTask (i.e. at the end of the event queue)
 * We can't simply use async promises here because await uses the Job Queue, which has precedence over events
 * So we would still effectively be blocking.
 * This work around allows us to effectively queue constraint checkers as low priority tasks.
 *
 * @channel.port1 is used to send a message to port2 that runs @func and resolves the returned promise
 */
function queueAsMacroTask (channel, func) {
  return new Promise(resolve => { channel.port2.onmessage = async (ev) => { await func(); resolve() }; channel.port1.postMessage(null) })
}

/**
 * Run a set of constraint checkers.
 *
 * Execution is cancelable by changing the $store.state.constraints.nonce object from the one passed into
 * the call.
 *
 * Checkers are queued one by one asynchroneously on the event queue. Execution is therefore effectively
 * yielded between each checker, turning them into a background task.
 *
 * Status reports are periodically provided every 500ms while the checkers are running.
 *
 * @param {any} nonce Global nonce valid for this checker. Used for cancellation.
 * @param {list} stack Initial stack of constraint checkers to run.
 */
async function checkConstraints (nonce, stack) {
  let constraint
  let findings = {}
  let newFinding
  let channel = new MessageChannel()
  // periodically report state
  setTimeout(updateConstraintState, 500, nonce, stack, findings)
  for (;;) {
    // check if nonce is still valid
    if (nonce !== store.state.constraints.nonce) break
    // pop next entry from stack
    constraint = stack.shift()
    if (!constraint) break
    // queue checker for constraint
    await queueAsMacroTask(channel, async () => { newFinding = await processConstraint(constraint, stack) })
    // record new findings if there are any
    if (newFinding) {
      _.mergeWith(findings, newFinding, mergeWithCustomizerConcatArray)
    }
  }
  // mark check as done if we are still the valid checker
  if (nonce === store.state.constraints.nonce) {
    store.commit('setConstraintCheckState', false)
    store.commit('setConstraintStackSize', 0)
    store.commit('setConstraintFindings', findings)
  }
}

// Process constraint checker
async function processConstraint (constraint, stack) {
  switch (constraint.type) {
    case 'populateConstraints':
      return populateConstraints(constraint.data.eventId, stack)
    case 'positiveDuration':
      return positiveDuration(constraint.data.element)
    case 'minimumSetup':
      return minimumSetup(constraint.data.element, constraint.data.setupTime)
    case 'noGaps':
      return noGaps(constraint.data.schedule)
    case 'noOverlap':
      return noOverlap(constraint.data.schedule)
    case 'preferedTimeslot':
      return preferedTimeslot(constraint.data.element, constraint.data.timeslot)
    case 'userAvailable':
      return userAvailable(constraint.data.element, constraint.data.userId)
    case 'userNoOverlap':
      return userNoOverlap(constraint.data.userId, constraint.data.elementIds)
    default:
      console.log(`Unsupported constraint checker ${constraint}`)
      break
  }
}

/**
 * Derive the configured and necessary constraint checkers for a given event.
 *
 * @param {string} eventId Event to calculate list of constraints to check for.
 * @param {list} stack Task queue to push new derived checkers to for running.
 */
async function populateConstraints (eventId, stack) {
  let event = store.getters.lookup('event', eventId)
  _.forEach(usersOfEvent(event), (elementIds, userId) => {
    stack.push({
      type: 'userNoOverlap',
      data: {
        userId: userId,
        elementIds: elementIds
      }
    })
  })
  // ToDo event specific constraints
  _.forEach(event.schedules, (scheduleId) => {
    let schedule = store.getters.lookup('schedule', scheduleId)
    // ToDo schedule specific constraints
    if (_.get(schedule, 'constraints.noGaps')) {
      stack.push({
        type: 'noGaps',
        data: {
          schedule: schedule
        }
      })
    }
    if (_.get(schedule, 'constraints.noOverlap')) {
      stack.push({
        type: 'noOverlap',
        data: {
          schedule: schedule
        }
      })
    }

    _.forEach(schedule.elements, (elementId) => {
      let element = store.getters.lookup('element', elementId)
      // ToDo more element specific constraints
      stack.push({
        type: 'positiveDuration',
        data: {
          element: element
        }
      })
      _.forEach(usersOfElement(element), (userId) => {
        stack.push({
          type: 'userAvailable',
          data: {
            element: element,
            userId: userId
          }
        })
      })
      if (_.get(schedule, 'constraints.minimumSetupTime')) {
        stack.push({
          type: 'minimumSetup',
          data: {
            element: element,
            setupTime: schedule.constraints.minimumSetupTime
          }
        })
      }
      _.forEach(_.get(element, 'constraints.preferedTimeslot'), (timeslot) => {
        stack.push({
          type: 'preferedTimeslot',
          data: {
            element: element,
            timeslot: timeslot
          }
        })
      })
    })
  })
}

// Verify all entries have a strictly positive duration
async function positiveDuration (element) {
  if (store.getters.getEndTime(element) <= store.getters.getStartTime(element)) {
    return { element: {
      [element._id]: [{
        class: 'strict',
        finding: 'The end time lies before the start time. This is probably not good.',
        source: {
          id: element._id,
          type: 'element'
        },
        id: `${element._id}_positiveDuration`
      }]
    }}
  }
}

// Verify that a minimum setup time is set for all items
async function minimumSetup (element, setupTime) {
  if (element.start.setup === null || (element.start.setup < setupTime)) {
    return { element: {
      [element._id]: [{
        class: 'weak',
        finding: `The setup time of ${element.start.setup} is smaller than the allowed minimum of ${setupTime}.`,
        source: {
          id: element._id,
          type: 'element'
        },
        id: `${element._id}_minimumSetup`
      }]
    }}
  }
}

// Verify that a schedule contains no gaps
async function noGaps (schedule) {
  let hasGaps = false
  const sorted = sortedIntervals(schedule.elements)
  let lastEnd = null
  for (let i = 0; i < sorted.length; i++) {
    if (lastEnd !== null) {
      if (sorted[i].start > lastEnd) {
        hasGaps = true
        break
      }
    }
    lastEnd = sorted[i].end
  }

  if (hasGaps) {
    return { schedule: {
      [schedule._id]: [{
        class: 'strict',
        finding: `There are gaps in the schedule.`,
        source: {
          id: schedule._id,
          type: 'schedule'
        },
        id: `${schedule._id}_noGaps`
      }]
    }}
  }
}

// Verify that a schedule contains no overlap
async function noOverlap (schedule) {
  let hasOverlap = false
  const sorted = sortedIntervals(schedule.elements)
  let lastEnd = null
  for (let i = 0; i < sorted.length; i++) {
    if (lastEnd !== null) {
      if (sorted[i].start < lastEnd) {
        hasOverlap = true
        break
      }
    }
    lastEnd = sorted[i].end
  }

  if (hasOverlap) {
    return { schedule: {
      [schedule._id]: [{
        class: 'strict',
        finding: `There are overlaps in the schedule.`,
        source: {
          id: schedule._id,
          type: 'schedule'
        },
        id: `${schedule._id}_noOverlap`
      }]
    }}
  }
}

// Verify that an element falls (mostly) in its prefered timeslot
async function preferedTimeslot (element, timeslot) {
  let outsideTimeslot = false
  const startTime = store.state.lookup.calculatedTimes[element._id]['start']
  const endTime = store.state.lookup.calculatedTimes[element._id]['end']
  // ToDo sensible margin?
  const margin = (endTime - startTime) * 0.2
  const cleanedStart = moment(startTime + margin)
  const cleanedEnd = moment(endTime - margin)
  switch (timeslot) {
    // ToDo better definitions
    case 'graveyard':
      outsideTimeslot = !(cleanedStart.hours() >= 0 && cleanedStart.hours() <= 5 && cleanedEnd.hours() >= 0 && cleanedEnd.hours() <= 5)
      break
    case 'primetime':
      outsideTimeslot = !(cleanedStart.hours() >= 18 && cleanedStart.hours() <= 23 && cleanedEnd.hours() >= 18 && cleanedEnd.hours() <= 23)
      break
    default:
      return { element: {
        [element._id]: [{
          class: 'strict',
          finding: `The element requests an unsupported prefered timeslot ${timeslot}.`,
          source: {
            id: element._id,
            type: 'element'
          },
          id: `${element._id}_preferedTimeslot_${timeslot}`
        }]
      }}
  }
  if (outsideTimeslot) {
    return { element: {
      [element._id]: [{
        class: 'weak',
        finding: `The element does not lie in its prefered timeslot ${timeslot}.`,
        source: {
          id: element._id,
          type: 'element'
        },
        id: `${element._id}_preferedTimeslot_${timeslot}`
      }]
    }}
  }
}

async function userAvailable (element, userId) {
  const user = store.getters.lookup('user', userId)
  if (user) {
    const userStart = _.get(user, 'availability.from')
    const userEnd = _.get(user, 'availability.until')
    if (userStart === null || userEnd === null || store.getters.getStartTime(element) < userStart || store.getters.getEndTime(element) > userEnd) {
      return { element: {
        [element._id]: [{
          class: 'strict',
          finding: `The user ${user.name} is not available.`,
          source: {
            id: element._id,
            type: 'element'
          },
          id: `${element._id}_userAvailable_${userId}`
        }]
      }}
    }
  } else {
    return { element: {
      [element._id]: [{
        class: 'strict',
        finding: `The user with id ${userId} is not known.`,
        source: {
          id: element._id,
          type: 'element'
        },
        id: `${element._id}_userNotFound_${userId}`
      }]
    }}
  }
}

async function userNoOverlap (userId, elementIds) {
  const ret = {}
  const sortedElements = sortedIntervals(elementIds)
  let overlaps
  _.forEach(sortedElements, (element) => {
    overlaps = _.filter(sortedElements, (interval) => { return interval.end > element.start && interval.start < element.end })
    _.forEach(overlaps, (overlap) => {
      if (overlap.id !== element.id) {
        _.mergeWith(ret, { element: {
          [element.id]: [{
            class: 'strict',
            finding: `The user ${_.get(store.getters.lookup('user', userId), 'name')} is also planned for overlapping element ${getElementName(overlap.id)}.`,
            source: {
              id: element.id,
              type: 'element'
            },
            id: `${element.id}_userNoOverlap_${userId}_${overlap.id}`
          }]
        }}, mergeWithCustomizerConcatArray)
      }
    })
  })
  return ret || undefined
}

export { checkConstraints }
