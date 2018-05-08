import {
    //**员工名册 ------------------------------------------------*/
    GET_MANAGE_START,
    GET_MANAGE_END,
    GET_MANAGE_STATISTICS,
    LOAD_LIST_START,
    LOAD_LIST_DONE,
    LOAD_CREW_LIST,
    SHOW_UPLOAD_CLERK_MODAL,
    HIDE_UPLOAD_CLERK_MODAL,
    UPLOAD_CLERK_START,
    UPLOAD_CLERK_DONE,
    SET_RESETFORM_TRUE,
    SET_RESETFORM_FALSE,
    EXPORT_CLERK_START,
    EXPORT_CLERK_DONE,
    DELETE_EMPLOYEE_START,
    DELETE_EMPLOYEE_DONE,
    QUERY_EMPLOYEE_START,
    QUERY_EMPLOYEE_DONE,
    QUERY_EMPLOYEE_LIST,
    QUERY_RESET_FORM,
    SHOW_DISMISSION_MODAL,
    HIDE_DISMISSION_MODAL,
    SHOW_FORMAL_MODAL,
    HIDE_FORMAL_MODAL,
    SHOW_TRANSFER_PERSONNEL_MODAL,
    HIDE_TRANSFER_PERSONNEL_MODAL,
    MOBILIZE_EMPLOYEE_START,
    MOBILIZE_EMPLOYEE_DONE,
    SHOW_ATTACHMENT_MODAL,
    HIDE_ATTACHMENT_MODAL,
    OPERATION_LIST,
    LOAD_EMPLOYEEINFO_START,
    LOAD_EMPLOYEEINFO_DONE,
    LOAD_EMPLOYEEINFO,
    SHOW_INFO_MODAL,
    HIDE_INFO_MODAL,
    CREDITINVESTGATION_START,
    CREDITINVESTGATION_DONE,
    CREDITINVESTGATION,
    SEARCHCREDITINVESTGATION,
    SEARCHCREDITINVESTGATION_START,
    CREDITINVESTGATIONSTATE,
    IMAGEURL,
    SHOW_IMAGE_MODAL,
    HIDE_IMAGE_MODAL,
    CANCELIMAGEURL,
    HIDECREDITINVESTGATIONSTATE,
    CANCELLOADING,
    CANCELDATA,
    //**档案管理 ------------------------------------------------*/
    GET_ARCHIVES_START ,
    GET_ARCHIVES_DONE ,
    GET_ARCHIVES_LIST ,
    GET_ARCHIVES_DATA,
    ARCHIVES_TABLE_DATA,
    GET_LEAVEARCHIVES_START ,
    GET_LEAVEARCHIVES_DONE ,
    GET_LEAVEARCHIVES_LIST,
    OPERATION_LIST_START,
    OPERATION_LIST_DONE,
    PROGRESS,
    CANCELPROGRESS,
    //**全员概览 ------------------------------------------------*/
    GET_EMPLOYEE_WORK,
    GET_EMPLOYEE_SEX,
    GET_EMPLOYEE_EDU,
    GET_EMPLOYEE_AGE,
    GET_EMPLOYEE_MARRY,
    GET_EMPLOYEE_CHILD,
    GET_EMPLOYEE_DEPART,
    GET_EMPLOYEE_POST,
    GET_DEPARTMENT_START,
    GET_DEPARTMENT_DONE,
    GET_DEPARTMENT_LIST,
    SHOW_PERSONALMATERIAL_MODAL,
    HIDE_PERSONALMATERIAL_MODAL,
    //**组织架构 ------------------------------------------------*/
    GET_DEPARTMENT_STAFF,
    ADD_EDIT_DEPARTMENT,
    DELETE_DEPARTMENT,
    GET_ORGANIZE_CHART,
    ADD_MECHANISM,
    DELETE_MECHANISM,
    EDIT_MECHANISM,
    GET_ARRANGE_DEPARTMENT,
    ARRANGE_DEPARTMENT
} from 'constants/manage'; 

