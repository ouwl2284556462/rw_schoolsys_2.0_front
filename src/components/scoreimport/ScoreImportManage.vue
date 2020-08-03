<template>
	<main-panel title="我的学生">
		<!--只缓存CourseManageList -->
		<keep-alive include="ScoreList">
			<router-view></router-view>	
		</keep-alive>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'
	
	export default{
		name: "ScoreImportManage",
		components: {
			MainPanel
		}
	}
</script>

<style>
</style>
