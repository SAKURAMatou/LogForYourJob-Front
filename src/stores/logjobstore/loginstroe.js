import { DL_ROUTER_PATH } from '@/CONST_VALUE.js'
import { defineStore } from 'pinia'
import router from '@/router'
import { userLogin } from '@/api/loginUtil.js'
import Auth from '@/Utils/auth.js'

export const LoginStore = defineStore('LoginStore', {
    state: () => ({
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || '',
        useremail: localStorage.getItem('email') || '',
        avatarurl:
            localStorage.getItem('avatarurl') ||
            '/src/assets/imgs/defaultavatar.svg'
    }),
    getters: {
        getUserInfo(state) {
            return {
                username: state.username,
                useremail: state.useremail,
                token: state.token,
                avatarurl: state.avatarurl
            }
        }
    },
    actions: {
        /**
         * Login function.
         *
         * @return {Promise} A promise that resolves when the login is successful.
         */
        login(userinfo) {
            return new Promise((resolve) => {
                userLogin(userinfo).then((res) => {
                    Auth.setTokenTime(Date.now()).then(() => {
                        console.log('login', res)
                        if (res.data.state.code === 200) {
                            this.setUserInfo(res.data.custom)
                            //设置用户登录有效期等信息
                            router.push(DL_ROUTER_PATH.main_view.main)
                            resolve()
                        } else {
                        }
                    })
                })
            })
        },
        logout() {
            return new Promise((resolve) => {
                //重置state
                this.$reset()
                //清空浏览器本地存储信息
                localStorage.clear()
                //路由跳转根路径
                router.push('/')
                //TODO
                resolve()
            })
        },
        setUserInfo(userInfo) {
            this.username = userInfo.username
            this.token = userInfo.token
            this.avatarurl = userInfo.avatarurl
            this.useremail = userInfo.useremail
            localStorage.setItem('username', userInfo.username)
            localStorage.setItem('token', userInfo.token)
            localStorage.setItem('email', userInfo.useremail)
            localStorage.setItem('avatarurl', userInfo.avatarurl)
        }
    }
})
