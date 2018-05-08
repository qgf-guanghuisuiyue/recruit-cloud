import React, {Component} from 'react';
import { Modal, Upload, Button, notification } from 'antd';
const Dragger = Upload.Dragger;


export default class UploadClerkModal extends Component {

    state = {
        fileList: [],
        error: false,
        errorMsg: '',
    }

    componentWillUpdate(nextProps,nextState) {
        const {resetForm}=nextProps.uploadClerkModal;
        if(resetForm){
            this.setState({
                fileList: []
            });
            this.props.setResetFormFalse();
        }
    }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        console.log('进入');
        const matchName = /(\.xls|\.xlsx|\.xlsm)$/i,
            {error,fileList} = this.state,
            {name,size} = file;
        // // 判断是否已经上传过文件(单次只能上传一个文件)
        // if(fileList.length === 1){
        //     this.triggerError(true,'单次只能上传一个文件！');
        //     return false;
        // }
        // 匹配文件类型
        if(!matchName.test(name)){
            this.triggerError(true,'文件类型不匹配');
            return false;
        }
        // 判断文件大小最大支持100M的文件
        if(size > 100*1024*1024){
            this.triggerError(true,'文件大小不能超过100MB！');
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
            this.triggerError(true,'文件上传失败！');
        }
        this.setState({fileList});
    }

    // 文件移除
    onFileRemove = file => {
        // 文件移除
        const {response} = file;
        this.props.removeUploadFIle(response.filePath);
        if(this.state.error){
            this.triggerError(false);
        }
        return true;
    }

    //开始导入职员信息
    uploadClerkExcel = () => {
        let {fileList} = this.state,
            {uploadClerkExcel} = this.props;

        // 判断是否上传了文件
        if(fileList.length === 0){
            this.triggerError(true,'请选择上传文件！');
            return ;
        }
        // 判断文件是否上传成功,上传失败fileList中的response为undefined
        const {name,response} = fileList[0];
        if(!response){
            return ;
        }
        const {filePath} = response,
            fileNameJson = `{${name}:${filePath}}`; //上传文件名为键，保存名为值的json对象
        uploadClerkExcel({fileNameJson},this.props);
    }

    //下载模板
    handleDownloadTemp = () => {
        this.props.downloadTememployees();
    }

    render(){
        const {
            uploadClerkModal,
            hideUploadClerkModal
        } = this.props,

        { 
            visible,
            isLoading
        } = uploadClerkModal,
        {
            fileList,
            error,
            errorMsg
        } = this.state;

        return(
            <Modal
                title="导入excel人员"
                wrapClassName="grey-close-header vertical-center-modal dragger-wrap"
                visible={visible}
                onCancel={isLoading ? () => {} : hideUploadClerkModal}
                footer={null}
            >
                <Dragger
                    name='uploadify'
                    action={`${prefixUri}/upload`}
                    fileList={fileList}
                    beforeUpload={this.onFilebeforeUpload}
                    onChange={this.onFileChange}
                    onRemove={this.onFileRemove}
                >
                        把文件拖拽至此，或点击此处<span>上传文件</span>
                </Dragger>
                {error &&
                    notification.error({
                        message: '错误',
                        description: errorMsg
                    })
                }
                <div
                    className="upload-footer"
                >
                    
                    <Button 
                        className="ant-btn-lg"
                        onClick={hideUploadClerkModal}
                    >
                        取消
                    </Button>
                    <Button 
                        className="ant-btn-lg" 
                        type="primary"
                        onClick={this.uploadClerkExcel}
                        loading={isLoading}
                    >
                        导入
                    </Button>
                    <p>请使用人员模板填写后方可上传，点此<a href="javascript:void(0)" onClick={this.handleDownloadTemp}>下载模板</a></p>
                </div>
            </Modal>
        )
    }
}

