import React, { Component, PropTypes } from 'react';

import { Input, Select, Cascader, Button, Icon, notification, Modal } from 'antd';
const Option = Select.Option;

import pickBy from 'lodash/pickBy';
import omitBy from 'lodash/omitBy';
import includes from 'lodash/includes';
import moment from 'moment';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

import city from 'data/city.json';
import salaryData from 'data/salary.json';

import {ErrorInputComponent,SelectComponent,DatePickerComponent,TreeSelectComponent} from './input-select-time'; 

class NewClerkForm extends Component {

    state = {
        name: '',                   //姓名
        englishname: '',            //英文名
        worknumber: '',             //工号
        sex: undefined,             //性别
        mobile: '',                 //手机号
        workemail: '',              //个人邮箱
        documenttype: undefined,    //证件类型
        card: '',                   //证件号码
        worknature: undefined,      //工作性质
        inthetime: null,            //入职日期
        workstatus: undefined,      //工作状态
        theleng: undefined,         //试用期时长
        contractname: '',           //合同公司
        workcity: undefined,        //工作地点
        department: undefined,      //部门
        departmentid:'',            //原部门id
        position: '',               //职位
        workphone: '',              //工作电话
        cemail: '',                 //企业邮箱
        contactname: '',            //紧急联系人
        contactphone: '',           //紧急联系人电话
    }

    componentDidMount() {
        NProgress.done();
        const {
            getDepartMentList,
            getUserInfo,
            getCrewList,
        } = this.props;
        getDepartMentList();
        getUserInfo();
        getCrewList();
    }

    handleClick = () => {
        window.history.back(-1)        
    }

    handleChange = (field,e) => {
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

    handleTreeSelect =(field,e) =>{
        this.setState({
            [field]: e,
            departmentid: e+''            
        })
    }
    
    handleCityChange = (val) => {
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

    isMobile = (value) => {
        const pattern = /^13[\d]{9}$|^14[5,6,7,8,9]{1}\d{8}$|^15[^4]{1}\d{8}$|^16[6]{1}\d{8}$|^17[0,1,2,3,4,5,6,7,8]{1}\d{8}$|^18[\d]{9}$|^19[8,9]{1}\d{8}$/;  
        return pattern.test(value);
    }

    // handleMobileBlur = (field, value) => {
    //     const { mobileInput } = this.refs;
    //     if(this.isMobile(value)){
    //         this.setState({
    //             [field]: value
    //         });
    //     }else {
    //         mobileInput.refs.input.focus();
    //         notification.error({
    //             message: '错误',
    //             description: '手机号格式错误'
    //         });
    //     }
    // }

    isEmail = (value) => {
        const pattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return pattern.test(value);
    }

    // handleMailBlur = (field, value) => {
    //     if(this.isEmail(value)){
    //         this.setState({
    //             [field]: value
    //         });
    //     }else {
    //         notification.error({
    //             message: '错误',
    //             description: '邮箱格式错误'
    //         });
    //     }
    // }

    handleCardChange = (field,e) => {
        const pattern = /[^(\d|x|X)]/ig;
        this.setState({
            [field]: e.target.value.replace(pattern,'')
        });
    }
    
    // 验证身份证号码格式是否正确
    // 仅支持二代身份证
    // @author chiopin
    // @param string $idcard 身份证号码
    // @return boolean
    
    isIdCard = (idcard) => {
        // 只能是18位
        if(idcard.length!=18){
            return false;
        }
        
        const vCity = new Array(
        '11','12','13','14','15','21','22',
        '23','31','32','33','34','35','36',
        '37','41','42','43','44','45','46',
        '50','51','52','53','54','61','62',
        '63','64','65','71','81','82','91'
        );
        
        const pattern = /^([\d]{17}[xX\d]|[\d]{15})$/;
        
        if (!(pattern.test(idcard))) return false;
        
        if (!includes(vCity, idcard.substr(0, 2))) return false;
        
        // 取出本体码
        const idcard_base = idcard.substr(0, 17);
        
        // 取出校验码
        const verify_code = idcard.substr(17, 1);
        
        // 加权因子
        const factor = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        
        // 校验码对应值
        const verify_code_list = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        
        // 根据前17位计算校验码
        let total = 0;
        for(let i=0; i<17; i++){
            total += idcard_base.substr(i, 1)*factor[i];
        }
        
        // 取模
        const mod = total % 11;
        
        // 比较校验码
        if(verify_code == verify_code_list[mod]){
            return true;
        }else{
            return false;
        }
    }

    handleIdCardBlur = (field, value) => {
        const {documenttype} = this.state;
        if(documenttype == '身份证件'){
            const { cardInput } = this.refs;
            if(this.isIdCard(value)){
                this.setState({
                    [field]: value
                });
            }else {
                cardInput.refs.input.focus();
                notification.error({
                    message: '错误',
                    description: '身份证格式错误'
                });
            }
        }
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value
        });
    }

