import axios from 'axios'

// axios.defaults.baseURL = '/api/' 全局配置

// 实例配置
const config = {
    baseURL: 'http://localhost:8080/', // 请求域名，基本地址
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
export default request
