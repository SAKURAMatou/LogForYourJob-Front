import request from './axiosUtil.js'

/**
 * 获取主列表数据
 * @param {*} data
 * @returns
 */
export function getJobSearchMainList(data) {
    return request.post('/logforyourjobs/getmainlist', { params: data })
}

/**
 * 获取的公司列表记录
 * @param {*} data
 * @returns
 */
export function getsendList(data) {
    return request.post('/logforyourjobs/getsendList', { params: data })
}

/**
 * 删除公司投递记录
 * @param {*} data
 * @returns
 */
export function deleteSendLog(data) {
    return request.post('/logforyourjobs/deleteSendLog', { params: data })
}

/**
 * 获取投递的公司详情，传参记录guid
 * @param {*} data
 * @returns
 */
export function getSendLogDetail(data) {
    return request.post('/logforyourjobs/getSendLogDetail', { params: data })
}

/**
 * 修改投递记录信息
 * @param {*} data
 * @returns
 */
export function modifySendLog(data) {
    return request.post('/logforyourjobs/modifySendLog', { params: data })
}
