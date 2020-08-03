<template>
	<div>
		<div class="row">
			<form class="form-horizontal" @submit.prevent="onFormSubmit">
				<input type="hidden" name="id" :value="teacherCourseInfo.id">

				<div class="form-group has-feedback">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="teacher-add-courseName">课程名</label>
					<div class="col-xs-8 col-sm-6">
						<input ref="courseNameInput" class="form-control readonly-no-gray" type="text" required id="teacher-add-courseName"
						 @click="onCourseNameClick" th:data-qry-url="@{/TeacherSelectCourse/toQryCourse.do}" autocomplete="off" readonly="readonly"
						 placeholder="" :value="teacherCourseInfo.course.name" />
						<input type="hidden" id="teacher-add-courseId" name="course.id" v-model="teacherCourseInfo.course.id" />
						<span class="glyphicon glyphicon-search form-control-feedback"></span>
					</div>
				</div>

				<div class="form-group has-feedback">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1  required" for="teacher-add-courseName">学年</label>
					<div class="col-xs-8 col-sm-6">
						<cdatepicker class="form-control" name="year" required formatType="year" v-model="teacherCourseInfo.year"></cdatepicker>
						<span class="glyphicon glyphicon-calendar form-control-feedback"></span>
					</div>
				</div>


				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="semester">学期</label>
					<div class="col-xs-8 col-sm-6">
						<cselect class="form-control" id="semester" name="semester" dictGrpId='semester' :isRequire="true" v-model="teacherCourseInfo.semester">
						</cselect>
					</div>
				</div>


				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1" for="mark">描述</label>
					<div class="col-xs-8 col-sm-6">
						<textarea class="form-control" rows="3" name="mark" id="mark" v-model="teacherCourseInfo.mark"></textarea>
					</div>
				</div>

				<div class="form-group" th:if="'teacherChgCourse' == ${from}">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1" for="courseStatus">状态</label>
					<div class="col-xs-8 col-sm-6">
						<cselect class="form-control" id="courseStatus" name="status" dictGrpId='course_status' :isRequire="true" v-model="teacherCourseInfo.status">
						</cselect>
					</div>
				</div>

				<div class="form-group text-center  bottom-btn-area">
					<cbtn class="btn btn-primary" :showLoading="isDealing">{{confirmBtnText}}</cbtn>
					<cbtn class="btn btn-primary" @click="onBackClick" type="button">返回</cbtn>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import * as NetConst from 'common/const/NetWorkConst.js'
	import ComUtils from 'common/js/ComUtils.js'
	import QryCourseList from 'components/teachercourse/QryCourseList.vue'

	export default {
		name: "TeacherCourseDetail",
		data() {
			return {
				teacherCourseInfo: {
					id: "",
					year: "",
					semester: "",
					status: "",
					mark: "",
					course: {
						id: "",
						name: ""
					}
				},
				isDealing: false,
			}
		},
		props: {
			teacherCourse: Object,
			from: String
		},
		created() {
			if (this.teacherCourse != null) {
				this.teacherCourseInfo = this.teacherCourse;
			}
		},
		methods: {
			onBackClick() {
				this.$router.back();
			},

			onCourseNameClick() {
				let param = {
					confirmCallback: (cbParam) => {
						const selectItem = cbParam.cmpInst.getSelectItem();
						if(ComUtils.isNull(selectItem)){
							this.$noticeWin.showMsg("请选择");
							return false;
						}
						
						this.teacherCourseInfo.course.id = selectItem.id;
						this.teacherCourseInfo.course.name = selectItem.name;
						return true;
					}
				}

	
				this.$confirmWin.showView(QryCourseList, param);
			},

			onFormSubmit(event) {
				if (ComUtils.isStrEmpty(this.teacherCourseInfo.course.id)) {
					this.$noticeWin.showMsg("请选择课程");
					return;
				}





				this.isDealing = true;
				let formData = new FormData(event.target);

				this.$serverApi.post("/TeacherSelectCourse/addCourseModify.do", formData).then(res => {
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
			},

		},
		computed: {
			confirmBtnText() {
				return this.from == "adminAddTeacherCourse" ? '添加' : '修改';
			}
		}
	}
</script>

<style>
</style>
