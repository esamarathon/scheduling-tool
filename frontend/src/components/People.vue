<template>
  <div class="person">
    By: <span v-for="person in participants" :key="person.name">{{ person.name }}</span>
  </div>
</template>

<script>
import _ from 'lodash'

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
  },
  computed: {
    participants () {
      // ToDo, this is just for initial display
      return _.map(_.flatMap(this.people), (person) => {
        if (person.userId) {
          let user = this.$store.getters.lookup('user', person.userId)
          if (user) return { name: user.name }
          else return { name: `Unknown userId ${person.userId}` }
        } else return person
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
