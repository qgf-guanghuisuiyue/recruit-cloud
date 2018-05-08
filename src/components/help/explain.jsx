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
            <div className="explain">
                <h3>说明：</h3>
                <div style={{marginLeft:20}}>
                    <p style={{marginBottom:20}}>1.使用手册有一定局限性，若依旧无法解决您的问题，请联系您的销售或售后。</p>
                    <p>2.版本更新后文档可能出现与实际操作不同的情况，请咨询销售了解最新的设置方法。</p>
                </div>
            </div>
        );
    }
}