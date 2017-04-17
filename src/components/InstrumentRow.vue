<template>
<div class="instrument-row">
    <div v-for="n in numColsSafe" 
      class="beat-column" v-on:mouseover="hoverSelect(n-1, $event)" v-on:click="hoverClick"
      v-bind:class="{ selected: selected[1] == def.index && selected[0] == n - 1 && visible == 'beatmaker', 
        enabled: enabledArray[n - 1].enabled,
        playing: playing == n - 1,
        downbeat: (n-1) % perMeasure == 0,
        triplet: enabledArray[n-1].triplet.enabled}"
    >
      <span class='pitchText' v-if="enabledArray[n-1].enabled">{{ enabledArray[n - 1].pitch }}</span>
    </div>
    <div class="instrument-name">{{ def.name }}</div>
</div>
</template>

<script>
export default {
  name: 'instrument-row',
  props: ['def', 'selected', 'numCols', 'enabledArray', 'perMeasure', 'visible'],
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
    }
  }
}
</script>

<style>
.instrument-name {
  padding-left: 10px;
  padding-top: 4px;
  font-size: 12px;
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

div.beat-column.playing {
  background: yellow;
}
div.beat-column.selected {
  background: #a9f26a;
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
div.beat-column.triplet {
  background: linear-gradient(to right, red, yellow, green);
}
</style>
