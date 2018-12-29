<template>
  <div class="header" :style="{ backgroundColor: this.backgroundColor }" :title="hoverText">{{ scheduleName }}
    <span class="icon-top-right">
      <md-button class="md-icon-button" @click="addElement">
        <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="deleteMe">
        <md-icon>delete</md-icon>
      </md-button>
    </span>
  </div>
</template>

<script>
import { generateID } from '../backend-api'
import _ from 'lodash'

export default {
  name: 'ScheduleHeader',
  props: {
    scheduleId: {
      type: String
    }
  },
  methods: {
    addElement () {
      const newElement = {
        _id: generateID(),
        people: [],
        start: {
          type: 'absolute',
          time: this.$store.getters.getEndOfSchedule(this.scheduleId)
        },
        end: {
          type: 'duration',
          duration: 3600000
        },
        name: 'New Run'
      }
      this.$store.dispatch('addElement', { parent: this.scheduleId, newElement })
    },
    deleteMe () {
      this.$store.dispatch('removeSchedule', this.schedule._id)
    }
  },
  computed: {
    scheduleName () {
      return this.schedule.name
    },
    schedule () {
      return this.$store.getters.lookupSchedule(this.scheduleId)
    },
    findings () {
      try {
        return this.$store.state.constraints.findings.schedule[this.scheduleId]
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
        return 'rgb(0, 0, 0, 0)'
      }
    },
    hoverText () {
      return _.join(_.map(this.findings, (finding) => `${finding.class}: ${finding.finding}`), '\n') || undefined
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-top-right {
  position: absolute;
  top: 0;
  right: 0;
}
.header {
  position: relative;
  overflow: hidden;
  height: 40px;
}
</style>
