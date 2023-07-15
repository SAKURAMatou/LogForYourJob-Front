const DL_CONST_VALUE = {
    axios: {
        baseURL: 'https://mock.apifox.cn/m1/2980786-0-default',
        timeout: 5000
    },
    AUTH: {
        TOKEN_TIME: 'tokenTime',
        TOKEN_TIME_VALUE: 2 * 60 * 60 * 1000
    }
}
//路由路径常量定义
const DL_ROUTER_PATH = {
    main_view: {
        main: '/logjobs/main'
    },
    login_view: {
        login: '/login/login',
        register: '/login/register'
    }
}
export { DL_ROUTER_PATH }
export default DL_CONST_VALUE
