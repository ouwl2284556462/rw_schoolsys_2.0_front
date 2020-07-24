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
					<form action="@{/doLogin.do}" class="login-form" method="post">

						<div class="form-group" if="${loginError}">
							<div class="alert alert-danger">
								<strong>错误：</strong> 用户名或密码错误
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

						<button class="btn btn-primary btn-block btn-lg" type="submit">登录</button>
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
	export default {
		name: 'Login'
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
