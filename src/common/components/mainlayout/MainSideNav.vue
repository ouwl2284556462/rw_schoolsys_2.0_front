<template>
	<div class="main-panel left-side-menu col-xs-12 col-sm-3  main-side-nav-container">
		<ul class="side-nav">
			<main-side-nav-item v-for="item in navItems" :key="item.id" :isSelected='curSelectId == item.id' :item-id="item.id" :name="item.name" :icon="item.icon" :url="item.url" @click="onItemClick">
			</main-side-nav-item>
		</ul>
	</div>
</template>

<script>
	import MainSideNavItem from 'common/components/mainlayout/MainSideNavItem.vue'

	export default{
		name: 'MainSideNav',
		data(){
			return {
				curSelectId: null
			};
		},
		props:{
			navItems:{
				type: Array,
				default: () => []
			}
		},
		components: {
			MainSideNavItem
		},
		methods:{
			onItemClick(itemInfo){
				this.curSelectId = itemInfo.itemId;
				this.$router.push(itemInfo.url);
			}
		}
		
	}
</script>

<style scoped>
	.main-side-nav-container {
		margin: 5px 10px;
	}

</style>
