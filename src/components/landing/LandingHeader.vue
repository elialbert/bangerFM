<template>
  <div class="landing-header" ref='landing-header'>
    <span class='nav-logo'>BANGER.FM</span>
    <span v-if="!doneLoading">Loading...</span>
    <!-- <span v-if="doneLoading">Mystery Music Box. Click and drag. Press play ==> </span> -->
    <button id="go" type="button" class='goButton' v-on:click="playPause()"><b>{{text}}</b></button>
    <span v-if="doneLoading">Currently online: {{numOnline}}</span>
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
  props: ['doneLoading', 'numOnline'],
  data: function () {
    return {
      text: 'PLAY'
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
      if (this.text === 'PLAY') {
        this.$emit('soundToggle', 'play')
        this.text = 'PAUSE'
      } else {
        this.$emit('soundToggle', 'pause')
        this.text = 'PLAY'
      }
    },
    crashEvent: function () {}
  }
}
</script>

<style>

.goButton {
  background-color: #32CD32;
  color: white;
  font-size: 1em;
  margin-bottom: 8px;
}

@media (min-width: 480px) {
  .landing-header {
    max-height: 120px;
    background-color: #D8BFD8;
    color: black;
    padding: 4px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    font-size: 2em;
    padding-top: 14px;
  }
}
@media (max-width: 480px) {
  .landing-header {
    max-height: 200px;
    background-color: gray;
    color: white;
    padding: 4px;
    margin-bottom: 20px;
    /*display: flex;
    justify-content: space-around;*/
  }
}
.nav-logo {
  font-weight: bolder;
  margin-left: 8px;
}
#go {
  margin-left: 20px;
  margin-right: 8px;
}
@media (min-width: 480px) {
  .advanced-link {
    float: right;
    margin-left: 20px;
  }
}
</style>
