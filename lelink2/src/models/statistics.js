import { routerRedux } from 'dva/router';
import { queryStatistics, removeStatistics, addStatistics, batchAddStatistics } from '../services/api';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';

export default {
  namespace: 'statistics',

  state: {
    data: {
      list: [],
      packageTypes: [],
      jobNumbers: [],
      tableColumns: [],
      pagination: {},
    },
  },

  effects: {

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryStatistics, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.statisticsInfo.data,
            packageTypes: response.Data.packageTypeInfo,
            jobNumbers: response.Data.jobNumberInfo,
            tableColumns: response.Data.tableFieldInfo,
            pagination: {
              total: response.Data.statisticsInfo.total,
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

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addStatistics, payload);
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
            list: response.Data.statisticsInfo.data,
            packageTypes: response.Data.packageTypeInfo,
            jobNumbers: response.Data.jobNumberInfo,
            tableColumns: response.Data.tableFieldInfo,
            pagination: {
              total: response.Data.statisticsInfo.total,
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

    *batchAdd({ payload, callback }, { call, put }) {
      const response = yield call(batchAddStatistics, payload);
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
            list: response.Data.statisticsInfo.data,
            packageTypes: response.Data.packageTypeInfo,
            jobNumbers: response.Data.jobNumberInfo,
            tableColumns: response.Data.tableFieldInfo,
            pagination: {
              total: response.Data.statisticsInfo.total,
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

    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeStatistics, payload);
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
            list: response.Data.statisticsInfo.data,
            packageTypes: response.Data.packageTypeInfo,
            jobNumbers: response.Data.jobNumberInfo,
            tableColumns: response.Data.tableFieldInfo,
            pagination: {
              total: response.Data.statisticsInfo.total,
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
