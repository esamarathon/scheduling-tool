<template>
  <div class="person">
    By: <span v-for="person in people" :key="person.name">{{ person.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'People',
  data () {
    return {
    }
  },
  props: {
    people: {
      type: Array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
