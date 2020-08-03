<template>
	<main-panel title="我的选课">
		<!--只缓存StudentCourseList -->
		<keep-alive include="StudentCourseList">
			<router-view></router-view>	
		</keep-alive>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'
	
	export default{
		name: "StudentCourse",
		components: {
			MainPanel
		}
	}
</script>

<style>
</style>
