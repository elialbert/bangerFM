<template>
  <div class="equalizer">
    <div class="sliderName">{{ sliderName }}</div>
    <div class="sliders">
      <slider 
        v-for="(prop, key, index) in justEqProps"
        :sdata="prop"
        v-on:soundSliderClick="eqClick"
        v-on:sliderHover="sliderHover"
        v-bind:propIndex="key"
        v-bind:instrumentIndex="'-1'"
        v-bind:allowMouse="1"
      ></slider> <br/>
    </div>
  </div>
</template>

<script>
import Slider from './Slider'
import Effects from '../assets/instruments/effects.js'

export default {
  name: 'equalizer',
  props: ['eqProps', 'global'],
  components: { Slider },
  data: function () {
    return {
      sliderName: 'low'
    }
  },
  methods: {
    eqClick: function (ins, index, val) {
      if (this.global) {
        this.eqProps[index].val = val
        Effects.setEQ(this.eqProps.low.val, this.eqProps.mid.val, this.eqProps.high.val)
      } else {
        this.eqProps.properties[index].val = val
      }
      this.$emit('needsToSaveDef')
    },
    sliderHover: function (sliderName) {
      this.sliderName = sliderName
    }
  },
  computed: {
    justEqProps: function () {
      let vals = this.eqProps.properties || this.eqProps
      return ['low', 'mid', 'high']
        .reduce((obj, key) => {
          obj[key] = vals[key]
          return obj
        }, {})
    }
  }
}
</script>

<style>
  .sliderName {
    font-size: 12px;
    padding-right: 20px;
    padding-left: 10px;
  }
</style>
