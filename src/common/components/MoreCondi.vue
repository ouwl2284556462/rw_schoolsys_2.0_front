<template>
	<div>
		<!-- 更多条件 -->
		<div class="panel-collapse collapse" :id="uniqueId">
			<slot></slot>
		</div>

		<div class="form-group">
			<div class="col-sm-2" style="text-align: right;">
				<a  data-toggle="collapse" :href="'#' + uniqueId" @click.prevent="onMoreConditionClick">
					<span>{{moreConditionText}}</span>
					<span class="glyphicon" :class="moreConditionClass"></span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "MoreCondi",
		data() {
			return {
				uniqueId: null,
				isMoreConditionDisplay: false
			};
		},
		created() {
			this.uniqueId = "un" + parseInt(Math.random() * 100) + "_" + new Date().getTime();
		},

		computed: {
			moreConditionText() {
				return this.isMoreConditionDisplay ? "收起" : "更多";
			},

			moreConditionClass() {
				return {
					'glyphicon-menu-down': !this.isMoreConditionDisplay,
					'glyphicon-menu-up': this.isMoreConditionDisplay
				};
			}
		},

		methods: {
			onMoreConditionClick() {
				this.isMoreConditionDisplay = !this.isMoreConditionDisplay;
			}
		}
	}
</script>

<style>
</style>
