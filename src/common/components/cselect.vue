<template>
	<select>
		<option v-if="!isRequire" value="">请选择</option>
		<option v-for="item in listItem" :key="item.itemId" :value="item.itemId" :selected="item.itemId == val">{{item.itemName}}</option>
	</select>
</template>

<script>
	export default {
		name: "cselect",
		data() {
			return {}
		},
		props: {
			listItem: {
				type: Array,
				default: () => []
			},
			val: {
				type: String,
				default: ""
			},
			isRequire:{
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style>
</style>
