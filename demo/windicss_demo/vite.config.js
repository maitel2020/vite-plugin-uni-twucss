import {
	defineConfig
} from "vite";
import uni from "@dcloudio/vite-plugin-uni";


import uniTwuCssPlugin from 'vite-plugin-uni-twucss';


import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({

	plugins: [
		uni(),
		WindiCSS(),
		uniTwuCssPlugin({
			source: "windicss"
		}),

	],

})
