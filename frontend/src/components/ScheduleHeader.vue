<template>
  <div class="header">{{ scheduleName }}
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
