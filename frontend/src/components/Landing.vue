<template>
  <div class="hello">
    <h1>Please select an Event</h1>
    <router-link v-for="event in events" :to="{ name: 'Event', params: { eventID: event.id }}" :key="event.id"><p>{{event.name}}</p></router-link>
  </div>
</template>

<script>
import { fetchEvents } from '../backend-api.js'
import settings from '../settings'
import { getJwt } from '../auth'

export default {
  name: 'Landing',
  data () {
    return {
      events: []
    }
  },
  async created () {
    if (!getJwt()) {
      window.location.href = settings.frontend.loginurl
    }
    this.events = await fetchEvents()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
