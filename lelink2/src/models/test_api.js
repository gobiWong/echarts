import { addOperate } from '../services/test_api'
export default {
    namespace: 'test_api',
    state: {
            api_list: [2,4,6],
            api_obj:{}   
        
    },
    effects:{
        *test({payload},{call,put}){
            console.log(111)
            console.log(payload)
        const result= yield call(addOperate,payload)
        console.log(result,"11121")
        
            yield put({
                type:'save',
                payload:result
            })
        }
    },
    reducers:{
        save(state,{payload}){
            return {
                ...state,
                ...payload
                //api_list:action.payload
            }
        }
    }
}