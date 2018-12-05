<template>
  <div class="schedule">
    <schedulelistelement v-for="element in schedule.elements" :elementId="element" :key="element" :parent="scheduleId"></schedulelistelement>
  </div>
</template>

<script>
export default {
  name: 'ScheduleList',
  computed: {
    schedule () {
      return this.$store.getters.lookupSchedule(this.scheduleId) ? this.$store.getters.lookupSchedule(this.scheduleId) : { elements: [] }
    },
    scheduleId () {
      return this.$route.params.scheduleID
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
