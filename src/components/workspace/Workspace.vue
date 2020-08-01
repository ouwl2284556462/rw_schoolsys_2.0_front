<template>
	<base-layout>
		<template v-slot:head-nav>
			<ul class="main-header-nav nav navbar-nav navbar-right">
				<li><a id="main-logout-link" href="javascript:void(0);" @click.prevent="onLogoutClick"><span class="glyphicon glyphicon-log-out top-nav-icon"></span>注销</a></li>
			</ul>

			<ul class="main-header-nav nav navbar-nav navbar-right">
				<li><a href="#"><span class="glyphicon glyphicon-user top-nav-icon"></span><span>{{accountName}}</span></a></li>
			</ul>
		</template>


		<template v-slot:main>
			<div class="container">
				<div class="row">
					<!--侧边导航 -->
					<main-side-nav :nav-items="myMenu"></main-side-nav>

					<div class="main-panel col-xs-12  col-sm-8 main-content" id="main-content">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</template>
	</base-layout>

</template>

<script>
	import BaseLayout from 'common/components/baselayout/BaseLayout.vue'
	import MainSideNav from 'common/components/mainlayout/MainSideNav.vue'

	export default {
		name: 'Workspace',
		data() {
			return {
				//菜单
				menus: [
					{id:"1", name: '个人资料', url: '/Workspace/toCurUserInfo', icon: 'glyphicon-user', permission: ''},
					{id:"2", name: '修改密码', url: '/Workspace/toChgCurUserPassword', icon: 'glyphicon-edit', permission: ''},
					{id:"3", name: '课程管理', url: '/Workspace/toCourseManage', icon: 'glyphicon-tags', permission: 'courseAdmin-all'},
					{id:"4", name: '角色管理', url: '/Workspace/toRoleManage', icon: 'glyphicon-flag', permission: 'roleAdmin-all'},
					{id:"5", name: '用户管理', url: '/Workspace/toUserManage', icon: 'glyphicon-glass', permission: 'userAdmin-all'},
					{id:"6", name: '我的选课', url: '/Workspace/toStdCourseManage', icon: 'glyphicon-list', permission: 'stdSelectCourse-all'},
					{id:"7", name: '成绩查询', url: '/Workspace/toScoreQry', icon: 'glyphicon-search', permission: 'scoreQry-all'},
					{id:"8", name: '我的选课', url: '/Workspace/toTeaCourseManage', icon: 'glyphicon-list', permission: 'tchSelectCourse-all'},
					{id:"9", name: '成绩录入', url: '/Workspace/toScoreImport', icon: 'glyphicon-pencil', permission: 'scoreImport-all'},
					{id:"10", name: '退出系统', url: '/logout', icon: 'glyphicon-log-out', permission: ''}
				]
			};
		},
		components: {
			BaseLayout,
			MainSideNav
		},
		computed: {
			accountName() {
				return this.$store.getters.accountName;
			},
			
			//获取当前帐号权限的菜单
			myMenu(){
				let privilegesInfo = this.$store.getters.curUserPrivileges;
				return this.menus.filter( m => m.permission == "" || privilegesInfo[m.permission]);
			}
		},
		methods: {
			onLogoutClick() {
				this.$router.push("/logout");
			}
		}

	}
</script>

<style scoped>
	.main-content {
		min-height: 400px;
		margin: 5px 10px;
	}
</style>
