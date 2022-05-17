<template>
	<view :class="{dark:isDark}" >
		<view class="darkCss dark:text-gray-100 dark:bg-gray-800">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"

	import {
		onLoad
	} from "@dcloudio/uni-app";

	let isDark = ref(true)
	let value = uni.getStorageSync('isDark');
	
	if(value ===""){
		value = isDark.value
	}
	
	isDark.value = value
	
	
	
	uni.setStorage({
		key: 'isDark',
		data: isDark.value
	});

	onLoad(() => {
		console.log("u-page")
		uni.$on("isDark", (data) => {
			isDark.value = data
			uni.setStorage({
				key: 'isDark',
				data: isDark.value,
				success: () => {
					console.log('isDark--success');
				}
			});
		})
	})

	defineExpose({
		isDark
	})
</script>


<style scoped>
	.darkCss {
		@apply dark:text-gray-100 dark:bg-gray-800;
	}
</style>
