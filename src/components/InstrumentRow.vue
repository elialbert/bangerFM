<template>
<div class="instrument-row">
  <div v-for="n in numColsSafe">
    <triplet-beat-column 
      v-if="enabledArray[n-1].triplet.enabled && enabledArray[n-1].enabled" v-on:click="hoverClick"
      v-on:mouseover="hoverSelect(n-1, $event)"
    ></triplet-beat-column>
    <div 
      class="beat-column" v-on:mouseover="hoverSelect(n-1, $event)" v-on:click="hoverClick"
      v-bind:class="{ selected: isSelected(n), selectedDeep: isSelectedDeep(n),
        enabled: enabledArray[n - 1].enabled,
        playing: playing == n - 1,
        downbeat: (n-1) % perMeasure == 0,
        lastBeatInMeasure: (n-1) % perMeasure == (perMeasure - 1),
        ['numInMeasure' + (n-1) % perMeasure]: true,
        measureSub: enabledArray[n-1].measureSub}"
      >
    <span class='pitchText' v-if="enabledArray[n-1].enabled">{{ enabledArray[n - 1].pitch }}</span>
    </div>
  </div>
  <div class="instrument-name"
    @mouseover="$emit('mouseOverName', def.index)"
    @click="$emit('toggleDeep')"
  >{{ def.name }}</div>
</div>
</template>

<script>
import mutils from '../assets/movementUtils'
import TripletBeatColumn from './TripletBeatColumn'

export default {
  name: 'instrument-row',
  props: ['def', 'selected', 'numCols', 'enabledArray', 'perMeasure', 'visible', 'bmDeep'],
  components: { TripletBeatColumn },
  data: function () {
    return {
      playing: -1
    }
  },
  computed: {
    numColsSafe: function () {
      return Math.min(this.numCols, Object.keys(this.enabledArray).length)
    }
  },
  methods: {
    hoverSelect: function (n, event) {
      this.$emit('hoverSelect', n, this.def.index, event)
    },
    hoverClick: function () {
      this.$emit('hoverClick')
    },
    isSelectedDeep: function (n) {
      if (this.bmDeep === 'Timing' && this.visible === 'beatmaker') {
        let offsets = mutils.perMeasureOffsets(this.selected[0], this.perMeasure)
        return (n <= this.selected[0] + offsets[1]) && (n > this.selected[0] - offsets[0])
      }
    },
    isSelected: function (n) {
      return this.selected[1] === this.def.index && this.selected[0] === (n - 1) && this.visible === 'beatmaker'
    },
    toggleDeep: function () {

    }
  }
}
</script>

<style>
.instrument-name {
  padding-left: 10px;
  padding-top: 4px;
  padding-right: 10px;
  cursor: pointer; cursor: hand;
}
.instrument-name:hover {
  background-color: lightgrey;
}
.instrument-row {
  display: flex;
}
.beat-column {
  width: 20px;
  height: 20px;
  background: white;
  margin: 4px;
  border: 1px solid black;
  cursor: crosshair;
  flex-grow: 0;
  flex-shrink: 0;
}
div.beat-column.enabled.selected {
  background: yellow;
}
div.beat-column.enabled.selected.selectedDeep {
  background: yellow;
}
div.beat-column.playing {
  background: yellow;
}
div.beat-column.enabled.playing {
  background: orange;
}
div.beat-column.selected {
  background: #a9f26a;
}
div.beat-column.selected.selectedDeep {
  background: #a9f26a;
}
div.beat-column.selectedDeep {
  background: #44c96a;
}
div.beat-column.selected.playing {
  background: #d9f169;
}
div.beat-column.selectedDeep.playing {
  background: #d9f169;
}
div.beat-column.selected.enabled.playing {
  background: #d9f169;
}
div.beat-column.enabled.selectedDeep {
  background: #dff169;
}
div.beat-column.enabled {
  background: red;
}
.beat-column.downbeat {
  background: #d5dae2;
}
.pitchText {
  color: blue;
  font-size: 12px;
}
.beat-column.enabled span.pitchText {
  color: white;
}
.beat-column.enabled.selected span.pitchText {
  color: blue;
}
.beat-column.enabled.selectedDeep span.pitchText {
  color: blue;
}
.beat-column.measureSub.numInMeasure0 {
  width: calc(90px / 3);
  left: 0%;
}
.beat-column.measureSub.numInMeasure1 {
  width: calc(90px / 3);
  left: calc((90px / 3));
}
.beat-column.measureSub.numInMeasure2 {
  width: calc(90px / 3);
  left: calc(2 * (90px / 3));
}
.beat-column.measureSub.numInMeasure3 {
  width: 0;
  left: 0%;
}
.beat-column.measureSub.lastBeatInMeasure {
  visibility: hidden;
  margin: 0px;
  border: 0px;
}
</style>
