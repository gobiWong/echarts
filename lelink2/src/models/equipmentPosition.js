import { routerRedux } from 'dva/router';
import { fetchPosition, removePosition, addPosition } from '../services/api';
//导入线上api请求
import { addEqLocation, fetchEqLocation, removeEqLocation, editEqLocation } from '../services/equipmentPosition';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';
export default {
  namespace: 'equipmentPosition',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchPosition({ payload }, { call, put }) {
      const response = yield call(fetchEqLocation, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          const result = {
            list: response.Data.locationInfo.data,
            pagination: {
              total: response.Data.locationInfo.total,
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
    *addPosition({ payload, callback }, { call, put }) {
      const response = yield call(addEqLocation, payload);
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
            list: response.Data.locationInfo.data,
            pagination: {
              total: response.Data.locationInfo.total,
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
    *removePosition({ payload, callback }, { call, put }) {
      const response = yield call(removeEqLocation, payload);
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
            list: response.Data.locationInfo.data,
            pagination: {
              total: response.Data.locationInfo.total,
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
    *editPosition({ payload, callback }, { call, put }) {
      const response = yield call(editEqLocation, payload);
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
            list: response.Data.locationInfo.data,
            pagination: {
              total: response.Data.locationInfo.total,
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
