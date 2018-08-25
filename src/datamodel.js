import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

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
      redo: [],
      temporaryChange: null
    },
    lookup: {
      schedules: {},
      elements: {},
      referencedBy: {},
      calculatedTimes: {}
    }
  },
  mutations: {
    generateLookupTable (state) {
      let schedule
      let element
      state.lookup.schedules = {}
      state.lookup.elements = {}
      state.lookup.referencedBy = {}
      for (let i = 0; i < state.event.schedules.length; i += 1) {
        schedule = state.event.schedules[i]
        state.lookup.schedules[schedule.id] = schedule
        for (let j = 0; j < schedule.elements.length; j += 1) {
          element = schedule.elements[j]
          state.lookup.elements[element.id] = element
          if (element.start.ref) {
            if (state.lookup.referencedBy[element.start.ref]) {
              state.lookup.referencedBy[element.start.ref].add(element.id)
            } else {
              state.lookup.referencedBy[element.start.ref] = new Set([element.id])
            }
          }
          if (element.end.ref) {
            if (state.lookup.referencedBy[element.end.ref]) {
              state.lookup.referencedBy[element.end.ref].add(element.id)
            } else {
              state.lookup.referencedBy[element.end.ref] = new Set([element.id])
            }
          }
        }
      }
    },
    addElementId (state, { id, target }) {
      state.lookup.elements[id] = target
    },
    removeElementId (state, id) {
      delete state.lookup.elements[id]
    },
    addScheduleId (state, { id, target }) {
      state.lookup.schedules[id] = target
    },
    removeScheduleId (state, id) {
      delete state.lookup.schedules[id]
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
    clearTemporary (state) {
      state.history.temporaryChange = null
    },
    setTemporary (state, actions) {
      state.history.temporaryChange = actions
    },
    setNestedElementProperty (state, { elementID, path, value }) {
      try {
        const pathSplits = path.split('.')
        let iterObj = state.lookup.elements[elementID]
        for (let i = 0; i < pathSplits.length - 1; i += 1) {
          iterObj = iterObj[pathSplits[i]]
        }
        iterObj[pathSplits.slice(-1)[0]] = value
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
    setStartTime (state, { elementID, startTime }) {
      if (state.lookup.calculatedTimes[elementID]) {
        state.lookup.calculatedTimes[elementID].start = startTime
      } else {
        state.lookup.calculatedTimes[elementID] = { start: startTime }
      }
    },
    setEndTime (state, { elementID, endTime }) {
      if (state.lookup.calculatedTimes[elementID]) {
        state.lookup.calculatedTimes[elementID].end = endTime
      } else {
        state.lookup.calculatedTimes[elementID] = { end: endTime }
      }
    },
    setEventOffset (state, { elementID, eventOffset }) {
      if (state.lookup.calculatedTimes[elementID]) {
        state.lookup.calculatedTimes[elementID].eventOffset = eventOffset
      } else {
        state.lookup.calculatedTimes[elementID] = { end: eventOffset }
      }
    }
  },
  actions: {
    loadEvent (context, event) {
      const state = context.state
      state.event = event
      state.history = {
        undo: [],
        redo: [],
        temporaryChange: null
      }
      context.commit('generateLookupTable')
      // context.dispatch('calculateTimes')
    },
    calculateTimes (context) {
      context.state.lookup.calculatedTimes = {}
      let schedule
      let element
      for (let i = 0; i < context.state.event.schedules.length; i += 1) {
        schedule = context.state.event.schedules[i]
        for (let j = 0; j < schedule.elements.length; j += 1) {
          element = schedule.elements[j]
          context.dispatch('calculateTime', element.id)
        }
      }
    },
    calculateTime (context, elementID) {
      // Start Time
      const element = context.getters.lookupElement(elementID)

      if (element.start.actualTime) {
        return moment(element.start.actualTime)
      }
      let referencedTime
      let referencedElement
      let startTime
      switch (element.start.type || 'absolute') {
        case 'absolute':
          startTime = moment(element.start.time).add(moment.duration(element.start.offset || 0))
          break
        case 'startOf':
          referencedElement = context.getters.lookupElement(element.start.ref)
          if (referencedElement) {
            referencedTime = context.getters.getStartTime(referencedElement)
            if (referencedTime) {
              startTime = moment(referencedTime)
            } else {
              // need to resolve target times first
              context.dispatch('calculateTime', element.start.ref)
              startTime = moment(context.getters.getStartTime(referencedElement))
            }
          } else {
            // safety valve
            startTime = moment(context.state.event.start)
          }
          break
        case 'endOf':
          referencedElement = context.getters.lookupElement(element.start.ref)
          if (referencedElement) {
            referencedTime = context.getters.getEndTime(referencedElement)
            if (referencedTime) {
              startTime = moment(referencedTime)
            } else {
              // need to resolve target times first
              context.dispatch('calculateTime', element.start.ref)
              startTime = moment(context.getters.getEndTime(referencedElement))
            }
          } else {
            // safety valve
            startTime = moment(context.state.event.start)
          }
          break
        default:
          // safety valve
          startTime = moment(context.state.event.start)
          break
      }
      context.commit('setStartTime', { elementID, startTime })

      // Event offset
      context.commit('setEventOffset', { elementID, eventOffset: moment.duration(moment(startTime).diff(moment(context.state.event.start))) })

      // End Time
      if (element.end.actualTime) {
        return moment(element.end.actualTime)
      }
      let endTime
      switch (element.end.type || 'absolute') {
        case 'absolute':
          endTime = moment(element.end.time).add(moment.duration(element.end.offset || 0))
          break
        case 'duration':
          endTime = moment(startTime).add(context.getters.getDuration(element))
          break
        case 'startOf':
          referencedElement = context.getters.lookupElement(element.start.ref)
          if (referencedElement) {
            referencedTime = context.getters.getStartTime(referencedElement)
            if (referencedTime) {
              endTime = moment(referencedTime)
            } else {
              // need to resolve target times first
              context.dispatch('calculateTime', element.end.ref)
              endTime = moment(context.getters.getStartTime(referencedElement))
            }
          } else {
            // safety valve
            endTime = moment(context.state.event.end)
          }
          break
        case 'endOf':
          referencedElement = context.getters.lookupElement(element.start.ref)
          if (referencedElement) {
            referencedTime = context.getters.getEndTime(referencedElement)
            if (referencedTime) {
              endTime = moment(referencedTime)
            } else {
              // need to resolve target times first
              context.dispatch('calculateTime', element.end.ref)
              endTime = moment(context.getters.getEndTime(referencedElement))
            }
          } else {
            // safety valve
            endTime = moment(context.state.event.end)
          }
          break
        default:
          // safety valve
          endTime = moment(context.state.event.end)
          break
      }
      context.commit('setEndTime', { elementID, endTime })
    },
    update (context, { actions, canUndo = false }) {
      let action
      let element
      for (let i = 0; i < actions.length; i += 1) {
        action = actions[i]
        element = context.getters.lookupElement(action.id)
        // ToDo error handling
        if (element) {
          if (context.getters.getNestedProperty(action.id, action.path) === action.oldValue) {
            context.commit('setNestedElementProperty', { elementID: action.id, path: action.path, value: action.newValue })
          } else {
            return
          }
        } else {
          return
        }
      }
      if (canUndo) {
        context.commit('pushUndo', { type: 'update', actions })
      }
    },
    undoUpdate (context, actions) {
      let action
      let element
      for (let i = 0; i < actions.length; i += 1) {
        action = actions[i]
        element = context.getters.lookupElement(action.id)
        // ToDo error handling
        if (element) {
          if (context.getters.getNestedProperty(action.id, action.path) === action.newValue) {
            context.commit('setNestedElementProperty', { elementID: action.id, path: action.path, value: action.oldValue })
          } else {
            return
          }
        } else {
          return
        }
      }
    },
    addSchedule (context, { newSchedule, position = null, canUndo = false }) {
      context.commit('addSchedule', { newSchedule, position })
      context.commit('addScheduleId', { id: newSchedule.id, target: newSchedule })
      for (let i = 0; i < newSchedule.elements.length; i += 1) {
        context.commit('addElementId', { id: newSchedule.elements[i].id, target: newSchedule.elements[i] })
      }
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
      if (canUndo) {
        context.commit('pushUndo', { type: 'removeSchedule', oldPosition, oldSchedule })
      }
    },
    addElement (context, { newElement, position = null, canUndo = false }) {
      context.commit('addElement', { newElement, parent: context.getters.lookupSchedule(newElement.parent), position })
      context.commit('addElementId', { id: newElement.id, target: newElement })
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
      if (canUndo) {
        context.commit('pushUndo', { type: 'removeElement', oldPosition, oldElement })
      }
    },
    undo (context) {
      context.dispatch('clearTemporary')
      const lastUndo = context.state.history.undo.slice(-1)[0]
      if (lastUndo) {
        switch (lastUndo.type) {
          case 'update':
            context.dispatch('undoUpdate', lastUndo.actions)
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
      context.dispatch('clearTemporary')
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
      context.dispatch('clearTemporary')
      if (transformation.type === 'update') {
        context.dispatch('update', transformation)
      }
    },
    clearTemporary (context) {
      if (context.state.history.temporaryChange) {
        for (let i = 0; i < context.state.history.temporaryChange.length; i += 1) {
          const action = context.state.history.temporaryChange[i]
          context.commit('setNestedElementProperty', { elementID: action.id, path: action.path, value: action.oldValue })
        }
      }
      context.commit('clearTemporary')
    },
    setTemporary (context, actions) {
      context.dispatch('clearTemporary')
      context.commit('setTemporary', actions)
      for (let i = 0; i < actions.length; i += 1) {
        const action = actions[i]
        action.oldValue = context.getters.getNestedProperty(action.id, action.path)
        context.commit('setNestedElementProperty', { elementID: action.id, path: action.path, value: action.newValue })
      }
    },
    propagateUpdate (context, sourceID) {
      context.dispatch('calculateTimes')
      /*
      Doesn't work as i want it to...

      context.dispatch('calculateTime', sourceID)
      if (context.state.lookup.referencedBy[sourceID]) {
        for (let ref of context.state.lookup.referencedBy[sourceID]) {
          context.dispatch('calculateTime', ref)
          context.dispatch('propagateUpdate', ref)
        }
      } */
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
    getStartTime: (state, getters) => (element) => {
      if (element.start.actualTime) {
        return moment(element.start.actualTime)
      }
      let referencedElement
      switch (element.start.type || 'absolute') {
        case 'absolute':
          return moment(element.start.time).add(moment.duration(element.start.offset || 0))
        case 'startOf':
          referencedElement = getters.lookupElement(element.start.ref)
          if (referencedElement) {
            return getters.getStartTime(referencedElement)
          } else {
            // safety valve
            return moment(state.event.start)
          }
        case 'endOf':
          referencedElement = getters.lookupElement(element.start.ref)
          if (referencedElement) {
            return getters.getEndTime(referencedElement)
          } else {
            // safety valve
            return moment(state.event.start)
          }
        default:
          // safety valve
          return moment(state.event.start)
      }
    },
    getCachedStartTime: (state, getters) => element => state.lookup.calculatedTimes[element.id] ? state.lookup.calculatedTimes[element.id].start : null,
    getEndTime: (state, getters) => (element) => {
      if (element.end.actualTime) {
        return moment(element.end.actualTime)
      }
      let referencedElement
      switch (element.end.type || 'absolute') {
        case 'absolute':
          return moment(element.end.time).add(moment.duration(element.end.offset || 0))
        case 'duration':
          return moment(getters.getStartTime(element)).add(getters.getDuration(element))
        case 'startOf':
          referencedElement = getters.lookupElement(element.start.ref)
          if (referencedElement) {
            return getters.getStartTime(referencedElement)
          } else {
            // safety valve
            return moment(state.event.end)
          }
        case 'endOf':
          referencedElement = getters.lookupElement(element.start.ref)
          if (referencedElement) {
            return getters.getEndTime(referencedElement)
          } else {
            // safety valve
            return moment(state.event.end)
          }
        default:
          // safety valve
          return moment(state.event.end)
      }
    },
    getCachedEndTime: (state, getters) => element => state.lookup.calculatedTimes[element.id] ? state.lookup.calculatedTimes[element.id].end : null,
    getDuration: (state, getters) => (element) => {
      if (!element.end.type || element.end.type === 'duration') {
        return moment.duration(element.start.setup || 0)
          .add(moment.duration(element.end.duration))
          .add(moment.duration(element.end.teardown || 0))
      }
      return moment.duration(getters.getEndTime(element).diff(getters.getStartTime(element)))
    },
    pixelsPerHour: state => state.display.pixelsPerHour || 100,
    snapToMinutes: state => state.display.snapToMinutes || 15,
    getEventOffset: (state, getters) => (element) => moment.duration(moment(getters.getStartTime(element)).diff(moment(state.event.start))),
    getCachedEventOffset: (state, getters) => element => state.lookup.calculatedTimes[element.id] ? state.lookup.calculatedTimes[element.id].eventOffset : null,
    getStartOfSchedule: (state, getters) => scheduleID =>
      moment(state.event.start).add(moment.duration(getters.lookupSchedule(scheduleID).offset || 0)),
    getEndOfSchedule: (state, getters) => (scheduleID) => {
      const schedule = getters.lookupSchedule(scheduleID)
      let end = moment(state.event.start)
      for (let i = 0; i < schedule.elements.length; i += 1) {
        const elementEnd = getters.getEndTime(schedule.elements[i])
        if (elementEnd.isAfter(end)) {
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
    eventDuration: state => moment.duration(moment(state.event.end).diff(moment(state.event.start))),
    assignState: state => ({ ongoing: state.display.assignOngoing, source: state.display.assignSource, side: state.display.assignSourceSide }),
    hoverHighlight: state => ({ target: state.display.hoverHighlightTarget, side: state.display.hoverHighlightSide })
  }
})
