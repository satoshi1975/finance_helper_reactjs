import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://127.0.0.1:3001',
})

instance.interceptors.request.use(config => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

export default instance
