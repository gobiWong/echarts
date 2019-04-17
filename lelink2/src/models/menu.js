import { routerRedux } from 'dva/router';
import { fetchMenu, addMenu, editMenu, removeMenu, fetchMenuByCondition } from '../services/menu';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';

export default {
  namespace: 'menu',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    menuConditionData:[]
  },

  effects: {

    *fetchMenu({ payload }, { call, put }) {
      const response = yield call(fetchMenu, payload);
      console.log(response);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.ResponseData.menuInfo.data,
            pagination: {
              total: response.ResponseData.menuInfo.total,
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

    *fetchMenuByCondition({ payload }, { call, put }) {
      const response = yield call(fetchMenuByCondition, payload);
      
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success') {
        }else{
          yield put({
            type: 'saveMenuConditionData',
            payload: response.ResponseData.menuInfo,
          });
        }
        
      }else{
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
      
    },

    *addMenu({ payload, callback }, { call, put }) {
      const response = yield call(addMenu, payload);
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
            list: response.ResponseData.menuInfo.data,
            // roles: response.Data.roleInfo,
            pagination: {
              total: response.ResponseData.menuInfo.total,
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
    *editMenu({ payload, callback }, { call, put }) {
      const response = yield call(editMenu, payload);
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
            list: response.ResponseData.menuInfo.data,
            pagination: {
              total: response.ResponseData.menuInfo.total,
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
    *removeMenu({ payload, callback }, { call, put }) {
      const response = yield call(removeMenu, payload);
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
            list: response.ResponseData.menuInfo.data,
            pagination: {
              total: response.ResponseData.menuInfo.total,
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
    saveMenuConditionData(state, action) {
      return {
        ...state,
        menuConditionData: action.payload,
      };
    },
  },
};
