<template>
	<div>
		<div class="row">
			<form class="form-horizontal" @submit.prevent="onFormSubmit">
				<input type="hidden" name="id" :value="roleInfo.id">

				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="roleId">角色id</label>
					<div class="col-xs-8 col-sm-6">
						<input class="form-control" type="text" required id="roleId" name="name"  placeholder="" v-model="roleInfo.name" />
					</div>
				</div>
			
				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1 required" for="roleName">角色名</label>
					<div class="col-xs-8 col-sm-6">
						<input class="form-control" type="text" required id="roleName" name="chName"  placeholder="" v-model="roleInfo.chName" />
					</div>
				</div>
				
				
				<div class="form-group">
					<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1" for="mark">描述</label>
					<div class="col-xs-8 col-sm-6">
						<input  class="form-control" type="text" name="mark" id="mark" v-model="roleInfo.mark"></input>
					</div>
				</div>
				
				
			  <div class="form-group">
				<label class="control-label col-xs-3 col-sm-2 col-sm-offset-1" for="privilege">权限</label>
				<div class="col-xs-8 col-sm-6">
					<label class="checkbox-inline checkbox-inline-left-margin">
						  <input type="checkbox" name="privilegeArray" value="userAdmin" v-model="roleInfo.privilegeArray"> 用户管理菜单
					</label>
					<label class="checkbox-inline checkbox-inline-left-margin">
						  <input type="checkbox" name="privilegeArray" value="roleAdmin" v-model="roleInfo.privilegeArray"> 角色管理菜单
					</label>
					<label class="checkbox-inline checkbox-inline-left-margin">
						  <input type="checkbox" name="privilegeArray"  value="courseAdmin" v-model="roleInfo.privilegeArray"> 课程管理菜单
					</label>
					<label class="checkbox-inline checkbox-inline-left-margin">
						  <input type="checkbox" name="privilegeArray"  value="stdSelectCourse" v-model="roleInfo.privilegeArray"> 学生选课菜单
					</label>
					<label class="checkbox-inline checkbox-inline-left-margin">
						  <input type="checkbox" name="privilegeArray"  value="scoreQry" v-model="roleInfo.privilegeArray"> 成绩查询菜单
					</label>	
					<label class="checkbox-inline checkbox-inline-left-margin">
						  <input type="checkbox" name="privilegeArray"  value="tchSelectCourse" v-model="roleInfo.privilegeArray"> 教师选课菜单
					</label>
					<label class="checkbox-inline checkbox-inline-left-margin">
						  <input type="checkbox" name="privilegeArray"  value="scoreImport" v-model="roleInfo.privilegeArray"> 成绩录入菜单
					</label>							
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
	import ComUtils from 'common/js/ComUtils.js'
	
	export default {
		name: "RoleDetail",
		data() {
			return {
				roleInfo: {
					id: "",
					name: "",
					mark: "",
					privilegeArray: []
				},
				isDealing: false
			}
		},
		props: {
			role: Object,
			from: String
		},
		created() {
			if (this.role != null) {
				this.roleInfo = this.role;
				this.initPrivilegeArray();
			}
		},
		methods: {
			
			initPrivilegeArray(){
				let pArray = [];
				this.roleInfo.privilegeArray = pArray;

				let privilegesList = this.roleInfo.privileges;
				if(ComUtils.isNull(privilegesList)){
					return;
				}
				
				for(let p of privilegesList){
					pArray.push(p.resId)
				}
			},
			
			
			onBackClick() {
				this.$router.back();
			},

			onFormSubmit(event) {
				this.isDealing = true;
				let formData = new FormData(event.target);

				this.$serverApi.post("/RoleManage/roleModify.do", formData).then(res => {
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
				return this.from == "adminAddRole" ? '添加' : '修改';
			}
		}
	}
</script>

<style>
</style>
