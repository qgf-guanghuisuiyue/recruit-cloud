import React, {Component} from 'react';

import {Input,Button} from 'antd';

import {Link} from 'react-router';

import moment from 'moment';

import isNull from 'lodash/isNull';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

import TimeComponent from '../time';

export default class FormComponent extends Component {

    state = {
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextProps !== this.props || this.state !== nextState;
    }

    handleChange = (field,e) => {
        this.setState({
            [field]: e.target.value
        });
    }

    handlePositionName=(e) => {
        this.handleChange('position',e);
    }

    handleDepartMent=(e) => {
        this.handleChange('department',e);
    }

    filterState=() => {
        return pickBy(this.state,item=>{
            return item !== '';
        });
    }

    resetForm=(clickNav=false) => {
        // 重置表单
        const {onStartChange,onEndChange} = this.refs.TimeComponent;
        this.setState({
            position: '',
            department: ''
        });
        onStartChange(null);
        onEndChange(null);
        this.props.onSearch({},clickNav);
    }

    handleSearch = () => {
        // 过滤值为空的参数
        const params = this.filterState();
        this.props.onSearch(params);
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: isNull(value) ? '' : moment(value).format('YYYY-MM-DD')
        });
    }

    getFormData = () => {
        const { starttime , endtime , isurgent , isintelligent } = this.state;
        const {handleStartOpen,handleEndOpenChange} = this.refs.TimeComponent;
        if(starttime === ''){
            handleStartOpen(true);
            return false;
        }
        if(endtime === ''){
            handleEndOpenChange(true);
            return false;
        }
        return {...this.state}
    }
    resetFormResume = ()=>{
        this.props.resetForm()
    }
   
    render() {
        const {department='',position='',starttime,endtime} = this.state;
        return (
            <div className="form" style={{
                position: 'relative'
            }}>
                <div className="bottom10">
                    <Input 
                        placeholder="职位" 
                        onChange={this.handlePositionName} 
                        value={position} 
                    />
                    <Input 
                        placeholder="部门" 
                        onChange={this.handleDepartMent} 
                        value={department} 
                    />
                </div>
                <div>
                    <TimeComponent
                        ref="TimeComponent"
                        onChange={this.onTimeChange}
                        starttime = {starttime}
                        endtime = {endtime}
                        style={{width:'249px',marginRight:'16px'}} 
                    />
                    <Button style={{marginRight: 10}}
                            type="primary" 
                            onClick={this.handleSearch}>
                            职位筛选
                    </Button>
                    <Button
                        className="grey" 
                        onClick={()=>this.resetForm(false)}>
                        清空条件
                    </Button>
                </div>
                <div className="float-button">
                    <Link to="/job/newJob" onClick={()=>{NProgress.start()}}>
                        <Button type="primary" onClick= {this.resetFormResume}></Button>
                        <span>新建职位</span>
                    </Link>
                </div>
            </div>
        );
    }
}