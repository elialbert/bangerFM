<template>
  <div class="instrument">
    <div class="instrumentName">{{ def.name }}</div>
    <div class="sliderName">{{ sliderName }}</div>
      <div class="sliders">
        <slider 
          v-for="(prop, key, index) in defProperties"
          :sdata="prop"
          v-on:soundSliderClick="soundSliderClick"
          v-on:sliderHover="sliderHover"
          v-on:stopSliderHover="stopSliderHover"
          v-bind:class="{ volume: index == 0}"
          v-bind:propIndex="index"
          v-bind:instrumentIndex="def.index"
          v-bind:allowMouse="allowMouse === undefined ? true : allowMouse"
        ></slider> <br/>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from './Slider'

  export default {
    components: {
      Slider
    },
    props: ['def', 'allowMouse'],
    data: function () {
      return {
        sliderName: 'volume'
      }
    },
    methods: {
      getPropDef: function (index) {
        return this.defProperties[Object.keys(this.defProperties)[index]]
      },
      changeSliderValue: function (num, direction) {
        if (!this.$children[num]) {
          return
        }
        this.$children[num].animate()
        var sdata = this.getPropDef(num)
        sdata.val = Math.min(Math.max(sdata.start, sdata.val + sdata.step * direction), sdata.end)
        this.$emit('needsToSaveDef')
      },
      soundSliderClick: function (instrumentIndex, propIndex, newVal) {
        if (instrumentIndex !== this.def.index) {
          return
        }
        var sdata = this.getPropDef(propIndex)
        this.$children[propIndex].animate()
        sdata.val = newVal
        this.$emit('needsToSaveDef')
      },
      sliderHover: function (sliderName) {
        this.sliderName = sliderName
      },
      stopSliderHover: function () {
        this.sliderName = 'volume'
      }
    },
    computed: {
      // take out ADSR, eq from sliders
      // and put volume first
      defProperties: function () {
        return Object.keys(this.def.properties)
          .filter(key => !['attack', 'decay', 'sustain', 'release', 'low', 'mid', 'high', '.key'].includes(key))
          .sort((a, b) => { return b === 'volume' ? 1 : -1 })
          .reduce((obj, key) => {
            obj[key] = this.def.properties[key]
            return obj
          }, {})
      }
    }
  }
</script>

<style>
  .sliders {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 10px;
    margin-right: -3px;
    margin-top: -3px;
    margin-bottom: -3px;

  }
  .instrumentName {
    padding-right: 10px;
    padding-left: 10px;
  }
  .instrumentBox {
    width: auto;
    height: 15%;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .instrument {
    padding: 10px;
  }
  .sliderName {
    font-size: 12px;
    padding-right: 20px;
    padding-left: 10px;
  }

</style>
