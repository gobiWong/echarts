import { routerRedux } from 'dva/router';
//导入请求数据APi
import { fetchUser, addManager, editManager, removeManager, addUserRole } from '../services/manager';
import { notification } from 'antd';
//导入授权码unauth_code
import { unauth_code } from '../utils/common';
export default {
  //命名空间，连接model与route的桥梁
  namespace: 'manager',
  //初始数据格式状态(自定义)
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  //异步请求数据(dva封装好的)
  effects: {
    //payload是页面传过来的参数
    *fetchUser({ payload }, { call, put }) {
      //call()调用方法，把数据存在response中
      const response = yield call(fetchUser, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          //antd提供的通知消息框方法
          notification['error']({
            message: '操作提示',//弹框标题
            description: response.ResponseMessage,//描述信息
            duration: 3   //3秒自动关闭！
          });
        } else {
          const result = {
            list: response.ResponseData.userInfo.data,
            pagination: {
              total: response.ResponseData.userInfo.total,
            },
          };
          yield put({
            type: 'save',
            payload:result,//payload映射state数据格式，暂时保存
          });
        }
      } else {
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`));
      }
    },
    *addManager({ payload, callback }, { call, put }) {
      const response = yield call(addManager, payload);
      console.log('2222',response)
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
            list: response.ResponseData.userInfo.data,
            // roles: response.Data.roleInfo,
            pagination: {
              total: response.ResponseData.userInfo.total,
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
    *editManager({ payload, callback }, { call, put }) {
      const response = yield call(editManager, payload);
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
            list: response.ResponseData.userInfo.data,
            // roles: response.Data.roleInfo,
            pagination: {
              total: response.ResponseData.userInfo.total,
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
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeManager, payload);
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
            list: response.ResponseData.userInfo.data,
            // roles: response.Data.roleInfo,
            pagination: {
              total: response.ResponseData.userInfo.total,
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
    *addUserRole({ payload, callback }, { call, put }) {
      const response = yield call(addUserRole, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          notification['success']({
            // message: '操作成功',
            description: '操作成功',
            duration: 2
          });
          yield put({
            type: 'save',
            payload: response,
          });
        }
        if (callback) callback(response.ResponseState.toLowerCase());
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
  },
};
