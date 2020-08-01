<template>
	<main-panel title="个人资料">
		<user-content :user="user" :from="from"></user-content>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'
	import UserContent from 'components/userinfo/UserContent.vue'

	export default {
		name: "UserInfo",
		components:{
			UserContent,
			MainPanel
		},
		props: {
			//用户信息
			user: {},
			//从哪里跳转的
			from: null
		}
	}
</script>

<style>
</style>
