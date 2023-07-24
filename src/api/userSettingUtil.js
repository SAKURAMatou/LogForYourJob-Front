import request from './axiosUtil.js'

export function getUserInfo() {
    return request.post('/usersetting/getUserInfo')
}
