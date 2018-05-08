import React, {Component} from 'react';
import moment from 'moment';
import {Input , Button ,DatePicker, Select, Cascader,notification} from 'antd';
const Option = Select.Option;

import isEmpty from 'lodash/isEmpty';

import clerkInfo from 'data/clerk/clerk';
import pickBy from 'lodash/pickBy';
import LoadingComponent from 'components/loading';

import {TreeSelectComponent} from '../input-select-time'; 
import city from 'data/city.json';

export default class PositionInfo extends Component {

    state = {
        isQualified: true,          //是否提前转正
        btnState:'none',
        borderState:"1px solid transparent",
        isdisabled:true,
        // btnDynamicsState:'none',
        // dateBorderState:"1px solid transparent",
        // isDatedisabled:true,
        inthetime:'',              //入职时间
        expdate: null,             //预计转正时间
        positivedate:'',           //转正时间
        workstatus: '',            //职员类型，0 试用期 1 正式员工 2 离职员工 默认为0
        isLoading: true,
        list: [],
        worknumber: '',             //工号
        worknature: '',             //工作性质
        departmentid: '',
        department: '',
        position: '',               //岗位
        positionclass: '',          //岗位职级
        workcity: '',               //工作地点
        workphone: '',              //工作电话
        ext: '',                    //分机号
        cemail: '',                 //企业邮箱
        contactname: '',            //紧急联系人
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data.rid){
            this.setState({
                isLoading:false
            })
        }
        if(!isEmpty(nextProps.data)){
            const dateFormat = 'YYYY-MM-DD';
            const {getTreeList,departmentList} = nextProps;
            const {list} = departmentList;
            const {
                worknumber,             //工号
                worknature,             //工作性质
                department,             //部门
                departmentid,           //原部门id
                position,               //岗位
                positionclass,          //岗位职级
                workcity,               //工作地点
                workphone,              //工作电话
                ext,                    //分机号
                cemail,                 //企业邮箱
                contactname,            //紧急联系人
                inthetime,              //入职时间
                positivedate,           //转正时间
                expdate,
                workstatus,
                theleng,                //试用期
                rid,
            } = nextProps.data;
            this.setState({
                worknumber,             //工号
                worknature,             //工作性质
                department,             //部门
                departmentid,           //原部门id
                position,               //岗位
                positionclass,          //岗位职级
                workcity,               //工作地点
                workphone,              //工作电话
                ext,                    //分机号
                cemail,                 //企业邮箱
                contactname,            //紧急联系人
                inthetime: moment(inthetime).format('YYYY-MM-DD'),              //入职时间
                positivedate: moment(positivedate).format('YYYY-MM-DD'),        //转正时间
                theleng,
                expdate,
                workstatus,
                rid:rid+'',
                list,
                isLoading:false
            })
        }
    }


    setQualified = isQualified => {
        this.setState({isQualified});
    }


    handleChange = (field,e) => {
        const {
                worknumber,             //工号
                worknature,             //工作性质
                department,             //部门
                departmentid,           //原部门id
                position,               //岗位
                positionclass,          //岗位职级
                workcity,               //工作地点
                workphone,              //工作电话
                ext,                    //分机号
                cemail,                 //企业邮箱
                contactname,            //紧急联系人
                inthetime,              //入职时间
                positivedate,           //转正时间
                theleng,                //试用期
                expdate,
                workstatus,
                rid,
            } = this.props.data;
        if(field=='cancelBtnState'){
            this.setState({
                worknumber,             //工号
                worknature,             //工作性质
                department,             //部门
                departmentid,           //原部门id
                position,               //岗位
                positionclass,          //岗位职级
                workcity,               //工作地点
                workphone,              //工作电话
                ext,                    //分机号
                cemail,                 //企业邮箱
                contactname,            //紧急联系人
                btnState:'none',
                borderState:"1px solid transparent",
                isdisabled:true
            })
        }
        // else if(field=='cancelTimeBtnState'){
        //     this.setState({
        //         inthetime:moment(inthetime).format('YYYY-MM-DD'),               //入职时间
        //         positivedate:moment(positivedate).format('YYYY-MM-DD'),         //转正时间
        //         theleng,                                                        //试用期
        //         btnDynamicsState:'none',
        //         dateBorderState:"1px solid transparent",
        //         isDatedisabled:true
        //     })
        // }
        else {
            if (typeof e === 'string' || typeof e === 'undefined') {
                this.setState({
                    [field]: e
                });
            } else {
                this.setState({
                    [field]: e.target.value
                });
            }
        }
        
    }
    onDateChange = (field,value) => {
        this.setState({
            [field]:moment(value).format('YYYY-MM-DD')
        })
    }

    handleCityChange = (field,val) => {
        this.setState({
            workcity: val.length > 0 ? val[0] + '-' + val[1] : ''
        });
    }

    handleNumChange = (field,e) => {
        const pattern = /[^\d]/ig;
        this.setState({
            [field]: e.target.value.replace(pattern,'')
        });
    }

    handleNameChange = (field,e) => {
        const pattern = /[\d]/ig;
        this.setState({
            [field]: e.target.value.replace(pattern,'')
        });
    }

    handleTreeSelect =(field,e) =>{
        this.setState({
            [field]: e,
            departmentid: e+''            
        })
    }

    //验证工号是否重复
    handleBlur = (field,value) => {
        // const {allCrewList} = this.props;
        // const {worknumber} = this.state;
        // const {worknumberInput} = this.refs;
        // allCrewList.forEach((item,index) => {
        //     if(value !=''){
        //         if( field =='worknumber' && item.worknumber == worknumber){
        //             worknumberInput.focus();
        //             notification.error({
        //                 message: '错误',
        //                 description: '工号重复'
        //             });
        //         }
        //     }
        // })
    }

    //判断是否是邮箱
    isEmail = (value) => {
        const pattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return pattern.test(value);
    }

    //编辑信息
    editInformation = () => {
        this.setState({
            btnState:'block',
            borderState:"1px solid #d9d9d9",
            isdisabled:false
        })
    }
    //编辑员工动态
    editEmployeeDynamics = () => {
        this.setState({
            btnDynamicsState:'block',
            dateBorderState:"1px solid #d9d9d9",
            isDatedisabled:false
        })
    }

    getPositionData = () => {
        const {
            worknumber,             //工号
            worknature,             //工作性质
            departmentid,
            department,
            position,               //岗位
            positionclass,          //岗位职级
            workcity,               //工作地点
            workphone,              //工作电话
            ext,                    //分机号
            cemail,                 //企业邮箱
            contactname,            //紧急联系人
            list,
            rid
        } = this.state;
        const {
            worknumberInput,
            cemailInput,
        } = this.refs;
        
        //设置部门名称
        const {getTreeList} = this.props;
        const treeList = getTreeList(list);
        let treeName = '';
        if(departmentid != ''){
            const filterItem = treeList.filter((item,index) => {
                if(item.uid == departmentid) return item
            })
            treeName = filterItem[0].name;
        }

        console.log(worknumber,cemail)
        //校验工号重复性
        // const {allCrewList} = this.props;
        // allCrewList.forEach((item,index) => {
        //     if(worknumber != undefined && item.worknumber == worknumber){
        //         worknumberInput.focus();
        //         notification.error({
        //             message: '错误',
        //             description: '工号重复'
        //         });
        //         return false;
        //     } 
        // })

        //校验企业邮箱
        if(cemail != undefined && !this.isEmail(cemail)){
            cemailInput.focus();
            notification.error({
                message: '错误',
                description: '邮箱格式错误'
            });
            return false;
        }

        const filterObj = pickBy(this.state,(val,key)=>{
            return (key == 'worknumber' || key == 'worknature' || key=='departmentid' || key == 'department' ||
                key == 'position' || key == 'positionclass' || key == 'workcity' || key == 'workphone' ||
                key == 'workphone' || key == 'ext' || key == 'cemail' || key == 'contactname'
            );
        });

        return {...filterObj,department:treeName,rid}
    }

    //保存信息
    saveInfomation = (value) => {
        // if(value=='btnState'){
            const positionData = this.getPositionData();
            if (!positionData)return;
            this.props.editEmployeeInformation({...positionData});
            this.setState({
                btnState:'none',
                borderState:"1px solid transparent",
                isdisabled:true
            })
        // }
        // else if (value=='btnDynamicsState'){
        //     const { 
        //             inthetime,
        //             positivedate,  
        //             theleng, 
        //             rid
        //         }= this.state;
        //    this.props.editEmployeeInformation({inthetime:inthetime,positivedate:positivedate,theleng:theleng,rid:rid})
        //     this.setState({
        //         btnDynamicsState:'none',
        //         dateBorderState:"1px solid transparent",
        //         isDatedisabled:true
        //     })
        // }
        
    }
   
    render() {
       const {
            isQualified , 
            btnState,
            worknumber,             //工号
            worknature,             //工作性质
            department,             //部门
            position,               //岗位
            positionclass,          //岗位职级
            workcity,               //工作地点
            workphone,              //工作电话
            ext,                    //分机号
            cemail,                 //企业邮箱
            contactname,            //紧急联系人
            inthetime,              //入职时间
            positivedate,           //转正时间
            theleng,                //试用期
            expdate,
            workstatus,
            borderState,
            isdisabled,
            btnDynamicsState,
            isDatedisabled,
            dateBorderState,
            list
        } = this.state;
        const dateFormat = 'YYYY-MM-DD';
        const {isLoading} = this.state;
        return (
            <div className="position-info clerk-tab-container">
                 {isLoading && 
                    <LoadingComponent style={{
                        position: 'absolute',
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
                                在职信息
                            </h3>
                            <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span onClick={this.editInformation}>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>工号 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            ref="worknumberInput"
                                            placeholder="请填写工号"
                                            value={worknumber}
                                            onChange={this.handleNumChange.bind(this,'worknumber')}
                                            onBlur={this.handleBlur.bind(this,'worknumber')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <TreeSelectComponent
                                        ref="departmentSelect"
                                        name="部门："
                                        treeList={list}
                                        dropdownMatchSelectWidth={true}
                                        value={department}
                                        field="department"
                                        placeholder="请选择部门"
                                        onChange={this.handleTreeSelect}
                                        treeDefaultExpandAll={true}
                                        style={{ width: 147}}
                                        disabled = {isdisabled} 
                                    />
                                </li>
                                <li>
                                    <span>岗位职级 : </span>           
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={positionclass}
                                            placeholder="请填写岗位职级"
                                            onChange={this.handleChange.bind(this,'positionclass')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>工作电话 : </span>
                                    <span>
                                        <Input 
                                            //style={{border:borderState}}
                                            disabled = {isdisabled}
                                            value={workphone}
                                            placeholder="请填写工作电话"
                                            onChange={this.handleNumChange.bind(this,'workphone')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>企业邮箱 : </span>
                                    <span>
                                        <Input
                                            ref="cemailInput"
                                            //style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            placeholder="请填写企业邮箱"
                                            value={cemail}
                                            onChange={this.handleChange.bind(this,'cemail')}
                                        />
                                    </span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>工作性质 : </span>
                                    <span>
                                        <Select
                                            disabled = {isdisabled} 
                                            value={worknature}
                                            placeholder="请选择"
                                            onChange={this.handleChange.bind(this,'worknature')}
                                            style={{width:147}}
                                        >
                                            <Option value="全职">全职</Option>
                                            <Option value="兼职">兼职</Option>
                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>岗位 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={position}
                                            placeholder="请填写岗位"
                                            onChange={this.handleChange.bind(this,'position')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>工作地点 : </span>
                                    <div className="inline-block city-regions">
                                        <Cascader
                                            options={city}
                                            disabled = {isdisabled} 
                                            value={workcity ? workcity.split("-") : ''}
                                            onChange={this.handleCityChange.bind(this,'workcity')}
                                            displayRender={label => label.join(' - ')}
                                            placeholder="请选择"
                                            style={{width: 147}}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <span>分机号 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={ext}
                                            placeholder="请填写分机号"
                                            onChange={this.handleChange.bind(this,'ext')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>紧急联系人 : </span>
                                    <span style={{width:147}}>
                                        <Input
                                            //style={{border:borderState}}
                                            disabled = {isdisabled} 
                                            value={contactname}
                                            placeholder="请填写紧急联系人"
                                            onChange={this.handleNameChange.bind(this,'contactname')}
                                        />
                                    </span>
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
                                    onClick={this.handleChange.bind(this,'cancelBtnState')}
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
                                员工状态
                            </h3>
                            {/* <div className="editor-wrap inline-block">   
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span onClick={this.editEmployeeDynamics}>编辑</span>
                            </div> */}
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>入职时间 : </span>
                                    <span>
                                        {moment(inthetime).format("YYYY-MM-DD")}
                                        {/* <DatePicker
                                            disabled={isDatedisabled}
                                            value={inthetime?moment(moment(inthetime), dateFormat):''} 
                                            format={dateFormat}
                                            allowClear={false}
                                            onChange={this.onDateChange.bind(this,'inthetime')}
                                        /> */}
                                        
                                    </span>
                                </li>
                                <li>
                                    <span>试用期 : </span>
                                    <span>
                                        {theleng}
                                        {/* <Input 
                                            style={{border:dateBorderState}}
                                            value={theleng}
                                            disabled={isDatedisabled}
                                            onChange={this.handleChange.bind(this,'theleng')}
                                        /> */}
                                    </span>
                                </li>
                            </ul>  
                            <ul className="field-list inline-block">
                                <li>
                                    <span>转正时间{ isQualified && <i>(提前转正)</i>} : </span>
                                    <span>
                                        {moment( positivedate || expdate).format("YYYY-MM-DD")}
                                        {/* <DatePicker
                                            format={dateFormat}
                                            disabled={isDatedisabled}
                                            value={positivedate?moment(moment(positivedate), dateFormat):''}
                                            allowClear={false}
                                            onChange={this.onDateChange.bind(this,'positivedate')}
                                        /> */}
                                    </span>   
                                </li>
                                <li>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </li>
                            </ul>
                            {/* <div style={{position:'absolute',bottom:20,left:'45%'}}>
                                <Button 
                                    type='primary' 
                                    style={{display:btnDynamicsState,float:'left',marginRight:20}}
                                    onClick={this.saveInfomation.bind(this,'btnDynamicsState')}
                                    >
                                    保存
                                 </Button>
                                 <Button  
                                    style={{display:btnDynamicsState}}
                                    onClick={this.handleChange.bind(this,'cancelTimeBtnState')}
                                    >
                                    取消
                                 </Button>
                            </div>   */}
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}