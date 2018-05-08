import React, {Component} from 'react';

import {Icon} from 'antd';
import store from 'store';
import PlusAttachmentModal from './attactment-modal'; 

import clerkInfo from 'data/clerk/clerk';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const constractData={name: '劳动合同', isShow: 1};
import {Button , DatePicker , Input} from 'antd';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

import LoadingComponent from 'components/loading';
import ViewModal from './view-modal';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class Contract extends Component {

    state = {
        itemData: {},
        attachment_type_con: [],
        btnState:'none',
        isdisabled:true,
        borderState:"1px solid transparent",
        starttime: null,          //合同开始日期
        yearnumber:'',         //合同年限
        endtime: null,            //合同结束日期
        rid:'',
        tokenKey:'',
        token:'',
        endOpen: false,
        isLoading: true,
    }
    componentDidMount(){
        const rid = this.props.queryEmployeeList.list.resumeoff.rid+'';
        this.props.queryEmployee({rid});
        const {token,tokenKey} = store.get('token') || {};
        this.setState({tokenKey, token});
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.listAll)){
            const listArr = filter(nextProps.listAll,(item,key) => {
                return item.type == 2;
            });
            const attachment_type_con = filter(listArr[0].list, (item,key) => {
                return item.type == 10010;
            })
            this.setState({
                attachment_type_con
            });
        }
        if(!isEmpty(nextProps.data)){
            const {
                starttime,          //合同开始日期
                yearnumber,         //合同年限
                endtime,            //合同结束日期
                rid
            } = nextProps.data;
            this.setState({
                starttime,          //合同开始日期
                yearnumber,         //合同年限
                endtime,            //合同结束日期
                rid:rid+'',
                isLoading:false
            })
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextState !== this.state || nextProps !== this.props;
    }

    showImageModal = (parmentType,type) => {
        const {showImageModal, viewUploadAttachment} = this.props;
       showImageModal({parmentType,type,imageVisible:true})
   }
   hideImageModal = () =>{
       this.props.hideImageModal();//隐藏预览框
       this.props.cancelImageUrl();//清空图片地址
   }

    //编辑信息
    editInformation = (field) => {
        if(field=='contract'){
            this.setState({
                btnState:'block',
                isdisabled:false,
                borderState:"1px solid  #d9d9d9",
            })
        }   
    }

    handleCancelClick = (field,e) => {
        const {
                starttime,          //合同开始日期
                yearnumber,         //合同年限
                endtime,            //合同结束日期
            } = this.props.data;
        this.setState({
            starttime,          //合同开始日期
            yearnumber,         //合同年限
            endtime,            //合同结束日期
            btnState:'none',
            borderState:"1px solid transparent",
            isdisabled:true
        })
    }

    handleChange = ( field, e) => {
        this.setState({[field]: e.target.value});
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    disabledStartDate = (starttime) => {
        const endtime = this.state.endtime;
        if (!starttime || !endtime) {
        return false;
        }
        return starttime.valueOf() > endtime.valueOf();
    }

    disabledEndDate = (endtime) => {
        const starttime = this.state.starttime;
        if (!endtime || !starttime) {
        return false;
        }
        return endtime.valueOf() <= starttime.valueOf();
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
        const {starttime,endtime} = this.state;
        if(!open){
            const range = moment.range(moment(starttime).format(),moment(endtime).format());
            const year = range.diff('years')+1;
            this.setState({yearnumber: year + '年'});
        }
    }


    saveInfomation = (field) => {
        const { starttime, endtime } = this.state;
        if (field== 'btnState'){

        const filterObj = pickBy(this.state,(val,key)=>{
            return key =='starttime' || key =='yearnumber' || key =='endtime' || key=='rid' ;
        });
        const filterObjEdu = pickBy(filterObj,(val,key)=>{
            return val !=undefined;
        });
        if( starttime != null || starttime != undefined ) {
            const formatStartTime = moment(starttime).format('YYYY-MM-DD');
        }
        if( endtime != null || starttime != undefined ){
            const formatEndTime = moment(endtime).format('YYYY-MM-DD');
        }
        this.props.editEmployeeInformation({...filterObjEdu, starttime: formatStartTime, endtime: formatEndTime});
        this.setState({
                btnState:'none',
                isdisabled:true,
                borderState:"1px solid  transparent",
        })

        }
    }
    
    render() {
        const {
            attachment_type_con,
            itemData,
            btnState ,
            borderState, 
            isdisabled,
            starttime,          //合同开始日期
            yearnumber,         //合同年限
            endtime,            //合同结束日期
            tokenKey,
            token,
            endOpen,
            isLoading,
        } = this.state;
        return (
            <div className="contract clerk-tab-container">
                {isLoading && 
                    <LoadingComponent style={{
                        position: 'absolute',
                        top: 100,
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#FFF',
                        zIndex: 2
                    }} />
                    
                }
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                合同信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span 
                                    onClick = {this.editInformation.bind(this,'contract')}
                                >
                                    编辑
                                </span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 60}}>
                                <li>
                                    <span>合同开始日期 : </span>
                                    <span>
                                        <DatePicker
                                            disabledDate={this.disabledStartDate}
                                            value={starttime ? moment(starttime) : null}
                                            disabled={isdisabled}
                                            onChange={this.onTimeChange.bind(this,'starttime')}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>合同年限 : </span>
                                    <span>
                                        <Input
                                            value={yearnumber}
                                            disabled={isdisabled}
                                            style={{border:borderState}}
                                            onChange={this.handleChange.bind(this,'yearnumber')}
                                        />
                                    </span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>合同结束日期 : </span>
                                    <span>
                                        <DatePicker
                                            disabledDate={this.disabledEndDate}
                                            value={endtime ? moment(endtime) : null}
                                            disabled={isdisabled}
                                            onChange={this.onTimeChange.bind(this,'endtime')}
                                            open={endOpen}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                            <div style={{position:'absolute',bottom:20,left:'45%'}}>
                                <Button 
                                    type='primary' 
                                    style={{display:btnState,float:'left',marginRight:20}}
                                    onClick={this.saveInfomation.bind(this,'btnState')}
                                    >
                                        保存
                                </Button>
                                <Button  
                                    style={{display:btnState}}
                                    onClick={this.handleCancelClick.bind(this,'cancelBtnState')}
                                    >
                                    取消
                                 </Button>
                            </div>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                合同附件
                            </h3>
                            {
                                attachment_type_con.map((value,index) => {
                                    const {name} = value;
                                    return(
                                        <div key={name} 
                                             className="add-attactment" 
                                             style={{display: 'inline-block'}}
                                        >
                                        {
                                            value.attachment_type.length==0 ?
                                            <div className="plus-circle">
                                                <Icon type="frown-o"
                                                    style={{ 
                                                        paddingTop:'30px',
                                                        fontSize: 45, 
                                                        color: '#d2d2d2',
                                                    }}
                                                />
                                                <p >{`未添加${name}`}</p> 
                                            </div> : 
                                            <div className="preview-pics">
                                                {(value.attachment_type[0].filenameExt!="jpg" && value.attachment_type[0].filenameExt!="png")?
                                                    <img alt="材料附件"  src="/static/images/manager/clerk/fjcl.png"/>
                                                    :
                                                    <img alt="材料附件"  src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${value.attachment_type[0].filename}`}  
                                                />}
                                                <div  className="mask" >
                                                    <Icon 
                                                        type="eye-o" 
                                                        onClick={this.showImageModal.bind(this,value.parmentType,value.type)}
                                                        title={`点击预览${name}附件`}
                                                    >
                                                        <span>预览</span>
                                                    </Icon>
                                                </div>
                                            </div>
                                        }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </li>
                </ul>
                <ViewModal/>  
            </div>
        );
    }
}

const mapStateToProps = state => ({
    attactmentModal: state.Manage.attactmentModal,
    imageUrl: state.Manage.imageUrl,
    imageVisible: state.Manage.imageVisible,
    queryEmployeeList: state.Manage.queryEmployeeList,
})

const mapDispatchToProps = dispatch => ({
    queryEmployee: bindActionCreators(Actions.ManageActions.queryEmployee,dispatch),
    showAttachmentModal: bindActionCreators(Actions.ManageActions.showAttachmentModal,dispatch),
    hideAttachmentModal: bindActionCreators(Actions.ManageActions.hideAttachmentModal,dispatch),
    DeleteMaterial: bindActionCreators(Actions.ManageActions.DeleteMaterial,dispatch),
    viewUploadAttachment: bindActionCreators(Actions.ManageActions.viewUploadAttachment,dispatch),
    downloadAttachment: bindActionCreators(Actions.ManageActions.downloadAttachment,dispatch),
    showImageModal: bindActionCreators(Actions.ManageActions.showImageModal,dispatch),
    hideImageModal: bindActionCreators(Actions.ManageActions.hideImageModal,dispatch),
    cancelImageUrl: bindActionCreators(Actions.ManageActions.cancelImageUrl,dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contract)