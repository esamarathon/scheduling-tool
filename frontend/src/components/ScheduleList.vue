<template>
  <div class="schedule">
    <schedulelistelement v-for="element in schedule.elements" :elementId="element" :key="element" :parent="scheduleId"></schedulelistelement>
  </div>
</template>

<script>
export default {
  name: 'ScheduleList',
  props: {
    scheduleId: {}
  },
  computed: {
    schedule () {
      return this.$store.getters.lookupSchedule(this.scheduleId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
