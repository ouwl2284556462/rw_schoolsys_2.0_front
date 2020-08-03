<template>
	<main-qry-table tableTitle="用户信息" qryUrl="/UserManage/qryUserList.do" rowSelectType="checkbox" ref="tableCmp" :setRowRowIdStrategy="rowRowIdStrategy">
		<template v-slot:formQryParamFirstLine>
			<label class="control-label col-sm-2 " for="account">帐号名：</label>
			<div class="col-sm-3">
				<input class="form-control" type="text" id="account" name="accountName" placeholder="" />
			</div>

			<label class="control-label col-sm-2" for="name">姓名：</label>
			<div class="col-sm-3">
				<input class="form-control" type="text" id="name" name="name" />
			</div>
		</template>		
		
		<template v-slot:formQryParamOther>
			<!-- 更多条件 -->
			<more-condi>
				<div class="form-group">
					<label class="control-label col-sm-2" for="sex">性别：</label>
					<div class="col-sm-3">
						<cselect class="form-control" id="sex" name="sex" dictGrpId='sex'>
						</cselect>
					</div>


					<label class="control-label col-sm-2 " for="phone">手机：</label>
					<div class="col-sm-3 ">
						<input class="form-control" type="text" id="phone" name="tel" title="请填写正确手机号码" />
					</div>
				</div>


				<div class="form-group">
					<label class="control-label col-sm-2" for="identityType">证件类型：</label>
					<div class="col-sm-3">
						<cselect class="form-control" id="identityType" name="identityType" dictGrpId="identity_type">
						</cselect>
					</div>


					<label class="control-label  col-sm-2" for="identityNum">证件号码：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="identityNum" name="identityNum" />
					</div>
				</div>

				<div class="form-group">
					<label class="control-label col-sm-2" for="role">角色：</label>
					<div class="col-sm-3">
						<cselect class="form-control" id="role" name="role.name" dictGrpId="sys_role">
						</cselect>
					</div>
				</div>
			</more-condi>
		</template>
		
		<template v-slot:tableHead>
			<th class="text-center">帐号</th>
			<th class="text-center">姓名</th>
			<th class="text-center">角色</th>
			<th class="text-center">性别</th>
			<th class="text-center">手机</th>
			<th class="text-center">证件类型</th>
			<th class="text-center">证件号码</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.accountName}}</td>
			<td class="text-center">{{item.name}}</td>
			<td class="text-center">
				<dict-trans grpId="sys_role" :val="item.role.name"></dict-trans>
			</td>
			<td class="text-center">
				<dict-trans grpId="sex" :val="item.sex"></dict-trans>
			</td>
			<td class="text-center">{{item.tel}}</td>
			<td class="text-center">
				<dict-trans grpId="identity_type" :val="item.identityType"></dict-trans>
			</td>
			<td class="text-center">{{item.identityNum}}</td>
		</template>
		
		<template v-slot:bottom_btn>
			<cbtn class="btn btn-success" type="button" @click="onAddUserClick">添加用户</cbtn>
			<cbtn class="btn btn-primary" type="button" @click="onChgUserClick">修改信息</cbtn>
			<cbtn class="btn btn-primary" type="button" @click="onChgPassClick">修改密码</cbtn>
			<cbtn class="btn btn-danger" type="button" @click="onDelUserClick" :showLoading="isDeleting">删除用户</cbtn>
		</template>
	</main-qry-table>
	
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import MoreCondi from 'common/components/MoreCondi.vue'
	import DictTrans from 'common/components/DictTrans.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import ComUtils from 'common/js/ComUtils.js'


	export default {
		name: "UserManageList",
		data() {
			return {
				isDeleting: false,
				//返回课程的id
				rowRowIdStrategy: (item) => item.id
			};
		},
		components:{
			MainQryTable,
			MoreCondi,
			DictTrans
		},
		methods: {
			onAddUserClick(){
				//切换用户信息界面
				this.$router.push({path: "/Workspace/toUserManage/toUserDetail", query: {from: 'adminAddUser'}});
			},
			
			onChgUserClick(){
				if(!this.$refs.tableCmp.checkHasSelectOnlyOneRow()){
					return;
				}
				
				let targetInfo = this.$refs.tableCmp.getCheckboxSelectedItemInfoOnlyOne();
				//切换用户信息界面
				this.$router.push({path: "/Workspace/toUserManage/toUserDetail", query: {from: 'adminChgInfo', user: targetInfo}});
			},
			
			
			onChgPassClick(){
				if(!this.$refs.tableCmp.checkHasSelectOnlyOneRow()){
					return;
				}
				
				
				let targetId = this.$refs.tableCmp.getSelectRowIds()[0];
				//切换修改密码界面
				this.$router.push({path: "/Workspace/toUserManage/toChgPassword", query: {from: 'adminChgInfo', userId: targetId}});
			},
			
			onDelUserClick(){
				if(!this.$refs.tableCmp.checkHasSelectRowItem()){
					return;
				}
				
				let param = {confirmCallback: ()=>{
					//提交删除用户请求
					this.doDelUser();
					return true;
				}}
				
				this.$confirmWin.showMsg("删除数据后，将无法恢复，您确定删除？", param);
			},
			
			doDelUser(){
				this.isDeleting = true;
				
				let param = {};
				param.userIds = this.$refs.tableCmp.getSelectRowIds();
				this.$serverApi.post("/UserManage/deleteUserList.do", param).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.$refs.tableCmp.doQry();
					this.$noticeWin.showMsg("删除成功");
				}).catch(err => {
					this.$noticeWin.showMsg("处理失败");
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
