import axios from 'axios';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: 'http://xlz.crjblog.cn/',
    timeout: 5000
})

service.interceptors.request.use( config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if(response.status === 200){
        return response.data;
    }else{
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;