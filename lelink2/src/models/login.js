import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, accountLogout} from '../services/login';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';
import { setUserInfo, setAccessToken,getUserInfo,getAccessToken } from '../utils/localstorage';
import { notification } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },
//4.登入处理逻辑
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      if(response.ResponseState.toLowerCase() != 'success'){

        notification['error']({
          message: '操作提示',
          description: response.ResponseMessage,
          duration: 3
        });

      }else{

        notification['success']({
          message: '操作提示',
          description: response.ResponseMessage,
          duration: 2
        });


        let result = {
          status: response.ResponseState,
          // type: response.Data.loginType,
          currentAuthority: response.ResponseData.currentAuthority,
        };


        //授权
        yield put({
          type: 'changeLoginStatus',
          payload: result,
        });

        //将accesstokne和userinfo存入localstorage
        setUserInfo(JSON.stringify(response.ResponseData));
        setAccessToken(response.ResponseData.accessToken);

        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));

      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
   

  },


  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
      };
    },
  },

};
