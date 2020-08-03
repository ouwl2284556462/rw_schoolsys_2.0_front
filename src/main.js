import Vue from 'vue'
import App from './App.vue'

//boostrap相关
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
//bootstrap-datepicker相关
import 'common/bootstrap-datepicker/css/bootstrap-datepicker3.min.css'
import 'common/bootstrap-datepicker/js/bootstrap-datepicker.min.js'
import 'common/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js'

//第三方公共VUE组件
import store from 'base/vuex'
import router from 'base/router'

//项目公共组件
import confirmWindow from 'common/components/popwindows/confirmwindow'
import noticeWindow from 'common/components/popwindows/noticewindow'
import CommAxios from 'common/network/CommAxios.js'

import cbtn from 'common/components/cbtn.vue'
import cselect from 'common/components/cselect.vue'
import cdatepicker from 'common/components/cdatepicker.vue'

//公共css
import 'assets/css/common/base.css'


//弹出框
Vue.use(confirmWindow);
Vue.use(noticeWindow);
//通用组件
Vue.component("cbtn", cbtn);
Vue.component("cselect", cselect);
Vue.component("cdatepicker", cdatepicker);

Vue.config.productionTip = false

//配置api服务器
Vue.prototype.$serverApi = new CommAxios('/apiserver');

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
