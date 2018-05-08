import React, {Component,PropTypes} from 'react';

import {Input} from 'antd';

export class InputComponent extends Component {
    state = {}
    static propTypes = {
        name: PropTypes.string,
        field: PropTypes.string,
        value: PropTypes.oneOfType([ // 输入框的值
            PropTypes.string,
            PropTypes.number
        ]),
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool, //是否禁用输入框
        className: PropTypes.string, // 输入框类名
        style: PropTypes.object // 输入框内联样式
    }

    handleChange = (field,event) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(field,event);
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.value !== this.props.value
    }

    render() {
        const {
            name='',
            field='',
            value,
            placeholder,
            disabled=false,
            className='',
            style={}
        } = this.props;
        return (
            <div className="inline-block">
                <span>{name}</span>
                <Input 
                    placeholder={placeholder} 
                    value={value}
                    onChange={this.handleChange.bind(this,field)} 
                    disabled={disabled}
                    className={className}
                    style={style}
                />
            </div>
        )
    }
}

export class ErrorInputComponents extends Component {

    static propTypes = {
        type: PropTypes.string, // 输入框的类型
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onEnter: PropTypes.func
    }

    state = {
        value: undefined
    }

    setErrorAndMsg = (bool=false,msg='必填') => {
        // 外部可以使用该方法设置是否显示错误
        // 设置error是否隐藏和错误信息
        this.setState({
            _error: bool,
            _errorMsg: msg
        });
    }

    resetVal = (val) => {
        // 外部可以通过该方法重置值
        this.setState({
            _value: val,
            _error: false
        });
    }

    _handleChange = (e) => {
        const {onChange} = this.props;
        if(onChange){
            onChange(e);
        }
        this.setState({
            _value: e.target.value,
            _error: false // 输入字符后,隐藏错误信息
        });
    }

    _handleEnter = (e) => {
        const {onEnter} = this.props;
        if(onEnter){
            onEnter(e);
        }
    }

    _handleBlur = (e) => {
        const {_value} = this.state;
        if(_value === '' || _value === undefined){
            this.setErrorAndMsg(true); // 显示错误信息
        }
    }

    render() {
        const {_error=false,_errorMsg='必填',_value} = this.state,
            {
                placeholder='',
                type='text'
            } = this.props;
        return (
            <div>
                <Input
                    ref="input"
                    type={type}
                    value={_value}
                    className={`${_error ? 'error' : ''}`} 
                    placeholder={placeholder}
                    onChange={this._handleChange}
                    onPressEnter={this._handleEnter}
                    onBlur={this._handleBlur}
                />
                {_error && 
                    <div className="error-promote">
                        <label className="error">{_errorMsg}</label>
                    </div>
                }
            </div>
        );
    }
}