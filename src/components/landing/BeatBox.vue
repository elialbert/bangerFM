<template>
  <div class="beatbox"
    v-on:mouseover="selected = true" v-on:mouseleave="selected = false"
    v-bind:class="{ selected: selected, playing: playing }"
  >
  </div>
</template>

<script>
export default {
  name: 'beat-box',
  props: ['n', 'playing'],
  components: {
  },
  data: function () {
    return {
      selected: false
    }
  },
  mounted: function () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
.beatbox {
  width: 25%; 
  height: 25%; 
  border: black 1px solid; 
  box-sizing: border-box;
}
.selected {
  background-color: yellow;
}
.playing {
  background-color: red;
}
</style>
