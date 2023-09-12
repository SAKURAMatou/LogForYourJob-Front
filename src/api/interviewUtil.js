import request from './axiosUtil.js'
export function getInterviewQuestions(data) {
    return request.post('/interview/question/list', data)
}

export function addInterviewQuestion(data) {
    return request.post('/interview/question/add', data)
}