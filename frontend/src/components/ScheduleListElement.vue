<template>
    <div class="element" @dblclick="doubleClick">
      <div class="column">Name: {{ element.name }}</div>
      <div class="column"><people :people="element.people"></people></div>
      <div class="column">{{ startTime.format('MMM Do HH:mm') }} - {{ endTime.format('MMM Do HH:mm') }}</div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ListElement',
  data () {
    return {
      resizing: false,
      originalPosition: null,
      originalDuration: null,
      originalStart: null,
      resizer: null
    }
  },
  props: {
    elementId: {
      type: String
    },
    parent: {
      type: String
    }
  },
  computed: {
    // ToDo, this doesn't quite work the way I intended
    startTime () {
      return moment(this.$store.getters.getStartTime(this.element))
    },
    endTime () {
      return moment(this.$store.getters.getEndTime(this.element))
    },
    duration () {
      return this.$store.getters.getDuration(this.element)
    },
    element () {
      return this.$store.getters.lookupElement(this.elementId)
    }
  },
  methods: {
    doubleClick (event) {
      event.stopPropagation()
      event.preventDefault()
      this.$store.commit('showEditDialog', { elementID: this.elementId, scheduleID: this.parent })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.element {
  width: 100%;
  background-color: #ccc;
  border-radius: 3px;
  border: 1px solid black;
  margin-bottom: -1px;
  margin-right: -1px;
  overflow: hidden;
}
.column {
  float: left;
}
</style>
