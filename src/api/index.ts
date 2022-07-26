import axios from 'axios'
import { ElMessage } from 'element-plus'// 创建一个 axios 实例

declare module 'axios' {
	export interface AxiosRequestConfig {
		isAll?: boolean;
	}
}


const http = axios.create({
	baseURL: '/api', // 所有的请求地址前缀部分
	timeout: 60000, // 请求超时时间毫秒
	withCredentials: true, // 异步请求携带cookie
})

// 添加请求拦截器
http.interceptors.request.use(
	function (config: any) {
		return config
	},
	function (error: any) {
		console.log(error)
		return Promise.reject(error)
	}
)

// 添加响应拦截器
http.interceptors.response.use(
	function (response) {
		const dataAxios = response.data
		const code = dataAxios.code
		if (!code || code === 200) {
			return dataAxios.result || dataAxios.data || dataAxios
		}
		if (response.config.isAll) {
			return response.data
		}
		ElMessage.error('Error', response.request.responseURL)
		return Promise.reject(dataAxios)
	},
	function (error: any) {
		return Promise.reject(error)
	}
)

export default http