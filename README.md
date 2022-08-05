# 注意
1. 因HBuilderX自带的node版本太低，所以demo是无法直接运行起来的，需自行替换成最新的稳定版本node
2. 替换掉node后会不会有影响？暂时没有发现，能“运行”也能“发行”，云打包也没发现问题。

# 插件说明
1. 将tailwindcss、windicss、unocss编译后的css再次编译成支持uniapp中的小程序端和app-nvue
2. 【h5端、纯app-vue、百度小程序、支付宝小程序、钉钉小程序】不需要使用此插件也能支持tailwindcss、windicss、unocss，所以用了此插件也不会去编译它们
3. tailwindcss、windicss、unocss编译后的css在各端的展示上都有比较大的差别
4. 本开发人员主要用于需要暗黑模式、多主题的项目上，尽量使用简单写法，写法越怪，问题越多
5. vite-plugin-uni-twucss插件只起到皮毛作用（最好还是官方去适配），主要还是uniapp、tailwindcss、windicss、unocss它们之间先能编译成功且能编译出对应的css
6. 并未完全测试，h5=app-vue>小程序端>app-nvue

# 目前
1. 支持微信小程序、QQ小程序、app-nvue
2. 因uniapp编译机制的影响，app-nvue只支持@apply这种写法

# 后续
1. 支持更多小程序

# 安装
### Vite

``` javascript
	npm i  vite-plugin-uni-twucss
	or
	yarn add vite-plugin-uni-twucss
```

``` javascript
// vite.config.js
	import { defineConfig } from "vite";
	import uni from "@dcloudio/vite-plugin-uni";
	import uniTwuCssPlugin from 'vite-plugin-uni-twucss';
	import Unocss from 'unocss/vite'
	export default defineConfig({
	
		plugins: [
			uni(),
			Unocss(),
			//uniTwuCssPlugin需要放在最后执行
			uniTwuCssPlugin({
				source: "unocss"
			}),
		],
	})
	
```

|参数	|说明	|默认值	|可选值	|
|--		|--		|--		|--	|
|	source	|app-nvue时使用，修改对应的css		|	unocss	|windicss/tailwindcss	|