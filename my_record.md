### 编译并运行服务（用于开发）

```bash
npm run serve
```



### 引入boostrap

1. ##### 安装jquery

   ```bash
   npm install jquery --save
   ```

   >注意使用 `--save`，运行时需要使用jquery。
   >
   >使用--save-dev安装的是运行时依赖。

   

2. ##### 配置jquery

   在根目录添加： `vue.config.js` 文件。

   在 `vue.config.js` 里面添加以下内容：

   ```js
   const webpack = require('webpack');
   module.exports = {
       configureWebpack: {
           plugins: [
               new webpack.ProvidePlugin({
                   $:"jquery",
                   jQuery:"jquery",
                   "windows.jQuery":"jquery"
               })
           ]
       },
   }
   ```

 

3. ##### 安装bootstrap

   ```bash
    npm install bootstrap@3.3.7 -s
   ```



4. ##### 在main.js引入bootstrap

   ```js
   import 'bootstrap/dist/js/bootstrap.js'
   import 'bootstrap/dist/css/bootstrap.css'
   ```

   

   



### 配置目录别名

在 `vue.config.js` 文件中添加如下代码：

```js
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

//在module.exports.chainWebpack中，增加config.resolve.alias代码。
module.exports = {
	chainWebpack: (config) => {
		config.resolve.alias.set('components', resolve('src/components'))
							.set('assets', resolve('src/assets'))
	}
}
```

在script里使用别用：

```js
//比如使用components这个别名，直接使用。
import Login from 'components/login/Login.vue'
```

在html里面使用别名

```html
<!--这里使用assets别用，需要在别名前使用'~'符号。-->
<img alt="教务系统" src="~assets/images/login_logo.jpg" class="img-responsive col-xs-12">
```



### 引入vue-router

1. ##### 安装vue-router

```bash
npm install vue-router -save
```



2. ##### 配置vue-router

   1. 在src目录下创建router目录。

   2. 在router目录下创建`index.js`文件，并配置路由信息。

   3. 在`main.js`里引入router:

      ```js
      //如果路径填写的是一个目录名，则导入的是该目录下的index.js文件。
      import router from './router'
      
      //添加router到vue中
      new Vue({
        render: h => h(App),
        router
      }).$mount('#app')
      
      ```

​		

>路由中使用`component: () => import('components/login/Login.vue')`这种方式时，为懒加载。
>
>程序打包时，会按vue组件分开成不同的js打包。当使用该组件时，才下载该js文件。

























