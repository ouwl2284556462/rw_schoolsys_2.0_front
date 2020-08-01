const ComUtils = {
	isNull(obj) {
		return obj == null || typeof(obj) == "undefined";
	},

	isStrEmpty(target) {
		return target == null || typeof(target) == "undefined" || target === "";
	},

	/**返回false则没有找到对象
	 * 返回true则删除成功
	 * @param {Object} array
	 * @param {Object} target
	 */
	arrayRemove(array, target) {
		let targetIndex = null;
		for (let i in array) {
			let item = array[i];
			if (target == item) {
				targetIndex = i;
				break;
			}
		}

		if (null == targetIndex) {
			return false;
		}

		array.splice(targetIndex, 1);
		return true;
	},

	//时间戳格式化
	formatTimestamp(date = 0, fmt = 'yyyy-MM-dd hh:mm:ss') {

		date = new Date(+date)
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
			}
		}
		return fmt;
	}
}

export default ComUtils;
