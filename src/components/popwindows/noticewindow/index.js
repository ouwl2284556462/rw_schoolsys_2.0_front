import Vue from "vue"
import NoticeWindow from "components/popwindows/noticewindow/NoticeWindow.vue"


const noticeWin = {
	install(Vue) {
		const NoticWindowConstructor = Vue.extend(NoticeWindow);
		const noticWin = new NoticWindowConstructor();
		noticWin.$mount(document.createElement("div"));
		document.body.appendChild(noticWin.$el);	
		Vue.prototype.$noticeWin = noticWin;
	}
};



Vue.use(noticeWin);

export default noticeWin;
