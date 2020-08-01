<template>
	<div>
		<div class="row">
			<form id="user-manage-qry-form" class="form-horizontal" @submit.prevent="onQrySubmit">
				<input class="form-control" type="hidden" id="user-manage-qry-form-pageNum" name="pageNum" :value="curPageNum" />

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
				<tr class="user-list-table-row" v-for="user in pageInfo.list" :key="user.id" @click.capture="onUserRowClick(user)">
					<td class="text-center"><input type="checkbox" :value="user.id"  v-model="checkedUserIds" readonly="readonly"  /></td>
					<td class="text-center" th:text="${user.accountName}">{{user.accountName}}</td>
					<td class="text-center" th:text="${user.name}">{{user.name}}</td>
					<td class="text-center">
						<dict-trans grpId="sys_role" :val="user.role.name"></dict-trans>
					</td>
					<td class="text-center">
						<dict-trans grpId="sex" :val="user.sex"></dict-trans>
					</td>
					<td class="text-center" th:text="${user.tel}">{{user.tel}}</td>
					<td class="text-center">
						<dict-trans grpId="identity_type" :val="user.identityType"></dict-trans>
					</td>
					<td class="text-center" th:text="${user.identityNum}">{{user.identityNum}}</td>
				</tr>
			</template>


			<template v-slot:bottom_btn>
				<cbtn class="btn btn-success" @click="onAddUserClick">添加用户</cbtn>
				<cbtn class="btn btn-primary" @click="onChgUserClick">修改信息</cbtn>
				<cbtn class="btn btn-primary" th:data-target-url="@{/UserManage/toChgPassword.do}">修改密码</cbtn>
				<cbtn class="btn btn-danger" th:data-target-url="@{/UserManage/deleteUserList.do}">删除用户</cbtn>
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
				checkedUserIds: []
			};
		},
		components:{
			MainTable,
			MoreCondi,
			DictTrans
		},
		activated() {
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

			onUserRowClick(user) {
				let isSuccess = ComUtils.arrayRemove(this.checkedUserIds, user.id);
				if(isSuccess){
					return;
				}

				this.checkedUserIds.push(user.id);
			},
			
			onAddUserClick(){
				//切换用户信息界面
				this.$router.push({path: "toUserDetail", query: {from: 'adminAddUser'}});
			},
			
			onChgUserClick(){
				let selectedCount = this.checkedUserIds.length;
				if(selectedCount < 1){
					this.$noticeWin.showMsg("请选择");
					return;
				}
				
				if(selectedCount > 1){
					this.$noticeWin.showMsg("只能选择一条");
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
				this.$router.push({path: "toUserDetail", query: {from: 'adminChgInfo', user: targetUserInfo}});
			}
		}
	}
</script>

<style>
</style>
