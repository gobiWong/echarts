// import { routerRedux } from 'dva/router';
// import { queryTableAuthorize, queryTableAuthRole, submitTableAuthorize } from '../services/api';
// import { notification } from 'antd';
// import { unauth_code } from '../utils/common';


// export default {
//     namespace: 'tableauthorize',

//     state: {
//         data: {
//             list: [],
//             tableRoles: [],
//         }
//     },

//     effects: {

//         *fetchRole({payload},{call, put}){
//             const response = yield call(queryTableAuthRole, payload);
//             if(response.ResponseCode != unauth_code){
//                 if(response.ResponseState.toLowerCase() != 'success'){
//                   notification['error']({
//                     message: '操作提示',
//                     description: response.ResponseMessage,
//                     duration: 3
//                   });
//                 }else{
//                   const result = {
//                     tableRoles: response.Data.tableRoleInfo,
//                   };
//                   yield put({
//                     type: 'save',
//                     payload: result,
//                   });
//                 }
                
//               }else{
//                 localStorage.clear();
//                 yield put(routerRedux.push(`/user/login`));
//               }
//         },


//         *fetchField({payload, callback},{call, put}){
//             const response = yield call(queryTableAuthorize, payload);
//             if(response.ResponseCode != unauth_code){
//                 if(response.ResponseState.toLowerCase() != 'success'){
//                   notification['error']({
//                     message: '操作提示',
//                     description: response.ResponseMessage,
//                     duration: 3
//                   });
//                 }else{
//                   const result = {
//                     defaultFields: response.Data.tableFieldInfo,
//                   };
//                   if (callback) callback(result);
//                 //   yield put({
//                 //     type: 'save',
//                 //     payload: result,
//                 //   });
//                 }
                
//               }else{
//                 localStorage.clear();
//                 yield put(routerRedux.push(`/user/login`));
//               }
//         },


//         *submit({payload},{call, put}){
//             const response = yield call(submitTableAuthorize, payload);
//             if(response.ResponseCode != unauth_code){
//                 if(response.ResponseState.toLowerCase() != 'success'){
//                     notification['error']({
//                         message: '操作提示',
//                         description: response.ResponseMessage,
//                         duration: 3
//                     });
//                 }else{
//                     notification['success']({
//                         message: '操作提示',
//                         description: response.ResponseMessage,
//                         duration: 2
//                     });
//                     // const result = {
//                     //     tableRoles: response.Data.tableRoleInfo,
//                     // };
//                     // yield put({
//                     //     type: 'save',
//                     //     payload: result,
//                     // });
//                 }
                
//               }else{
//                     localStorage.clear();
//                     yield put(routerRedux.push(`/user/login`));
//               }
//         }



//     },

//     reducers: {
//         save(state, action) {
//           return {
//             ...state,
//             data: action.payload,
//           };
//         },
//     },

// }