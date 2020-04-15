import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@babel/polyfill'
Vue.config.productionTip = false
import VueCompositionApi from '@vue/composition-api'
import echarts from 'echarts'
import axios from 'axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(VueCompositionApi)
Vue.use(Antd)
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
