<template>
  <div id="beatmakerdeep" v-if="dataArray">
    <div class='bmd-nav'>
      <div class='bmd-nav-item' v-for="key of navItems"
        v-bind:class="{selectedNav: active == key}"
        @click="changeNav(key)"
      >{{key}}</div>
    </div>
    <div class='bmd-container'>
      <div class='bmdeep-inner'>
        <div class='bmd-nav' v-if="active == 'Timing'">
          <div class='bmd-nav-item' v-for="key of navItemsTiming"
            v-bind:class="{selectedNav: activeTiming == key}"
            @click="activeTiming = key"
          >{{key}}</div>
        </div>

        <instrument-row v-on:hoverSelect="hoverSelect" v-on:hoverClick="select"
          v-bind:def="def"
          v-bind:numCols="numCols"
          v-bind:enabledArray="dataArray"
          v-bind:perMeasure="perMeasure"
          v-bind:visible="visible"
          v-bind:selected="selected"
          v-bind:bmDeep="active"
          v-bind:ref="'instrumentrow'"
        ></instrument-row>
      </div>
    </div>
  </div>
</template>

<script>
import InstrumentRow from './InstrumentRow'
import mutils from '../assets/movementUtils'
import iutils from '../assets/instrumentUtils'

export default {
  name: 'beat-maker-deep',
  components: {
    InstrumentRow
  },
  props: ['visible', 'selected', 'selectedRow', 'def', 'dataArray', 'numCols', 'perMeasure'],
  data: function () {
    return {
      navItems: ['Timing', 'Pitch', 'Effects'],
      navItemsTiming: ['3 Beats', '4 Beats'],
      active: 'Timing',
      activeTiming: '3 Beats'
    }
  },
  methods: {
    changeNav: function (key) {
      this.active = key
    },
    hoverSelect: function (x, y, event) {
      if (this.visible === 'songmaker') {
        return
      }
      this.$emit('changeSelect', x, y)
      if (event.buttons === 1) {
        this.select()
      }
    },
    select: function () {
      let toChangeArray = [this.selected[0]]
      if (this.active === 'Timing') {
        toChangeArray = this.getTimingChange()
      }
      for (let index of toChangeArray) {
        this.deepChange(index)
      }
    },
    deepChange: function (index) {
      if (this.active === 'Timing') {
        this.dataArray[index].measureSub = iutils.qTimeLookup(this.activeTiming)
      }
    },
    getTimingChange: function () {
      let offsets = mutils.perMeasureOffsets(this.selected, this.perMeasure)
      let toChangeArray = []
      for (let i = 0; i <= offsets[0]; i++) {
        toChangeArray.push(this.selected[0] - i)
      }
      for (let i = 0; i <= offsets[1] - 1; i++) {
        toChangeArray.push(this.selected[0] + i)
      }
      return toChangeArray
    }
  },
  computed: {
  }
}
</script>

<style>
.bmd-container {
  padding-left: 10px;
  width: 96%;
  height: 200px;
}
.bmdeep-inner {
  border: 1px solid black;
  height: 80%;
  width: 100%;
  padding: 10px;
}
.bmd-nav {
  display: flex;
  margin-top: 4px;
}
.bmd-nav-item {
  padding: 4px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer; cursor: hand;
}
.bmd-nav-item.selectedNav {
  background-color: grey;
  color: white;
}
.bmd-nav-item:nth-of-type(1) {
  margin-left: 10px;
}
</style>
