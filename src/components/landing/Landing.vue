<template>
  <div id="landing" ref='landing'>
    <div id='landingInnder' ng-if='doneLoading'>
      <sound-meter
      v-on:crashEvent="crashEvent" ref='soundmeter'
    ></sound-meter>
      testing landing
      <button id="go" type="button" v-on:mousedown="start()" v-on:mouseup="stop()">Sound Check</button>
    
      <div id='gametest'>
      <!-- <canvas width="340" height="600">

      </canvas> -->
      </div>
    </div>
  </div>
</template>

<script>
// import Tone from '../../assets/tone.js'
import defLoader from '../../assets/instrumentDefs/defLoader'
// import MediumSynth from '../../assets/instruments/mediumSynth'
// import soundsynthUtils from '../../assets/soundsynthUtils'
import soundBridge from '../../assets/soundBridge'
import SoundMeter from '../SoundMeter'
import Phaser from 'phaser'

export default {
  name: 'landing',
  components: {
    SoundMeter
  },
  data: function () {
    return {
      selected: 0,
      idefLookup: {},
      instrument: 0,
      doneLoading: false,
      defs: defLoader.load(false, 0, 0, true, (data) => {
        this.defs = data
        this.finishLoading()
      })
    }
  },
  mounted: function () {
    document.getElementsByClassName('loading-app')[0] && document.getElementsByClassName('loading-app')[0].remove() // get rid of pre vue loading info
    this.doGame()
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
    crashEvent: function () {},
    doGame: function () {
      this.game = new Phaser.Game(400, 400, Phaser.CANVAS, 'gametest', { preload: this.preload, create: this.create, render: this.render })
    },
    preload: function () {

    },
    create: function () {
      this.game.stage.backgroundColor = '#124184'
      // this.game.physics.enable(sprite1, Phaser.Physics.ARCADE);
    },
    render: function () {

    }
  }
}
</script>

<style>
</style>
