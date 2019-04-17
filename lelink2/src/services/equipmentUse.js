//引入封装好的请求接口函数request()
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
//封装请求地址URL
import { api_domain } from '../utils/common';
//新增设备用途
export async function addEqUse(params) {
    return request(api_domain + 'equipmentuse', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'addEquipmentUse',
      },
    });
  }
//查询设备用途
export async function fetchEqUse(params) {
    return request(api_domain + 'equipmentuse', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'fetchEquipmentUse',
      },
    });
  }

//编辑设备用途
export async function editEqUse(params) {
    return request(api_domain + 'equipmentuse', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'editEquipmentUse',
      },
    });
  }

//删除设备用途
export async function removeEqUse(params) {
    return request(api_domain + 'equipmentuse', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'deleteEquipmentUse',
      },
    });
  }