import {
    GET_USER_INFO,
    GET_USER_EMAIL_INFO,
    CHANGE_PASSWD,
    CHANGE_PASSWD_START,
    CHANGE_PASSWD_DONE,
    CHANGE_RES_FALSE,
    GET_USER_RESUMEEMAIL_INFO
} from 'constants/user';

const initialState = {
    userInfo: {},
    userEmailInfo: {
        userMail: {},
        mailServersList: []
    },
    resumeEmailInfo:{},
    isLoading: false,
    changeRes: false
};

export default function user(state = initialState,actions){
    switch(actions.type){
        case GET_USER_INFO:
            return {...state,userInfo:actions.userInfo};
        case GET_USER_EMAIL_INFO:
            return {...state,userEmailInfo:actions.userEmailInfo};
        case GET_USER_RESUMEEMAIL_INFO:
            return {...state,resumeEmailInfo:actions.resumeEmailInfo};
        case CHANGE_PASSWD_START:
            return {...state,isLoading: true};
        case CHANGE_PASSWD_DONE:
            return {...state,isLoading: false};
        case CHANGE_PASSWD:
            return {...state,changeRes: true};
        case CHANGE_RES_FALSE:
            return {...state,changeRes:false};
        default: 
            return state;
    }
} 