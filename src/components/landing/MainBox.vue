<template>
  <div id="mainbox" ref='mainbox' class='centered'>
    <div id='mainbox-inner'>  
      <beat-box v-for="n in 16" 
        :ref="'beatbox_'+n" 
        :n="n"
        :playing="playing == n"
      ></beat-box>
    </div>
  </div>
</template>

<script>
import iutils from '../../assets/instrumentUtils'
import BeatBox from './BeatBox'
import soundBridge from '../../assets/soundBridge'

export default {
  name: 'main-box',
  props: ['defs'],
  components: {
    BeatBox
  },
  data: function () {
    return {
      dataArray: iutils.createDataArray(4, 5, 'C Minor Blues'),
      playing: -1,
      selected: 3
    }
  },
  mounted: function () {
    console.log(this.dataArray)
  },
  watch: {
  },
  computed: {
  },
  methods: {
    soundToggle: function (soundState) {
      if (soundState === 'play') {
        console.log('playing')
        soundBridge.startSound(this.selected)
      } else {
        soundBridge.stopSound(this.selected)
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
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
