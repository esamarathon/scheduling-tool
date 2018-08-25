<template>
  <div class="schedule">
    <schedulelistelement v-for="element in schedule.elements" :element="element" :key="element.id"></schedulelistelement>
  </div>
</template>

<script>
export default {
  name: 'ScheduleList',
  props: {
    scheduleID: {}
  },
  computed: {
    schedule () {
      return this.$store.getters.lookupSchedule(this.scheduleID)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
