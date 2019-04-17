import { routerRedux } from 'dva/router';
import { fetchOwen, removeOwen, addOwen } from '../services/api';
//导入线上api请求
import { addEqAttribution, fetchEqAttribution, editEqAttribution, removeEqAttribution } from '../services/equipmentOwen';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';
export default {
  namespace: 'equipmentOwen',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    //查询设备属性
    *fetchOwen({ payload }, { call, put }) {
      const response = yield call(fetchEqAttribution, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.attributionInfo.data,
            pagination: {
              total: response.Data.attributionInfo.total,
            },
          };
          yield put({
            type: 'save',
            payload: result,
          });
        }
      }else{
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
    },
    //新增设备属性
    *addOwen({ payload, callback }, { call, put }) {
      const response = yield call(addEqAttribution, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          notification['success']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 2
          });
          const result = {
            list: response.Data.attributionInfo.data,
            pagination: {
              total: response.Data.attributionInfo.total,
            },
          };
          yield put({
            type: 'save',
            payload: result,
          });
        }
        if (callback) callback(response.ResponseState.toLowerCase());
      }else{
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
    },
    //删除设备属性
    *removeOwen({ payload, callback }, { call, put }) {
      const response = yield call(removeEqAttribution, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          notification['success']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 2
          });
          const result = {
            list: response.Data.attributionInfo.data,
            pagination: {
              total: response.Data.attributionInfo.total,
            },
          };
          yield put({
            type: 'save',
            payload: result,
          });
          if (callback) callback();
        }
      }else{
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
    },
    //编辑设备属性
    *editOwen({ payload, callback }, { call, put }) {
      const response = yield call(editEqAttribution, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          notification['success']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 2
          });
          const result = {
            list: response.Data.attributionInfo.data,
            pagination: {
              total: response.Data.attributionInfo.total,
            },
          };
          yield put({
            type: 'save',
            payload: result,
          });
          if (callback) callback();
        }
      }else{
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
    },
},
reducers: {
  save(state, action) {
    return {
      ...state,
      data: action.payload,
    };
  },
},
};
