import React, {Component,PropTypes} from 'react';

import {Button , Menu} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';

export default class TskPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    render() {
        return (
            <div style={{overflow:"auto",margin:30,height:760}}>
                <h3 style={{marginBottom:20}}>任务报表</h3>
                <p 
                    style={{ textIndent:"2em",marginBottom:20}}
                >
                任务报表界面主要是一个企业内各个子账户登陆情况及日常工作数据统计。包含了<a>子账户姓名、登陆次数、简历总数、建立导入量、关注职位数、待处理申请者、及面试</a>过程中各个流程的数据展现。任务报表会根据各子账户的工作情况智能统计一个最终数据，该任务报表可根据时间段进行筛选查询及下载，便于部门领导人通过查看报表直观掌握该部门内的业务情况。
                </p>
                <div style={{width:700,height:350,margin:"0 auto"}}>
                    <img src="/static/images/help/taskbiao.png" width="100%" height="100%"/>
                </div>
                <div style={{margin:"0 auto",width:300,textAlign:"center",lineHeight:"5"}}>图6-1 任务报表界面展示</div>
            </div>
        );
    }
}