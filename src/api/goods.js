import request from '../utils/request';
import Qs from 'qs';
export const getItemList = (query) => {
    return request({
        url: '/end/Item/getList',
        method: 'post',
        data: Qs.stringify(query)
    })
}

export const addItem = (item) => {
    return request({
        url: '/end/Item/store',
        method: 'post',
        data: Qs.stringify(item)
    })
}
