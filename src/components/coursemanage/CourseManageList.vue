<template>
	<main-qry-table tableTitle="课程信息" qryUrl="/CourseManage/qryCourseList.do" rowSelectType="checkbox" ref="tableCmp" :setRowRowIdStrategy="rowRowIdStrategy">
		<template v-slot:formQryParamFirstLine>
			<label class="control-label col-sm-2 " for="courseName">课程名：</label>
			<div class="col-sm-3">
				<input class="form-control" type="text" id="courseName" name="name" placeholder="" />
			</div>
		</template>
		
		<template v-slot:tableHead>
			<th class="text-center">课程名</th>
			<th class="text-center">创建时间</th>
			<th class="text-center ">描述</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.name}}</td>
			<td class="text-center">{{formatTimestamp(item.createTime)}}</td>
			<td class="text-center">{{item.description}}</td>
		</template>
		
		<template v-slot:bottom_btn>
				<cbtn class="btn btn-success" type="button" @click="onAddClick">添加课程</cbtn>
				<cbtn class="btn btn-primary" type="button" @click="onChgClick">修改信息</cbtn>
				<cbtn class="btn btn-danger" type="button"  @click="onDelClick"  :showLoading="isDeleting">删除课程</cbtn>
		</template>
	</main-qry-table>
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import ComUtils from 'common/js/ComUtils.js'
	
	
	export default {
		name: "CourseManageList",
		data(){
			return {
				isDeleting: false,
				//返回课程的id
				rowRowIdStrategy: (item) => item.id
			};
		},
		components:{
			MainQryTable
		},
		methods:{
			formatTimestamp(timestamp){
				return ComUtils.formatTimestamp(timestamp, 'yyyy-MM-dd');
			},
			

			onAddClick(){
				//切换课程信息界面
				this.$router.push({path: "/Workspace/toCourseManage/toCourseDetail", query: {from: "adminAddCourse"}});
			},

			onChgClick(){
				if(!this.$refs.tableCmp.checkHasSelectOnlyOneRow()){
					return;
				}
				
				let targetId = this.$refs.tableCmp.getSelectRowIds()[0];
				let targetInfo = null;
				
				for(let info of this.$refs.tableCmp.getPageList()){
					if(targetId == info.id){
						targetInfo = info;
						break;
					}
				}

				//切换用户信息界面
				this.$router.push({path: "/Workspace/toCourseManage/toCourseDetail", query: {course: targetInfo, from: "adminChgCourse"}});
			},			
			
			onDelClick(){
				if(!this.$refs.tableCmp.checkHasSelectRowItem()){
					return;
				}
				
				let param = {confirmCallback: ()=>{
					this.doDel();
					return true;
				}}
				
				this.$confirmWin.showMsg("删除数据后，将无法恢复，您确定删除？", param);
			},
			
			doDel(){
				this.isDeleting = true;
				
				let param = {};
				param.ids = this.$refs.tableCmp.getSelectRowIds();
				this.$serverApi.post("/CourseManage/toDelCourse.do", param).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.$refs.tableCmp.doQry();
					this.$noticeWin.showMsg("删除成功");
				}).catch(err => {
					this.$noticeWin.showMsg(err);
				}).finally(() => {
					//恢复按钮
					this.isDeleting = false;
				});
			}
		}
	}
</script>

<style>
</style>
