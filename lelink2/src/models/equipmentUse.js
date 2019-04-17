import { routerRedux } from 'dva/router';
import { fetchUse, removeUse, addUse } from '../services/api';
//导入线上api请求
import { addEqUse, fetchEqUse, editEqUse, removeEqUse } from '../services/equipmentUse';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';
export default {
  namespace: 'equipmentUse',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    //查询设备用途
    *fetchUse({ payload }, { call, put }) {
      const response = yield call(fetchEqUse, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.useInfo.data,
            pagination: {
              total: response.Data.useInfo.total,
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
    //新增设备用途
    *addUse({ payload, callback }, { call, put }) {
      const response = yield call(addEqUse, payload);
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
            list: response.Data.useInfo.data,
            pagination: {
              total: response.Data.useInfo.total,
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
    //删除设备用途
    *removeUse({ payload, callback }, { call, put }) {
      const response = yield call(removeEqUse, payload);
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
            list: response.Data.useInfo.data,
            pagination: {
              total: response.Data.useInfo.total,
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
    //编辑设备用途
    *editUse({ payload, callback }, { call, put }) {
      const response = yield call(editEqUse, payload);
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
            list: response.Data.useInfo.data,
            pagination: {
              total: response.Data.useInfo.total,
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