const initialState = {
//**员工名册 ------------------------------------------------*/
    manageStastistics: {
        isLoading: false,
        list: []
    },
    crewList: {
        isLoading: false,
        list: [],
        count: 0
    },
    uploadClerkModal: {
        isLoading: false,
        visible: false,
        resetForm: false
    },
    exportClerkList: {
        isLoading: false
    },
    deleteClerkList: {
        isLoading: false,
        isDelete: false
    },
    queryEmployeeList: {
        isLoading: false,
        list: {}
    },
    dismissionModal: {
        isLoading: false,
        visible: false,
    },
    permanentModal: {
        isLoading: false,
        visible: false,
    },
    transferPersonnelModal: {
        isLoading: false,
        visible: false,
        isTransferPersonnel:false
    },
    attactmentModal: {
        isLoading: false,
        visible: false,
    },
    operationList: {
        isLoading: false,
        count: 0,
        list: []
    },
    isInfoLoading:false,
    isDataLoading:false,
    employeeInfo: {},
    visible:false,
    uriParams: {},
    creditData:{},
    creditInfoData:{},
    isFill:false,
    attactmentType:{},
    searchLoading:false,
    
    //**档案管理 ------------------------------------------------*/
    archivesList:{
        isLoading: false,
        count:0,
        list:[]
    },
    leaveArchivesList:{
        isLoading: false,
        count:0,
        list:[]
    },
    progressVisible:false,
    departmentStaff: {},
    currentUid:'',
    departmentName:'',
    current:'',
    crewDetail: {},
    archivesData: {},
    archivesTableData:'1',
    personalMaterialVisible:false,
    personalMaterialData:{},
    departmentInfo:"",
    departmentList: {
        isLoading: false,
        list: [],
        count: 0
    },
    work:[],
    sex:[],
    edu:[],
    age:[],
    marry:[],
    child:[],
    depart:[],
    post:[],
    //**组织架构图 ------------------------------------------------*/
    organize:{
        organizeList:{},
        isLoading: true
    },
    mechanismInfo:"",
    arrangeDepartment:[],
    isLoading:true
};

