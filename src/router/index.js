import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/views/auth/Login'], resolve)
    },
    {
      path: '',   // 默认地址为登录页
      name: '',
      component: resolve => require(['@/views/auth/Login'], resolve)
    },
    {
      path: '/main',
      name: 'Main',
      component: resolve => require(['@/views/Main'], resolve),
      meta: {
        requireAuth: true,    // 添加该字段，表示进入这个路由是需要登录的
        nav: '欢迎页'
      },
      children: [{
        path: 'user',
        component: resolve => require(['@/views/user/List'], resolve),
        name: 'UserList',
        meta: {
          requireAuth: true,
          nav: '用户管理'
        },
      }, {
        path: 'user/setting/:userId?',
        name: 'UserSetting',
        component: resolve => require(['@/views/user/Setting'], resolve),
        meta: {
          requireAuth: true,
          nav: '资料设置'
        },
      }, {
        path: 'device',
        component: resolve => require(['@/views/device/List'], resolve),
        name: 'Device',
        meta: {
          requireAuth: true,
          nav: '设备列表'
        },
      },{
        path: 'device/add',
        component: resolve => require(['@/views/device/Add'], resolve),
        name: 'Device',
        meta: {
          requireAuth: true,
          nav: '设备新增'
        },
      }, {
        path: '',   // 后台首页默认页
        component: resolve => require(['@/views/common/Welcome'], resolve),
        name: 'Welcome',
        meta: {
          requireAuth: true,
          nav: '欢迎页'
        },
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {    // 如果需要拦截
    if (store.state.user.token) {
      next()
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router