import React, {Component} from 'react';

import {Modal,Input,Radio,Button,Table} from 'antd';
const RadioGroup = Radio.Group;

import QRCode from 'qrcode.react';

import pickBy from 'lodash/pickBy';

import radioData from 'data/evaluation-radio.json';
import navData from 'data/nav/evaluation.json';
import columns from 'data/table-columns/evaluate-table';
import CreditInvestgation from './credit-investgation';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class BackgroundSurveyModalComponents extends Component {
    state = {
        
    }
    showBackgroundModal= () => {
        this.props.showBackgroundModal()
    }
    hideBackgroundModal = () => {
        this.props.hideBackgroundModal()
    }
    render(){
        const {backSurveyVisible , resumeInfo , resumeid , isFill , creditData} = this.props;
        return(
            <Modal
                title = {(isFill || creditData.flag)?"背景调查结果":"背景调查"}
                footer={null}
                width = {1000}
                visible = {backSurveyVisible}
                className = "background-modal grey-close-header"
                onCancel={this.hideBackgroundModal}
                zIndex={1001}
                style={{top:30}}
            >
                <div>
                    <CreditInvestgation resumeid={resumeid}/>
                </div>        
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    backSurveyVisible: state.Resume.backSurveyVisible,
    creditData: state.Manage.creditData,
    isFill: state.Manage.isFill
})
const mapDispatchToProps = dispatch => ({
    showBackgroundModal: bindActionCreators(Actions.ResumeActions.showBackgroundModal, dispatch),
    hideBackgroundModal: bindActionCreators(Actions.ResumeActions.hideBackgroundModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BackgroundSurveyModalComponents);