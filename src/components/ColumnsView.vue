<template>
  <div class="columnsview">
    <div class="header">
      Zoom: <input type="range" min="10" max="200" v-model="zoomFactor">
      Filter: <input type="text" v-model="searchText">
      Snap To: <input type="range" min="0" max="60" step="5" v-model="snapTo"> {{ this.snapTo }} min
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
        v-for="schedule in schedules" :key="schedule.id" :schedule="schedule" :searchText="searchText" :timeTableHeight="timeTableHeight"></schedule>
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import moment from 'moment'

export default {
  name: 'ColumnsView',
  computed: {
    schedules () {
      return this.$store.state.event.schedules
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
      return this.$store.getters.pixelsPerHour * this.$store.getters.eventDuration.asHours()
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
      searchText: ''
    }
  },
  methods: {
    addNewSchedule () {
      const newSchedule = {
        name: 'New Schedule',
        id: uuidv4(),
        elements: []
      }
      this.$store.dispatch('apply', { type: 'addSchedule', newSchedule, canUndo: true })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.column {
  float: left;
}
.header {
  overflow: hidden;
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