export default function manage(state=initialState,actions){
    switch(actions.type){
        case GET_MANAGE_START:
            return {...state,manageStastistics:{...state.manageStastistics,isLoading:true}};
        case GET_MANAGE_END:
            return {...state,manageStastistics:{...state.manageStastistics,isLoading:false}};
        case GET_MANAGE_STATISTICS:
            return {...state,manageStastistics:{...state.manageStastistics,list:actions.list}};
        case LOAD_LIST_START:
            return {...state,crewList:{...state.crewList,isLoading:true}};
        case LOAD_LIST_DONE:
            return {...state,crewList:{...state.crewList,isLoading:false}};
        case LOAD_CREW_LIST:
            return {...state,crewList:{...state.crewList,list:actions.list,count:actions.count}}; 
        case SHOW_UPLOAD_CLERK_MODAL:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,visible:true}};  
        case HIDE_UPLOAD_CLERK_MODAL:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,visible:false}};
        case UPLOAD_CLERK_START:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,isLoading:true}};  
        case UPLOAD_CLERK_DONE:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,isLoading:false}}; 
        case SET_RESETFORM_TRUE:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,resetForm:true}};
        case SET_RESETFORM_FALSE:
            return {...state,uploadClerkModal:{...state.uploadClerkModal,resetForm:false}};
        case EXPORT_CLERK_START:
            return {...state,exportClerkList:{...state.exportClerkList,isLoading:true}};  
        case EXPORT_CLERK_DONE:
            return {...state,exportClerkList:{...state.exportClerkList,isLoading:false}};
        case DELETE_EMPLOYEE_START:
            return {...state,deleteClerkList:{...state.deleteClerkList,isLoading:true,isDelete:false}};  
        case DELETE_EMPLOYEE_DONE:
            return {...state,deleteClerkList:{...state.deleteClerkList,isLoading:false,isDelete:true}};              
        case QUERY_EMPLOYEE_START:
            return {...state,queryEmployeeList:{...state.queryEmployeeList,isLoading:true}};    
        case QUERY_EMPLOYEE_DONE:
            return {...state,queryEmployeeList:{...state.queryEmployeeList,isLoading:false}}; 
        case QUERY_EMPLOYEE_LIST:
            return {...state,queryEmployeeList:{...state.queryEmployeeList,list:actions.list}};
        case QUERY_RESET_FORM:
            return {...state,queryEmployeeList:{...state.queryEmployeeList,list:actions.list}};    
        case SHOW_DISMISSION_MODAL:
            return {...state,dismissionModal:{...state.dismissionModal,visible:true}};  
        case HIDE_DISMISSION_MODAL:
            return {...state,dismissionModal:{...state.dismissionModal,visible:false}};  
        case SHOW_FORMAL_MODAL:
            return {...state,permanentModal:{...state.permanentModal,visible:true}};  
        case HIDE_FORMAL_MODAL:
            return {...state,permanentModal:{...state.permanentModal,visible:false}};
        case SHOW_TRANSFER_PERSONNEL_MODAL:
            return {...state,transferPersonnelModal:{...state.transferPersonnelModal,visible:true}}; 
        case HIDE_TRANSFER_PERSONNEL_MODAL:
            return {...state,transferPersonnelModal:{...state.transferPersonnelModal,visible:false}};
        case MOBILIZE_EMPLOYEE_START:
            return {...state,transferPersonnelModal:{...state.transferPersonnelModal,isTransferPersonnel:true}};
        case MOBILIZE_EMPLOYEE_DONE:
            return {...state,transferPersonnelModal:{...state.transferPersonnelModal,isTransferPersonnel:false}};
        case SHOW_ATTACHMENT_MODAL:
            return {...state,attactmentModal:{...state.attactmentModal,visible:true}};  
        case HIDE_ATTACHMENT_MODAL:
            return {...state,attactmentModal:{...state.attactmentModal,visible:false}};
        case OPERATION_LIST_START:
            return {...state,operationList:{...state.operationList,isLoading:true}};  
        case OPERATION_LIST_DONE:
            return {...state,operationList:{...state.operationList,isLoading:false}}; 
        case OPERATION_LIST:
            return {...state,operationList:{...state.operationList,list:actions.list,count:actions.count}};   
        case LOAD_EMPLOYEEINFO_START:
            return {...state,isInfoLoading:true};       
        case LOAD_EMPLOYEEINFO_DONE:
            return {...state,isInfoLoading:false};   
        case LOAD_EMPLOYEEINFO:
            return {...state,employeeInfo:actions.employeeInfo}; 
        case SHOW_INFO_MODAL:
            return {...state,visible: true,uriParams:actions.uriParams};
        case HIDE_INFO_MODAL:
            return {...state,visible: false}; 
        case PROGRESS:
            return {...state,progressVisible:true};
        case CANCELPROGRESS:
            return {...state,progressVisible:false};
        case SHOW_IMAGE_MODAL:
            return {...state,attactmentType:actions.attactmentType};
        case HIDE_IMAGE_MODAL:
            return {...state,attactmentType:{...state.attactmentType,imageVisible:false}};
        case IMAGEURL:
            return {...state,imageUrl:actions.imageUrl};                                                 
        case GET_ARCHIVES_START:
            return {...state,archivesList:{...state.archivesList,isLoading:true}};
        case GET_ARCHIVES_DONE:
            return {...state,archivesList:{...state.archivesList,isLoading:false}};
        case GET_ARCHIVES_LIST:
            return {...state,archivesList:{...state.archivesList,list:actions.list,count:actions.count}};
        case GET_LEAVEARCHIVES_START:
            return {...state,leaveArchivesList:{...state.leaveArchivesList,isLoading:true}};
        case GET_LEAVEARCHIVES_DONE:
            return {...state,leaveArchivesList:{...state.leaveArchivesList,isLoading:false}};
        case GET_LEAVEARCHIVES_LIST:
            return {...state,leaveArchivesList:{...state.leaveArchivesList,list:actions.list,count:actions.count}};
        case GET_ARCHIVES_DATA:
            return {...state,archivesData:actions.archivesData};  
        case ARCHIVES_TABLE_DATA:
            return {...state,archivesTableData:actions.archivesTableData};
        case GET_EMPLOYEE_WORK:
            return {...state,work:actions.work};
        case GET_EMPLOYEE_SEX:
            return {...state,sex:actions.sex};
        case GET_EMPLOYEE_EDU:
            return {...state,edu:actions.edu};
        case GET_EMPLOYEE_AGE:
            return {...state,age:actions.age};
        case GET_EMPLOYEE_MARRY:
            return {...state,marry:actions.marry};
        case GET_EMPLOYEE_CHILD:
            return {...state,child:actions.child};
        case GET_EMPLOYEE_DEPART:
            return {...state,depart:actions.depart};
        case GET_EMPLOYEE_POST:
            return {...state,post:actions.post};
        case GET_DEPARTMENT_START:
            return {...state,departmentList:{...state.departmentList,isLoading:false}};     
        case GET_DEPARTMENT_DONE:
            return {...state,departmentList:{...state.departmentList,isLoading:true}};       
        case GET_DEPARTMENT_LIST:
            return {...state,departmentList:{...state.departmentList,list:actions.list,count:actions.count}};
        case SHOW_PERSONALMATERIAL_MODAL:
            return {...state,personalMaterialVisible:actions.personalMaterialVisible,personalMaterialData:actions.data};
        case HIDE_PERSONALMATERIAL_MODAL:
            return {...state,personalMaterialVisible:actions.personalMaterialVisible};
        case GET_DEPARTMENT_STAFF:
            return {...state,departmentStaff:actions.departmentStaff, currentUid:actions.currentUid, departmentName:actions.departmentName,current:actions.current}
        case ADD_EDIT_DEPARTMENT:
            return {...state,departmentInfo:actions.departmentInfo};
        case DELETE_DEPARTMENT:
            return {...state,departmentInfo:actions.departmentInfo};
        case GET_ORGANIZE_CHART:
            return {...state,organize:{...state.organize,organizeList:actions.organizeList,isLoading:actions.isLoading}}; 
        case ADD_MECHANISM:
            return {...state,mechanismInfo:actions.mechanismInfo};
        case DELETE_MECHANISM:
            return {...state,mechanismInfo:actions.mechanismInfo};
        case EDIT_MECHANISM:
            return {...state,mechanismInfo:actions.mechanismInfo};          
        case CREDITINVESTGATION:
            return {...state,creditData:actions.creditData};
        case CANCELDATA:
            return {...state,creditData:{}};
        case SEARCHCREDITINVESTGATION:
            return {...state,creditInfoData:actions.creditInfoData,isDataLoading:false};
        case SEARCHCREDITINVESTGATION_START:
            return {...state,isDataLoading:true,searchLoading:true};   
        case CREDITINVESTGATIONSTATE:
            return {...state,isFill:actions.isFill};
        case HIDECREDITINVESTGATIONSTATE:
            return {...state,isFill:actions.isFill,creditInfoData:{}};
        case GET_ARRANGE_DEPARTMENT:
            return {...state,arrangeDepartment:actions.arrangeDepartment};
        case ARRANGE_DEPARTMENT:
            return {...state,mechanismInfo:actions.mechanismInfo};
        case CANCELLOADING:
            return {...state,searchLoading:false};   
        default:
            return state;
    }
}