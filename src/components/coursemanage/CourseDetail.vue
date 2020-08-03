<template>
	<div>
		<div class="row">
			<form class="form-horizontal" @submit.prevent="onFormSubmit">
				<input type="hidden" name="id" :value="courseInfo.id">

				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="courseName">课程名</label>
					<div class="col-xs-8 col-sm-6">
						<input class="form-control" type="text" required id="courseName" name="name" placeholder="" v-model="courseInfo.name" />
					</div>
				</div>


				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1" for="description">描述</label>
					<div class="col-xs-8 col-sm-6">
						<textarea class="form-control" rows="3" name="description" id="description" v-model="courseInfo.description"></textarea>
					</div>
				</div>


				<div class="form-group text-center  bottom-btn-area">
					<cbtn type="submit" class="btn btn-primary" :showLoading="isDealing">{{confirmBtnText}}</cbtn>
					<cbtn class="btn btn-primary" @click="onBackClick" type="button">返回</cbtn>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import * as NetConst from 'common/const/NetWorkConst.js'
	
	export default {
		name: "CourseDetail",
		data() {
			return {
				courseInfo: {
					id: "",
					name: "",
					description: ""
				},
				isDealing: false
			}
		},
		props: {
			course: Object,
			from: String
		},
		created() {
			if (this.course != null) {
				this.courseInfo = this.course;
			}
		},
		methods: {
			onBackClick() {
				this.$router.back();
			},

			onFormSubmit(event) {
				this.isDealing = true;
				let formData = new FormData(event.target);

				this.$serverApi.post("/CourseManage/courseModify.do", formData).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.$noticeWin.showMsg(this.confirmBtnText + "成功");
					this.$router.back();
				}).catch(err => {
					this.$noticeWin.showMsg("处理失败");
				}).finally(() => {
					//恢复按钮
					this.isDealing = false;
				});
			}
		},
		computed: {
			confirmBtnText() {
				return this.from == "adminAddCourse" ? '添加' : '修改';
			}
		}
	}
</script>

<style>
</style>
