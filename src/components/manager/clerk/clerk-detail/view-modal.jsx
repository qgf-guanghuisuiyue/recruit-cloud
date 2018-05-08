import React, {Component} from 'react';
import store from 'store';
import { Modal, Icon ,Button , Carousel} from 'antd';
import LoadingComponent from 'components/loading';
const confirm = Modal.confirm;

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ViewModal extends Component {
    state = {
        tokenKey:'',
        token:'',
        isShow:'none',
        filename:"",
    }
    componentDidMount(){
        const rid = this.props.queryEmployeeList.list.resumeoff.rid+'';
        this.props.queryEmployee({rid:rid});
        const {token,tokenKey} = store.get('token') || {};
        this.setState({tokenKey, token})
    }
    //删除图片
    deleteImage = (value) =>{
        const{imageUrl,hideImageModal,DeleteMaterial} = this.props;
        confirm({
            content: <h2>确定要删除吗?</h2>,
            okText: '删除',
            okType: "danger",
            cancelText: '取消',
            maskClosable:true,
            style:{top:300},
            onOk:()=> {
                DeleteMaterial({id:value.id+''},this.props,value)
            }
        });

    }
    viewImage = (filename) => {
        this.setState({
            isShow:'block',
            filename
        });        
    }
    imageClick = (filename) => {
        this.setState({
            filename
        })
    }
    closeImage = () => {
        this.setState({
            isShow:'none'
        })
    }
    hideImageModal = () =>{
        this.props.hideImageModal();//隐藏预览框
    }


    render(){
        const {
            showImageModal,
            hideImageModal,
            queryEmployeeList,
            attactmentType
        } = this.props;
        const {isLoading, list} = queryEmployeeList;
        const {listAll} = list;
        const{
            parmentType,
            type,
            imageVisible
        }=attactmentType;
        const {
            tokenKey,
            token,
            isShow,
            filename,
        } = this.state;
        const imageUrl = [];
        if(Array.isArray(listAll)){
            for(let i=0;i<listAll.length;i++){
                if(listAll[i].type==parmentType){
                    for(let j=0;j<listAll[i].list.length;j++){
                        if(listAll[i].list[j].type==type){
                            for(let k=0;k<listAll[i].list[j].attachment_type.length;k++){
                                imageUrl.push(listAll[i].list[j].attachment_type[k])
                            }
                        }
                    }
                }
            }
        }
        return(
            <Modal
                visible={imageVisible}
                footer={null}
                closable={false}
                onCancel={this.hideImageModal}
                wrapClassName='viewMaterialModal'
            >
            {isLoading &&
                <LoadingComponent style={{
                    position: 'absolute',
                    top: 200,
                    left:'46%',
                    height: '10%',
                    width: '10%',
                    zIndex: 2
                }} />
            }
            <div style={{width:500,height:500,margin:'0 auto', overflow:'auto'}}>
                {imageUrl.length==0?<h1 style={{color:'#cccccc',textAlign:'center',width:'100%',marginTop:100}}>暂无附件预览</h1>:
                    imageUrl.map((item,index)=>{
                        return (item.filenameExt!='jpg' && item.filenameExt!='png')?
                                <div className="filemanage">
                                    <div style={{position:"relative",width:125,height:125,border:"1px dashed #AFAFAF"}}>
                                        {/* <img
                                            alt="材料附件"
                                            style={{ 
                                                width: '100%',
                                                height:'100%',
                                                display:'block',
                                                margin:"0 auto"
                                            }}
                                            src="/static/images/manager/clerk/fjcl.png" 
                                        /> */}
                                        <Icon type={item.filenameExt==="pdf"?"file-pdf":item.filenameExt==="xlsx" || item.filenameExt==="xls"?"file-excel":item.filenameExt==="doc" || item.filenameExt==="docx"?"file-text":"file"}
                                            style={{
                                                fontSize:'70px',
                                                color:"#2FAEE8",
                                                position:"relative",
                                                top:20
                                            }}>
                                            <span 
                                                style={{
                                                    fontSize:'12px',
                                                    display:"block",
                                                    lineHeight:'25px'
                                                    }}>
                                                {item.filenameExt}文件
                                            </span>
                                        </Icon>
                                        <div  className="mask" > 
                                            <a
                                                href={`${prefixUri}/download_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${item.filename}`}
                                            >
                                                <Icon 
                                                    type="download" 
                                                    title={`点击下载${name}附件`}
                                                >
                                                <a
                                                    href={`${prefixUri}/download_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${item.filename}`}
                                                    style={{fontSize:12,display:"block",color:"#fff"}}
                                                >
                                                    下载
                                                </a>
                                                </Icon>
                                            </a>
                                            &nbsp;&nbsp;
                                            <Icon 
                                                type="delete"
                                                onClick={this.deleteImage.bind(this,item)}
                                                title={`点击删除${name}附件`}
                                            >
                                                <span>删除</span>
                                            </Icon>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div
                                    className="viewMaterial"
                                    style={{margin:20}}
                                >
                                    <div style={{position:"relative",width:125,height:125 ,border:"1px dashed #AFAFAF"}}>
                                        <img
                                            alt="材料附件"
                                            //id="img"
                                            style={{ 
                                                width: '100%',
                                                height:'100%',
                                                display:'block',
                                                margin:"0 auto"
                                            }}
                                            src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${item.filename}`} 
                                        />
                                        <div  className="mask" >
                                            <Icon 
                                                type="eye-o" 
                                                onClick={this.viewImage.bind(this,item.filename)}
                                                title={`点击预览${name}附件`}
                                            >
                                                <span>预览</span>
                                            </Icon>&nbsp;&nbsp;
                                            <Icon 
                                                type="delete"
                                                onClick={this.deleteImage.bind(this,item)}
                                                title={`点击上传${name}附件`}
                                            >
                                                <span>删除</span>
                                            </Icon>
                                        </div>
                                    </div>
                                    <div className="viewMask" style={{display:isShow}}>
                                        <Icon 
                                            type="close" 
                                            title="点击关闭预览"
                                            onClick={this.closeImage}
                                        />
                                        <img 
                                            className="img"
                                            alt="材料附件"
                                            src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${filename}`} 
                                        />
                                        <div style={{width:"60%",overflowX:imageUrl.length>8?"scroll":"",marginLeft:380,marginTop:60,height:140}}>
                                            <p className="title">附件列表</p>
                                            <ul  className="viewScal">
                                                
                                                {imageUrl.map((item,index)=>{
                                                    return (item.filenameExt==='jpg' || item.filenameExt==='png') && 
                                                            <img
                                                                alt="材料附件"
                                                                onClick= {this.imageClick.bind(this,item.filename)}
                                                                src={`${prefixUri}/view_uploadAttachment?token=${token}&tokenKey=${tokenKey}&fileName=${item.filename}`} 
                                                                style={{width:120,height:"100%",display:"inline-block",margin:"0 12px"}}
                                                            />
                                                        
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                    })
                }
            </div>
        </Modal>
        )
    }
}
const mapStateToProps = state => ({
    queryEmployeeList: state.Manage.queryEmployeeList,
    attactmentType: state.Manage.attactmentType
})

const mapDispatchToProps = dispatch => ({
    DeleteMaterial: bindActionCreators(Actions.ManageActions.DeleteMaterial,dispatch),
    viewUploadAttachment: bindActionCreators(Actions.ManageActions.viewUploadAttachment,dispatch),
    downloadAttachment: bindActionCreators(Actions.ManageActions.downloadAttachment,dispatch),
    showImageModal: bindActionCreators(Actions.ManageActions.showImageModal,dispatch),
    hideImageModal: bindActionCreators(Actions.ManageActions.hideImageModal,dispatch),
    queryEmployee: bindActionCreators(Actions.ManageActions.queryEmployee,dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewModal)
