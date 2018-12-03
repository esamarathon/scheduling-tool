<template>
  <div class="columnsview">
    <div class="header">
      Zoom: <input type="range" min="10" max="200" v-model="zoomFactor">
      Filter: <input type="text" v-model="searchText">
      Snap To: <input type="range" min="0" max="60" step="5" v-model="snapTo"> {{ this.snapTo }} min
      <multiselect :multiple="true" v-model="selectedSchedules" :options="schedules" label="name" trackBy="id" placeholder="Select schedules to display" :close-on-select="false" :clear-on-select="false" :hide-selected="true"></multiselect>
      <md-button class="md-icon-button icon-top-right" @click="addNewSchedule">
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <div class="timetable" :style="timeTableStyle">
      <div class="timemarks column" :style="timeMarksStyle">
        <div class="separator" style="height: 32px;"></div>
        <div class="hourmarker" :style="hourMarkerStyle" v-for="hourmarker in hourmarkers" :key="hourmarker.time">{{ hourmarker.display }}</div>
      </div>
      <schedule class="column" :style="{ width: 90 / schedules.length + '%' }"
        v-for="schedule in selectedSchedules" :key="schedule.id" :scheduleId="schedule.id" :searchText="searchText" :timeTableHeight="timeTableHeight"></schedule>
    </div>
  </div>
</template>

<script>
import { generateID } from '../backend-api'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'ColumnsView',
  computed: {
    schedules () {
      return this.$store.state.event.schedules ? _.map(this.$store.state.event.schedules, (value) => { return { id: value, name: this.$store.getters.lookupSchedule(value).name } }) : []
    },
    zoomFactor: {
      get: function () {
        return this.$store.getters.pixelsPerHour
      },
      set: function (newValue) {
        this.$store.commit('setZoomFactor', newValue)
      }
    },
    snapTo: {
      get: function () {
        return this.$store.getters.snapToMinutes
      },
      set: function (newValue) {
        this.$store.commit('setSnapToMinutes', newValue)
      }
    },
    timeTableStyle () {
      return {
        'background-size': '91% ' + this.$store.getters.pixelsPerHour + 'px',
        height: this.timeTableHeight + 'px'
      }
    },
    timeMarksStyle () {
      return {
        height: (this.timeTableHeight + 40) + 'px'
      }
    },
    hourMarkerStyle () {
      return {
        height: this.$store.getters.pixelsPerHour + 'px'
      }
    },
    timeTableHeight () {
      return this.$store.getters.pixelsPerHour * this.$store.getters.eventDuration / 3600000
    },
    hourmarkers () {
      let startTime = moment(this.$store.state.event.start)
      const endTime = moment(this.$store.state.event.end)
      const ret = [{ time: startTime.toISOString(), display: startTime.format('MMM Do HH:mm') }]
      startTime.add(1, 'h')
      while (endTime.isAfter(startTime)) {
        ret.push({
          time: startTime.toISOString(),
          display: startTime.hours() === 0 ? startTime.format('MMM Do HH:mm') : startTime.format('HH:mm')
        })
        startTime.add(1, 'h')
      }
      return ret
    }
  },
  data () {
    return {
      searchText: '',
      selectedSchedules: []
    }
  },
  methods: {
    addNewSchedule () {
      const newSchedule = {
        name: 'New Schedule',
        _id: generateID(),
        elements: []
      }
      this.$store.dispatch('addSchedule', newSchedule)
    }
  },
  watch: {
    schedules: function (val) {
      this.selectedSchedules = val.slice()
    }
  },
  mounted: function () {
    // ToDo keep selection cached on view change? Might be useful
    this.selectedSchedules = this.schedules ? this.schedules.slice() : []
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.column {
  float: left;
}
.header {
  overflow: visible;
  position: relative;
}
.icon-top-right {
  position: absolute;
  top: 0;
  right: 0;
}
.timetable {
  background: linear-gradient(to bottom, black 2%, transparent 2%, transparent 25%, grey 25%, grey 26%, transparent 26%, transparent 50%, grey 50%, grey 51%, transparent 51%, transparent 75%, grey 75%, grey 76%, transparent 76%);
  background-position: 100% 40px;
  background-repeat: repeat-y;
  width: 100%;
}
.timemarks {
  width: 10%;
}
</style>
