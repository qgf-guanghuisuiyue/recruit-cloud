import React, {Component,PropTypes} from 'react';

import {Button,Input,Radio,Table,notification,Icon,Modal,Spin} from 'antd';
const RadioGroup = Radio.Group;

import pickBy from 'lodash/pickBy';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class ShareEvaluationComponent extends Component {
    state = {
        resumeid:"",                //简历ID
        jobid:"",                   //职位ID
        shareTime:"",               //分享时间
        intername:"",               //候选人
        professional:"",            //专业技能
        workexperience:"",          //业务能力
        eduandtrain:"",             //沟通能力
        communication:"",           //语言能力
        initiative:"",              //学习能力
        grooming:"",                //仪容仪表
        attitude:"",                //态度
        intername:"",               //候选人
        interviewer:"",             //面试官
        comments:"",                //评语
        isLoading:false,
        companyname:"",
        loginname:""
    }
    //候选人、面试主管
    changeInput = (input,error,e) => {
        this.setState({
            [input]:e.target.value,
            [error]:false
        })
    }
    //应聘者情况   
    onChange = (value,e) => {
        this.setState({
            [value]: e.target.value,
        })
    }
    //评语内容
    changeComments = (comments,e) => {
        this.setState({
         [comments]:e.target.value,
     }) 
 }
    componentDidMount(){
        const {a,b,c,d,e,f} = this.props.location.query;//获取url参数
        const key = "%!##@$%|$#$%(^)$}$*{^*+%";//加密关键字
        const resumeid = strDec(`${a}`,key);//简历ID
        const jobid = strDec(`${b}`,key);//职位ID
        const intername = strDec(`${c}`,key);//候选人
        const companyname = strDec(`${d}`,key);//公司名称
        const loginname = strDec(`${e}`,key);//登录名称
        const shareTime = strDec(`${f}`,key);//分享链接时间
        this.setState({
            intername,jobid,resumeid,companyname,loginname,shareTime
        })
        //判断分享链接是否失效
        if((new Date().getTime()-shareTime)/1000/60/60>=3){
            Modal.warning({
                title: '链接已过期，请重新获取分享链接！',
                okText:"确定",
                style:{top:330}
                })
        }
    }
    //重置表单
    resetForm = () => {
        this.setState({
            professional:"",        //专业技能
            workexperience:"",      //业务能力
            eduandtrain:"",         //沟通能力
            communication:"",       //语言能力
            initiative:"",          //学习能力
            grooming:"",            //仪容仪表
            attitude:"",            //态度
            interviewer:"",         //面试官
            comments:"",            //评语
            id :"",
            errorinterviewer:false,
        })
    }
    //添加评估
    addEvaluation = ()=>{
        const {
            resumeid,
            jobid,
            intername,
            professional,
            workexperience,
            eduandtrain,
            communication,
            initiative,
            grooming,
            attitude,   
            interviewer,     
            comments,
            companyname,
            loginname,
            shareTime
        } = this.state;
        if(interviewer==""){
            this.setState({
                errorinterviewer:true
            })
            this.refs.interviewer.focus()
            return false
        };
        if(intername=="" ||professional==""||workexperience=="" ||eduandtrain=="" || communication==""||initiative=="" || grooming=="" ||attitude=="" || interviewer=="" || comments==""){
            notification.warning({
                message: '您还有未评价内容，请全部评价完再提交！',
              });
              return false
        };
        
        //加密关键字
        const key = "%!##@$%|$#$%(^)$}$*{^*+%";
        //请求参数       
        const query = `resumeid=${resumeid}&jobid=${jobid}&startTime=${shareTime}&intername=${intername}&professional=${professional}&workexperience=${workexperience}&eduandtrain=${eduandtrain}&communication=${communication}&initiative=${initiative}&grooming=${grooming}&attitude=${attitude}&interviewer=${interviewer}&comments=${comments}&companyname=${companyname}&loginname=${loginname}`;
        //请求参数加密
        const  partters = strEnc(`${query}`,key);
        //添加面试评估
        this.props.fillEvaluation(partters);
        this.setState({
            isLoading:true
        });
        
    }
    

    render() {
        const options = [
            { value: '较差' },
            { value: '一般' },
            { value: '基本满意'},
            { value: '较好' },
            { value: '优秀' }
        ];
        const {intername,interviewer,comments,errorinterviewer,isLoading} = this.state;
        const {fillLoading} = this.props;
        return (
                <div 
                    className="evaluation-modal" 
                    style={{
                        width:830,
                        margin:"0 auto",
                        marginTop:100,
                        border:"1px solid #8CB6C0",
                        height:750,
                        borderRadius:5,
                        
                    }}
                >
                    {isLoading && fillLoading && 
                        <Spin 
                            size="large" 
                            style={{
                                    position:"absolute",
                                    top:"38%",
                                    left:"45%",
                                    fontSize:60,
                                    color:"#108EE9",
                                    zIndex:100
                            }}
                        />}
                        <h3 style={{textAlign:"center",lineHeight:"60px",background:"#8CB6C0",color:"#fff"}}>{intername}&nbsp;&nbsp;面试评估表</h3>
                        <div className=" ant-modal-body">
                            <div className="table"  style={{marginBottom: 40,paddingLeft:30}}>
                                <div className="table-cell">
                                    <span className="title">候选人姓名:</span>
                                </div>
                                <div className="table-cell">
                                    <input 
                                        ref = "intername"
                                        value={intername}
                                        style={{borderRadius:0,color:"#000"}}
                                        disabled="true" 
                                        //onChange={this.changeInput.bind(this,'intername',"errorintername")}
                                    />
                                </div>
                                <div className="table-cell">
                                    <span className="title">面试主管:</span>
                                </div>
                                <div className="table-cell">
                                    <input 
                                        ref = "interviewer"
                                        value={interviewer} 
                                        style={{borderRadius:0,color:"#000"}}
                                        onChange={this.changeInput.bind(this,'interviewer',"errorinterviewer")}
                                    />
                                    {errorinterviewer && 
                                        <div className="error-promote">
                                            <label className="error">&nbsp;&nbsp;请输入面试主管</label>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='eva_div' style={{height:300}}>
                                <ul className="eva-ul">
                                    <li>应聘者情况：</li>
                                    <li>较差</li>
                                    <li>一般</li>
                                    <li style={{marginRight:80}}>基本满意</li>
                                    <li>较好</li>
                                    <li>优秀</li>
                                </ul>
                                <ul className="eva-jn">
                                    <li >专业技能：</li>
                                    <li className="li-radio" >
                                        <RadioGroup  
                                            options={options} 
                                            onChange={this.onChange.bind(this,'professional')} 
                                            value={this.state.professional} 
                                        />
                                    </li>
                                </ul>
                                <ul className="eva-jn">
                                    <li >业务能力：</li>
                                    <li className="li-radio"  >
                                        <RadioGroup 
                                            options={options} 
                                            onChange={this.onChange.bind(this,'workexperience')} 
                                            value={this.state.workexperience} 
                                        />
                                    </li>
                                </ul>
                                <ul className="eva-jn">
                                    <li >沟通能力：</li>
                                    <li className="li-radio" >
                                    <RadioGroup 
                                            options={options} 
                                            onChange={this.onChange.bind(this,'eduandtrain')} 
                                            value={this.state.eduandtrain} 
                                    />
                                    </li>
                                </ul>
                                <ul className="eva-jn">
                                    <li>语言能力：</li>
                                    <li className="li-radio" >
                                        <RadioGroup 
                                            options={options} 
                                            onChange={this.onChange.bind(this,'communication')} 
                                            value={this.state.communication} 
                                        />
                                    </li>
                                </ul>
                                <ul className="eva-jn">
                                    <li>学习能力：</li>
                                    <li className="li-radio" >
                                        <RadioGroup 
                                            options={options} 
                                            onChange={this.onChange.bind(this,'initiative')} 
                                            value={this.state.initiative} 
                                        />
                                    </li>
                                </ul>
                                <ul className="eva-jn">
                                    <li>仪容仪表：</li>
                                    <li className="li-radio" >
                                        <RadioGroup 
                                            options={options} 
                                            onChange={this.onChange.bind(this,'grooming')} 
                                            value={this.state.grooming} 
                                        />
                                    </li>
                                </ul>
                                <ul className="eva-jn">
                                    <li style={{marginLeft:33}}>态度：</li>
                                    <li className="li-radio" >
                                        <RadioGroup 
                                            options={options} 
                                            onChange={this.onChange.bind(this,'attitude')} 
                                            value={this.state.attitude} 
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="table" style={{marginTop: 40}}>
                                <div className="table-cell" style={{verticalAlign: "top"}}>
                                    <span className="title">
                                        评语：
                                    </span>
                                </div>
                                <div className="table-cell">
                                    <Input type="textarea" rows="3" 
                                            value={comments} 
                                            onChange={this.changeComments.bind(this,'comments')}
                                        style={{
                                            width: 660,
                                            height: 130,
                                            resize: "none",
                                            color:"#000"
                                        }}
                                    />
                                </div>
                            </div>
                                <a 
                                    className="resetForm"
                                    onClick={this.resetForm}
                                >
                                    重置
                                </a>
                                <a 
                                    className="add"
                                    onClick={this.addEvaluation}
                                >
                                    提交
                                </a>                                   
                        </div>
                </div>
        );
    }
}
const mapStateToProps = state => ({
    fillLoading: state.Resume.isLoading,
})
const mapDispatchToProps = dispatch => ({
    fillEvaluation: bindActionCreators(Actions.ResumeActions.fillEvaluation, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareEvaluationComponent);