<template>
	<section class="login-section">
		<div class="container login-container-root">
			<div class="row login-title-wrapper">
				<h2 class="text-center text-primary">教务管理系统</h2>
			</div>

			<div class="row login-logo-wrapper">
				<img alt="教务系统" src="~assets/images/login_logo.jpg" class="img-responsive col-xs-12">
			</div>



			<div class="row login-form-wrapper">
				<div class="login-form-container col-xs-12">
					<form action="@{/doLogin.do}" class="login-form" method="post" @submit.prevent="login">

						<div class="form-group" v-if="isLoginError">
							<div class="alert alert-danger">
								<strong>错误：</strong> {{logErrMsg}}
							</div>
						</div>



						<div class="form-group">
							<div class="input-group  input-group-lg">
								<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
								<input class="form-control input-lg" type="text" autofocus required id="account" name="username" placeholder="帐号" />
							</div>
						</div>

						<div class="form-group">
							<div class="input-group  input-group-lg">
								<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
								<input class="form-control input-lg" type="password" required id="password" name="password" placeholder="密码" />
							</div>
						</div>

						<cbtn class="btn btn-primary btn-block btn-lg" loading-text="登录中..." :showLoading="doingLogin">登录</cbtn>
					</form>
				</div>
			</div>


			<div class="row login-footer bg-info">
				<div class="col-xs-12">
					<h5 class="text-muted  text-center">建议使用Chrome、360浏览器等现代浏览器访问本网站</h5>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import * as NetConst from 'common/const/NetWorkConst.js'

	export default {
		name: 'Login',
		data() {
			return {
				isLoginError: false,
				logErrMsg: "",
				doingLogin: false,
				hasGotToken: false
			}
		},
		methods: {
			login(event) {
				//显示登录中
				this.doingLogin = true;

				//获取默认token
				if (!this.hasGotToken) {
					this.$serverApi.get("login/getToken.do").then(res => {
						if (NetConst.RESP_SUCCESS !== res.code) {
							this.setErrMsg("帐号密码错误");
							return;
						}

						let data = res.data;

						//设置token
						let headers = {};
						headers[data.headerName] = data.token;
						this.$serverApi.setHeaders(headers);

						//设置已获得token
						this.hasGotToken = true;

						//进行登录
						this.doLogin(new FormData(event.target));
					}).catch(err => {
						this.setErrMsg("网络请求失败");
						this.hasGotToken = false;
					}).finally(() => {
						//恢复按钮可以点击
						this.doingLogin = false;
					});
				} else {
					//进行登录
					this.doLogin(new FormData(event.target));
				}
			},

			//进行登录
			doLogin(formData) {
				this.$serverApi.post("doLogin.do", formData).then(res => {
					if (NetConst.RESP_SUCCESS !== res.code) {
						this.setErrMsg("帐号密码错误");
						return;
					}



					let data = res.data;
					let tokenData = data.csrfToken;
					//设置登录后的token
					let headers = {};
					headers[tokenData.headerName] = tokenData.token;
					this.$serverApi.setHeaders(headers);
					this.$store.commit("setUser", data.user);

					this.isLoginError = false;
					this.setErrMsg(null);
					this.$router.push("/Workspace");
				}).catch(err => {
					this.setErrMsg("帐号密码错误");
					this.hasGotToken = false;
				}).finally(() => {
					//恢复按钮可以点击
					this.doingLogin = false;
				});
			},

			setErrMsg(errMsg) {
				this.logErrMsg = errMsg;
				this.isLoginError = errMsg !== null && errMsg !== "";
			}

		}
	}
</script>

<style scoped>
	.login-section {
		height: 100%;
	}

	.login-section .login-container-root {
		position: relative;
		height: 100%;
	}

	.login-title-wrapper {
		margin-top: 20px;
	}

	.login-logo-wrapper {
		margin-top: 20px;
	}

	.login-form-wrapper {
		margin-top: 60px;
	}

	.login-form-container {
		display: flex;
		justify-content: center;
	}

	.login-form {
		flex-basis: 350px;
	}

	.login-form-bottom {
		margin-top: 5px;
		margin-right: 5px;
	}

	.login-form-bottom h5 {
		float: right;
	}


	.login-footer {
		position: absolute;
		bottom: 5px;
		width: 100%;
	}
</style>
