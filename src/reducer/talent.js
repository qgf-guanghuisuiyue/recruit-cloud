import {
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    LOAD_TALENT_LIST,
    LOAD_CATEGORY_START,
    LOAD_CATEGORY_DONE,
    LOAD_TALENT_CATEGORY,
    SHOW_CREATE_LABEL_MODAL,
    HIDE_CREATE_LABEL_MODAL,
    CREATE_LABEL_START,
    CREATE_LABEL_DONE,
    SHOW_DELETE_LABEL_MODAL,
    HIDE_DELETE_LABEL_MODAL,
    DELETE_LABEL_START,
    DELETE_LABEL_DONE,
    SHOW_MOVE_RESUME_MODAL,
    HIDE_MOVE_RESUME_MODAL,
    MOVE_RESUME_START,
    MOVE_RESUME_DONE,
    RECOMMEND_POSITION_START,
    RECOMMEND_POSITION_DONE
} from 'constants/talent';

const initialState = {
   isListLoading: false,
   categoryData: {},
   talentList: {
       count: 0,
       list: []
   },
   createModal: {isLoading:false,modalVisible:false},
   deleteModal: {isLoading:false,modalVisible:false},
   moveModal: {isLoading: false,modalVisible:false},
   recommendPositioning: false //推荐职位中
};

export default function talent(state = initialState,actions){
    switch(actions.type){
        case LOAD_LIST_START:
            return {...state,isListLoading:true};
        case LOAD_LIST_DONE:
            return {...state,isListLoading:false};
        case LOAD_TALENT_LIST: 
            return {...state,talentList:actions.talentList.list.length==0?{count: 0,
       list: []}:actions.talentList};
        case LOAD_CATEGORY_START:
            return {...state,isCategoryLoading:true};
        case LOAD_CATEGORY_DONE:
            return {...state,isCategoryLoading:false};
        case LOAD_TALENT_CATEGORY:
            return {...state,categoryData:actions.categoryData};
        case SHOW_CREATE_LABEL_MODAL:
            return {...state,createModal:{...state.createModal,modalVisible:true}};
        case HIDE_CREATE_LABEL_MODAL:
            return {...state,createModal:{...state.createModal,modalVisible:false}}
        case CREATE_LABEL_START:
            return {...state,createModal:{...state.createModal,isLoading:true}};
        case CREATE_LABEL_DONE:
            return {...state,createModal:{...state.createModal,isLoading:false}};
        case SHOW_DELETE_LABEL_MODAL:
            return {...state,deleteModal:{...state.deleteModal,modalVisible:true}};
        case HIDE_DELETE_LABEL_MODAL:
            return {...state,deleteModal:{...state.deleteModal,modalVisible:false}};
        case DELETE_LABEL_START:
            return {...state,deleteModal:{...state.deleteModal,isLoading:true}};
        case DELETE_LABEL_DONE:
            return {...state,deleteModal:{...state.deleteModal,isLoading:false}};
        case SHOW_MOVE_RESUME_MODAL:
            return {...state,moveModal:{...state.moveModal,modalVisible:true}};
        case HIDE_MOVE_RESUME_MODAL:
            return {...state,moveModal:{...state.moveModal,modalVisible:false}};
        case MOVE_RESUME_START:
            return {...state,moveModal:{...state.moveModal,isLoading:true}};
        case MOVE_RESUME_DONE:
            return {...state,moveModal:{...state.moveModal,isLoading:false}};
        case RECOMMEND_POSITION_START:   
            return {...state,recommendPositioning: true};
        case RECOMMEND_POSITION_DONE:   
            return {...state,recommendPositioning: false};
        default: 
            return state;
    }
} 