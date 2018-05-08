import {
    SHOW_MODAL,
    HIDE_MODAL,
    SHOW_SHARE_MODAL,
    HIDE_SHARE_MODAL, 
    SHOW_INTERVIEW_EVALUATION_MODAL,
    HIDE_INTERVIEW_EVALUATION_MODAL,
    LOAD_RESUME_INFO,
    LOAD_INFO_START,
    LOAD_INFO_DONE,
    SHOW_MODAL_LOADING,
    HIDE_MODAL_LOADING,
    DOWNLOAD_RESUME_START,
    DOWNLOAD_RESUME_DONE,
    GET_EVALUATION,
    GET_EVALUATION_ID,
    RESUME_INFORMATION,
    HIDE_BACKGROUNDSURVEY_MODAL,
    SHOW_BACKGROUNDSURVEY_MODAL,
    RESUME_INFO,
    FILL_LOADING,
    SHOW_QRCODE_LINKMODAL,
    HIDE_QRCODE_LINKMODAL
} from 'constants/resume-info';

const initialState = {
   modalVisible: false,
   shareModalVisible: false,
   evaluationModalVisible: false,
   currentStage:{},
   resumeInfo: {},
   resumeData: {},
   evaluationData: {},
   isModalLoading: false,
   isDownLoading: false,
   evaluation:{},//评估表
   evaluationid:"",//评估表ID
   resumeUrl:{},
   backSurveyVisible: false,
   resumeInformation: {},
   isLoading:true,
   shareLinkModalVisible:false,
   companyInfo: {}
};

export default function resume(state = initialState,actions){
    switch(actions.type){
        case SHOW_MODAL:
            return {...state,modalVisible:true,currentStage:actions.currentStage};
        case HIDE_MODAL:
            return {...state,modalVisible:false};
        case SHOW_SHARE_MODAL:
            return {...state,shareModalVisible:true,resumeData:actions.resumeData};
        case RESUME_INFORMATION:
            return {...state,resumeUrl:actions.resumeUrl};
        case GET_EVALUATION:
            return {...state,evaluation:actions.evaluation};
        case GET_EVALUATION_ID:
            return {...state,evaluationid:actions.evaluationid};
        case HIDE_SHARE_MODAL:
            return {...state,shareModalVisible:false};    
        case SHOW_INTERVIEW_EVALUATION_MODAL:
            return {...state,evaluationModalVisible:true,evaluationData:actions.evaluationData};
        case HIDE_INTERVIEW_EVALUATION_MODAL:
            return {...state,evaluationModalVisible:false};  
        case LOAD_RESUME_INFO:
            return {...state,resumeInfo:actions.resumeInfo};
        case LOAD_INFO_START:
            return {...state,isInfoLoading:true};
        case LOAD_INFO_DONE:
            return {...state,isInfoLoading: false};
        case SHOW_MODAL_LOADING:
            return {...state,isModalLoading: true};
        case HIDE_MODAL_LOADING:
            return {...state,isModalLoading: false};
        case DOWNLOAD_RESUME_START:
            return {...state,isDownLoading: true};
        case DOWNLOAD_RESUME_DONE:
            return {...state,isDownLoading: false};
        case SHOW_BACKGROUNDSURVEY_MODAL:
            return {...state,backSurveyVisible:true};
        case HIDE_BACKGROUNDSURVEY_MODAL:
            return {...state,backSurveyVisible:false};
        case RESUME_INFO:
            return {...state,resumeInformation:actions.resumeInformation};  
        case FILL_LOADING:
            return {...state,isLoading: false};
        case SHOW_QRCODE_LINKMODAL:
            return {...state,shareLinkModalVisible: true,companyInfo:actions.companyInfo}
        case HIDE_QRCODE_LINKMODAL:
            return {...state,shareLinkModalVisible: false}
        default: 
            return state;
    }
} 