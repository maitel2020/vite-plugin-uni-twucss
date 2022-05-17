import {
	defineConfig
} from 'windicss/helpers'

export default defineConfig({
	extract: {
		include: ['pages/**/*.{nvue,vue}']
	},
	attributify: {
		prefix: 'w-',
	},
	shortcuts: {
		// shortcuts to multiple utilities
		'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
		'btn-green': 'text-white bg-green-500 hover:bg-green-700',
		// single utility alias
		'red': 'text-red-400'
	},
})
