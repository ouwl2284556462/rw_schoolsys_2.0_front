<template>
	<main-qry-table tableTitle="课程信息" qryUrl="/StdSelectCourse/qryMyCourseList.do" rowSelectType="checkbox" ref="tableCmp" :setRowRowIdStrategy="rowRowIdStrategy">
		<template v-slot:formQryParamFirstLine>
			<label class="control-label col-sm-2 " for="courseName">课程名：</label>
			<div class="col-sm-3" >
				<input class="form-control" type="text"  id="courseName" name="courseName" placeholder="" />
			</div>
			
			<label class="control-label col-sm-2" for="course_status">状态：</label>
			<div class="col-sm-3">
				<cselect class="form-control" id="course_status" name="status" dictGrpId="course_status">
				</cselect>	
			</div>
		</template>
		
		<template v-slot:formQryParamOther>
			<!-- 更多条件 -->
			<more-condi>
				<div class="form-group">
					<label class="control-label  col-sm-2" for="teacherName">教师名：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="teacherName" name="teacherName" />
					</div>
					
					<label class="control-label  col-sm-2" for="teacherAccountName">教师工号：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="teacherAccountName" name="teacherAccountNameLike" />
					</div>
				</div>	
				
				<div class="form-group">
					<label class="control-label col-sm-2 " for="stdselcourse-manage-courseYear">学年：</label>
					<div class="col-sm-3" >
						<cdatepicker class="form-control" id="stdselcourse-manage-courseYear"  name="year" formatType="year" ></cdatepicker>
					</div>
				
				
					<label class="control-label col-sm-2" for="semester">学期：</label>
					<div class="col-sm-3">
						<cselect class="form-control" id="semester" name="semester" dictGrpId="semester"></cselect>
					</div>
				</div>
			</more-condi>
		</template>
		
		
		<template v-slot:tableHead>
			<th class="text-center">课程名</th>
			<th class="text-center">学年</th>
			<th class="text-center">学期</th>
			<th class="text-center">教师</th>
			<th class="text-center">状态</th>
			<th class="text-center">备注</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.courseName}}</td>
			<td class="text-center">{{item.year}}</td>
			<td class="text-center"><dict-trans grpId="semester" :val="item.semester"></dict-trans></td>
			<td class="text-center">{{item.teacherName + '(' + item.teacherAccountName + ')'}}</td>
			<td class="text-center"><dict-trans grpId="course_status" :val="item.status"></dict-trans></td>
			<td class="text-center">{{item.teacherCourseMark}}</td>
		</template>
		
		<template v-slot:bottom_btn>
			<cbtn class="btn btn-success" type="button" @click="onAddClick" :showLoading="isAdding">添加选课</cbtn>
			<cbtn class="btn btn-danger" type="button"  @click="onDelClick"  :showLoading="isDeleting">退出选课</cbtn>
		</template>
	</main-qry-table>
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import MoreCondi from 'common/components/MoreCondi.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import DictTrans from 'common/components/DictTrans.vue'
	import QryTeacherCourseList from 'components/studentcourse/QryTeacherCourseList.vue'
	import ComUtils from 'common/js/ComUtils.js'
	

	export default {
		name: "StudentCourseList",
		data() {
			return {
				isDeleting: false,
				isAdding: false,
				rowRowIdStrategy: (item) => item.teacherCourseId
			};
		},
		components: {
			MainQryTable,
			DictTrans,
			MoreCondi
		},
		methods: {
			onAddClick() {
				let param = {
					confirmCallback: (cbParam) => {
						const selectItem = cbParam.cmpInst.getSelectItem();
						if(ComUtils.isNull(selectItem)){
							this.$noticeWin.showMsg("请选择");
							return false;
						}
	
						this.doAdd(selectItem);
						return true;
					}
				}

	
				this.$confirmWin.showView(QryTeacherCourseList, param);
			},
			
			doAdd(selectItem){
				this.isAdding = true;
				
				let param = {};
				param.courseId = selectItem.id;
				this.$serverApi.post("/StdSelectCourse/dealAddCourse.do", param).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.$refs.tableCmp.doQry();
					this.$noticeWin.showMsg("添加成功");
				}).catch(err => {
					this.$noticeWin.showMsg(err);
				}).finally(() => {
					//恢复按钮
					this.isAdding = false;
				});
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
				this.$serverApi.post("/StdSelectCourse/toDelCourse.do", param).then(res => {
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
