import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Gameplay from './views/Gameplay.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/gameplay',
      name: 'gameplay',
      component: Gameplay
    }
  ]
})
