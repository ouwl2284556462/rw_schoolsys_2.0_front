<template>
	<main-panel title="角色管理">
		<!--只缓存CourseManageList -->
		<keep-alive include="RoleManage">
			<router-view></router-view>	
		</keep-alive>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'
	
	export default{
		name: "RoleManage",
		components: {
			MainPanel
		}
	}
</script>

<style>
</style>
