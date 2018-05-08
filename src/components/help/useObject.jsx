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
           
                <div className="page-content not-found-page" style={{height:800}}>
                    <p style={{margin:20}}>本文档适用于各公司内部软件操作人员。</p>
                </div>
            
        );
    }
}