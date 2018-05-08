import React, {Component,PropTypes} from 'react';

import {Button , Menu} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';

export default class NotFoundPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    render() {
        return (
           
                <div style={{overflow:"hidden",margin:30,height:760}}>
                    <h3 style={{marginBottom:20}}>登录页面</h3>
                    <p style={{ textIndent:"2em",marginBottom:20}}>
                        在浏览器地址栏中输入系统的访问地址<a href="http://yun.51jrq.com/#/?_k=016dxw">http://yun.51jrq.com/#/?_k=016dxw</a>，进入登录界面。在用户名框、密码框输入正确的用户名和密码，单击<a>【安全登录】</a>按钮即可登录本系统。系统将根据用户的身份及权限范围进入相应的系统主界面，若<span style={{color:"red"}}>公司名、用户名、密码</span>输入错误，或者不输入<span style={{color:"red"}}>公司名、用户名、密码</span>，则不能登录本系统。本文以系统管理员用户对系统功能进行描述。系统登录界面如图所示：</p>
                    <div style={{width:600,height:330,margin:"0 auto"}}>
                        <img src="/static/images/help/log.png" width="100%" height="100%"/>
                    </div>
                    <div style={{margin:"0 auto",width:300,textAlign:"center",lineHeight:"5"}}>图1-1招聘云登陆界面</div>
                    
                </div>
            
        );
    }
}