import React, {Component} from 'react';
import store from 'store';
import { Modal, Button, Upload, notification, Icon } from 'antd';
const Dragger = Upload.Dragger;


export default class PlusAttachmentModal extends Component { 
    state = {
        fileList: [],
        error: false,
        errorMsg: '',
        fileListOpposite: [],
        tokenKey:'',
        token:''
    }
    componentDidMount(){
        const {token,tokenKey} = store.get('token') || {};
        this.setState({tokenKey, token})
    }
    // shouldComponentUpdate(nextProps,nextState) {
    //     return nextProps !== this.props || nextState!==nextState;
    // }

    triggerError = (error,errorMsg='文件类型不支持！') => {
        this.setState({error,errorMsg});
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
        const matchName = /(\.html|\.xls|\.xlsx|\.xlsm|\.mht|\.htm|\.doc|\.docx|\.jpg|\.png|\.pdf)$/i,
            {error,fileList} = this.state,
            {name,size} = file;
            // 匹配文件类型
            if(!matchName.test(name)){
                notification.warning({
                    message: '文件类型暂不支持！'
                  });
                return false;
            }
            // 判断文件大小最大支持2M的文件
            if(size > 2*1024*1024){
                notification.warning({
                    message: '文件大小不能超过2MB！'
                  });
                return false;
            }
        
        return true;
    }

    // 上传文件改变时的状态
    onFileChange = info =>{
        let fileList = info.fileList;
        if (info.file.status === 'error') {
            notification.error({
                message: '文件上传失败！'
              });
        }
        this.setState({fileList});
    }

    // 文件移除
    onFileRemove = file => {
        const {response} = file;
        this.props.removeUploadFIle(response.filePath);
        if(this.state.error){
            this.triggerError(false);
        }
        return true;
    }

    // 身份证反面上传文件改变时的状态
    onFileChangeOpposite = info =>{
        let fileListOpposite = info.fileList;
        if (info.file.status === 'error') {
            notification.error({
                message: '文件上传失败！'
              });
        }
        this.setState({fileListOpposite});
    }

    // 身份证反面文件移除
    onFileRemoveOpposite = file => {
        // 文件移除
        const {response} = file;
        this.props.removeUploadFIle(response.filePath);
        if(this.state.error){
            this.triggerError(false);
        }
        return true;
    }
    
    //上传材料附件
    UploadMaterial = () => {
        let {fileList,fileListOpposite,source} = this.state,
            { itemData , rid='' , UploadMaterial ,queryEmployee} = this.props,
            { type} = itemData;
        if(fileList.length === 0){
            notification.warning({
                message: '请选择上传文件！'
              });
            return ;
        }
        // 判断文件是否上传成功,上传失败fileList中的response为undefined
        const {name,response} = fileList[0];
        if(!response){
            return ;
        }
        const {filePath} = response,
            fileNameJson = `{${name}:${filePath}}`;
            UploadMaterial({type:type+'',fileNameJson,rid},queryEmployee);
        //身份证反面上传
        if(fileListOpposite.length != 0){
            const {name,response} = fileListOpposite[0];
            if(!response){
                return ;
            }
            const {filePath} = response,
                fileNameJson = `{${name}:${filePath}}`;
                UploadMaterial({type:type+'',fileNameJson,rid},queryEmployee);
        }
        this.hideAttachmentModal()
    }
    //隐藏Modal
    hideAttachmentModal = () => {
        this.props.hideAttachmentModal();
        this.setState({
            fileList:[],
            fileListOpposite:[]
        })
    }
    

