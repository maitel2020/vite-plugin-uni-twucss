<template>
	<u-page ref="uPageRef">
		<view class="content">
			<image class="logo" src="/static/logo.png" />
			<text
				class="text-red-400 dark:text-green-400 m-10rpx p-l-20rpx p-r-20rpx themeCss">推荐使用unocss、windicss,demo基于unocss模式写的，所以效果会有差异</text>
			<text
				class="text-red-400 dark:text-green-400 m-10rpx p-l-20rpx p-r-20rpx themeCss">vite-plugin-uni-twucss主要用于app中的.nvue页面和小程序端，</text>
			<text
				class="text-red-400 dark:text-green-400 m-10rpx p-l-20rpx p-r-20rpx themeCss">即使所有页面都是.nvue，也不要勾选【纯nvue项目】，因为连tailwindcss、windicss、unocss这一关都过不了</text>
			<text
				class="text-red-400 dark:text-green-400 m-10rpx p-l-20rpx p-r-20rpx themeCss">纯H5和纯app-vue不需要用此插件，因为都能支持tailwindcss、windicss、unocss</text>
			<text
				class="text-red-400 dark:text-green-400 m-10rpx p-l-20rpx p-r-20rpx themeCss">有些格式化工具会把style里的特殊符合格式成错误格式，如把dark:text-green-400会格式成dark:
				text-green-400，dark:和text-green-400被分开了</text>
		
			<button class="i-carbon-sun dark:i-carbon-moon text-red-400 dark:text-green-400 !m-50rpx"
				@click="handleClickTheme('dark')" />

			<button @click="handleClickTheme('dark')" class="mt-[20rpx]">
				<text class="text-red-400 dark:text-green-400">光亮/暗黑</text>
			</button>
			<button @click="handleClickTheme" class="mt-[20rpx]">
				<text class="text-red-400 dark:text-green-400">多皮肤切换</text>
			</button>
			<navigator url="/pages/index/n" class="mt-[20rpx]">
				<button>
					<text class="text-red-400 dark:text-green-400 mt-[20rpx]">.nvue页面</text>
				</button>
			</navigator>
			<navigator url="/pages/index/n_apply" class="mt-[20rpx]">
				<button>
					<text class="text-red-400 dark:text-green-400">nvue页面使用@apply</text>
				</button>
			</navigator>
			<navigator url="/pages/index/v" class="mt-[20rpx]">
				<button>
					<text class="text-red-400 dark:text-green-400">.vue页面</text>
				</button>
			</navigator>
			<navigator url="/pages/index/v_apply" class="mt-[20rpx]">
				<button>
					<text class="text-red-400 dark:text-green-400">vue页面使用@apply</text>
				</button>
			</navigator>
		</view>
	</u-page>
</template>


<script setup>
	import {
		ref
	} from "vue"
	


	let uPageRef = ref(null)
	let count = ref(0)


	const handleClickTheme = (data) => {
		if (data === 'dark') {
			if (count.value !== 1) {
				count.value = 1
			} else if (count.value === 1) {
				count.value = 0
			}
		} else {
			count.value++
			if (count.value > 4) {
				count.value = 0
			}
		}
		uni.$emit("theme", count.value)
	}
</script>




<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
</style>
