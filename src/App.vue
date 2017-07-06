<template>
  <div id="app">
    <daw v-if="!landing"></daw>
    <landing v-if="landing"></landing>
  </div>
</template>

<script>
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
      landing: false
    }
  },
  mounted: function () {
    this.landing = (this.$route.path === '/landing')
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.landing = (this.$route.path === '/landing')
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
