import store from './datamodel'
import _ from 'lodash'

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

// Findings are arrays that should be extended when merging
function mergeWithCustomizerConcatArray (objValue, srcValue) {
  return (_.isArray(objValue) && _.isArray(srcValue)) ? _.concat(objValue, srcValue) : undefined
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
      _.merge(findings, newFinding, mergeWithCustomizerConcatArray)
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
  // ToDo event specific constraints
  _.forEach(event.schedules, (scheduleId) => {
    let schedule = store.getters.lookup('schedule', scheduleId)
    // ToDo schedule specific constraints
    _.forEach(schedule.elements, (elementId) => {
      let element = store.getters.lookup('element', elementId)
      // ToDo more element specific constraints
      stack.push({
        type: 'positiveDuration',
        data: {
          element: element
        }
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

export { checkConstraints }
