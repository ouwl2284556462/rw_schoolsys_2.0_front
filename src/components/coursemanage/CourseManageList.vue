<template>
	<div>
		<div class="row">
			<form class="form-horizontal" @submit.prevent="onQrySubmit">
				<input class="form-control" type="hidden" name="pageNum" :value="curPageNum" />

				<div class="form-group">
					<label class="control-label col-sm-2 " for="courseName">课程名：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="courseName" name="name" placeholder="" />
					</div>



					<div class="col-sm-1 col-sm-offset-5">
						<cbtn ref="course-manage-qry-list-btn" class="btn btn-primary" :showLoading="isQrying">查询</cbtn>
					</div>
				</div>

			</form>
		</div>


		<!--查询列表 -->
		<main-table title="课程信息" :pageInfo="pageInfo" @pagechg="pageChg">

			<template v-slot:head>
				<th class="text-center">选择</th>
				<th class="text-center">课程名</th>
				<th class="text-center">创建时间</th>
				<th class="text-center ">描述</th>
			</template>

			<template v-slot:body>
				<tr  v-for="item in pageInfo.list" :key="item.id" @click.capture="onTableRowClick(item)">
					<td class="text-center"><input type="checkbox" :value="item.id"  v-model="checkedCourseIds" readonly="readonly"  /></td>
					<td class="text-center">{{item.name}}</td>
					<td class="text-center">{{formatTimestamp(item.createTime)}}</td>
					<td class="text-center">{{item.description}}</td>
				</tr>

			</template>


			<template v-slot:bottom_btn>
				<cbtn class="btn btn-success" type="button" @click="onAddCourseClick">添加课程</cbtn>
				<cbtn class="btn btn-primary" type="button" @click="onChgCourseClick">修改信息</cbtn>
				<cbtn class="btn btn-danger" type="button"  @click="onDelCourseClick"  :showLoading="isDeletingCourse">删除课程</cbtn>
			</template>


		</main-table>


	</div>
</template>

<script>
	import MainTable from 'common/components/mainlayout/MainTable.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import ComUtils from 'common/js/ComUtils.js'
	
	
	export default {
		name: "CourseManageList",
		data(){
			return {
				isQrying: false,
				isDeletingCourse: false,
				checkedCourseIds: [],
				curPageNum: 1,
				pageInfo: {}
			};
		},
		components:{
			MainTable
		},
		activated() {
			//自动点击查询按钮
			this.qryBtnClick();
		},
		methods:{
			formatTimestamp(timestamp){
				return ComUtils.formatTimestamp(timestamp, 'yyyy-MM-dd');
			},
			
			//让查询按钮点击
			qryBtnClick() {
				$(this.$refs["course-manage-qry-list-btn"].$el).click();
			},
			
			onTableRowClick(item){
				let isSuccess = ComUtils.arrayRemove(this.checkedCourseIds, item.id);
				if(isSuccess){
					return;
				}

				this.checkedCourseIds.push(item.id);
			},
			
			pageChg(pageNum) {
				this.curPageNum = pageNum;
				//等下一tick让表单渲染好再提交
				this.$nextTick(() => {
					this.qryBtnClick();
				})
			},
			
			onQrySubmit(event) {
				this.isQrying = true;
				let formData = new FormData(event.target);

				this.$serverApi.post('/CourseManage/qryCourseList.do', formData).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.checkedCourseIds = [];
					this.pageInfo = res.data;
				}).catch(err => {
					this.$noticeWin.showMsg("查询失败");
				}).finally(() => {
					//恢复按钮
					this.isQrying = false;
				});
			},
			
			onAddCourseClick(){
				//切换课程信息界面
				this.$router.push({path: "/Workspace/toCourseManage/toCourseDetail", query: {from: "adminAddCourse"}});
			},
			
			
			//检查是否有选择数据
			checkHasSelectRowItem(){
				if(this.checkedCourseIds.length < 1){
					this.$noticeWin.showMsg("请选择");
					return false;
				}
				
				return true;
			},
			
			//检查是否只选择了一个
			checkHasSelectRowSingle(){
				if(!this.checkHasSelectRowItem()){
					return false;
				}
				
				if(this.checkedCourseIds.length > 1){
					this.$noticeWin.showMsg("只能选择一条");
					return false;
				}

				return true;
			},
			
			onChgCourseClick(){
				if(!this.checkHasSelectRowSingle()){
					return;
				}
				
				
				let targetId = this.checkedCourseIds[0];
				let targetInfo = null;
				for(let info of this.pageInfo.list){
					if(targetId == info.id){
						targetInfo = info;
						break;
					}
				}
				
				console.log(targetInfo)
				//切换用户信息界面
				this.$router.push({path: "/Workspace/toCourseManage/toCourseDetail", query: {course: targetInfo, from: "adminChgCourse"}});
			},			
			
			onDelCourseClick(){
				if(!this.checkHasSelectRowItem()){
					return;
				}
				
				let param = {confirmCallback: ()=>{
					this.doDelCourse();
					return true;
				}}
				
				this.$confirmWin.showMsg("删除数据后，将无法恢复，您确定删除？", param);
			},
			
			doDelCourse(){
				this.isDeletingCourse = true;
				
				let param = {};
				param.ids = this.checkedCourseIds;
				this.$serverApi.post("/CourseManage/toDelCourse.do", param).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.qryBtnClick();
					this.$noticeWin.showMsg("删除成功");
				}).catch(err => {
					this.$noticeWin.showMsg("处理失败");
				}).finally(() => {
					//恢复按钮
					this.isDeletingCourse = false;
				});
			}
		}
	}
</script>

<style>
</style>
