<template>
	<main-qry-table tableTitle="学生信息" qryUrl="/ScoreImport/qryStudentList.do" rowSelectType="radio" ref="tableCmp" :setRowRowIdStrategy="rowRowIdStrategy">
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
					<label class="control-label  col-sm-2" for="studentName">学生名：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="studentName" name="studentName" />
					</div>
				
					
					<label class="control-label  col-sm-2" for="studentAccountName">学号：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="studentAccountName" name="accountNameLike" />
					</div>

				</div>	
				
				<div class="form-group">
					<label class="control-label col-sm-2 " for="scoreimport-manage-courseYear">学年：</label>
					<div class="col-sm-3" >
						<cdatepicker class="form-control" id="scoreimport-manage-courseYear"  name="year" formatType="year" ></cdatepicker>
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
			<th class="text-center">学生</th>
			<th class="text-center">分数</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.courseName}}</td>
			<td class="text-center">{{item.year}}</td>
			<td class="text-center"><dict-trans grpId="semester" :val="item.semester"></dict-trans></td>
			<td class="text-center">{{item.studentName + '(' + item.accountName + ')'}}</td>
			<td class="text-center">{{item.score}}</td>
		</template>
		
		<template v-slot:bottom_btn>
			<cbtn class="btn btn-primary" type="button" @click="onChgScoreClick" :showLoading="isDealing">修改分数</cbtn>
		</template>
	</main-qry-table>
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import MoreCondi from 'common/components/MoreCondi.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import DictTrans from 'common/components/DictTrans.vue'
	import UpdateScore from 'components/scoreimport/UpdateScore.vue'
	import ComUtils from 'common/js/ComUtils.js'

	export default {
		name: "ScoreList",
		data() {
			return {
				isDealing: false,
				rowRowIdStrategy: (item) => item.accountName + "_" + item.teacherCourseId
			};
		},
		components: {
			MainQryTable,
			DictTrans,
			MoreCondi
		},
		methods: {
			onChgScoreClick() {
				if(!this.$refs.tableCmp.checkHasSelectOnlyOneRow()){
					return;
				}
				
				
				let targetInfo = 	this.$refs.tableCmp.getRadioSelectedItemInfo();
				const param = {
					confirmCallback: (cbParam) => {
						const score = cbParam.cmpInst.getInputScore();
						if(ComUtils.isNull(score)){
							this.$noticeWin.showMsg("请填写分数");
							return false;
						}
						
						this.doUpdateScore({
							accountName: targetInfo.accountName,
							teacherCourseId : targetInfo.teacherCourseId,
							score : score
						});
						return true;
					},
					cmpProps:{
						courseInfo:{
							studentName: targetInfo.studentName,
							courseName : targetInfo.courseName,
							score : targetInfo.score
						}
					}
				}

	
				this.$confirmWin.showView(UpdateScore, param);
			},
			
			doUpdateScore(scoreInfo){
				this.isDealing = true;
				this.$serverApi.post("/ScoreImport/doUpdateScore.do", scoreInfo).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.$refs.tableCmp.doQry();
					this.$noticeWin.showMsg("操作成功");
				}).catch(err => {
					this.$noticeWin.showMsg(err);
				}).finally(() => {
					//恢复按钮
					this.isDealing = false;
				});
			}
		}
	}
</script>

<style>
</style>
