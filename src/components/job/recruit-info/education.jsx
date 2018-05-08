import React, {Component} from 'react';

export default class EducationComponent extends Component {
    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }
    render() {
        const {data} = this.props;
        return (
            <li className="info-item common-list">
                <h3 className="title">
                    教育经历
                </h3>
                {data.length > 0 &&
                    data.map((item,index)=>{
                        const {
                            starttime, // 起止时间
                            endtime, // 结束时间
                            school, // 学校
                            educationbg, // 学历
                            specialtyid // 专业
                        } = item;
                        return (
                            <ul key={index} className="field-list">
                                <li>
                                    <span>起止时间</span>
                                    <span> : {starttime} -- {endtime}</span>
                                </li>
                                <li>
                                    <span className="space">学校</span>
                                    <span> : {school}</span>
                                </li>
                                <li>
                                    <span className="space">学历</span>
                                    <span> : {educationbg}</span>
                                </li>
                                <li>
                                    <span className="space">专业</span>
                                    <span> : {specialtyid}</span>
                                </li>
                            </ul>
                        )
                    })
                }
            </li>
        );
    }
}