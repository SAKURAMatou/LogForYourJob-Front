import { DL_ROUTER_PATH } from '@/CONST_VALUE.js'

const LogJobRouter = [
    {
        path: DL_ROUTER_PATH.main_view.main,
        name: 'main',
        component: () => import('../../views/logjobs/HomeView.vue')
    },
    {
        path: DL_ROUTER_PATH.main_view.job,
        name: 'job',
        component: () =>
            import(
                '../../views/logJobs/logjobmain/mainrouterviews/LogFojobMainList.vue'
            )
    },
    {
        path: DL_ROUTER_PATH.main_view.setting,
        name: 'setting',
        component: () =>
            import('../../views/logJobs/logjobmain/UserSetting.vue')
    }
]

export default LogJobRouter
