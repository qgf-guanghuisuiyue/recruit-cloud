import React, {Component} from 'react';

export default class LoadingComponent extends Component {

    render() {
        const {style={},className=''} = this.props;
        return (
            <div className={`loader-wrapper ${className}`} style={style}>
                <div className="loader08"></div>
            </div>
        );
    }
}