import { DL_ROUTER_PATH } from '@/CONST_VALUE.js'

const childrenRouter = [
    {
        path: '/',
        redirect: DL_ROUTER_PATH.main_view.children.log_main
    },
    {
        path: DL_ROUTER_PATH.main_view.children.log_main,
        name: 'log_main',
        component: () =>
            import(
                '../../views/logJobs/logjobmain/mainrouterviews/LogFojobMainList.vue'
            )
    },
    {
        path: DL_ROUTER_PATH.main_view.children.setting,
        name: 'setting',
        component: () =>
            import('../../views/logJobs/logjobmain/UserSetting.vue')
    },
    {
        path: DL_ROUTER_PATH.main_view.children.job,
        name: 'job',
        component: () =>
            import(
                '../../views/logJobs/logjobmain/mainrouterviews/LogForJobSendList.vue'
            )
    }
]

const LogJobRouter = [
    {
        path: DL_ROUTER_PATH.main_view.main_root,
        name: 'main_root',
        component: () => import('../../views/logjobs/HomeView.vue'),
        children: childrenRouter
    }
]

export default LogJobRouter
