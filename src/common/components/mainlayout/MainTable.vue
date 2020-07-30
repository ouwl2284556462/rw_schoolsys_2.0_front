<template>
	<div>
		<table class="table  table-bordered  table-hover  table-condensed main-sub-content-list-table">
			<caption>{{title}}</caption>
			<thead>
				<tr>
					<slot name="head"></slot>
				</tr>
			</thead>
			<tbody>
				<slot name="body"></slot>
			</tbody>

		</table>

		<!-- 分页 -->
		<main-table-page :page-info="pageInfo" @pagechg="pageChg"></main-table-page>


		<div class="main-sub-content-list-operator-btn-list">
			<slot name="bottom_btn"></slot>
		</div>
	</div>
</template>

<script>
	import MainTablePage from 'common/components/mainlayout/MainTablePage.vue'
	
	
	export default {
		name: "MainTable",
		components:{
			MainTablePage
		},
		props: {
			title: String,
			pageInfo: {
				required: true
			}
		},
		methods:{
			pageChg(pageNum){
				this.$emit("pagechg", pageNum);
			}
		}
	}
</script>

<style scoped>
	.main-sub-content-list-table {
		margin-bottom: 10px;
	}

	.main-sub-content-list-operator-btn-list {
		margin-top: 10px;
		text-align: center;
		margin-bottom: 10px;
	}
</style>
