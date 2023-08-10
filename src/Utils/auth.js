//用户登录状态相关
import DL_CONST_VALUE from '@/CONST_VALUE.js'
const TOKEN_TIME = DL_CONST_VALUE.AUTH.TOKEN_TIME
const TOKEN_TIME_VALUE = DL_CONST_VALUE.AUTH.TOKEN_TIME_VALUE

const Auth = {
    setTokenTime: function (date) {
        return new Promise((resove) => {
            //设置token有效期：Date.now()
            if (!date) {
                localStorage.setItem(TOKEN_TIME, Date.now())
            } else {
                localStorage.setItem(TOKEN_TIME, date)
            }
            resove()
        })
    },
    getTokenTime: function () {
        //获取token有效期
        return localStorage.getItem(TOKEN_TIME)
    },
    /**
     * 当前时间和token记录时间之间的差大于配置的失效时间则登录失效；返回false表未失效
     * @returns {Promise}
     */
    isOutAuth: function () {
        return new Promise((resove, reject) => {
            let tokenTime = this.getTokenTime()
            let now = Date.now()
            //
            if (!tokenTime) {
                resove()
            }
            if (now - tokenTime > TOKEN_TIME_VALUE) {
                reject()
            } else {
                resove()
            }
        })
    }
}

export default Auth
