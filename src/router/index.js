import { createRouter, createWebHistory } from 'vue-router'
import loginRouter from './loginrouter/loginRouter.js'
import LogJobRouter from './logjobs/logjobrouter.js'

var routes = []
routes = Array.prototype.concat(routes, loginRouter)
routes = Array.prototype.concat(routes, LogJobRouter)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
