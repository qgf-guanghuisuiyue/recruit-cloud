import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader, Spin ,Tooltip , Modal} from 'antd';
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;
import moment from 'moment';

export default class CandidateResumePage extends Component {
    goBack = () => {
        this.props.checkCandidate();
        //清除个人简历数据
        this.props.clearResumeDetailData();
    }
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
    }
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
                _this.props.downLoadResume({resumeId:`${resumeId}`,sorKey},searchResumeDetail)
            //this.props.downLoadResume({resumeId:"2564847",sorKey})
            },
            onCancel() {
              console.log('Cancel');
            },
          });    
    } 
    //取消收藏
    deleteCollectResume = (resumeId) => {
        const sorKey = this.sorKey();
        this.props.deleteCollectResume({resumeId:`${resumeId}`,sorKey});
        //this.props.deleteCollectResume({resumeId:"3926440",sorKey})
    }
    //收藏简历
    collectResume = (resumeId) => {
        const {deleteCollectResume,collectResumeList} = this.props;
        const  sorKey = this.sorKey();
        if(this.props.location.pathname=="/searchResume"){
            //this.props.collectResume({resumeId:"3926440",sorKey})
            this.props.collectResume({resumeId:`${resumeId}`,sorKey})
        } 
    }
    render() {

        const {
            resumeDetailData,
            detailLoading,
            isView,
            contract_count,
            location
        } = this.props;
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
            <div className="candidateResume">
                {
                    detailLoading && <Spin size="large" style={{position: "relative",left: 400,top: 300}}/>
                }
                <div className="basicInfo">
                    <div className="basicInfo-left">
                        <h3>
                            {contact?contact.name:name}{!contact && name?sex=="0"?"女士":"先生":""}{resumeId?`（ID:${resumeId})`:""}
                            &nbsp;&nbsp;&nbsp;&nbsp;<Icon type="user" style={{color:"#00B38A"}}/>
                            <span style={{fontSize:14,fontWeight:"normal",color:"#8F9EB4"}}>{isView?"已下载简历":"未下载简历"}</span>
                        </h3>
                        <p>{workedYearsMeanly?`${workedYearsMeanly}年工作经验/`:""}{education==1?"小学/":education==10?"初中/":education==20?"高中/":education==21?"中专/":education==22?"技校/":education==23?"中技/":education==100?"大学/":education==101?"大专/":education==102?"专科/":education==110?"本科/":education==200?"研究生/":education==201?"MBA/":education==210?"博士/":""}{currentArea?`${currentArea}/`:""}{workStatus==0?"在职不想换工作":workStatus==1?"离职":workStatus==2?"正在找工作":workStatus==3?"在职,可以看更好机会":workStatus==4?"暂时不想找工作":""}</p>
                        {
                            !isView && <div>
                                        <span>电话：</span>
                                        <span>************</span>&nbsp;&nbsp;
                                        <span>邮箱：</span>
                                        <span>************</span>
                                    </div>
                        }
                        {
                            isView && <div>
                                        <span>电话：</span>
                                        <span>{(contact && contact.mobile)?contact.mobile:"暂无"}</span>&nbsp;&nbsp;
                                        <span>邮箱：</span>
                                        <span>{(contact && contact.email)?contact.email:"暂无"}</span>
                                    </div>
                        }
                        
                    </div>
                    <div className="basicInfo-right">
                        {
                            !isView && 
                            <div style={{float:"left"}}>
                                <Tooltip placement="top" title="下载简历可查看求职者的联系方式">
                                    <Button 
                                        type="primary" 
                                        ghost 
                                        style={{color:"#00B38A",borderColor:"#00B38A"}}
                                        onClick={this.downLoadResume.bind(this,resumeId,contract_count)}
                                    >
                                        <Icon type="download" />下载简历
                                    </Button>
                                </Tooltip>
                                <p style={{lineHeight:"50px",fontSize:14,color:"#8F9EB4"}}>剩余下载量：{contract_count}</p>
                            </div>
                        }
                        {
                            location.pathname=="/searchResume/collectResume" && 
                            <Button 
                                type="primary" 
                                ghost 
                                style={{color:"#FFCC42",borderColor:"#FFCC42"}}
                                onClick={this.deleteCollectResume.bind(this,resumeId)}
                            >
                                <Icon type="export" />取消收藏
                            </Button>
                        }
                        {
                            location.pathname=="/searchResume" && 
                            <Button 
                                type="primary" 
                                ghost 
                                style={{color:"#FFCC42",borderColor:"#FFCC42"}}
                                onClick={this.collectResume.bind(this,resumeId)}
                            >
                                <Icon type="export" />加入收藏
                            </Button>
                        }
                        <Button 
                            type="primary" 
                            ghost
                            style={{color:"#8F9EB4",borderColor:"#8F9EB4"}} 
                            onClick={this.goBack}
                        >
                            <Icon type="left" />&nbsp;&nbsp;返&nbsp;&nbsp;回
                        </Button>
                    </div>
                </div>
                <div className="jobIntension">
                    <h3>●&nbsp;&nbsp;求职意向</h3>
                    <ul className="intensionInfo">
                        <li><span>工作性质：</span>
                            <span>
                                {
                                    workType==0?"全职":
                                    workType==1?"兼职":
                                    workType==2?"实习":
                                    workType==3?"全职或兼职":"暂无"
                                }
                            </span>
                        </li>
                        <li>
                            <span>期望岗位：</span>
                            <span>{resumeDetailData.expectPositions?resumeDetailData.expectPositions:"暂无"}</span>
                        </li>
                        <li>
                            <span>期望行业：</span>
                            <span>{resumeDetailData.expectIndustries?resumeDetailData.expectIndustries:"暂无"}</span>
                        </li>
                        <li>
                            <span>期望地区：</span>
                            <span>{resumeDetailData.expectAreas?resumeDetailData.expectAreas:"暂无"}</span>
                        </li>
                        <li>
                            <span>期望月薪：</span>
                            <span>{resumeDetailData.expectSalary?resumeDetailData.expectSalary:"暂无"}</span>
                        </li>
                        <li>
                            <span>目前状况：</span>
                            <span>
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
                <div className="education">
                    <h3>●&nbsp;&nbsp;教育经历</h3>
                    {
                        educationExpList.length===0?<div style={{marginLeft:20}}>暂无</div>:educationExpList.map((item,index)=>{
                            return(
                                <p>
                                    {moment(item.startDate).format("YYYY-MM-DD")}至{moment(item.endDate).format("YYYY-MM-DD")} | {item.schoolName? item.schoolName:"暂无学校名称"} | 
                                    {item.majorName? item.majorName:"暂无专业名称"} |   
                                    {education==1?"小学":education==10?"初中":education==20?"高中":education==21?"中专":education==22?"技校":education==23?"中技":education==100?"大学":education==101?"大专":education==102?"专科":education==110?"本科":education==200?"研究生":education==201?"MBA":education==210?"博士":"暂无学历"}
                                </p>
                            )
                        })
                    }
                    
                </div>
                <div className="workExperience">
                    <h3>●&nbsp;&nbsp;工作经验</h3>
                    {
                        workExpList.length===0?<div style={{marginLeft:20}}>暂无</div>:workExpList.map((item,index)=>{
                            return(
                                <div>
                                    <div className="company">
                                        <h3 className="company-h3">{item.companyName?item.companyName:"暂无公司名称"}</h3>
                                        <p>{item.position?item.position:"暂无职位名称"}</p>
                                        <p>{item.startDate?moment(item.startDate).format("YYYY-MM-DD"):"暂无开始日期"}至{item.endDate?moment(item.endDate).format("YYYY-MM-DD"):"今"}</p>
                                    </div>
                                    <ul className="workInfo">
                                        <li>
                                            <span>行&nbsp;&nbsp;&nbsp;&nbsp;业：</span>
                                            <span>{item.industry?item.industry:"暂无"}</span>
                                        </li>
                                        <li>
                                            <span>薪&nbsp;&nbsp;&nbsp;&nbsp;酬：</span>
                                            <span>{item.salary?item.salary:"暂无"}</span>
                                        </li>
                                        <li>
                                            <span style={{display:"block",float:"left"}}>工作描述：</span>
                                            <span style={{display:"block",width:700,overflow:"hidden"}}>
                                                {item.summary?item.summary:"暂无"}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className="projectExperience">
                    <h3>●&nbsp;&nbsp;项目经验</h3>
                    {
                        projectExpList.length===0?<div style={{marginLeft:20}}>暂无</div>:projectExpList.map((item,index)=>{
                            return(
                                <div>
                                    <h3 className="projectExperience-title">
                                        {item.name?item.name:"暂无项目名称"}
                                    </h3>
                                    <div className="project">
                                        <ul className="project-title">
                                            <li><span>责任描述：</span></li>
                                            <li>{item.duty?item.duty:"暂无"}</li>
                                        </ul>
                                        <ul className="project-title">
                                            <li><span>项目描述：</span></li>
                                            <li>{item.description?item.description:"暂无"}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="evaluation">
                    <h3>●&nbsp;&nbsp;自我评价</h3>
                    <p>{resumeDetailData.personal?resumeDetailData.personal:"暂无"}</p>
                </div>
            </div>
        );
    }
}