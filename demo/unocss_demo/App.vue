<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */



	.themeRedCss {
		@apply  !bg-red-500;
	}

	.themeGreenCss {
		@apply  !bg-green-500;
	}

	.themeBlueCss {
		@apply  !bg-blue-500;
	}
	
	.themeRedCss .themeCss,.themeGreenCss .themeCss,.themeBlueCss .themeCss {
		@apply  !text-white;
	}
</style>
