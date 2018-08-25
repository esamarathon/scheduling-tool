<template>
  <div class="hello">
    <h1>Please select an Event</h1>
    <router-link :to="{ name: 'Event', params: { eventID: 'ESAW19' }}">ESAW19</router-link>
    <router-link :to="{ name: 'Event', params: { eventID: 'ESAS18' }}">ESAS18</router-link>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
