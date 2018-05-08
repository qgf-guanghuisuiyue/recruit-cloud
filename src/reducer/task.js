import {
    GET_TASK_START,
    GET_TASK_DONE,
    GET_TASK_REPORT
    // DOWNLOAD_TASK_START,
    // DOWNLOAD_TASK_DONE
} from 'constants/task';

const initialState = {
   isLoading: false,
   data: {list:{}},
   downLoading: false
};

export default function user(state = initialState,actions){
    switch(actions.type){
        case GET_TASK_START:
            return {...state,isLoading: true};
        case GET_TASK_DONE:
            return {...state,isLoading: false};
        case GET_TASK_REPORT:
            return {...state,data:actions.data};
        // case DOWNLOAD_TASK_START:
        //     return {...state,downLoading:true};
        // case DOWNLOAD_TASK_DONE:
        //     return {...state,downLoading:false};
        default: 
            return state;
    }
} 