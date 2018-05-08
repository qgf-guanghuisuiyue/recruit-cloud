import React , { Component } from "react";
import {Tooltip , message ,Button ,Input , Modal , notification ,Icon} from 'antd';
import copy from 'copy-to-clipboard';
const confirm = Modal.confirm;

export default class VideoComponent extends Component {
    state = {
        videoUrl:"",
        id:"",
        msg:'修改企业视频'
    }
    componentDidMount() {
        this.props.editVideo({type:'0'})
    }
    componentWillReceiveProps(nextprops) {
        const {video} = nextprops;
        if(video){
            this.setState({
                videoUrl:video.videourl,
                id:video.id
            })
        }  
    }
    onChange = e => {
        this.setState({
            videoUrl:e.target.value
        })
    }
    //复制链接
    copyUrl = () => {
        const {videoUrl} = this.state;
        if(videoUrl){
            copy(videoUrl);
            message.success('复制成功，如果失败，请在输入框内手动复制!');
        }else{
            notification.warning({
                message: '暂无视频链接复制！'
              });
        }
        
    };
    //添加视频
    addUrl = () => {
        const {videoUrl} = this.state;
        const {editVideo} = this.props;
        if(!videoUrl){
            this.refs.videoUrl.refs.input.focus()
        }else{
            this.props.editVideo({type:'1',videourl:videoUrl})
        }
        
    }
    //修改视频
    editUrl = () => {
        const {id="" ,videoUrl,msg} = this.state;
        const {editVideo} = this.props;
        if(!videoUrl){
            this.refs.videoUrl.refs.input.focus()
        }else{
            this.props.editVideo({type:"2",id:id+"",videourl:videoUrl,msg})
        }  
    }
    //删除视频
    deleteUrl = () => {
        const {id="" ,videoUrl,msg} = this.state;
        const {editVideo} = this.props;
        if(!videoUrl){
            notification.warning({
                message: '暂无视频链接可删除！'
              });
        }else {
            confirm({
                content: <h2>确定要删除吗?</h2>,
                okText: '删除',
                okType: "danger",
                cancelText: '取消',
                maskClosable:true,
                style:{top:300},
                onOk:()=> {
                    this.props.editVideo({type:"3",id:id+""})
                }
            }); 
        }     
    }
    
    render () {
        const {videoUrl} = this.state;
        return (
            <div className="Corporate-video" style={{marginTop:16,background:'white'}}>
                <Tooltip
                    overlayClassName="Corporate-video-Tooltip" 
                    placement="topRight" 
                    title={
                        <div>
                            <Input
                                ref="videoUrl"
                                style={{height:30}}
                                value={videoUrl}
                                onChange={this.onChange}
                                addonAfter={
                                
                                    <Button
                                        style={{height:30}} 
                                        value='复制链接'
                                        className="btn"
                                        type="primary"
                                        onClick = {this.copyUrl}
                                    >
                                        复制链接
                                    </Button>}
                            /><br/>
                                <Button type="primary" onClick = {this.addUrl}>添加</Button>
                           &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="primary" onClick = {this.editUrl}>修改</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" onClick = {this.deleteUrl}>删除</Button>
                    </div>}
                >
                    <div 
                        className="title box-border"    
                    >
                        企业视频
                    </div>
                </Tooltip>
                {
                    !videoUrl?
                    <div 
                        style={{width:244,height:143,textAlign:"center",fontSize:23,paddingTop:30}}>
                        <Icon type="play-circle-o" style={{fontSize:32}}/>
                        <p style={{textAlign:"center"}}>
                            暂无视频
                        </p>
                    </div>:
                    <video 
                        src={videoUrl}
                        controls="controls"
                        autoplay="autoplay"
                        loop
                        style={{width:244}}
                    >
                    </video>
                }
                
            </div>
            
        )
    }
}