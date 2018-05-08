import {
    LOAD_CATEGORY_START,
    LOAD_CATEGORY_DONE,
    LOAD_RECRUIT_CATEGORY,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    LOAD_RECRUIT_LIST,
    SHOW_INFO_MODAL,
    HIDE_INFO_MODAL,
    SHOW_UPLOAD_MODAL,
    HIDE_UPLOAD_MODAL,
    UPLOAD_RESUME_START,
    UPLOAD_RESUME_DONE,
    SET_RESETFORM_TRUE,
    SET_RESETFORM_FALSE,
    SHOW_RECOMMEND_MODAL,
    HIDE_RECOMMEND_MODAL,
    LOAD_RECOMMEND_START,
    LOAD_RECOMMEND_DONE,
    LOAD_RECOMMEND_LIST,
    SELECT_POSITION
} from 'constants/recruit';

const initialState = {
    visible: false,
    isCategoryLoading: false,
    isListLoading:false,
    categoryData: [],
    uriParams: {},
    recruitList: {
        list: [],
        count: 0
    },
    uploadModal:{
        visible: false,
        isLoading: false,
        resetForm: false
    },
    recommendModal: {
        visible: false,
        isLoading: false,
        data:{
            allRecords: 0,
            list: []
        }
    },
    position: {}
};

export default function recruit(state = initialState,actions){
    switch(actions.type){
        case LOAD_CATEGORY_START:
            return {...state,isCategoryLoading:true};
        case LOAD_CATEGORY_DONE:
            return {...state,isCategoryLoading:false};
        case LOAD_RECRUIT_CATEGORY: 
            return {...state,categoryData:actions.categoryData};
        case LOAD_LIST_START:
            return {...state,isListLoading: true};
        case LOAD_LIST_DONE:
            return {...state,isListLoading: false};
        case LOAD_RECRUIT_LIST:
            return {...state,recruitList:actions.recruitList};
        case SHOW_INFO_MODAL:
            return {...state,visible: true,uriParams:actions.uriParams};
        case HIDE_INFO_MODAL:
            return {...state,visible: false};
        case SHOW_UPLOAD_MODAL:
            return {...state,uploadModal:{...state.uploadModal,visible:true}};
        case HIDE_UPLOAD_MODAL:
            return {...state,uploadModal:{...state.uploadModal,visible:false}};
        case UPLOAD_RESUME_START:
            return {...state,uploadModal:{...state.uploadModal,isLoading:true}};
        case UPLOAD_RESUME_DONE:
            return {...state,uploadModal:{...state.uploadModal,isLoading:false}};
        case SET_RESETFORM_TRUE:
            return {...state,uploadModal:{...state.uploadModal,resetForm:true},position:{}};
        case SET_RESETFORM_FALSE:
            return {...state,uploadModal:{...state.uploadModal,resetForm:false}};
        case SHOW_RECOMMEND_MODAL:
            return {...state,recommendModal:{...state.recommendModal,visible:true}};
        case HIDE_RECOMMEND_MODAL:
            return {...state,recommendModal:{...state.recommendModal,visible:false}};
        case LOAD_RECOMMEND_START:
            return {...state,recommendModal:{...state.recommendModal,isLoading:true}};
        case LOAD_RECOMMEND_DONE:
            return {...state,recommendModal:{...state.recommendModal,isLoading:false}};
        case LOAD_RECOMMEND_LIST:
            return {...state,recommendModal:{...state.recommendModal,data:actions.data}};
        case SELECT_POSITION:
            return {...state,position:actions.position};
        default: 
            return state;
    }
} 