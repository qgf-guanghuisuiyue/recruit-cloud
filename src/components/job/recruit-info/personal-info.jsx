import React, {Component} from 'react';

export default class PersonalInfoComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }

    render() {
        const {data} = this.props;
        const {
            accountcityid, // 户籍
            borndate, // 出生日期
            joblb, // 当前行业
            titlenow, // 当前职位
            marital, // 婚姻状况
            companynow, // 当前公司
            workyears, // 工作年限
            educationbg, // 最高学历
            salary, // 年薪
            livecityid, // 居住地
            sex // 性别
        } = data;
        return (
            <li className="info-item" style={{
                position: 'relative'
            }}>
                <h3 className="title">
                    个人基本信息
                </h3>
                
                <ul className="field-list inline-block">
                    <li>
                        <span>出生日期</span>
                        <span> : {borndate}</span>
                    </li>
                    <li>
                        <span>当前行业</span>
                        <span> : {joblb}</span>
                    </li>
                    <li>
                        <span>当前职业</span>
                        <span> : {titlenow}</span>
                    </li>
                    <li>
                        <span className="space">户籍</span>
                        <span> : {accountcityid}</span>
                    </li>
                    <li>
                        <span>婚姻状况</span>
                        <span> : {marital}</span>
                    </li>
                    <li>
                        <span>当前公司</span>
                        <span> : {companynow}</span>
                    </li>
                </ul>
                <ul className="field-list inline-block" style={{
                    position: 'absolute',
                    left: 349
                }}>
                    <li>
                        <span>工作年限</span>
                        <span> : {workyears}</span>
                    </li>
                    <li>
                        <span>最高学历</span>
                        <span> : {educationbg}</span>
                    </li>
                    <li>
                        <span className="space">年薪</span>
                        <span> : {salary}</span>
                    </li>
                    <li>
                        <span style={{
                            letterSpacing: '.5em'
                        }}>居住地</span>
                        <span style={{
                            position: 'relative',
                            left: -7
                        }}> : {livecityid}</span>
                    </li>
                    <li>
                        <span className="space">性别</span>
                        <span> : {sex}</span>
                    </li>
                    <li>
                        <span>&nbsp;</span>
                        <span>&nbsp;</span>
                    </li>
                </ul>
            </li>
        );
    }
}