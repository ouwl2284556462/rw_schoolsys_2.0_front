<template>
	<form  class="form-horizontal" @submit.prevent="onFormSubmit">

		<input type="hidden" name="userId" :value="userId">

		<div class="form-group" v-if="!isAdminChgUser">
			<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1  required" for="oldPassword">旧密码</label>
			<div class="col-xs-8 col-sm-6">
				<input class="form-control" type="password" required id="oldPassword" name="oldPassword" placeholder="" />
			</div>
		</div>

		<div class="form-group">
			<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1  required" for="newPassword">新密码</label>
			<div class="col-xs-8 col-sm-6">
				<input class="form-control" type="password" required id="newPassword" name="newPassword" placeholder="" v-model="newPassword" />
			</div>
		</div>


		<div class="form-group">
			<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1  required" for="newPasswordConfirm">密码确认</label>
			<div class="col-xs-8 col-sm-6">
				<input class="form-control" type="password" required id="newPasswordConfirm" @blur="onPasswordConfirmBlur" name="newPasswordConfirm"
				 placeholder="" v-model="newPasswordConfirm" />
			</div>
		</div>


		<div class="form-group text-center bottom-btn-area">
			<cbtn class="btn btn-primary" :showLoading='isDealing'>修改</cbtn>
			<cbtn v-if='isAdminChgUser'  class="btn btn-primary" type="button" @click="onBackClick">返回</cbtn>
		</div>
	</form>
</template>

<script>
	import * as NetConst from 'common/const/NetWorkConst.js'

	export default {
		//注意:
		//该组件被多个页面共用
		name: 'PasswordChgContent',
		components: {},
		data() {
			return {
				newPassword: null,
				newPasswordConfirm: null,
				isDealing: false
			};
		},
		props: {
			userId: {
				type: Number,
				required: true
			},
			//从哪里跳转的
			from: null
		},
		computed: {
			//是否从用户管理-用户添加进入
			isAdminChgUser() {
				return this.from == "adminChgInfo";
			}
		},
		methods: {
			//检查密码输入焦点消失
			onPasswordConfirmBlur(event) {
				if (this.newPassword != this.newPasswordConfirm) {
					event.target.setCustomValidity("两次密码不相同。");
				} else {
					event.target.setCustomValidity("");
				}

			},
			onFormSubmit(event) {
				let formData = new FormData(event.target);
				this.isDealing = true;
				
				let dealUrl = "/Workspace/updateCurUserPassword.do";
				if(this.isAdminChgUser){
					dealUrl = "/UserManage/changePassword.do";
				}
				
				this.$serverApi.post(dealUrl, formData).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.$noticeWin.showMsg("修改成功");
					if(this.isAdminChgUser){
						this.$router.back();
					}
					
				}).catch(err => {
					this.$noticeWin.showMsg("修改失败");
				}).finally(() => {
					this.isDealing = false;
				});

			},
			
			onBackClick(){
				this.$router.back();
			}
		}
	}
</script>

<style>
</style>
