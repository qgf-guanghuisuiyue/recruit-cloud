import React, {Component} from 'react';

export default class WorkListComponent extends Component {
    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }
    render() {
        const {data} = this.props;
        return (
            <li className="info-item common-list">
                <h3 className="title">
                    工作经历
                </h3>
                {data.length > 0 &&
                    data.map((item,index)=>{
                        const {
                            starttime, // 开始时间
                            endtime, // 结束时间
                            corpname, // 企业名称
                            industry, // 所属行业
                            postcode, // 职位名称
                            workremark // 工作描述
                        } = item;
                        return (
                            <ul key={index} className="field-list">
                                <li>
                                    <span>起止时间 : </span>
                                    <span>{starttime} -- {endtime}</span>
                                </li>
                                <li>
                                    <span>企业名称 : </span>
                                    <span>{corpname}</span>
                                </li>
                                <li>
                                    <span>所属行业 : </span>
                                    <span>{industry}</span>
                                </li>
                                <li>
                                    <span>职位名称 : </span>
                                    <span>{postcode}</span>
                                </li>
                                <li>
                                    <span>工作描述 : </span>
                                    <span dangerouslySetInnerHTML={{__html:workremark}}></span>
                                </li>
                            </ul>
                        )
                    })
                }
            </li>
        );
    }
}