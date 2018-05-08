import React, {Component} from 'react';

export default class ListItemComponents extends Component {
    onChange = this._onChange.bind(this);
    onKeyUp = this._onKeyUp.bind(this);
    
    _onChange(event) {
        const {onChange} = this.props;
        if(onChange){
            onChange(event);
        }
    }

    _onKeyUp(event) {
        const {onKeyUp} = this.props;
        if(onKeyUp){
            onKeyUp(event);
        }
    }

    render() {
        const {title="",inputType="text",placeholder="",imgSrc=''} = this.props;
        return (
            <li className="table">
                <div className="table-row">
                    <div className="table-cell">
                        <span style={{backgroundImage:`url(${imgSrc})`}}>
                            {title}
                        </span>
                    </div>
                    <div className="table-cell">
                        <input 
                            ref="input"
                            type={inputType} 
                            placeholder={placeholder} 
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp}
                        />
                    </div>
                </div>
            </li>
        );
    }
}