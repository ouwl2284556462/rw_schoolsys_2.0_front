import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'

import router from './router'

import 'assets/css/common/base.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
