import React, {Component} from 'react';

export default class OtherComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }

    render() {
        const {data} = this.props;
        return (
            <li className="info-item">
                <h3 className="title">
                    附加信息
                </h3>
                {data.length > 0 &&
                    <ul className="field-list">
                        {
                            data.map((item,index)=>{
                                const {
                                    subject, // 主题
                                    content // 内容 (html字符串)
                                } = item;
                                return (
                                    <li key={index}>
                                        <span>{subject}</span>
                                        <span dangerouslySetInnerHTML={{__html:content}}></span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </li>
        );
    }
}