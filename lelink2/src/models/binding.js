import { routerRedux } from 'dva/router';
import { fetchBinding, removeBinding, addBinding } from '../services/api';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';
export default {
  namespace: 'binding',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchBinding({ payload }, { call, put }) {
      const response = yield call(fetchBinding, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.bindingInfo.data,
            pagination: {
              total: response.Data.bindingInfo.total,
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
    *addBinding({ payload, callback }, { call, put }) {
      const response = yield call(addBinding, payload);
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
            list: response.Data.tableRoleInfo.data,
            pagination: {
              total: response.Data.tableRoleInfo.total,
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
    *removeBinding({ payload, callback }, { call, put }) {
      const response = yield call(removeBinding, payload);
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
            list: response.Data.tableRoleInfo.data,
            pagination: {
              total: response.Data.tableRoleInfo.total,
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
