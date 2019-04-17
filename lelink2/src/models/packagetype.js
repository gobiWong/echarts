// import { routerRedux } from 'dva/router';
// import { queryPackageType, submitPackageType, removePackageType } from '../services/api';
// import { notification } from 'antd';
// import { unauth_code } from '../utils/common';

// export default {
//   namespace: 'packagetype',

//   state: {
//     data: {
//       list: [],
//       pagination: {},
//     },
//   },

//   effects: {

//     *fetch({ payload }, { call, put }) {
//       const response = yield call(queryPackageType, payload);
//       if(response.ResponseCode != unauth_code){
//         if(response.ResponseState.toLowerCase() != 'success'){
//           notification['error']({
//             message: '操作提示',
//             description: response.ResponseMessage,
//             duration: 3
//           });
//         }else{
//           const result = {
//             list: response.Data.data,
//             pagination: {
//               total: response.Data.total,
//             },
//           };
//           yield put({
//             type: 'save',
//             payload: result,
//           });
//         }
//       }else{
//         localStorage.clear();
//         yield put(routerRedux.push(`/user/login`));
//       }

//     },

//     *submit({ payload, callback }, { call, put }) {
//       const response = yield call(submitPackageType, payload);
//       if(response.ResponseCode != unauth_code){
//         if(response.ResponseState.toLowerCase() != 'success'){
//           notification['error']({
//             message: '操作提示',
//             description: response.ResponseMessage,
//             duration: 3
//           });
//         }else{
  
//           notification['success']({
//             message: '操作提示',
//             description: response.ResponseMessage,
//             duration: 2
//           });
  
//           const result = {
//             list: response.Data.data,
//             pagination: {
//               total: response.Data.total,
//             },
//           };
  
//           yield put({
//             type: 'save',
//             payload: result,
//           });
  
//           if (callback) callback(response.ResponseState.toLowerCase());
  
//         }
//       }else{
//         localStorage.clear();
//         yield put(routerRedux.push(`/user/login`));
//       }

//     },

//     *remove({ payload, callback }, { call, put }) {
//       const response = yield call(removePackageType, payload);
//       if(response.ResponseCode != unauth_code){
//         if(response.ResponseState.toLowerCase() != 'success'){
//           notification['error']({
//             message: '操作提示',
//             description: response.ResponseMessage,
//             duration: 3
//           });
//         }else{
  
//           notification['success']({
//             message: '操作提示',
//             description: response.ResponseMessage,
//             duration: 2
//           });
  
//           const result = {
//             list: response.Data.data,
//             pagination: {
//               total: response.Data.total,
//             },
//           };
  
//           yield put({
//             type: 'save',
//             payload: result,
//           });
  
//           if (callback) callback();
  
//         }
//       }else{
//         localStorage.clear();
//         yield put(routerRedux.push(`/user/login`));
//       }
      
//     },
//   },

//   reducers: {
//     save(state, action) {
//       return {
//         ...state,
//         data: action.payload,
//       };
//     },
//   },
// };
