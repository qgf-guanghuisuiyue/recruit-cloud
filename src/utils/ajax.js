import axios from 'axios';
import store from 'store';

// lodash
import merge from 'lodash/merge';
import omit from 'lodash/omit';

import { notification } from 'utils/antd';

const CancelToken = axios.CancelToken;
let cancel = [];

// let instance = axios.create({
//     timeout: 25000,
//     headers: {'Content-Type': 'application/json;charset=utf-8'},
// });

export const cancelRequest = function() {
    cancel.forEach(item=>{
        Object.keys(item).forEach(key=>{
            // /web/basicUserinfo请求不取消
            if(key.indexOf('basicUserinfo') === -1){
                item[key]('cancel request by change page!');
            }
        });
    });
    cancel = [];
}

export const cancelRequestByKey = function(key) {
    cancel.forEach(item=>{
        item[key] && item[key](`cancel request: ${key}!`);
    });
}

export const AjaxByPost = (uri, data) => {
    return new Promise(function(resolve, reject) {
        axios({
            url: `${prefixUri}/${uri}`,
            method: 'post',
            data: merge(data,{
                head:{
                    type:'h'
                }
            }),
            header: {
                contentType: 'application/json;charset=utf-8'
            },
            cancelToken: new CancelToken(function (c) {
                cancel.push({
                    [uri]: c
                });
            }),
            transformResponse(data,b){
                NProgress.done();
                try{
                    return JSON.parse(data);
                }catch(err){
                    // console.log(err);
                }
                
            }
        })
        .then(response => {
            const {data} = response;
            const { returnCode, returnMsg } = data;
            if (returnCode !== 'AAAAAAA') {
                if(returnMsg === '登录已失效,请重新登录' && returnCode === '0000005'){
                    cancelRequest();
                    store.remove('token');
                    location.href = `${location.origin}/#/login`;
                }
                // console.info(`${returnCode}:${returnMsg}`);
                notification.error(returnMsg);
                reject(response);
            } else {
                resolve(omit(data,['returnCode','returnMsg']));
            }
        })
        .catch(function(response,e) {
            // console.log(response.config);
            if (response instanceof Error) {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', response.message);
                reject(response);
                // reject(response);
                notification.error('网络错误',response.message);
            } else if(axios.isCancel(response)) {
                // console.info(response.message);
            } else {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(response.data);
                // console.log(response.status);
                // console.log(response.headers);
                // console.log(response.config);
            }
        })
    });
    
}
export const AjaxGetByResumeClient = (uri, data) => {
    return new Promise(function(resolve, reject) {
        alert(`${resumeUrl}${uri}`);
        axios({
            url: `${resumeUrl}${uri}`,
            method: 'get',
            params: data,
            header: {
                contentType: 'application/json;charset=utf-8'
            }
        })
        .then(response => {
            alert(123123)
            const {data} = response;
            //console.log(JSON.parse(response) )
            console.log(response)
        })
        .catch(function(response,e) {
            // // console.log(response.config);
            // if (response instanceof Error) {
            //     // Something happened in setting up the request that triggered an Error
            //     // console.log('Error', response.message);
            //     reject(response);
            //     // reject(response);
            //     notification.error('网络错误',response.message);
            // } else if(axios.isCancel(response)) {
            //     // console.info(response.message);
            // } else {
            //     // The request was made, but the server responded with a status code
            //     // that falls out of the range of 2xx
            //     // console.log(response.data);
            //     // console.log(response.status);
            //     // console.log(response.headers);
            //     // console.log(response.config);
            // }
        })
    });
    
}
export const AjaxByToken = (uri, data) => {
    // 获取本地存储的token
    const token = store.get('token');
    return AjaxByPost(uri, merge(data, { data: token }));
}
export const AjaxByGetByResumeClient = (uri, data) => {
    return AjaxGetByResumeClient(uri, merge(data));
}
