// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const LoginStore = defineStore('LoginStore', {
  state: () => ({
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || ''
  }),
  getters: {},
  actions: {
    /**
     * Login function.
     *
     * @return {Promise} A promise that resolves when the login is successful.
     */
    login(userinfo) {
      return new Promise((resolve) => {
        console.log('login', userinfo)
        userinfo.token = '123456798'
        this.setUserInfo(userinfo)
        router.push('/logjobs/main')
        //TODO
        resolve()
      })
    },
    logout() {
      return new Promise((resolve) => {
        //TODO
        resolve()
      })
    },
    setUserInfo(userInfo) {
      this.username = userInfo.name
      this.token = userInfo.token
      localStorage.setItem('username', userInfo.name)
      localStorage.setItem('token', userInfo.token)
    }
  }
})
