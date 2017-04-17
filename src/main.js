// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

if (process.env.NODE_ENV === 'production') {
  Raven
      .config('https://b8b7ed0f810c490c8d415d9ca1ab1c4c@sentry.io/149290')
      .addPlugin(RavenVue, Vue)
      .install()
}

import App from './App'
import 'assets/firebaseui.css'
import 'assets/globalstyles.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
