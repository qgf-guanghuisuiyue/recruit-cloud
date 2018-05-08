import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
// 面包屑导航
import BreadCrumbComponent from 'components/breadcrumb';

import {Modal , Button} from 'antd'

// 列表组件
import ListComponents from 'components/email/list';
import RightComponents from 'components/email/right';
// 人员信息历史邮件列表
import PersonInfoListComponent from 'components/email/personInfo-list';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class EmailPage extends Component {

    state = {
        addressee: {}
    }

    componentDidMount() {
        NProgress.done();
    }

    selectAddressee = addressee => {
        this.setState({addressee});
    }
    //显示发送邮件弹框
    showEmailModal =() => {
        this.props.showEmailModal()
    }
    //隐藏发送邮件弹框
    handleCancel = () => {
        this.props.hideEmailModal()
    }

    render() {
        const {routes , sendEmailVisible} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content email-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <ListComponents selectAddressee={this.selectAddressee} />
                        </div>
                        <div className="pull-right">
                            <div style={{overflow:'hidden',width:'100%',height:'60',backgroundColor:'white',padding:'17'}}>
                                <span 
                                    style={{ display:'block',width:'300',height:'60',color:'#4d4d4d',float:'left',fontSize:'18'}}
                                >邮件列表
                                </span>
                                <Button
                                    type="primary" 
                                    style={{ display:'block',float:'right'}}
                                    onClick={this.showEmailModal}>发送邮件</Button>
                            </div>
                            <PersonInfoListComponent />
                            {/* <RightComponents addressee={this.state.addressee} /> */}
                        </div>
                    </div>
                    {/*人员信息历史邮件列表*/}
                    {/* <PersonInfoListComponent /> */}
                    <Modal
                        width='880'
                        visible={sendEmailVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        closable={false}
                        >
                        <RightComponents addressee={this.state.addressee} />
                    </Modal>
                </div>
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    sendEmailVisible: state.Email.sendEmailVisible
 })
 const mapDispatchToProps = dispatch => ({
    showEmailModal:bindActionCreators(Actions.EmailActions.showEmailModal, dispatch),
    hideEmailModal:bindActionCreators(Actions.EmailActions.hideEmailModal, dispatch)
 })
 export default connect(
     mapStateToProps,
     mapDispatchToProps
 )(EmailPage)