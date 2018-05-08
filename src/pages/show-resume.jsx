import React, {Component} from 'react';
import MainContentComponent from "components/job/recruit-info/main-content";
import {Icon,Spin} from "antd";

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class ShowResumePage extends Component {
    componentDidMount() {
        const {b} = this.props.location.query;
        this.props.getResumeInfo(b)  
    }
    
    render() {
        const {
            resumeInfo={},
            jobInfo={},
            eduList=[],
            projList=[],
            workList=[],
            lanList=[],
            trainList=[],
            certList=[],
            otherList=[]
            } = this.props.resumeInformation,
            {
                //headimg, // 头像
                username, //姓名
                telephone, //电话
                email, //邮箱
                workyears, //工作年限
                educationbg, //学历
                channel, // 简历来源
                sex,//性别
                borndate,//出生日期
                livecityid,//居住地
                accountcityid, // 户籍
                joblb, // 当前行业
                titlenow, // 当前职位
                marital, // 婚姻状况
                companynow, // 当前公司
                salary, // 年薪
            } = resumeInfo;
        const {
                jobnature, // 工作性质
                postids, // 期望行业
                functions, // 期望职位
                sitecity, // 期望地点
                expectsalarycode, // 期望月薪
                poststime, // 到岗时间
                selfremark//自我评价
            } = jobInfo;
        return (
            <div className="showResume" >
                {!username && <Spin size="large" style={{position:"absolute",top:"50%",left:"50%"}}/>}
                <h3 style={{
                        lineHeight:"50px",
                        background:"#8CB6C0",
                        textAlign:"center",
                        marginBottom:20,
                        color:"#fff"
                    }}
                >{username}  个人简历</h3>
                <div style={{overflow:"hidden",margin:"0px 20px"}}>
                    <div className="inline-block" style={{float:"left",marginRight:30}}>
                        <img 
                            src= "./static/images/head.jpg"
                            alt="默认头像" 
                        />
                    </div>
                    <ul style={{float:"left",width:500}}>
                        <li style={{height:60,lineHeight:"60px",fontSize:18}}><b>{username}</b></li>
                        <ul style={{overflow:"hidden"}}>
                            <li style={{ marginTop: 14,float:"left",marginRight:50}}>
                                <Icon type="mobile" style={{color:"#B1CDEE"}}/>：{telephone} 
                            </li>
                            <li style={{marginTop: 15}}>
                                <Icon type="mail" style={{color:"#B1CDEE"}}/>：{email}
                            </li>
                        </ul>
                        
                        <li style={{marginTop: 15}}>
                            <Icon type="user" style={{color:"#B1CDEE"}}/>：
                            <span>{sex}</span>{sex && <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                            <span>{borndate}</span>{borndate && <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                            <span>{livecityid}</span>{livecityid && <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                            <span>{workyears}</span>
                        </li>
                    </ul>
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        个人基本信息
                    </h3> 
                    <div style={{overflow:"hidden"}}>
                        <ul style={{width:300, marginRight:100,float:"left"}}>
                            <li>
                                <span>当前行业</span>
                                <span> : {joblb}</span>
                            </li>
                            <li>
                                <span>当前职业</span>
                                <span> : {titlenow}</span>
                            </li>
                            <li>
                                <span className="space">户籍</span>
                                <span> : {accountcityid}</span>
                            </li>
                            <li>
                                <span>婚姻状况</span>
                                <span> : {marital}</span>
                            </li>
                            
                        </ul>
                        <ul style={{width:300,overflow:"hidden"}}>
                            <li>
                                <span>当前公司</span>
                                <span> : {companynow}</span>
                            </li>
                            <li>
                                <span>工作年限</span>
                                <span> : {workyears}</span>
                            </li>
                            <li>
                                <span>最高学历</span>
                                <span> : {educationbg}</span>
                            </li>
                            <li>
                                <span className="space">年薪</span>
                                <span> : {salary}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        求职意向
                    </h3>
                    <ul className="field-list" style={{float:"left",width:300,marginRight:100}}>
                        <li>
                            <span>工作性质 : </span>
                            <span>{jobnature}</span>
                        </li>
                        <li>
                            <span>期望行业 : </span>
                            <span>{postids}</span>
                        </li>
                        <li>
                            <span>期望职位 : </span>
                            <span>{functions}</span>
                        </li>
                    </ul>
                    <ul style={{float:"left",width:300,marginRight:100,overflow:"hidden"}}>
                        <li>
                            <span>期望地点 : </span>
                            <span>{sitecity}</span>
                        </li>
                        <li>
                            <span>期望月薪 : </span>
                            <span>{expectsalarycode}</span>
                        </li>
                        <li>
                            <span>到岗时间 : </span>
                            <span>{poststime}</span>
                        </li>
                    </ul>
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        自我评价
                    </h3>
                    <p 
                        className="field-list"
                        dangerouslySetInnerHTML={{__html:selfremark}}
                        style={{
                            whiteSpace: 'pre-wrap',
                            marginLeft:20
                        }}
                    >
                    </p>
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        教育经历
                    </h3>
                    {eduList.length > 0 &&
                        eduList.map((item,index)=>{
                            const {
                                starttime, // 起止时间
                                endtime, // 结束时间
                                school, // 学校
                                educationbg, // 学历
                                specialtyid // 专业
                            } = item;
                            return (
                                <ul key={index} className="field-list">
                                    <li>
                                        <span>起止时间</span>
                                        <span> : {starttime} -- {endtime}</span>
                                    </li>
                                    <li >
                                        <span className="space">学校</span>
                                        <span> : {school}</span>
                                    </li>
                                    <li>
                                        <span className="space">学历</span>
                                        <span> : {educationbg}</span>
                                    </li>
                                    <li>
                                        <span className="space">专业</span>
                                        <span> : {specialtyid}</span>
                                    </li>
                                    {eduList.length-1!=index && <li className="content" style={{borderBottom:"1px solid #D9D9D9"}}></li>}
                                </ul>
                            )
                        })
                    }
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        项目经验
                    </h3>
                    {projList.length > 0 &&
                        projList.map((item,index)=>{
                            const {
                                starttime, // 开始时间
                                endtime, // 结束时间
                                projectname, // 项目名称
                                projectremark, // 项目描述
                                trustremark // 责任描述
                            } = item;
                            return (
                                <ul key={index}  >
                                    <li>
                                        <span>起止时间 : </span>
                                        <span>{starttime} -- {endtime}</span>
                                    </li>
                                    <li>
                                        <span>项目名称 : </span>
                                        <span>{projectname}</span>
                                    </li>
                                    <li>
                                        <span>项目描述 : </span>
                                        <span dangerouslySetInnerHTML={{__html:projectremark}}></span>
                                    </li>
                                    <li>
                                        <span>责任描述 : </span>
                                        <span>{trustremark}</span>
                                    </li>
                                    {projList.length-1!=index && <li  style={{borderBottom:"1px solid #D9D9D9"}}></li>}
                                </ul>
                            )
                        })
                    }
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        工作经历
                    </h3>
                    {workList.length > 0 &&
                        workList.map((item,index)=>{
                            const {
                                starttime, // 开始时间
                                endtime, // 结束时间
                                corpname, // 企业名称
                                industry, // 所属行业
                                postcode, // 职位名称
                                workremark // 工作描述
                            } = item;
                            return (
                                <ul key={index} className="field-list">
                                    <li>
                                        <span>起止时间 : </span>
                                        <span>{starttime} -- {endtime}</span>
                                    </li>
                                    <li>
                                        <span>企业名称 : </span>
                                        <span>{corpname}</span>
                                    </li>
                                    <li>
                                        <span>所属行业 : </span>
                                        <span>{industry}</span>
                                    </li>
                                    <li>
                                        <span>职位名称 : </span>
                                        <span>{postcode}</span>
                                    </li>
                                    <li>
                                        <span>工作描述 : </span>
                                        <span dangerouslySetInnerHTML={{__html:workremark}}></span>
                                    </li>
                                    {workList.length-1!=index && <li style={{borderBottom:"1px solid #D9D9D9"}}></li>}
                                </ul>
                            )
                        })
                    }
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        语言能力
                    </h3>
                    {lanList.length > 0 &&
                        <ul className="field-list">
                            {
                                lanList.map((item,index)=>{
                                    const {type} = item;
                                    return (
                                        <li key={index} dangerouslySetInnerHTML={{__html:type}}>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        培训经历
                    </h3>
                    {trainList.length > 0 &&
                        trainList.map((item,index)=>{
                            const {
                                starttime, // 开始时间
                                endtime, // 结束时间
                                org, // 培训机构
                                cert // 证书名称
                            } = item;
                            return (
                                <ul key={index} className="field-list">
                                    <li>
                                        <span>起止时间 : </span>
                                        <span>{starttime} -- {endtime}</span>
                                    </li>
                                    <li>
                                        <span>培训机构 : </span>
                                        <span>{org}</span>
                                    </li>
                                    <li>
                                        <span>培训主题 : </span>
                                        <span></span>
                                    </li>
                                    <li>
                                        <span>证书名称 : </span>
                                        <span>{cert}</span>
                                    </li>
                                    <li>
                                        <span>培训描述 : </span>
                                        <span></span>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        获得证书
                    </h3>
                    {certList.length > 0 &&
                        <ul className="field-list" >
                            {
                                certList.map((item,index)=>{
                                    const {
                                        gaintime, // 时间
                                        certname // 证书名称
                                    } = item;
                                    return (
                                        <li key={index}>
                                            <span>{gaintime}</span>
                                            <span style={{
                                                marginLeft: 15
                                            }}>{certname}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
                <div className="resume-info">
                    <h3 className="title">
                        附加信息
                    </h3>
                    {otherList.length > 0 &&
                        <ul className="field-list">
                            {
                                otherList.map((item,index)=>{
                                    const {
                                        subject, // 主题
                                        content // 内容 (html字符串)
                                    } = item;
                                    return (
                                        <li key={index}>
                                            <span>{subject}</span><br/>
                                            <div dangerouslySetInnerHTML={{__html:content}}></div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    resumeInformation: state.Resume.resumeInformation,
})
const mapDispatchToProps = dispatch => ({
    getResumeInfo: bindActionCreators(Actions.ResumeActions.getResumeInfo, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowResumePage);