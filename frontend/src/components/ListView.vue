<template>
  <div class="listview">
    <md-tabs v-on:md-changed="updateTab">
      <md-tab v-for="schedule in schedules" :key="schedule" :id="String(schedule)" :md-label="$store.getters.lookupSchedule(schedule).name"></md-tab>
    </md-tabs>
    <schedulelist v-if="selectedTab" :scheduleId="selectedTab"></schedulelist>
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
      selectedTab: null
    }
  },
  methods: {
    updateTab (newTab) {
      this.selectedTab = newTab
    }
  },
  mounted: function () {
    this.selectedTab = String(this.schedules[0])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
