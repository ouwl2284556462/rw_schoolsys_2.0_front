<template>
	<main-panel title="课程管理">
		<!--只缓存CourseManageList -->
		<keep-alive include="CourseManageList">
			<router-view></router-view>	
		</keep-alive>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'
	
	export default{
		name: "CourseManage",
		components: {
			MainPanel
		}
	}
</script>

<style>
</style>
