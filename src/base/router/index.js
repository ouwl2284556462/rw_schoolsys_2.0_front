import VueRouter from 'vue-router'
import Vue from 'vue'
import store from 'base/vuex'
import * as NetConst from 'common/const/NetWorkConst.js'



Vue.use(VueRouter);

//重复路由不发送报错信息
const oringalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location){
	return oringalPush.call(this, location).catch(err => {});
}

const router = new VueRouter({
	routes: [
		//登录页面
		{
			path: "/",
			component: () => import('components/login/Login.vue')
		},
		//登出
		{
			path: "/logout",
			component: () => import('components/login/Login.vue'),
			beforeEnter: (to, from, next) => {
				let vueObj = router.app;
				vueObj.$serverApi.post("logout.do").then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						vueObj.$noticeWin.showMsg(res.data);
						next(false);
						return;
					}

					next();
				}).catch(err => {
					vueObj.$noticeWin.showMsg("注销失败");
					next(false);
				});
			}
		},
		//主页面
		{
			path: "/Workspace",
			component: () => import('components/workspace/Workspace.vue'),
			children: [
				//默认跳转到个人信息
				{
					path: "", redirect: "toCurUserInfo"
				},
				//个人信息
				{
					path: "toCurUserInfo",
					component: () => import('components/userinfo/UserInfo.vue'),
					props: (route) => ({user: router.app.$store.state.user})
				}
			]
		},
	],
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	//登陆了才能访问其他页面
	if (to.path !== "/" && !store.getters.isLogin) {
		next("/");
		return;
	}
	
	next();
});

export default router;
