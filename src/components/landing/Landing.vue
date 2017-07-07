<template>
  <div id="landing" ref='landing'>
    <sound-meter
    v-on:crashEvent="crashEvent" ref='soundmeter'
  ></sound-meter>
    testing landing
    <button id="go" type="button" v-on:mousedown="start()" v-on:mouseup="stop()">Sound Check</button>
  </div>
</template>

<script>
// import Tone from '../../assets/tone.js'
// import defLoader from '../../assets/instrumentDefs/defLoader'
import MediumSynth from '../../assets/instruments/mediumSynth'
// import soundsynthUtils from '../../assets/soundsynthUtils'
import SoundMeter from '../SoundMeter'

export default {
  name: 'landing',
  components: {
    SoundMeter
  },
  data: function () {
    return {
      // defs: soundsynthUtils.checkDefs(defLoader.quickDefLoad()),
      selected: 0,
      idefLookup: {},
      instrument: 0,
      ms: null
    }
  },
  mounted: function () {
    document.getElementsByClassName('loading-app')[0] && document.getElementsByClassName('loading-app')[0].remove() // get rid of pre vue loading info
    this.ms = new MediumSynth() // .toMaster().start()
    // this.ms.instrument.toMaster()

    // soundBridge.constructWatchers(this.defs, true)
    // this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
    // this.instrument = this.idefLookup[this.selected].iindex
  },
  watch: {
  },
  computed: {
  },
  methods: {
    start: function () {
      console.log('going')
      console.log(this.ms)
      // soundBridge.startBeat(this.selected, 'C4', '8m')

      this.ms.start()
      console.log('gone')
    },
    stop: function () {
      this.ms.stop()
      console.log('stop')
    },
    crashEvent: function () {}
  }
}
</script>

<style>
</style>
