<template>
	<u-page>
		<view class="content">
			<button class="test-icon common"  />
			<button class="mt-[20rpx]">
				<text class="common">光亮/暗黑</text>
			</button>
			<text class="common title">{{title}}</text>
			<button class="test1"><text class="common">test1</text></button>
			<button class="test2"><text class="common">test2</text></button>
			<text class="test3">test3</text>
			<text class="test4">test4</text>
			<text class="test5">test5</text>
			<text :class="'test6'">test6</text>
			<text class="test7">test7</text>
			<text class="test8">test8</text>
			<button class="test9">
				<text font="mono light" text="sm white">test9</text>
			</button>
			<text class="test10">test10</text>
			<button rounded-20rpx rounded><text class="test11">test11</text></button>

			<button class="btn btn--secondary"><text class="btn--secondary--text">test12</text></button>
			<button class="btn btn--primary"><text class="btn--primary--text">test13</text></button>

		</view>
		<button class="test14">
			test14
		</button>
		<text :class="[test?'test15-1':'test15-2']">test15</text>
		<view class="test21">test21</view>
		<text class="test22">23</text>

	</u-page>
</template>

<script setup>
	import {
		ref
	} from "vue"




	let title = ref("Hello")
	let test = ref(true)
	
</script>




<style>
	.common{
		@apply text-red-400 dark:text-green-400
	}
	.test-icon {
		@apply i-carbon-sun dark:i-carbon-moon  m-50rpx
	}

	.test1 {
		@apply bg-hex-b2a8bb m-50rpx;
	}

	.test2 {
		@apply bg-hex-b2a8bb;
	}

	.test3 {
		@apply grid-cols-[auto,1fr,30px];
	}

	/* unocss存在bug */
	/* .test4 {
		@apply  animate-ping animate-count-infinite animate-1s;
	}

	.test5 {
		@apply text-32rpx fw100 animate-bounce-alt animate-count-infinite animate-1s;
	} */
	/* unocss存在bug */
	.test6 {
		@apply text-red-400;
	}

	.test7 {
		@apply bg-white dark:hover:bg-blue-800 dark:hover:font-medium dark:hover:text-white text-blue;
	}

	.test8 {
		@apply p-1 md: p-2 <lg:p-3 text-red-400 text-green-300;
	}

	.test9 {
		@apply bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600" p="y-20px x-40px" border="10 rounded blue-200";
	}

	.test10 {
		@apply btn btn-green hover:btn-green border="rounded-200px"
	}


	.test11 {
		@apply text-red-400 dark:text-blue-400
	}

	.test14 {
		@apply w-bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"w-text="sm white"w-font="mono light"
		w-p="y-2 x-4"w-border="2 rounded blue-200"w-rounded="50rpx"
	}


	

	.test15-2 {
		@apply text-[#ff0000] dark:text-[#00aaff]
	}

	

	.test21 {
		@apply bg-opacity-[0.51] flex items-center justify-center h-[100px] w-[100px] rounded-[40px] bg-[#123456] bg-opacity-[0.54] text-[#ffffff]
	}


	.test22 {
		@apply  !text-blue text-red
	}


	.btn {
		@apply rounded-20rpx p-10rpx;
	}

	.btn--primary {
		@apply bg-rose-500;
	}

	.btn--primary--text {
		@apply text-yellow dark:text-white;
	}

	.btn--secondary {
		@apply bg-gray-100;
	}

	.btn--secondary--text {
		@apply text-yellow dark:text-blue;
	}

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
