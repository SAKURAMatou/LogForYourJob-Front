import request from './axiosUtil.js'

export function getDataTest() {
    return request.post('/logforyourjobs/getdatatest')
}
export function getJobSearchMainList(data) {
    return request.post('/logforyourjobs/getmainlist', { params: data })
}

export function getsendList(data){
    return request.post('/logforyourjobs/getsendList', { params: data })
}