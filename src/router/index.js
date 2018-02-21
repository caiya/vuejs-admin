import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/views/auth/Login'], resolve)
    },
    {
      path: '/main',
      name: 'Main',
      component: resolve => require(['@/views/Main'], resolve),
      children: [{
        path: 'user',
        component: resolve => require(['@/views/user/List'], resolve),
        name: 'UserList'
      }, {
        path: 'user/setting',
        name: 'Setting',
        component: resolve => require(['@/views/user/Setting'], resolve),
      }]
    }
  ]
})
