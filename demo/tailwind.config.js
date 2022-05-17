
console.log("看看是否有经过这里")
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
