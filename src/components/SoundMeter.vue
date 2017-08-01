<template>
  <div class='sound-meter'>
    <span class='control-span'></span>
    <slider 
      v-bind:sdata="meter"
      v-bind:propIndex="'meter'"
      v-bind:instrumentIndex="'-1'"
      v-bind:allowMouse="0"
      :horizontal="1"
    ></slider>
  </div>
</template>

<script>
import Effects from '../assets/instruments/effects.js'
import Slider from './Slider'
import Tone from '../assets/tone.js'

export default {
  name: 'sound-meter',
  components: { Slider },
  props: ['crashEvent'],
  mounted: function () {
    var lowBump = new Tone.Filter(200, 'lowshelf')
    var meter = new Tone.Meter('level')
    if (window.LANDINGMODE) {
      setTimeout(() => {
        Tone.Master.chain(lowBump, meter)
      })
    }
    this.doMeter()
  },
  data: function () {
    return {
      meter: Effects.meterSlider
    }
  },
  methods: {
    doMeter: function () {
      if (Number.isNaN(Effects.meter.value)) {
        return this.$emit('crashEvent')
      }
      Effects.meterSlider.val = (Effects.meter.value * 10).toFixed(2)
      var self = this
      setTimeout(function () {
        self.doMeter()
      }, 100)
    }
  }
}
</script>

<style>
.sound-meter {
  display: flex;
  margin-top: 2px;
}
.sliders {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: -3px;
  margin-top: -3px;
  margin-bottom: -3px;
}
span.control-span {
  padding-left: 6px;
  padding-right: 6px;
}
</style>
