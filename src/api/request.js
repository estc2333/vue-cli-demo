import axios from 'axios'

// axios.defaults.baseURL = '/api/' 全局配置

// 实例配置
const config = {
    baseURL: 'http://localhost:9000/api', // 请求域名，基本地址
    timeout: 3000,
    headers: '' // 请求头，带token传给后端
}

const request = axios.create(config)

request.interceptors.request.use(config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
request.interceptors.response.use(res => {
        return res
    },
    error => {
    // 根据http状态码统一处理响应错误
        if(error.response.status === 401) {
            // 跳转页面或者弹窗提示
        }
        return Promise.reject(error)
    }
)
export default request
