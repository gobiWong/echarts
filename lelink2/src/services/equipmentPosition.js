//引入封装好的请求接口函数request()
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
//封装请求地址URL
import { api_domain } from '../utils/common';
//新增设备位置
export async function addEqLocation(params) {
    return request(api_domain + 'equipmentlocation', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'addEquipmenLocation',
      },
    });
  }
//查询设备位置
export async function fetchEqLocation(params) {
    return request(api_domain + 'equipmentlocation', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'fetchEquipmentLocation',
      },
    });
  }
//编辑设备位置
export async function editEqLocation(params) {
  return request(api_domain + 'equipmentlocation', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'editEquipmenLocation',
    },
  });
}
//删除设备位置
export async function removeEqLocation(params) {
  return request(api_domain + 'equipmentlocation', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deleteEquipmentLocation',
    },
  });
}