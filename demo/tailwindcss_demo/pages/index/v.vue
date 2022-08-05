<template>
	<u-page>
		<view class="content ">
			<button class="i-carbon-sun dark:i-carbon-moon text-red-400 dark:text-green-400 !m-50rpx"
				 />
			<button  class="mt-[20rpx]">
				<text class="text-red-400 dark:text-green-400">光亮/暗黑</text>
			</button>
			<text class="title text-red-400 dark:text-green-400">{{title}}</text>
			<button class="bg-hex-b2a8bb m-50rpx"><text class="text-red-400 dark:text-green-400 ">test1</text></button>
			<button class="bg-[hsl(211.7,81.9%,69.6%)]"><text
					class="text-red-400 dark:text-green-400">test2</text></button>
			<text class="grid-cols-[auto,1fr,30px] text-red-400 dark:text-green-400">test3</text>
			<text
				class="text-red-400 dark:text-green-400   animate-ping animate-count-infinite animate-1s ">test4</text>
			<text class="text-32 fw100 animate-bounce-alt animate-count-infinite animate-1s">test5</text>
			<button
				class="transition animate-spin ease-in-out focus:outline-none w-full py-3 rounded font-bold text-white bg-blue-400 ring-4 ring-blue-500 ring-opacity-50 cursor-pointer transform hover:scale-110 hover:-translate-y-1">
				Click me
			</button>

			<button
				class="transition animate-pulse ease-in-out focus:outline-none w-full py-3 rounded font-bold text-white bg-blue-400 ring-4 ring-blue-500 ring-opacity-50 cursor-pointer transform hover:scale-110 hover:-translate-y-1">
				Click me
			</button>

			<view class="w-full h-32 text-white text-4xl text-center perspect-650 perspect-origin-[150%_150%]">
				<view class="w-full h-full backface-visible preserve-3d">
					<view
						class="absolute flex items-center justify-center w-24 h-24 bg-black bg-opacity-30 transform translate-z-12">
						1</view>
					<view
						class="absolute flex items-center justify-center w-24 h-24 bg-green-500 bg-opacity-70 transform rotate-y-180 translate-z-12">
						2</view>
					<view
						class="absolute flex items-center justify-center w-24 h-24 bg-red-500 bg-opacity-70 transform rotate-y-90 translate-z-12">
						3</view>
					<view
						class="absolute flex items-center justify-center w-24 h-24 bg-blue-500 bg-opacity-70 transform -rotate-y-90 translate-z-12">
						4</view>
					<view
						class="absolute flex items-center justify-center w-24 h-24 bg-yellow-500 bg-opacity-70 transform rotate-x-90 translate-z-12">
						5</view>
					<view
						class="absolute flex items-center justify-center w-24 h-24 bg-pink-500 bg-opacity-70 transform -rotate-x-90 translate-z-12">
						6</view>
				</view>
			</view>

			<button
				class="transition-all !duration-300 focus:outline-none w-full py-3 rounded font-bold text-white bg-blue-400 ring-4 ring-blue-500 ring-opacity-50 cursor-pointer hover:bg-indigo-400 hover:ring-indigo-500 transform hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:opacity-80 shadow-indigo-500">
				Hover me
			</button>

			<text :class="'text-red-400'">test6</text>
			<text
				class="bg-white dark:hover:bg-blue-800 dark:hover:font-medium dark:hover:text-white text-blue">test7</text>
			<text class="p-1 md:p-2 <lg:p-3    text-red-400 text-green-300">test8</text>

			<button bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600" p="y-20rpx x-40rpx"
				border="10 rounded blue-200">
				<text font="mono light" text="sm white">test9</text>
			</button>
			<text class="btn btn-green hover:btn-green" border="rounded-20rpx">test10</text>
			<button rounded-20rpx rounded><text text-red-400 dark:text-blue-400>test11</text></button>
		</view>

		<button w-bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600" w-text="sm white" w-font="mono light"
			w-p="y-2 x-4" w-border="2 rounded blue-200" w-rounded="50rpx">
			test14
		</button>

		<text :class="[testRef?'text-red-400 dark:text-green-400':'text-[#ff0000] dark:text-[#00aaff] ']">test15</text>
		<view class="border-[10px] border-[#098765] border-solid border-opacity-[0.44]">test22</view>
		<text class="!text-blue text-red">23</text>


		<view h-full text-center flex select-none all:transition-400>
			<view ma>
				<view text-5xl fw100 animate-bounce-alt animate-count-infinite animate-1s>
					unocss
				</view>
				<view op30 text-lg fw300 m1>
					The instant on-demand Atomic CSS engine.
				</view>
				<view m2 flex justify-center text-2xl op30 hover="op80">
					<a i-carbon-logo-github text-inherit href="https://github.com/unocss/unocss" target="_blank"></a>
				</view>
			</view>
		</view>
		<view class="btn" absolute bottom-5 right-0 left-0 text-center op30 fw300>
			on-demand · instant · fully customizable
		</view>


	</u-page>
</template>


<script setup>
	import {
		ref
	} from "vue"

	let title = ref("Hello")
	let testRef = ref(false)
	
</script>








<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}


	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
