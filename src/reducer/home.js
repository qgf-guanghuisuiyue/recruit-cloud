import {
    URGENT_TASKS,
    RESUME,
    RESUMEACCOUNT,
    GET_ENTRY_LIST,
    GET_ENTRY_START,
    GET_ENTRY_DONE,
    TASK_PROGRESS,
    SHOW_MEMO_MODAL,
    HIDE_MEMO_MODAL,
    ADD_MEMO_EVENT,
    GET_MEMO_CONTENT,
    GET_DATE_MEMO_CONTENT,
    GET_VIDEO
} from 'constants/home';

const initialState = {
    // urgentTasks: [], // 紧急任务列表
    resumeData: {}, //简历入库情况
    resumeCount: {}, //简历入库份数
    taskProgress: [], // 任务完成指数
    isEntryLoading: false,
    entryPersonList: [], //待入职人员列表
    memoModalVisible: false,
    isMemoLoading: false,
    MemoContent:{},
    DateMemoContent:{},
    video:{}
};

export default function home(state = initialState,actions){
    switch(actions.type){
        case URGENT_TASKS: 
            return {...state,urgentTasks:actions.urgentTasks};
        case GET_MEMO_CONTENT: 
            return {...state,MemoContent:actions.MemoContent};
        case GET_DATE_MEMO_CONTENT: 
            return {...state,DateMemoContent:actions.DateMemoContent};
        case RESUME:
            return {...state,resumeData:actions.resumeData};
        case RESUMEACCOUNT:
            return {...state,resumeCount:actions.resumeCount};    
        case TASK_PROGRESS:
            return {...state,taskProgress:actions.taskProgress};
        case GET_ENTRY_START:
            return {...state,isEntryLoading:true};
        case GET_ENTRY_DONE:
            return {...state,isEntryLoading:false};
        case GET_ENTRY_LIST:
            return {...state,entryPersonList:actions.entryPersonList};
        case SHOW_MEMO_MODAL:
            return {...state,memoModalVisible: true,isMemoLoading: true};
        case HIDE_MEMO_MODAL:
            return {...state,memoModalVisible: false,isMemoLoading: false};
        case GET_VIDEO:
            return {...state,video:actions.video};      
        default: 
            return state;
    }
} 