<template>
	<button :disabled="isDisable" :type="type" @click="onClick">
		<span v-show="!isShow"><slot></slot></span>
		<span v-show="isShow">{{loadingText}}</span>
	</button>
</template>

<script>
	export default {
		name: "cbtn",
		data() {
			return {
				isShow: false,
				isDisable: false
			}
		},
		props:{
			loadingText: {
				type: String,
				default: "处理中..."
			},
			showLoading: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: "submit"
			}
		},
		watch:{
			showLoading(show, oldVal){
				this.isShow = show;
				this.isDisable = show;
			}
		},
		methods:{
			onClick(event){
				this.$emit("click", event);
			}
		}
	}
</script>

<style>
</style>
