import Vue from 'vue'
import Vuex from 'vuex'

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
    history: {
      undo: [],
      redo: []
    },
    lookup: {
      schedules: {},
      elements: {},
      calculatedTimes: {}
    },
    dialogs: {
      editElement: null
    }
  },
  mutations: {
    generateLookupTable (state) {
      let schedule
      let element
      state.lookup.schedules = {}
      state.lookup.elements = {}
      for (let i = 0; i < state.event.schedules.length; i += 1) {
        schedule = state.event.schedules[i]
        Vue.set(state.lookup.schedules, schedule.id, schedule)
        for (let j = 0; j < schedule.elements.length; j += 1) {
          element = schedule.elements[j]
          Vue.set(state.lookup.elements, element.id, element)
        }
      }
    },
    addElementId (state, { id, target }) {
      Vue.set(state.lookup.elements, id, target)
    },
    removeElementId (state, id) {
      Vue.delete(state.lookup.elements, id)
    },
    addScheduleId (state, { id, target }) {
      Vue.set(state.lookup.schedules, id, target)
    },
    removeScheduleId (state, id) {
      Vue.delete(state.lookup.schedules, id)
    },
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
    setNestedElementProperty (state, { elementID, path, value }) {
      try {
        const pathSplits = path.split('.')
        let iterObj = state.lookup.elements[elementID]
        for (let i = 0; i < pathSplits.length - 1; i += 1) {
          iterObj = iterObj[pathSplits[i]]
        }
        Vue.set(iterObj, pathSplits.slice(-1)[0], value)
      } catch (err) {}
    },
    addSchedule (state, { newSchedule, position }) {
      const index = position !== null ? position : state.event.schedules.length
      state.event.schedules.splice(index, 0, newSchedule)
    },
    removeSchedule (state, oldSchedule) {
      state.event.schedules.splice(state.event.schedules.indexOf(oldSchedule), 1)
    },
    addElement (state, { newElement, parent, position }) {
      const index = position !== null ? position : parent.elements.length
      parent.elements.splice(index, 0, newElement)
    },
    removeElement (state, { parent, oldElement }) {
      parent.elements.splice(parent.elements.indexOf(oldElement), 1)
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
      state.lookup.calculatedTimes = calculateTimes(state)
    },
    showEditDialog (state, elementID) {
      state.dialogs.editElement = elementID
    },
    closeEditDialog (state) {
      state.dialogs.editElement = null
    }
  },
  actions: {
    loadEvent (context, event) {
      const state = context.state
      state.event = event
      state.history = {
        undo: [],
        redo: []
      }
      context.commit('generateLookupTable')
      context.commit('recalculateSchedule')
    },
    update (context, { actions, canUndo = false, isUndo = false }) {
      let action
      let element
      const updatedElements = new Set()
      for (let i = 0; i < actions.length; i += 1) {
        action = actions[i]
        element = context.getters.lookupElement(action.id)
        // ToDo error handling
        if (element) {
          if (context.getters.getNestedProperty(action.id, action.path) === (isUndo ? action.newValue : action.oldValue)) {
            context.commit('setNestedElementProperty', { elementID: action.id, path: action.path, value: isUndo ? action.oldValue : action.newValue })
            if (action.path.startsWith('start') || action.path.startsWith('end')) {
              updatedElements.add(action.id)
            }
          } else {
            return
          }
        } else {
          return
        }
      }
      if (updatedElements) {
        context.commit('recalculateSchedule')
      }
      if (!isUndo && canUndo) {
        context.commit('pushUndo', { type: 'update', actions })
      }
    },
    addSchedule (context, { newSchedule, position = null, canUndo = false }) {
      context.commit('addSchedule', { newSchedule, position })
      context.commit('addScheduleId', { id: newSchedule.id, target: newSchedule })
      for (let i = 0; i < newSchedule.elements.length; i += 1) {
        context.commit('addElementId', { id: newSchedule.elements[i].id, target: newSchedule.elements[i] })
      }
      context.commit('recalculateSchedule')
      if (canUndo) {
        context.commit('pushUndo', { type: 'addSchedule', position, newSchedule })
      }
    },
    removeSchedule (context, { scheduleID, canUndo = false }) {
      const oldSchedule = context.getters.lookupSchedule(scheduleID)
      const oldPosition = context.state.event.schedules.indexOf(oldSchedule)
      context.commit('removeSchedule', oldSchedule)
      context.commit('removeScheduleId', oldSchedule.id)
      for (let i = 0; i < oldSchedule.elements.length; i += 1) {
        context.commit('removeElementId', oldSchedule.elements[i].id)
      }
      context.commit('recalculateSchedule')
      if (canUndo) {
        context.commit('pushUndo', { type: 'removeSchedule', oldPosition, oldSchedule })
      }
    },
    addElement (context, { newElement, position = null, canUndo = false }) {
      context.commit('addElement', { newElement, parent: context.getters.lookupSchedule(newElement.parent), position })
      context.commit('addElementId', { id: newElement.id, target: newElement })
      context.commit('recalculateSchedule')
      if (canUndo) {
        context.commit('pushUndo', { type: 'addElement', position, newElement })
      }
    },
    removeElement (context, { elementID, canUndo = false }) {
      const oldElement = context.getters.lookupElement(elementID)
      const parentSchedule = context.getters.lookupSchedule(oldElement.parent)
      const oldPosition = parentSchedule.elements.indexOf(oldElement)
      context.commit('removeElement', { oldElement, parent: parentSchedule })
      context.commit('removeElementId', oldElement.id)
      context.commit('recalculateSchedule')
      if (canUndo) {
        context.commit('pushUndo', { type: 'removeElement', oldPosition, oldElement })
      }
    },
    undo (context) {
      const lastUndo = context.state.history.undo.slice(-1)[0]
      if (lastUndo) {
        switch (lastUndo.type) {
          case 'update':
            context.dispatch('update', { actions: lastUndo.actions, isUndo: true })
            break
          case 'addSchedule':
            context.dispatch('removeSchedule', { scheduleID: lastUndo.newSchedule.id, canUndo: false })
            break
          case 'removeSchedule':
            context.dispatch('addSchedule', { newSchedule: lastUndo.oldSchedule, position: lastUndo.oldPosition, canUndo: false })
            break
          case 'addElement':
            context.dispatch('removeElement', { elementID: lastUndo.newElement.id, canUndo: false })
            break
          case 'removeElement':
            context.dispatch('addElement', { newElement: lastUndo.oldElement, position: lastUndo.oldPosition, canUndo: false })
            break
          default:
            break
        }
        context.commit('popUndo')
      }
    },
    redo (context) {
      const lastRedo = context.state.history.redo.slice(-1)[0]
      if (lastRedo) {
        switch (lastRedo.type) {
          case 'update':
            context.dispatch('update', { actions: lastRedo.actions, canUndo: false })
            break
          case 'addSchedule':
            context.dispatch('addSchedule', { newSchedule: lastRedo.newSchedule, position: lastRedo.position, canUndo: false })
            break
          case 'removeSchedule':
            context.dispatch('removeSchedule', { scheduleID: lastRedo.oldSchedule.id, canUndo: false })
            break
          case 'addElement':
            context.dispatch('addElement', { newElement: lastRedo.newElement, position: lastRedo.position, canUndo: false })
            break
          case 'removeElement':
            context.dispatch('removeElement', { elementID: lastRedo.oldElement.id, canUndo: false })
            break
          default:
            break
        }
        context.commit('popRedo')
      }
    },
    apply (context, transformation) {
      if (transformation.type === 'update') {
        context.dispatch('update', transformation)
      } else if (transformation.type === 'addSchedule') {
        context.dispatch('addSchedule', transformation)
      } else if (transformation.type === 'removeSchedule') {
        context.dispatch('removeSchedule', transformation)
      } else if (transformation.type === 'addElement') {
        context.dispatch('addElement', transformation)
      } else if (transformation.type === 'removeElement') {
        context.dispatch('removeElement', transformation)
      }
    }
  },
  getters: {
    lookupElement: state => elementID => state.lookup.elements[elementID],
    lookupSchedule: state => scheduleID => state.lookup.schedules[scheduleID],
    getNestedProperty: (state, getters) => (elementID, path) => {
      try {
        return path.split('.').reduce((iterObj, prop) => iterObj[prop], getters.lookupElement(elementID))
      } catch (err) {
        return undefined
      }
    },
    getStartTime: state => element => state.lookup.calculatedTimes[element.id]['start'],
    getEndTime: state => element => state.lookup.calculatedTimes[element.id]['end'],
    getDuration: state => element => state.lookup.calculatedTimes[element.id]['duration'],
    pixelsPerHour: state => state.display.pixelsPerHour || 100,
    snapToMinutes: state => state.display.snapToMinutes || 15,
    getEventOffset: (state, getters) => element => getters.getStartTime(element) - state.event.start,
    getStartOfSchedule: (state, getters) => scheduleID => state.event.start + (getters.lookupSchedule(scheduleID).offset || 0),
    getEndOfSchedule: (state, getters) => (scheduleID) => {
      const schedule = getters.lookupSchedule(scheduleID)
      let end = state.event.start
      for (let i = 0; i < schedule.elements.length; i += 1) {
        const elementEnd = getters.getEndTime(schedule.elements[i])
        if (elementEnd > end) {
          end = elementEnd
        }
      }
      return end
    },
    getPreviousElement: (state, getters) => (elementID, scheduleID) => {
      const schedule = getters.lookupSchedule(scheduleID)
      const element = getters.lookupElement(elementID)
      return schedule.elements[schedule.elements.indexOf(element) - 1]
    },
    getNextElement: (state, getters) => (elementID, scheduleID) => {
      const schedule = getters.lookupSchedule(scheduleID)
      const element = getters.lookupElement(elementID)
      return schedule.elements[schedule.elements.indexOf(element) + 1]
    },
    eventDuration: state => state.event.end - state.event.start,
    assignState: state => ({ ongoing: state.display.assignOngoing, source: state.display.assignSource, side: state.display.assignSourceSide }),
    hoverHighlight: state => ({ target: state.display.hoverHighlightTarget, side: state.display.hoverHighlightSide })
  }
})

