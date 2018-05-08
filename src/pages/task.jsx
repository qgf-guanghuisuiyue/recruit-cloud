import React, {Component} from 'react';
import BasicPage from './basic';
import store from 'store';

import moment from 'moment';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';

import {Button,message} from 'antd';
import TimeComponent from 'components/time';

import TableComponent from 'components/task/table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
 
class TaskPage extends BasicPage {

    state = {
        starttime: '',
        endtime: '',
        downLoading: false
    }

    componentDidMount() {
        this.hideNProgress();
    }

    downloadTaskReport = () => {
        const {starttime,endtime} = this.state;
        if(starttime === ''){
            this.refs.TimeComponent.handleStartOpenChange(true);
            return false;
        }
        if(endtime === ''){
            this.refs.TimeComponent.handleEndOpenChange(true);
            return false;
        }
        const {token,tokenKey} = store.get('token') || {};
        this.refs.token.value = token;
        this.refs.tokenKey.value = tokenKey;
        this.refs.startDate.value = starttime;
        this.refs.endDate.value = endtime;
        // this.setState({
        //     downLoading:true
        // });
        this.refs.form.submit();
    }

    onTimeChange = (field,val) => {
        this.setState({
            [field]: val ? moment(val).format('YYYY-MM-DD') : ''
        });
    }

    taskSearch = () => {
        const {starttime,endtime} = this.state,
        {TimeComponent} = this.refs;
        if(starttime === ''){
            TimeComponent.handleStartOpenChange(true);
            return ;
        }
        if(endtime === ''){
            TimeComponent.handleEndOpenChange(true);
            return ;
        }
        this.props.getTaskReport({startDate:starttime,endDate:endtime},starttime,endtime);
    }

    render() {
        const {downLoading,endtime,starttime} = this.state;
        const {routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content task-page">
                    <BreadCrumbComponent routes={routes} />
                    <form 
                        ref="form" 
                        action={`${prefixUri}/progress_reportDownLoad`}
                        className="box-border" 
                        method="post"
                        target="downloadTarget"
                    >
                        <div className="form">
                            <input ref="token" type="hidden" name="token" />
                            <input ref="tokenKey" type="hidden" name="tokenKey" />
                            <input ref="startDate" type="hidden" name="startDate" />
                            <input ref="endDate" type="hidden" name="endDate" />
                            <TimeComponent
                                ref="TimeComponent"
                                style={{width:'249px',marginRight:'16px'}}
                                onChange={this.onTimeChange}
                                starttime={starttime}
                                endtime ={endtime}
                            />
                            <Button type="primary" onClick={this.taskSearch}>查询</Button>
                        </div>
                        <TableComponent/>
                        <Button 
                            className="download" 
                            onClick={this.downloadTaskReport} 
                            type="primary"
                            loading={downLoading}
                        >下载</Button>
                    </form>
                    <iframe 
                        id="downloadTarget" 
                        name="downloadTarget" 
                        style={{display:'none'}} 
                        src="" 
                        frameborder="0"
                    ></iframe>
                </div>
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    downLoading: state.Task.downLoading
})
const mapDispatchToProps = dispatch => ({
    getTaskReport: bindActionCreators(Actions.TaskActions.getTaskReport, dispatch)
    // downloadTaskReport: bindActionCreators(Actions.TaskActions.downloadTaskReport, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskPage);