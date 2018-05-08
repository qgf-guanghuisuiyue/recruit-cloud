import * as types from 'constants/recruit';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

import {notification} from 'antd'; 

let defaultData = {};

// 开始请求分类统计信息
const LOAD_CATEGORY_START = {type:types.LOAD_CATEGORY_START};
// 请求分类统计信息结束
const LOAD_CATEGORY_DONE = {type:types.LOAD_CATEGORY_DONE};
// 获取招聘分类统计信息
const LOAD_RECRUIT_CATEGORY = {type:types.LOAD_RECRUIT_CATEGORY};
// 开始请求列表
const LOAD_LIST_START = {type:types.LOAD_LIST_START};
// 结束请求列表
const LOAD_LIST_DONE = {type:types.LOAD_LIST_DONE};
// 招聘人员信息列表
const LOAD_RECRUIT_LIST = {type:types.LOAD_RECRUIT_LIST};

// 导入简历职位推荐列表
const LOAD_RECOMMEND_START = {type:types.LOAD_RECOMMEND_START};
const LOAD_RECOMMEND_DONE = {type:types.LOAD_RECOMMEND_DONE};
const LOAD_RECOMMEND_LIST = {type:types.LOAD_RECOMMEND_LIST};

// ==== MODAL ====
// 显示详细信息MODAL
const SHOW_INFO_MODAL = {type:types.SHOW_INFO_MODAL};
// 隐藏详细信息MODAL
const HIDE_INFO_MODAL = {type:types.HIDE_INFO_MODAL};

// 显示上传简历MODAL
const SHOW_UPLOAD_MODAL = {type:types.SHOW_UPLOAD_MODAL};
// 隐藏上传简历MODAL
const HIDE_UPLOAD_MODAL = {type:types.HIDE_UPLOAD_MODAL};

// 开始上传简历
const UPLOAD_RESUME_START = {type:types.UPLOAD_RESUME_START};
const UPLOAD_RESUME_DONE = {type:types.UPLOAD_RESUME_DONE};
const SET_RESETFORM_TRUE = {type:types.SET_RESETFORM_TRUE};
const SET_RESETFORM_FALSE = {type:types.SET_RESETFORM_FALSE};

// 显示推荐职位MODAL
const SHOW_RECOMMEND_MODAL = {type:types.SHOW_RECOMMEND_MODAL};
// 隐藏推荐职位MODAL
const HIDE_RECOMMEND_MODAL = {type:types.HIDE_RECOMMEND_MODAL};

// 从职位列表中选择职位
const SELECT_POSITION = {type: types.SELECT_POSITION};

export const getRecruitCategory = () => (dispatch,getState) => {
    dispatch(LOAD_CATEGORY_START);
    AjaxByToken('jobclassCount',{
        head: {
            transcode: 'L0015'
        }
    })
    .then(res=>{
        dispatch(LOAD_CATEGORY_DONE);
        dispatch({...LOAD_RECRUIT_CATEGORY,categoryData:res.list});
    },err=>{
        dispatch(LOAD_CATEGORY_DONE);
    });
}

export const getRecruitList = (data=defaultData) => (dispatch,getState) => {
    data.skip = data.skip + '';
    defaultData = {...data,count: '20'};
    const uri = 'queryResume';
    cancelRequestByKey(uri);
    dispatch(LOAD_LIST_START);
    AjaxByToken(uri,{
        head: {
            transcode: 'L0016',
        },
        data: defaultData
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        dispatch({...LOAD_RECRUIT_LIST,recruitList:res});
    },err=>{
        dispatch(LOAD_LIST_DONE);
        // dispatch({...LOAD_RECRUIT_LIST,recruitList:{count:0,list:[]}});
    });
}

// 上传简历
export const uploadResume = (data,props) => (dispatch,getState) => {
    dispatch(UPLOAD_RESUME_START);
    AjaxByToken('resumeUpload',{
        head: {
            transcode: 'L0030',
        },
        data: data
    })
    .then(res=>{
        dispatch(UPLOAD_RESUME_DONE);
        notification.success({
            message: '提示',
            description: '简历导入成功！'
        });
        dispatch(SET_RESETFORM_TRUE);
        setTimeout(()=>{
            dispatch(HIDE_UPLOAD_MODAL);
        },500);
        const {getRecruitList} = props;
        getRecruitList({stageid:'0',skip:'0',range:'2'});
    },err=>{
        dispatch(UPLOAD_RESUME_DONE);
    });
}

export const setResetFormFalse = () => (dispatch,getState) => {
    dispatch(SET_RESETFORM_FALSE);
}

// 导入简历选择职位列表接口
export const getRecommendRecruit= data => (dispatch,getState) => {
    data.skip = data.skip + '';
    const uri = 'listPositioninfo';
    cancelRequestByKey(uri);
    dispatch(LOAD_RECOMMEND_START);
    AjaxByToken(uri,{
        head: {
            transcode: 'L0018',
        },
        data: {...data,count: '10'}
    })
    .then(res=>{
        dispatch(LOAD_RECOMMEND_DONE);
        dispatch({...LOAD_RECOMMEND_LIST,data:res});
    });
}

// 从职位推荐列表中选择职位
export const selectPosition = data => (dispatch,getState) => {
    dispatch({...SELECT_POSITION,position:data})
}


// 显示简历信息Modal
export const showResumeModal = (data) => (dispatch,getState) => {
    dispatch({...SHOW_INFO_MODAL,uriParams:data});
}
// 隐藏简历信息Modal
export const hideResumeModal = () => (dispatch,getState) => {
    dispatch(HIDE_INFO_MODAL);
}

// 显示上传简历MODAL
export const showUploadModal = () => (dispatch,getState) => {
    dispatch(SHOW_UPLOAD_MODAL);
}
// 隐藏上传简历MODAL
export const hideUploadModal = () => (dispatch,getState) => {
 dispatch(HIDE_UPLOAD_MODAL);
    dispatch(SET_RESETFORM_TRUE);
}

// 显示推荐职位MODAL
export const showRecommendModal = () => (dispatch,getState) => {
    dispatch(SHOW_RECOMMEND_MODAL);
}
// 隐藏推荐职位MODAL
export const hideRecommendModal = () => (dispatch,getState) => {
    dispatch(HIDE_RECOMMEND_MODAL);
}