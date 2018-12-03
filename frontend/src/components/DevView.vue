<template>
  <div>
    <div class="devview">
        <textarea v-model="eventData" class="eventJson"></textarea>
    </div>
    <button @click="loadJson">Load event from JSON</button>
  </div>
</template>

<script>
export default {
  name: 'DevView',
  data () {
    return {
      modifiedEventData: null
    }
  },
  props: {
    searchText: {
      type: String,
      default: ''
    }
  },
  computed: {
    eventData: {
      get: function () {
        return JSON.stringify({
          event: this.$store.state.event,
          schedules: this.$store.state.schedules,
          elements: this.$store.state.elements
        }, null, 2)
      },
      set: function (newValue) {
        this.modifiedEventData = newValue
      }
    },
    schedules () {
      return this.$store.state.event.schedules
    }
  },
  methods: {
    loadJson () {
      if (this.modifiedEventData) {
        const newEventData = JSON.parse(this.modifiedEventData)
        this.$store.dispatch('loadEvent', newEventData)
      }
    }
  },
  mounted: function () {
    this.modifiedEventData = null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eventJson {
  width: 95%;
  height: 400px;
}
</style>
