import axios from 'axios'
import CONST_VALUE from '@/CONST_VALUE.js'
import { LoginStore } from '@/stores/logjobstore/loginstroe.js'
import router from '@/router'
import Auth from '@/Utils/auth.js'
import { ElMessageBox, ElMessage } from 'element-plus'

const proxyPre = import.meta.env.VITE_PROXY_PRE
//创建axios实例
const request = axios.create({
    baseURL: proxyPre,
    // baseURL:'/dmlapi',
    timeout: 5000
})

request.interceptors.request.use((config) => {
    //当前的请求在白名单内直接进行请求
    if (isUrlInWhiteList(config.url)) {
        return config
    }
    const loginStore = LoginStore()
    //不在白名单内则设置请求头token
    if (loginStore.token) {
        //当前用户已经登录的话，判断登录是否失效
        return Auth.isOutAuth().then(
            () => {
                config.headers.Authorization = 'Bearer ' + loginStore.token
                return config
            },
            () => {
                ElMessageBox.alert('登录已经过期，请重新登录', '提醒', {
                    confirmButtonText: 'OK',
                    callback: function () {
                        //执行退出操作并跳转登录页面
                        loginStore.logout()
                    }
                })
            }
        )
    } else {
        router.push('/')
    }
})

request.interceptors.response.use(
    (response) => {
        const loginStore = LoginStore()
        // console.log(response.headers)
        if (response.headers.token) {
            loginStore.setToken(response.headers.token)
            Auth.setTokenTime()
        }
        return response.data
    },
    (error) => {
        const loginStore = LoginStore()
        if (
            error.code === 'ECONNABORTED' &&
            error.message.includes('timeout')
        ) {
            ElMessage.error('请求超时，请稍后再试！' + error.message)
        }
        if (error.response.status == 500) {
            ElMessage.error('服务端异常！' + error.message)
        }
        if (error.response.status == 401) {
            ElMessageBox.alert('登录已经过期，请重新登录', '提醒', {
                confirmButtonText: 'OK',
                callback: function () {
                    //执行退出操作并跳转登录页面
                    loginStore.logout()
                }
            })
        }
        // console.log('response error', error)

        return Promise.reject(error)
    }
)
function isUrlInWhiteList(url) {
    return CONST_VALUE.WHITE_LIST.includes(
        url.replace(import.meta.env.VITE_PROXY_PRE, '')
    )
}

export default request
