import React, {Component} from 'react';

import {Modal,Tabs,Input,Button,message} from 'antd';
const TabPane = Tabs.TabPane;

import copy from 'copy-to-clipboard';

import QRCode from 'qrcode.react';
import Clipboard from "clipboard";
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ShareEvaluationModalComponents extends Component {

    //复制链接
    copyUrl = () => {
        const linkUrl = this.refs.CopyLink.refs.input.value;
        if(linkUrl){
            copy(linkUrl);
            message.success('复制链接成功，如果失败，请在输入框内手动复制！',3);
        }else{
            notification.warning({
                message: '暂无链接复制！'
              });
        } 
    };
    
    render(){
        const {resumeid,jobid,username,shareLinkModalVisible,companyInfo} = this.props;
        const {companyname,loginname} = companyInfo;
            //加密关键字
            const key = "%!##@$%|$#$%(^)$}$*{^*+%";
            //时间
            const shareTime = new Date().getTime();
            //const shareTime = new Date("2017/12/01").getTime();
            //参数加密
            const resuid = strEnc(`${resumeid}`,key);
            const jid = strEnc(`${jobid}`,key);
            const intname = strEnc(`${username}`,key);
            const company = strEnc(`${companyname}`,key);
            const login = strEnc(`${loginname}`,key);
            const sharTime = strEnc(`${shareTime}`,key);
            //生成链接
            const qrcodeLink = `${window.location.origin}/#/evaluation?a=${resuid}&b=${jid}&c=${intname}&d=${company}&e=${login}&f=${sharTime}`;
        return(
            <Modal
                width = {600}
                visible = {shareLinkModalVisible}
                className = "shareModal"
                footer = {null}
                onCancel={ this.props.hideQrcodeLinkModal.bind(this)}
                style={{top:300}}
                >
                <p className="title">{`分享面试评估表--${username}`}</p>
                <Tabs defaultActiveKey="1" size="small">
                    <TabPane tab="链接分享" key="1">
                        <div className="inputGroup">
                            <Input  
                                ref='CopyLink'
                                value={qrcodeLink}
                                addonAfter={
                                    <Button 
                                        value='复制链接'
                                        className="copy-link btn"
                                        type="primary" 
                                        onClick = {this.copyUrl} 
                                    >
                                        复制链接
                                    </Button>
                                }
                            />
                        </div>
                        <p className="content" style={{color:"#79869C"}}>
                             温馨提示： 该公开链接可被任何收到该分享的人打开查看填写，请您谨慎转发！
                        </p>
                    </TabPane>
                    <TabPane tab="二维码分享" key="2">
                        <div className="qrcode-body">
                            <div className="qrcode pull-left"
                                style = {{
                                    width: 165,
                                    height: 165,
                                    marginRight:15
                                }}>
                                <img src="/static/images/favicon.ico" 
                                style={{position: 'relative',left: '80px',top: '-45px'}}/>
                                <QRCode value={qrcodeLink}/>
                            </div>
                            <div className="qrcode-info pull-left">
                                <p className="title">
                                    微信扫码 · 实时填写面试评估表
                                </p>
                                <div className="hint">
                                    <p className="content" style={{marginBottom:10}}>
                                    &nbsp;<i className="phone"></i>
                                        打开手机微信
                                    </p>
                                    <p className="content">
                                        <i className="sweep"></i>
                                        点击右上方扫一扫
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="qrcode-foot">
                            <p className="content" style={{color:"#79869C"}}>
                                温馨提示：根据候选人信息自动生成的二维码，扫描后可填写候选人面试评估表。
                            </p>
                        </div>
                     </TabPane>
                </Tabs>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    shareLinkModalVisible: state.Resume.shareLinkModalVisible,
    companyInfo: state.Resume.companyInfo
})
const mapDispatchToProps = dispatch => ({
    hideQrcodeLinkModal: bindActionCreators(Actions.ResumeActions.hideQrcodeLinkModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareEvaluationModalComponents);