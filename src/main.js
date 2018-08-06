// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import loading from './common/imgs/loading.gif'
import App from './App'
import router from './router'
import store from './store'
import Split from './compnents/Split/Split'
import './mock/mockServer'
import './filters'

Vue.component(Button.name, Button)
Vue.component('Split', Split)

// Vue.use(VueLazyload, {
//   loading,
//   preLoad: 1,
//   attempt: 1
// })

Vue.use(VueLazyload, {
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
