import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'assets/css/common/base.css'

import store from 'base/vuex'
import router from 'base/router'

import noticeWindow from 'common/components/popwindows/noticewindow'
import confirmWindow from 'common/components/popwindows/confirmwindow'
import CommAxios from 'common/network/CommAxios.js'

import cbtn from 'common/components/cbtn.vue'
import cselect from 'common/components/cselect.vue'


//弹出框
Vue.use(noticeWindow);
Vue.use(confirmWindow);
//通用组件
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
