import React, {Component} from 'react';

import {message,notification} from 'antd';

import {Modal,Select,Input,Button,Upload} from 'antd';
const Option = Select.Option;
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class UploadResumeModalComponents extends Component {
    state = {
        fileList: [],
        source: 'basic2',
        error: false,
        errorMsg: '',
        isResetForm: false
    }
    tips = [
        '支持单个html,xls等格式的简历。',
        '多文件请压缩成zip包上传。',
        '猎聘HR简历需包含图片信息，并且只支持压缩上传。',
        '猎聘HR简历需包含图片信息，并且只支持压缩上传。',
        '上传文件最大支持100M,建议分成小包多次上传。',
        '导入简历过程中请不要刷新页面。'
    ]

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.data.resetForm){
            this.setState({
                source: '通用',
                fileList: []
            });
            this.props.setResetFormFalse();
        }
    }

    handleChange = source => {
        this.setState({source});
    }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.html|\.xls|\.xlsx|\.xlsm|\.zip|\.mht|\.htm|\.docx|\.doc)$/i,
            {error,fileList} = this.state,
            {name,size} = file;
        // 判断是否已经上传过文件(单次只能上传一个文件)
        if(fileList.length === 1){
            this.triggerError(true,'单次只能上传一个文件！');
            return false;
        }
        // 匹配文件类型
        if(!matchName.test(name)){
            this.triggerError(true);
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

    uploadResume = () => {
        let {fileList,source} = this.state,
            {position,uploadResume,getRecruitList} = this.props,
            // 获取positionid
            {positionid} = position;
        // 判断是否选择了推荐职位
        if(!positionid) {
            message.info('推荐职位不能为空！');
            return ;
        }
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
            fileNameJson = `{${name}:${filePath}}`;
        source = source.indexOf('basic') !== -1 ? 'basic' : source;
        uploadResume({source,fileNameJson,positionid},this.props);
    }

    render() {
        const {fileList,source,error,errorMsg} = this.state,
            {NODE_ENV} = process.env,
            {data,showRecommendModal,position,hideModal} = this.props,
            {visible,isLoading} = data,
            {positionname=''} = position;
        return (
            <Modal
                title="简历上传"
                wrapClassName="vertical-center-modal upload-resume-modal"
                visible={visible}
                onCancel={isLoading ? () => {} : hideModal}
                footer={null}
            >
                <ul>
                    <li>
                        <span>简历来源</span>
                        <Select 
                            value={source}
                            onChange={this.handleChange}
                            style={{
                                width: 366
                            }}
                        >
                            {/* <Option value="zhilian">智联招聘</Option>
                            <Option value="basic1">51job</Option> */}
                            <Option value="basic2">通用</Option>
                        </Select>
                    </li>
                    <li>
                        <span>
                            推荐职位
                        </span>
                        <Input
                            value={positionname}
                            placeholder="请选择推荐职位"
                            disabled
                        />
                        <Button type="primary" onClick={()=>showRecommendModal()}>
                            选择
                        </Button>
                    </li>
                    <li>
                        <span>
                            选择文件
                        </span>
                        {/*<Input 
                            defaultValue="高级理财师"
                            disabled
                        />*/}
                        <Upload 
                            name='uploadify'
                            action={`${prefixUri}/upload`}
                            fileList={fileList}
                            beforeUpload={this.onFilebeforeUpload}
                            onChange={this.onFileChange}
                            onRemove={this.onFileRemove}
                        >
                            <Button type="primary">
                                选择
                            </Button>
                            {error &&
                                <span className="error-text" style={{
                                    verticalAlign: 'bottom',
                                    marginLeft: 5
                                }}>
                                    {errorMsg}
                                </span>
                            }
                            
                        </Upload>
                    </li>
                </ul>
                <Button 
                    className="upload-button" 
                    type="primary" 
                    onClick={this.uploadResume}
                    loading={isLoading}
                    style={{
                        paddingLeft: 15
                    }}
                >
                    上传
                </Button>
                <div className="tips-wrapper table">
                    <div className="table-cell">
                        提示 : 
                    </div>
                    <div className="table-cell">
                        <div className="table">
                            {
                                this.tips.map((item,index)=>{
                                    return (
                                        <div key={index} className="table-row">
                                            {index+1}.{item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Recruit.uploadModal,
    position: state.Recruit.position
})
const mapDispatchToProps = dispatch => ({
    showRecommendModal: bindActionCreators(Actions.RecruitActions.showRecommendModal, dispatch),
    uploadResume:  bindActionCreators(Actions.RecruitActions.uploadResume, dispatch),
    hideModal: bindActionCreators(Actions.RecruitActions.hideUploadModal, dispatch),
    setResetFormFalse: bindActionCreators(Actions.RecruitActions.setResetFormFalse, dispatch),
    removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch),
    getRecruitList: bindActionCreators(Actions.RecruitActions.getRecruitList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadResumeModalComponents);