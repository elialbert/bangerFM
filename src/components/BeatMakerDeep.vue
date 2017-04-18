<template>
  <div id="beatmakerdeep" v-if="dataArray">
    <div class='bmd-nav'>
      <div class='bmd-nav-item' v-for="key of navItems"
        v-bind:class="{selected: active == key}"
        @click="changeNav(key)"
      >{{key}}</div>
    </div>
    <div class='bmd-container'>
      <div class='bmdeep-inner'>
      </div>
      <div class='bmd-instrument-name'>{{def.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'beat-maker-deep',
  components: {
  },
  props: ['visible', 'selected', 'def', 'dataArray'],
  data: function () {
    return {
      navItems: ['Timing', 'Pitch', 'Effects'],
      active: 'Timing'
    }
  },
  methods: {
    changeNav: function (key) {
      this.active = key
    }
  },
  computed: {
  }
}
</script>

<style>
.bmd-container {
  padding-left: 10px;
  width: 70%;
  height: 200px;
  display: flex;
}
.bmdeep-inner {
  border: 1px solid black;
  height: 80%;
  width: 100%;
  flex-shrink: 0;
}
.bmd-instrument-name {
  margin-left: 10px;
}
.bmd-nav {
  display: flex;
  margin-top: 4px;
}
.bmd-nav-item {
  padding: 4px;
  border: 1px solid black;
  background-color: white;
}
.bmd-nav-item.selected {
  background-color: grey;
}
.bmd-nav-item:nth-of-type(1) {
  margin-left: 10px;
}
</style>
