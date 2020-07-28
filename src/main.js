import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'

import store from './vuex'
import router from './router'
import CommAxios from './common/network/CommAxios.js'

import 'assets/css/common/base.css'


Vue.config.productionTip = false
//配置api服务器
Vue.prototype.$serverApi = new CommAxios('/apiserver');

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
