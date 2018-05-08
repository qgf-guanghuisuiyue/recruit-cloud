import * as types from 'constants/login';
import {AjaxByToken} from 'utils/ajax';
import store from 'store';

export const userLoginout = (context) => (dispatch,getState) => {
    AjaxByToken('loginout',{
        head: {
            transcode: 'L0000'
        }
    })
    .then(res=>{
        store.remove('token')
        context.router.push('/login'); 
    });
}