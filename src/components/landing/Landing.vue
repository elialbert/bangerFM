<template>
  <div id="landing" ref='landing'>
    testing landing
    <button id="go" type="button" v-on:click="go()">Sound Check</button>
  </div>
</template>

<script>
import Tone from '../../assets/tone.js'
export default {
  name: 'landing',
  components: {
  },
  data: function () {
    return {
      testInstr: new Tone.Synth().toMaster()
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
    go: function () {
      this.testInstr.triggerAttackRelease('C4', '8n')
    }
  }
}
</script>

<style>
</style>
