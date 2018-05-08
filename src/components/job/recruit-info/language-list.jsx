import React, {Component} from 'react';

export default class LanguageListComponent extends Component {
    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.data !== this.props.data;
    }
    render() {
        const {data} = this.props;
        return (
            <li className="info-item">
                <h3 className="title">
                    语言能力
                </h3>
                {data.length > 0 &&
                    <ul className="field-list">
                        {
                            data.map((item,index)=>{
                                const {type} = item;
                                return (
                                    <li key={index} dangerouslySetInnerHTML={{__html:type}}>
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