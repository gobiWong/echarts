//引入封装好的请求接口函数request()
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
//封装请求地址URL
import { api_domain } from '../utils/common';
//新增跟进记录
export async function addEqFollow(params) {
    return request(api_domain + 'equipmentfollow', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'addEquipmentFollow',
      },
    });
  }
//查询跟进记录
export async function fetchEqFollow(params) {
    return request(api_domain + 'equipmentfollow', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'fetchEquipmentFollow',
      },
    });
  }

//编辑跟进记录
export async function editEqFollow(params) {
    return request(api_domain + 'equipmentfollow', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'editEquipmentFollow',
      },
    });
  }

//删除跟进记录
export async function removeEqFollow(params) {
    return request(api_domain + 'equipmentfollow', {
      method: 'POST',
      body: {
        params: { ...params },
        accessToken: getAccessToken(),
        method: 'deleteEquipmentFollow',
      },
    });
  }