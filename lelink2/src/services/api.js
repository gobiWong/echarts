import { stringify } from 'qs';
import request from '../utils/request';
// import { ServerResponse } from 'http';
import { getAccessToken } from '../utils/localstorage';
import { api_domain, host } from '../utils/common';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}



// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     body: params,
//   });
// }

//5.调用rest接口
//账号登录
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

// //账号退出
// export async function accountLogout(params) {
//   return request(api_domain + 'index', {
//     method: 'POST',
//     body: {
//       params: {...params},
//       accessToken: getAccessToken(),
//       method: 'logout',
//     },
//   });
// }


//图标数据
export async function fetchChartData(params) {
  return request(api_domain + 'index', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'fetchChartData',
    },
  });
}


export async function submitPackageType(params) {
  //请求的服务起的地址api_domain
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'submitPackageTypes',
    },
  });
}


export async function removePackageType(params) {
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deletePackageType',
    },
  });
}


//工号
export async function queryJobNumber(params) {
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'fetchJobNumbers',
    },
  });
}

export async function submitJobNumber(params) {
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'submitJobNumber',
    },
  });
}


export async function removeJobNumber(params) {
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deleteJobNumber',
    },
  });
}


//数据统计
export async function queryStatistics(params) {
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'fetchStatistics',
    },
  });
}

export async function addStatistics(params) {
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addStatistics',
    },
  });
}

export async function batchAddStatistics(params) {

  let formdata = new FormData();
  formdata.append('file', params.file);
  formdata.append('filters', params.filters);
  formdata.append('accessToken', getAccessToken());
  formdata.append('method', 'batchAddStatistics');
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: formdata,
    //header:  {'Content-Type': 'multipart/form-data'},
    header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}

export async function removeStatistics(params) {
  return request(api_domain + 'statistics', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deleteStatistics',
    },
  });
}

export async function fetchVosInfo(params) {
  return request('/vosInfo/fetchVosInfo', {
    method: 'GET',
    action: 'fetchVosInfo',
    params: { ...params },
  });
}



//vos server
// export async function fetchVosServer(params) {
//   return request(api_domain + 'vosServer', {
//     method: 'POST',
//     body: {
//       params: {...params},
//       // accessToken: getAccessToken(),
//       method: 'fetchVosServer',
//     },
//   });
// }

export async function fetchVosServer(params) {
  return request('/vosServer/fetchVos', {
    method: 'GET',
    action: 'fetchVos',
    params: { ...params },
  });
}
export async function addVosServer(params) {
  return request(api_domain + 'vosServer', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addVosServer',
    },
  });
}
export async function deleteVosServer(params) {
  return request(api_domain + 'vosServer', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deleteVosServer',
    },
  });
}

//call center server
export async function fetchCallCenterServer(params) {
  return request('/server/fetchServer', {
    method: 'GET',
    action: 'fetchCallCenterServer',
    params: { ...params },
  });
}
export async function addCallCenterServer(params) {
  return request(api_domain + 'callCentererver', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addServer',
    },
  });
}
export async function deleteCallCenterServer(params) {
  return request(api_domain + 'callCentererver', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deleteCallCenterServer',
    },
  });
}


//unified platform server
export async function fetchUnifiedPlatformServer(params) {
  return request('/unified/fetchUnified', {
    method: 'GET',
    action: 'fetchUnified',
    params: { ...params },
  });
}
export async function addUnifiedPlatformServer(params) {
  return request(api_domain + 'unifide', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addUnifiedPlatformServer',
    },
  });
}
export async function deleteUnifiedPlatformServer(params) {
  return request(api_domain + 'unified', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deleteUnifiedPlatformServer',
    },
  });
}


//跟进记录
export async function fetchFollowRecord(params) {
  return request('/follow/fetchFollow', {
    method: 'GET',
    action: 'fetchFollow',
    params: { ...params },
  });
}
export async function addFollowRecord(params) {
  return request(api_domain + 'followRecord', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addFollowRecord',
    },
  });
}
export async function deleteFollowRecord(params) {
  return request(api_domain + 'followRecord', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'deleteFollowRecord',
    },
  });
}

//企业管理

export async function fetchManage(params) {
  return request('/manage/fetchManage', {
    method: 'GET',
    action: 'fetchManage',
    params: { ...params },
  });
}
export async function addManage(params) {
  return request(api_domain + 'manage', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addManage',
    },
  });
}
export async function removeManage(params) {
  return request(api_domain + 'manage', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeManage',
    },
  });
}


//设备列表

export async function fetchList(params) {
  return request('/equipmentList/fetchList', {
    method: 'GET',
    action: 'fetchList',
    params: { ...params },
  });
}
export async function addList(params) {
  return request(api_domain + 'equipmentList', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addList',
    },
  });
}
export async function removeList(params) {
  return request(api_domain + 'equipmentList', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeList',
    },
  });
}

//设备用途

export async function fetchUse(params) {
  return request('/equipmentUse/fetchUse', {
    method: 'GET',
    action: 'fetchUse',
    params: { ...params },
  });
}
export async function addUse(params) {
  return request(api_domain + 'equipmentUse', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addUse',
    },
  });
}
export async function removeUse(params) {
  return request(api_domain + 'equipmentUse', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeUse',
    },
  });
}


//设备归属


