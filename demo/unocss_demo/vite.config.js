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
		uniTwuCssPlugin({
			source: "unocss"
		}),

	]
})
