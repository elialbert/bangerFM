<template>
  <div id="landing" ref='landing'>
    <div v-if="!doneLoading">Loading...</div>
    <div id='landingInner' ng-if='doneLoading'>
      <landing-header
        @soundToggle="soundToggle"
      ></landing-header>
      <main-box :defs="defs" :dataArray="dataArray" ref="mainbox"
        @innerClick="innerClick"
      ></main-box>
    </div>
  </div>
</template>

<script>
import defLoader from '../../assets/instrumentDefs/defLoader'
import soundBridge from '../../assets/soundBridge'
import iutils from '../../assets/instrumentUtils'
import beatUtils from '../../assets/beatUtils'
import MainBox from './MainBox'
import LandingHeader from './LandingHeader'
import landingFBBinding from '../mixins/fbbinding/landingFBBinding'
// import soundsynthUtils from '../../assets/soundsynthUtils'

// in charge of local and remote data mutation
export default {
  name: 'landing',
  components: {
    MainBox,
    LandingHeader
  },
  mixins: [landingFBBinding],
  data: function () {
    return {
      loading: true,
      user: 'landing',
      workspace: 0,
      instrument: 0,
      doneLoading: false,
      beatBankChoice: 0,
      defs: defLoader.load(false, 0, 0, false),
      dataArray: iutils.createDataArray(4, 5, 'C Minor Blues')
    }
  },
  mounted: function () {
    document.getElementsByClassName('loading-app')[0] && document.getElementsByClassName('loading-app')[0].remove() // get rid of pre vue loading info
    this.doFBBinding()
    this.doBeat()
    // this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
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
    },
    innerClick: function (m, n, state) {
      beatUtils.landingClick(this.dataArray, m, n, state)
    }
  }
}
</script>

<style>
</style>
