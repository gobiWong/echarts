import { routerRedux } from 'dva/router';
import { fetchType, removeType, addType } from '../services/api';
//导入线上api请求
import { addEqType, fetchEqType, editEqType, removeEqType } from '../services/equipmentType';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';
export default {
  namespace: 'equipmentType',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchType({ payload }, { call, put }) {
      const response = yield call(fetchEqType, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.typeInfo.data,
            pagination: {
              total: response.Data.typeInfo.total,
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
    *addType({ payload, callback }, { call, put }) {
      const response = yield call(addEqType, payload);
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
            list: response.Data.typeInfo.data,
            pagination: {
              total: response.Data.typeInfo.total,
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
    *removeType({ payload, callback }, { call, put }) {
      const response = yield call(removeEqType, payload);
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
            list: response.Data.typeInfo.data,
            pagination: {
              total: response.Data.typeInfo.total,
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
    *editType({ payload, callback }, { call, put }) {
      const response = yield call(editEqType, payload);
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
            list: response.Data.typeInfo.data,
            pagination: {
              total: response.Data.typeInfo.total,
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
