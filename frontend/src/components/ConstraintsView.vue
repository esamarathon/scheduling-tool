<template>
  <div class="constraintsview">
    <finding v-for="finding in findings" :finding="finding" :key="finding.id"/>
  </div>
</template>

<script>
export default {
  name: 'ConstraintsView',
  computed: {
    findings () {
      return this.$store.getters.strictFindings.concat(this.$store.getters.weakFindings)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
