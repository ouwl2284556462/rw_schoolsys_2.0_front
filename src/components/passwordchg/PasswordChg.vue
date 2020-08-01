<template>
	<main-panel title="修改密码">
		<password-chg-content :userId="userId" :from="from"></password-chg-content>
	</main-panel>
</template>

<script>
	import MainPanel from 'common/components/mainlayout/MainPanel.vue'
	import PasswordChgContent from 'components/passwordchg/PasswordChgContent.vue'
	

	export default {
		name: 'PasswordChg',
		components: {
			MainPanel,
			PasswordChgContent
		},
		props: {
			userId: {
				type: Number,
				required: true
			},
			//从哪里跳转的
			from: null
		}		
	}
</script>

<style>
</style>
