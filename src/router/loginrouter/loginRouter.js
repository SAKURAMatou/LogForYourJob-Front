import { DL_ROUTER_PATH } from '@/CONST_VALUE.js'

const loginRouter = [
    {
        path: '/',
        redirect: DL_ROUTER_PATH.login_view.login
    },
    {
        path: DL_ROUTER_PATH.login_view.login,
        name: 'login',
        component: () => import('../../views/login/Login.vue')
    },
    {
        path: DL_ROUTER_PATH.login_view.register,
        name: 'register',
        component: () => import('../../views/login/Register.vue')
    }
]

export default loginRouter
