import { routerRedux } from 'dva/router';
import { fetchModel, removeModel, addModel } from '../services/api';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';

export default {
  namespace: 'model',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchModel({ payload }, { call, put }) {
      const response = yield call(fetchModel, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.modelInfo.data,
            pagination: {
              total: response.Data.modelInfo.total,
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

    *addModel({ payload, callback }, { call, put }) {
      const response = yield call(addModel, payload);
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

    *removeModel({ payload, callback }, { call, put }) {
      const response = yield call(removeModel, payload);
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
