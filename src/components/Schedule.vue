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
      <scheduleelement v-for="element in filteredRuns" :element="element" :key="element.id"></scheduleelement>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import uuidv4 from 'uuid/v4'

export default {
  name: 'Schedule',
  data () {
    return {
    }
  },
  props: {
    schedule: {
      type: Object
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  methods: {
    addElement () {
      const newElement = {
        id: uuidv4(),
        parent: this.schedule.id,
        people: [],
        start: {
          type: 'absolute',
          time: this.$store.getters.getEndOfSchedule(this.schedule.id).toISOString()
        },
        end: {
          type: 'duration',
          duration: '01:00:00'
        },
        name: 'New Run'
      }
      this.$store.dispatch('addElement', { newElement, canUndo: true })
    },
    deleteMe () {
      this.$store.dispatch('removeSchedule', { scheduleID: this.schedule.id, canUndo: true })
    }
  },
  computed: {
    filteredRuns () {
      return _.filter(this.schedule.elements, element => element.name.toLowerCase().includes(this.searchText.toLowerCase()))
    },
    scheduleName () {
      return this.schedule.name
    },
    sequential () {
      return this.schedule.sequential
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
