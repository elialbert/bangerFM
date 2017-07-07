// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import 'pixi'
import 'p2'
import 'phaser'

if (process.env.NODE_ENV === 'production') {
  Raven
      .config('https://b8b7ed0f810c490c8d415d9ca1ab1c4c@sentry.io/149290')
      .addPlugin(RavenVue, Vue)
      .install()
}

import App from './App'
import 'assets/firebaseui.css'
import 'assets/globalstyles.css'

const routes = [
  {path: '/', component: App},
  {path: '/app/:workspaceId', component: App},
  {path: '/app/:otherUser/:workspaceId', component: App}
]

const router = new VueRouter({
  routes // short for routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
