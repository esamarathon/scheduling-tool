<template>
  <div class="dataedit">
    {{ definition.name }}: <input type="text" v-model="value" @change="$emit('modified', { name: definition.name, value: value })">
  </div>
</template>

<script>
export default {
  name: 'DataEditField',
  data () {
    return {
      modifiedValue: null
    }
  },
  props: {
    definition: {
      type: Object
    },
    originalValue: {}
  },
  computed: {
    value: {
      get: function () {
        return this.modifiedValue ? this.modifiedValue : this.originalValue
      },
      set: function (newValue) {
        this.modifiedValue = newValue
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
