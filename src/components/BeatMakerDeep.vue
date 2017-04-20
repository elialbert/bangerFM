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
          <span class='control-span'>
            <button id="reset-row" type="button" v-on:click="$emit('resetBeatRow')">Reset Beat Row Timing</button>
            <button id="randomize-row" type="button" v-on:click="$emit('randomizeRow')">Randomize Beat Row Timing</button>
            <button id="fill-3" type="button" v-on:click="changePerMeasure('3 Beats')">Fill 3</button>
            <button id="fill-4" type="button" v-on:click="changePerMeasure('4 Beats')">Fill 4</button>
          </span>
        </div>

        <div class='bmd-nav' v-if="active == 'Pitch'">
          <span class='control-span'>
            <button id="reset-beat" type="button" v-on:click="$emit('resetBeatRow')">Reset Beat Row Pitch</button>
            <button id='randomize-beat' type='button' v-on:click="$emit('randomizeRow')">Randomize Beat Row Pitch</button>
          </span>
        </div>

        <DrawAutomation v-if="active == 'Pitch'"
          :dataArray="dataArray"
          :pitchKey="pitchKey"
          :visible="visible"
          v-on:newPitches="newPitches"
        >
        </DrawAutomation>

        <instrument-row v-on:hoverSelect="hoverSelect" v-on:hoverClick="select"
          v-bind:def="def"
          v-bind:numCols="numCols"
          v-bind:enabledArray="dataArray"
          v-bind:perMeasure="perMeasure"
          v-bind:visible="visible"
          v-bind:selected="selected"
          v-bind:bmDeep="active"
          v-bind:ref="'instrumentrow'"
          v-on:toggleDeep="$emit('toggleDeep')"
        ></instrument-row>
      </div>
    </div>
  </div>
</template>

<script>
import InstrumentRow from './InstrumentRow'
import DrawAutomation from './DrawAutomation'
import mutils from '../assets/movementUtils'
import iutils from '../assets/instrumentUtils'

export default {
  name: 'beat-maker-deep',
  components: {
    InstrumentRow,
    DrawAutomation
  },
  props: ['visible', 'selected', 'selectedRow', 'def', 'dataArray', 'numCols', 'perMeasure', 'pitchKey'],
  data: function () {
    return {
      navItems: ['Timing', 'Pitch', 'Effects'],
      active: 'Pitch',
      pitchKeyOptions: iutils.pitchKeyOptions()
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
      for (let index of toChangeArray.filter(iutils.onlyUnique)) {
        this.deepChange(index)
      }
      this.$emit('needsToSave')
    },
    deepChange: function (index) {
      let curSquare = this.dataArray[index]
      if (this.active === 'Timing') {
        if (curSquare.measureSub) {
          curSquare.measureSub = false
        } else {
          curSquare.measureSub = '8t'
        }
      } else if (this.active === 'Pitch') {
        curSquare.enabled = !curSquare.enabled
        if (curSquare.enabled) {
          curSquare.pitch = iutils.newPitch(this.pitchKey, this.def.instrumentIndex)
        } else {
          curSquare.pitch = false
        }
      }
    },
    getTimingChange: function (explicit = null) {
      let selected = parseInt(explicit || this.selected[0])
      let offsets = mutils.perMeasureOffsets(selected, this.perMeasure)
      let toChangeArray = []
      for (let i = 0; i <= offsets[0]; i++) {
        toChangeArray.push(selected - i)
      }
      for (let i = 0; i <= offsets[1] - 1; i++) {
        toChangeArray.push(selected + i)
      }
      return toChangeArray
    },
    changePerMeasure: function (num) {
      for (let key in this.dataArray) {
        this.dataArray[key].measureSub = iutils.qTimeLookup(num)
      }
      this.$emit('needsToSave')
    },
    newPitches: function (pitches) {
      console.log(pitches)
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
  min-height: 200px;
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
