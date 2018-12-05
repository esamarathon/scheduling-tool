<template>
  <div>
    Editing Event {{ eventName }}<br>
    <md-tabs md-sync-route :md-alignment='"fixed"'>
      <md-tab :id='"ColumnsView"' :md-label='"Columns"' :to="{ name: 'ColumnsView' }"></md-tab>
      <md-tab :id='"ListView"' :md-label='"List"' :to="{ name: 'ListView' }"></md-tab>
      <md-tab :id='"DevView"' :md-label='"Dev"' :to="{ name: 'DevView' }"></md-tab>
    </md-tabs>
    <router-view/>
    <md-dialog :md-active.sync="editElement">
      <editdialog :elementId="this.$store.state.dialogs.editElement" :scheduleId="this.$store.state.dialogs.editElementParent" ></editdialog>
    </md-dialog>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Event',
  data () {
    return {
      selectedTab: 'ColumnsView'
    }
  },
  computed: {
    eventID () {
      return this.$store.state.event._id
    },
    eventName () {
      return this.$store.state.event.name
    },
    schedules () {
      return this.$store.state.event.schedules
    },
    editElement: {
      get: function () {
        return this.$store.state.dialogs.editElement !== null
      },
      set: function (newValue) {
        this.$store.commit('closeEditDialog')
      }
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
    }
  },
  mounted: function () {
    this.$store.dispatch('loadEvent', this.$route.params.eventID)
    document.documentElement.addEventListener('keydown', this.captureUndo, true)
  },
  beforeDestroy: function () {
    document.documentElement.removeEventListener('keydown', this.captureUndo, true)
  },
  beforeRouteEnter (to, from, next) {
    if (to.name === 'Event') {
      next({path: _.trimEnd(to.path, '/') + '/columns'})
    } else {
      next()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.column {
  float: left;
}
</style>
