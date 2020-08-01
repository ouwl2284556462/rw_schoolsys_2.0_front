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
	}
}

export default ComUtils;
