import React, {Component} from 'react';

export default class IntentionComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }

    render() {
        const {data} = this.props;
        const {
            jobnature, // 工作性质
            postids, // 期望行业
            functions, // 期望职位
            sitecity, // 期望地点
            expectsalarycode, // 期望月薪
            poststime // 到岗时间
        } = data;
        return (
            <li className="info-item">
                <h3 className="title">
                    求职意向
                </h3>
                <ul className="field-list">
                    <li>
                        <span>工作性质 : </span>
                        <span>{jobnature}</span>
                    </li>
                    <li>
                        <span>期望行业 : </span>
                        <span>{postids}</span>
                    </li>
                    <li>
                        <span>期望职位 : </span>
                        <span>{functions}</span>
                    </li>
                    <li>
                        <span>期望地点 : </span>
                        <span>{sitecity}</span>
                    </li>
                    <li>
                        <span>期望月薪 : </span>
                        <span>{expectsalarycode}</span>
                    </li>
                    <li>
                        <span>到岗时间 : </span>
                        <span>{poststime}</span>
                    </li>
                </ul>
            </li>
        );
    }
}