<template>
	<main-qry-table tableTitle="课程信息" qryUrl="/StdSelectCourse/qryTeacherCourseList.do" rowSelectType="radio" ref="tableCmp" :setRowRowIdStrategy="rowRowIdStrategy">
		<template v-slot:formQryParamFirstLine>
			<label class="control-label col-sm-2 " for="student-course-qry-sel-courseName">课程名：</label>
			<div class="col-sm-3" >
				<input class="form-control" type="text"  id="student-course-qry-sel-courseName" name="course.name" placeholder="" />
			</div>
			
			<label class="control-label  col-sm-2" for="student-course-qry-sel-teacherName">教师名：</label>
			<div class="col-sm-3">
				<input class="form-control" type="text" id="student-course-qry-sel-teacherName" name="userName" />
			</div>
		</template>
		
		<template v-slot:formQryParamOther>
			<!-- 更多条件 -->
			<more-condi>
				<div class="form-group">
					<label class="control-label  col-sm-2" for="student-course-qry-sel-teacherAccountName">教师工号：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="student-course-qry-sel-teacherAccountName" name="accountNameLike" />
					</div>
					
					
					<label class="control-label col-sm-2 " for="student-course-qry-sel-courseYear">学年：</label>
					<div class="col-sm-3" >
						<cdatepicker class="form-control" id="student-course-qry-sel-courseYear"  name="year" formatType="year" ></cdatepicker>
					</div>
				</div>	
				
				<div class="form-group">
					<label class="control-label col-sm-2" for="student-course-qry-sel-semester">学期：</label>
					<div class="col-sm-3">
						<cselect class="form-control" id="student-course-qry-sel-semester" name="semester" dictGrpId="semester"></cselect>
					</div>
				</div>
			</more-condi>
		</template>

		
		
		<template v-slot:tableHead>
			<th class="text-center">课程名</th>
			<th class="text-center">教师</th>
			<th class="text-center">学年</th>
			<th class="text-center">学期</th>
			<th class="text-center">备注</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.course.name}}</td>
			<td class="text-center">{{item.userName + '(' + item.accountName + ')'}}</td>
			<td class="text-center">{{item.year}}</td>
			<td class="text-center"><dict-trans grpId="semester" :val="item.semester"></dict-trans></td>
			<td class="text-center">{{item.mark}}</td>
		</template>

	</main-qry-table>
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import ComUtils from 'common/js/ComUtils.js'
	import MoreCondi from 'common/components/MoreCondi.vue'
	import DictTrans from 'common/components/DictTrans.vue'
	
	export default{
		name: "QryTeacherCourseList",
		components:{
			MainQryTable,
			MoreCondi,
			DictTrans
		},
		data() {
			return {
				rowRowIdStrategy: (item) => item.id
			};
		},
		methods:{
			getSelectId(){
				return this.$refs.tableCmp.getRadioSelectRowId();
			},
			
			getSelectItem(){
				return this.$refs.tableCmp.getRadioSelectedItemInfo();
			}
		}
	}
</script>

<style>
</style>
