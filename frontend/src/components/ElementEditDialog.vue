<template>
    <div class="editdialog">
      <md-dialog-title>{{ element.name }}</md-dialog-title>
      <md-dialog-content>
        <div><people :people="element.people"></people></div>
        <div>{{ startTime.format('MMM Do HH:mm') }} - {{ endTime.format('MMM Do HH:mm') }}</div>
        <data-edit-field v-for="dataElement in dataItems" :key="dataElement.name" :definition="dataElement" :originalValue="element.data[dataElement.name]" @modified="modifiedValue"></data-edit-field>
        <md-dialog-actions>
          <md-button class="md-primary" @click="$store.commit('closeEditDialog')">Close</md-button>
          <md-button class="md-primary" @click="saveChanges">Save</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ElementEditDialog',
  data () {
    return {
      modifiedData: {}
    }
  },
  props: {
    element: {
      type: Object
    }
  },
  computed: {
    startTime () {
      return this.$store.getters.getStartTime(this.element)
    },
    endTime () {
      return this.$store.getters.getEndTime(this.element)
    },
    duration () {
      return this.$store.getters.getDuration(this.element)
    },
    dataItems () {
      return this.$store.getters.lookupSchedule(this.element.parent).dataItems
    }
  },
  methods: {
    saveChanges () {
      if (this.modifiedData) {
        const modifiedActions = _.map(this.modifiedData, (value, name) => { return {id: this.element.id, path: 'data.' + name, oldValue: this.element.data[name], newValue: value} })
        this.$store.dispatch('apply', { type: 'update', actions: modifiedActions, canUndo: true })
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
