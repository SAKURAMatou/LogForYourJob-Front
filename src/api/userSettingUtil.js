import request from './axiosUtil.js'
/**
 * 获取当前用户信息
 * @returns
 */
export function getUserInfo() {
    return request.get('/usersetting/detail')
}

/**
 * 用户基本信息修改
 * @param {*} data
 * @returns
 */
export function userBaseInfoChange(data) {
    return request.post('/usersetting/change/userBaseInfo', data)
}

/**
 * 用户密码修改
 * @param {*} data
 * @returns
 */
export function userPwdChange(data) {
    return request.post('/usersetting/change/password', data)
}
export function userPhoneChange(data) {
    return request.post('/usersetting/change/phone', data)
}

export function userAvatarChange(file){
    let fd=new FormData();
    fd.append('file',file.file);
    fd.append("file_name",file.name)
    return request.post('/usersetting/change/avatar')
}
