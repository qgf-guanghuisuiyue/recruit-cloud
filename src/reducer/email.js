import {
    GET_HISTORY_START,
    GET_HISTORY_END,
    GET_EMAIL_HISTORY,
    SEND_EMAIL_START,
    SEND_EMAIL_DONE,
    SHOW_UPLOAD_MODAL,
    HIDE_UPLOAD_MODAL,
    RESET_FILELIST_TRUE,
    RESET_FILELIST_FALSE,
    GET_PERSON_INFO_HISTORY_RECORD,
    SHOW_EMAIL_MODAL,
    HIDE_EMAIL_MODAL
} from 'constants/email';

const initialState = {
    historyEmail: {
        isLoading: false,
        list: []
    },
    isSendEmailDone: true,
    modalVisible:false,
    resetFileList: false,
    personHistoryList: [],
    sendEmailVisible:false
};

export default function email(state = initialState,actions){
    switch(actions.type){
        case GET_HISTORY_START: 
            return {...state,historyEmail:{...state.historyEmail,isLoading:true}};
        case GET_HISTORY_END: 
            return {...state,historyEmail:{...state.historyEmail,isLoading:false}};
        case GET_EMAIL_HISTORY: 
            return {...state,historyEmail:{...state.historyEmail,list:actions.list}};
        case SEND_EMAIL_START:
            return {...state,isSendEmailDone:false};
        case SEND_EMAIL_DONE:
            return {...state,isSendEmailDone:true};
        case SHOW_UPLOAD_MODAL:
            return {...state,modalVisible:true};
        case HIDE_UPLOAD_MODAL:
            return {...state,modalVisible:false};
        case RESET_FILELIST_TRUE:
            return {...state,resetFileList:true};
        case RESET_FILELIST_FALSE:
            return {...state,resetFileList: false}
        case SHOW_EMAIL_MODAL:
            return {...state,sendEmailVisible:true};
        case HIDE_EMAIL_MODAL:
            return {...state,sendEmailVisible: false}
        case GET_PERSON_INFO_HISTORY_RECORD:
            return {...state,personHistoryList:actions.personHistoryList}
        default: 
            return state;
    }
} 