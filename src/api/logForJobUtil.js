import request from './axiosUtil.js'

/**
 * 获取主列表数据
 * @param {*} data
 * @returns
 */
export function getJobSearchMainList(data) {
    return request.post('/logforyourjobs/getmainlist', data)
}

/**
 * 获取的公司列表记录
 * @param {*} data
 * @returns
 */
export function getsendList(data) {
    return request.post('/logforyourjobs/getsendList', data)
}

/**
 * 删除公司投递记录
 * @param {*} data
 * @returns
 */
export function deleteSendLog(data) {
    var param = {
        guid: data
    }
    return request.post('/logforyourjobs/deleteSendLog', param)
}

/**
 * 获取投递的公司详情，传参记录guid
 * @param {*} data
 * @returns
 */
export function getSendLogDetail(data) {
    var param = {
        guid: data
    }
    return request.post('/logforyourjobs/getSendLogDetail', param)
}

/**
 * 修改投递记录信息
 * @param {*} data
 * @returns
 */
export function modifySendLog(data) {
    return request.post('/logforyourjobs/modifySendLog', data)
}

/**
 * 添加投递记录
 * @param {*} data
 * @returns
 */
export function addSendLog(data) {
    return request.post('/logforyourjobs/addSendLog', data)
}

/**
 * 新增找工作记录
 * @param {*} data
 * @returns
 */
export function addJobSearchLog(data) {
    return request.post('/logforyourjobs/addJobSearchLog', data)
}
/**
 * 办结找工作记录
 * @param {*} data
 * @returns
 */
export function finishJobSeachLog(data) {
    var param = {
        mguid: data
    }
    return request.post('/logforyourjobs/finishJobSeachLog', param)
}
