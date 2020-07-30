<template>
	<div class="row">
		<nav class="pull-right" style="height: 50px;" v-if="pageInfo.pages > 1">
			<ul class="pagination  col-sm-12" style="margin: 0px 0px; padding: 0px 0px;">
				<li><a href="javascript:void(0);" @click.prevent="onPageClick(pageInfo.prePage)"><span>&laquo;</span></a></li>

				<li v-for="pageNum in pageInfo.navigatepageNums" :key="pageNum" :class="{active: pageNum == pageInfo.pageNum}">
					<a href="javascript:void(0);" @click.prevent="onPageClick(pageNum)"><span>{{pageNum}}</span></a>
				</li>

				<li><a href="javascript:void(0);" @click.prevent="onPageClick(pageInfo.nextPage)"><span>&raquo;</span></a></li>

				<li>
					<div class="pager-page-num-div pull-left" style="line-height: 30px;margin-left: 10px;margin-right: 10px;">
						<div>
							<span>{{pageInfo.pageNum}}</span>/<span>{{pageInfo.pages}}</span>页，共<span>{{pageInfo.total}}</span>条
							<input class="form-control input-sm" type="text" v-model="inputPageNum" style="width: 40px;margin: 0px 0px; display: inline-block;height: 23px;">
							<button class="btn btn-default  btn-xs" @click="onPageJumpBtnClick">跳转</button>
						</div>
					</div>
				</li>
			</ul>

		</nav>
	</div>
</template>

<script>
	export default {
		name: "MainTablePage",
		data() {
			return {
				inputPageNum: 1
			};
		},
		props: {
			pageInfo: {
				required: true
			}
		},
		methods: {
			onPageClick(pageNum) {
				this.$emit("pagechg", pageNum);
			},
			
			onPageJumpBtnClick(){
				this.$emit("pagechg", this.inputPageNum);
			}
		},
		watch:{
			pageInfo(newVal, oldVal){
				this.inputPageNum = newVal.pageNum;
			}
		}
	}
</script>

<style>
</style>
