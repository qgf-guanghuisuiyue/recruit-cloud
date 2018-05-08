import React, {Component} from 'react';

import { Input , Button , Cascader , Select , Icon } from 'antd';
const Option = Select.Option;
const Search = Input.Search

// lodash
import pickBy from 'lodash/pickBy';

// 学历要求
import education from 'data/select/education';
// 工作年限下拉数据
import workyears from 'data/select/workyears';
//行业下拉数据
import industry from 'data/select/industry';
//性别
import sex from 'data/select/industry';

export default class FormComponent extends Component {

    state = {
        keywords: '', // 关键字
        edu: undefined, // 学历要求
        year: undefined, // 工作年限
        jobpostids:undefined,//行业
        functions:"",//职位
        jobstatus:undefined,//状态
        sex:undefined,//性别
    }
    //监听键盘Enter键
    componentDidMount() {
        const _this = this
        window.addEventListener('keydown', function(e){
            switch(e.keyCode){
            case 13:
                _this.handleFind()
            break
            default:
            break
            }
        })
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    resetForm = (clickNav=false) => {
        this.refs.InputValue.refs.input.value ="";
        this.refs.selectPeople.refs.input.value ="";
        this.setState({
            keywords: "", // 关键字
            edu: undefined, // 学历要求
            year: undefined, // 工作年限
            jobpostids:undefined,//行业
            functions:"",//职位
            jobstatus:undefined,//状态
            sex:undefined,//性别
        });
        this.props.findEvent({},clickNav);
    }
    //获取候选人搜索输入框值
    handleChange = e => {
        this.setState({
            keywords:e.target.value
        })
    }
    //候选人搜索
    handleClick = () => {
        this.handleFind()
    }
    //条件选项值
    handleSelectChange = (field,value) => {
        this.setState({
            [field]: value
        });
    }
    //筛选按钮搜索
    handleFind = () => {
        const filterObj = pickBy(this.state,(val,key)=>{
            return val !== '' && val !== undefined
        });
        this.props.findEvent(filterObj);
    }
    //获取职位输入框值
    handInputChange = () =>{
        this.setState({
            functions:this.refs.InputValue.refs.input.value
        })
    }
    //排序按钮
    timeSort = () => {
        this.props.findEvent({});
    }

    render() {
        const {showUploadModal} = this.props,
            {
                keywords,
                edu=undefined,
                year=undefined,
                jobpostids=undefined,
                functions=undefined,
                jobstatus=undefined,
                sex=undefined,
            } = this.state;
        return (
            <div className="form" style={{
                position: 'relative'
            }}>
                <div className="form-btn" style={{top: 164, right: 100}}>
                    <Button 
                        type="primary"
                        onClick={()=>showUploadModal()}
                        style={{width: 111}}
                    >
                        导入人才&nbsp;
                        <i className="anticon import"></i>
                    </Button> 
                </div>
                <div className="bottom10">
                    <Select 
                        placeholder="工作年限" 
                        style={{width: 189}}
                        value={year}
                        onChange={(value)=>this.handleSelectChange('year',value)}
                    >
                        {
                            workyears.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Select 
                        placeholder="学历要求" 
                        style={{width: 189}}
                        value={edu}
                        onChange={(value)=>this.handleSelectChange('edu',value)}
                    >
                        {
                            education.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Select 
                        placeholder="行业" 
                        style={{width: 189}}
                        value={jobpostids}
                        onChange={(value)=>this.handleSelectChange('jobpostids',value)}
                    >
                        {
                            industry.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Input 
                        ref = "selectPeople"
                        placeholder="候选人搜索"
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width:200
                        }}
                        onKeyUp = {this.handleKeyUp}
                        onChange = {this.handleChange}
                        suffix={
                            <a 
                                href="javascript:;"
                                onClick={this.handleClick}
                            >
                                <img src="static/images/manager/search.png" alt="搜索"/>
                            </a>
                    }
                />
                    
                </div>
                <div className="bottom10">
                    
                    <Input 
                            ref = "InputValue"
                            placeholder="职位" 
                            onChange ={this.handInputChange}
                            style={{width: 189}}  
                        >
                    </Input>
                    <Select 
                            placeholder="状态" 
                            style={{width: 189}}
                            value={jobstatus}
                            onChange={(value)=>this.handleSelectChange('jobstatus',value)}
                        >
                            {
                                ["在职","离职"].map((item,index)=>{
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                    </Select>
                    <Select 
                            placeholder="性别" 
                            style={{width: 189}}
                            value={sex}
                            onChange={(value)=>this.handleSelectChange('sex',value)}
                        >
                            {
                                ["男","女"].map((item,index)=>{
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                    </Select>
                </div>
                <div className = "bottom28">
                    <div className="inline-block">
                        <Button onClick={this.handleFind}>筛选</Button>
                    </div>
                    <div className="inline-block">
                        <Button onClick={()=>this.resetForm(false)}>重置</Button>
                    </div>
                </div>
            </div>
        );
    }
}