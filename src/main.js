// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { axios } from './http/base'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/fonts/iconfont.css'

import store from './store'

Vue.use(ElementUI)

// 引入mqtt
import './mq'

Vue.config.productionTip = false

// 挂载到prototype上面，确保组件中可以直接使用this.axios
// Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
