const webpack = require('webpack');
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
		outputDir: 'dist',
		configureWebpack: {
			plugins: [
				new webpack.ProvidePlugin({
					$: "jquery",
					jQuery: "jquery",
					"windows.jQuery": "jquery"
				})
			]
		},
		chainWebpack: (config) => {
			config.resolve.alias
				.set('components', resolve('src/components'))
				.set('assets', resolve('src/assets'))
				.set('common', resolve('src/common'))
				.set('base', resolve('src/base'))
		},
		//用于开发环境解决cors请求问题
		devServer: {
			//代理端口
			port: '8080',
			//运行时不自动打开浏览器
			open: false,
			proxy: {
				'/apiserver': {
					//服务器api地址
					target: 'http://127.0.0.1:8083/',
					changeOrigin: true,
					pathRewrite: {
						//删除该路径的前缀
						'^/apiserver': ''
					}
				}
			}

		}
}