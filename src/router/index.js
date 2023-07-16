import { createRouter, createWebHistory } from 'vue-router'
import loginRouter from './loginrouter/loginRouter.js'
import LogJobRouter from './logjobs/logjobrouter.js'
import { DL_ROUTER_PATH } from '@/CONST_VALUE.js'

import { LoginStore } from '@/stores/logjobstore/loginstroe.js'

var routes = []
routes = Array.prototype.concat(routes, loginRouter)
routes = Array.prototype.concat(routes, LogJobRouter)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const loginStore = LoginStore()
    if (loginStore.token) {
        //用户登录的状态，去登录页的话直接跳转logjobs路由
        if (
            to.path === DL_ROUTER_PATH.login_view.login ||
            to.path === DL_ROUTER_PATH.login_view.register
        ) {
            next({ path: DL_ROUTER_PATH.main_view.main_root })
        }
    } else {
        //没有token的时候如果是登陆，注册等操作则继续
        for (let key in DL_ROUTER_PATH.login_view) {
            if (to.path === DL_ROUTER_PATH.login_view[key]) {
                next()
                break
            }
        }
        //否则跳转登陆页
        next(DL_ROUTER_PATH.login_view.login)
    }
    // console.log(to, from)
    next()
})

export default router
