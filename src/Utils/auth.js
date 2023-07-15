//用户登录状态相关
import DL_CONST_VALUE from '@/CONST_VALUE.js'
const TOKEN_TIME = DL_CONST_VALUE.AUTH.TOKEN_TIME
const TOKEN_TIME_VALUE = DL_CONST_VALUE.AUTH.TOKEN_TIME_VALUE

const Auth = {
    setTokenTime: function (date) {
        return new Promise((resove) => {
            //设置token有效期：Date.now()
            if (date) {
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
    isOutAuth: function () {
        return new Promise((resove) => {
            let tokenTime = this.getTokenTime()
            let now = Date.now()
            // console.log(
            //     'isOutAuth',
            //     TOKEN_TIME_VALUE,
            //     'now:',
            //     now,
            //     'tokenTime:',
            //     tokenTime,
            //     'now - tokenTime:',
            //     now - tokenTime
            // )
            resove(now - tokenTime > TOKEN_TIME_VALUE)
        })
    }
}

export default Auth
