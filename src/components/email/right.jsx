import React, {Component} from 'react';

import EmailInfoComponent from './email-info';
import EmailEditorComponents from './email-editor';

import {message,Button} from 'antd';

import isEmpty from 'lodash/isEmpty';

// 上传附件MODAL
import UploadModalComponent from 'components/email/upload-modal';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RightComponents extends Component {

    fileList = []

    showNProgress() {
        let className = '';
        if(location.hash.indexOf('email') !== -1){
            className = 'top56';
        }else{
            className = 'top0';
        }
        NProgress.configure({className});
        NProgress.start();
    }

    handleSendEmail = () => {
        /**
         * isSendEmailDone 邮件是否发送完成,如果为false表示发送中,就不再发请求
         */
        const {isSendEmailDone,getEmailBoxDetail} = this.props,
            {
                EmailInfoComponent,
                EmailEditorComponents
            } = this.refs,
            {props,state,setTitle} = EmailInfoComponent,
            {addressee} = props,
            {title} = state,
            {content} = EmailEditorComponents.state;
        if(!isSendEmailDone){
            return ;
        }
        if(isEmpty(addressee)){
            message.info('收件人不存在！');
            return ;
        }
        if(isEmpty(title)){
            message.info('邮件主题未输入信息！');
            return ;
        }
        if(content === '<p ><br></p>'){
            message.info('邮件内容未输入信息！');
            return ;
        }
        // 获取附件JSON参数
        let attachmentJson = {};
        if(this.fileList.length > 0){
            this.fileList.forEach(item=>{
                const {name,response} = item;
                attachmentJson[name] = response.filePath;
            });
        }
        attachmentJson = JSON.stringify(attachmentJson);
        /**
         * setTitle 设置邮件标题
         * resetHTML 重置富文本编辑器
         */
        const {resumeid,positionid,email} = addressee;
        this.showNProgress();
        this.props.sendEmail({
            resumeid,
            positionid,
            title,
            content,
            ...{toaddress:email},
            attachmentJson
        },this.fileList,setTitle,EmailEditorComponents.resetHTML,getEmailBoxDetail);
    }

    handleFileList = fileList => {
        this.fileList = fileList;
    }

    render() {
        return (
            <div className="box-border email-editor-containr">
                <EmailInfoComponent 
                    ref="EmailInfoComponent"
                    {...this.props}
                    sendEmail={this.handleSendEmail}
                />
                <EmailEditorComponents  
                    ref="EmailEditorComponents"
                />
                <Button className="upload" onClick={this.props.showUploadModal}>
                </Button>
                {/* <div 
                    style={{
                        position:"relative",
                        overflow:"hidden",
                        top:-390,
                        zIndex:1000,
                        width:850,
                        height:390,
                        background:"#666",
                        opacity:0
                    }}
                    >
                </div> */}
                <UploadModalComponent 
                    handleFileList={this.handleFileList}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isSendEmailDone: state.Email.isSendEmailDone
})
const mapDispatchToProps = dispatch => ({
    sendEmail: bindActionCreators(Actions.EmailActions.sendEmail, dispatch),
    showUploadModal: bindActionCreators(Actions.EmailActions.showUploadModal, dispatch),
    getEmailBoxDetail: bindActionCreators(Actions.EmailActions.getEmailBoxDetail, dispatch),
    updateResumeEmail: bindActionCreators(Actions.EmailActions.updateResumeEmail, dispatch),
    getRecruitResumeInfo: bindActionCreators(Actions.ResumeActions.getRecruitResumeInfo, dispatch),
    getEmailHistory: bindActionCreators(Actions.EmailActions.getEmailHistory, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightComponents);