<template>
	<main-qry-table tableTitle="成绩信息" qryUrl="/ScoreQry/qryScoreList.do"  ref="tableCmp">
		<template v-slot:formQryParamFirstLine>
			<label class="control-label col-sm-2 " for="courseName">课程名：</label>
			<div class="col-sm-3" >
				<input class="form-control" type="text"  id="courseName" name="courseName" placeholder="" />
			</div>
			
			<label class="control-label col-sm-2" for="score_status">评分状态：</label>
			<div class="col-sm-3">
				<cselect class="form-control" id="score_status" name="scoreStatus" dictGrpId="score_status"></cselect>
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
					<label class="control-label col-sm-2 " for="scoreqry-courseYear">学年：</label>
					<div class="col-sm-3" >
						<cdatepicker class="form-control" id="scoreqry-courseYear"  name="year" formatType="year" ></cdatepicker>
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
			<th class="text-center">学期</th>
			<th class="text-center">教师</th>
			<th class="text-center">分数</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.courseName}}</td>
			<td class="text-center">{{item.year + '年'}}<dict-trans grpId="semester" :val="item.semester"></dict-trans></td>
			<td class="text-center">{{item.teacherName + '(' + item.teacherAccountName + ')'}}</td>
			<td class="text-center">{{item.score}}</td>
		</template>

	</main-qry-table>
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import MoreCondi from 'common/components/MoreCondi.vue'
	import DictTrans from 'common/components/DictTrans.vue'

	export default {
		name: "ScoreQryList",
		components: {
			MainQryTable,
			DictTrans,
			MoreCondi
		}
	}
</script>

<style>
</style>
