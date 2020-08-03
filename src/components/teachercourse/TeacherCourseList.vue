<template>
	<main-qry-table tableTitle="课程信息" qryUrl="/TeacherSelectCourse/qryMyCourseList.do" rowSelectType="checkbox" ref="tableCmp" :setRowRowIdStrategy="rowRowIdStrategy">
		<template v-slot:formQryParamFirstLine>
			<label class="control-label col-sm-2 " for="courseName">课程名：</label>
			<div class="col-sm-3" >
				<input class="form-control" type="text"  id="courseName" name="course.name" placeholder="" />
			</div>
			
			<label class="control-label col-sm-2 " for="teachselcourse-manage-courseYear">学年：</label>
			<div class="col-sm-3" >
				<cdatepicker class="form-control" id="teachselcourse-manage-courseYear" name="year" formatType="year" ></cdatepicker>
			</div>
		</template>
		
		<template v-slot:formQryParamOther>
			<div class="form-group">
				<label class="control-label col-sm-2" for="semester">学期：</label>
				<div class="col-sm-3">
					<cselect class="form-control" id="semester" name="semester" dictGrpId="semester">
					</cselect>
				</div>
			
			
				<label class="control-label col-sm-2" for="course_status">状态：</label>
				<div class="col-sm-3">
					<cselect class="form-control" id="course_status" name="status" dictGrpId="course_status">
					</cselect>	
				</div>
			</div>
		</template>
		
		
		<template v-slot:tableHead>
			<th class="text-center">课程名</th>
			<th class="text-center">学年</th>
			<th class="text-center">学期</th>
			<th class="text-center">状态</th>
			<th class="text-center">备注</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.course.name}}</td>
			<td class="text-center">{{item.year}}</td>
			<td class="text-center"><dict-trans grpId="semester" :val="item.semester"></dict-trans></td>
			<td class="text-center"><dict-trans grpId="course_status" :val="item.status"></dict-trans></td>
			<td class="text-center">{{item.mark}}</td>
		</template>
		
		<template v-slot:bottom_btn>
			<cbtn class="btn btn-success" type="button" @click="onAddClick">添加选课</cbtn>
			<cbtn class="btn btn-primary" type="button" @click="onChgClick">修改选课</cbtn>
			<cbtn class="btn btn-danger" type="button"  @click="onDelClick"  :showLoading="isDeleting">退出选课</cbtn>
		</template>
	</main-qry-table>
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import DictTrans from 'common/components/DictTrans.vue'

	export default {
		name: "TeacherCourseList",
		data() {
			return {
				isDeleting: false,
				rowRowIdStrategy: (item) => item.id
			};
		},
		components: {
			MainQryTable,
			DictTrans
		},
		methods: {
			onAddClick() {
				//切换课程信息界面
				this.$router.push({              
					path: "/Workspace/toTeacherCourse/toTeacherCourseDetail",
					query: {
						from: "adminAddTeacherCourse"
					}
				});
			},

			onChgClick() {
				if(!this.$refs.tableCmp.checkHasSelectOnlyOneRow()){
					return;
				}
				
		
				let targetInfo = this.$refs.tableCmp.getCheckboxSelectedItemInfoOnlyOne();
				this.$router.push({path: "/Workspace/toTeacherCourse/toTeacherCourseDetail", query: {teacherCourse: targetInfo, from: "adminChgTeacherCourse"}});
			},

			onDelClick() {
				if(!this.$refs.tableCmp.checkHasSelectRowItem()){
					return;
				}
				
				let param = {confirmCallback: ()=>{
					this.doDel();
					return true;
				}};
				
				this.$confirmWin.showMsg("删除数据后，将无法恢复，您确定删除？", param);
			},

			doDel() {
				this.isDeleting = true;
				
				let param = {};
				param.ids = this.$refs.tableCmp.getSelectRowIds();
				this.$serverApi.post("/TeacherSelectCourse/toDelCourse.do", param).then(res => {
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
