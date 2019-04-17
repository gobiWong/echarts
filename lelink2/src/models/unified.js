import { routerRedux } from 'dva/router';
import { fetchUnifiedPlatformServer, deleteUnifiedPlatformServer, addUnifiedPlatformServer } from '../services/api';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';

export default {
  namespace: 'unified',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {

    *fetchUnified({ payload }, { call, put }) {
      const response = yield call(fetchUnifiedPlatformServer, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.unifiedInfo.data,
            pagination: {
              total: response.Data.unifiedInfo.total,
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

    *addUnified({ payload, callback }, { call, put }) {
      const response = yield call(addUnifiedPlatformServer, payload);
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
            list: response.Data.unifiedPlatformServerInfo.data,
            pagination: {
              total: response.Data.unifiedPlatformServerInfo.total,
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

    *removeUnified({ payload, callback }, { call, put }) {
      const response = yield call(deleteUnifiedPlatformServer, payload);
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
            list: response.Data.unifiedPlatformServerInfo.data,
            pagination: {
              total: response.Data.unifiedPlatformServerInfo.total,
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
