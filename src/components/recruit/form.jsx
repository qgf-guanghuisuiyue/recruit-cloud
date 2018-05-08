import React, {Component} from 'react';

import { Input , Button , Select , Icon } from 'antd';
const Search = Input.Search

import pickBy from 'lodash/pickBy';
// 工作年限下拉数据
import workyears from 'data/select/talent-workyears';
// 学历要求
import education from 'data/select/education';

export default class FormComponents extends Component {

    state = {
        positionname: '',
        livecityid: '',
        username: '',
        workyear: undefined,
        time:"",
        educationbg:undefined,
        range:""
    }
    //监听键盘Enter键
    componentDidMount() {
        const _this = this
        window.addEventListener('keydown', function(e){
            switch(e.keyCode){
            case 13:
                _this.handleSearch()
            break
            default:
            break
            }
        })
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.state !== nextState;
    }

    //筛选
    handleFind = () => {
        setTimeout(()=>{
            const filterObj = pickBy(this.state,(val,key)=>{
                return val !== '' && val !=undefined;
            });
            this.props.handleFind(filterObj);
        })
       
    }
    handleSelectChange = (field,value) => {
        this.setState({
            [field]: value
        });
        switch(value)
            {
                case "按申请时间升序":
                    this.setState({
                        range:"1"
                    });
                break;
                case "按申请时间降序":
                    this.setState({
                        range:"2"
                    });
                break;
                case "学历由高到低":
                    this.setState({
                        range:"3"
                    });
                break;
                case "学历由低到高":
                    this.setState({
                        range:"4"
                    });
                break;
                case "按部门排序":
                    this.setState({
                        range:"5"
                    });
                break;
                default:
                    this.setState({
                        range:"1"
                    });
            }
            if ([field]=='time'){
                this.handleFind()
            }       
    }
     //候选人
    handleChange = e => {
        this.setState({
            username:e.target.value
        })  
    }
    //候选人搜索
    handleSearch = () => {
       this.handleFind()
    }
    //重置
    resetForm = (clickNav=false) => {
        this.setState({
            educationbg: undefined, // 学历要求
            workyear: undefined, // 工作年限
            username:undefined//姓名
        });
    }

    render() {
        const {showUploadModal} = this.props;
        const {
            positionname,
            livecityid,
            username,
            workyear,
            educationbg,
            time
        } = this.state;
        return (
            <div className="form">
                <div className="form-btn ">
                    <Button type="primary"
                            onClick={()=>showUploadModal()}>
                            添加候选人+
                    </Button>
                    <Select 
                        defaultValue="按申请时间降序" 
                        style={{width: 140,height:30}}
                        onChange={(value)=>this.handleSelectChange('time',value)}
                    >
                        {
                            ["按申请时间升序",
                            "按申请时间降序",
                            "学历由高到低",
                            "学历由低到高",
                            "按部门排序",
                            ].map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className="bottom10">       
                    <Select 
                            placeholder="工作年限" 
                            style={{width: 189,marginRight:16}}
                            value={workyear}
                            onChange={(value)=>this.handleSelectChange('workyear',value)}
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
                            placeholder="请选择学历" 
                            style={{width: 189}}
                            value={educationbg}
                            onChange={(value)=>this.handleSelectChange('educationbg',value)}
                        >
                            {
                                education.map((item,index)=>{
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                    </Select>
                    <Input 
                        placeholder="候选人搜索"
                        value ={username}
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
                                onClick={this.handleSearch}
                            >
                                <img src="static/images/manager/search.png" alt="搜索"/>
                            </a>
                    }
                />
                    
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