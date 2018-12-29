<template>
  <div class="elementList">
    <scheduleelement v-for="element in filteredRuns" :elementId="element" :parent="scheduleId" :relativePosition="relativePosition(element)" :key="element"></scheduleelement>
  </div>
</template>

<script>
import _ from 'lodash'
import { sortedIntervals } from '@/scheduleUtils'

export default {
  name: 'Schedule',
  data () {
    return {
    }
  },
  props: {
    scheduleId: {
      type: String
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  methods: {
    relativePosition (elementID) {
      let min = this.$store.state.lookup.calculatedTimes[elementID].start
      let max = this.$store.state.lookup.calculatedTimes[elementID].end
      let start
      let end
      let overlaps
      do {
        start = min
        end = max
        overlaps = _.filter(this.sortedIntervals, (interval) => { return interval.end > start && interval.start < end })
        min = _.minBy(overlaps, 'start').start
        max = _.maxBy(overlaps, 'end').end
      } while (start !== min || end !== max)
      let position
      for (let i = 0; i < overlaps.length; i++) {
        if (overlaps[i].id === elementID) {
          position = i
          break
        }
      }
      if (position !== undefined) {
        return { position: position, of: overlaps.length }
      } else {
        // fallback, should never occur
        return { position: 0, of: 1 }
      }
    }
  },
  computed: {
    filteredRuns () {
      return _.filter(this.schedule.elements, element => this.$store.getters.lookupElement(element).name.toLowerCase().includes(this.searchText.toLowerCase()))
    },
    scheduleName () {
      return this.schedule.name
    },
    schedule () {
      return this.$store.getters.lookupSchedule(this.scheduleId)
    },
    sortedIntervals () {
      return sortedIntervals(this.schedule.elements)
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
