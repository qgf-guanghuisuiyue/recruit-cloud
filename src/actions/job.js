import * as types from 'constants/job';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';
import axios from 'axios';

import {message , notification} from 'antd'; 

import isNumber from 'lodash/isNumber';

// 职位统计
const JOB_CATEGORY = {type:types.JOB_CATEGORY};
// 职位统计加载中
const LOAD_CATEGORY_START = {type:types.LOAD_CATEGORY_START};
const LOAD_CATEGORY_DONE = {type:types.LOAD_CATEGORY_DONE};
// 职位列表
const JOB_LIST = {type:types.JOB_LIST};
// 职位列表加载中
const LOAD_LIST_START = {type:types.LOAD_LIST_START};
const LOAD_LIST_DONE = {type:types.LOAD_LIST_DONE};
// 职位详细信息
const JOB_INFO = {type:types.JOB_INFO};
// 职位信息加载中
const LOAD_INFO_START = {type:types.LOAD_INFO_START};
const LOAD_INFO_DONE = {type:types.LOAD_INFO_DONE};

// 提前终止职位信息
const ABORT_JOB_START = {type:types.ABORT_JOB_START};
const ABORT_JOB_DONE = {type:types.ABORT_JOB_DONE};
const ABORT_JOB_INFO = {type:types.ABORT_JOB_INFO};

// 创建职位
const CREATE_JOB_START = {type:types.CREATE_JOB_START};
const CREATE_JOB_DONE = {type:types.CREATE_JOB_DONE};

// 职位信息MODAL
const SHOW_JOB_MODAL = {type:types.SHOW_JOB_MODAL};
const HIDE_JOB_MODAL = {type:types.HIDE_JOB_MODAL};

//职位发布成功MODAL
 const SHOW_SAVEJOB_MODAL = {type:types.SHOW_SAVEJOB_MODAL};
 const HIDE_SAVEJOB_MODAL = {type:types.HIDE_SAVEJOB_MODAL};
//清空职位信息数据
const RESET_FORM = {type:types.RESET_FORM}
//职位ID
const RESUMEID = {type:types.RESUMEID}
//清空职位ID
const CANCELLRESUMEID = {type:types.CANCELLRESUMEID}

//薪资查询MODAL
const SHOW_SALARY_MODAL = {type:types.SHOW_SALARY_MODAL};
const HIDE_SALARY_MODAL = {type:types.HIDE_SALARY_MODAL};

//薪资数据
const SALARYDATA = {type:types.SALARYDATA};
const CANCELSALARY = {type:types.CANCELSALARY};



// 获取职位分类统计
export const getJobCategory = () => (dispatch,getState) => {
    dispatch(LOAD_CATEGORY_START);
    AjaxByToken('PositionStatus',{
        head: {
            transcode: 'L0011'
        }
    })
    .then(res=>{
        dispatch(LOAD_CATEGORY_DONE);
        dispatch({...JOB_CATEGORY,categoryData:res});
    },err=>{
        dispatch(LOAD_CATEGORY_DONE);
    });
}

// 获取职位列表
export const getJobList = (data={}) => (dispatch,getState) => {
    if(isNumber(data.skip)) data.skip = data.skip + '';
    const uri = 'PositionQuery';
    cancelRequestByKey(uri);
    NProgress.start();
    dispatch(LOAD_LIST_START);
    AjaxByToken(uri,{
        head: {
            transcode: 'L0012'
        },
        data: {...data}
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        dispatch({...JOB_LIST,listData:res});
    },err=>{
        dispatch(LOAD_LIST_DONE);
    });
}

// 获取职位详细信息
export const getJobInfo = data => (dispatch,getState) => {
    dispatch(LOAD_INFO_START);
    AjaxByToken('lookposition',{
        head: {
            transcode: 'L0014'
        },
        data: data
    })
    .then(res=>{
        dispatch(LOAD_INFO_DONE);
        dispatch({...JOB_INFO,jobInfo:res.entity || {}});
    });
}
// 清空职位详细信息
export const resetForm = () => (dispatch,getState) => {
    dispatch(RESET_FORM);
}

// 提前终止职位信息
export const abortJobInfo = (data,getJobList,getJobCategory) => (dispatch,getState) => {
    if(!data.positionid) return ;
    /**
     * positionid 职位id
     */
    dispatch(ABORT_JOB_START);
    AjaxByToken('OnStopPosition',{
        head: {
            transcode: 'L0038'
        },
        data: data
    })
    .then(res=>{
        dispatch(ABORT_JOB_DONE);
        dispatch(HIDE_JOB_MODAL);
        getJobCategory();
        getJobList();
    },err=>{
        dispatch(ABORT_JOB_DONE);
    });
}
export const searchSalary = (jobpostids,functions,position) => (dispatch,getState) =>{
    $.ajax({
        url:"http://www.51jrq.com/vita/m/salary/findbyjob",
        //url:"http://192.168.1.251:8080/vita/m/salary/findbyjob",
        type:"post",
        data:{
            industry:jobpostids,
            functions:functions,
            positions:position
        },
        success: function(data) {
            if(JSON.parse(data).result){
                dispatch({...SALARYDATA,salaryData:JSON.parse(data).d.resultlist})
            }else{
                notification.error({
                    message:JSON.parse(data).msg
                })
            }
            
        },
        error: function(err) {
            console.log(err);
            notification.error({
                    message:"请求失败！"
                })
        }
    });
    
}
export const cancelSalary = () => (dispatch,getState) => {
    dispatch(CANCELSALARY);
}

// 创建职位
export const createJob = (data,context) => (dispatch,getState) => {
    NProgress.start();
    dispatch(CREATE_JOB_START);
    AjaxByToken('saveorupdateposition',{
        head: {
            transcode: 'L0013'
        },
        data: data
    })
    .then(res=>{
        if(context){
            context()
        }
        if(data.positionid){
            notification.success({
            message: '修改成功！'
            })
        }else{
            dispatch(SHOW_SAVEJOB_MODAL);
        } 
        dispatch(CREATE_JOB_DONE);
    },err=>{
        dispatch(CREATE_JOB_DONE);
    })
}

// 显示职位信息MODAL
export const showJobModal = () => (dispatch,getState) => {
    dispatch(SHOW_JOB_MODAL);
}

// 隐藏职位信息MODAL
export const hideJobModal = () => (dispatch,getState) => {
    dispatch(HIDE_JOB_MODAL);
}

// 显示保存职位信息MODAL
export const showSaveJobModal = () => (dispatch,getState) => {
    dispatch(SHOW_SAVEJOB_MODAL);
}

// 隐藏保存职位信息MODAL
export const hideSaveJobModal = () => (dispatch,getState) => {
    dispatch(HIDE_SAVEJOB_MODAL);
}

//获取职位ID
export const getResumeId = (data) => (dispatch,getState) => {
    dispatch({...RESUMEID,interview:data})
}

//清空职位ID
export const cancellResumeId = (data) => (dispatch,getState) => {
    dispatch({...CANCELLRESUMEID,interview:data})
}

// 显示薪资查询MODAL
export const showSalaryModal = (value) => (dispatch,getState) => {
    dispatch({...SHOW_SALARY_MODAL,positionSalary:value});
}

// 隐藏薪资查询MODAL
export const hideSalaryModal = () => (dispatch,getState) => {
    dispatch(HIDE_SALARY_MODAL);
}