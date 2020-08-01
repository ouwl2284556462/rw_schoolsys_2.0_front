<template>
	<span>{{showVal}}</span>
</template>

<script>
	import ComUtils from 'common/js/ComUtils.js'
	//字典翻译
	export default {
		name: "DictTrans",
		props: {
			grpId: {
				type: String,
				required: true
			},
			val: {
				type: String,
				required: true
			}
		},
		created() {
			//加载字典值
			this.$store.dispatch("loadDictEnums", this.grpId);
		},
		computed:{
			showVal(){
				let enumList = this.$store.state.dictEnums[this.grpId];
				if(ComUtils.isNull(enumList)){
					return this.val;
				}
				
				for(let enumVal of enumList){
					if(enumVal.itemId === this.val){
						return enumVal.itemName;
					}
				}
				

				return this.val;
			}
		}
	}
</script>

<style>
</style>
