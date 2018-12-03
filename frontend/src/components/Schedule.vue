<template>
  <div class="schedule">
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
    <div class="elementList">
      <scheduleelement v-for="element in filteredRuns" :elementId="element" :parent="scheduleId" :key="element"></scheduleelement>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { generateID } from '../backend-api'

export default {
  name: 'Schedule',
  data () {
    return {
    }
  },
  props: {
    scheduleId: {
      type: String
    },
    searchText: {
      type: String,
      default: ''
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
    filteredRuns () {
      return _.filter(this.schedule.elements, element => this.$store.getters.lookupElement(element).name.toLowerCase().includes(this.searchText.toLowerCase()))
    },
    scheduleName () {
      return this.schedule.name
    },
    sequential () {
      return this.schedule.sequential
    },
    schedule () {
      return this.$store.getters.lookupSchedule(this.scheduleId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.elementList {
  position: relative;
}
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
