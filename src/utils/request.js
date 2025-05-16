import axios from 'axios'
import router from '@/router'
import { useLoginCounter } from '@/stores/loginCounter'

const instance = axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 50000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    const loginCounter = useLoginCounter()
    const token = loginCounter.loginData.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // 在发送请求之前做些什么  
    console.log('1请求');
    return config;
}, function (error) {
    console.log('2请求');
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log('1拦截');
    return response;
}, function (error) {
    const loginCounter = useLoginCounter()
    console.log('2拦截');
    if (error.status === 401) {
        loginCounter.setOutLogin()
        router.push('/login')
    }
    ElMessage.error(error.response.data.message)
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default instance