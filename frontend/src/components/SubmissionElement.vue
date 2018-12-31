<template>
    <div class="submission" draggable="true" @dragstart="dragStart">
      {{ name }}
    </div>
</template>

<script>
export default {
  name: 'SubmissionElement',
  props: {
    submissionId: {
      type: String
    }
  },
  computed: {
    submission () {
      return this.$store.state.foreignData.run[this.submissionId]
    },
    name () {
      return this.submission.game + ' ' + this.submission.category
    }
  },
  methods: {
    dragStart (ev) {
      ev.stopPropagation()
      ev.dataTransfer.setData('submission', this.submissionId)
      ev.dataTransfer.setData('xoffset', ev.offsetX)
      ev.dataTransfer.setData('yoffset', ev.offsetY)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submission {
  border-radius: 3px;
  border: 1px solid black;
  margin-bottom: -1px;
  margin-right: -1px;
  overflow: hidden;
}
</style>
