import * as types from 'constants/home';
import {AjaxByToken} from 'utils/ajax';
import { message } from "antd"
import store from 'store';
import {notification} from 'antd';

// 紧急任务
const URGENT_TASKS = {type:types.URGENT_TASKS};
// 获取简历入库情况
const RESUME = {type:types.RESUME};
//获取简历份数
const RESUMEACCOUNT = {type:types.RESUMEACCOUNT};
// 获取任务完成指数
const TASK_PROGRESS = {type:types.TASK_PROGRESS};
// 待入职人员列表
const GET_ENTRY_START = {type:types.GET_ENTRY_START};
const GET_ENTRY_DONE = {type:types.GET_ENTRY_DONE};
const GET_ENTRY_LIST = {type:types.GET_ENTRY_LIST};

//添加备忘录MODAL
const SHOW_MEMO_MODAL = {type:types.SHOW_MEMO_MODAL};
const HIDE_MEMO_MODAL = {type:types.HIDE_MEMO_MODAL};
//添加备忘录内容
const ADD_MEMO_EVENT = {type:types.ADD_MEMO_EVENT};
//获取备忘录内容
const GET_MEMO_CONTENT = { type:types.GET_MEMO_CONTENT};
//获取具体日期备忘录
const GET_DATE_MEMO_CONTENT = {type:types.GET_DATE_MEMO_CONTENT};
//视频
const GET_VIDEO = {type:types.GET_VIDEO}

// 获取紧急任务
export const getUrgentTasks = (data={}) => (dispatch,getState) => {
    AjaxByToken('UrgentTasks',{
        head: {
            transcode: 'L0007'
        },
        data: data
    })
    .then(res=>{
        dispatch({...URGENT_TASKS,urgentTasks:res.list});
    },err=>{
        dispatch({...URGENT_TASKS,urgentTasks:[]});
    });
}

//添加备忘录内容
export const addMemoContent = (data={},props,onDateMM) => (dispatch,getState) => {
    AjaxByToken('employeeinfo/memosEdit',{
        head: {
            transcode: 'L0067'
        },
        data: data
    })
    .then(res=>{
        //添加成功后获取
        const {getMemoContent} = props;
        getMemoContent(onDateMM);
        notification.success({message: '添加备忘录成功'});
    },err=>{
        notification.error({message: '添加备忘录失败'});
    });
}
//获取备忘录内容
export const getMemoContent = (data) => (dispatch,getState) => {
    AjaxByToken('employeeinfo/memosList',{
        head: {
            transcode: 'L0068'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_MEMO_CONTENT,MemoContent:res.result});
    },err=>{
        notification.error({message:'获取备忘录失败'});
        dispatch({...GET_MEMO_CONTENT,MemoContent:[]});
    });
}
//获取具体日期备忘录
export const getDateMemoContent = (data) => (dispatch,getState) => {
    AjaxByToken('employeeinfo/memosList',{
        head: {
            transcode: 'L0068'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_DATE_MEMO_CONTENT,DateMemoContent:res.result});
    },err=>{
        message.error(`${data.onDate}备忘录获取失败`);
        dispatch({...GET_DATE_MEMO_CONTENT,DateMemoContent:[]});
    });
}

// 获取简历入库情况
export const resumeWareHousing = (latestDays=7) => (dispatch,getState) => {
    AjaxByToken('ResumeWareHousing',{
        head: {
            transcode: 'L0008'
        },
        data: {
            latestDays: latestDays + ''
        }
    })
    .then(res=>{
        dispatch({...RESUME,resumeData:res});
    },err=>{
        notification.error({message:returnMsg});
        dispatch({...RESUME,resumeData:{content:[]}});
    });
}

//获取简历入库份数
export const resumeAccount = (keyTime) => (dispatch,getState) => {
    AjaxByToken('ResumeAccount',{
        head: {
            transcode: 'L0069'
        },
        data: {
            keyTime: "30" 
        }
    })
    .then(res=>{
        dispatch({...RESUMEACCOUNT,resumeCount:res});
    },err=>{
        dispatch({...RESUMEACCOUNT,resumeCount:{}});
    })
}

// 获取任务完成指数
export const getTaskProgress = (latestDays) => (dispatch,getState) => {
    AjaxByToken('TaskCompletion',{
        head: {
            transcode: 'L0009'
        },
        data: {
            latestDays: latestDays + '' //将数字转化为字符串
        }
    })
    .then(res=>{
        dispatch({...TASK_PROGRESS,taskProgress:res.content});
    },err=>{
        dispatch({...TASK_PROGRESS,taskProgress:[1]});
    });
}

// 获取待入职人员列表
export const getEntryPerson = (data={}) => (dispatch,getState) => {
    dispatch(GET_ENTRY_START);
    AjaxByToken('home_personnelList',{
        head: {
            transcode: 'L0010'
        },
        data: data
    })
    .then(res=>{
        dispatch(GET_ENTRY_DONE);
        dispatch({...GET_ENTRY_LIST,entryPersonList:res.content});
    },err=>{
        dispatch(GET_ENTRY_DONE);
        dispatch({...GET_ENTRY_LIST,entryPersonList:[]});
    });
}

// 重置待入职人员列表
export const resetEntryPerson = () => (dispatch,getState) => {
    dispatch({...GET_ENTRY_LIST,entryPersonList:[]});
}

// 显示添加备忘录MODAL
export const showMemoModal = () => (dispatch,getState) => {
    dispatch(SHOW_MEMO_MODAL);
}

// 隐藏添加备忘录MODAL
export const hideMemoModal = () => (dispatch,getState) => {
    dispatch(HIDE_MEMO_MODAL);
}

//视频编辑
export const editVideo = (data) => (dispatch,getState) => {
    AjaxByToken('structure/companyVideo',{
        head: {
            transcode: 'L0086'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_VIDEO,video:res.video});
        const{type} = data;
        if(type=="1"){
            notification.success({message: '成功添加企业视频'});
        }else if(type=="2"){
            notification.success({message: '成功修改企业视频'});
        }else if(type=="3"){
            notification.success({message: '成功删除企业视频'});
        }
    },err=>{
       console.log(err)
    });
}