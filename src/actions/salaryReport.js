import * as types from 'constants/salaryReport';
import {AjaxByToken,cancelRequestByKey,AjaxByGetByResumeClient} from 'utils/ajax';
import axios from 'axios';

// 获取查询条件
const GET_INDUSTRY = {type:types.GET_INDUSTRY};
const GET_DEPARTMENT = {type:types.GET_DEPARTMENT};
const GET_POSITION = {type:types.GET_POSITION};
const SALARY_DATA = {type:types.SALARY_DATA};
const DELETE_DATA = {type:types.DELETE_DATA};


//获取查询条件
export const getCondition = (data) => (dispatch,getState) => {
    AjaxByToken('salarycount/conditions',{
        head: {
            transcode: 'L0095'
        },
        data: data
    })
    .then(res=>{
        if(data && data.industry && !data.department){
            dispatch({...GET_DEPARTMENT,department:res.secondlist})
        }else if(data && data.industry  && data.department){
            dispatch({...GET_POSITION,position:res.thirdlist})
        }else{
            dispatch({...GET_INDUSTRY,industry:res.firstlist})
        }
        
    },err=>{
        console.log(err)
    });
}

//查询
export const searchData = (data) => (dispatch,getState) => {
    AjaxByToken('salarycount/serach',{
        head: {
            transcode: 'L0094'
        },
        data: data
    })
    .then(res=>{
        console.log(res)
        dispatch({...SALARY_DATA,salaryData:res.list})
    },err=>{
        console.log(err)
    });
}

//删除数据
export const deleteData = () => (dispatch,getState) => {
    dispatch({...DELETE_DATA})
}



