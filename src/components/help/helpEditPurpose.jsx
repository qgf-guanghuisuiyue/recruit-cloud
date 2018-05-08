import React, {Component,PropTypes} from 'react';

import {Button , Menu} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';

export default class HelpEditPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    render() {
        return (
                <div className="helpEdit" >
                    <h3>前言</h3>
                    <div style={{width:880,marginLeft:20}}>
                        <h4>编写目的</h4>
                        <p style={{margin:20}}>本文档旨在对《招聘云2.0系统》软件功能进行描述，帮助用户了解掌握该系统的使用方法</p>
                        <h4>使用对象</h4>
                        <p style={{margin:20}}>本文档适用于各公司内部软件操作人员。</p>
                    </div>
                    
                </div>
            
        );
    }
}