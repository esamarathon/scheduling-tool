<template>
    <div class="editdialog">
      <md-dialog-title>{{ element.name }}</md-dialog-title>
      <md-dialog-content>
        <div class="column"><people :people="element.people"></people></div>
        <div class="column">{{ startTime.format('MMM Do HH:mm') }} - {{ endTime.format('MMM Do HH:mm') }}</div>
        <md-dialog-actions>
          <md-button class="md-primary" @click="$store.commit('closeEditDialog')">Close</md-button>
          <md-button class="md-primary" @click="saveChanges">Save</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </div>
</template>

<script>
export default {
  name: 'ListElement',
  data () {
    return {
      resizing: false,
      originalPosition: null,
      originalDuration: null,
      originalStart: null,
      resizer: null
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
    }
  },
  methods: {
    saveChanges () {
      // ToDo
      this.$store.commit('closeEditDialog')
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
