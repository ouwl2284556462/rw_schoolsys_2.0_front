<template>
	<section id="base-frame-root-section">
		<header>
			<nav class="navbar navbar-default top-nav-wrapper">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
						 aria-controls="navbar">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<p class="navbar-text"><strong>教务管理系统</strong></p>
					</div>

					<!-- 导航栏内容 -->
					<div id="navbar" class="collapse navbar-collapse">
						<slot name="head-nav"></slot>
					</div>
				</div>
			</nav>
		</header>

		<!-- 主体内容 -->
		<div>
			<slot name="main"></slot>
		</div>
	</section>
</template>

<script>
	export default{
		name: 'BaseLayout'
	}
</script>

<style scoped>
body{
	background-color: #fafbfe;
}

.top-nav-icon{
	margin-right: 5px;
}

.top-nav-wrapper {
	-webkit-border-radius: 0;
	-moz-border-radius: 0;
	border-radius: 0;
}

.main-panel{
	background: #fff;
	box-shadow: 0 0 20px 0 rgba(154,161,171,.15);
	/*
	padding-top: 10px;
	padding-bottom: 10px;
	margin-left: 10px;
	margin-right: 10px;
	*/
}
</style>
