import Vue from 'vue'
import Vuex from 'vuex'
import ComUtils from 'common/js/ComUtils.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: {}
	},
	mutations: {
		setUser(state, u) {
			state.user = u;
		}
	},

	getters: {
		isLogin(state, getters) {
			let accountName = getters.accountName;
			if (ComUtils.isStrEmpty(accountName)) {
				return false;
			}

			return true;
		},
		
		accountName(state, getters){
			let user = state.user;
			if (ComUtils.isNull(user)) {
				return null;
			}
			
			let accountName = user.accountName;
			if (ComUtils.isStrEmpty(accountName)) {
				return null;
			}
			
			return accountName;
		}
	}
});

export default store;
