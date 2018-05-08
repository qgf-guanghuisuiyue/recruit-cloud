import React, {Component} from 'react';

import { Timeline } from 'antd';

export default class OperateHistory extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    render() {
        const {data} = this.props;
        const {list} = data; 
        return (
            <div className="operate-history clerk-tab-container">
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                人事操作记录
                            </h3>
                            <Timeline  style={{marginLeft: 65}}>
                                {
                                    list.map((item,index)=>{
                                        return <Timeline.Item>{item.eventmsg}</Timeline.Item>
                                    })
                                }
                                
                                {/* <Timeline.Item><span className="op-time">2017-03-21 20:12</span><span>人事总监</span>修改了<span>陈晓晨</span>的员工信息，部门由 <span>市场部</span>变更为<span>产品部</span></Timeline.Item>
                                <Timeline.Item><span className="op-time">2017-03-12 13:21</span><span>yierha001</span>添加了员工<span>陈晓晨</span></Timeline.Item> */}
                            </Timeline>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}