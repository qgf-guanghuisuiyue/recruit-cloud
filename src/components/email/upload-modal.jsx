import React, {Component} from 'react';

import {Upload,Button,Modal,Icon} from 'antd';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class UploadModalComponent extends Component {

    state = {
        error: false,
        errorMsg: '附件大小不能超过5MB！',
        fileList: []
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.resetFileList){
            this.setState({
                fileList: []
            });
            this.props.resetFileListFalse();
        }
    }

    triggerError = (error,errorMsg='附件大小不能超过5MB！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = file => {
        const {error,fileList} = this.state,
            {name,size} = file;
        // 判断文件大小最大支持100M的文件
        if(size > 5*1024*1024){
            this.triggerError(true,'附件大小不能超过5MB！');
            return false;
        }
        if(error){
            this.triggerError(false);
        }
        return true;
    }

    // 上传文件改变时的状态
    onFileChange = info =>{
        let fileList = info.fileList;
        if (info.file.status === 'error') {
            this.triggerError(true,'附件上传失败！');
        }
        this.setState({fileList});
        this.props.handleFileList(fileList);
    }

    // 文件移除
    onFileRemove = file => {
        const {response} = file;
        if(response){
            this.props.removeUploadFIle(response.filePath);
        }
        return true;
    }

    render() {
        const {fileList,error,errorMsg} = this.state;
        const {modalVisible} = this.props;
        return (
                <Modal
                    title="上传附件"
                    wrapClassName="vertical-center-modal upload-attchment-modal"
                    visible={modalVisible}
                    onCancel={this.props.hideUploadModal}
                    footer={null}
                >
                    <Upload 
                        name='uploadify'
                        action={`${prefixUri}/upload`}
                        beforeUpload={this.onFilebeforeUpload}
                        onChange={this.onFileChange}
                        onRemove={this.onFileRemove}
                        fileList={fileList}
                    >
                        <Button>
                            <Icon type="upload" /> 上传附件
                        </Button>
                        {error &&
                            <span className="error-text" style={{
                                verticalAlign: 'bottom',
                                marginLeft: 5
                            }}>
                                {errorMsg}
                            </span>
                        }
                        <p style={{
                            marginTop: 16,
                            color: 'rgb(204,204,204)'
                        }}>
                            上传附件大小不能超过5MB!
                        </p>
                    </Upload>
                </Modal>
        );
    }
}

const mapStateToProps = state => ({
    resetFileList: state.Email.resetFileList,
    modalVisible: state.Email.modalVisible
})
const mapDispatchToProps = dispatch => ({
    hideUploadModal: bindActionCreators(Actions.EmailActions.hideUploadModal, dispatch),
    removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch),
    resetFileListFalse: bindActionCreators(Actions.EmailActions.resetFileListFalse, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadModalComponent);