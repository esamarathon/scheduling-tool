<template>
    <div class="element" @dblclick="doubleClick">
      <div class="column">Name: {{ element.name }}</div>
      <div class="column"><people :people="element.people"></people></div>
      <div class="column">{{ startTime.format('MMM Do HH:mm') }} - {{ endTime.format('MMM Do HH:mm') }}</div>
    </div>
</template>

<script>
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
    element: {
      type: Object
    }
  },
  computed: {
    // ToDo, this doesn't quite work the way I intended
    startTime () {
      return this.$store.getters.getStartTime(this.element)
    },
    endTime () {
      return this.$store.getters.getEndTime(this.element)
    },
    duration () {
      return this.$store.getters.getDuration(this.element)
    }
  },
  methods: {
    doubleClick (event) {
      event.stopPropagation()
      event.preventDefault()
      this.$store.commit('showEditDialog', this.element.id)
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
