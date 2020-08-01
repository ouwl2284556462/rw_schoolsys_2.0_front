<template>
		<form id="user-info-dtl-from" class="form-horizontal" @submit.prevent="onSubmit">
			<input type="hidden" name="id" :value="userInfo.id">

			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1" for="accountName">账号名</label>
				<div class="col-xs-8 col-sm-6">
					<input class="form-control" type="text" required id="accountName" name="accountName" :readonly="!isAdminAddUser" placeholder=""
					 v-model="userInfo.accountName" />
					<span class="help-block">使用员工编号或学号</span>
				</div>
			</div>

			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="name">姓名</label>
				<div class="col-xs-8 col-sm-6">
					<input class="form-control" type="text" required id="name" name="name" v-model="userInfo.name" />
				</div>
			</div>

			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="sex">性别</label>
				<div class="col-xs-8 col-sm-6">
					<cselect class="form-control" id="sex" name="sex" dictGrpId='sex' :isRequire="true" :val="userInfo.sex">
					</cselect>
				</div>
			</div>
			

			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1" for="phone">手机号</label>
				<div class="col-xs-8 col-sm-6">
					<input class="form-control" type="tel" id="phone" name="tel" pattern="[0-9]{11}" title="请填写正确手机号码" v-model="userInfo.tel" />
				</div>
			</div>


			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="identityType">证件类型</label>
				<div class="col-xs-8 col-sm-6">
					<cselect class="form-control" id="identityType" name="identityType" dictGrpId='identity_type'  :isRequire="true"
					 :val="userInfo.identityType">
					</cselect>
				</div>
			</div>

			<div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="identityNum">证件号码</label>
				<div class="col-xs-8 col-sm-6">
					<input class="form-control" type="text" required id="identityNum" name="identityNum" v-model="userInfo.identityNum" />
				</div>
			</div>

			<div class="form-group" v-if='isAdminAddOrChgUser'>
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="role">角色</label>
				<div class="col-xs-8 col-sm-6">
					<cselect class="form-control" id="role" name="role.name"   dictGrpId='sys_role' :isRequire="true" :val="userInfo.role.name">
					</cselect>
				</div>
			</div>

			<div v-if='isAdminAddUser'>
				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="password">密码</label>
					<div class="col-xs-8 col-sm-6">
						<input class="form-control" type="password" required id="password" name="password" autocomplete="off" />
					</div>
				</div>

				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="passwordConfirm">密码确认</label>
					<div class="col-xs-8 col-sm-6">
						<input class="form-control" type="password" required id="passwordConfirm" autocomplete="off" />
					</div>
				</div>
			</div>

			<!--底部按钮 -->
			<div class="form-group text-center bottom-btn-area">
				<cbtn id="user-info-dtl-form-submitBtn" type="submit" class="btn btn-primary" :showLoading='isDealing'>{{confirmBtnText}}</cbtn>
				<cbtn v-if='isAdminAddOrChgUser' type="button" id="user-info-dtl-form-returnBtn" class="btn btn-primary"  @click="onBackClick">返回</cbtn>
			</div>
		</form>
</template>

<script>
	import * as NetConst from 'common/const/NetWorkConst.js'

	export default {
		//注意:该组件被多个页面共用
		name: "UserContent",
		data() {
			return {
				userInfo: {
					id: "",
					accountName: "",
					name: "",
					sex: "",
					tel: "",
					identityType: "",
					role: {
						name: ""
					}
				},
				isDealing: false
			};
		},
		props: {
			//用户信息
			user: {
				type: Object,
				default: null
			},
			//从哪里跳转的
			from: null
		},
		computed: {
			//是否从用户管理界面进入
			isAdminAddOrChgUser() {
				return this.from == "adminAddUser" || this.from == "adminChgInfo";
			},
			//是否从用户管理-用户添加进入
			isAdminAddUser() {
				return this.from == "adminAddUser";
			},
			confirmBtnText() {
				return this.isAdminAddUser ? '添加' : '修改';
			}
		},
		components: {
		},
		created() {
			if(null != this.user){
				this.userInfo = this.user;
			}
		},
		activated() {
			if(null != this.user){
				this.userInfo = this.user;
			}
		},
		methods: {
			//点击处理
			onSubmit(event) {
				this.isDealing = true;
				let formData = new FormData(event.target);
				
				let dealUrl = '/Workspace/updateUserDtl.do';
				if(this.isAdminAddOrChgUser){
					dealUrl = "/UserManage/userInfoModify.do";
				}
				
				this.$serverApi.post(dealUrl, formData).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.$noticeWin.showMsg(this.confirmBtnText + "成功");
					
					//如果是管理页面过来，则返回管理页面
					if(this.isAdminAddOrChgUser){
						this.$router.back();
					}
					
					
				}).catch(err => {
					this.$noticeWin.showMsg("处理失败");
				}).finally(() => {
					//恢复按钮
					this.isDealing = false;
				});
			},
			
			//返回按钮点击
			onBackClick(){
				this.$router.back();
			}
		}
	}
</script>

<style>
</style>
