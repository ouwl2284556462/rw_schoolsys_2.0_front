import Vue from "vue"
import ConfirmWindow from "components/popwindows/confirmwindow/ConfirmWindow.vue"


const confirmWin = {
	install(Vue) {
		const ConfirmWindowConstructor = Vue.extend(ConfirmWindow);
		const confirmWin = new ConfirmWindowConstructor();
		confirmWin.$mount(document.createElement("div"));
		document.body.appendChild(confirmWin.$el);	
		Vue.prototype.$confirmWin = confirmWin;
	}
};


Vue.use(confirmWin);
export default confirmWin;
