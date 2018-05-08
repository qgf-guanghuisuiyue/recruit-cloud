import React, {Component} from 'react';

import moment from 'moment';

import {Input,DatePicker} from 'antd';

export default class InputComponents extends Component {

    state = {
        error: false,
        open: false,
        eventtime: null,
        eventaddress: ''
    }
    
    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    disabledDate = date => {
        if(!date){
            return false;
        }
        return date.valueOf() < new Date().getTime();
    }

    handleDateChange = value => {
        this.setState({
            eventtime: value
        });
    }

    handleOpenChange = open => {
        this.setState({open});
    }

    setError = error => {
        this.setState({error});
    }

    handleTextChange = e => {
        const {error} = this.state;
        if(error){
            this.setError(false);
        }
        this.setState({
            eventaddress: e.target.value
        });
    }

    getFormData = () => {
        const {eventtime,eventaddress} = this.state;
        // 没有选择时间打开日期弹层
        if(!eventtime){
            this.handleOpenChange(true);
            return false;
        }
        if(eventaddress === '') {
            this.refs.Input.refs.input.focus();  
            this.setError(true);
            return false;
        }
        const formatTime = moment(eventtime).format('YYYY-MM-DD h:mm');
        return {...{eventtime:formatTime},eventaddress};
    }

    render() {
        const {timePlaceholder='',addressPlaceholder=''} = this.props;
        const {eventtime,eventaddress,open,error} = this.state;
        return (
            <div style={{
                marginTop: 28
            }}>
                <div className="inline-block">
                    <DatePicker
                        showTime
                        value={eventtime}
                        className="eventtime"
                        format='YYYY-MM-DD h:mm:ss'
                        showToday={false}
                        //disabledDate={this.disabledDate}
                        placeholder={timePlaceholder}
                        open={open}
                        onOpenChange={this.handleOpenChange}
                        style={{
                            width: '209px'
                        }}
                        onChange={this.handleDateChange}
                    />
                </div>
                <div className="inline-block">
                    <Input 
                        ref="Input"
                        placeholder={addressPlaceholder}
                        style={{
                            width: '209px',
                            marginLeft: 11
                        }}
                        className={error ? 'error' : ''}
                        value={eventaddress}
                        onChange={this.handleTextChange}
                    />
                    {error &&
                        <div className="error-promote" style={{
                            marginLeft: 11
                        }}>
                            <label className="error">请输入{addressPlaceholder}</label>
                        </div>
                    }
                </div>
            </div>
        );
    }
}