import * as types from 'constants/user';
import {AjaxByToken} from 'utils/ajax';
import { message } from 'antd';

// 获取用户基本信息
const GET_USER_INFO = {type:types.GET_USER_INFO};

// 获取用户邮箱配置基本信息
const GET_USER_EMAIL_INFO = {type:types.GET_USER_EMAIL_INFO};
const GET_USER_RESUMEEMAIL_INFO = {type:types.GET_USER_RESUMEEMAIL_INFO};

// 用户修改密码
const CHANGE_PASSWD_START = {type:types.CHANGE_PASSWD_START};
const CHANGE_PASSWD_DONE = {type:types.CHANGE_PASSWD_DONE};
const CHANGE_PASSWD = {type:types.CHANGE_PASSWD};
const CHANGE_RES_FALSE = {type:types.CHANGE_RES_FALSE};

// 获取用户基本信息
export const getUserInfo = () => (dispatch,getState) => {
    AjaxByToken('basicUserinfo',{
        head: {
            transcode: 'L0006'
        }
    })
    .then(res=>{
        dispatch({...GET_USER_INFO,userInfo:res});
    });
}

// 获取用户邮箱信息
export const getUserEmail = () => (dispatch,getState) => {
    AjaxByToken('toConnectMail',{
        head: {
            transcode: 'L0003'
        }
    })
    .then(res=>{
        dispatch({...GET_USER_EMAIL_INFO,userEmailInfo:res});
    });
}
// 获取简历邮箱信息
export const getResumeEmail = () => (dispatch,getState) => {
    AjaxByToken('importEmail/API_AUTO_IMPORT_MAIL_RESUMEINFO_LIST',{
        head: {
            transcode: 'L0071'
        }
    })
    .then(res=>{
        dispatch({...GET_USER_RESUMEEMAIL_INFO,resumeEmailInfo:res});
    });
}

//修改、添加简历邮箱配置
export const changeResumeEmailSetting = (data) => (dispatch,getState) => {
    AjaxByToken('importEmail/API_AUTO_IMPORT_MAIL_RESUMEINFOS_UPDATE',{
        head: {
            transcode: 'L0072'
        },
        data: data
    })
    .then(res=>{
        NProgress.done();
        message.success('配置邮箱成功！');
        // dispatch({...GET_USER_EMAIL_INFO,userEmailInfo:res});
    });
}

// 修改邮箱配置
export const changeEmailSetting = (data) => (dispatch,getState) => {
    AjaxByToken('changeMailPwd',{
        head: {
            transcode: 'L0004'
        },
        data: data
    })
    .then(res=>{
        NProgress.done();
        message.success('配置邮箱成功！');
        // dispatch({...GET_USER_EMAIL_INFO,userEmailInfo:res});
    });
}

// 修改密码
export const changePassWd = (data={}) => (dispatch,getState) => {
    // NProgress.start();
    dispatch(CHANGE_PASSWD_START);
    AjaxByToken('changepwd',{
        head: {
            transcode: 'L0002'
        },
        data: data
    })
    .then(res=>{
        dispatch(CHANGE_PASSWD_DONE);
        message.success('修改密码成功！');
        dispatch(CHANGE_PASSWD);
    },err=>{
        dispatch(CHANGE_PASSWD_DONE);
        message.error('修改密码失败！');
    });
}

export const changeResFalse = () => (dispatch,getState) => {
    dispatch(CHANGE_RES_FALSE);
}