import React, {Component,PropTypes} from 'react';
import ListItem from 'components/login/ListItem';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

import isEmpty from 'lodash/isEmpty';

import store from 'store';

class LoginPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        companyname: '',
        loginname: '',
        password: '',
        errMsg: '',
        isLoading: false
    }

    handleChange = (field,e) => {
        this.setState({
            [field]: e.target.value
        });
    }

    handleKeyUp = (field,e) => {
        if(e.keyCode === 13){
            this.refs[field].refs.input.focus();
        }
    }

    passwdKeyUp = (e) => {
        if(e.keyCode === 13){
            this.toLogin();
        }
    }

    componentWillUnmount() {
        this.setState({
            isLoading: false
        });
    }

    toLogin = () => {
        const {companyname,loginname,password} = this.state;
        if(companyname.length == 0){
            this.setState({
                errMsg: '公司名不能为空！'
            });
            return ;
        }else if(loginname.length == 0) {
            this.setState({
                errMsg: '用户名不能为空！'
            });
            return ;
        }else if(password.length == 0) {
            this.setState({
                errMsg: '密码不能为空！'
            });
            return ;
        }
        this.setState({
            isLoading: true
        });
        this.props.userLogin({...this.state},this.context);
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.loaddone && nextState.isLoading){
            this.setState({
                isLoading: false
            });
        }
        if(nextState.errMsg !== ''){
            setTimeout(()=>{
                this.setState({ 
                    errMsg: ''
                });
            },1000);
        }
    }

    render() {
        // const {isLoading} = this.props,
        const {companyname,loginname,password,errMsg,isLoading} = this.state,
            prefix = "./static/images/login/";
        return (
            <div id="login-page">
                <div className="bg">
                    {isLoading &&
                        <div id="common-loader" className="common-loader page-loader white-loader">
                            <div className="spinner">
                                <div className="dot1"></div>
                                <div className="dot2"></div>
                            </div>
                        </div>
                    }
                    <div className="login-area">
                        <img className="logo" src={`${prefix}logo.png`} alt="51招聘云"/>
                        <p className="desc">先进的互联网金融招聘系统</p>
                        <ul>
                            <ListItem
                                imgSrc={`${prefix}company-icon.png`}
                                title="公司名"
                                placeholder="请输入公司名"
                                onChange={this.handleChange.bind(this,'companyname')}
                                onKeyUp = {this.handleKeyUp.bind(this,'loginname')}
                                value={companyname}
                            />
                            <ListItem 
                                ref="loginname"
                                imgSrc={`${prefix}user-icon.png`}
                                title="用户名"
                                placeholder="请输入您的用户名"
                                onChange={this.handleChange.bind(this,'loginname')}
                                onKeyUp={this.handleKeyUp.bind(this,'password')}
                                value={loginname}
                            />
                            <ListItem 
                                ref="password"
                                imgSrc={`${prefix}passwd-icon.png`}
                                title="密码"
                                placeholder="请输入您的密码"
                                inputType="password"
                                onChange={this.handleChange.bind(this,'password')}
                                onKeyUp={this.passwdKeyUp}
                                value={password}
                            />
                        </ul>
                        <p className="forget-password">
                            <a href="javascript:void(0);">忘记密码？</a>
                        </p>
                        <a 
                            href="javascript:void(0);" 
                            className="button login"
                            onClick={this.toLogin}
                        >安全登陆</a>
                    </div>
                    <div className="tips bounceIn" style={{
                        display: errMsg !== '' ? '' : 'none'
                    }}>
                        {errMsg}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loaddone: state.Login.loaddone 
})
const mapDispatchToProps = dispatch => ({
    userLogin: bindActionCreators(Actions.loginActions.userLogin, dispatch),
    hideLoading: bindActionCreators(Actions.loginActions.hideLoading, dispatch),
    userLoginout:bindActionCreators(Actions.loginActions.hideLoading, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);