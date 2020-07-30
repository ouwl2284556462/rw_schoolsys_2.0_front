import axios from 'axios'
import qs from 'qs'

class CommAxios {
	constructor(baseURL) {
		this.__axiosFunc = axios.create({
			baseURL,
			withCredentials: false
		});
	}

	setHeaders(h) {
		this.headers = h;
	}

	get(url, param) {
		return this.__doHttpRequest("GET", url, null, param);
	}

	post(url, param) {
		return this.__doHttpRequest("POST", url, param, null);
	}

	__doHttpRequest(method, url, data, params, headers) {
		return new Promise((resolve, reject) => {
			this.__axiosFunc({
				method,
				url,
				data,
				params,
				'headers': this.headers,
				paramsSerializer: (p) => qs.stringify(p, {
					indices: false
				})
			}).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			});
		});
	}
}



export default CommAxios;
