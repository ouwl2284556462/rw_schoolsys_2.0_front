<template>
	<div class="row">
		<div class="form-horizontal" >
			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1">课程名称</label>
				<div class="col-xs-8 col-sm-6" >
					<p class="form-control-static">{{courseInfo.courseName}}</p>
				</div>
			</div>
		
			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1">学生名</label>
				<div class="col-xs-8 col-sm-6" >
					<p class="form-control-static">{{courseInfo.studentName}}</p>
				</div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1" for="update-score-page-score">分数</label>
				<div class="col-xs-8 col-sm-6">
					<input  class="form-control" type="number" id="update-score-page-score" v-model="courseInfo.score"></input>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: "UpdateScore",
		props:{
			courseInfo:{
				type: Object
			}
		},
		methods:{
			getInputScore(){
				return this.courseInfo.score;
			}
		}
	}
</script>

<style>
</style>
