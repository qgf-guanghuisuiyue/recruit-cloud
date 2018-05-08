import {
    GET_INDUSTRY,
    GET_DEPARTMENT,
    GET_POSITION,
    SALARY_DATA,
    DELETE_DATA
} from 'constants/salaryReport';

const initialState = {
    industry:[],
    department:[],
    position:[],
    salaryData:[]
};
export default function recruit(state = initialState,actions){
    switch(actions.type){
        case GET_INDUSTRY:
            return {...state,industry:actions.industry};
        case GET_DEPARTMENT:
            return {...state,department:actions.department};
        case GET_POSITION:
            return {...state,position:actions.position};
        case SALARY_DATA:
            return {...state,salaryData:actions.salaryData};
        case DELETE_DATA:
            return {...state,salaryData:[]};
        default: 
            return state;
    }
} 