// 进行axios二次封装：使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 第一步：利用axios对象的create方法，去创建axios实例(其他配置：基础配置，超时时间)
let request = axios.create({
  // 基础路径
  //   baseURL: import.meta.env.VITE_APP_BASE_API, // 基础url带/api
  baseURL: '/api',
  timeout: 5000, // 设置超时时间
})

// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  return config;
})

// 第三步：响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    return response.data
  },
  (error) => {
    // 失败回调：处理网络错误
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'token已过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '无网络'
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
