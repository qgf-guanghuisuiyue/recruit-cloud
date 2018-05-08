import React, {Component} from 'react';
import md5 from 'blueimp-md5';

import {Input,Button} from 'antd';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {ErrorInputComponents} from 'components/input';


// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ChangePasswdPage extends Component {

    state = {
        oldPwd: '',
        newPwd: '',
        reNewPwd: ''
    };

    componentDidMount() {
        NProgress.done();
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.changeRes && this.validate()){
            this.resetForm();
            this.props.changeResFalse();
        }
    }

    onChange=(field,e)=>{
        const val = e.target.value;
        this.setState({
            [field]: val
        });
    }

    onEnter = (field) => {
        if(isString(field)){
            this.refs[field+'Input'].refs.input.focus();
        }else{
            this.changePasswd();
        }
    }

    resetForm = () => {
        this.setState({
            oldPwd: '',
            newPwd: '',
            reNewPwd: ''
        });
        const {oldPwdInput,newPwdInput,reNewPwdInput} = this.refs;
        oldPwdInput.resetVal();
        newPwdInput.resetVal();
        reNewPwdInput.resetVal();
    }

    validate = () => {
        const {oldPwd,newPwd,reNewPwd} = this.state,
            {oldPwdInput,newPwdInput,reNewPwdInput} = this.refs;
        if(isEmpty(oldPwd)){
            oldPwdInput.refs.input.focus();
            return false;
        }
        if(isEmpty(newPwd)) {
            newPwdInput.refs.input.focus();
            return false;
        }
        if(isEmpty(reNewPwd)){
            reNewPwdInput.refs.input.focus();
            return false;
        }
        return true;
    }

    changePasswd = () => {
        const {oldPwd='',newPwd='',reNewPwd=''} = this.state;
        if(!this.validate()) return;
        if(newPwd !== reNewPwd)
        {
            this.refs.reNewPwdInput.setErrorAndMsg(true,'输入的两次密码不一致！');
            this.refs.reNewPwdInput.refs.input.focus();
            return;
        }else{
            this.refs.reNewPwdInput.setErrorAndMsg(false);
        }
        this.props.changePassWd({
            oldpasswd: md5(oldPwd),
            newpasswd: md5(newPwd)
        });
    }

    render() {
        const {routes,isLoading} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content change-passwd-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="settings-block box-border table form">
                        <div className="table-cell">
                            <ul>
                                <li className="table">
                                    <div className="table-cell">
                                        旧密码
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="oldPwdInput"
                                            placeholder="请输入旧密码"
                                            onChange={this.onChange.bind(this,'oldPwd')}
                                            onEnter={this.onEnter.bind(this,'newPwd')}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <div className="table-cell">
                                        新密码
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="newPwdInput"
                                            placeholder="请输入新密码"
                                            onChange={this.onChange.bind(this,'newPwd')}
                                            onEnter={this.onEnter.bind(this,'reNewPwd')}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <div className="table-cell">
                                        确认密码
                                    </div>
                                    <div className="table-cell">
                                        <ErrorInputComponents 
                                            type="password"
                                            ref="reNewPwdInput"
                                            placeholder="请再次输入新密码"
                                            onChange={this.onChange.bind(this,'reNewPwd')}
                                            onEnter={this.onEnter}
                                        />
                                    </div>
                                </li>
                                <li className="table">
                                    <Button 
                                        loading={isLoading} 
                                        type="primary" 
                                        onClick={this.changePasswd}
                                    >
                                        保存
                                    </Button>
                                    <Button 
                                        className="grey" 
                                        onClick={isLoading ? ()=>{} : this.resetForm}
                                    >
                                        重填
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.User.isLoading,
    changeRes: state.User.changeRes
})
const mapDispatchToProps = dispatch => ({
    changePassWd: bindActionCreators(Actions.UserActions.changePassWd, dispatch),
    changeResFalse: bindActionCreators(Actions.UserActions.changeResFalse, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswdPage);