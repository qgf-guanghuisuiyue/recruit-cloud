import * as types from 'constants/resumeSearch';
import {AjaxByToken,cancelRequestByKey,AjaxByGetByResumeClient} from 'utils/ajax';
import axios from 'axios'

import {notification,Modal,message} from 'antd'; 

let defaultData = {};

// 简历查询
const RESUME_SEARCH = {type:types.RESUME_SEARCH};
// 个人简历详情
const RESUME_DETAIL = {type:types.RESUME_DETAIL};
// 请求开始显示loading
const RESUME_SEARCH_START = {type:types.RESUME_SEARCH_START};
const RESUME_SEARCH_DONE = {type:types.RESUME_SEARCH_DONE};
// 清空简历详情
const CLEAR_RESUME_DETAIL_DATA = {type:types.CLEAR_RESUME_DETAIL_DATA};
const CLEAR_RESUME_DATA = {type:types.CLEAR_RESUME_DATA};
//查看详情loading
const VIEW_DETAILS_START = {type:types.VIEW_DETAILS_START};
const VIEW_DETAILS_DONE = {type:types.VIEW_DETAILS_DONE};
//简历数量
const DOWNLOAD_NUM = {type:types.DOWNLOAD_NUM}
//是否收藏
const ISCOLLECT = {type:types.ISCOLLECT};
const NOCOLLECT = {type:types.NOCOLLECT}


    //搜索简历
    export const searchResume = (data) => (dispatch,getState) => {
        NProgress.start();
        dispatch({...RESUME_SEARCH_START})
        axios({
            url: `${resumeUrl}/client/queryResume`,
            method: 'get',
            params:data
        })
        .then(res=>{
            if(res.data.result){
                dispatch({...RESUME_SEARCH_DONE})
                dispatch({...RESUME_SEARCH,resumeData:res.data.data,totalHits:res.data.totalHits})
            }else{
                dispatch({...RESUME_SEARCH_DONE})
                Modal.info({
                    className:"searchTip",
                    title: '哎呦不巧，网页君神游外太空去了，您稍后刷新再试试~~',
                });
            }
            NProgress.done();
        }).catch(error=>{
            console.log(error)
        });
    }
    //查询简历详情
    export const searchResumeDetail = (data) => (dispatch,getState) => {
        //NProgress.start();
        dispatch({...VIEW_DETAILS_START})
        axios({
            url: `${resumeUrl}/client/viewResume`,
            method: 'post',
            data:data
        })
        .then(res=>{
            if(res.data.result){
                dispatch({...RESUME_DETAIL,resumeDetailData:res.data.data,isView:res.data.isView})
            }else{
                dispatch({...VIEW_DETAILS_DONE});
                console.log(res.data.msg)
            }
            //NProgress.done();
        }).catch(error=>{
            console.log(error)
        });
    }
    //清空简历详情数据
    export const clearResumeDetailData = () => (dispatch,getState) => {
        dispatch({...CLEAR_RESUME_DETAIL_DATA})
    }
    //清空简历列表数据
    export const clearResumeListData = () => (dispatch,getState) => {
        dispatch({...CLEAR_RESUME_DATA})
    }

    //下载简历
    export const downLoadResume = (data,searchResumeDetail) => (dispatch,getState) => {
        NProgress.start();
        axios({
            url: `${resumeUrl}/client/downResume`,
            method: 'post',
            data:data
        })
        .then(res=>{
            if(res.data.result){
                message.success("下载成功！");
                searchResumeDetail(data)
            }else{
                message.success(`${res.data.msg}`);
            }
            NProgress.done();
        }).catch(error=>{
            console.log(error)
        });
    };
    //获取已下载的简历列表
   export const downLoadResumeList = (data) => (dispatch,getState) => {
        NProgress.start();
        dispatch({...RESUME_SEARCH_START})
        axios({
                url: `${resumeUrl}/client/viewResumeInfoList`,
                method: 'post',
                data:data
        })
        .then(res=>{
            dispatch({...RESUME_SEARCH_DONE});
            dispatch({...RESUME_SEARCH,resumeData:res.data.data,totalHits:res.data.totalHits});
            NProgress.done();
        }).catch(error=>{
            dispatch({...RESUME_SEARCH_DONE})
            console.log(error)
        });
   }
   //添加收藏
   export const collectResume = (data) => (dispatch,getState) => {
        NProgress.start();
        axios({
            url: `${resumeUrl}/client/addCollection`,
            method: 'post',
            data:data
        })
        .then(res=>{
            message.success(res.data.msg);
            NProgress.done();
            dispatch({...NOCOLLECT})
        }).catch(error=>{
            console.log(error)
        });
   }
   //获取已收藏简历列表
   export const collectResumeList = (data) => (dispatch,getState) => {
        NProgress.start();
        dispatch({...RESUME_SEARCH_START})
        axios({
                url: `${resumeUrl}/client/collectionList`,
                method: 'post',
                data:data
        })
        .then(res=>{
            NProgress.done();
            dispatch({...RESUME_SEARCH_DONE});
            dispatch({...RESUME_SEARCH,resumeData:res.data.data,totalHits:res.data.totalHits})
        }).catch(error=>{
            console.log(error)
        });
   }
   //删除收藏
   export const deleteCollectResume = (data,collectResumeList,sorKey) => (dispatch,getState) => {
        axios({
            url: `${resumeUrl}/client/delCollection`,
            method: 'post',
            data:data
        })
        .then(res=>{
            message.success(res.data.msg);
            //重新获取收藏简历列表
            if(collectResumeList && sorKey){
                collectResumeList({sorKey})
            } 
            dispatch({...ISCOLLECT})
        }).catch(error=>{
            console.log(error)
        });
   }
   //获取用户合同数量
   export const getRemainedDownloadNum = (data) => (dispatch,getState) => {
        axios({
            url: `${resumeUrl}/client/viewContract`,
            method: 'post',
            data:data
        })
        .then(res=>{
            if(res.data.result){
                dispatch({...DOWNLOAD_NUM,contract_count:res.data.contract_count})
            }
        }).catch(error=>{
            console.log(error)
        });
   }