export async function fetchOwen(params) {
  return request('/equipmentOwen/fetchOwen', {
    method: 'GET',
    action: 'fetchOwen',
    params: { ...params },
  });
}
export async function addOwen(params) {
  return request(api_domain + 'equipmentOwen', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addOwen',
    },
  });
}
export async function removeOwen(params) {
  return request(api_domain + 'equipmentOwen', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeOwen',
    },
  });
}

//设备类型

export async function fetchType(params) {
  return request('/equipmentType/fetchType', {
    method: 'GET',
    action: 'fetchType',
    params: { ...params },
  });
}
export async function addType(params) {
  return request(api_domain + 'equipmentType', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addType',
    },
  });
}
export async function removeType(params) {
  return request(api_domain + 'equipmentType', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeType',
    },
  });
}


//设备位置

export async function fetchPosition(params) {
  return request('/equipmentPosition/fetchPosition', {
    method: 'GET',
    action: 'fetchPosition',
    params: { ...params },
  });
}
export async function addPosition(params) {
  return request(api_domain + 'equipmentPosition', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addPosition',
    },
  });
}
export async function removePosition(params) {
  return request(api_domain + 'equipmentPosition', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removePosition',
    },
  });
}

//设备跟进

export async function fetchequipmentFollow(params) {
  return request('/equipmentFollow/fetchequipmentFollow', {
    method: 'GET',
    action: 'fetchequipmentFollow',
    params: { ...params },
  });
}
export async function addequipmentFollow(params) {
  return request(api_domain + 'equipmentFollow', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addequipmentFollow',
    },
  });
}
export async function removeequipmentFollow(params) {
  return request(api_domain + 'equipmentFollow', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeequipmentFollow',
    },
  });
}


//短信平台

export async function fetchMessage(params) {
  return request('/message/fetchMessage', {
    method: 'GET',
    action: 'fetchMessage',
    params: { ...params },
  });
}
export async function addMessage(params) {
  return request(api_domain + 'message', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addMessage',
    },
  });
}
export async function removeMessage(params) {
  return request(api_domain + 'message', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeMessage',
    },
  });
}


//系统设置

export async function fetchSystemsz(params) {
  return request('/systemsz/fetchSystemsz', {
    method: 'GET',
    action: 'fetchSystemsz',
    params: { ...params },
  });
}
export async function addSystemsz(params) {
  return request(api_domain + 'systemsz', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addSystemsz',
    },
  });
}
export async function removeSystemsz(params) {
  return request(api_domain + 'systemsz', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeSystemsz',
    },
  });
}


//微信绑定

export async function fetchBinding(params) {
  return request('/binding/fetchBinding', {
    method: 'GET',
    action: 'fetchBinding',
    params: { ...params },
  });
}
export async function addBinding(params) {
  return request('/api/binding', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function removeBinding(params) {
  return request(api_domain + 'binding', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeBinding',
    },
  });
}


//微信模板

export async function fetchModel(params) {
  return request('/model/fetchModel', {
    method: 'GET',
    action: 'fetchModel',
    params: { ...params },
  });
}
export async function addModel(params) {
  return request(api_domain + 'model', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addModel',
    },
  });
}
export async function removeModel(params) {
  return request(api_domain + 'model', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeModel',
    },
  });
}


//微信日志

export async function fetchWechatLog(params) {
  return request('/wechatLog/fetchWechatLog', {
    method: 'GET',
    action: 'fetchWechatLog',
    params: { ...params },
  });
}
export async function addWechatLog(params) {
  return request(api_domain + 'wechatLog', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addWechatLog',
    },
  });
}
export async function removeWechatLog(params) {
  return request(api_domain + 'wechatLog', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeWechatLog',
    },
  });
}

//微信接口

export async function fetchPort(params) {
  return request('/port/fetchPort', {
    method: 'GET',
    action: 'fetchPort',
    params: { ...params },
  });
}
export async function addPort(params) {
  return request(api_domain + 'port', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addPort',
    },
  });
}
export async function removePort(params) {
  return request(api_domain + 'prot', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removePort',
    },
  });
}


//短信接口

export async function fetchMessagePort(params) {
  return request('/messagePort/fetchMessagePort', {
    method: 'GET',
    action: 'fetchMessagePort',
    params: { ...params },
  });
}
export async function addMessagePort(params) {
  return request(api_domain + 'messagePort', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addMessagePort',
    },
  });
}
export async function removeMessagePort(params) {
  return request(api_domain + 'messagePort', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeMessagePort',
    },
  });
}

//短信模板

export async function fetchMessageModel(params) {
  return request('/messageModel/fetchMessageModel', {
    method: 'GET',
    action: 'fetchMessageModel',
    params: { ...params },
  });
}
export async function addMessageModel(params) {
  return request(api_domain + 'messageModel', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addMessageModel',
    },
  });
}
export async function removeMessageModel(params) {
  return request(api_domain + 'messageModel', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeMessageModel',
    },
  });
}

//短信日志

export async function fetchMessageLog(params) {
  return request('/messageLog/fetchMessageLog', {
    method: 'GET',
    action: 'fetchMessageLog',
    params: { ...params },
  });
}
export async function addMessageLog(params) {
  return request(api_domain + 'messageLog', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'addMessageLog',
    },
  });
}
export async function removeMessageLog(params) {
  return request(api_domain + 'messageLog', {
    method: 'POST',
    body: {
      params: { ...params },
      accessToken: getAccessToken(),
      method: 'removeMessageLog',
    },
  });
}



export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
//测试接口
export async function queryTestbase() {
  return request('/wlist/fetch1');
}
//测试接口2
export async function getCarousel() {
  return request('wtest/fetchcarousel')
}