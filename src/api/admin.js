import request from '../utils/request';
import Qs from 'qs';
export const Login = (data) => {
    return request({
        url: '/end/login/check',
        method: 'post',
        data: Qs.stringify(data)
    })
}