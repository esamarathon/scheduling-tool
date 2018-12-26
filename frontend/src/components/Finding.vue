<template>
    <div class="finding" :class="findingclass" @dblclick="doubleClick">
      <div class="title">{{source.name}}</div>
      <div class="body">{{finding.finding}}</div>
    </div>
</template>

<script>
export default {
  name: 'Finding',
  props: {
    finding: {
      type: Object
    }
  },
  computed: {
    findingclass () {
      return {
        weak: this.finding.class === 'weak',
        strict: this.finding.class === 'strict'
      }
    },
    source () {
      return this.$store.getters.lookup(this.finding.source.type, this.finding.source.id)
    }
  },
  methods: {
    doubleClick (event) {
      event.stopPropagation()
      event.preventDefault()
      if (this.finding.source.type === 'element') {
        this.$store.commit('showEditDialog', { elementID: this.finding.source.id })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.finding {
  width: 100%;
  border-radius: 3px;
  border: 1px solid black;
  margin-bottom: -1px;
  margin-right: -1px;
  overflow: hidden;
}
.weak {
  background-color: orange
}
.strict {
  background-color: red
}
.title {
  font-weight: bold;
  font-size: 16px;
  text-align: center
}
</style>
