<template>
  <div id="landing" ref='landing'>
    <sound-meter
    v-on:crashEvent="crashEvent" ref='soundmeter'
  ></sound-meter>
    testing landing
    <button id="go" type="button" v-on:click="go()">Sound Check</button>
  </div>
</template>

<script>
// import Tone from '../../assets/tone.js'
import defLoader from '../../assets/instrumentDefs/defLoader'
import MediumSynth from '../../assets/instruments/mediumSynth'
import soundsynthUtils from '../../assets/soundsynthUtils'
import SoundMeter from '../SoundMeter'

export default {
  name: 'landing',
  components: {
    SoundMeter
  },
  data: function () {
    return {
      defs: soundsynthUtils.checkDefs(defLoader.quickDefLoad()),
      selected: 0,
      idefLookup: {},
      instrument: 0,
      ms: null
    }
  },
  mounted: function () {
    document.getElementsByClassName('loading-app')[0] && document.getElementsByClassName('loading-app')[0].remove() // get rid of pre vue loading info
    this.ms = new MediumSynth()

    // soundBridge.constructWatchers(this.defs, true)
    // this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
    // this.instrument = this.idefLookup[this.selected].iindex
  },
  watch: {
  },
  computed: {
  },
  methods: {
    go: function () {
      console.log('going')
      console.log(this.ms)
      // soundBridge.startBeat(this.selected, 'C4', '8m')
      this.ms.beat('C4', '8n')
      console.log('gone')
    },
    crashEvent: function () {}
  }
}
</script>

<style>
</style>
