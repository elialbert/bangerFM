<template>
  <div id="landing" ref='landing'>
    <div id='landingInner' ng-if='doneLoading'>
      <landing-header
        @soundToggle="soundToggle"
      ></landing-header>
      <main-box :defs="defs" ref="mainbox"></main-box>
    </div>
  </div>
</template>

<script>
import defLoader from '../../assets/instrumentDefs/defLoader'
import soundBridge from '../../assets/soundBridge'
import iutils from '../../assets/instrumentUtils'
import MainBox from './MainBox'
import LandingHeader from './LandingHeader'

export default {
  name: 'landing',
  components: {
    MainBox,
    LandingHeader
  },
  data: function () {
    return {
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
      soundBridge.reconstructInstruments(() => {
        soundBridge.constructWatchers(this.defs, true)
        this.doneLoading = true
      })
    },
    soundToggle: function (soundState) {
      this.$refs.mainbox.soundToggle(soundState)
    }
  }
}
</script>

<style>
</style>
