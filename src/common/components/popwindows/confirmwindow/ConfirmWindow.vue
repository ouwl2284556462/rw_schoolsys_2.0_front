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

					<div ref="viewPostion">
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
	import Vue from "vue"

	export default {
		name: 'ConfirmWindow',
		data() {
			return {
				msg: null,
				title: null,
				confirmWin: null,
				wincloseDispose: null,
				isOkBtnClick: false
			}
		},

		mounted() {
			this.confirmWin = $(this.$refs.confirmwin);
			this.okBtn = $(this.$refs.okBtn);
		},

		methods: {
			showMsg(msg, param) {
				this.msg = msg;
				//关闭窗口时，不做任何处理
				this.wincloseDispose = null;
				this.__initWindowInfo(param);
				this.confirmWin.modal();
			},

			showView(component, param) {
				this.msg = "";
				const cmpInst = this.__createTargetCmp(component, param.cmpProps);
				//关闭窗口时，销毁组件
				this.wincloseDispose = () => {
					cmpInst.$el.parentNode.removeChild(cmpInst.$el);
					cmpInst.$destroy();
				};
				this.__initWindowInfo(param, cmpInst);
				this.confirmWin.modal();
			},

			__createTargetCmp(component, props){
				const CmpConstructor = Vue.extend(component);
				let option = {
					parent: this,
					propsData: props,
					store: this.$store
				};
		
				const cmpInst = new CmpConstructor(option);
				cmpInst.$mount(document.createElement("div"));
				this.$refs.viewPostion.appendChild(cmpInst.$el);
				
				return cmpInst;
			},

			//内部使用函数，设置弹出窗口的信息
			__initWindowInfo(param, cmpInst) {
				const cbParam = {};
				cbParam.cmpInst = cmpInst;
				
				this.msg = null;
				this.isOkBtnClick = false;
				if (param == null) {
					param = {}
				}

				this.title = param.title;
				if (this.title == null) {
					this.title = "请确认";
				}


				this.confirmWin.unbind('hide.bs.modal').on('hide.bs.modal', () => {
					//如果是点了确定按钮关闭的，则不处理
					if (this.isOkBtnClick) {
						return;
					}

					if (param.closeCallback != null) {
						param.closeCallback(cbParam);
					}

					if (this.wincloseDispose != null) {
						this.wincloseDispose();
					}
				});

				//点击确定按钮
				this.okBtn.unbind("click").click(() => {
					let canClose = true;
					if (param.confirmCallback != null) {
						canClose = param.confirmCallback(cbParam);
					}

					if (canClose) {
						this.isOkBtnClick = true;
						this.confirmWin.modal('hide');
						
						if (this.wincloseDispose != null) {
							this.wincloseDispose();
						}
					}
				});
			}

		}
	}
</script>

<style>
</style>
