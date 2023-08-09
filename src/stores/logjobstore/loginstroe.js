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
        },
        stateReset(state) {
            return new Promise((resolve) => {
                //清空浏览器本地存储信息；先请浏览器的本地存储，再重置pinia，否则pinia还能获取到信息
                localStorage.clear()
                state.$reset()
                resolve()
            })
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
                let startlogin = Date.now()
                // console.log('login', startlogin)
                userLogin(userinfo).then((res) => {
                    if (res.state.code === '200') {
                        Auth.setTokenTime(Date.now()).then(() => {
                            // console.log('login', res)
                            this.setUserInfo(res.custom)
                            //设置用户登录有效期等信息
                            router.push(DL_ROUTER_PATH.main_view.main_root)
                            console.log(
                                'login-开始跳转',
                                Date.now() - startlogin
                            )
                            resolve('登陆成功！')
                        })
                    } else {
                        resolve(res.state.msg)
                    }
                })
            })
        },
        logout() {
            return new Promise((resolve) => {
                console.log('logout')
                //重置state
                this.stateReset.then(() => {
                    // 登陆信息清空之后跳转
                    console.log('after reset', this.getUserInfo, localStorage)
                    //路由跳转根路径
                    router.push('/')
                    //TODO
                    resolve()
                })
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
