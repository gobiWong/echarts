import { routerRedux } from 'dva/router';
import { queryTestbase } from '../services/api';
import { unauth_code } from '../utils/common';

export default {
  //命名空间,相当于model的索引,根据命名空间可以找到页面对应的model
  namespace: 'wlist',
  //数据存储状态,用于被后台请求数据覆盖
  state: {
      list: [],
    //   tmsg: {tid:1,tname:'lwong.j',tage:184},
  },
  //处理所有的异步逻辑,将返回结果以Action的形式交给 reducer处理
  effects:{
      *fetch1({payload},{call,put}){
          const response = yield call(queryTestbase,payload)
          // console.log('model_wlist',response)
          yield put({
              type:'save',
              payload:response.data
          })
          
      }
  //补充:
  //调用service中所封装的后台接口,调用方式是Es6中的 generator函数,该函数使异步操作如同同步操作一样.
  //call回调函数相当于一个执行器,在call内部对generator进行处理
  },
  //处理所有的同步逻辑,将数据返回给页面
  reducers:{
    save(state,action){
        return {
            ...state,
            list:action.payload           
        }
    }  
  }
  
}
