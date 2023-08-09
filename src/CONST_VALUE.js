//路由路径常量定义
const DL_ROUTER_PATH = {
    main_view: {
        main_root: '/logjobs',
        children: {
            log_main: 'main',
            job: 'jobsearch',
            setting: 'user/setting'
        }
    },
    login_view: {
        login: '/login/login',
        register: '/login/register'
    }
}
// 'https://mock.apifox.cn/m1/2980786-0-default'
const DL_CONST_VALUE = {
    axios: {
        baseURL: import.meta.env.VITE_BASE_SERVER_URL,
        timeout: 5000
    },
    AUTH: {
        TOKEN_TIME: 'tokenTime',
        TOKEN_TIME_VALUE: 60 * 60 * 1000
    },
    WHITE_LIST: ['/user/login', '/user/register']
}

export { DL_ROUTER_PATH }
export default DL_CONST_VALUE
