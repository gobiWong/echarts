import { stringify } from 'qs';
import request from '../utils/request';
// import { ServerResponse } from 'http';
// import { getAccessToken } from '../utils/localstorage';
import {api_domain } from '../utils/common';



// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     body: params,
//   });
// }

//账号登录
export async function fakeAccountLogin(params) {
  return request(api_domain+ 'open', {
    method: 'POST',
    body: {
      params:{...params},
      method: 'login'
    }
  });
}

