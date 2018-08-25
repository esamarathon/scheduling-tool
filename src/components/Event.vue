<template>
  <div class="hello">
    Editing event ID {{ eventName }}.<br>
    <md-tabs v-on:md-changed="updateTab" :md-alignment='"fixed"'>
      <md-tab :id='"columnsview"' :md-label='"Columns"'></md-tab>
      <md-tab :id='"listview"' :md-label='"List"'></md-tab>
      <md-tab :id='"devview"' :md-label='"Dev"'></md-tab>
    </md-tabs>
    <component v-bind:is="selectedTab"></component>
  </div>
</template>

<script>
import fetchEvent from '@/connection.js'

export default {
  name: 'Event',
  data () {
    return {
      selectedTab: 'columnsview'
    }
  },
  computed: {
    eventID () {
      return this.$store.state.event.eventID
    },
    eventName () {
      return this.$store.state.event.name
    },
    schedules () {
      return this.$store.state.event.schedules
    }
  },
  methods: {
    captureUndo (event) {
      if (event) {
        if (event.ctrlKey && event.keyCode === 90) {
          // ctrl + z
          this.$store.dispatch('undo')
          event.stopPropagation()
          event.preventDefault()
        } else if (event.ctrlKey && event.keyCode === 89) {
          // ctrl + y
          this.$store.dispatch('redo')
          event.stopPropagation()
          event.preventDefault()
        }
      }
    },
    updateTab (newTab) {
      this.selectedTab = newTab
    }
  },
  mounted: function () {
    this.$store.dispatch('loadEvent', fetchEvent(this.$route.params.eventID))
    document.documentElement.addEventListener('keydown', this.captureUndo, true)
  },
  beforeDestroy: function () {
    document.documentElement.removeEventListener('keydown', this.captureUndo, true)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.column {
  float: left;
}
</style>
