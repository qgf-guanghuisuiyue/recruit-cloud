import React, {Component} from 'react';
import {Button , Input , message } from 'antd';

export default class EmailInfoComponent extends Component {

    state = {
        title: '',
        displayState:'none',
        makeState:true,
        email:"",
    }
    componentDidMount(){
        this.props.getEmailHistory()
    }

    setTitle = title => {
        this.setState({title});
    }

    inputEmailTheme = e => {
        this.setTitle(e.target.value);
    }
    //鼠标滑过事件
    onMouseMove = () => {
        this.setState({
            displayState:'block'
        })
    }
    //鼠标离开事件
    onMouseOut = () => {
        this.setState({
            displayState:'none'
        })
    }
    //修改按钮
    handleMake = () => {
        this.setState({
            makeState:false
        }) 
        setTimeout(()=>{
            this.refs.emailInput.refs.input.focus()
        })  
    }
    //输入框失去焦点回调
    onBlur = () => {
        this.setState({
            makeState:true
        })
        const {addressee} = this.props,
              {email} = addressee,
              stateEmail = this.state.email;
        if (email!== stateEmail){
            this.handleOK()
        }     
    }
    //修改后确认按钮
    handleOK = () => {
        const {addressee} = this.props,
              {logId} = addressee,
              email = this.state.email;
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
       if (reg.test(email)) {
            this.props.updateResumeEmail({logid:logId,email:email},this.props)
       }else {
            message.error("请输入正确的邮箱格式！",2)
       }
    }
    //输入框onChange事件
    onChange = () => {
        this.setState({
            email:this.refs.emailInput.refs.input.value
        })
    }
    componentWillReceiveProps(){
        setTimeout(()=>{
            const {addressee} = this.props,
                  {email} = addressee;
            this.setState({
                email:email
            })
        })  
    }
    render() {
        const {title,displayState,makeState} = this.state,
              {addressee  } = this.props,
              {resumename} = addressee,
              {email} = this.state;
              
        return (
            <div className="email-msg">
                <div className="send-people">
                    <div className="table">
                        <div className="table-cell">
                            收件人
                        </div>
                        <div className="table-cell">
                            <img src="/static/images/email/head.png" alt="头像"/>
                        </div>
                        <div className="table-cell"
                             onMouseMove={this.onMouseMove}
                             onMouseOut={this.onMouseOut}
                        >
                            <div className="name">
                                {resumename}
                            </div>
                            <div className="address">
                                <Input 
                                    ref = "emailInput"
                                    value = {email}
                                    disabled = {makeState}
                                    onBlur = {this.onBlur}
                                    onChange = {this.onChange}
                                />
                                <Button 
                                    style={{display:displayState}}
                                    onClick={this.handleMake}
                                >
                                    修改邮箱
                                </Button>
                            </div>
                        </div>
                        <div className="table-cell">
                            <Button type="primary" onClick={this.props.sendEmail} >
                                发送邮件
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="theme">
                    <div className="table">
                        <div className="table-cell">
                            主题
                        </div>
                        <div className="table-cell">
                            <input 
                                style={{fontSize:12}}
                                type="text" 
                                placeholder="请输入邮件主题"
                                value={title}
                                onChange={this.inputEmailTheme}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}