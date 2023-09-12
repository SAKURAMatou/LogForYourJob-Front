import request from './axiosUtil.js'
export function getInterviewQuestions(data) {
    return request.post('/interview/question/list', data)
}

export function addInterviewQuestion(data) {
    return request.post('/interview/question/add', data)
}

export function deleteInterviewQuestion(guid) {
    return request.post('/interview/question/delete', { questionguid: guid })
}

export function getQuestionByGuid(guid) {
    return request.get(`/interview/question/detail/${guid}`)
}

export function modifyQuestion(data) {
    return request.post('/interview/question/modifty', data)
}
export function updateViewTimes(guid) {
    return request.post('/interview/question/updateViewTimes', {
        questionguid: guid
    })
}
