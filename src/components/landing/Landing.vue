<template>
  <div id="landing" ref='landing'>
    <div id='landingInnder' ng-if='doneLoading'>
      <sound-meter
      v-on:crashEvent="crashEvent" ref='soundmeter'
    ></sound-meter>
      testing landing
      <button id="go" type="button" v-on:mousedown="start()" v-on:mouseup="stop()">Sound Check</button>
      <main-box v-bind:defs="defs"></main-box>
    </div>
  </div>
</template>

<script>
import defLoader from '../../assets/instrumentDefs/defLoader'
import soundBridge from '../../assets/soundBridge'
import SoundMeter from '../SoundMeter'
import iutils from '../../assets/instrumentUtils'
import MainBox from './MainBox'

export default {
  name: 'landing',
  components: {
    SoundMeter,
    MainBox
  },
  data: function () {
    return {
      selected: 3,
      idefLookup: {},
      instrument: 0,
      doneLoading: false,
      defs: defLoader.load(false, 0, 0, true, (data) => {
        this.defs = iutils.simpleInstruments(data)
        this.finishLoading()
      })
    }
  },
  mounted: function () {
    document.getElementsByClassName('loading-app')[0] && document.getElementsByClassName('loading-app')[0].remove() // get rid of pre vue loading info
  },
  watch: {
  },
  computed: {
  },
  methods: {
    finishLoading: function () {
      soundBridge.constructInstruments()
      soundBridge.constructWatchers(this.defs, true)
      this.doneLoading = true
    },
    start: function () {
      soundBridge.startSound(this.selected)
    },
    stop: function () {
      soundBridge.stopSound(this.selected)
    },
    crashEvent: function () {}
  }
}
</script>

<style>
</style>