function calculateTimes (state) {
  const calculatedTimes = {}
  let schedule
  let element
  for (let i = 0; i < state.event.schedules.length; i += 1) {
    schedule = state.event.schedules[i]
    for (let j = 0; j < schedule.elements.length; j += 1) {
      element = schedule.elements[j]
      calculateStartTime(element, state, calculatedTimes)
      calculateEndTime(element, state, calculatedTimes)
      calculateDuration(element, state, calculatedTimes)
    }
  }
  return calculatedTimes
}

function calculateStartTime (element, state, calculatedTimes) {
  if (element.id in calculatedTimes && 'start' in calculatedTimes[element.id]) {
    return
  }

  if (element.start.actualTime) {
    return element.start.actualTime
  }
  let referencedElement
  let startTime
  switch (element.start.type || 'absolute') {
    case 'absolute':
      startTime = element.start.time + (element.start.offset || 0)
      break
    case 'startOf':
      referencedElement = state.lookup.elements[element.start.ref]
      // calculate and then use
      calculateStartTime(referencedElement, state, calculatedTimes)
      startTime = calculatedTimes[element.start.ref]['start']
      break
    case 'endOf':
      referencedElement = state.lookup.elements[element.start.ref]
      // calculate and then use
      calculateEndTime(referencedElement, state, calculatedTimes)
      startTime = calculatedTimes[element.start.ref]['end']
      break
    default:
      // safety valve
      startTime = state.event.start
      break
  }

  if (element.id in calculatedTimes) {
    calculatedTimes[element.id]['start'] = startTime
  } else {
    calculatedTimes[element.id] = { start: startTime }
  }
}

