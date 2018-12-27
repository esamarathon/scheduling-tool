<template>
  <div class="listview">
    <div class="header">
      <md-tabs :md-active="selectedTab" md-sync-route>
        <md-tab v-for="schedule in schedules" :key="schedule" :id="String(schedule)" :md-label="$store.getters.lookupSchedule(schedule).name" :to="{ name: 'ScheduleList', params: { scheduleID: schedule } }"></md-tab>
      </md-tabs>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  computed: {
    schedules () {
      return this.$store.state.event.schedules
    }
  },
  data () {
    return {
      selectedTab: this.$route.params.scheduleID
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listview {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  flex: 0 0 auto;
}
.content {
  flex: 1 1 auto;
  overflow-y: auto;
}
</style>
