import { routerRedux } from 'dva/router';
//导入请求数据APi
import { fetchRole, addRole, editRole, removeRole, fetchRoleByCondition, fetchPermission } from '../services/role';
import { notification } from 'antd';
//导入授权码unauth_code
import { unauth_code } from '../utils/common';

export default {
  //命名空间，连接model与route的桥梁
  namespace: 'role',
  //初始数据格式状态(自定义)
  state: {
    data: {
      list: [],
      pagination: {},
    },
    roleConditionData: [],
    permissionData: []
  },
  //异步请求数据(dva封装好的)
  effects: {

    *fetchRole({ payload }, { call, put }) {
      const response = yield call(fetchRole, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          const result = {
            list: response.ResponseData.roleInfo.data,
            pagination: {
              total: response.ResponseData.roleInfo.total,
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

    *fetchRoleByCondition({ payload }, { call, put }) {
      const response = yield call(fetchRoleByCondition, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
        } else {
          yield put({
            type: 'saveRoleConditionData',
            payload: response.ResponseData.roleInfo,
          });
        }

      } else {
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }

    },

    *addRole({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
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
            list: response.ResponseData.roleInfo.data,
            pagination: {
              total: response.ResponseData.roleInfo.total,
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

    *editRole({ payload, callback }, { call, put }) {
      const response = yield call(editRole, payload);
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
            list: response.ResponseData.roleInfo.data,
            pagination: {
              total: response.ResponseData.roleInfo.total,
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

    *removeRole({ payload, callback }, { call, put }) {
      const response = yield call(removeRole, payload);
      console.log(5555555);
      console.log(response);
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
            list: response.ResponseData.roleInfo.data,
            pagination: {
              total: response.ResponseData.roleInfo.total,
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

    *fetchPermission({ payload }, { call, put }) {
      const response = yield call(fetchPermission, payload);
      console.log(559889);
      console.log(response);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          const result = {
            list: response.ResponseData.permissionInfo,
          };
          yield put({
            type: 'savePermissionData',
            payload: result,
          });
        }

      } else {
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }

    },
  },

  //同步处理请求(dva封装好的)回来的数据，并保存状态，供页面(router)调用
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveRoleConditionData(state, action) {
      return {
        ...state,
        roleConditionData: action.payload,
      };
    },
    savePermissionData(state, action) {
      return {
        ...state,
        permissionData: action.payload,
      };
    },

  },
};
