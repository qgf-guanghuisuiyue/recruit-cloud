import React, {Component} from 'react';

import {Input,Button,Select,Tabs} from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {ErrorInputComponents} from 'components/input';

import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class SettingEmailPage extends Component {
    state = {
        email: '',
        pwd: '',
        resumeEmail:"",
        resumePwd:"",
        mailid:undefined,
        ResumeMailid:undefined,
        id:""
    };

    componentDidMount() {
        NProgress.done();
        this.props.getUserEmail();
        this.props.getResumeEmail()
    }

    componentWillUpdate(nextProps,nextState) {
        const {userEmailInfo} = nextProps;    
        if(!isEmpty(userEmailInfo.userMail) && ( userEmailInfo !== this.props.userEmailInfo)){
            setTimeout(()=>{
                this.resetForm();
            },0);
        }
    };
    componentWillReceiveProps(){
        setTimeout(()=>{
            const { resumeEmailInfo} = this.props,
                {list , mailinfo} = resumeEmailInfo,
                {email,password,mailid,id} = mailinfo;
            this.setState({
                resumeEmail : email,
                resumePwd : password,
                ResumeMailid : mailid+'',
                id : id
            })
        },0);
    }
    //邮箱、密码onchange事件
    handleChange=(field,e)=>{
        if (field=='resumeEmail'){
            this.setState({
                [field]: e.target.value,
                errorEmail:false
            });
        }else if(field=='resumePwd'){
            this.setState({
                [field]: e.target.value,
                errorPwd:false
            });
        }else {
            this.setState({
                [field]: e.target.value
            }); 
        }
    }

    triggerError = (error) => {
        this.setState({error});
    }
    //清空发送邮箱、密码
    resetForm = () => {
        const {userEmailInfo} = this.props;
        const {emailInput,pwdInput} = this.refs;
        if (userEmailInfo.userMail!=null){
           const {email,password,mailid} = userEmailInfo.userMail; 
            this.setState({
                mailid: mailid+'',
                email: email,
                pwd: password
            });
            // 设置邮箱名的值
            emailInput.resetVal(email);
            // 设置密码的值
            pwdInput.resetVal(password);
        }else{
             // 设置邮箱名的值
             emailInput.resetVal("");
             // 设置密码的值
             pwdInput.resetVal("");
        }   
    }
    //清空简历邮箱、密码
    resetResumeForm = () => {
        this.setState({
            resumeEmail:"",
            resumePwd:"",
            id:""
        })
    }

    validate = () => {
        const {email='',pwd=''} = this.state,
            {emailInput,pwdInput} = this.refs;
        // if(mailid === undefined){
        //     this.triggerError(true);
        //     return false;
        // }
        if(email === '') {
            emailInput.refs.input.focus();
            return false;
        }
        if(pwd === ''){
            pwdInput.refs.input.focus();
            return false;
        }
        return true;
    }
    //发送邮箱配置
    setEmail = () => {
        if(!this.validate()) return ;
        NProgress.start();
        this.props.changeEmailSetting(omit(this.state,['error']));
    }
    //简历邮箱配置
    setResumeEmail = () => {
        const {resumeEmail , resumePwd , ResumeMailid ,id, errorResume} = this.state,
              {resumeEmailInput,resumeEmailPwd,resumeServerEmail} = this.refs;
        if (ResumeMailid === undefined || ResumeMailid === ""){
            this.setState({
                errorResume:true
           });
            return false;
            }
        if (resumeEmail === ""){
            resumeEmailInput.refs.input.focus();
            return false;
        }
        if(resumePwd === ''){
            resumeEmailPwd.refs.input.focus();
            return false;
        }
        NProgress.done();
        this.props.changeResumeEmailSetting({email:resumeEmail,pwd:resumePwd,mailid:ResumeMailid,id:id})
    }
    handleEnter = (field) => {
        if(typeof field === 'string'){
            this.refs[field].refs.input.focus();
        }else{
            this.setEmail();
        }
    }

    handleSelectChange = (value) => {
        this.setState({
            mailid: value
        });
    }
    //简历邮箱服务器选择
    handleSelectResumeChange = (value) => {
        const {ResumeMailid , errorResume} = this.state;
        this.setState({
            ResumeMailid: value
        });
        if(ResumeMailid != '' || ResumeMailid != undefined){
            // 显示错误信息
           this.setState({
                errorResume:false
           });
       }
    }

    handleSelectBlur = () => {
        if(this.state.mailid === undefined){
            this.triggerError(true);
        }else{
            this.triggerError(false);
        }
    }
    //简历邮箱输入框失去焦点判断
    _handleBlur = (field) => {
        const {resumeEmail,resumePwd} = this.state;
        if(field=='resumeEmail' && (resumeEmail === '' || resumeEmail === undefined)){
             // 显示错误信息
            this.setState({
                errorEmail:true
            });
        }
        if(field=='resumePwd' && (resumePwd === '' || resumePwd === undefined)){
             // 显示错误信息
            this.setState({
                errorPwd:true
            });
        }
       
    }
    

    render() {
        const {
            error=false,
            errorResume=false,
            mailid,
            ResumeMailid,
            errorMsg='必填' , 
            resumeEmail , 
            resumePwd , 
            errorEmail=false , 
            errorPwd=false
        } = this.state,
            {routes,userEmailInfo , resumeEmailInfo} = this.props,
            {mailServersList,userMail} = userEmailInfo,
            {list , mailinfo} = resumeEmailInfo;
            //console.log(this.state)
        //const userMailId = userMail==null?"" : userMail.mailid;
        return (
            <ScrollPageContent>
                <div className="page-content setting-email-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="settings-block box-border table form">
                        <Tabs type="card">
                            <TabPane tab="发送邮箱" key="1">
                                <div className="email-panel-wrap">
                                    <ul>
                                        <li className="table">
                                            <div className="table-cell">
                                                邮箱服务器
                                            </div>
                                            <div className="table-cell">
                                                <Select
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                    className={error ? 'error' : ''}
                                                    value={mailid}
                                                    placeholder="请选择邮箱服务器"
                                                    onChange={this.handleSelectChange}
                                                    onBlur={this.handleSelectBlur}
                                                >
                                                {
                                                    mailServersList.map( (item,index)=>{
                                                        const {id,servername} = item;
                                                        return (
                                                            <Option key={index} value={id+''}>
                                                                {servername}
                                                            </Option>
                                                        );
                                                    })
                                                }
                                                </Select>
                                                {error&&
                                                    <div className="error-promote" style={{
                                                        paddingLeft: 0
                                                    }}>
                                                        <label className="error">{errorMsg}</label>
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                        <li className="table">
                                            <div className="table-cell">
                                                邮箱名
                                            </div>
                                            <div className="table-cell">
                                                <ErrorInputComponents 
                                                    ref="emailInput"
                                                    placeholder="请输入邮箱名"
                                                    onChange={this.handleChange.bind(this,'email')}
                                                    onEnter={this.handleEnter.bind(this,'pwdInput')}
                                                />
                                            </div>
                                        </li>
                                        <li className="table">
                                            <div className="table-cell">
                                                密码
                                            </div>
                                            <div className="table-cell">
                                                <ErrorInputComponents 
                                                    type="password"
                                                    ref="pwdInput"
                                                    placeholder="请输新密码"
                                                    onChange={this.handleChange.bind(this,'pwd')}
                                                    onEnter={this.handleEnter}
                                                />
                                            </div>
                                        </li>
                                        <li className="table form-btns">
                                            <Button type="primary" onClick={this.setEmail}>配置</Button>
                                            <Button className="grey" onClick={this.resetForm}>重填</Button>
                                        </li>
                                    </ul>
                                </div>
                            </TabPane>
                            <TabPane tab="简历邮箱" key="2">
                                <div className="email-panel-wrap">
                                    <ul>
                                        <li className="table">
                                            <div className="table-cell">
                                                邮箱服务器
                                            </div>
                                            <div className="table-cell">
                                                <Select
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                    className={errorResume ? 'errorResume' : ''}
                                                    value={ResumeMailid}
                                                    ref = "resumeServerEmail"
                                                    placeholder="请选择邮箱服务器"
                                                    onChange={this.handleSelectResumeChange}
                                                    onBlur={this.handleSelectBlur}
                                                >
                                                {
                                                    (list!=undefined?list:[]).map( (item,index)=>{
                                                        const {id,servername} = item;
                                                        return (
                                                            <Option key={index} value={id+''}>
                                                                {servername}
                                                            </Option>
                                                        );
                                                    })
                                                }
                                                </Select>
                                                {errorResume&&
                                                    <div className="error-promote" style={{
                                                        paddingLeft: 0
                                                    }}>
                                                        <label className="error">{errorMsg}</label>
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                        <li className="table">
                                            <div className="table-cell">
                                                邮箱名
                                            </div>
                                            <div className="table-cell">
                                                <Input
                                                    ref="resumeEmailInput"
                                                    value={resumeEmail}
                                                    className={`${errorEmail ? 'errorEmail' : ''}`} 
                                                    placeholder="请输入邮箱名"
                                                    onChange={this.handleChange.bind(this,'resumeEmail')}
                                                    onBlur={this._handleBlur.bind(this,'resumeEmail')}
                                                />
                                                {errorEmail && 
                                                    <div className="error-promote">
                                                        <label className="error">{errorMsg}</label>
                                                    </div>
                                                }
            
                                            </div>
                                        </li>
                                        <li className="table">
                                            <div className="table-cell">
                                                密码
                                            </div>
                                            <div className="table-cell">
                                                <Input
                                                    type="password"
                                                    ref="resumeEmailPwd"
                                                    value={resumePwd}
                                                    className={`${errorPwd ? 'errorPwd' : ''}`} 
                                                    placeholder="请输新密码"
                                                    onChange={this.handleChange.bind(this,'resumePwd')}
                                                    onBlur={this._handleBlur.bind(this,'resumePwd')}
                                                />
                                                {errorPwd && 
                                                    <div className="error-promote">
                                                        <label className="error">{errorMsg}</label>
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                        <li className="table form-btns">
                                            <Button type="primary" onClick={this.setResumeEmail}>配置</Button>
                                            <Button className="grey" onClick={this.resetResumeForm}>重填</Button>
                                        </li>
                                    </ul>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    userEmailInfo: state.User.userEmailInfo,
    resumeEmailInfo: state.User.resumeEmailInfo
})
const mapDispatchToProps = dispatch => ({
    getUserEmail: bindActionCreators(Actions.UserActions.getUserEmail, dispatch),
    getResumeEmail: bindActionCreators(Actions.UserActions.getResumeEmail, dispatch),
    changeEmailSetting: bindActionCreators(Actions.UserActions.changeEmailSetting, dispatch),
    changeResumeEmailSetting: bindActionCreators(Actions.UserActions.changeResumeEmailSetting, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingEmailPage);