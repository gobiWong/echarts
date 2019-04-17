import { stringify } from 'qs';
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
import { api_domain } from '../utils/common';

  //角色
  export async function fetchRole(params) {
    return request(api_domain+ 'role', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'fetchRole',
      },
    });
  }

  export async function fetchRoleByCondition(params) {
    return request(api_domain+ 'role', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'fetchRoleByCondition',
      },
    });
  }
  
  export async function addRole(params) {
    return request(api_domain+ 'role', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'addRole',
      },
    });
  }
  
  //编辑
  export async function editRole(params) {
    return request(api_domain+ 'role', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'editRole',
      },
    });
  }
  
  export async function removeRole(params) {
    return request(api_domain+ 'role', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'deleteRole',
      },
    });
  }

  //获取权限信息
  export async function fetchPermission(params) {
    return request(api_domain+ 'role', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'fetchPermission',
      },
    });
  }
  