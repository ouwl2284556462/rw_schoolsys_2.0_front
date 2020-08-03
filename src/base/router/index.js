import VueRouter from 'vue-router'
import Vue from 'vue'
import store from 'base/vuex'
import * as NetConst from 'common/const/NetWorkConst.js'


Vue.use(VueRouter);

//重复路由不发送报错信息
const oringalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return oringalPush.call(this, location).catch(err => {});
}

const Login = () => import('components/login/Login.vue');
const Workspace = () => import('components/workspace/Workspace.vue');
const UserInfo = () => import('components/userinfo/UserInfo.vue');
const PasswordChg = () => import('components/passwordchg/PasswordChg.vue');
const UserManage = () => import('components/usermanage/UserManage.vue');
const UserManageList = () => import('components/usermanage/UserManageList.vue');
const UserContent = () => import('components/userinfo/UserContent.vue');
const PasswordChgContent = () => import('components/passwordchg/PasswordChgContent.vue');

const CourseManage = () => import('components/coursemanage/CourseManage.vue');
const CourseManageList = () => import('components/coursemanage/CourseManageList.vue');
const CourseDetail = () => import('components/coursemanage/CourseDetail.vue');

const RoleManage = () => import('components/rolemanage/RoleManage.vue');
const RoleManageList = () => import('components/rolemanage/RoleManageList.vue');
const RoleDetail = () => import('components/rolemanage/RoleDetail.vue');

const TeacherCourse = () => import('components/teachercourse/TeacherCourse.vue');
const TeacherCourseList = () => import('components/teachercourse/TeacherCourseList.vue');
const TeacherCourseDetail = () => import('components/teachercourse/TeacherCourseDetail.vue');


const router = new VueRouter({
	routes: [
		//登录页面
		{
			path: "/",
			component: Login
		},
		//登出
		{
			path: "/logout",
			component: Login,
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
			component: Workspace,
			children: [
				//默认跳转到个人信息
				{
					path: "",
					redirect: "toCurUserInfo"
				},
				//个人信息
				{
					path: "toCurUserInfo",
					component: UserInfo,
					props: (route) => ({
						user: router.app.$store.state.user
					})
				},
				//修改密码
				{
					path: "toChgCurUserPassword",
					component: PasswordChg,
					props: (route) => ({
						userId: router.app.$store.state.user.id
					})
				},
				//用户管理
				{
					path: "toUserManage",
					component: UserManage,
					children: [
						//默认跳转到用户列表
						{
							path: "",
							redirect: "toUserManageList"
						},
						//用户列表
						{
							path: "toUserManageList",
							component: UserManageList
						},
						//用户详情
						{
							path: "toUserDetail",
							component: UserContent,
							props: (route) => ({from: route.query.from, user: route.query.user})
						},
						//修改密码
						{
							path: "toChgPassword",
							component: PasswordChgContent,
							props: (route) => ({from: route.query.from, userId: route.query.userId})
						}
					]
				},
				//课程管理
				{
					path: "toCourseManage",
					component: CourseManage,
					children: [
						//默认跳转到课程列表
						{
							path: "",
							redirect: "toCourseManageList"
						},
						//课程列表
						{
							path: "toCourseManageList",
							component: CourseManageList
						},
						//课程详情
						{
							path: "toCourseDetail",
							component: CourseDetail,
							props: (route) => ({from: route.query.from, course: route.query.course})
						}						
					]
				},
				//角色管理
				{
					path: "toRoleManage",
					component: RoleManage,
					children: [
						{
							path: "",
							redirect: "toRoleManageList"
						},
						{
							path: "toRoleManageList",
							component: RoleManageList
						},
						{
							path: "toRoleDetail",
							component: RoleDetail,
							props: (route) => ({from: route.query.from, role: route.query.role})
						}						
					]
				},
				//教师选课管理
				{
					path: "toTeacherCourse",
					component: TeacherCourse,
					children: [
						{
							path: "",
							redirect: "toTeacherCourseList"
						},
						{
							path: "toTeacherCourseList",
							component: TeacherCourseList
						},
						{
							path: "toTeacherCourseDetail",
							component: TeacherCourseDetail,
							props: (route) => ({from: route.query.from, teacherCourse: route.query.teacherCourse})
						}
					]
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
