import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/auth/Login'
import Main from '@/views/Main'
import Test from '@/views/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]
})
