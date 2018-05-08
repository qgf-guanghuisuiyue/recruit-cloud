import React, {Component} from 'react';

import {Tooltip} from 'antd';

export default class TooltipComponents extends Component {
    render() {
        return (
            <Tooltip 
                placement="topLeft" 
                title="保存后流程将跳至结束" 
                arrowPointAtCenter
            >
                {this.props.children}
            </Tooltip>
        );
    }
}