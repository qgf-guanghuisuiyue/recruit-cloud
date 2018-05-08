import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader, Spin ,Tooltip , Modal} from 'antd';
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;
import moment from 'moment';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class CandidateResumePage extends Component {
     componentDidMount(){
         //this.props.getUserInfo();
         const {resumeId, sorKey} = this.props.location.query;
         //setTimeout(()=>{
            //const resuId = resumeId;
            const key = "%!##@$%|$#$%(^)$}$*{^*+%";//加密关键字
            const resuId = strDec(`${resumeId}`,key);//简历ID
            //const sorKey =  this.sorKey();
            //获取用户可下载简历数据量
            this.props.getRemainedDownloadNum({sorKey});
            this.props.searchResumeDetail({resumeId:`${resuId}`,sorKey});
         //},400)
     };
    downLoadWeb = (name) => {
        //this.props.checkCandidate();
        //清除个人简历数据
        //this.props.clearResumeDetailData();
        var html=document.getElementsByTagName('html')[0].outerHTML;
        this.export_raw(`${name}个人简历.html`, html);
    };

    fake_click =(obj)=> {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent(
            "click", true, false, window, 0, 0, 0, 0, 0
            , false, false, false, false, 0, null
            );
        obj.dispatchEvent(ev);
    };
     
    export_raw=(name, data) =>{
       var urlObject = window.URL || window.webkitURL || window;
     
       var export_blob = new Blob([data]);
     
       var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
       save_link.href = urlObject.createObjectURL(export_blob);
       save_link.download = name;
       this.fake_click(save_link);
    };
    //加密参数
    sorKey = () => {
        const {companyname} = this.props.userInfo;
        //加密关键字
        const key = "%!##@$%|$#$%(^)$}$*{^*+%";
        //请求参数       
        const partters=`key=51hr&value=${companyname}`;
        //请求参数加密
        const  sorKey = strEnc(`${partters}`,key);
        return sorKey
    };
    //下载简历
    downLoadResume = (resumeId,contract_count) => {
        const {companyname} = this.props.userInfo;
        const {searchResumeDetail} = this.props;
        const _this = this;
        //加密关键字
        const key = "%!##@$%|$#$%(^)$}$*{^*+%";
        //请求参数       
        const partters=`key=51hr&value=${companyname}`;
        //请求参数加密
        const  sorKey = strEnc(`${partters}`,key);
        confirm({
            title:<span style={{textAlign:"center"}}>下载该份简历需要扣除<span style={{color:"red"}}>&nbsp;&nbsp;1&nbsp;&nbsp;</span>
            简历下载数<br/>
            <span>剩余下载数&nbsp;&nbsp;<span style={{color:"red"}}>{contract_count}</span></span>
            </span>,
            onOk() {
                _this.props.downLoadResume({resumeId:`${resumeId}`,sorKey},searchResumeDetail);
                //this.props.downLoadResume({resumeId:"2564847",sorKey})
            },
            onCancel() {
              console.log('Cancel');
            },
          });    
    }; 
    //取消收藏
    deleteCollectResume = (resumeId) => {
        const sorKey = this.sorKey();
        this.props.deleteCollectResume({resumeId:`${resumeId}`,sorKey});
        //this.props.deleteCollectResume({resumeId:"3926440",sorKey})
    };
    //收藏简历
    collectResume = (resumeId) => {
        const {deleteCollectResume,collectResumeList} = this.props;
        const  sorKey = this.sorKey();
        this.props.collectResume({resumeId:`${resumeId}`,sorKey});
        //if(this.props.location.query.type==1){
            //this.props.collectResume({resumeId:"3926440",sorKey})
            //this.props.collectResume({resumeId:`${resumeId}`,sorKey})
        //} 
    };
    render() {
        const {
            resumeDetailData,
            detailLoading,
            isView,
            contract_count,
            location,
            userInfo,
            isCollect,
            noCollect
        } = this.props;
        const { query } = location;
        const {
            name,
            resumeId,
            education,
            workStatus,
            workType,
            educationExpList=[],
            workExpList=[],
            projectExpList=[],
            workedYearsMeanly,
            currentArea,
            contact,
            sex
        } = resumeDetailData;
        return (
            <div 
                className="candidateResume" 
                style={{
                    width: 1000,
                    margin: '30px auto 50px',
                    overflow: 'auto',
                    border:"1px solid #e5e5e5",
                    padding:30,
                    background:"#fff"
                }}
            >
                {
                    detailLoading && <Spin size="large" style={{position: "relative",left: 400,top: 300}}/>
                }
                <div className="basicInfo" style={{width: '100%',overflow: 'hidden'}}>
                    <div className="basicInfo-left" style={{float: 'left',overflow: 'hidden',marginLeft: '20'}}>
                        <h3 style={{lineHeight: '50px'}}>
                            {contact?contact.name:name}{!contact && name?sex=="0"?"女士":"先生":""}{resumeId?`（ID:${resumeId})`:""}
                            &nbsp;&nbsp;&nbsp;&nbsp;<Icon type="user" style={{color:"#00B38A"}}/>
                            <span style={{fontSize:14,fontWeight:"normal",color:"#8F9EB4"}}>{isView?"已下载简历":"未下载简历"}</span>
                        </h3>
                        <p style={{lineHeight: '50px',color:"#595959"}}>{workedYearsMeanly?`${workedYearsMeanly}年工作经验/`:""}{education==1?"小学/":education==10?"初中/":education==20?"高中/":education==21?"中专/":education==22?"技校/":education==23?"中技/":education==100?"大学/":education==101?"大专/":education==102?"专科/":education==110?"本科/":education==200?"研究生/":education==201?"MBA/":education==210?"博士/":""}{currentArea?`${currentArea}/`:""}{workStatus==0?"在职不想换工作":workStatus==1?"离职":workStatus==2?"正在找工作":workStatus==3?"在职,可以看更好机会":workStatus==4?"暂时不想找工作":""}</p>
                        {
                            !isView && <div style={{color:"#595959"}}>
                                        <span>电话：</span>
                                        <span>************</span>&nbsp;&nbsp;
                                        <span>邮箱：</span>
                                        <span>************</span>
                                    </div>
                        }
                        {
                            isView && <div style={{color:"#595959"}}>
                                        <span>电话：</span>
                                        <span>{(contact && contact.mobile)?contact.mobile:"暂无"}</span>&nbsp;&nbsp;
                                        <span>邮箱：</span>
                                        <span>{(contact && contact.email)?contact.email:"暂无"}</span>
                                    </div>
                        }
                    </div>
                    <div className="basicInfo-right" style={{width: 400,float: 'right',marginTop: 20}}>
                        {
                            !isView && 
                            <div style={{float:"left"}}>
                                <Tooltip placement="top" title="下载简历可查看求职者的联系方式">
                                    <Button 
                                        type="primary" 
                                        ghost 
                                        style={{color:"#00B38A",background:"white",outline:"none",border:"1px solid #00B38A"}}
                                        onClick={this.downLoadResume.bind(this,resumeId,contract_count)}
                                    >
                                        <Icon type="download" />下载简历
                                    </Button>
                                </Tooltip>
                                <p style={{lineHeight:"50px",fontSize:14,color:"#8F9EB4"}}>剩余下载量：{contract_count}</p>
                            </div>
                        }
                        {
                            (query.type==2 || query.type==1) && !isCollect && noCollect && 
                            <Button 
                                type="primary" 
                                ghost 
                                style={{color:"#FFCC42",marginRight: 30,background:"white",border:"1px solid #FFCC42",outline:"none"}}
                                onClick={this.deleteCollectResume.bind(this,resumeId)}
                            >
                                <Icon type="export" />取消收藏
                            </Button>
                        }
                        {
                            (query.type==2 || query.type==1) && !noCollect && 
                            <Button 
                                type="primary" 
                                ghost 
                                style={{color:"#FFCC42",marginRight: 30,background:"white",border:"1px solid #FFCC42",outline:"none"}}
                                onClick={this.collectResume.bind(this,resumeId)}
                            >
                                <Icon type="export" />加入收藏
                            </Button>
                        }
                        <Button 
                            type="primary" 
                            ghost
                            style={{color:"#8F9EB4",background:"white",border:"1px solid #8F9EB4",outline:"none"}} 
                            onClick={this.downLoadWeb.bind(this,`${contact?contact.name:name}` + `${(!contact && name)?sex=="0"?"女士":"先生":""}`)}
                        >
                            导出简历
                        </Button>
                    </div>
                </div>
                <div className="jobIntension" style={{width: '100%',marginTop: 20}}>
                    <h4 style={{lineHeight: '50px',color: '#3188FF'}}>●&nbsp;&nbsp;求职意向</h4>
                    <ul className="intensionInfo" style={{margin:0,padding:0, marginLeft: 20}}>
                        <li style={{height: 35,width:400,listStyle:"none"}}>
                            <span style={{lineHeight: '35px',color:'#8F9EB4'}}>工作性质：</span>
                            <span style={{lineHeight: '35px',color:"#595959"}}>
                                {
                                    workType==0?"全职":
                                    workType==1?"兼职":
                                    workType==2?"实习":
                                    workType==3?"全职或兼职":"暂无"
                                }
                            </span>
                        </li>
                        <li style={{height: 35,listStyle:"none"}}>
                            <span style={{lineHeight: '35px',color:'#8F9EB4'}}>期望岗位：</span>
                            <span style={{lineHeight: '35px',color:"#595959"}}>
                                {resumeDetailData.expectPositions?resumeDetailData.expectPositions:"暂无"}
                            </span>
                        </li>
                        <li style={{height: 35,listStyle:"none"}}>
                            <span style={{lineHeight: '35px',color:'#8F9EB4'}}>期望行业：</span>
                            <span style={{lineHeight: '35px',color:"#595959"}}>
                                {resumeDetailData.expectIndustries?resumeDetailData.expectIndustries:"暂无"}
                            </span>
                        </li>
                        <li style={{height: 35,listStyle:"none"}}>
                            <span style={{lineHeight: '35px',color:'#8F9EB4'}}>期望地区：</span>
                            <span style={{lineHeight: '35px',color:"#595959"}}>
                                {resumeDetailData.expectAreas?resumeDetailData.expectAreas:"暂无"}
                            </span>
                        </li>
                        <li style={{height: 35,listStyle:"none"}}>
                            <span style={{lineHeight: '35px',color:'#8F9EB4'}}>期望月薪：</span>
                            <span style={{lineHeight: '35px',color:"#595959"}}>
                                {resumeDetailData.expectSalary?resumeDetailData.expectSalary:"暂无"}
                            </span>
                        </li>
                        <li style={{height: 35,listStyle:"none"}}>
                            <span style={{lineHeight: '35px',color:'#8F9EB4'}}>目前状况：</span>
                            <span style={{lineHeight: '35px',color:"#595959"}}>
                                {
                                    workStatus==0?"在职不想换工作":
                                    workStatus==1?"离职":
                                    workStatus==2?"正在找工作":
                                    workStatus==3?"在职,可以看更好机会":
                                    workStatus==4?"暂时不想找工作":"暂无"
                                }
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="education" style={{width: '100%', marginTop: 20}}>
                    <h4 style={{lineHeight: '50px',color: '#3188FF'}}>●&nbsp;&nbsp;教育经历</h4>
                    {
                        educationExpList.length===0?<div style={{marginLeft:20}}>暂无</div>:educationExpList.map((item,index)=>{
                            return(
                                <p style={{marginLeft: 20,color:"#595959"}}>
                                    {item.startDate?moment(item.startDate).format("YYYY-MM-DD"):"暂无开始时间"}&nbsp;至&nbsp;{item.endDate?moment(item.endDate).format("YYYY-MM-DD"):"暂无结束时间"} | {item.schoolName? item.schoolName:"暂无学校名称"} | 
                                    {item.majorName? item.majorName:"暂无专业名称"} |   
                                    {education==1?"小学":education==10?"初中":education==20?"高中":education==21?"中专":education==22?"技校":education==23?"中技":education==100?"大学":education==101?"大专":education==102?"专科":education==110?"本科":education==200?"研究生":education==201?"MBA":education==210?"博士":"暂无学历"}
                                </p>
                            )
                        })
                    }
                    
                </div>
                <div className="workExperience" style={{width: '100%',overflow: 'hidden',marginTop: 20}}>
                    <h4 style={{lineHeight: '50px',color: '#3188FF'}}>●&nbsp;&nbsp;工作经验</h4>
                    {
                        workExpList.length===0?<div style={{marginLeft:20}}>暂无</div>:workExpList.map((item,index)=>{
                            return(
                                <div>
                                    <div className="company" style={{width: '100%',overflow: 'hidden'}}>
                                        <h4 className="company-h3" style={{width: 300,marginLeft: 20,float: 'left',color: '#626262',fontWeight:"normal"}}>{item.companyName?item.companyName:"暂无公司名称"}</h4>
                                        <h4 style={{width: 270,float: 'left',color:"#626262",fontWeight:"normal"}}>{item.position?item.position:"暂无职位名称"}</h4>
                                        <h4 style={{width: 270,float: 'left',color:"#626262",fontWeight:"normal"}}>{item.startDate?moment(item.startDate).format("YYYY-MM-DD"):"暂无开始日期"}至{item.endDate?moment(item.endDate).format("YYYY-MM-DD"):"今"}</h4>
                                    </div>
                                    <ul className="workInfo" style={{margin:0,padding:0,marginLeft: 20}}>
                                        <li style={{margin: '10px 0',listStyle:"none"}}>
                                            <span style={{lineHeight: '35px',color:'#8F9EB4'}}>行&nbsp;&nbsp;&nbsp;&nbsp;业：</span>
                                            <span style={{lineHeight: '35px',color:"#595959"}}>{item.industry?item.industry:"暂无"}</span>
                                        </li>
                                        <li style={{margin: '10px 0',listStyle:"none"}}>
                                            <span style={{lineHeight: '35px',color:'#8F9EB4'}}>薪&nbsp;&nbsp;&nbsp;&nbsp;酬：</span>
                                            <span style={{lineHeight: '35px',color:"#595959"}}>{item.salary?item.salary:"暂无"}</span>
                                        </li>
                                        <li style={{margin: '10px 0',listStyle:"none"}}>
                                            <span style={{display:"block",float:"left",color:'#8F9EB4'}}>工作描述：</span>
                                            <span style={{display:"block",width:700,overflow:"hidden",color:"#595959"}}>
                                                {item.summary?item.summary:"暂无"}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className="projectExperience" style={{width: '100%',marginTop: 20}}>
                    <h4 style={{lineHeight: '50px',color: '#3188FF'}}>●&nbsp;&nbsp;项目经验</h4>
                    {
                        projectExpList.length===0?<div style={{marginLeft:20}}>暂无</div>:projectExpList.map((item,index)=>{
                            return(
                                <div style={{width:"100%"}}>
                                    <h4 
                                        className="projectExperience-title" 
                                        style={{
                                            lineHeight: '50px', 
                                            marginLeft: 20,
                                            color: '#626262',
                                            fontWeight:"normal"
                                        }}
                                    >
                                        {item.name?item.name:"暂无项目名称"}
                                    </h4>
                                    <div className="project" style={{width: '90%',marginLeft: 20}}>
                                        <ul className="project-title" style={{margin:0,padding:0,marginBottom: 20}}>
                                            <li style={{width: 80,float: 'left',listStyle:"none",color:'#8F9EB4'}}><span>责任描述：</span></li>
                                            <li style={{width: 640,overflow: 'hidden',listStyle:"none",color:"#595959"}}>{item.duty?item.duty:"暂无"}</li>
                                        </ul>
                                        <ul className="project-title" style={{margin:0,padding:0,marginBottom: 20}}>
                                            <li style={{width: 80,float: 'left',listStyle:"none",color:'#8F9EB4'}}><span>项目描述：</span></li>
                                            <li style={{width: 640,overflow: 'hidden',color:"#595959"}}>{item.description?item.description:"暂无"}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="evaluation" style={{width: '100%',marginTop: 20}}>
                    <h4 style={{lineHeight: '50px',color: '#3188FF'}}>●&nbsp;&nbsp;自我评价</h4>
                    <p style={{marginLeft:20,color:"#595959"}}>{resumeDetailData.personal?resumeDetailData.personal:"暂无"}</p>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    //userInfo: state.User.userInfo,
    resumeDetailData: state.ResumeSearch.resumeDetailData,
    detailLoading: state.ResumeSearch.detailLoading,
    isView: state.ResumeSearch.isView,
    contract_count: state.ResumeSearch.contract_count,
    isCollect: state.ResumeSearch.isCollect,
    noCollect: state.ResumeSearch.noCollect
});
const mapDispatchToProps = (dispatch) => ({
    downLoadResume: bindActionCreators(Actions.SearchActions.downLoadResume, dispatch),
    //getUserInfo: bindActionCreators(Actions.UserActions.getUserInfo, dispatch),
    searchResumeDetail: bindActionCreators(Actions.SearchActions.searchResumeDetail, dispatch),
    getRemainedDownloadNum: bindActionCreators(Actions.SearchActions.getRemainedDownloadNum, dispatch),
    deleteCollectResume: bindActionCreators(Actions.SearchActions.deleteCollectResume, dispatch),
    collectResume: bindActionCreators(Actions.SearchActions.collectResume, dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CandidateResumePage)