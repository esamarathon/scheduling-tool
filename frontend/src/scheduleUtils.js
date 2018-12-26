import store from '@/datamodel'
import _ from 'lodash'

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

export { convertToAbsoluteTime, convertReferencingToAbsoluteTime }
