import React, {Component} from 'react';

export default class TrainListComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }

    render() {
        const {data} = this.props;
        return (
            <li className="info-item common-list">
                <h3 className="title">
                    培训经历
                </h3>
                {data.length > 0 &&
                    data.map((item,index)=>{
                        const {
                            starttime, // 开始时间
                            endtime, // 结束时间
                            org, // 培训机构
                            cert // 证书名称
                        } = item;
                        return (
                            <ul key={index} className="field-list">
                                <li>
                                    <span>起止时间 : </span>
                                    <span>{starttime} -- {endtime}</span>
                                </li>
                                <li>
                                    <span>培训机构 : </span>
                                    <span>{org}</span>
                                </li>
                                <li>
                                    <span>培训主题 : </span>
                                    <span></span>
                                </li>
                                <li>
                                    <span>证书名称 : </span>
                                    <span>{cert}</span>
                                </li>
                                <li>
                                    <span>培训描述 : </span>
                                    <span></span>
                                </li>
                            </ul>
                        )
                    })
                }
            </li>
        );
    }
}