// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { userLogin } from '@/api/loginUtil.js'

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
                    console.log('login', res)
                    if (res.data.state.code === 200) {
                        this.setUserInfo(res.data.custom)
                        //设置用户登录有效期等信息
                        router.push('/logjobs/main')
                    } else {
                    }
                })
                resolve()
            })
        },
        logout() {
            return new Promise((resolve) => {
                this.username = ''
                this.token = ''
                localStorage.clear()
                //TODO
                resolve()
            })
        },
        setUserInfo(userInfo) {
            this.username = userInfo.username
            this.token = userInfo.token
            localStorage.setItem('username', userInfo.username)
            localStorage.setItem('token', userInfo.token)
            localStorage.setItem('email', userInfo.useremail)
        }
    }
})
