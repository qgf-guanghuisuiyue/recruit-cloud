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
           
            <div style={{overflow:"auto",margin:30,height:760}}>
                    <h3 style={{marginBottom:20}}>工作主界面</h3>
                    <p 
                        style={{ textIndent:"2em",margin:"20px 0px"}}
                    >
                        蓝色区域是<a>导航区</a>，包含了<a>职位管理、招聘流程、人才库、任务报表、员工管理、使用帮助</a>等几大工作模块，右边是<a>登陆的帐户名</a>和<a>所属公司</a>，最右边是登陆账户的<a>邮箱</a>，点进去可以设置邮箱相关内容。
                    </p>
                    <div style={{width:700,height:400,margin:"0 auto"}}>
                        <img src="/static/images/help/main.png" width="100%" height="100%"/>
                    </div>
                    <div style={{margin:"0 auto",width:300,textAlign:"center",lineHeight:"5"}}>图2-1 工作主界面</div>
                    

                    <p style={{ textIndent:"2em",margin:"20px 0px"}}>
                        <span style={{color:"#0086C9"}}>【紧急任务】：</span>
                        用户所创建的每个项目，都有对应的<a>开始时间</a>和<a>结束时间</a>，根据创建项目的紧急情况智能筛选展示急需完成项目及进展情况。距离结束时间<a>小于等于7天</a> 仍未完成任务的4个最紧急项目智能显示在该区域模块。点击<a>蓝色按钮</a>可跳转职位管理界面，查看更多任务。点击该区域内显示的<a>任一项目</a>，可查看该项目设置的需求信息。
                    </p>
                    <div style={{width:700,height:400,margin:"0 auto"}}>
                        <img src="/static/images/help/jinji.png" width="100%" height="100%"/>
                    </div>
                    <div style={{margin:"0 auto",width:300,textAlign:"center",lineHeight:"5"}}>图2-2 招聘云紧急任务招聘详情</div>

                    <p style={{ textIndent:"2em",margin:"20px 0px"}}>
                        <span style={{color:"#0086C9"}}>【简历入库情况】：</span>
                        折线图主要体现所登陆用户账户内各个时间段内从<a>前程无忧</a>、<a>智联招聘</a>、5<a>1金融圈</a>等各渠道获取简历的数据情况，一目了然，有助于提升使用者的工作效率。
                    </p>
                    <div style={{width:700,height:350,margin:"0 auto"}}>
                        <img src="/static/images/help/resumeData.png" width="100%" height="100%"/>
                    </div>
                    <div style={{margin:"0 auto",width:300,textAlign:"center",lineHeight:"5"}}>图2-3 简历入库情况</div>

                    <p style={{ textIndent:"2em",margin:"20px 0px"}}>
                        <span style={{color:"#0086C9"}}>【备忘日历】：</span>
                        折线图主要体现所登陆用户账户内各个时间段内从<a>前程无忧、智联招聘、51金融圈</a>等各渠道获取简历的数据情况，一目了然，避免因工作繁忙导致任务未按时完成。
                    </p>
                    <div style={{width:700,height:240,margin:"0 auto"}}>
                        <img src="/static/images/help/beiwang.png" width="100%" height="100%"/>
                    </div>
                    <div style={{margin:"0 auto",width:300,textAlign:"center",lineHeight:"5"}}>图2-4 备忘日历</div>

                    <p style={{ textIndent:"2em",margin:"20px 0px"}}>
                        <span style={{color:"#0086C9"}}>【任务完成指数】：</span>
                        该饼图主要展现所登陆  用户账户内某个时间段内的工作完成情况，让用户能对自己的目前工作任务进度有一个很好的把控。
                    </p>
                    <div style={{width:700,height:350,margin:"0 auto"}}>
                        <img src="/static/images/help/task.png" width="100%" height="100%"/>
                    </div>
                    <div style={{margin:"0 auto",width:300,textAlign:"center",lineHeight:"5"}}>图2-5 任务完成指数</div>

                    <p style={{ textIndent:"2em",margin:"20px 0px"}}>
                        <span style={{color:"#0086C9"}}>【待入职人员】：</span>
                        该图表展示的待入职人员<a>姓名、部门、电话、入职时间</a>等信息，便于用户对待入职人员进行跟踪管理。</p>
                    <div style={{width:700,height:350,margin:"0 auto"}}>
                        <img src="/static/images/help/ruzhi.png" width="100%" height="100%"/>
                    </div>
                    <div style={{margin:"0 auto",width:300,textAlign:"center",lineHeight:"5"}}>图2-6 待入职人员</div>
            </div>
            
        );
    }
}