//引入封装好的请求接口函数request()
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
//封装请求地址URL
import { api_domain } from '../utils/common';
//新增设备类型
export async function addEqType(params) {
    return request(api_domain + 'equipmenttype', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'addEquipmentType',
      },
    });
  }
//查询设备类型
export async function fetchEqType(params) {
    return request(api_domain + 'equipmenttype', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'fetchEquipmentType',
      },
    });
  }

//编辑设备类型
export async function editEqType(params) {
    return request(api_domain + 'equipmenttype', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'editEquipmentType',
      },
    });
  }

//删除设备类型
export async function removeEqType(params) {
    return request(api_domain + 'equipmenttype', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'deleteEquipmentType',
      },
    });
  }