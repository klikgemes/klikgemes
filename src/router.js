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
<<<<<<< HEAD
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue')
    },
    {
=======
>>>>>>> 86d8120d83f1c612b408f589d048b69a7d68ebd3
      path: '/gameplay',
      name: 'gameplay',
      component: Gameplay
    }
  ]
})
