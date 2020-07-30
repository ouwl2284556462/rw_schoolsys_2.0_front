<template>
	<li>
		<a href="javascript:void(0);" class="side-nav-link main-side-nav-click-chg-page-link" @click.prevent="onLinkClick">
			<span class="glyphicon side-nav-icon" :class="[icon, { active: isSelected}]"></span>
			{{name}}
		</a>
	</li>
</template>

<script>
	export default{
		name: 'MainSideNavItem',
		props:{
			itemId: {
				type: String,
				required: true
			},
			name: String,
			url: String,
			icon: String,
			isSelected:{
				type: Boolean,
				default: false
			}
		},
		components: {
		},
		methods:{
			onLinkClick(){
				this.$emit("click", {itemId: this.itemId, url: this.url});
				
			}
		}
	}
</script>

<style scoped>
	.active {
		color: #337ab7;
	}
	
	.side-nav-link {
		color: #6c757d;
		display: block;
		padding: 15px 0px 15px 30px;
		font-size: 15px;
		-webkit-transition: all .4s;
		transition: all .4s;
		text-decoration: none;
	}
	
	.side-nav-link:hover {
		text-decoration: none;
		color: #337ab7;
	}
	
	.side-nav-icon {
		margin-right: 20px;
	}
	
	
</style>
