<template>
  <div id="app">
    <router-view/>
    <notifications group="schedule"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
