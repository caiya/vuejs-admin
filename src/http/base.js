/*
 * @Author: cnblogs.com/vipzhou
 * @Date: 2018-02-22 21:29:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-22 21:48:40
 */
import axios from 'axios'

import router from '../router'
import store from '../store'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/api/v1'

// 请求拦截器
axios.interceptors.request.use(config => {
  if (store.state.user.token) {   // TODO 判断token是否存在
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response
}, err => {
  console.error('统一出错打印', err)
  if (err.response) {
    switch (err.response.status) {
      case 401:
        // TODO 清除token信息
        router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
        break
      case 403:
        router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
        break
    }
  }
  return Promise.reject(err)
})

/**
 * @param  {string} url
 * @param  {object} params={}
 */
const fetch = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * @param  {string} url
 * @param  {object} data={}
 */
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * @param  {string} url
 * @param  {object} data={}
 */
const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * @param  {string} url
 * @param  {object} params={}
 */
const del = (url) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, {}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export { axios, fetch, post, put, del }