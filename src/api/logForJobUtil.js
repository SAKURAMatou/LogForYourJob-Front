import request from './axiosUtil.js'

export function getDataTest() {
    return request.post('/logforyourjobs/getdatatest')
}