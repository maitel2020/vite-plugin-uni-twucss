import App from './App'



// #ifdef VUE3


import 'uno.css';
// import 'virtual:windi.css'

// import '@/index.css'




import {
	createSSRApp
} from 'vue'

export function createApp() {
	
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
