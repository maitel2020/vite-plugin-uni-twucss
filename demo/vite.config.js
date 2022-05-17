import {
	defineConfig
} from "vite";
import uni from "@dcloudio/vite-plugin-uni";


import uniTwuCssPlugin from 'vite-plugin-uni-twucss';

import Unocss from 'unocss/vite'
import {
	presetAttributify,
	presetUno,
	transformerDirectives,
	presetIcons
}
from 'unocss'

// import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({

	plugins: [
		uni(),
		Unocss({
			include: [/\.(nvue|vue)$/],
			transformers: [
				transformerDirectives(),
			],
			presets: [
				presetAttributify({
					prefix: 'w-'
				}),
				presetUno(),
				presetIcons({
					collections: {
						custom: {
							circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
						}
					},
				})
			],
		}),
		// WindiCSS(),
		uniTwuCssPlugin({
			source: "unocss"
		}),

	],
	// css: {
	// 	postcss: {
	// 		plugins: [
	// 			require('tailwindcss')(),
	// 		]
	// 	}
	// }
})
