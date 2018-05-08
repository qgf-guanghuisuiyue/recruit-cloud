import React, {Component} from 'react';

import LoadingComponent from 'components/loading';
import BaseInfoComponent from './info/baseinfo';
import OtherInfoComponent from './info/other-info'; 
import {Button} from 'antd';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class JobInfoComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps;
    }
    //保存修改信息
    saveJobInfo = () => {
        const {createJob,jobInfo,hideJobModal} = this.props;
        const {BaseInfoComponent,OtherInfoComponent} = this.refs;
        const baseinfoData = BaseInfoComponent.getFormData();
        if(!baseinfoData) return;
        const otherInfoData = OtherInfoComponent.getFormData();
        if(!otherInfoData) return ;
        createJob({
            ...BaseInfoComponent.state,
            ...OtherInfoComponent.state,
            ...{positionid:jobInfo.positionid}
        },hideJobModal);
    }
    resetForm = () => {
        const {BaseInfoComponent,OtherInfoComponent} = this.refs;
        BaseInfoComponent.resetForm();
        OtherInfoComponent.resetForm();
        this.props.hideJobModal()
    }
    render() {
        const {isLoading,isdisabled} = this.props;
        return (
            <div>
                {isLoading &&
                    <div style={{
                        position: 'relative',
                        height: 478
                    }}>
                        <LoadingComponent className="absolute-center" />
                    </div>
                }
                {!isLoading &&
                    <ul className="new-job-form" style={{
                        textAlign: 'left',
                        padding: 0,
                        margin: '16px 30px'
                    }}>
                        <BaseInfoComponent
                            ref="BaseInfoComponent" 
                            {...this.props}
                        />
                        <OtherInfoComponent 
                            ref="OtherInfoComponent"
                            {...this.props} 
                        />
                       {
                        !isdisabled && <li style={{textAlign:'center'}}>
                                        <Button onClick={this.resetForm}>取消</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button type="primary" onClick={this.saveJobInfo}>保存</Button>
                                    </li>
                       }
                        
                
                    </ul>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    jobInfo: state.Job.jobInfo,
    isLoading: state.Job.isLoadingInfo,
    isLoadingAbort: state.Job.isLoadingAbort
})
const mapDispatchToProps = dispatch => ({
    abortJobInfo: bindActionCreators(Actions.jobActions.abortJobInfo, dispatch),
    createJob: bindActionCreators(Actions.jobActions.createJob, dispatch),
    hideJobModal: bindActionCreators(Actions.jobActions.hideJobModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobInfoComponent);