import React, { Component,PropTypes } from 'react';

import { Button , Tag } from 'antd';
import BaseInfoComponent from 'components/create-job/baseinfo';
import OtherInfoComponent from 'components/create-job/other-info';
import TopComponent from 'components/create-job/top.jsx';

import BreadCrumbComponent from 'components/breadcrumb';

import SaveModalComponent from 'components/create-job/save-modal';

import SalaryModalComponent from 'components/create-job/salaryReference-modal';

import each from 'lodash/each';
import pick from 'lodash/pick';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class CreateJobPage extends Component {
    state={
        job:["金融理财师","合规","高级理财经理","出纳","营销专员"]
    }
    
     static contextTypes = {
        router: PropTypes.object
    }   

    componentDidMount() {
        NProgress.done();
        this._requestData()
    }
    //获取最近发布职位数据
    _requestData = () => {
        this.props.getJobList({count:"8"});
    }

    resetForm = () => {
        if(!this.props.isCanCreateJob) return false;
        const {BaseInfoComponent,OtherInfoComponent} = this.refs;
        BaseInfoComponent.resetForm();
        OtherInfoComponent.resetForm();
        BaseInfoComponent.handleCityChange([])
        this.props.resetForm()     
    }

    createJob =() => {
        if(this.props.isCanCreateJob){ 
            const {BaseInfoComponent,OtherInfoComponent} = this.refs;
            const baseinfoData = BaseInfoComponent.getFormData();
            if(!baseinfoData) return;
            const otherInfoData = OtherInfoComponent.getFormData();
            if(!otherInfoData) return ;
            this.props.createJob({
                ...BaseInfoComponent.state,
                ...OtherInfoComponent.state,
                ...{positionid:this.props.jobInfo.positionid}
            });
         this.props.resetForm()    
        }   
    }
    handleClick =() => {
        window.history.back()
    }

    render() {
        let routesCopy = [];
        let currentJob = [];//最近发布的职位
        const {
            routes, 
            listData, 
            isLoadingList,
            getJobInfo, 
            jobInfo, 
            isCanCreateJob,
            showSalaryModal,
            positionSalary,
        } = this.props;
        each(routes,item=>{
            routesCopy.push(pick(item,['breadcrumbName','path']));
        });
        each(routesCopy,(item,index)=>{
            if(item.path === 'job'){
                routesCopy[index].path = '/job/index';
            }
        });
        //最近发布职位数据处理
        listData.list.length!=0 && listData.list.length<9 && each(listData.list,item=>{
            currentJob.push({positionname:item.positionname,positioid:item.positionid})
        })  
        return (
            <div className="page-content new-job-page">
                <BreadCrumbComponent routes={routesCopy} />
                <div style = {{border: '1px solid #d5d5d5'}}>
                    <div className="back-zone">
                        <TopComponent 
                            recentJobData={currentJob}
                            getJobInfo={getJobInfo}
                            isLoading={isLoadingList}
                        /> 
                    </div>
                    <ul className="new-job-form">
                        <BaseInfoComponent 
                            ref="BaseInfoComponent"
                            data = {jobInfo}
                            showSalaryModal={showSalaryModal} 
                        />
                        <OtherInfoComponent 
                            ref="OtherInfoComponent" 
                            data = {jobInfo}
                        />
                        <li className="control">
                            <Button type="primary" onClick={this.createJob.bind(this)}>发布</Button>
                            <Button onClick={this.resetForm}>重置</Button>
                        </li>
                    </ul>
                </div>
                <SaveModalComponent/>
                <SalaryModalComponent 
                    positionSalary={positionSalary}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isCanCreateJob: state.Job.isCanCreateJob,
    isLoadingList: state.Job.isLoadingList,
    listData: state.Job.listData, // 统计列表数据
    jobInfo: state.Job.jobInfo,
    positionSalary: state.Job.positionSalary
})
const mapDispatchToProps = dispatch => ({
    createJob: bindActionCreators(Actions.jobActions.createJob, dispatch),
    showSaveJobModal: bindActionCreators(Actions.jobActions.showSaveJobModal, dispatch),
    showSalaryModal: bindActionCreators(Actions.jobActions.showSalaryModal, dispatch),
    getJobList: bindActionCreators(Actions.jobActions.getJobList, dispatch),
    getJobInfo: bindActionCreators(Actions.jobActions.getJobInfo, dispatch),
    resetForm: bindActionCreators(Actions.jobActions.resetForm, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateJobPage);