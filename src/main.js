// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import scroll from 'vue-seamless-scroll'
import echarts from 'echarts'
import { Api } from '@/api/index.js'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.$api = Api

Vue.prototype.$echarts = echarts
Vue.use(scroll)
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
