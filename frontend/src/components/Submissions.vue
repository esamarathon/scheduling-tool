<template>
  <div>
    Unscheduled Submissions
    <div class="elementList">
      <submissionelement v-for="element in filteredSubmissions" :submissionId="element" :key="element"></submissionelement>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Submissions',
  props: {
    filteredSubmissions: {
      type: Array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.elementList {
  position: relative;
}
</style>
