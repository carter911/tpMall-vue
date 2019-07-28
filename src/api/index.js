import request from '../utils/request';
import Qs from 'qs';
export const fetchData = (query) => {
    return request({
        url: '/ms/table/list',
        method: 'post',
        data: query
    })
}

export const getItemList = (query) => {
    return request({
        url: '/end/Item/getList',
        method: 'post',
        data: Qs.stringify(query)
    })
}