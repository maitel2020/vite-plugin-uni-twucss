import {
	defineConfig
} from "vite";
import uni from "@dcloudio/vite-plugin-uni";


import uniTwuCssPlugin from 'vite-plugin-uni-twucss';


export default defineConfig({

	plugins: [
		uni(),
		uniTwuCssPlugin({
			source: "tailwindcss"
		}),

	],
	css: {
		postcss: {
			plugins: [
				require('tailwindcss')(),
			]
		}
	}
})
