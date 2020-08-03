<template>
	<main-qry-table tableTitle="角色信息" qryUrl="/RoleManage/qryRoleList.do" rowSelectType="checkbox" ref="tableCmp" :setRowRowIdStrategy="rowRowIdStrategy">
		<template v-slot:formQryParamFirstLine>
			<label class="control-label col-sm-2 " for="roleKey">角色id：</label>
			<div class="col-sm-3">
				<input class="form-control" type="text" id="roleKey" name="name" placeholder="" />
			</div>
			
			<label class="control-label col-sm-2 " for="roleName">角色名：</label>
			<div class="col-sm-3">
				<input class="form-control" type="text" id="roleName" name="chName" placeholder="" />
			</div>
		</template>
		
		
		<template v-slot:tableHead>
			<th class="text-center">角色id</th>
			<th class="text-center">角色名称</th>
			<th class="text-center ">描述</th>
		</template>
		
		<template v-slot:tableRow="{item}">
			<td class="text-center">{{item.name}}</td>
			<td class="text-center"><dict-trans grpId="sys_role" :val="item.name"></dict-trans></td>
			<td class="text-center">{{item.mark}}</td>
		</template>
		
		<template v-slot:bottom_btn>
			<cbtn class="btn btn-success" type="button" @click="onAddClick">添加角色</cbtn>
			<cbtn class="btn btn-primary" type="button" @click="onChgClick">修改信息</cbtn>
			<cbtn class="btn btn-danger" type="button"  @click="onDelClick"  :showLoading="isDeleting">删除角色</cbtn>
		</template>
	</main-qry-table>
</template>

<script>
	import MainQryTable from 'common/components/mainlayout/MainQryTable.vue'
	import * as NetConst from 'common/const/NetWorkConst.js'
	import DictTrans from 'common/components/DictTrans.vue'

	export default {
		name: "RoleManageList",
		data() {
			return {
				isDeleting: false,
				rowRowIdStrategy: (item) => item.id
			};
		},
		components: {
			MainQryTable,
			DictTrans
		},
		methods: {
			onAddClick() {
				//切换课程信息界面
				this.$router.push({
					path: "/Workspace/toRoleManage/toRoleDetail",
					query: {
						from: "adminAddRole"
					}
				});
			},

			onChgClick() {
				if(!this.$refs.tableCmp.checkHasSelectOnlyOneRow()){
					return;
				}
				

				let targetInfo =this.$refs.tableCmp.getCheckboxSelectedItemInfoOnlyOne();
				this.$router.push({path: "/Workspace/toRoleManage/toRoleDetail", query: {role: targetInfo, from: "adminChgRole"}});
			},

			onDelClick() {
				if(!this.$refs.tableCmp.checkHasSelectRowItem()){
					return;
				}
				
				let param = {confirmCallback: ()=>{
					this.doDel();
					return true;
				}}
				
				this.$confirmWin.showMsg("删除数据后，将无法恢复，您确定删除？", param);
			},

			doDel() {
				this.isDeleting = true;
				
				let param = {};
				param.ids = this.$refs.tableCmp.getSelectRowIds();
				this.$serverApi.post("/RoleManage/toDelRole.do", param).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.$noticeWin.showMsg(res.data);
						return;
					}

					this.$refs.tableCmp.doQry();
					this.$noticeWin.showMsg("删除成功");
				}).catch(err => {
					this.$noticeWin.showMsg(err);
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