    disabledDate = date => {
        if(!date){
            return false;
        }
        return date.valueOf() < new Date().getTime();
    }

    showNameRepeatModal = () => {
        Modal.warning({
            title: '姓名重复，是否继续提交？',
            content: '点击ok继续提交',
            onOk() {
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 500);
              }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }

    handleBlur = (field,value) => {
        const {crewList} = this.props;
        const allCrewList = crewList.list;
        const {
            name,
            worknumber,
            mobile,
            workemail,
            documenttype,
            card
        } = this.state;
        const {
            nameInput,
            worknumberInput,
            mobileInput,
            workemailInput,
            cardInput
        } = this.refs;
        allCrewList.forEach((item,index) => {
            if(value !=''){
                if( field == 'name' && value == item.name){
                    this.showNameRepeatModal();
                }
                if( field =='worknumber' && item.worknumber == worknumber){
                    worknumberInput.refs.input.focus();
                    notification.error({
                        message: '错误',
                        description: '工号重复'
                    });
                }
                if( field =='mobile' && item.mobile == mobile){
                    mobileInput.refs.input.focus();
                    notification.error({
                        message: '错误',
                        description: '手机号重复'
                    });
                }
    
                if( field == 'workemail' && item.workemail == workemail){
                    workemailInput.refs.input.focus();
                    notification.error({
                        message: '错误',
                        description: '个人邮箱重复'
                    });
                }
    
                if( documenttype == '身份证件' && field == 'card' && item.card ==card){
                    cardInput.refs.input.focus();
                    notification.error({
                        message: '错误',
                        description: '身份证号码重复'
                    }); 
                }
            }
        })
    }

    getFormData = () => {
        const {
            name,                   //姓名
            englishname,            //英文名
            worknumber,             //工号
            sex,                    //性别
            mobile,                //手机号
            workemail,              //个人邮箱
            documenttype,           //证件类型
            card,                   //证件号码
            worknature,             //工作性质
            inthetime,              //入职日期
            workstatus,             //工作状态
            theleng,                //试用期时长
            contractname,           //合同公司
            workcity,               //工作地点
            department,             //部门
            departmentid,
            position,               //职位
            workphone,              //工作电话
            cemail,                 //企业邮箱
            contactname,            //紧急联系人
            contactphone,           //紧急联系人电话
        } = this.state;
        const {
            nameInput,
            mobileInput,
            cardInput,
            worknatureSelect,
            datePickerInput,
            workstatusSelect,
            thelengSelect,
            contractnameInput,
            workemailInput,
            cemailInput,
            contactphoneInput
        } = this.refs;
        const {
            departmentList,
            getTreeList,
            crewList
        } = this.props;
        const allCrewList = crewList.list;
        if(name==''){
            nameInput.refs.input.focus();
            nameInput.triggerError(true);
            return false;
        }
        if(mobile==''){
            mobileInput.refs.input.focus();
            mobileInput.triggerError(true);
            return false;
        }
        if(!worknature){
            worknatureSelect.triggerError(true);
        }
        if(!workstatus){
            workstatusSelect.triggerError(true);
        }  
        if(inthetime==null){
            datePickerInput.handleOpenChange(true);
            return false;
        } 
        if(!theleng){
            thelengSelect.triggerError(true);
        } 
        if(!contractnameInput){
            contractnameInput.refs.input.focus();
            contractnameInput.triggerError(true);
            return false;
        }
        if(card==''){
            cardInput.refs.input.focus();
            cardInput.triggerError(true);
            return false;
        }
        //校验手机号
        if(!this.isMobile(mobile)){
            mobileInput.refs.input.focus();
            notification.error({
                message: '错误',
                description: '手机号格式错误'
            });
            return false;
        }
        //校验个人邮箱
        if(workemail !='' && !this.isEmail(workemail)){
            workemailInput.refs.input.focus();
            notification.error({
                message: '错误',
                description: '邮箱格式错误'
            });
            return false;
        }
        //校验证件号码
        if(documenttype == '身份证件' && !this.isIdCard(card)){
            cardInput.refs.input.focus();
            notification.error({
                message: '错误',
                description: '身份证格式错误'
            });
            return false;
        }
        //校验企业邮箱
        if(cemail !='' && !this.isEmail(cemail)){
            cemailInput.refs.input.focus();
            notification.error({
                message: '错误',
                description: '邮箱格式错误'
            });
            return false;
        }
        //校验工作电话
        if(workphone !='' && !this.isMobile(workphone)){
            workphoneInput.refs.input.focus();
            notification.error({
                message: '错误',
                description: '电话格式错误'
            });
            return false;
        }
        //校验紧急联系人电话
        if(contactphone !='' && !this.isMobile(contactphone)){
            contactphoneInput.refs.input.focus();
            notification.error({
                message: '错误',
                description: '电话格式错误'
            });
            return false;
        }

        //设置部门名称
        let treeName = '';
        if(departmentid != ''){
            const {list} = departmentList;
            const treeList = getTreeList(list);
            const filterItem = treeList.filter((item,index) => {
                if(item.uid == departmentid) return item
            })
            treeName = filterItem[0].name;
        }
        
        const filterObj = pickBy(this.state,(item,key) => {
            return key != 'visible';
        });
        //设置时间
        const formatTime = moment(inthetime).format('YYYY-MM-DD'); 
        //设置工作状态
        const formatWorkstatus = workstatus == '正式' ? "1" : '0';

        return {...filterObj,inthetime: formatTime,workstatus:formatWorkstatus,department:treeName} 
    }
    
    resetForm = () => {
        this.setState({
            name: '',                   //姓名
            englishname: '',            //英文名
            worknumber: '',             //工号
            sex: undefined,             //性别
            mobile: '',                 //手机号
            workemail: '',              //个人邮箱
            documenttype: undefined,    //证件类型
            card: '',                   //证件号码
            worknature: undefined,      //工作性质
            inthetime: null,            //入职日期
            workstatus: undefined,      //工作状态
            theleng: undefined,         //试用期时长
            // contractname: '',           //合同公司
            workcity: undefined,        //工作地点
            department: undefined,      //部门
            departmentid:'',            //原部门id
            position: '',               //职位
            workphone: '',              //工作电话
            cemail: '',                 //企业邮箱
            contactname: '',            //紧急联系人
            contactphone: '',           //紧急联系人电话
        });
        this.handleCityChange([]);
    }

    saveEmployeeInfo = () => {
        NProgress.start();
        const newClerkFormData = this.getFormData();
        const {editEmployeeInformation} = this.props;
        if(!newClerkFormData) return;
        editEmployeeInformation({...newClerkFormData});
        this.resetForm();
    }

    render() {
        const {
            userInfo,
            departmentList,
        } = this.props,
        {list} = departmentList,
        {companyname} = userInfo;
        const {
            name = '',                   //姓名
            englishname = '',            //英文名
            worknumber = '',             //工号
            sex = undefined,                  //性别
            mobile = '',                 //手机号
            workemail = '',              //个人邮箱
            documenttype = undefined,     //证件类型
            card = '',                   //card
            worknature = undefined,         //工作性质
            inthetime = null,              //入职日期
            workstatus = undefined,         //员工状态
            theleng = undefined,       //试用期
            // contractname,            //合同公司
            workcity = undefined,        //工作地点
            department = undefined,    //部门
            position = '',
            workphone = '',                 //薪资
            cemail = '',                 //企业邮箱
            contactname = '',            //紧急联系人
            contactphone = '',           //紧急联系人电话
        } = this.state;
        return (
            <div className="right-panel new-clerk-form">
                <div className="control">
                    <Button
                        style={{
                            width: 70,
                        }}
                        onClick={this.handleClick}
                    >&lt;&nbsp;返回</Button>
                    <span className="breadName">添加员工</span>
                </div>
                <div className="form-field">
                    <ul>
                        <li>
                            <ErrorInputComponent
                                ref="nameInput"
                                name="姓名："
                                field="name"
                                placeholder="请输姓名"
                                value={name}
                                onChange={this.handleChange}
                                asterisk={true}
                                onBlur={this.handleBlur}
                            />
                            <ErrorInputComponent
                                ref="englishnameInput"
                                name="英文名："
                                field="englishname"
                                placeholder="请输入职位名称"
                                value={englishname}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
                                ref="worknumberInput"
                                name="工号："
                                field="worknumber"
                                placeholder="请输入工号"
                                value={worknumber}
                                onChange={this.handleNumChange}
                                onBlur={this.handleBlur}
                            />
                            <SelectComponent
                                ref="sexSelect"
                                name="性别："
                                data={["男","女"]}
                                dropdownMatchSelectWidth={false}
                                value={sex}
                                field="sex"
                                placeholder="请选择性别"
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
                                ref="mobileInput"
                                name="手机号码："
                                field="mobile"
                                placeholder="请输手机号"
                                value={mobile}
                                onChange={this.handleNumChange}
                                asterisk={true}
                                onBlur={this.handleBlur}
                            />
                            <ErrorInputComponent
                                ref="workemailInput"
                                name="个人邮箱："
                                field="workemail"
                                placeholder="请输入工号"
                                value={workemail}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                            />
                        </li>
                        <li>
                            <SelectComponent
                                ref="documenttypeSelect"
                                name="证件类型："
                                data={['身份证件', '工作证件']}
                                dropdownMatchSelectWidth={false}
                                value={documenttype}
                                field="documenttype"
                                placeholder="请选择证件类型"
                                defaultValue="身份证件"
                                onChange={this.handleChange}
                            />
                            <ErrorInputComponent
                                ref="cardInput"
                                name="证件号码："
                                field="card"
                                placeholder="请输入证件号码"
                                value={card}
                                onChange={this.handleCardChange}
                                asterisk={true}
                                onBlur={this.handleBlur}
                            />
                        </li>
                        <li>
                            <SelectComponent
                                ref="worknatureSelect"
                                name="工作性质："
                                data={["兼职","全职"]}
                                dropdownMatchSelectWidth={false}
                                value={worknature}
                                field="worknature"
                                placeholder="请选择工作性质"
                                onChange={this.handleChange}
                                asterisk={true}
                                defaultValue='全职'
                            />
                            <DatePickerComponent
                                ref="datePickerInput"
                                name="入职日期："
                                field="inthetime"
                                value={inthetime}
                                placeholder="请选择入职日期"
                                style={{width: 224, height: 40}}
                                asterisk={true}
                                onChange={this.onTimeChange}
                            />
                        </li>
                        <li>
                            <SelectComponent
                                ref="workstatusSelect"
                                name="员工状态："
                                data={["试用", "正式"]}
                                dropdownMatchSelectWidth={false}
                                value={workstatus}
                                field="workstatus"
                                placeholder="请选择员工状态"
                                onChange={this.handleChange}
                                asterisk={true}
                                defaultValue="试用"
                            />
                            <SelectComponent
                                ref="thelengSelect"
                                name="试用期："
                                data={["无","一个月","二个月","三个月","四个月","五个月","六个月"]}
                                dropdownMatchSelectWidth={false}
                                value={theleng}
                                field="theleng"
                                placeholder="请选择试用期"
                                onChange={this.handleChange}
                                asterisk={true}
                                defaultValue="三个月"
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
                                ref="contractnameInput"
                                name="合同公司："
                                field="contractname"
                                placeholder="请输入合同公司"
                                value={companyname}
                                asterisk={true}
                                disabled={true}
                            />  
                            <div className="inline-block">
                                <span>工作地点：</span>
                                <div className="inline-block city-regions">
                                    <Cascader
                                        options={city}
                                        value={workcity ? workcity.split("-") : ''}
                                        onChange={this.handleCityChange}
                                        displayRender={label => label.join(' - ')}
                                        placeholder="请选择工作地点"
                                        style={{
                                            height: 40,
                                            width: 224
                                        }}
                                    />
                                    
                                </div>
                            </div>
                        </li>
                        <li style={{ position: "relative" }}>
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
                            />
                            <ErrorInputComponent
                                ref="positionInput"
                                name="岗位："
                                field="position"
                                placeholder="请输入岗位"
                                value={position}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
                                ref="workphoneInput"
                                name="工作电话："
                                field="workphone"
                                placeholder="请输入工作电话"
                                value={workphone}
                                onChange={this.handleNumChange}
                            />
                            <ErrorInputComponent
                                ref="cemailInput"
                                name="企业邮箱："
                                field="cemail"
                                placeholder="请输入企业邮箱"
                                value={cemail}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <ErrorInputComponent
                                ref="contactnameInput"
                                name="紧急联系人："
                                field="contactname"
                                placeholder="紧急联系人"
                                value={contactname}
                                onChange={this.handleChange}
                            />
                            <ErrorInputComponent
                                ref="contactphoneInput"
                                name="紧急联系人电话："
                                field="contactphone"
                                placeholder="请输入紧急联系人电话"
                                value={contactphone}
                                onChange={this.handleChange}
                            />
                        </li>
                    </ul>
                </div>
                <div className="consequense-field">
                    <Button onClick={this.props.resetForm}>取消</Button>
                    <Button type="primary" onClick={this.saveEmployeeInfo}>保存</Button>
                </div>           
            </div>
        )
    }
}
  const mapStateToProps = state => ({
    departmentList: state.Manage.departmentList,
    userInfo: state.User.userInfo,
    crewList: state.Manage.crewList,
  })
  const mapDispatchToProps = dispatch => ({
    getCrewList: bindActionCreators(Actions.ManageActions.getCrewList,dispatch),
    getDepartMentList: bindActionCreators(Actions.ManageActions.getDepartMentList, dispatch),
    getTreeList:bindActionCreators(Actions.ManageActions.getTreeList,dispatch),
    editEmployeeInformation:bindActionCreators(Actions.ManageActions.editEmployeeInformation,dispatch),
    getUserInfo: bindActionCreators(Actions.UserActions.getUserInfo, dispatch),
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewClerkForm);