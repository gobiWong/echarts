import { query as queryUsers, queryCurrent } from '../services/user';
import { getUserInfo } from '../utils/localstorage';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {

      //从localstorage中获取数据
      let userInfo = getUserInfo();
      if(userInfo){
        userInfo = JSON.parse(userInfo);
        let currentUser = {
          name: userInfo.userName,
          // avatar: avatar,
          //userid: '',
          //notifyCount: 0,
        };
  
        yield put({
          type: 'saveCurrentUser',
          payload: currentUser,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
