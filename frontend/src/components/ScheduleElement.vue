<template>
    <div class="element" :style="dynamicStyle" @dblclick="doubleClick" :title="hoverText" @dragstart="onDrag" draggable="true">
      <div @mousedown.stop="clickTop" @mouseover="mouseOverTop" @mouseout="mouseOutTop" @dblclick="doubleClickTop" class="resizer top" :style="dynamicStyleResizerTop"></div>
      <md-button class="icon-top-right md-icon-button" @click="deleteMe">
        <md-icon>delete</md-icon>
      </md-button>
      {{ name }}<br>
      <people :people="element.people"></people>
      <div @mousedown.stop="clickBottom" @mouseover="mouseOverBottom" @mouseout="mouseOutBottom" @dblclick="doubleClickBottom" class="resizer bottom" :style="dynamicStyleResizerBottom"></div>
    </div>
</template>

<script>
import { convertToAbsoluteTime, getElementName, roundTimeToNearest } from '@/scheduleUtils'
import _ from 'lodash'

export default {
  name: 'Element',
  data () {
    return {
      resizing: false,
      originalPosition: null,
      originalDuration: null,
      originalStart: null,
      originalEnd: null,
      temporaryDuration: null,
      temporaryStart: null,
      temporaryEnd: null,
      resizer: null,
      hoverTop: false,
      hoverBottom: false
    }
  },
  props: {
    elementId: {
      type: String
    },
    parent: {
      type: String
    },
    relativePosition: {
      type: Object
    }
  },
  computed: {
    startTime () {
      return this.temporaryStart ? this.temporaryStart : this.$store.getters.getStartTime(this.element)
    },
    endTime () {
      return this.temporaryEnd ? this.temporaryEnd : this.$store.getters.getEndTime(this.element)
    },
    duration () {
      return this.temporaryDuration ? this.temporaryDuration : this.$store.getters.getDuration(this.element)
    },
    eventOffset () {
      return this.temporaryStart ? (this.temporaryStart - this.$store.state.event.start) : this.$store.getters.getEventOffset(this.element)
    },
    snapToDuration () {
      return this.$store.getters.snapToMinutes * 60000
    },
    percentSetup () {
      return this.element.start.setup ? this.element.start.setup * 100 / this.duration : 0
    },
    percentTeardown () {
      return this.element.end.teardown ? (1 - (this.element.end.teardown / this.duration)) * 100 : 100
    },
    dynamicStyle () {
      const style = {
        height: (this.$store.getters.pixelsPerHour * this.duration / 3600000) + 'px',
        top: (this.$store.getters.pixelsPerHour * this.eventOffset / 3600000) + 'px',
        background: 'linear-gradient(to bottom, rgba(175, 175, 175, 0.75) ' + this.percentSetup + `%, ${this.backgroundColor} ` + this.percentSetup + `%, ${this.backgroundColor} ` + this.percentTeardown + '%, rgba(175, 175, 175, 0.75) ' + this.percentTeardown + '%)',
        left: this.relativePosition.position * (100 / this.relativePosition.of) + '%',
        width: (100 / this.relativePosition.of) + '%',
        cursor: 'move'
      }
      return style
    },
    topBorderColor () {
      if (this.assignState.ongoing) {
        if (this.assignState.source !== this.element._id) {
          return this.hoverTop ? 'green' : 'red'
        } else if (this.assignState.side === 'top') {
          return 'blue'
        }
      } else if (this.hoverTop && (this.element.start.type === 'startOf' || this.element.start.type === 'endOf')) {
        return 'green'
      } else if (this.hoverHighlight.target === this.element._id && this.hoverHighlight.side === 'top') {
        return 'green'
      }
      return 'transparent'
    },
    bottomBorderColor () {
      if (this.assignState.ongoing) {
        if (this.assignState.source !== this.element._id) {
          return this.hoverBottom ? 'green' : 'red'
        } else if (this.assignState.side === 'bottom') {
          return 'blue'
        }
      } else if (this.hoverBottom && (this.element.end.type === 'startOf' || this.element.end.type === 'endOf')) {
        return 'green'
      } else if (this.hoverHighlight.target === this.element._id && this.hoverHighlight.side === 'bottom') {
        return 'green'
      }
      return 'transparent'
    },
    dynamicStyleResizerTop () {
      const style = {
        '--fade-color': this.topBorderColor
      }
      if (this.canMoveStart && !this.assignState.ongoing) {
        style['cursor'] = 'row-resize'
      }
      return style
    },
    dynamicStyleResizerBottom () {
      const style = {
        '--fade-color': this.bottomBorderColor
      }
      if (this.canMoveEnd && !this.assignState.ongoing) {
        style['cursor'] = 'row-resize'
      }
      return style
    },
    canMoveStart () {
      return (this.element.start.type || 'absolute') === 'absolute'
    },
    canMoveEnd () {
      return ['duration', 'absolute'].includes((this.element.end.type || 'duration'))
    },
    canAssignTop () {
      // ToDo
      return true
    },
    canAssignBottom () {
      return true
    },
    assignState () {
      return this.$store.getters.assignState
    },
    hoverHighlight () {
      return this.$store.getters.hoverHighlight
    },
    element () {
      return this.$store.getters.lookupElement(this.elementId)
    },
    findings () {
      try {
        return this.$store.state.constraints.findings.element[this.elementId]
      } catch (err) {
        return undefined
      }
    },
    backgroundColor () {
      if (_.filter(this.findings, (finding) => finding.class === 'strict').length > 0) {
        return 'rgb(255, 0, 0, 0.75)'
      } else if (_.filter(this.findings, (finding) => finding.class === 'weak').length > 0) {
        return 'rgb(255, 165, 0, 0.75)'
      } else {
        return 'rgb(255, 127, 80, 0.75)'
      }
    },
    hoverText () {
      return _.join(_.map(this.findings, (finding) => `${finding.class}: ${finding.finding}`), '\n') || undefined
    },
    name () {
      return getElementName(this.element)
    }
  },
  methods: {
    clickBottom (event) {
      if (!this.assignState.ongoing && event.ctrlKey && this.canAssignBottom) {
        event.stopPropagation()
        event.preventDefault()
        this.$store.commit('startAssign', { source: this.element._id, side: 'bottom' })
        document.documentElement.addEventListener('keyup', this.stopAssign, true)
      } else if (this.assignState.ongoing) {
        if (this.assignState.source !== this.element._id) {
          event.stopPropagation()
          event.preventDefault()
          // assign source to this
          const sourceElement = this.$store.getters.lookupElement(this.assignState.source)
          const timing = this.assignState.side === 'top' ? 'start' : 'end'
          this.$store.dispatch('apply', { type: 'update',
            actions: [
              {idType: 'element', id: sourceElement._id, action: 'set', path: timing + '.type', oldValue: sourceElement[timing].type, newValue: 'endOf'},
              {idType: 'element', id: sourceElement._id, action: 'set', path: timing + '.ref', oldValue: sourceElement[timing].ref, newValue: this.element._id}
            ]})

          this.$store.commit('endAssign')
        }
      } else if (this.canMoveEnd) {
        event.stopPropagation()
        event.preventDefault()
        this.resizing = true
        this.originalPosition = event.clientY
        this.originalDuration = this.duration
        this.originalEnd = this.endTime
        this.temporaryDuration = this.duration
        this.temporaryEnd = this.endTime
        this.resizer = 'bottom'
        document.documentElement.addEventListener('mouseup', this.stopResizeBottom, true)
        document.documentElement.addEventListener('mousemove', this.moveResizeBottom, true)
      }
    },
    stopResizeBottom (event) {
      event.stopPropagation()
      event.preventDefault()
      document.documentElement.removeEventListener('mouseup', this.stopResizeBottom, true)
      document.documentElement.removeEventListener('mousemove', this.moveResizeBottom, true)
      // we dispatch the change as it has only been temporary for now
      if (this.element.end.type === 'duration') {
        const newDuration = this.temporaryDuration - (this.element.start.setup || 0) - (this.element.end.teardown || 0)
        this.$store.dispatch('apply', { type: 'update', actions: [{idType: 'element', id: this.element._id, action: 'set', path: 'end.duration', oldValue: this.element.end.duration, newValue: newDuration}] })
      } else if (this.element.end.type === 'absolute') {
        this.$store.dispatch('apply', { type: 'update', actions: [{idType: 'element', id: this.element._id, action: 'set', path: 'end.time', oldValue: this.element.end.time, newValue: this.temporaryEnd}] })
      }
      this.resizing = false
      this.originalPosition = null
      this.temporaryDuration = null
      this.temporaryEnd = null
      this.originalDuration = null
      this.originalEnd = null
      this.resizer = null
    },
    moveResizeBottom (event) {
      if (this.resizing) {
        event.stopPropagation()
        event.preventDefault()
        const delta = event.clientY - this.originalPosition
        if (this.element.end.type === 'duration') {
          let newDuration = this.originalDuration + (delta / this.$store.getters.pixelsPerHour) * 3600000
          // round to nearest snapping point
          const newEndTime = roundTimeToNearest(this.startTime + newDuration, this.snapToDuration)
          newDuration = newEndTime - this.startTime
          this.temporaryEnd = newEndTime
          this.temporaryDuration = newDuration
        } else if (this.element.end.type === 'absolute') {
          const newEndTime = roundTimeToNearest(this.originalEnd + (delta / this.$store.getters.pixelsPerHour) * 3600000, this.snapToDuration)
          this.temporaryEnd = newEndTime
          this.temporaryDuration = newEndTime - this.startTime
        }
      }
    },
    clickTop (event) {
      if (!this.assignState.ongoing && event.ctrlKey && this.canAssignTop) {
        event.stopPropagation()
        event.preventDefault()
        this.$store.commit('startAssign', { source: this.element._id, side: 'top' })
        document.documentElement.addEventListener('keyup', this.stopAssign, true)
      } else if (this.assignState.ongoing) {
        if (this.assignState.source !== this.element._id) {
          event.stopPropagation()
          event.preventDefault()
          // assign source to this
          const sourceElement = this.$store.getters.lookupElement(this.assignState.source)
          const timing = this.assignState.side === 'top' ? 'start' : 'end'
          this.$store.dispatch('apply', { type: 'update',
            actions: [
              {idType: 'element', id: sourceElement._id, action: 'set', path: timing + '.type', oldValue: sourceElement[timing].type, newValue: 'startOf'},
              {idType: 'element', id: sourceElement._id, action: 'set', path: timing + '.ref', oldValue: sourceElement[timing].ref, newValue: this.element._id}
            ]})

          this.$store.commit('endAssign')
        }
      } else if (this.canMoveStart) {
        event.stopPropagation()
        event.preventDefault()
        this.resizing = true
        this.originalPosition = event.clientY
        this.originalStart = this.startTime
        this.originalDuration = this.duration
        this.temporaryDuration = this.duration
        this.temporaryStart = this.startTime
        this.resizer = 'bottom'
        document.documentElement.addEventListener('mouseup', this.stopResizeTop, true)
        document.documentElement.addEventListener('mousemove', this.moveResizeTop, true)
      }
    },
    stopResizeTop (event) {
      event.stopPropagation()
      event.preventDefault()
      // we dispatch the change as it has only been temporary for now
      const newDuration = this.temporaryDuration - (this.element.start.setup || 0) - (this.element.end.teardown || 0)
      this.$store.dispatch('apply', { type: 'update',
        actions: [{idType: 'element', id: this.element._id, action: 'set', path: 'end.duration', oldValue: this.element.end.duration, newValue: newDuration},
          {idType: 'element', id: this.element._id, action: 'set', path: 'start.time', oldValue: this.element.start.time, newValue: this.temporaryStart}]})
      this.resizing = false
      this.originalPosition = null
      this.temporaryDuration = null
      this.temporaryStart = null
      this.originalDuration = null
      this.originalStart = null
      this.resizer = null
      document.documentElement.removeEventListener('mouseup', this.stopResizeTop, true)
      document.documentElement.removeEventListener('mousemove', this.moveResizeTop, true)
    },
    moveResizeTop (event) {
      if (this.resizing) {
        event.stopPropagation()
        event.preventDefault()
        const delta = event.clientY - this.originalPosition
        const newStartTime = roundTimeToNearest(this.originalStart + (delta / this.$store.getters.pixelsPerHour) * 3600000, this.snapToDuration)
        const newDuration = this.originalStart + this.originalDuration - newStartTime
        this.temporaryStart = newStartTime
        this.temporaryDuration = newDuration
      }
    },
    stopAssign (event) {
      if (event.which === 17) {
        event.stopPropagation()
        event.preventDefault()
        this.$store.commit('endAssign')
        document.documentElement.removeEventListener('keyup', this.stopAssign, true)
      }
    },
    deleteMe () {
      this.$store.dispatch('removeElement', { elementId: this.element._id, parent: this.parent })
    },
    mouseOverBottom () {
      this.hoverBottom = true
      if (this.element.end.type === 'endOf' || this.element.end.type === 'startOf') {
        this.$store.commit('hoverHighlight', { target: this.element.end.ref, side: this.element.end.type === 'endOf' ? 'bottom' : 'top' })
      }
    },
    mouseOverTop () {
      this.hoverTop = true
      if (this.element.start.type === 'endOf' || this.element.start.type === 'startOf') {
        this.$store.commit('hoverHighlight', { target: this.element.start.ref, side: this.element.start.type === 'endOf' ? 'bottom' : 'top' })
      }
    },
    mouseOutTop () {
      this.hoverTop = false
      this.$store.commit('hoverHighlightClear')
    },
    mouseOutBottom () {
      this.hoverBottom = false
      this.$store.commit('hoverHighlightClear')
    },
    doubleClickTop (event) {
      // convert to absolute
      // ToDo maybe restrict when can happen
      event.stopPropagation()
      event.preventDefault()
      this.$store.dispatch('apply', { type: 'update',
        actions: convertToAbsoluteTime(this.element, 'start')
      })
    },
    doubleClickBottom (event) {
      // ToDo maybe restrict when can happen
      event.stopPropagation()
      event.preventDefault()
      if (event.ctrlKey) {
        // convert to absolute
        this.$store.dispatch('apply', { type: 'update',
          actions: convertToAbsoluteTime(this.element, 'end', 'absolute')
        })
        this.$store.commit('hoverHighlightClear')
      } else {
        // convert to duration
        this.$store.dispatch('apply', { type: 'update',
          actions: convertToAbsoluteTime(this.element, 'end', 'duration')
        })
        this.$store.commit('hoverHighlightClear')
      }
    },
    doubleClick (event) {
      event.stopPropagation()
      event.preventDefault()
      this.$store.commit('showEditDialog', { elementID: this.elementId, scheduleID: this.parent })
    },
    onDrag (ev) {
      ev.stopPropagation()
      ev.dataTransfer.setData('element', this.elementId)
      ev.dataTransfer.setData('parentSchedule', this.parent)
      ev.dataTransfer.setData('xoffset', ev.offsetX)
      ev.dataTransfer.setData('yoffset', ev.offsetY)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.element {
  border-radius: 3px;
  border: 1px solid black;
  margin-bottom: -1px;
  margin-right: -1px;
  position: absolute;
  overflow: hidden;
  background-position: 0% 0%;
}
.resizer {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 10000;
  -moz-background-clip: padding-box;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  height: 10px;
  width: 100%;
  position: absolute;
}
.resizer.bottom {
  bottom: 0;
  --fade-color: transparent;
  background: linear-gradient(to bottom, transparent 0%, var(--fade-color) 100%);
  background-position: 0% 0%;
}
.resizer.top {
  --fade-color: transparent;
  background: linear-gradient(to bottom, var(--fade-color) 0%, transparent 100%);
  background-position: 0% 0%;
}
.icon-top-right {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
