<template>
  <div id="app">
    <daw v-if="showDaw"></daw>
    <landing v-if="!showDaw"></landing>
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
      showDaw: false
    }
  },
  mounted: function () {
    this.showDaw = !(this.$route.path === '/landing')
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.showDaw = !(this.$route.path === '/landing')
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
