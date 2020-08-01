<template>
	<div>
		<div class="row">
			<form class="form-horizontal" @submit.prevent="onQrySubmit">
				<input class="form-control" type="hidden" name="pageNum" :value="curPageNum" />

				<div class="form-group">
					<label class="control-label col-sm-2 " for="account">帐号名：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="account" name="accountName" placeholder="" />
					</div>

					<label class="control-label col-sm-2" for="name">姓名：</label>
					<div class="col-sm-3">
						<input class="form-control" type="text" id="name" name="name" />
					</div>


					<div class="col-sm-1">
						<cbtn ref="user-manage-qry-list-btn" class="btn btn-primary" type="submit" :showLoading="isQrying">查询</cbtn>
					</div>
				</div>

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
			</form>
		</div>

		<!--查询列表 -->
		<main-table title="用户信息" :pageInfo="pageInfo" @pagechg="pageChg">

			<template v-slot:head>
				<th class="text-center">选择</th>
				<th class="text-center">帐号</th>
				<th class="text-center">姓名</th>
				<th class="text-center">角色</th>
				<th class="text-center">性别</th>
				<th class="text-center">手机</th>
				<th class="text-center">证件类型</th>
				<th class="text-center">证件号码</th>
			</template>

			<template v-slot:body>
				<tr v-for="item in pageInfo.list" :key="item.id" @click.capture="onTableRowClick(item)">
					<td class="text-center"><input type="checkbox" :value="item.id"  v-model="checkedUserIds" readonly="readonly"  /></td>
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
				</tr>
			</template>


			<template v-slot:bottom_btn>
				<cbtn class="btn btn-success" type="button" @click="onAddUserClick">添加用户</cbtn>
				<cbtn class="btn btn-primary" type="button" @click="onChgUserClick">修改信息</cbtn>
				<cbtn class="btn btn-primary" type="button" @click="onChgPassClick">修改密码</cbtn>
				<cbtn class="btn btn-danger" type="button" @click="onDelUserClick" :showLoading="isDeletingUser">删除用户</cbtn>
			</template>


		</main-table>


	</div>
</template>

<script>
	import MainTable from 'common/components/mainlayout/MainTable.vue'
	import MoreCondi from 'common/components/MoreCondi.vue'
	import DictTrans from 'common/components/DictTrans.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import ComUtils from 'common/js/ComUtils.js'


	export default {
		name: "UserManageList",
		data() {
			return {
				isQrying: false,
				pageInfo: {},
				curPageNum: 1,
				checkedUserIds: [],
				isDeletingUser: false
			};
		},
		components:{
			MainTable,
			MoreCondi,
			DictTrans
		},
		activated() {
			console.log(111);
			//自动点击查询按钮
			this.qryBtnClick();
		},
		methods: {
			//让查询按钮点击
			qryBtnClick() {
				$(this.$refs["user-manage-qry-list-btn"].$el).click();
			},

			pageChg(pageNum) {
				this.curPageNum = pageNum;
				//等下一tick让表单渲染好再提交
				this.$nextTick(() => {
					this.qryBtnClick();
				})
			},

			onQrySubmit(event) {
				this.isQrying = true;
				let formData = new FormData(event.target);

				this.$serverApi.post('/UserManage/qryUserList.do', formData).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.checkedUserIds = [];
					this.pageInfo = res.data;
				}).catch(err => {
					this.$noticeWin.showMsg("查询失败");
				}).finally(() => {
					//恢复按钮
					this.isQrying = false;
				});

			},

			onTableRowClick(user) {
				let isSuccess = ComUtils.arrayRemove(this.checkedUserIds, user.id);
				if(isSuccess){
					return;
				}

				this.checkedUserIds.push(user.id);
			},
			
			onAddUserClick(){
				//切换用户信息界面
				this.$router.push({path: "/Workspace/toUserManage/toUserDetail", query: {from: 'adminAddUser'}});
			},
			
			//检查是否有选择数据
			checkHasSelectRowItem(){
				if(this.checkedUserIds.length < 1){
					this.$noticeWin.showMsg("请选择");
					return false;
				}
				
				return true;
			},
			
			//检查是否只选择了一个
			checkHasSelectRowSingle(){
				if(!this.checkHasSelectRowItem()){
					return false;
				}
				
				if(this.checkedUserIds.length > 1){
					this.$noticeWin.showMsg("只能选择一条");
					return false;
				}

				return true;
			},
			
			onChgUserClick(){
				if(!this.checkHasSelectRowSingle()){
					return;
				}
				
				
				let targetUserId = this.checkedUserIds[0];
				let targetUserInfo = null;
				for(let userInfo of this.pageInfo.list){
					if(targetUserId == userInfo.id){
						targetUserInfo = userInfo;
						break;
					}
				}
					
				//切换用户信息界面
				this.$router.push({path: "/Workspace/toUserManage/toUserDetail", query: {from: 'adminChgInfo', user: targetUserInfo}});
			},
			
			
			onChgPassClick(){
				if(!this.checkHasSelectRowSingle()){
					return;
				}
				
				//切换修改密码界面
				this.$router.push({path: "/Workspace/toUserManage/toChgPassword", query: {from: 'adminChgInfo', userId: this.checkedUserIds[0]}});
			},
			
			onDelUserClick(){
				if(!this.checkHasSelectRowItem()){
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
				this.isDeletingUser = true;
				
				let param = {};
				param.userIds = this.checkedUserIds;
				this.$serverApi.post("/UserManage/deleteUserList.do", param).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.qryBtnClick();
					this.$noticeWin.showMsg("删除成功");
				}).catch(err => {
					this.$noticeWin.showMsg("处理失败");
				}).finally(() => {
					//恢复按钮
					this.isDeletingUser = false;
				});
			}
		}
	}
</script>

<style>
</style>
