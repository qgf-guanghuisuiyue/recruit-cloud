import React, {Component} from 'react';
import { Modal, Tag , Button, Input, Radio, Cascader } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import {ErrorInputComponent,SelectComponent,DatePickerComponent,TreeSelectComponent} from '../input-select-time';

// lodash 
import chunk from 'lodash/chunk';
import pickBy from 'lodash/pickBy';
import omitBy from 'lodash/omitBy';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import clerkInfo from 'data/clerk/clerk';
import transferType from 'data/transfer-personnel-radio.json';
import city from 'data/city.json';

//**1.57 员工人事调动 */

export default class TransferPersonnelModal extends Component {

    state = {
        type:'调岗',                //调用类型
        departmentid:'',        //原部门id
        department:'',          //原部门name
        new_departmentid:'',    //新部门id
        new_department:undefined,      //新部门name
        post:'',                //原岗位名称
        new_post:'',            //新岗位名称
        worksite:'',            //原工作地点
        new_worksite:'',        //新工作地点
        company:'',             //原合同公司name
        new_company:'',         //新合同公司name
        eventdate:null,           //生效日期
        joblevel:'',            //岗位级别
        new_joblevel:'',        //新岗位级别
        msg:'其他',                  //备注
        list: []
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.data)){
            const {
                data,
                rid,
                departmentList,
                getTreeList
            }=nextProps,
            {resumeoff}=data;
            const {list} = departmentList;
            if(resumeoff){
                const {
                    departmentid,
                    department,
                    position,
                    workcity,
                    contractname,
                    joblevel
                } = resumeoff;
                this.setState({
                    departmentid,
                    department,
                    post: position,
                    worksite: workcity,
                    company: contractname,
                    joblevel,
                    list
                })
            }
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    onRadioChange = (e) => {
        this.setState({
            type: e.target.value
        });
    }

    handleChange = (filed, e) => {
        if (typeof e === 'string' || typeof e === 'undefined') {
            this.setState({
                [filed]: e
            });
        } else {
            this.setState({
                [filed]: e.target.value
            });
        }
    }

    handleTreeSelect =(field,e) =>{
        this.setState({
            [field]: e,
            new_departmentid: e+''            
        })
    }

    handleCityChange = (val) => {
        this.setState({
            new_worksite: val.length > 0 ? val[0] + '-' + val[1] : ''
        });
    }

    disabledDate = date => {
        if(!date){
            return false;
        }
        return date.valueOf() < new Date().getTime();
    }

    handleMsgChange = (e) => {
        this.setState({
            msg: e.target.value
        })
    }

    getFormData = () => {
        const {
            new_departmentid,      //新部门id
            new_department,
            new_company,         //新合同公司name
            eventdate,           //生效日期
            list
        } = this.state;
        const {getTreeList} = this.props;
        const treeList = getTreeList(list);
        const {
            departmentSelect,
            positionSelect,
            joblevelInput,
            eventdateInput
        } = this.refs;
        const {
            handleOpenChange
        } = eventdateInput;
        
        let treeName = '';
        if(new_departmentid != ''){
            const filterItem = treeList.filter((item,index) => {
                if(item.uid == new_departmentid) return item
            })
            treeName = filterItem[0].name;
        }

        //yyyy-MM-dd 
        if(eventdate === null){
            handleOpenChange(true);
            return false;
        }
        const formatTime = moment(eventdate).format('YYYY-MM-DD');
        const filterObj = pickBy(this.state,(item,key) => {
            return key != 'list';
        });
        return {...filterObj,eventdate: formatTime,new_department:treeName};
    }

    //点击ok的回调
    handleMobilizeEmployee = () => {
        const {transferPersonnelModal} = this.props,
        {isTransferPersonnel} = transferPersonnelModal;
        if(isTransferPersonnel) return;
        const {
            mobilizeEmployee,
            rid
        } = this.props;
        const transferPersonnelData = this.getFormData();
        if(!transferPersonnelData) return;
        mobilizeEmployee({...transferPersonnelData,rid:rid})
    }

    render(){
        const {
            transferPersonnelModal,
            hideTransferPersonnelModal,
            data
        } = this.props,
        {visible} = transferPersonnelModal,
        {
            type,                //调用类型
            departmentid,        //原部门id
            department,          //原部门name
            new_departmentid,    //新部门id
            new_department,      //新部门name
            post,                //原岗位名称
            new_post,            //新岗位名称
            worksite,            //原工作地点
            new_worksite,        //新工作地点
            company,             //原合同公司name
            new_company,         //新合同公司name
            eventdate,           //生效日期
            joblevel,            //岗位级别
            new_joblevel,        //新岗位级别
            msg,
            list
        }=this.state;
        return(
            <Modal
                title="人事调动"
                wrapClassName="grey-close-header vertical-center-modal transfer-personnel-wrap"
                visible={visible}
                onCancel={hideTransferPersonnelModal}
                onOk={this.handleMobilizeEmployee}
                width={827}
            >
                <ul>
                    <li>
                        <div className="inline-block">
                            <span>调动类型：</span>
                            <RadioGroup  onChange={this.onRadioChange} refs="TypeRadio" value={type}>
                                {
                                    transferType.map((item,index)=>{
                                        const {name,value} = item;
                                        return (
                                            <div key={index} className="inline-block">
                                                <Radio 
                                                    value={name}
                                                >{name}</Radio>
                                            </div>
                                        )}    
                                    )
                                }
                            </RadioGroup>
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>原部门：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>{department}</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <TreeSelectComponent
                                ref="departmentSelect"
                                name="现部门："
                                treeList={list}
                                dropdownMatchSelectWidth={true}
                                value={new_department}
                                field="new_department"
                                placeholder="请选择部门"
                                onChange={this.handleTreeSelect}
                                treeDefaultExpandAll={true}
                            />
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>原岗位：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>{post}</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <ErrorInputComponent
                                ref="positionSelect"
                                name="现岗位："
                                field="new_post"
                                placeholder="请输入岗位"
                                value={new_post}
                                onChange={this.handleChange}
                            /> 
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>原岗位职级：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>{joblevel}</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <ErrorInputComponent
                                ref="joblevelInput"
                                name="现职位职级："
                                field="new_joblevel"
                                placeholder="请输入职级"
                                value={new_joblevel}
                                onChange={this.handleChange}
                            />
                        </div>
                    </li>
                    <li className="clearfix">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>原工作地点：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>{worksite}</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <div className="inline-block">
                                <span>现工作地点：</span>
                                <div className="inline-block city-regions">
                                    <Cascader
                                        options={city}
                                        value={new_worksite ? new_worksite.split("-") : ''}
                                        onChange={this.handleCityChange}
                                        displayRender={label => label.join(' - ')}
                                        placeholder="请选择工作地点"
                                    />
                                </div>
                            </div>
                        </div> 
                    </li>
                    <li className="clearfix">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>原合同公司：</span>
                            <div className="inline-block">
                                <span style={{fontWeight: 'bold'}}>{company}</span>
                            </div>
                        </div>
                        <div className="pull-right">
                            <ErrorInputComponent
                                ref="companyInput"
                                name="现合同公司："
                                field="new_company"
                                placeholder="请输入合同公司"
                                value={new_company}
                                onChange={this.handleChange}
                            />   
                        </div>
                    </li>
                    <li className="clearfix">
                        <DatePickerComponent
                            ref="eventdateInput"
                            name="生效时间："
                            field="eventdate"
                            value={eventdate}
                            placeholder="请选择生效日期"
                            style={{width: 224, height: 40}}
                            onChange={this.onTimeChange}
                        />            
                    </li>
                    <li className="checked-factors">
                        <div className="inline-block" style={{lineHeight: "40px"}}>
                            <span>备注：</span>
                            <div className="inline-block">
                                <RadioGroup onChange={this.handleMsgChange} value={msg}>
                                {
                                    [
                                        '工作安排',
                                        '个人申请',
                                        '其他'
                                    ].map((radio,key) => {
                                        return(
                                            <RadioButton value={radio}>{radio}</RadioButton>
                                        )
                                    })
                                }
                                </RadioGroup>
                            </div>    
                        </div>    
                    </li>
                </ul>
            </Modal>
        )
    }
}