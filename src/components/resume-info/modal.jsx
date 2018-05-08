import React, {Component} from 'react';

import {Modal} from 'antd';

// 职位申请
import ReplyComponents from './reply';
// 预约管理
import SubscribeComponents from './subscribe';
// 面试管理
import InterViewComponents from './interview';
// 复试管理
import RetestComponents from './retest';
// 发送offer
import OfferComponents from './offer';
// 入职管理
import EntryComponents from './entry';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ModalComponents extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps;
    }

    _getTitle(stageid) {
        switch(parseInt(stageid)){
            case 1:
                return '职位申请';
            case 2:
                return '预约管理';
            case 3:
                return '面试管理';
            case 4:
                return '复试管理';
            case 5:
                return '发送offer';
            case 6:
                return '入职管理';
            default:
                return '';
        };
    }

    _getWrapClassName(stageid) {
        switch(parseInt(stageid)){
            case 1:
                return 'resume-reply-modal';
            case 2:
                return 'resume-subscribe-modal';
            case 3:
                return 'resume-interview-modal';
            case 4:
                return 'resume-retest-modal';
            case 5:
                return 'resume-offer-modal';
            case 6:
                return 'resume-entry-modal';
            default:
                return '';
        };
    }

    changeStageStatus = () => {
        /**
         * stageid 当前招聘状态id
         * id 当前招聘流程id
         * statusid 选择流程状态id
         * thelable 招聘流程标签
         */
        const {currentStage} = this.props,
            {stageid,id} = currentStage,
            formData = this.refs.modal.getFormData();
        if(!formData) return ;
        this.props.changeStageStatus({...formData,stageid,id},this.props);
    }

    render() {
        const {modalVisible,currentStage,isLoading} = this.props,
            {stageid} = currentStage;
        return (
            <Modal
                title={this._getTitle(stageid)}
                wrapClassName={`vertical-center-modal resume-info-modal ${this._getWrapClassName(stageid)}`}
                visible={modalVisible}
                onOk={this.changeStageStatus}
                onCancel={isLoading ? ()=>{} : this.props.hideModal}
                confirmLoading={isLoading}
            >
                {stageid === '1' && <ReplyComponents ref="modal" />}
                {stageid === '2' && <SubscribeComponents ref="modal" currentStage={currentStage} />}
                {stageid === '3' && <InterViewComponents ref="modal" currentStage={currentStage} />}
                {stageid === '4' && <RetestComponents ref="modal" currentStage={currentStage} />}
                {stageid === '5' && <OfferComponents ref="modal" currentStage={currentStage} />}
                {stageid === '6' && <EntryComponents ref="modal" currentStage={currentStage} />}
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    modalVisible: state.Resume.modalVisible,
    currentStage: state.Resume.currentStage,
    isLoading: state.Resume.isModalLoading
})
const mapDispatchToProps = dispatch => ({
    changeStageStatus: bindActionCreators(Actions.ResumeActions.changeStageStatus, dispatch),
    hideModal: bindActionCreators(Actions.ResumeActions.hideModal, dispatch),
    getStageLog:bindActionCreators(Actions.ResumeActions.getStageLog, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalComponents);