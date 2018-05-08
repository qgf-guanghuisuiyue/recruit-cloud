import React, { Component, PropTypes } from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

import { Select } from 'antd';
const Option = Select.Option;

export class SelectComponent extends Component {
    
        static PropTypes = {
            name: PropTypes.string,
            field: PropTypes.string,
            value: PropTypes.string,
            data: PropTypes.array,
            placeholder: PropTypes.string,
            dropdownMatchSelectWidth: PropTypes.bool,
            onChange: PropTypes.func,
            asterisk: PropTypes.bool
        }
    
        state = {
            error: false
        }
    
        shouldComponentUpdate(nextProps, nextState) {
            return nextProps.value !== this.props.value || nextState.error !== this.state.error;
        }
    
        handleChange = (field, value) => {
            const { error } = this.state;
            const { onChange } = this.props;
            if (onChange) {
                onChange(field, value);
            }
            if (error) {
                this.triggerError(false);
            }
        }
    
        handleBlur = value => {
            if (!value) {
                this.triggerError(true);
            }
        }
    
        triggerError = error => {
            this.setState({ error });
        }
    
        render() {
            const { error } = this.state,
                {
                    name,                                   //输入框前名称
                    field,
                    placeholder,                            //输入框提示信息
                    data = [],                              //option选项value来源
                    value,                                  //指定当前选中的条目
                    dropdownMatchSelectWidth,               //下拉菜单和选择器是否同宽
                    style = { width: 229, height: 40 },     //下拉框样式
                    asterisk = false                        //是否是必填项
                } = this.props;
            return (
                <div className="inline-block inline-block-select">
                    <span className={ asterisk ? "required-asterisk" : ""}>{name}</span>
                    <div className="inline-block" style={{
                        margin: 0
                    }}>
                        <Select
                            className={error&&asterisk ? 'error' : ''}
                            value={value}
                            placeholder={placeholder}
                            onChange={this.handleChange.bind(this, field)}
                            dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                            style={style}
                            onBlur={this.handleBlur}
                        >
                            {
                                data.map((item, index) => {
                                    return <Option key={index} value={item}>{item}</Option>
                                }) 
                            }
                        </Select>
                        {error&&asterisk &&
                            <div className="error-promote" style={{
                                paddingLeft: 0
                            }}>
                                <label className="error">{placeholder}</label>
                            </div>
                        }
                    </div>
                </div>
            )
        }
    }