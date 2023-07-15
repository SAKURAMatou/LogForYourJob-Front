import axios from 'axios'
import CONST_VALUE from '@/CONST_VALUE.js'

//创建axios实例
const request = axios.create({
  baseURL: CONST_VALUE.axios.baseURL,
  timeout: 5000
})


export default request;