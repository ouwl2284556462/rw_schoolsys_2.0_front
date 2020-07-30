<template>
	<!-- 确认窗口 -->
	<div class="modal fade" id="comm-confirm-window" ref="confirmwin">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
					<h4 class="modal-title" id="comm-confirm-window-title">{{title}}</h4>
				</div>
				<div class="modal-body">
					<div id="comm-confirm-window-content">
						{{msg}}
					</div>
				</div>
				<div class="modal-footer">
					<button id="comm-confirm-window-okBtn" type="button" class="btn btn-success" ref="okBtn">确认</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ConfirmWindow',
		data() {
			return {
				msg: null,
				title: null
			}
		},
		methods: {
			showMsg(msg, param) {
				this.msg = msg;
				
				if (param == null) {
					param = {}
				}

				this.title = param.title;
				if (this.title == null) {
					this.title = "请确认";
				}


				const confirmWin = $(this.$refs.confirmwin);
				confirmWin.unbind('hide.bs.modal').on('hide.bs.modal', function() {
					if (param.closeCallback != null) {
						param.closeCallback();
					}
				});

				//点击确定按钮
				$(this.$refs.okBtn).unbind("click").click(function() {
					let canClose = true;
					if (param.confirmCallback != null) {
						canClose = param.confirmCallback();
					}

					if (canClose) {
						confirmWin.modal('hide')
					}
				});

				confirmWin.modal();
			}
		}
	}
</script>

<style>
</style>
