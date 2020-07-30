<template>
	<div>
		<div class="row">
			<h3 class="col-xs-12 text-primary text-center">{{title}}</h3>
		</div>

		<div class="main-sub-content">
			<slot></slot>
		</div>

	</div>
</template>

<script>
	//主页面的内容面板
	export default {
		name: 'MainPanel',
		props: {
			title: {
				type: String
			}
		}
	}
</script>

<style scoped>
	.main-sub-content {
		margin-top: 20px;
	}
</style>
