import Vue from 'vue'
import noticeWindow from 'components/popwindows/noticewindow'
import confirmWindow from 'components/popwindows/confirmwindow'

import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import store from 'base/vuex'
import router from 'base/router'
import CommAxios from 'common/network/CommAxios.js'
import cbtn from 'common/components/cbtn.vue'
import cselect from 'common/components/cselect.vue'
import 'assets/css/common/base.css'


Vue.component("cbtn", cbtn);
Vue.component("cselect", cselect);

Vue.config.productionTip = false
//配置api服务器
Vue.prototype.$serverApi = new CommAxios('/apiserver');

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
