import { routerRedux } from 'dva/router';
import { fetchFollowRecord, deleteFollowRecord, addFollowRecord } from '../services/api';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';

export default {
  namespace: 'follow',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {

    *fetchFollow({ payload }, { call, put }) {
      const response = yield call(fetchFollowRecord, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.followInfo.data,
            pagination: {
              total: response.Data.followInfo.total,
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

    *addFollow({ payload, callback }, { call, put }) {
      const response = yield call(addFollowRecord, payload);
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
            list: response.Data.followRecordInfo.data,
            pagination: {
              total: response.Data.followRecordInfo.total,
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

    *removeFollow({ payload, callback }, { call, put }) {
      const response = yield call(deleteFollowRecord, payload);
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
            list: response.Data.followRecordInfo.data,
            pagination: {
              total: response.Data.followRecordInfo.total,
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
