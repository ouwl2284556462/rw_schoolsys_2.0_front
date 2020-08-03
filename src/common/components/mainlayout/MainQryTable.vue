<template>
	<div>
		<div class="row">
			<form class="form-horizontal" @submit.prevent="onQrySubmit" ref="qryForm">
				<input class="form-control" type="hidden" name="pageNum" :value="curPageNum" />

				<div class="form-group">
					<slot name="formQryParamFirstLine"></slot>
					<div class="col-sm-1" :class="extraQryBtnClass">
						<cbtn ref="qry-list-btn" class="btn btn-primary" :showLoading="isQrying" @click="onQryClick">查询</cbtn>
					</div>
				</div>
				
				<slot name="formQryParamOther"></slot>
				
			</form>
		</div>

		<!--查询列表 -->
		<main-table :title="tableTitle" :pageInfo="pageInfo" @pagechg="pageChg">
			<template v-slot:head>
				<th v-if="isNeedRowSelect" class="text-center">选择</th>
				<slot name="tableHead"></slot>
			</template>

			<template v-slot:body>
				<tr v-for="item in pageInfo.list" :key="item.id" @click.capture="onTableRowClick(item)">
					<td  v-if="isNeedRowSelect"  class="text-center">
						<input v-if="rowSelectType == 'checkbox'" type="checkbox" :value="setRowRowIdStrategy(item)" v-model="checkedIds"/>
						<input v-if="rowSelectType == 'radio'" type="radio" :value="setRowRowIdStrategy(item)" v-model="selectedId"/>
					</td>
					<slot name="tableRow" v-bind:item="item"></slot>
				</tr>
			</template>


			<template v-slot:bottom_btn>
				<slot name="bottom_btn"></slot>
			</template>
		</main-table>
	</div>
</template>

<script>
	import MainTable from 'common/components/mainlayout/MainTable.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import ComUtils from 'common/js/ComUtils.js'
	import MoreCondi from 'common/components/MoreCondi.vue'


	export default {
		name: "MainQryTable",
		data() {
			return {
				isQrying: false,
				checkedIds: [],
				selectedId: "",
				curPageNum: 1,
				pageInfo: {},
				//是否查询按钮偏移
				extraQryBtnClass: "",
				firstLineParam:[]
			};
		},
		props:{
			tableTitle: {
				type: String,
				default: ""
			},
			qryUrl: {
				type: String,
				required: true
			},
			//填空则行不能选择，可以填checkbox，radio
			rowSelectType:{
				type: String,
				default: ""
			},
			//设置每行ID的方法
			setRowRowIdStrategy:{
				type: Function,
				default: (item) => {return 1}
			}
		},
		components: {
			MoreCondi,
			MainTable
		},
		mounted() {
			let formQryParamCount = this.$slots.formQryParamFirstLine.length;
			if(formQryParamCount < 4){
				this.extraQryBtnClass = "col-sm-offset-5";
			}
			
			//自动查询
			this.doQry();
		},
		activated() {
			//自动查询
			this.doQry();
		},
		
		computed:{
			//列表是否需要显示选择列。
			isNeedRowSelect(){
				return !ComUtils.isStrEmpty(this.rowSelectType);
			}
		},
		
		methods: {
			//获取所有选择的行
			getSelectRowIds(){
				return this.checkedIds;
			},
			
			//radio时使用
			getRadioSelectRowId(){
				return this.selectedId;
			},
			
			getPageList(){
				return this.pageInfo.list;
			},
			
			//这个不会重置页面
			doQry(needResetpage){
				//重置页面
				if(needResetpage){
					this.curPageNum = 1;
				}
				
				//等下一tick让表单渲染好再提交
				this.$nextTick(() => {
					this.onQrySubmit({target: this.$refs.qryForm});
				})
			},
			

			onTableRowClick(item) {
				//不需要选择时，则不作处理
				if(!this.isNeedRowSelect){
					return;
				}
				

				if(this.rowSelectType == 'radio'){
					this.selectedId = item.id;
				}else if(this.rowSelectType == 'checkbox'){
					let isSuccess = ComUtils.arrayRemove(this.checkedIds, item.id);
					if (isSuccess) {
						return;
					}
					
					this.checkedIds.push(item.id);
				}
			},

			onQryClick(event){
				//重置页面
				this.curPageNum = 1;
			},

			pageChg(pageNum) {
				this.curPageNum = pageNum;
				this.doQry();
			},

			onQrySubmit(event) {
				this.isQrying = true;
				let formData = new FormData(event.target);

				this.$serverApi.post(this.qryUrl, formData).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.checkedIds = [];
					this.pageInfo = res.data;
				}).catch(err => {
					this.$noticeWin.showMsg("查询失败");
				}).finally(() => {
					//恢复按钮
					this.isQrying = false;
				});
			},

			//检查是否有选择数据
			checkHasSelectRowItem() {
				if(this.rowSelectType == 'radio'){
					if(this.selectedId == null || this.selectedId == ""){
						this.$noticeWin.showMsg("请选择");
						return false;
					}
					
					return true;
				}
				

				if(this.rowSelectType == 'checkbox'){
					if (this.checkedIds.length < 1) {
						this.$noticeWin.showMsg("请选择");
						return false;
					}

					return true;
				}
				

				return true;
			},

			//检查是否只选择了一个
			checkHasSelectOnlyOneRow() {
				if (!this.checkHasSelectRowItem()) {
					return false;
				}

				if (this.checkedIds.length > 1) {
					this.$noticeWin.showMsg("只能选择一条");
					return false;
				}

				return true;
			}
		}
	}
</script>

<style>
</style>
