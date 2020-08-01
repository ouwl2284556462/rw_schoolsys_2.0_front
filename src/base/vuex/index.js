import Vue from 'vue'
import Vuex from 'vuex'
import ComUtils from 'common/js/ComUtils.js'
import * as NetConst from 'common/const/NetWorkConst.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		//用户信息
		user: {},
		//字典枚举
		dictEnums: {},
		//用于记录哪些字典grpId正在向服务器请求数据中，数据还没返回给客户端
		__dictNetRequestState: {}
	},
	mutations: {
		setUser(state, u) {
			state.user = u;
		},

		__setDictNetRequestState(state, data){
			state.__dictNetRequestState[data.groupId] = data.time;
		},

		//设置字典枚举值，内部使用
		__setDictEnums(state, data) {
			//该请求已完成
			delete state.__dictNetRequestState[data.groupId];
			
			Vue.set(state.dictEnums, data.groupId, data.list);
		}
	},
	actions: {
		//加载字典枚举值
		loadDictEnums(context, groupId) {
			//已经存在不需要加载
			let enumList = context.state.dictEnums[groupId];
			if (!ComUtils.isNull(enumList)) {
				return;
			}

			//获取请求状态
			let reqTime = context.state.__dictNetRequestState[groupId];
			
			//如果有人在请求该字典，并且请求在5分钟之内，不进行加载
			if (!ComUtils.isNull(reqTime) && (new Date().getTime() - reqTime) < 120000) {
				 return;
			}
			
			context.commit('__setDictNetRequestState', {groupId: groupId, time: new Date().getTime()});
			//向服务器请求数据
			this._vm.$serverApi.get('/sysDict/getSysItems.do', {
					grpId: groupId
				})
				.then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						console.error("获取字典数据失败:" + res.data);
						return;
					}

					//缓存到内部
					context.commit("__setDictEnums", {
						groupId: groupId,
						list: res.data
					});
				}).catch(err => {
					console.error("获取字典数据失败:" + err);
				});

		}
	},

	getters: {
		//是否登录
		isLogin(state, getters) {
			let accountName = getters.accountName;
			if (ComUtils.isStrEmpty(accountName)) {
				return false;
			}

			return true;
		},

		//用户名
		accountName(state, getters) {
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
