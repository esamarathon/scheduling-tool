/**
 * Resolves relative times in an Event
 *
 * Calculates the actual start and end times of each ScheduleElement related to an Event by resolving all relative scheduling references
 *
 * @param {Object} event Event object to be resolved
 * @param {function} lookupItem Function (model, id) => item which returns the instance of reference id @id of model @model or undefined if it cannot be found.
 *                              Needs to support at least model === 'schedule' and model === 'element'
 *
 * @returns {Object} Mapping id: {start: Number, end: Number, duration: Number} for each resolved ScheduleElement, where start and end are the times in ms since epoch and duration is in ms
 */

function calculateTimes (event, lookupItem) {
  const calculatedTimes = {}
  let schedule
  let element
  for (let i = 0; i < event.schedules.length; i += 1) {
    schedule = lookupItem('schedule', event.schedules[i])
    for (let j = 0; j < schedule.elements.length; j += 1) {
      element = lookupItem('element', schedule.elements[j])
      calculateStartTime(element, lookupItem, calculatedTimes)
      calculateEndTime(element, lookupItem, calculatedTimes)
      calculateDuration(element, lookupItem, calculatedTimes)
    }
  }
  return calculatedTimes
}

function calculateStartTime (element, lookupItem, calculatedTimes) {
  if (element._id in calculatedTimes && 'start' in calculatedTimes[element._id]) {
    return
  }

  let startTime
  let referencedElement
  if (element.start.actualTime) {
    startTime = element.start.actualTime
  } else {
    switch (element.start.type || 'absolute') {
      case 'absolute':
        startTime = element.start.time + (element.start.offset || 0)
        break
      case 'startOf':
        referencedElement = lookupItem('element', element.start.ref)
        // calculate and then use
        calculateStartTime(referencedElement, lookupItem, calculatedTimes)
        startTime = calculatedTimes[element.start.ref]['start'] + (element.start.offset || 0)
        break
      case 'endOf':
        referencedElement = lookupItem('element', element.start.ref)
        // calculate and then use
        calculateEndTime(referencedElement, lookupItem, calculatedTimes)
        startTime = calculatedTimes[element.start.ref]['end'] + (element.start.offset || 0)
        break
      default:
        // safety valve
        startTime = 0
        break
    }
  }

  if (element._id in calculatedTimes) {
    calculatedTimes[element._id]['start'] = startTime
  } else {
    calculatedTimes[element._id] = { start: startTime }
  }
}

function calculateEndTime (element, lookupItem, calculatedTimes) {
  if (element._id in calculatedTimes && 'end' in calculatedTimes[element._id]) {
    return
  }

  let referencedElement
  let endTime

  if (element.end.actualTime) {
    return element.end.actualTime
  } else {
    switch (element.end.type || 'absolute') {
      case 'absolute':
        endTime = element.end.time + (element.end.offset || 0)
        break
      case 'duration':
        calculateStartTime(element, lookupItem, calculatedTimes)
        calculateDuration(element, lookupItem, calculatedTimes)
        endTime = calculatedTimes[element._id]['start'] + calculatedTimes[element._id]['duration']
        break
      case 'startOf':
        referencedElement = lookupItem('element', element.end.ref)
        // calculate and then use
        calculateStartTime(referencedElement, lookupItem, calculatedTimes)
        endTime = calculatedTimes[element.end.ref]['start'] + (element.end.offset || 0)
        break
      case 'endOf':
        referencedElement = lookupItem('element', element.end.ref)
        // calculate and then use
        calculateEndTime(referencedElement, lookupItem, calculatedTimes)
        endTime = calculatedTimes[element.end.ref]['end'] + (element.end.offset || 0)
        break
      default:
        // safety valve
        endTime = 0
        break
    }
  }

  if (element._id in calculatedTimes) {
    calculatedTimes[element._id]['end'] = endTime
  } else {
    calculatedTimes[element._id] = { end: endTime }
  }
}

function calculateDuration (element, lookupItem, calculatedTimes) {
  if (element._id in calculatedTimes && 'duration' in calculatedTimes[element._id]) {
    return
  }

  let duration
  if (!element.end.type || element.end.type === 'duration') {
    duration = (element.start.setup || 0) + element.end.duration + (element.end.teardown || 0)
  } else {
    calculateStartTime(element, lookupItem, calculatedTimes)
    calculateEndTime(element, lookupItem, calculatedTimes)
    duration = calculatedTimes[element._id]['end'] - calculatedTimes[element._id]['start']
  }

  if (element._id in calculatedTimes) {
    calculatedTimes[element._id]['duration'] = duration
  } else {
    calculatedTimes[element._id] = { end: duration }
  }
}

/**
 * Check if an element's time definition has circular dependencies or can be resolved to an absolute value.
 *
 * @param {Object} element Element to test
 * @param {string} timeType One of 'start' or 'end', select which time definition of @element to verify
 * @param {function} lookupItem Function (model, id) => item which returns the instance of reference id @id of model @model or undefined if it cannot be found.
 *                              Needs to support at least model === 'element'
 * @param {Object} stack Internal stack for recursive calls. Leave empty or supply empty object when calling initially.
 * @param {Object} knownGood Set of time definitions that are known to resolve, used for short circuiting. When checking multiple elements consecutively,
 *                           you can merge the @stack of a successful check into the @knownGood list to speed up subsequent checks. Otherwise leave empty.
 *
 * @returns {boolean} True if a circular dependency was found, false otherwise.
 */

function hasCircularReference (element, timeType, lookupItem, stack = {}, knownGood = {}) {
  // Check if element has been seen before
  if (stack[`${timeType}_${element._id}`]) {
    return true
  } else if (knownGood[`${timeType}_${element._id}`]) {
    return false
  } else {
    stack[`${timeType}_${element._id}`] = true
  }

  // Otherwise recurse to refered item
  const time = element[timeType]
  if (time.type === 'startOf') {
    return hasCircularReference(lookupItem('element', time.ref), 'start', lookupItem, stack, knownGood)
  } else if (time.type === 'endOf') {
    return hasCircularReference(lookupItem('element', time.ref), 'end', lookupItem, stack, knownGood)
  } else if (time.type === 'duration') {
    // durations are effectively a dependency on an item's start time
    return hasCircularReference(element, 'start', lookupItem, stack, knownGood)
  }
  return false
}

export { calculateTimes, hasCircularReference }
