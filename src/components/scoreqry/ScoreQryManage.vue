<template>
	<main-panel title="成绩查询">
		<!--只缓存ScoreQryList -->
		<keep-alive include="ScoreQryList">
			<router-view></router-view>	
		</keep-alive>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'
	
	export default{
		name: "ScoreQryManage",
		components: {
			MainPanel
		}
	}
</script>

<style>
</style>
