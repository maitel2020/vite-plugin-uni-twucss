<template>
	<view :class="[theme===1?'dark':'']">
		<view class="darkCss  bg-white dark:bg-gray-800 transition duration-200"
			:class="[theme===0?'themeWhiteCss':theme===2?'themeRedCss':theme===3?'themeGreenCss':theme===4?'themeBlueCss':'']">
			<slot></slot>
		</view>
	</view>
</template>


<script setup>
	import {
		ref,onMounted
	} from "vue"

	import {
		onLoad
	} from "@dcloudio/uni-app";

	let theme = ref(0)
	let value = uni.getStorageSync('theme');

	if (value === "") {
		value = theme.value
	}

	theme.value = value
	
	uni.setStorage({
		key: 'theme',
		data: theme.value
	});
	
	
	onMounted(()=>{
		// uniapp的支付宝小程序存在bug，无法执行onLoad,所以使用onMounted
		console.log("u-page")
		uni.$on("theme", (data) => {
			theme.value = data
			uni.setStorage({
				key: 'theme',
				data: theme.value,
				success: () => {
					console.log('theme--success');
				}
			});
		})
	})
	
	
	// onLoad(() => {
		
	// 	// uniapp的支付宝小程序存在bug，无法执行onLoad
	// 	console.log("u-page")
		

	// 	uni.$on("theme", (data) => {
	// 		theme.value = data
	// 		uni.setStorage({
	// 			key: 'theme',
	// 			data: theme.value,
	// 			success: () => {
	// 				console.log('theme--success');
	// 			}
	// 		});
	// 	})
	// })
</script>


<style lang="scss">
	/* .nvue目前只能用@apply来实现 */
	.darkCss {
		@apply bg-white dark: bg-gray-800;
	}

	.themeWhiteCss {
		@apply bg-white;
	}
</style>
