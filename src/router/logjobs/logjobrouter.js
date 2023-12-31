import { DL_ROUTER_PATH } from '@/CONST_VALUE.js'

const childrenRouter = [
    {
        //子路由拦截空时不能添加/；并且重定向的地址必须是全路径
        path: '',
        redirect:
            DL_ROUTER_PATH.main_view.main_root +
            '/' +
            DL_ROUTER_PATH.main_view.children.log_main
    },
    {
        path: DL_ROUTER_PATH.main_view.children.log_main,
        name: 'log_main',
        component: () =>
            import(
                '../../views/logJobs/logjobmain/mainrouterviews/LogFojobMainList.vue'
            ),
        meta: { tag: '找工作记录' }
    },
    {
        path: DL_ROUTER_PATH.main_view.children.setting,
        name: 'setting',
        component: () =>
            import('../../views/logJobs/logjobmain/UserSetting.vue'),
        meta: { tag: '用户设置', hideTotal: true }
    },
    {
        path: DL_ROUTER_PATH.main_view.children.job,
        name: 'job',
        component: () =>
            import(
                '../../views/logJobs/logjobmain/mainrouterviews/LogForJobSendList.vue'
            ),
        meta: { tag: '投递记录' }
    },
    {
        path: DL_ROUTER_PATH.main_view.children.interview,
        name: 'interview',
        component: () =>
            import(
                '../../views/logJobs/logjobmain/mainrouterviews/LogForJobInterview.vue'
            ),
        meta: { tag: '面经问答' }
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
