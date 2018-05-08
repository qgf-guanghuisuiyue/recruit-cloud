import React, {Component , PropTypes} from 'react';

import {Modal , Tooltip , Icon} from 'antd';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class EmployeeModalComponent extends Component {

    componentDidMount(){
        const {visible,uriParams} = this.props,
        {resumeid=0,rid=0} = uriParams;
    }

    setModalVisible = () => {
        this.props.hideResumeModal();
    }

    modalAfterClose = () => {
        const {onChange} = this.props;
        if(onChange){
            onChange();
        }
    }
    
    render() {
        const {visible,uriParams} = this.props,
              {resumeid=0,rid=0} = uriParams;
        return (
            <Modal
                title="简历"
                wrapClassName="vertical-center-modal modal-recruit"
                visible={visible}
                onCancel={() => this.setModalVisible()}
                footer={null}
                afterClose={()=>this.modalAfterClose()}
                width={1100}
            >    
                {visible &&
                    <iframe 
                        frameBorder="0"
                        width='100%'
                        height='100%'
                        src={`/#/employeeInfo${resumeid ? '/' + resumeid : ''}${rid ? '/' + rid : ''}`}
                    >
                    </iframe>
                }  
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    visible: state.Manage.visible,
    uriParams: state.Manage.uriParams
})
const mapDispatchToProps = dispatch => ({
    hideResumeModal: bindActionCreators(Actions.ManageActions.hideResumeModal, dispatch)   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeModalComponent);