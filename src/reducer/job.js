import {
    LOAD_CATEGORY_START,
    LOAD_CATEGORY_DONE,
    JOB_CATEGORY,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    JOB_LIST,
    JOB_INFO,
    LOAD_INFO_START,
    LOAD_INFO_DONE,
    CREATE_JOB_START,
    CREATE_JOB_DONE,
    ABORT_JOB_START,
    ABORT_JOB_DONE,
    ABORT_JOB_INFO,
    SHOW_JOB_MODAL,
    HIDE_JOB_MODAL,
    SHOW_SAVEJOB_MODAL,
    HIDE_SAVEJOB_MODAL,
    RESET_FORM,
    RESUMEID,
    CANCELLRESUMEID,
    SHOW_SALARY_MODAL,
    HIDE_SALARY_MODAL,
    SALARYDATA,
    CANCELSALARY
} from 'constants/job';

const initialState = {
    categoryData: {
        all: 0,
        completed: 0,
        ongoing: 0,
        preparation: 0,
        stop: 0
    },
    listData: {
        list: [],
        count: 0
    },
    jobInfo: {},
    isLoadingList: true,
    isLoadingInfo: false,
    isCanCreateJob: true,
    isLoadingAbort: false,
    modalVisible: false,
    saveModalVisible:false,
    salaryModalVisible:false,
    interview:{} ,  //职位面试者的数据，存放职位id,流程id,只能筛选
    salaryData:[],
    positionSalary:""
};

export default function job(state = initialState,actions){
    switch(actions.type){
        case LOAD_CATEGORY_START:
            return {...state,isLoadingCategory:true};
        case LOAD_CATEGORY_DONE:
            return {...state,isLoadingCategory:false};
        case JOB_CATEGORY: 
            return {...state,categoryData:actions.categoryData};
        case LOAD_LIST_START:
            return {...state,isLoadingList:true};
        case LOAD_LIST_DONE:
            return {...state,isLoadingList:false};
        case JOB_LIST:
            return {...state,listData:actions.listData};
        case LOAD_INFO_START:
            return {...state,isLoadingInfo:true};
        case LOAD_INFO_DONE:
            return {...state,isLoadingInfo:false};
        case JOB_INFO:
            return {...state,jobInfo:actions.jobInfo};
        case RESET_FORM:
            return {...state,jobInfo:{}};
        case CREATE_JOB_START:
            return {...state,isCanCreateJob:false};
        case CREATE_JOB_DONE:
            return {...state,isCanCreateJob:true};
        case ABORT_JOB_START:
            return {...state,isLoadingAbort:true};
        case ABORT_JOB_DONE:
            return {...state,isLoadingAbort:false};
        case SHOW_JOB_MODAL:
            return {...state,modalVisible: true};
        case HIDE_JOB_MODAL:
            return {...state,modalVisible: false};
        case SHOW_SAVEJOB_MODAL:
            return {...state,saveModalVisible: true};
        case HIDE_SAVEJOB_MODAL:
            return {...state,saveModalVisible: false};
        case RESUMEID:
            return {...state,interview: actions.interview};
        case CANCELLRESUMEID:
            return {...state,interview: actions.interview};  
        case SHOW_SALARY_MODAL:
            return {...state,salaryModalVisible: true,positionSalary: actions.positionSalary};
        case HIDE_SALARY_MODAL:
            return {...state,salaryModalVisible: false};
        case SALARYDATA:
            return {...state,salaryData: actions.salaryData}; 
        case CANCELSALARY:
            return {...state,salaryData: []};  
        default: 
            return state;
    }
} 