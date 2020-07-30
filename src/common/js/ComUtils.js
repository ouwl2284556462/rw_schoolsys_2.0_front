const ComUtils = {
	isNull(obj){
		return obj == null || typeof(obj) == "undefined";
	},
	
	isStrEmpty(target){
		return target == null || typeof(target) == "undefined" || target === "";
	}
}

export default ComUtils;