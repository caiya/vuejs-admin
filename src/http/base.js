import axios from 'axios'

import router from '../router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://192.168.20.131:7001/api/v1';

// 请求拦截器
axios.interceptors.request.use(config => {
  if (true) {   // TODO 判断token是否存在
    // config.headers.Authorization = `Bearer ${store.state.token}`
    config.headers.Authorization = `Bearer xxxx`
  }
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response
}, err => {
  console.error('222222222', err)
  if (err.response) {
    switch (err.response.status) {
      case 401:
        // TODO 清除token信息
        router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
        break;
      case 403:
        router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
        break;
    }
  }
  return Promise.reject(err)
})

export default axios