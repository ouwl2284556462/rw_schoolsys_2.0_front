const webpack = require('webpack');
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
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
		config.resolve.alias.set('components', resolve('src/components'))
							.set('assets', resolve('src/assets'))
	}
}
