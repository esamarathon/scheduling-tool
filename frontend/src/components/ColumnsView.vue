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
    <div class="timetable">
      <div class="scheduleheader">
        <div style="width: 10%"></div>
        <ScheduleHeader :style="{ width: 90 / selectedSchedules.length + '%' }"
          v-for="schedule in selectedSchedules" :key="schedule.id" :scheduleId="schedule.id"/>
      </div>
      <div class="content" :style="timeTableStyle">
        <div class="timemarks">
          <div class="hourmarker" :style="hourMarkerStyle" v-for="hourmarker in hourmarkers" :key="hourmarker.time">{{ hourmarker.display }}</div>
        </div>
        <schedule :style="{ width: 90 / selectedSchedules.length + '%' }"
          v-for="schedule in selectedSchedules" :key="schedule.id" :scheduleId="schedule.id" :searchText="searchText"/>
      </div>
    </div>
  </div>
</template>

<script>
import { generateID } from '../backend-api'
import moment from 'moment'
import _ from 'lodash'
import ScheduleHeader from './ScheduleHeader'

export default {
  name: 'ColumnsView',
  components: {
    ScheduleHeader
  },
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
        'background-size': '91% ' + this.$store.getters.pixelsPerHour + 'px'
      }
    },
    hourMarkerStyle () {
      return {
        height: this.$store.getters.pixelsPerHour + 'px'
      }
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
.header {
  overflow: visible;
  position: relative;
  flex: 0 0 auto;
}
.icon-top-right {
  position: absolute;
  top: 0;
  right: 0;
}
.timetable {
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
.scheduleheader {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
}
.content {
  flex: 1 1 auto;
  overflow-y: auto;
  background: linear-gradient(to bottom, black 2%, transparent 2%, transparent 25%, grey 25%, grey 26%, transparent 26%, transparent 50%, grey 50%, grey 51%, transparent 51%, transparent 75%, grey 75%, grey 76%, transparent 76%);
  background-position: 100% 0px;
  background-repeat: repeat-y;
  background-attachment: local;
  display: flex;
  flex-direction: row;
}
.timemarks {
  width: 10%;
  flex: 0 0 auto;
  overflow: visible;
}
.columnsview {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.hourmarker {
  margin-top: -8px;
  margin-bottom: 8px;
}
</style>
