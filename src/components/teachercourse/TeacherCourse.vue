<template>
	<main-panel title="我的选课">
		<!--只缓存TeacherCourseList -->
		<keep-alive include="TeacherCourseList">
			<router-view></router-view>	
		</keep-alive>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'
	
	export default{
		name: "TeacherCourse",
		components: {
			MainPanel
		}
	}
</script>

<style>
</style>
