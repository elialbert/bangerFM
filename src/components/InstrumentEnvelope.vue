<template>
  <div id="instrument-envelope">
    <div id='label'>Envelope</div>
    <div class='graphics-wrapper'>
      <canvas id="waveform"
        :ref="'waveform'"
      ></canvas>
      <svg id='envelope-container'>
        <EnvelopeLine v-for="(info, key) in envInfo"
          :name="key"
          :coords="coords"
          :def="def.properties[key]"
          :vals="allProps()"
          :color="info.color"
        >
        </EnvelopeLine>
      </svg> 
    </div>
    <div id='slider-container'>
      <input v-for="(info, key) in envInfo"
        type="range" 
        :min=0
        :max="key == 'attack' ? attackMax : 100"
        step="1"
        :value="propVal(key) * 100"
        @change="changeSlider(key, $event)"
      />
    </div>
    <div id='slider-labels'>
      <div v-for="(info, key) in envInfo">
        <div class='slider-label'
          :style="{ 'color': info.color }"
        >
          {{ key }}: {{ propVal(key) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../assets/envelopeUtils'
import EnvelopeLine from './EnvelopeLine'

export default {
  name: 'instrument-envelope',
  components: {
    EnvelopeLine
  },
  props: ['def'],
  data: function () {
    return {
      coords: {attack: {}, decay: {}, sustain: {}, release: {}},
      envInfo: {attack: {color: 'green'}, decay: {color: '#633a0d'}, sustain: {color: 'blue'}, release: {color: 'purple'}}
    }
  },
  methods: {
    changeSlider: function (key, $event) {
      this.def.properties[key].val = $event.srcElement.valueAsNumber / 100.0
      this.$emit('needsToSaveDef')
      let canvas = this.$refs.waveform
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    },
    allProps: function () {
      let result = {}
      for (let propName of ['attack', 'decay', 'sustain', 'release']) {
        result[propName] = this.propVal(propName)
      }
      return result
    },
    propVal: function (propName) {
      return this.def.properties[propName].val === undefined ? utils.defaultEnvelopeVal(propName) : this.def.properties[propName].val
    }
  },
  computed: {
    attackCSS: function () {
      return {
        width: '150px',
        height: '150px',
        'background-color': 'blue'
      }
    },
    attackMax: function () {
      if (this.def.name.includes('Drum')) {
        return 10
      }
      return 100
    }
  }
}
</script>

<style>
#instrument-envelope {
  padding: 16px;
  width: 60%;
  height: 50%;
  border: 2px solid black;
}
.graphics-wrapper {
  position: relative;
  width: 100%;
}
#envelope-container {
  z-index: 10;
  margin: 10px;
  width: 90%;
  height: 70%;
  background-color: #ddd38d;
}
#waveform {
  position: absolute;
  width: 80%;
  height: 70%;
  left: 5%;
  top: 20%;
}
#slider-container {
  display: flex;
  flex-flow: row wrap;
  padding: 10px;
}
#slider-labels {
  display: flex;
  flex-flow: row wrap;
  padding: 10px;
  background-color: #c0cee5;
  text-shadow: white 0px 0px 10px;
}
.slider-label {
  padding-right: 50px;
}
</style>
