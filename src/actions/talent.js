import * as types from 'constants/talent';
import * as recruitTypes from 'constants/recruit';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

import {message} from 'antd'; 

// 人才分类
const LOAD_CATEGORY_START  = {type:types.LOAD_CATEGORY_START};
const LOAD_CATEGORY_DONE   = {type:types.LOAD_CATEGORY_DONE};
const LOAD_TALENT_CATEGORY = {type:types.LOAD_TALENT_CATEGORY};

// 人才列表
const LOAD_LIST_START  = {type:types.LOAD_LIST_START};
const LOAD_LIST_DONE   = {type:types.LOAD_LIST_DONE};
const LOAD_TALENT_LIST = {type:types.LOAD_TALENT_LIST};

// 推荐职位
const RECOMMEND_POSITION_START = {type:types.RECOMMEND_POSITION_START};
const RECOMMEND_POSITION_DONE  = {type:types.RECOMMEND_POSITION_DONE};

// ==== 创建标签 ====
const SHOW_CREATE_LABEL_MODAL = {type:types.SHOW_CREATE_LABEL_MODAL};
const HIDE_CREATE_LABEL_MODAL = {type:types.HIDE_CREATE_LABEL_MODAL};
const CREATE_LABEL_START      = {type:types.CREATE_LABEL_START};
const CREATE_LABEL_DONE       = {type:types.CREATE_LABEL_DONE};
const SHOW_DELETE_LABEL_MODAL = {type:types.SHOW_DELETE_LABEL_MODAL};
const HIDE_DELETE_LABEL_MODAL = {type:types.HIDE_DELETE_LABEL_MODAL};
const DELETE_LABEL_START      = {type:types.DELETE_LABEL_START};
const DELETE_LABEL_DONE       = {type:types.DELETE_LABEL_DONE};

// ==== 移动简历 ====
const SHOW_MOVE_RESUME_MODAL = {type:types.SHOW_MOVE_RESUME_MODAL};
const HIDE_MOVE_RESUME_MODAL = {type:types.HIDE_MOVE_RESUME_MODAL};
const MOVE_RESUME_START      = {type:types.MOVE_RESUME_START};
const MOVE_RESUME_DONE       = {type:types.MOVE_RESUME_DONE};

// 导入简历职位推荐列表
const LOAD_RECOMMEND_LIST = {type:recruitTypes.LOAD_RECOMMEND_LIST};

// 获取人才分类
export const getTalentCategory = () => (dispatch,getState) => {
    dispatch(LOAD_CATEGORY_START);
    AjaxByToken('TalentStatis',{
        head: {
            transcode: 'L0024'
        }
    })
    .then(res=>{
        dispatch(LOAD_CATEGORY_DONE);
        dispatch({...LOAD_TALENT_CATEGORY,categoryData:res});
    },err=>{
        dispatch(LOAD_CATEGORY_DONE);
    });
}
// 获取人才列表
export const getTalentList = (data) => (dispatch,getState) => {
    data.start = data.start + '';
    const uri = 'queryTalent';
    cancelRequestByKey(uri);
    dispatch(LOAD_LIST_START);
    AjaxByToken(uri,{
        head: { 
            transcode: 'L0025'
        },
        data: {...data,rows:18+''}
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        dispatch({...LOAD_TALENT_LIST,talentList:res});
    },err=>{
        dispatch(LOAD_LIST_DONE);
        dispatch({...LOAD_TALENT_LIST,talentList:{list: [],count: 0}});
    });
}

//  简历职位推荐接口开发
export const recommendPosition = (data,listData) => (dispatch,getState) => {
    // listData原来的列表数据
    NProgress.configure({className:'top0'});
    NProgress.start();
    dispatch(RECOMMEND_POSITION_START);
    AjaxByToken('recommend',{
        head: {
            transcode: 'L0022'
        },
        data: data
    })
    .then(res=>{
        dispatch(RECOMMEND_POSITION_DONE);
        message.success('职位推荐成功！');
        listData.list.forEach(item=>{
            if(item.positionid === data.positionid){
                item.isFlag = '已申请';
            }
        });
        dispatch({...LOAD_RECOMMEND_LIST,data:listData});
    },err=>{
        dispatch(RECOMMEND_POSITION_DONE);
        message.error('职位推荐失败！');
    });
}

