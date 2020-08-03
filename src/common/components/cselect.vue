<template>
	<select :required="isRequire" @change="onChg">
		<option value="">请选择</option>
		<option v-for="(item, index) in enumList" :key="item.itemId" :value="item.itemId" :selected="isSelected(item, index)">{{item.itemName}}</option>
	</select>
</template>

<script>
	import ComUtils from 'common/js/ComUtils.js'
	
	export default {
		name: "cselect",
		model:{
			event: "change",
			prop: "val"
		},
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
		},
		methods:{
			onChg(event){
				this.$emit("change", event.target.value);
			},
			
			isSelected(item, index){
				if(item.itemId == this.val){
					return true;
				}
				
				//是否必填
				if(!this.isRequire){
					return false;
				}
				
				//是否第一个
				if(index != 0){
					return  false;
				}
				
				//当前值是否有值
				if(this.val != null && this.val != ""){
					return false;
				}
				
				// 当前列表是否有值
				if(ComUtils.isNull(this.enumList) && this.enumList.length == 0){
					return false;
				}
				
				//必填时，如果当前值为空，则默认选择第一个
				this.$emit("change", item.itemId);
				return true;
			}
		}
	}
</script>

<style>
</style>
