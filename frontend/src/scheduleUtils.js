import store from '@/datamodel'
import _ from 'lodash'

// ToDo add a function that also collapses relatively positioned elements

function convertToAbsoluteTime (element, timeType, endType = 'duration') {
  if (timeType === 'start') {
    return [
      {idType: 'element', id: element._id, action: 'set', path: 'start.time', oldValue: element.start.time, newValue: store.state.lookup.calculatedTimes[element._id]['start']},
      {idType: 'element', id: element._id, action: 'set', path: 'start.type', oldValue: element.start.type, newValue: 'absolute'},
      {idType: 'element', id: element._id, action: 'set', path: 'start.ref', oldValue: element.start.ref, newValue: undefined}
    ]
  } else if (timeType === 'end') {
    if (endType === 'duration') {
      return [
        {idType: 'element', id: element._id, action: 'set', path: 'end.duration', oldValue: element.end.duration, newValue: store.state.lookup.calculatedTimes[element._id]['duration'] - (element.start.setup || 0) - (element.end.teardown || 0)},
        {idType: 'element', id: element._id, action: 'set', path: 'end.type', oldValue: element.end.type, newValue: 'duration'},
        {idType: 'element', id: element._id, action: 'set', path: 'end.ref', oldValue: element.end.ref, newValue: undefined}
      ]
    } else if (endType === 'absolute') {
      return [
        {idType: 'element', id: element._id, action: 'set', path: 'end.time', oldValue: element.end.time, newValue: store.state.lookup.calculatedTimes[element._id]['end']},
        {idType: 'element', id: element._id, action: 'set', path: 'end.type', oldValue: element.end.type, newValue: 'absolute'},
        {idType: 'element', id: element._id, action: 'set', path: 'end.ref', oldValue: element.end.ref, newValue: undefined}
      ]
    }
  }
  return []
}

function convertReferencingToAbsoluteTime (targets, endType = 'duration', excludeTargets = false) {
  const ret = []
  _.forEach(store.state.elements, (element) => {
    if (excludeTargets && targets.includes(element._id)) return
    if (targets.includes(element.start.ref) && (element.start.type === 'startOf' || element.start.type === 'endOf')) {
      ret.push(convertToAbsoluteTime(element, 'start'))
    }
    if (targets.includes(element.end.ref) && (element.end.type === 'startOf' || element.end.type === 'endOf')) {
      ret.push(convertToAbsoluteTime(element, 'end', endType))
    }
  })
  return _.flatMap(ret)
}

function sortedIntervals (elementList) {
  const intervals = _.map(elementList, (element) => {
    return {
      id: element,
      start: store.state.lookup.calculatedTimes[element]['start'],
      end: store.state.lookup.calculatedTimes[element]['end']
    }
  })
  intervals.sort((a, b) => {
    if (a.start < b.start) return -1
    else if (a.start > b.start) return 1
    else if (a._id < b._id) return -1
    else if (a._id > b._id) return 1
    return 0
  })
  return intervals
}

// Findings are arrays that should be extended when merging
function mergeWithCustomizerConcatArray (objValue, srcValue) {
  return (_.isArray(objValue) && _.isArray(srcValue)) ? _.concat(objValue, srcValue) : undefined
}

// ToDo this stuff should probably be cached

function usersOfElement (element) {
  return _.filter(_.map(_.flatMap(element.people), (user) => { return user.userId }))
}

function usersOfEvent (event) {
  const ret = {}
  let schedule
  let element
  for (let i = 0; i < event.schedules.length; i++) {
    schedule = store.state.schedules[event.schedules[i]]
    for (let j = 0; j < schedule.elements.length; j++) {
      element = store.state.elements[schedule.elements[j]]
      _.forEach(usersOfElement(element), (userId) => {
        _.mergeWith(ret, { [userId]: [element._id] }, mergeWithCustomizerConcatArray)
      })
    }
  }
  return ret
}

function getForeignData (element) {
  return (element.foreignData && element.foreignDataModel) ? _.get(store.state.foreignData, `${element.foreignDataModel}.${element.foreignData}`) : undefined
}

function getElementName (element) {
  if (_.isString(element)) element = store.state.elements[element]
  const foreignData = getForeignData(element)
  return (foreignData && element.foreignDataModel === 'run') ? (foreignData.game + ' ' + foreignData.category) : element.name
}

function roundTimeToNearest (date, duration) {
  if (+duration) {
    return Math.round((+date) / (+duration)) * (+duration)
  } else {
    return date
  }
}

function offsetToTime (offset) {
  return roundTimeToNearest(store.state.event.start + (offset / store.getters.pixelsPerHour) * 3600000, store.getters.snapToMinutes * 60000)
}

function getRealOffset (event, target) {
  const ret = { x: event.offsetX, y: event.offsetY }
  if (event.path.includes(target.$el)) {
    for (let i = 0; i < event.path.length; i++) {
      if (event.path[i] === target.$el) break
      ret.x = ret.x + event.path[i].offsetLeft
      ret.y = ret.y + event.path[i].offsetTop
    }
  }
  return ret
}

export { convertToAbsoluteTime, convertReferencingToAbsoluteTime, sortedIntervals, usersOfElement, usersOfEvent,
  mergeWithCustomizerConcatArray, getForeignData, getElementName, roundTimeToNearest, offsetToTime, getRealOffset }
