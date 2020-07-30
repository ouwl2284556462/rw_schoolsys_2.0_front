import Vue from "vue"
import NoticeWindow from "common/components/popwindows/noticewindow/NoticeWindow.vue"


const noticeWin = {
	install(Vue) {
		const NoticWindowConstructor = Vue.extend(NoticeWindow);
		const noticWin = new NoticWindowConstructor();
		noticWin.$mount(document.createElement("div"));
		document.body.appendChild(noticWin.$el);	
		Vue.prototype.$noticeWin = noticWin;
	}
};

export default noticeWin;
