import {api_domain} from '../utils/common'
import request from '../utils/request'
import {getAccessToken} from '../utils/localstorage'

export async function addOperate(params){
    return request(api_domain+'operate',{
        method: 'POST',
        body: {
          params: {...params},
          accessToken: getAccessToken(),
          method: 'addOperate',
        }
    })
}
