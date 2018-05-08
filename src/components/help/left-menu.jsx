import React, {Component} from 'react';
import { Link } from 'react-router'
import {Button , Menu} from 'antd';
const SubMenu = Menu.SubMenu;

export default class LeftNavComponent extends Component {
    introductionData = [
        {name:'编写目的',path:'/help'},              
        {name:'使用对象',path:'/help/useObject'},
    ];
    functionalModuleData = [
        {name:'登陆界面',path:'/help/logPage'},
        {name:'工作主界面',path:'/help/mainPage'},
        {name:'职位管理界面',path:'/help/resumePage'},
        {name:'招聘流程界面',path:'/help/recrtPage'},
        {name:'人才库界面',path:'/help/tlentPage'},
        {name:'任务报表界面',path:'/help/tskPage'},
        {name:'员工管理界面',path:'/help/managePage'},
    ];
    render() {
        return (
            <div className="left-nav" style={{height:820}}>
                <Menu
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub2']}
                    mode="inline"
                >
                    <Menu.Item key="0">
                        <Link to="/help" style={{fontSize:16,fontWeight:"bold"}}>前言</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" title={<span style={{fontSize:16,fontWeight:"bold"}}>系统功能介绍</span>}>
                    {
                        this.functionalModuleData.map((item,index)=>{
                            const {path,name} = item;
                            return <Menu.Item key={index+1}>
                                        <Link to={path} style={{fontSize:14}}>{item.name}</Link>
                                   </Menu.Item>
                        })
                    }
                    </SubMenu>
                    <Menu.Item key="8">
                        <Link to="/help/questions" style={{fontSize:16,fontWeight:"bold"}}>常见问题</Link>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Link to="/help/explain" style={{fontSize:16,fontWeight:"bold"}}>说明</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}