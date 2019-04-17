import { stringify } from 'qs';
//引入封装好的请求接口函数request()
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
//封装请求地址URL
import { api_domain } from '../utils/common';

//查询管理员
export async function fetchUser(params) {
  return request(api_domain + 'user', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'fetchUser',
    },
  });
}

//添加管理员
export async function addManager(params) {
  return request(api_domain + 'user', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addUser',
    },
  });
}

//编辑管理员
export async function editManager(params) {
  return request(api_domain + 'user', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'editUser',
    },
  });
}
//删除管理员
export async function removeManager(params) {
  return request(api_domain + 'user', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deleteUser',
    },
  });
}
//添加用户角色
export async function addUserRole(params) {
  return request(api_domain + 'user', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addUserRole',
    },
  });
}
