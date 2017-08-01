<template>
  <div class="landing-header" ref='landing-header'>
    <span class='nav-logo'>BANGER.FM</span>
    <button id="go" type="button" v-on:click="playPause()"><b>{{text}}</b></button>
    <!-- <button id="reset" type="button" v-on:click="$emit('reset')">reset</button> -->
    <span v-if="!doneLoading">Loading...</span><span v-if="doneLoading">This is a networked in-browser music demo. Click/drag around! Don't forget to press play...</span>
    <span class='advanced-link'><a href="https://banger.fm/#/app">Try advanced mode</a></span>
  </div>
</template>

<script>
import SoundMeter from '../SoundMeter'

export default {
  name: 'landing-header',
  components: {
    SoundMeter
  },
  props: ['doneLoading'],
  data: function () {
    return {
      text: 'play'
    }
  },
  mounted: function () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    playPause: function () {
      if (this.text === 'play') {
        this.$emit('soundToggle', 'play')
        this.text = 'pause'
      } else {
        this.$emit('soundToggle', 'pause')
        this.text = 'play'
      }
    },
    crashEvent: function () {}
  }
}
</script>

<style>
.landing-header {
  max-height: 60px;
  background-color: gray;
  color: white;
  padding: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}
.nav-logo {
  font-weight: bolder;
  margin-left: 8px;
}
#go {
  margin-left: 20px;
  margin-right: 8px;
}
.advanced-link {
  float: right;
  margin-left: 20px;
}
</style>