function calculateEndTime (element, state, calculatedTimes) {
  if (element.id in calculatedTimes && 'end' in calculatedTimes[element.id]) {
    return
  }

  if (element.end.actualTime) {
    return element.end.actualTime
  }
  let referencedElement
  let endTime
  switch (element.end.type || 'absolute') {
    case 'absolute':
      endTime = element.end.time + (element.end.offset || 0)
      break
    case 'duration':
      calculateStartTime(element, state, calculatedTimes)
      calculateDuration(element, state, calculatedTimes)
      endTime = calculatedTimes[element.id]['start'] + calculatedTimes[element.id]['duration']
      break
    case 'startOf':
      referencedElement = state.lookup.elements[element.end.ref]
      // calculate and then use
      calculateStartTime(referencedElement, state, calculatedTimes)
      endTime = calculatedTimes[element.end.ref]['start']
      break
    case 'endOf':
      referencedElement = state.lookup.elements[element.end.ref]
      // calculate and then use
      calculateEndTime(referencedElement, state, calculatedTimes)
      endTime = calculatedTimes[element.end.ref]['end']
      break
    default:
      // safety valve
      endTime = state.event.end
      break
  }

  if (element.id in calculatedTimes) {
    calculatedTimes[element.id]['end'] = endTime
  } else {
    calculatedTimes[element.id] = { end: endTime }
  }
}

function calculateDuration (element, state, calculatedTimes) {
  if (element.id in calculatedTimes && 'duration' in calculatedTimes[element.id]) {
    return
  }

  let duration
  if (!element.end.type || element.end.type === 'duration') {
    duration = (element.start.setup || 0) + element.end.duration + (element.end.teardown || 0)
  } else {
    calculateStartTime(element, state, calculatedTimes)
    calculateEndTime(element, state, calculatedTimes)
    duration = calculatedTimes[element.id]['end'] - calculatedTimes[element.id]['start']
  }

  if (element.id in calculatedTimes) {
    calculatedTimes[element.id]['duration'] = duration
  } else {
    calculatedTimes[element.id] = { end: duration }
  }
}