//企业收藏简历
export const collectionResume = data => (dispatch,getState) => {
    dispatch(LOAD_LIST_START);
    AjaxByToken('CollectionResume',{
        head: {
            transcode: 'L0027'
        },
        data: data
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        message.success('收藏成功！');
        const {categoryData,talentList} = getState().Talent,
              {list,count}              = talentList;
        list.forEach((item,index)=>{
            if(item.resumeid === data.resumeid){
                list[index].iscollection = "1";
            }
        });
        dispatch({
            ...LOAD_TALENT_CATEGORY,
            categoryData:{
                ...categoryData,
                collection: categoryData.collection + 1
            }
        });
        dispatch({...LOAD_TALENT_LIST,talentList:{list:list,count:count}});
    },err=>{
        dispatch(LOAD_LIST_DONE);
        message.success('收藏失败！');
    });
}

//企业取消收藏简历
export const cancelCollectionResume = data => (dispatch,getState) => {
    dispatch(LOAD_LIST_START);
    AjaxByToken('cancelthecollection',{
        head: {
            transcode: 'L0037'
        },
        data: data
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        message.success('取消收藏成功！');
        const {categoryData,talentList} = getState().Talent,
              {list,count}              = talentList;
        list.forEach((item,index)=>{
            if(item.resumeid === data.resumeid){
                list[index].iscollection = "0";
            }
        });
        dispatch({
            ...LOAD_TALENT_CATEGORY,
            categoryData:{
                ...categoryData,
                collection: categoryData.collection - 1
            }
        });
        dispatch({...LOAD_TALENT_LIST,talentList:{list:list,count:count}});
    },err=>{
        dispatch(LOAD_LIST_DONE);
        message.success('取消收藏失败！');
    });
}

// 显示创建分类Modal
export const showCreateLabelModal = () => (dispatch,getState) => {
    dispatch(SHOW_CREATE_LABEL_MODAL);
}

// 隐藏创建分类Modal
export const hideCreateLabelModal = () => (dispatch,getState) => {
    dispatch(HIDE_CREATE_LABEL_MODAL);
}

// 创建分类标签
export const createLabel = (data,getTalentCategory=()=>{}) => (dispatch,getState) => {
    dispatch(CREATE_LABEL_START);
    AjaxByToken('deleteOrSaveTheLable',{
        head: {
            transcode: 'L0026'
        },
        data: data
    })
    .then(res=>{
        message.success('新建类别成功！');
        dispatch(CREATE_LABEL_DONE);
        setTimeout(()=>{
            dispatch(HIDE_CREATE_LABEL_MODAL);
        },500);
        // 重新获取左侧导航栏数据
        getTalentCategory();
    },err=>{
        dispatch(CREATE_LABEL_DONE);
    });
}

// 显示删除分类Modal
export const showDeleteLabelModal = () => (dispatch,getState) => {
    dispatch(SHOW_DELETE_LABEL_MODAL);
}

// 隐藏删除分类Modal
export const hideDeleteLabelModal = () => (dispatch,getState) => {
    dispatch(HIDE_DELETE_LABEL_MODAL);
}

// 删除分类标签
export const deleteLabel = (data,getTalentCategory=()=>{}) => (dispatch,getState) => {
    dispatch(DELETE_LABEL_START);
    AjaxByToken('deleteOrSaveTheLable',{
        head: {
            transcode: 'L0026'
        },
        data: data
    })
    .then(res=>{
        message.success('删除类别成功！');
        dispatch(DELETE_LABEL_DONE);
        setTimeout(()=>{
            dispatch(HIDE_DELETE_LABEL_MODAL);
        },500);
        getTalentCategory();
    },err=>{
        message.success('删除类别失败！');
        dispatch(DELETE_LABEL_DONE);
    });
}

// 显示移动人员Modal
export const showMoveResumeModal = () => (dispatch,getState) => {
    dispatch(SHOW_MOVE_RESUME_MODAL);
}

// 隐藏移动人员Modal
export const hideMoveResumeModal = () => (dispatch,getState) => {
    dispatch(HIDE_MOVE_RESUME_MODAL);
}

// 移动人员
export const moveResume = (data,getTalentCategory=()=>{}) => (dispatch,getState) => {
    dispatch(MOVE_RESUME_START);
    AjaxByToken('resumemobile',{
        head: {
            transcode: 'L0031'
        },
        data: data
    })
    .then(res=>{
        dispatch(MOVE_RESUME_DONE);
        message.success('移动成功！');
        getTalentCategory();
        dispatch(HIDE_MOVE_RESUME_MODAL);
    },err=>{
        dispatch(MOVE_RESUME_DONE);
    });
}