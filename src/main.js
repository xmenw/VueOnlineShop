import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import axios from "axios";
Vue.prototype.$axios = axios;


// router.onError((error) => {
// 	const pattern = /Loading chunk (\d)+ failed/g;
// 	const isChunkLoadFailed = error.message.match(pattern);
// 	const targetPath = router.history.pending.fullPath;
// 	if (isChunkLoadFailed) {
// 		router.replace(targetPath);
// 	}
// });

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')