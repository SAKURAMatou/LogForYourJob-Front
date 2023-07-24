import request from './axiosUtil.js'
/**
 * 获取当前用户信息
 * @returns
 */
export function getUserInfo() {
    return request.post('/usersetting/getUserInfo')
}

/**
 * 用户基本信息修改
 * @param {*} data
 * @returns
 */
export function userBaseInfoChange(data) {
    return request.post('/usersetting/userBaseInfoChange', { param: data })
}

/**
 * 用户密码修改
 * @param {*} data
 * @returns
 */
export function userPwdChange(data) {
    return request.post('/usersetting/userPwdChange', { param: data })
}
