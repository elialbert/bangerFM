<template>
  <div class="beatbox"
    v-bind:class="{ playing: playing == n - 1 }"
  >
    <div class="innerBoxWrapper">
      <inner-box v-for="m in 9" v-bind:ref="'innerbox_' + (m-1)"
        :m="m" :n="n"
        @innerClick="innerClick"
        :dataArray="dataArray"
        :drawMode="drawMode"
      ></inner-box>
    </div>
  </div>
</template>

<script>
import InnerBox from './InnerBox'

// handles sliders
export default {
  name: 'beat-box',
  props: ['n', 'playing', 'dataArray', 'drawMode'],
  components: {
    InnerBox
  },
  data: function () {
    return {
    }
  },
  mounted: function () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    innerClick: function (m, n, state, drawMode) {
      this.$emit('innerClick', m, n, state, drawMode)
    }
  }
}
</script>

<style>
.beatbox {
  width: 25%; 
  height: 25%; 
  border: black 2px solid; 
  box-sizing: border-box;
}
.innerBoxWrapper {
  display: flex;
  flex-direction: row; 
  flex-wrap: wrap; 
  height: 100%;
  width: 100%;
}
.playing {
  background-color: red;
  opacity: 0.6;
}
</style>
