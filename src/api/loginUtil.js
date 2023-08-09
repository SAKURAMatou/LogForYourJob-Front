import request from './axiosUtil.js'

export async function userLogin(user) {
    // console.log("请求登陆", 'DLUtils.request.post("url",user)', request, user)
    return await request.post('/user/login', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export function userLogOut() {
    return request.post('/user/logout', user)
}
export function userRegister(user) {
    return request.post('/user/register', user)
}
