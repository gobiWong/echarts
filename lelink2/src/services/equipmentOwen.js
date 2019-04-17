//引入封装好的请求接口函数request()
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
//封装请求地址URL
import { api_domain } from '../utils/common';
//新增设备属性
export async function addEqAttribution(params) {
    return request(api_domain + 'equipmentattribution', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'addEquipmentAttribution',
      },
    });
  }
//查询设备属性
export async function fetchEqAttribution(params) {
    return request(api_domain + 'equipmentattribution', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'fetchEquipmentAttribution',
      },
    });
  }

//编辑设备属性
export async function editEqAttribution(params) {
    return request(api_domain + 'equipmentattribution', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'editEquipmentAttribution',
      },
    });
  }

//删除设备属性
export async function removeEqAttribution(params) {
    return request(api_domain + 'equipmentattribution', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'deleteEquipmentAttribution',
      },
    });
  }