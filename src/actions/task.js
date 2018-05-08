import * as types from 'constants/task.js';

// download
import axios from 'axios';
import store from 'store';
// import FileSaver from 'file-saver';

import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';
import moment from 'moment';

import data from 'data/test';

// 获取任务报表
const GET_TASK_START = {type:types.GET_TASK_START};
const GET_TASK_REPORT = {type:types.GET_TASK_REPORT};
const GET_TASK_DONE = {type:types.GET_TASK_DONE};

// 下载任务报表
// const DOWNLOAD_TASK_START = {type:types.DOWNLOAD_TASK_START};
// const DOWNLOAD_TASK_DONE = {type:types.DOWNLOAD_TASK_DONE};

// 获取任务报表
export const getTaskReport = (data={},startDate,endDate) => (dispatch,getState) => {
    dispatch(GET_TASK_START);
    AjaxByToken('progress_report',{
        head: {
            transcode: 'L0034',
        },
        data: data
    })
    .then(res=>{
        dispatch(GET_TASK_DONE);
        // let copyMap={};
        // copyMap['海擎金融总部'] = JSON.parse(JSON.stringify(res.map['51金融圈总部']));
        // let data = {...res.map,...copyMap};
        let endtime = endDate ? endDate : new Date().getTime(),
            starttime = startDate ? startDate :  endtime - 7*24*60*60*1000;
        dispatch({...GET_TASK_REPORT,data:{list:res.map,starttime,endtime}});
    },err=>{
        dispatch(GET_TASK_DONE);
        dispatch({...GET_TASK_REPORT,data:{list:{}}});
    });
}

// 下载任务报表
// export const downloadTaskReport = () => (dispatch,getState) => {
//     dispatch(DOWNLOAD_TASK_START);
//     const token = store.get('token');
//     console.log('download');
//     axios({
//         url: '/hrmanage/report/progress_report_down',
//         method: 'post',
//         data: {...{data:token},...{
//              head:{
//                  type:'h',
//                  transcode: 'L0039'
//              }
//          }},
//         header: {
//             contentType: 'application/x-www-form-urlencoded'
//         },
//     })
//     .then(res=>{
//         console.log(res);
//         // dispatch(DOWNLOAD_TASK_DONE);
//         const {data} = res;
//         var blob = new Blob([data], {type: "application/vnd.ms-excel"});
//         // FileSaver.saveAs(blob, "任务报表.xls");
//     });
// }