    render() {
        const fileArr = [] , fileOppositeArr = [];
        const {
            attactmentModal,
            hideAttachmentModal,
            itemData
        } = this.props,
        {visible} = attactmentModal,
        {
            name,
            max,
            count,
            isImportant,
            isCustom
        } = itemData,
        {
            fileList,
            error,
            errorMsg,
            fileListOpposite,
            tokenKey,
            token
        } = this.state;
        const matchName = /(\.jpg|\.png)$/i;
        // 匹配文件类型
        if(fileList.length!=0 && fileList && fileList[0].response && fileList[0].response.filePath){
            if(!matchName.test(fileList[0].response.filePath)){
                fileArr.push("file")
            }
        }
        if(fileListOpposite.length!=0 && fileListOpposite && fileListOpposite[0].response && fileListOpposite[0].response.filePath){
            if(!matchName.test(fileListOpposite[0].response.filePath)){
                fileOppositeArr.push("file")
            }
        }
      return (
        <Modal
            title={`添加${name}`}
            wrapClassName="grey-close-header vertical-center-modal attachment-wrap"
            visible={visible}
            onCancel={this.hideAttachmentModal}
            onOk= {this.UploadMaterial}
        >
                {name=='身份证原件' ? 
                    <div>
                        <div className="add-attactment">
                            <Dragger
                                name='uploadify'
                                action={`${prefixUri}/uploadAttachment`}
                                fileList={fileList}
                                picType="idcard"
                                beforeUpload={this.onFilebeforeUpload}
                                onChange={this.onFileChange}
                                onRemove={this.onFileRemove}
                            >
                            {
                                fileList.length==0?
                                    <div>
                                        <Icon type="plus-circle-o"
                                            style={{ 
                                                fontSize: 45, 
                                                color: '#d2d2d2',
                                            }}
                                        />
                                        <p>{name}正面</p>
                                    </div>
                                :
                                    fileArr.length==0?<img alt="example" style={{ width: '188px',height:'148px' }} src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${fileList && fileList[0].response && fileList[0].response.filePath}`}/>
                                    :
                                    <img alt="example" style={{ width: '188px',height:'148px' }} src="/static/images/manager/clerk/fjcl.png"/>
                            }
                                     
                            </Dragger>
                            {error &&
                                <span className="error-text">
                                    {errorMsg}
                                </span>}
                        </div>
                           
                        <div className="add-attactment">
                            <Dragger
                                name='uploadify'
                                action={`${prefixUri}/uploadAttachment`}
                                picType="edu"
                                fileList={fileListOpposite}
                                beforeUpload={this.onFilebeforeUpload}
                                onChange={this.onFileChangeOpposite}
                                onRemove={this.onFileRemoveOpposite}
                            >
                            {
                                fileListOpposite.length==0?
                                    <div>
                                        <Icon type="plus-circle-o"
                                            style={{ 
                                                fontSize: 45, 
                                                color: '#d2d2d2',
                                            }}
                                        />
                                        <p>{name}反面</p>
                                    </div>
                                : 
                                    fileOppositeArr.length==0?<img alt="example" style={{ width: '188px',height:'148px' }} src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${fileListOpposite && fileListOpposite[0].response && fileListOpposite[0].response.filePath}`}/> 
                                :
                                    <img alt="example" style={{ width: '188px',height:'148px' }} src="/static/images/manager/clerk/fjcl.png"/>

                            }
                            </Dragger>
                        </div>
                    </div>
                    :
                    <div className="add-attactment">
                        <Dragger
                            name='uploadify'
                            action={`${prefixUri}/uploadAttachment`}
                            fileList={fileList}
                            beforeUpload={this.onFilebeforeUpload}
                            onChange={this.onFileChange}
                            onRemove={this.onFileRemove}
                        >
                        {
                            fileList.length==0?
                                <div>
                                    <Icon type="plus-circle-o"
                                        style={{ 
                                            fontSize: 45, 
                                            color: '#d2d2d2',
                                        }}
                                    />
                                    <p>{name}</p>
                                </div>
                            :
                                fileArr.length==0?<img alt="example" style={{ width: '188px',height:'148px' }} src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${fileList && fileList[0].response && fileList[0].response.filePath}`}/>
                                :
                                <img alt="example" style={{ width: '188px',height:'148px' }} src="/static/images/manager/clerk/fjcl.png"/>
                        }
                        </Dragger>
                    </div>
                }
                <p>文件或者图片大小限制在2M以内</p>
        </Modal>
      )
    }
}