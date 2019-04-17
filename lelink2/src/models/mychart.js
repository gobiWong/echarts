import { routerRedux } from 'dva/router';
import { fetchChartData } from '../services/api';
import { unauth_code } from '../utils/common';

export default {
  namespace: 'mychart',

  state: {
    packageTypeData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchChartData);
      if(response.ResponseCode != unauth_code){
        if(response.ResponseState.toLowerCase() != 'success'){
          notification['error']({
            message: '操作提示',
            description: response.ResponseMessage,
            duration: 3
          });
        }else{
          const result = {
            packageTypeData: response.Data
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

    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
      };
    },
  },
};
