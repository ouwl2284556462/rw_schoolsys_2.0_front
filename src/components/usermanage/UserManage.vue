<template>
	<main-panel title="用户管理">
		<keep-alive>
			<router-view></router-view>	
		</keep-alive>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'

	export default {
		name: 'UserManage',
		components: {
			MainPanel
		}
	}
</script>

<style>
</style>
