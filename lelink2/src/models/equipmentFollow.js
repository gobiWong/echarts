import { routerRedux } from 'dva/router';
import { fetchequipmentFollow, removeequipmentFollow, addequipmentFollow } from '../services/api';
//导入线上api请求
import { addEqFollow, fetchEqFollow, editEqFollow,removeEqFollow } from '../services/equipmentFollow';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';
export default {
  namespace: 'equipmentFollow',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchequipmentFollow({ payload }, { call, put }) {
      //console.log(payload,'12345')
      const response = yield call(fetchEqFollow, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          console.log(response,"resFollow")
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
      } else {
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
    },
    *addequipmentFollow({ payload, callback }, { call, put }) {
      const response = yield call(addEqFollow, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          notification['success']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 2
          });
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
        if (callback) callback(response.ResponseState.toLowerCase());
      } else {
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
    },
    *removeequipmentFollow({ payload, callback }, { call, put }) {
      const response = yield call(removeEqFollow, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          notification['success']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 2
          });
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
          if (callback) callback();
        }
      } else {
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
    },
    *editquipmentFollow({ payload, callback }, { call, put }) {
      const response = yield call(editEqFollow, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          notification['success']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 2
          });
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
          if (callback) callback();
        }
      } else {
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
