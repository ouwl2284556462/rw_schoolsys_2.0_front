<template>
	<div class="modal fade" id="comm-notice-window" ref="noticewin">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
					<h4 class="modal-title" id="comm-notice-window-title">{{title}}</h4>
				</div>
				<div class="modal-body">
					<div id="comm-notice-window-content">
						{{msg}}
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NoticeWindow',
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
					param = {};
				}

				this.title = param.title;
				if (this.title == null) {
					this.title = "通知";
				}

				const noticeWin = $(this.$refs.noticewin);
				noticeWin.unbind('hide.bs.modal').on('hide.bs.modal', function() {
					if (param.closeCallback != null) {
						param.closeCallback();
					}
				});

				noticeWin.modal();
			}
		}
	}
</script>

<style>
</style>
