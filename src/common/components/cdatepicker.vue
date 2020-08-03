<template>
	<input type="text" placeholder="" ref="inputItem" autocomplete="off" :value="value"/>
</template>

<script>
	export default {
		name: "cdatepicker",
		model:{
			event: "dateChg",
			prop: "value"
		},
		props:{
			format: String,
			//优先使用这个，暂时只有year，以后需要再加
			formatType: String,
			value: String
		},
		mounted() {
			let option = {
				language: 'zh-CN', //语言
				autoclose: true, //选择后自动关闭
				clearBtn: true//清除按钮
			};
			
			//暂时只有year类型
			if(this.formatType == 'year'){
				option.startView = 2;
				option.minViewMode = 2;
				option.maxViewMode = 2;
				option.format = "yyyy";
			}
			
			
			$(this.$refs.inputItem).datepicker(option).on("changeDate", e => {
				this.$emit("dateChg", e.target.value);
			});
		}
	}
</script>

<style>
</style>
