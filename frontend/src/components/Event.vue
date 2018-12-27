<template>
  <div class="event">
    <div class="header">
      <div class="tagline">
        <div class="eventname">{{ eventName }}</div>
        <div class="tagelement">
          <span v-if="constraintCheck">{{constraintCount}} constraints to check </span>
          <span class="weak" v-if="weakCount"> {{weakCount}} weak</span>
          <span class="strict" v-if="strictCount"> {{strictCount}} strict</span>
           findings
        </div>
      </div>
      <md-tabs md-sync-route :md-alignment='"fixed"'>
        <md-tab :id='"ColumnsView"' :md-label='"Columns"' :to="{ name: 'ColumnsView' }"></md-tab>
        <md-tab :id='"ListView"' :md-label='"List"' :to="{ name: 'ListView' }"></md-tab>
        <md-tab :id='"ConstraintsView"' :md-label='"Constraints"' :to="{ name: 'ConstraintsView' }"></md-tab>
        <md-tab :id='"DevView"' :md-label='"Dev"' :to="{ name: 'DevView' }"></md-tab>
      </md-tabs>
    </div>
    <div class="content">
      <router-view/>
    </div>
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
    },
    constraintCheck () {
      return this.$store.getters.constraintCheckState
    },
    weakCount () {
      return this.$store.getters.weakFindings.length
    },
    strictCount () {
      return this.$store.getters.strictFindings.length
    },
    constraintCount () {
      return this.$store.state.constraints.stackSize
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
.event {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  flex: 0 0 auto;
}
.content {
  flex: 1 1 auto;
  overflow-y: auto;
  height: 100%;
}
.weak {
  color: orange
}
.strict {
  color: red
}
.tagline {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.eventname {
  font-weight: bold;
  font-size: 20px;
}
</style>
