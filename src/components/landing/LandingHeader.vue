<template>
  <div class="landing-header" ref='landing-header'>
    <span class='nav-logo'>BANGER.FM</span>
    <button id="go" type="button" v-on:click="playPause()">{{text}}</button>
    <sound-meter
      v-on:crashEvent="crashEvent" ref='soundmeter'
    ></sound-meter>
  </div>
</template>

<script>
import SoundMeter from '../SoundMeter'

export default {
  name: 'landing-header',
  components: {
    SoundMeter
  },
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
  height: 20px;
  background-color: gray;
  color: white;
  padding: 4px;
  margin-bottom: 20px;
  display: flex;
}
.nav-logo {
  font-weight: bolder;
  margin-left: 8px;
}
#go {
  margin-left: 20px;
}
</style>
