import React, {Component} from 'react';

export default class ProjectListComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }

    render() {
        const {data} = this.props;
        return (
            <li className="info-item common-list">
                <h3 className="title">
                    项目经验
                </h3>
                {data.length > 0 &&
                    data.map((item,index)=>{
                        const {
                            starttime, // 开始时间
                            endtime, // 结束时间
                            projectname, // 项目名称
                            projectremark, // 项目描述
                            trustremark // 责任描述
                        } = item;
                        return (
                            <ul key={index} className="field-list">
                                <li>
                                    <span>起止时间 : </span>
                                    <span>{starttime} -- {endtime}</span>
                                </li>
                                <li>
                                    <span>项目名称 : </span>
                                    <span>{projectname}</span>
                                </li>
                                <li>
                                    <span>项目描述 : </span>
                                    <span dangerouslySetInnerHTML={{__html:projectremark}}></span>
                                </li>
                                <li>
                                    <span>责任描述 : </span>
                                    <span>{trustremark}</span>
                                </li>
                            </ul>
                        )
                    })
                }
            </li>
        );
    }
}