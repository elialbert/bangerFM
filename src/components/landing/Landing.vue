<template>
  <div id="landing" ref='landing'>
    <div id='landingInner'>
      <landing-header
        :doneLoading="doneLoading"
        @soundToggle="soundToggle"
        @reset="reset"
      ></landing-header>
      <main-box :defs="defs" :dataArray="dataArray" ref="mainbox"
        @innerClick="innerClick" v-if='doneLoading'
      ></main-box>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import defLoader from '../../assets/instrumentDefs/defLoader'
import soundBridge from '../../assets/soundBridge'
import iutils from '../../assets/instrumentUtils'
import beatUtils from '../../assets/beatUtils'
import MainBox from './MainBox'
import LandingHeader from './LandingHeader'
import landingFBBinding from '../mixins/fbbinding/landingFBBinding'
import Network from '../mixins/Network'

// in charge of local and remote data mutation
export default {
  name: 'landing',
  components: {
    MainBox,
    LandingHeader
  },
  mixins: [Network, landingFBBinding],
  data: function () {
    return {
      loading: true,
      user: 'landing',
      workspace: 0,
      instrument: 0,
      doneLoading: false,
      beatBankChoice: 0,
      defs: defLoader.load(false, 0, 0, false),
      dataArray: iutils.createDataArray(4, 6, 'C Minor Blues'),
      watcherList: []
    }
  },
  mounted: function () {
    document.getElementsByClassName('loading-app')[0] && document.getElementsByClassName('loading-app')[0].remove() // get rid of pre vue loading info
    this.doFBBinding()
    this.doBeat()
  },
  watch: {
  },
  computed: {
  },
  methods: {
    finishLoading: function () {
      this.watcherList.forEach(function (unwatcher) { unwatcher() })
      soundBridge.reconstructInstruments(() => {
        var watchers = soundBridge.constructWatchers(this.defs, true)
        for (let key in watchers) {
          this.watcherList.push(this.$watch(key, watchers[key]))
        }
        this.doneLoading = true
      })
    },
    soundToggle: function (soundState) {
      this.$refs.mainbox.soundToggle(soundState)
    },
    innerClick: function (m, n, state) {
      let clickData = beatUtils.landingClick(this.dataArray, m, n, state)
      let objs = clickData[0]
      let instrs = clickData[1]
      let beat = clickData[2]
      let triplet = clickData[3]
      for (let i = 0; i < instrs.length; i++) {
        let instr = instrs[i]
        let obj = objs[i]
        if (obj === null) { continue }
        defLoader.saveOneBeat(this.user, this.workspace, obj, 0, instr, beat, triplet)
        let soundResult = beatUtils.mutateDefs(this.defs, instr, triplet, beat, state)
        if (soundResult) {
          Vue.nextTick(() => {
            defLoader.saveOneSound(this.user, this.workspace, 0, soundResult[0], soundResult[1], soundResult[2])
          })
        }
      }
    },
    reset: function () {
      defLoader.saveBeat(this.user, this.workspace, iutils.createDataArray(4, 5, 'C Minor Blues'), 0, false, true)
    }
  }
}
</script>

<style>
</style>
