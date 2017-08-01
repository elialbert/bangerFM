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
    this.showLanding = !(this.$route.path.includes('/app'))
    this.showDaw = !this.showLanding
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      console.log('in rute with', newRoute, oldRoute)
      this.showLanding = !(this.$route.path.includes('/app'))
      this.showDaw = !this.showLanding

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
