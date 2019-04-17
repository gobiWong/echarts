import { routerRedux } from 'dva/router';
import { fetchVosInfo } from '../services/api';
import { notification } from 'antd';
import { unauth_code } from '../utils/common';

export default {
  namespace: 'vos',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {

    *fetchVosInfo({ payload }, { call, put }) {
      const response = yield call(fetchVosInfo, payload);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            list: response.Data.vosInfo.data,
            pagination: {
              total: response.Data.vosInfo.total,
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

    // *addVos({ payload, callback }, { call, put }) {
    //   const response = yield call(addVosServer, payload);
    //   if(response.ResponseCode != unauth_code){
    //     if(response.ResponseState.toLowerCase() != 'success'){
    //       notification['error']({
    //         message: '操作提示',
    //         description: response.ResponseMessage,
    //         duration: 3
    //       });
    //     }else{
  
    //       notification['success']({
    //         message: '操作提示',
    //         description: response.ResponseMessage,
    //         duration: 2
    //       });
  
    //       const result = {
    //         list: response.Data.vosInfo.data,
    //         pagination: {
    //           total: response.Data.vosInfo.total,
    //         },
    //       };
  
    //       yield put({
    //         type: 'save',
    //         payload: result,
    //       });
  
    //     }

    //     if (callback) callback(response.ResponseState.toLowerCase());

    //   }else{
    //     localStorage.clear();
    //     yield put(routerRedux.push(`/user/login`));
    //   }

    // },

    // *removeVos({ payload, callback }, { call, put }) {
    //   const response = yield call(deleteVosServer, payload);
    //   if(response.ResponseCode != unauth_code){
    //     if(response.ResponseState.toLowerCase() != 'success'){
    //       notification['error']({
    //         message: '操作提示',
    //         description: response.ResponseMessage,
    //         duration: 3
    //       });
    //     }else{
  
    //       notification['success']({
    //         message: '操作提示',
    //         description: response.ResponseMessage,
    //         duration: 2
    //       });
  
    //       const result = {
    //         list: response.Data.vosInfo.data,
    //         pagination: {
    //           total: response.Data.vosInfo.total,
    //         },
    //       };
  
    //       yield put({
    //         type: 'save',
    //         payload: result,
    //       });
  
    //       if (callback) callback();
  
    //     }
    //   }else{
    //     localStorage.clear();
    //     yield put(routerRedux.push(`/user/login`));
    //   }
      
    // },

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
