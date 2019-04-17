import { stringify } from 'qs';
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
import { api_domain } from '../utils/common';

//菜单

  export async function fetchMenu(params) {
    return request(api_domain+ 'menu', {
      method: 'POST',
      body: {
        params: {...params},
        accessToken: getAccessToken(),
        method: 'fetchMenu',
      },
    });
    }

    export async function fetchMenuByCondition(params) {
      console.log(params);
      return request(api_domain+ 'menu', {
        method: 'POST',
        body: {
          params: {...params},
          accessToken: getAccessToken(),
          method: 'fetchMenuByCondition',
        },
      });
    }
    
  
    export async function addMenu(params) {
      return request(api_domain+ 'menu', {
        method: 'POST',
        body: {
          params: {...params},
          accessToken: getAccessToken(),
          method: 'addMenu',
        },
      });
    }
  
  
    export async function editMenu(params) {
      return request(api_domain+ 'menu', {
        method: 'POST',
        body: {
          params: {...params},
          accessToken: getAccessToken(),
          method: 'editMenu',
        },
      });
    }
    
    export async function removeMenu(params) {
      return request(api_domain + 'menu', {
        method: 'POST',
        body: {
          params: {...params},
          accessToken: getAccessToken(),
          method: 'deleteMenu',
        },
      });
    }