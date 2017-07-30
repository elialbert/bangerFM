<template>
  <div id="mainbox" ref='mainbox' class='centered'>
    <div id='mainbox-inner'>  
      <beat-box v-for="n in 16" 
        v-bind:ref="'beatbox_' + (n-1)" 
        :dataArray="dataArray"
        :n="n"
        :playing="playing"
        :drawMode="drawMode"
        @innerClick="innerClick"
      ></beat-box>
    </div>
  </div>
</template>

<script>
// import iutils from '../../assets/instrumentUtils'
import BeatBox from './BeatBox'
// import soundBridge from '../../assets/soundBridge'
import beatBridge from '../../assets/beatBridge'
import soundsynthUtils from '../../assets/soundsynthUtils'

// handles playing
export default {
  name: 'main-box',
  props: ['defs', 'dataArray'],
  components: {
    BeatBox
  },
  data: function () {
    return {
      playing: -1,
      running: false,
      defsLength: 5,
      idefLookup: {},
      drawMode: true
    }
  },
  mounted: function () {
    this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
  },
  watch: {
    defs: function () {
      this.redoDefs()
    }
  },
  computed: {
  },
  methods: {
    redoDefs: function () {
      this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
    },
    soundToggle: function (soundState) {
      soundState === 'play' ? this.startPlaying() : this.stopPlaying()
    },
    startPlaying: function () {
      this.stopPlaying()
      beatBridge.startTransport()
      this.loop = beatBridge.makeLoop(beatBridge.dataFunc(this, this.animate, this.defs), 16)
      this.loop.start(0)
      this.running = true
    },
    stopPlaying: function () {
      this.playing = -1
      if (this.loop) {
        beatBridge.stopTransport()
      }
      this.running = false
    },
    animate: function (col, clear) {
      this.playing = col
    },
    innerClick: function (m, n, state, drawMode) {
      if (drawMode !== null) {
        this.drawMode = drawMode
      }
      this.$emit('innerClick', m, n, state, drawMode)
    },
    // do the drawing from new data
    setState: function (v) {
      for (let i = 0; i < 16; i++) {
        this.$refs['beatbox_' + String(i)][0].setState(v)
      }
    }
  }
}
</script>

<style>
#mainbox-inner {
  height: 80vw;
  width: 80vw;
  max-width: 800px;
  max-height: 800px;
  border: 4px solid black;
  display: flex; 
  flex-direction: row; 
  flex-wrap: wrap; 
  box-sizing: border-box;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
