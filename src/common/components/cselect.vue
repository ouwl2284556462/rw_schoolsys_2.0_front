<template>
	<select>
		<option v-if="!isRequire" value="">请选择</option>
		<option v-for="item in enumList" :key="item.itemId" :value="item.itemId" :selected="item.itemId == val">{{item.itemName}}</option>
	</select>
</template>

<script>
	import ComUtils from 'common/js/ComUtils.js'
	
	export default {
		name: "cselect",
		props: {
			//字典组id
			dictGrpId: String,
			//可以直接传枚举的列表进来，优先使用这个。不传则通过grpId查字典
			itemList: {
				type: Array,
				default: null
			},
			val: {
				type: String,
				default: ""
			},
			isRequire:{
				type: Boolean,
				default: false
			}
		},
		computed:{
			enumList(){
				if(ComUtils.isNull(this.itemList)){
					return this.$store.state.dictEnums[this.dictGrpId];
				}
				
				return this.itemList;
			}
		},
		created() {
			if(!ComUtils.isStrEmpty(this.dictGrpId)){
				//加载字典值
				this.$store.dispatch("loadDictEnums", this.dictGrpId);
			}
		}
		
	}
</script>

<style>
</style>
