import { routerRedux } from 'dva/router';
//导入本地模拟数据api
import { fetchList, removeList, addList } from '../services/api';
//导入线上api请求
import { addNewequipment, fetchEquipment, editEquipment, removeEquipment } from '../services/equipmentList';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';
export default {
  namespace: 'equipmentList',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchEquipment({ payload }, { call, put }) {
      console.log(payload,'21221')
      const response = yield call(fetchEquipment, payload);
      if (response.ResponseCode != unauth_code) {
        if (response.ResponseState.toLowerCase() != 'success') {
          notification['error']({
            message: '操作提示123',
            description: response.ResponseMessage,
            duration: 3
          });
        } else {
          console.log(response,"res")
          const result = {
            list: response.Data.equipmentInfo.data,
            pagination: {
              total: response.Data.equipmentInfo.total,
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
    *editEquipment({ payload, callback }, { call, put }) {
      console.log('editEquipment',payload)
      const response = yield call(editEquipment, payload);
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
            list: response.Data.equipmentInfo.data,
            pagination: {
              total: response.Data.equipmentInfo.total,
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
    *removeEquipment({ payload, callback }, { call, put }) {
      const response = yield call(removeEquipment, payload);
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
            list: response.Data.equipmentInfo.data,
            pagination: {
              total: response.Data.equipmentInfo.total,
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
    // 灬新增设备线上接口
    *addNewequipment({ payload, callback }, { call, put }){
      const response = yield call(addNewequipment, payload);
      console.log(response,'11111')
      if(response.ResponseCode!=unauth_code){
        if(response.ResponseState.toLowerCase()!='success'){
          //灬如果请求失败,给个失败提示
          notification['error']({
            message: '操作有误!',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          //灬1.给个成功提示信息
          notification['success']({
            message: '操作成功!',
            description: response.ResponseMessage,
            duration: 2
          });
          //灬2.存储数据结果集
          const result = {
            list: response.Data.equipmentInfo.data,
            pagination: {
              total: response.Data.equipmentInfo.total,
            },
          };
          //灬3.把数据放在put 定义类型type为 'save'的函数方法中
          yield put({
            type: 'save',
            payload: result,
          });
        }
        //灬如果回调,给个回调处理逻辑
        if (callback) callback(response.ResponseState.toLowerCase());
      }else{
        localStorage.clear();
        yield put(routerRedux.push(`/user/login`))
      }
    }
  },
  //灬所有model数据统一处理,页面通过命名空间找到对应model数据
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
