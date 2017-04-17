<template>
  <div id="soundsynthdeep" v-if="def">
    <instrument-envelope
      :ref="'envelope' + def.index"
      v-bind:def="def"
      v-on:needsToSaveDef="saveDef"
    >
    </instrument-envelope>
    <div id='instrument-controls'>
      <div class="instrument-container">
        <instrument
          v-bind:ref="'instrumentDeep' + def.index"
          v-bind:def="def"
          v-on:needsToSaveDef="saveDef"
        >
        </instrument>
      </div>
      <div class="instrument-container">
        <div class="eqLabel"> EQ: </div>
        <equalizer
          :eqProps="def"
          v-on:needsToSaveDef="saveDef"
        ></equalizer>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import defLoader from '../assets/instrumentDefs/defLoader'
import Instrument from './Instrument'
import InstrumentEnvelope from './InstrumentEnvelope'
import Equalizer from './Equalizer'
import soundsynthUtils from '../assets/soundsynthUtils'

export default {
  name: 'sound-synth-deep',
  components: {
    Instrument,
    InstrumentEnvelope,
    Equalizer
  },
  props: ['visible', 'selected', 'defs', 'soundBankChoice', 'user'],
  methods: {
    saveDef: function (explicitNum) {
      let sb = explicitNum || this.soundBankChoice
      Vue.nextTick(() => {
        defLoader.save(this.user, this.defs, sb)
      })
    }
  },
  computed: {
    def: function () {
      return this.defs[soundsynthUtils.sortDefs(this.defs)[this.selected]]
    }
  }
}
</script>

<style>
#soundsynthdeep {
  padding: 20px;
}

.instrument-container {
  padding: 20px;
}
#instrument-controls {
  display: flex;
  flex-flow: row wrap;
}
.eqLabel {
  padding-right: 20px;
  padding-left: 10px;
}
</style>
