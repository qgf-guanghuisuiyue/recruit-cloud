import * as types from 'constants/email';
import axios from 'axios';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

import {message} from 'antd';

// 获取历史邮件列表
const GET_HISTORY_START = {type:types.GET_HISTORY_START};
const GET_HISTORY_END = {type:types.GET_HISTORY_END};
const GET_EMAIL_HISTORY = {type:types.GET_EMAIL_HISTORY};

// 获取人员信息邮件历史记录
const GET_PERSON_INFO_HISTORY_RECORD = {type:types.GET_PERSON_INFO_HISTORY_RECORD};

// 发送邮件
const SEND_EMAIL_START = {type:types.SEND_EMAIL_START};
const SEND_EMAIL_DONE = {type:types.SEND_EMAIL_DONE};

// 上传附件MODAL
const SHOW_UPLOAD_MODAL = {type:types.SHOW_UPLOAD_MODAL};
const HIDE_UPLOAD_MODAL = {type:types.HIDE_UPLOAD_MODAL};

// 重置附件列表
const RESET_FILELIST_TRUE = {type:types.RESET_FILELIST_TRUE};
const RESET_FILELIST_FALSE = {type:types.RESET_FILELIST_FALSE};

// 发送邮件弹框
const SHOW_EMAIL_MODAL = {type:types.SHOW_EMAIL_MODAL};
const HIDE_EMAIL_MODAL = {type:types.HIDE_EMAIL_MODAL};

// 显示发送邮件MODAL
export const showEmailModal = () => (dispatch,getState) => {
    dispatch(SHOW_EMAIL_MODAL);
}
// 隐藏发送邮件MODAL
export const hideEmailModal = () => (dispatch,getState) => {
    dispatch(HIDE_EMAIL_MODAL);
}

// 获取历史邮件列表
export const getEmailHistory = (data={}) => (dispatch,getState) => {
    dispatch(GET_HISTORY_START);
    AjaxByToken('talentStatis',{
        head: {
            transcode: 'L0028'
        },
        data: data
    })
    .then(res=>{
        dispatch(GET_HISTORY_END);
        dispatch({...GET_EMAIL_HISTORY,list:res.list});
    },err=>{
        dispatch(GET_HISTORY_END);
        dispatch({...GET_EMAIL_HISTORY,list:[]});
    });
}

// 查询人员信息邮件历史记录
export const getEmailBoxDetail = data => (dispatch,getState) => {
    let uri = 'mailBoxDetail';
    cancelRequestByKey(uri);
    AjaxByToken(uri,{
        head: {
            transcode: 'L0029'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_PERSON_INFO_HISTORY_RECORD,personHistoryList:res.list});
    });
}

export const resetEmailBoxDetail = () => (dispatch,getState) => {
    dispatch({...GET_PERSON_INFO_HISTORY_RECORD,personHistoryList:[]});
}

//修改简历邮箱
export const updateResumeEmail = (data,props) => (dispatch,getState) => {
    AjaxByToken("updateResumeEmail",{
        head: {
            transcode: 'L0073'
        },
        data: data
    })
    .then(res=>{
        const {getRecruitResumeInfo , addressee} = props,
            {logId , resumeid} = addressee;
       // 得到招聘流程人员详细信息(根据简历resumeId和流程logId)
        getRecruitResumeInfo({
                    resumeId: resumeid,
                    logId: logId
                })
        message.success('邮箱修改成功！')
    },err=>{
        message.error('邮箱修改失败！');
    });
}

// 发送邮件
export const sendEmail = (data,fileList,reSetTitle=()=>{},reSetHTML=()=>{},getEmailBoxDetail) => (dispatch,getState) => {
    dispatch(SEND_EMAIL_START);
    AjaxByToken('sendEmail',{
        head: {
            transcode: 'L0021'
        },
        data: data
    })
    .then(res=>{
        dispatch(SEND_EMAIL_DONE);
        message.success('发送邮件成功！');
        // 重置邮件主题
        reSetTitle('');
        // 重置邮件内容
        reSetHTML();
        // 重新获取个人信息邮件历史列表
        const {resumeid,positionid} = data;
        getEmailBoxDetail({resumeid,positionid});
        // 批量删除上传的附件
        let requestArr = [];
        fileList.forEach(item=>{
            const {response} = item;
            let fd = new FormData();
            fd.append('fileName',response.filePath);
            requestArr.push(
                axios.post(`${prefixUri}/uploadremove`,fd)
            );
        });
        axios.all(requestArr)
        .then(axios.spread(function () {
            // 上面请求都完成后，才执行这个回调方法
            // 重置上传附件列表
            dispatch(RESET_FILELIST_TRUE);
        }));
    },err=>{
        dispatch(SEND_EMAIL_DONE);
        message.error('发送邮件失败！');
    });
}

export const resetFileListFalse = () => (dispatch,getState) => {
    dispatch(RESET_FILELIST_FALSE);
}

// 显示上传附件MODAL
export const showUploadModal = () => (dispatch,getState) => {
    dispatch(SHOW_UPLOAD_MODAL);
}
// 隐藏上传附件MODAL
export const hideUploadModal = () => (dispatch,getState) => {
    dispatch(HIDE_UPLOAD_MODAL);
}