import React, {Component} from 'react';
import { Modal, Tag , Button, Input } from 'antd';

import {DatePickerComponent} from '../input-select-time';
import trim from 'lodash/trim';
import pickBy from 'lodash/pickBy';
import moment from 'moment';

import clerkInfo from 'data/clerk/clerk';

export default class PermanentModal extends Component {

    state = {
        date: null,
        msg: '',
        errMsg: false,
        name:'',           //姓名
        englishname:'',    //英文名      
        department:undefined,     //部门
        position:'',       //职位
        sex:undefined,            //性别
        birthday:'',       //出生日期
        inthetime:'',       //入职时间
        constellation:'',
        expdate: null,      //预计转正日期  
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            const {data} = nextProps,
            {resumeoff,constellation}=data;
            if(resumeoff){
                const {   
                    name,           //姓名
                    englishname,    //英文名      
                    department,     //部门
                    position,       //职位
                    sex,            //性别
                    birthday,       //出生日期
                    inthetime,      //入职时间
                    expdate,        //预计转正日期
                } = resumeoff;
                this.setState({
                    name,           //姓名
                    englishname,    //英文名      
                    department,     //部门
                    position,       //职位
                    sex,            //性别
                    birthday,       //出生日期
                    inthetime,       //入职时间
                    constellation,
                    expdate
                })
            }
        }
    }

    shouldComponentUpdate(nextState,nextProps){
        return nextProps != this.props || nextState != this.state;
    }


    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    onTextareaChange= (field,e) => {
        if(field==="msg"){
            this.setState({
                msg: e.target.value
            });
            this.triggerError(false);
        }
    }

    handleBlur = value => {
        if(!value){
            commentInput.refs.input.focus();
            this.triggerError(true);
        }
    }

    triggerError = errMsg => {
        this.setState({errMsg});
    }

    disabledDate = date => {
        if(!date){
            return false;
        }
        return date.valueOf() < new Date().getTime();
    }

    getFormData = () => {
        const {
            date,
            msg
        } = this.state;
        const {
            positivedateDatePicker,
            commentInput
        } =this.refs;
        const {
            handleOpenChange
        } = positivedateDatePicker;
        if(date === null){
            handleOpenChange(true);
            return false;
        }
        if(msg === ''){
            commentInput.focus();
            this.triggerError(true);
            return false;
        }
        const filterObj = pickBy(this.state,(item,key)=>{
            return key == 'msg' || key == 'date';
        });
        const formatTime = moment(date).format('YYYY-MM-DD');
        return {...filterObj,date:formatTime};
    }

    //办理转正
    handlePositiveEmployees = () => {
        const {
            positiveEmployees,
            rid,
            getOperationList
        } = this.props;
        const permanentData = this.getFormData();
        if(!permanentData) return;
        positiveEmployees({...permanentData,rid:rid},getOperationList);
    }

    render(){
        const {
            permanentModal,
            hidePermanentModal
        } = this.props,
        {visible} = permanentModal;
        const {
            name,           //姓名
            englishname,    //英文名      
            department,     //部门
            position,       //职位
            sex,            //性别
            birthday,       //出生日期
            inthetime,       //入职时间
            errMsg,
            constellation,
            date,
            expdate
        } = this.state;
        return(
            <Modal
                title="办理转正"
                wrapClassName="grey-close-header vertical-center-modal permanent-wrap"
                visible={visible}
                onCancel={hidePermanentModal}
                onOk={this.handlePositiveEmployees}
                width={827}
            >
                <div className="base-info">
                <ul>
                    <li>
                        <div className="inline-block">
                            {trim(name)}
                        </div>
                        {englishname && <div className="inline-block en-name">
                            {englishname}
                        </div>}
                    </li>
                    <li>
                        {department && <span style={{
                            marginRight: 6
                        }}>{department}</span>}
                        {position && <span>|</span>}
                        {position && <span style={{
                            marginLeft: 6
                        }}>{position}</span>}
                    </li>
                    <li>
                        {sex && <span style={{
                            marginRight: 6
                        }}>{sex}</span>}
                        {birthday && <span>|</span>}
                        {birthday && <span style={{
                                marginLeft: 6,
                                marginRight: 6
                        }}>{parseInt(moment(birthday,"YYYYMMDD").fromNow())}岁</span>}
                        {constellation && <span>|</span>}
                        {constellation &&  <span style={{
                                marginLeft: 6,
                                marginRight: 6
                        }}>{constellation}</span>}
                        {inthetime && <span>|</span>}
                        {inthetime && <span style={{ 
                                marginLeft: 6,
                                marginRight: 6
                        }}>入职时长：{moment(inthetime).startOf('day').fromNow()}</span>}
                    </li> 
                </ul>
                </div>
                <div className="regular-field clearfix">
                    <div className="pull-left">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span className="required-asterisk">预计转正日期：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>{expdate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="pull-right"> 
                        <DatePickerComponent
                            name="正式入职日期："
                            ref="positivedateDatePicker"
                            field="date"
                            value={date}
                            placeholder="请选择转正日期"
                            style={{width: 224, height: 40, lineHeight: "40px"}}
                            onChange={this.onTimeChange}
                            asterisk={true}
                        />
                    </div>
                </div>
                <div className="inline-block table" style={{marginTop: 30}}>
                    <div className="table-cell"
                            style={{
                                verticalAlign: "top",
                                paddingRight: 9
                            }}
                    >
                        <span style={{fontSize: 14}}>评语：</span>
                    </div>
                    <div className="table-cell">
                        <Input type="textarea" rows="3"
                            ref = "commentInput" 
                            className={errMsg ? 'error' : ''}
                            onChange={this.onTextareaChange.bind(this,"msg")}
                            onBlur={this.handleBlur}
                            style={{
                                minWidth: 707,
                                maxWidth: 707,
                                height: 130,
                                borderRadius: 10,
                                resize: "horizontal"
                        }}/>
                        {errMsg && 
                        <div className="error-promote">
                            <label className="error">&nbsp;&nbsp;请输入评语</label>
                        </div>
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}