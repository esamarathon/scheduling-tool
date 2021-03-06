<template>
    <div class="editdialog">
      <md-dialog-title>{{ name }}</md-dialog-title>
      <md-dialog-content>
        <div><people :people="element.people"></people></div>
        <div>{{ startTime.format('MMM Do HH:mm') }} - {{ endTime.format('MMM Do HH:mm') }}</div>
        <data-edit-field v-for="dataElement in dataSchema" :key="dataElement.name" :definition="dataElement" :originalValue="element.data[dataElement.name]" @modified="modifiedValue"></data-edit-field>
        <md-dialog-actions>
          <md-button class="md-primary" @click="$store.commit('closeEditDialog')">Close</md-button>
          <md-button class="md-primary" @click="saveChanges">Save</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { getElementName } from '../scheduleUtils'

export default {
  name: 'ElementEditDialog',
  data () {
    return {
      modifiedData: {}
    }
  },
  props: {
    elementId: {
      type: String
    },
    scheduleId: {
      type: String
    }
  },
  computed: {
    startTime () {
      return moment(this.$store.getters.getStartTime(this.element))
    },
    endTime () {
      return moment(this.$store.getters.getEndTime(this.element))
    },
    duration () {
      return this.$store.getters.getDuration(this.element)
    },
    parentSchedule () {
      if (this.scheduleId) {
        return this.$store.getters.lookupSchedule(this.scheduleId)
      } else {
        // need to search the schedules to see which one is the parent
        let schedule
        for (let i = 0; i < this.$store.state.event.schedules.length; i++) {
          schedule = this.$store.getters.lookupSchedule(this.$store.state.event.schedules[i])
          for (let j = 0; j < schedule.elements.length; j++) {
            if (schedule.elements[j] === this.elementId) return schedule
          }
        }
      }
    },
    dataSchema () {
      return this.parentSchedule.dataSchema
    },
    element () {
      return this.$store.getters.lookupElement(this.elementId)
    },
    name () {
      return getElementName(this.element)
    }
  },
  methods: {
    saveChanges () {
      if (this.modifiedData) {
        const modifiedActions = _.map(this.modifiedData, (value, name) => { return {idType: 'element', action: 'set', id: this.element._id, path: 'data.' + name, oldValue: this.element.data[name], newValue: value} })
        this.$store.dispatch('apply', { type: 'update', actions: modifiedActions })
      }
      this.$store.commit('closeEditDialog')
    },
    modifiedValue ({ name, value }) {
      this.modifiedData[name] = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editdialog {
  border-radius: 3px;
  border: 1px solid black;
  overflow: hidden;
}
</style>
