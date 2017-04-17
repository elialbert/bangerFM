<template>
  <polyline class='envelope-line'
    :points="points"
    :style="'stroke:'+color+';stroke-width:2'"
  ></polyline>
</template>

<script>
import utils from '../assets/envelopeUtils'

export default {
  name: 'envelope-line',
  props: ['name', 'def', 'coords', 'vals', 'color'],
  computed: {
    points: function () {
      let lineCoords = utils.lineCoords(this.name, this.def && this.def.val, this.vals, this.coords)
      this.coords[this.name] = lineCoords
      return utils.coordsToString(lineCoords)
    }
  }
}
</script>

<style>
</style>