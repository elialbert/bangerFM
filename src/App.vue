<template>
  <div id="app">
    <daw v-if="showDaw" ref="daw"></daw>
    <landing v-if="showLanding"></landing>
  </div>
</template>

<script>
import Vue from 'vue'
import Daw from './components/Daw'
import Landing from './components/landing/Landing'

export default {
  name: 'app',
  components: {
    Daw,
    Landing
  },
  data: function () {
    return {
      showDaw: false,
      showLanding: false
    }
  },
  mounted: function () {
    this.showDaw = !(this.$route.path === '/landing')
    this.showLanding = !this.showDaw
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.showDaw = !(this.$route.path === '/landing')
      this.showLanding = !this.showDaw
      if (this.showDaw) {
        Vue.nextTick(() => {
          this.$refs.daw.redoSound(false, false)
        })
      }
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
</style>
