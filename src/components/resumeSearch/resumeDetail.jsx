import React, {Component,PropTypes} from 'react';
import moment from 'moment';

import {Button , Menu , Input , Icon , Select , Cascader, Dropdown,Pagination,BackTop} from 'antd';
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

export default class ResumeDetailPage extends Component {
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
    //查看简历详情
    checkResumeDetail = (resumeId) => {
        const sorKey =  this.sorKey();
        const pathType = this.props.location.pathname;
        const key = "%!##@$%|$#$%(^)$}$*{^*+%";
        const  resumeIdSorKey = strEnc(`${resumeId}`,key);
        
        //查看简历详情
        //this.props.searchResumeDetail({resumeId:"2564847",sorKey})
        this.props.searchResumeDetail({resumeId:`${resumeId}`,sorKey});
        window.open(`${window.location.origin}/#/resumeDetail?resumeId=${resumeIdSorKey}&sorKey=${sorKey}&type=${pathType==="/searchResume"?1:pathType==="/searchResume/collectResume"?2:3}`);
        //this.props.showResumeDetail();
    }
    //收藏简历
    collectResume = (resumeId) => {
        const {deleteCollectResume,collectResumeList,collectResume} = this.props;
        const  sorKey = this.sorKey();
        if(this.props.location.pathname=="/searchResume/collectResume"){
            //取消收藏简历
            //deleteCollectResume({resumeId:"3926440",sorKey},collectResumeList,sorKey)
            deleteCollectResume({resumeId:`${resumeId}`,sorKey},collectResumeList,sorKey);
        }else{
            //收藏简历
            //collectResume({resumeId:"3926440",sorKey})
            collectResume({resumeId:`${resumeId}`,sorKey});
        } 
    }
    //分页查询
    pageSize = (page, pageSize) => {
        const sorKey =  this.sorKey();
        //分页查询简历
        const {pathname} = this.props.location;
        switch(pathname){
            case "/searchResume" :
                this.props.searchResume(page, pageSize);
            break;
            case "/searchResume/downloadResume":
                this.props.downLoadResumeList({pageNo:`${page}`, pageSize:`${pageSize}`,sorKey});
            break;
            case "/searchResume/collectResume":
                this.props.collectResumeList({pageNo:`${page}`, pageSize:`${pageSize}`,sorKey});
            break;
        } 
    }
    
    render() {
        const {path,resumeData=[],totalHits,location} = this.props;
        return (
            <div className="resumeDetail">
                {resumeData.length!=0 ? resumeData.map((item,index)=>{
                    return(
                    <div className="detail-item">
                        <div className="details-item-intention">
                            <div className="resume-id">
                                <span>ID:</span>
                                <span>{item.resumeId}</span>
                            </div>
                            <div className="intention">
                                <div className="intention-item">
                                    <span style={{display:"inline-block",float:"left"}}>求职意向：</span>
                                    {!Array.isArray(item.expectPositions) ? item.expectPositions?<span className="positionIntention" >{item.expectPositions}</span>:"":
                                        <Dropdown 
                                        style={{display:"inline-block",float:"left"}}
                                            overlay={<Menu>
                                                    {item.expectPositions.map((value,index)=>{
                                                        return <Menu.Item key={index}>{value}</Menu.Item>
                                                        })
                                                    }  
                                                    </Menu>
                                                    }
                                        >
                                            <a className="visible-position">
                                                {item.expectPositions[0]}
                                            </a>
                                        </Dropdown>
                                    }
                                </div>
                                <div className="intention-item">
                                    <span>薪资范围：</span>
                                    <span>{item.expectSalary}</span>
                                </div>
                                <div className="intention-item">
                                    <span>期望城市：</span>
                                    {!Array.isArray(item.expectAreas) ? <span>{item.expectAreas}</span>:
                                        item.expectAreas.map((value,index)=>{
                                            return(<span>{value}</span>)
                                        })
                                    } 
                                </div>
                                <div className="intention-item">
                                    <span>更新时间：</span>
                                    <span>{item.resumeLastUpdate?moment(item.resumeLastUpdate).format("YYYY-MM-DD"):"暂无"}</span>
                                </div>
                            </div>  
                        </div>
                        <div className="details-item-main">
                            <div className="main-left">
                                <h3>
                                    {item.name}
                                    {item.sex=="0"?"女士":item.sex=="1"?"先生":""}
                                    {item.sex=="女"?"女士":item.sex=="男"?"先生":""}
                                     | {item.workedYearsMeanly?item.workedYearsMeanly:item.workedYears}年 | {item.lastCompany} | 
                                    {item.lastPosition} | {item.currentArea}
                                </h3>
                                {!Array.isArray(item.workExp) ? <span>{item.workExp}</span>:
                                    item.workExp.map((value,index)=>{
                                        return(
                                            <div className="main-left-company">
                                                <p>{value.companyName}</p>
                                                <p className="visible" >{value.position}</p>
                                                <p>
                                                    {value.startDate?
                                                        moment(value.startDate).format("YYYY-MM-DD"):"暂无"} 至
                                                    {value.endDate?
                                                        moment(value.endDate).format("YYYY-MM-DD"):"暂无"
                                                    }
                                                </p>
                                            </div>
                                            )
                                        })
                                }
                                <div className="main-left-company">
                                    <p>{item.lastSchool}</p>
                                    <p>{item.major}</p>
                                    <p>{item.education}</p>
                                </div>  
                            </div>
                            <div className="main-right">
                                <Button 
                                    className="detailBtn"
                                    type="primary" 
                                    ghost 
                                    onClick= {this.checkResumeDetail.bind(this,item.resumeId)}
                                >
                                    查看详情
                                </Button>
                                <div style={{width:"100%",height:10}}></div>
                                { location.pathname==="/searchResume/collectResume" &&
                                    <Button 
                                        type="primary" 
                                        ghost 
                                        className="detailBtn"
                                        onClick={this.collectResume.bind(this,item.resumeId)}
                                    >
                                        取消收藏
                                    </Button>
                                }
                                <div style={{width:"100%",height:10}}></div>
                            </div>
                        </div>
                    </div> 
                        )
                    }):<div style={{textAlign:"center",marginTop:200,color:"#CDCDCD"}}>
                            <Icon type="frown-o" style={{fontSize:50}}>
                                <p style={{fontSize:14,lineHeight:"50px",color:"#CDCDCD"}}> 
                                    {location.pathname=="/searchResume" && resumeData.length==0 && "暂未查询到相关简历~~"}
                                    {location.pathname=="/searchResume/downloadResume" && resumeData.length==0 && "您还没有下载任何简历~"}
                                    {location.pathname=="/searchResume/collectResume" && resumeData.length==0 && "您还没有收藏任何简历~"}
                                </p>
                            </Icon>
                        </div>
                }
                {
                    resumeData.length!=0 && 
                    <div style={{marginTop:30,textAlign:"center"}}>
                        <Pagination 
                            defaultCurrent={1} 
                            total={totalHits}
                            onChange={this.pageSize} 
                        />
                    </div> 
                }        
            </div>
        );
    }
}