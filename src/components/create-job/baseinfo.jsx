import React, {Component,PropTypes} from 'react';

import { Input , Select , Cascader , Radio , Button } from 'antd';
const RadioGroup = Radio.Group;

import WorkYears from 'data/select/workyears';
import Industry from 'data/select/industry';
import Education from 'data/select/education';

import city from 'data/city.json';
import salaryData from 'data/salary.json';

const Option = Select.Option;

export class ErrorInputComponent extends Component {
    state = {
        error: false
    }
    static propTypes = {
        name: PropTypes.string,
        field: PropTypes.string,
        value: PropTypes.oneOfType([ // 输入框的值
            PropTypes.string,
            PropTypes.number
        ]),
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool, //是否禁用输入框
        className: PropTypes.string, // 输入框类名
        style: PropTypes.object // 输入框内联样式
    }

    handleChange = (field,event) => {
        const {error} = this.state;
        const {onChange} = this.props;
        if(error){
           this.triggerError(false);
        }
        if(onChange){
            onChange(field,event);
        }
    }

    triggerError = (error) => {
        this.setState({error});
    }

    handleBlur = () => {
        const {value} = this.props;
        if(value === ''){
            this.triggerError(true);
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.value !== this.props.value || nextState.error !== this.state.error;
    }

    render() {
        const {error} = this.state,
            {
                name='',
                field='',
                value,
                placeholder,
                disabled=false,
                className='',
                style={}
            } = this.props;
        return (
            <div className="inline-block">
                <span>{name}</span>
                <div className="inline-block" style={{
                    position: 'relative',
                    marginRight: 0
                }}>
                    <Input 
                        ref='input'
                        placeholder={placeholder} 
                        value={value}
                        onChange={this.handleChange.bind(this,field)} 
                        disabled={disabled}
                        className={className}
                        className={error ? 'error' : ''}
                        style={style}
                        onBlur={this.handleBlur}
                    />
                    {error &&
                        <div className="error-promote" style={{
                            paddingLeft: 0
                        }}>
                            <label className="error">必填</label>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

class SelectComponent extends Component {

    static PropTypes = {
        name: PropTypes.string,
        field: PropTypes.string,
        value: PropTypes.string,
        data: PropTypes.array,
        placeholder: PropTypes.string,
        dropdownMatchSelectWidth: PropTypes.bool,
        onChange: PropTypes.func
    }

    state = {
        error: false
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value || nextState.error !== this.state.error;
    }

    handleChange= (field,value) => {
        const {error} = this.state;
        const {onChange} = this.props;
        if(onChange){
            onChange(field,value);
        }
        if(error){
            this.triggerError(false);
        }
    }

    handleBlur = value => {
        if(!value){
            this.triggerError(true);
        }
    }

    triggerError = error => {
        this.setState({error});
    }

    render() {
        const {error} = this.state,
            {
                name,
                field,
                placeholder,
                data=[],
                value,
                dropdownMatchSelectWidth,
                style={width: 229,height:40 }
            } = this.props;
        return (
            <div className="inline-block inline-block-select">
                <span>{name}</span>
                <div className="inline-block" style={{
                    margin: 0
                }}>
                    <Select
                        className={error ? 'error' : ''}
                        value={value}
                        placeholder={placeholder}
                        onFocus={this.handleFocus}
                        onChange={this.handleChange.bind(this,field)}
                        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                        style={style}
                        onBlur={this.handleBlur}
                    >
                        {
                            data.map( (item,index)=>{
                                return <Option key={index} value={item}>{item}</Option>
                            })
                        }
                    </Select>
                    {error &&
                        <div className="error-promote" style={{
                            paddingLeft: 0
                        }}>
                            <label className="error">{placeholder}</label>
                        </div>
                    }
                </div>
            </div>
        )
    }
}


export default class BaseinfoComponent extends Component {

    state = {
        error:false,
        errorJobType:false,
        errorresponsibility:false,
        errorqualification:false,
        btnState:'hidden',

        positionname:"",                // 职位名称
        salary:undefined,               // 薪资待遇
        department:'',                  // 用人部门
        recruitreason:'',               // 招聘理由
        headcount:'',                   // 招聘人数
        workcity:'',                    // 工作地点
        workyears:undefined,            // 工作年限
        specialty:undefined,            // 专业
        educationbackground:undefined,  //学历
        age:'',                         //年龄
        jobtype:'全职',                 //工作类型
        responsibility:'',              //工作职责
        qualification:'',               //任职资格
    }

    handleChange = (filed,e) => {
        if(typeof e === 'string' || typeof e === 'undefined'){
            this.setState({
                [filed]: e
            });
        }else{
            this.setState({
                [filed]: e.target.value
            });
        }
        switch(filed){
            case "responsibility":
                this.setState({
                    errorresponsibility:false
                });
                break;
            case "qualification":
                this.setState({
                    errorqualification:false
                });
                break;
            default:
                break;
        }
    }
    
    resetForm() {
        this.setState({
            positionname:'',
            salary:undefined,
            department:'',
            recruitreason:'',
            headcount:'',
            workcity:'',
            workyears: undefined,
            specialty: undefined,
            educationbackground: undefined,
            age: '', //年龄
            jobtype:"",//工作类型
            responsibility:"",//工作职责
            qualification:"",//任职资格
        });
    }

    getFormData = () => {
        const {
            positionname='', // 职位名称
            salary=undefined, // 薪资待遇
            department='', // 用人部门
            recruitreason='', // 招聘理由
            headcount='', // 招聘人数
            workcity='', // 工作地点
            workyears=undefined, // 工作年限
            specialty=undefined, // 专业
            educationbackground=undefined, //学历,
            age='', //年龄
            jobtype="全职",//工作类型
            responsibility="",//工作职责
            qualification="",//任职资格
        } = this.state;
        const {
            positionnameInput,
            departmentInput,
            recruitreasonInput,
            headcountInput,
            salarySelect,
            workyearsSelect,
            specialtySelect,
            educationbackgroundSelect,
            ageInput ,//年龄
            workstyleradio,//工作类型
            responsibilityInput,
            qualificationInput
        } = this.refs;
        if(positionname === ''){
            positionnameInput.refs.input.focus();
            positionnameInput.triggerError(true);
            return false;
        }
        if(workcity === ''){
            this.setState({
                error: true
            });
            return false;
        }
        if(department === ''){
            departmentInput.refs.input.focus();
            departmentInput.triggerError(true);
            return false;
        }
        if(recruitreason === ''){
            recruitreasonInput.refs.input.focus();
            recruitreasonInput.triggerError(true);
            return false;
        }
        if(headcount === ''){
            headcountInput.refs.input.focus();
            headcountInput.triggerError(true);
            return false;
        }
        if(!salary){
            salarySelect.triggerError(true);
            return false;
        }
        if(!workyears){
            workyearsSelect.triggerError(true);
            return false;
        }
        if(!specialty){
            specialtySelect.triggerError(true);
            return false;
        }
        if(!educationbackground){
            educationbackgroundSelect.triggerError(true);
            return false;
        }
        if(jobtype === ''){
            this.setState({
                errorJobType:true
            });
            return false;
        }
        if(responsibility === ''){
            this.setState({
                errorresponsibility:true
            });
            responsibilityInput.refs.input.focus();
            return false;
        }
        if(qualification === ''){
            this.setState({
                errorqualification:true
            });
            qualificationInput.refs.input.focus();
            return false;
        }
        return {...this.state}
    }

    handleCityChange = (val) => {
        this.setState({
            workcity: val.length > 0 ?  val[0] + '-' + val[1] : ''
        });
    }

    handleNumChange = (field,e) => {
        const pattern = /[^\d]/ig;
        this.setState({
            [field]: e.target.value.replace(pattern,'')
        });
    }
    // onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`)
    // }

    handleRadio = (e) => {
        this.setState({
            value: e.target.value,
            errorJobType:false
        });
         switch(e.target.value)
            {
                case 1:
                    this.setState({
                        jobtype: "全职"
                    });
                break;
                case 2:
                    this.setState({
                        jobtype: "兼职"
                    });
                break;
                 case 3:
                    this.setState({
                        jobtype: "实习"
                    });
                break;
            }
            
    }

    setDangerouslySetInnerHTML = (rawHtml) => {
        return dangersouslySetInnerHtml = {rawHtml};
    }

    componentWillReceiveProps(nextProps){
             const {
                positionname,           // 职位名称
                salary,                 // 薪资待遇
                department,             // 用人部门
                recruitreason,          // 招聘理由
                headcount,              // 招聘人数
                workcity,               // 工作地点
                workyears,              // 工作年限
                specialty,              // 专业
                educationbackground,    //学历
                age,                    //年龄
                jobtype,                //工作类型
                responsibility,         //工作职责
                qualification,          //任职资格
            } = nextProps.data;
            switch(jobtype)
            {
                case "全职":
                    this.setState({
                        value: 1
                    });
                break;
                case "兼职":
                    this.setState({
                        value: 2
                    });
                break;
                case "实习":
                    this.setState({
                        value: 3
                    });
                break;
                default:
                    this.setState({
                        value: 1
                    });
            }
            if(positionname || salary || department || recruitreason ||
                headcount ||workcity ||workyears || specialty || educationbackground ||
                age || jobtype || responsibility ||qualification){
                this.setState({
                    positionname,           // 职位名称
                    salary,                 // 薪资待遇
                    department,             // 用人部门
                    recruitreason,          // 招聘理由
                    headcount,              // 招聘人数
                    workcity,               // 工作地点
                    workyears,              // 工作年限
                    specialty,              // 专业
                    educationbackground,    //学历
                    age,                    //年龄
                    jobtype,                //工作类型
                    responsibility,         //工作职责
                    qualification,          //任职资格
                })
        }
    }
    showBtn = () => {
        this.setState({
            btnState:'visible'
        })
    }
    hideBtn = () => {
        this.setState({
            btnState:"hidden"
        })
    }
    showSalaryModal = () => {
        const {salary} = this.state;
        const {showSalaryModal} = this.props;
        showSalaryModal(salary);
    }

    render() {
        const {
            positionname,                // 职位名称
            salary,               // 薪资待遇
            department,                  // 用人部门
            recruitreason,               // 招聘理由
            headcount,                   // 招聘人数
            workcity,                    // 工作地点
            workyears,            // 工作年限
            specialty,            // 专业
            educationbackground,  //学历
            age,                         //年龄
            jobtype,                     //工作类型
            responsibility='',              //工作职责
            qualification='',               //任职资格
            errorJobType,
            errorresponsibility,
            errorqualification,
            error,
            value,
            btnState
        } = this.state;
        return (
            <li className="base-info">
                <h2 className="title">
                    基本信息
                </h2>
                <ul>
                    <li>
                        <ErrorInputComponent
                            ref="positionnameInput"
                            name="职位名称："
                            field="positionname"
                            placeholder="请输入职位名称"
                            value={positionname}
                            onChange={this.handleChange}
                        />
                        
                            <SelectComponent 
                                ref="salarySelect"
                                name="薪资待遇："
                                data={salaryData}
                                dropdownMatchSelectWidth={false}
                                value={salary}
                                field="salary"
                                placeholder="请选择薪资待遇"
                                onChange={this.handleChange}
                            />
                            <Button 
                                //className="salary"
                                type="primary"
                                onClick={this.showSalaryModal.bind(this)} 
                                style={{
                                    height:40,
                                    top:-1,
                                    left:20,
                                    //visibility:btnState
                                }}
                            >
                                行业薪资参考
                            </Button>
                        
                    </li>
                    <li>
                        <ErrorInputComponent
                            ref="departmentInput"
                            name="用人部门："
                            placeholder="请输入用人部门"
                            field="department"
                            value={department}
                            onChange={this.handleChange}
                        />
                        <ErrorInputComponent
                            ref="recruitreasonInput"
                            name="招聘理由："
                            placeholder="请输入招聘理由"
                            field="recruitreason"
                            value={recruitreason}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <ErrorInputComponent
                            ref="headcountInput"
                            name="招聘人数："
                            placeholder="请输入招聘人数"
                            field="headcount"
                            value={headcount}
                            onChange={this.handleNumChange}
                        />
                        <div className="inline-block">
                            <span>工作地点：</span>
                            <div className="inline-block city-regions">
                                <Cascader 
                                    options={city}
                                    value ={workcity ? workcity.split("-"):''}
                                    className={error ? "error" : ''}
                                    onChange={this.handleCityChange}
                                    displayRender={label => label.join(' - ')}
                                    placeholder="请选择工作地点" 
                                    style={{
                                        height: 40,
                                        width: 229
                                    }}
                                />
                                {error &&
                                    <div className="error-promote" style={{
                                        paddingLeft: 0
                                    }}>
                                        <label className="error">请选择工作地点</label>
                                    </div>
                                }
                            </div>
                        </div>
                    </li>
                    <li>
                        <ErrorInputComponent
                            ref="specialtySelect"
                            name="专业："
                            data={Industry}
                            dropdownMatchSelectWidth={false}
                            value={specialty}
                            field="specialty"
                            placeholder="请输入专业"
                            onChange={this.handleChange}
                        />
                        {/* <SelectComponent 
                            ref="specialtySelect"
                            name="专业："
                            data={Industry}
                            dropdownMatchSelectWidth={false}
                            value={specialty}
                            field="specialty"
                            placeholder="选择/修改"
                            onChange={this.handleChange}
                        /> */}
                        <SelectComponent 
                            ref="educationbackgroundSelect"
                            name="学历："
                            data={Education}
                            value={educationbackground}
                            field="educationbackground"
                            placeholder="请选择学历"
                            onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <ErrorInputComponent
                            ref="workyearsSelect"
                            name="工作年限："
                            value={workyears}
                            data={WorkYears}
                            field="workyears"
                            placeholder="请选择工作年限"
                            onChange={this.handleChange}
                        />
                        {/* <SelectComponent 
                            ref="workyearsSelect"
                            name="工作年限："
                            value={workyears}
                            data={WorkYears}
                            field="workyears"
                            placeholder="请选择工作年限"
                            onChange={this.handleChange}
                        /> */}
                        <ErrorInputComponent
                            ref="ageInput"
                            name="年龄："
                            placeholder="请输入年龄"
                            field="age"
                            value={age}
                            onChange={this.handleNumChange}
                        />
                    </li>
                    <li>
                        <div className="inline-block">
                            <span>工作类型：</span>
                            <RadioGroup ref="workstyleradio" onChange={this.handleRadio} value={value}>
                                <Radio value={1}>全职</Radio>
                                <Radio value={2}>兼职</Radio>
                                <Radio value={3}>实习</Radio>
                            </RadioGroup>
                            {errorJobType && 
                            <div className="error-promote"
                                style={{marginLeft:240}}
                            >
                                <label className="error">&nbsp;&nbsp;请选择工作类型</label>
                            </div>
                            }
                        </div>
                    </li>
                    <li>
                        <div className="inline-block table">
                            <div className="table-cell">
                                <span>工作职责：</span>
                            </div>
                            <div className="table-cell">
                                <Input type="textarea" rows="3"
                                    ref = "responsibilityInput" 
                                    value={responsibility.replace(/<br\/>/ig,"\r\n")}
                                    onChange={this.handleChange.bind(this,"responsibility")}
                                    style={{
                                        minWidth: 494,
                                        maxWidth: 760,
                                        height: 130,
                                        borderRadius: 10,
                                        resize: "horizontal"
                                }}/>
                                {errorresponsibility && 
                                <div className="error-promote">
                                    <label className="error">&nbsp;&nbsp;请输入工作职责</label>
                                </div>
                                }
                             </div>
                        </div>
                    </li>
                    <li>
                        <div className="inline-block table">
                            <div className="table-cell">
                                <span>任职资格：</span>
                            </div>
                            <div className="table-cell">
                                <Input type="textarea" rows="3"
                                    ref = "qualificationInput" 
                                    value={qualification.replace(/<br\/>/ig,"\r\n")}
                                    onChange={this.handleChange.bind(this,"qualification")}
                                    style={{
                                        minWidth: 494,
                                        maxWidth: 760,
                                        height: 130,
                                        borderRadius: 10,
                                        resize: "horizontal"
                                }}/>
                                {errorqualification && 
                                <div className="error-promote">
                                    <label className="error">&nbsp;&nbsp;请输入任职资格</label>
                                </div>
                                }
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }
}