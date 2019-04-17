import { stringify } from 'qs';
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
import { api_domain } from '../utils/common';

//操作页面
  export async function fetchOperateByCondition(params) {
      return request(api_domain + 'operate', {
        method: 'POST',
        body: {
          params: {...params},
          accessToken: getAccessToken(),
          method: 'fetchOperateByCondition',
        },
      });
  }
  
  export async function submitOperation(params) {
    return request(api_domain + 'operate', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'addOperate',
      },
    });
  }
  
  export async function removeOperation(params) {
    return request(api_domain + 'operate', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'deleteOperation',
      },
    });
  }