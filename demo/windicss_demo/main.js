import App from './App'



// #ifdef VUE3




import 'virtual:windi.css'



import {
	createSSRApp
} from 'vue'

	// import uPage from '@/components/u-page/u-page.vue'; 

export function createApp() {
	
	
	const app = createSSRApp(App)
	
	// 这方法在uniapp的有些版本中，.nvue存在bug,推荐使用easycom
	// app.component('u-page', uPage)
	
	
	
	return {
		app
	}
}
// #endif
