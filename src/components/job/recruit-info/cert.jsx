import React, {Component} from 'react';

export default class CertListComponent extends Component {
    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }
    render() {
        const {data} = this.props;
        return (
            <li className="info-item">
                <h3 className="title">
                    获得证书
                </h3>
                {data.length > 0 &&
                    <ul className="field-list">
                        {
                            data.map((item,index)=>{
                                const {
                                    gaintime, // 时间
                                    certname // 证书名称
                                } = item;
                                return (
                                    <li key={index}>
                                        <span>{gaintime}</span>
                                        <span style={{
                                            marginLeft: 15
                                        }}>{certname}</span>
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