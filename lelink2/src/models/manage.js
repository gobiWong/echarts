import { routerRedux } from 'dva/router';
import { fetchManage, removeManage, addManage } from '../services/api';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';

export default {
  namespace: 'manage',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {

    *fetchManage({ payload }, { call, put }) {
      const response = yield call(fetchManage, payload);
      if(response.code != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.manageInfo.data, 
            pagination: {
              total: response.Data.manageInfo.total,
            },
          };
          // console.log(result);
          yield put({
            type: 'save',
            payload: result,
          });
        }
        
      }else{
        //localStorage.clear();
        //yield put(routerRedux.push(`/user/login`));
      }
      
    },

    *addManage({ payload, callback }, { call, put }) {
      const response = yield call(addManage, payload);
      if(response.code != unauth_code){
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

    *removeManage({ payload, callback }, { call, put }) {
      const response = yield call(removeManage, payload);
      if(response.code != unauth_code){
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
