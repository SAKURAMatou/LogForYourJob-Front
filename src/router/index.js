import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/login/Login.vue'
import loginRouter from './loginrouter/loginRouter.js'

var routes = []
routes=Array.prototype.concat(routes,loginRouter);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  // routes: [
  //   {
  //     path: '/',
  //     name: 'login',
  //     component: LoginView
  //   }
  //   // {
  //   //   path: '/about',
  //   //   name: 'about',
  //   //   // route level code-splitting
  //   //   // this generates a separate chunk (About.[hash].js) for this route
  //   //   // which is lazy-loaded when the route is visited.
  //   //   component: () => import('../views/AboutView.vue')
  //   // }
  // ]
})

export default router
