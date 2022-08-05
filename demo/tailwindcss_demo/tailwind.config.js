
console.log("看看是否有经过这文件，没经过这里说明要改tailwindcss源代码路径")
module.exports = {
	darkMode: 'class',
	content: [
		__dirname+"/pages/**/*.{nvue,vue}",
		__dirname+"/components/**/*.{nvue,vue}",
	],
	theme: {
		extend: {},
	},
	plugins: [],

}
