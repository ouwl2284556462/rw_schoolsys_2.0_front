import Vue from "vue"
import ConfirmWindow from "common/components/popwindows/confirmwindow/ConfirmWindow.vue"


const confirmWin = {
	install(Vue) {
		const ConfirmWindowConstructor = Vue.extend(ConfirmWindow);
		const confirmWin = new ConfirmWindowConstructor();
		confirmWin.$mount(document.createElement("div"));
		document.body.appendChild(confirmWin.$el);	
		Vue.prototype.$confirmWin = confirmWin;
	}
};

export default confirmWin;