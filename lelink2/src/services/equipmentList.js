//引入封装好的请求接口函数request()
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
//封装请求地址URL
import { api_domain } from '../utils/common';
//新增设备
export async function addNewequipment(params) {
    return request(api_domain + 'equipment', {
        method: 'POST',
        body: {
            params: { ...params },
            accessToken: getAccessToken(),
            method: 'addEquipment',
        },
    });
}
//查询设备
export async function fetchEquipment(params) {
    console.log(22222)
    return request(api_domain + 'equipment', {
        method: 'POST',
        body: {
            params: { ...params },
            accessToken: getAccessToken(),
            method: 'fetchEquipment',
        },
    });
}

//编辑设备
export async function editEquipment(params) {
    return request(api_domain + 'equipment', {
        method: 'POST',
        body: {
            params: { ...params },
            accessToken: getAccessToken(),
            method: 'editEquipment',
        },
    });
}

//删除设备
export async function removeEquipment(params) {
    return request(api_domain + 'equipment', {
        method: 'POST',
        body: {
            params: { ...params },
            accessToken: getAccessToken(),
            method: 'deleteEquipment',
        },
    });
}