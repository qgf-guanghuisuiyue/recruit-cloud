import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader ,Pagination} from 'antd';
const SubMenu = Menu.SubMenu;

export default class ResumeSimplePage extends Component {
    checkResumeDetail = (resumeId) => {
        const  sorKey = this.sorKey();
        const pathType = this.props.location.pathname;
        const key = "%!##@$%|$#$%(^)$}$*{^*+%";
        const  resumeIdSorKey = strEnc(`${resumeId}`,key);
        this.props.searchResumeDetail({resumeId:`${resumeId}`,sorKey});
        window.open(`${window.location.origin}/#/resumeDetail?resumeId=${resumeIdSorKey}&type=${pathType==="/searchResume"?1:pathType==="/searchResume/collectResume"?2:'3'}`)
        //this.props.searchResumeDetail({resumeId:"3926440",sorKey})
        //this.props.showResumeDetail()
    }
    pageSize = (page, pageSize) => {
        this.props.searchResume(page, pageSize)
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
    //取消收藏简历
    deleteCollectResume = (resumeId) => {
        const {deleteCollectResume,collectResumeList} = this.props;
        const  sorKey = this.sorKey();
        if(this.props.location.pathname=="/searchResume/collectResume"){
            //取消已收藏简历
            deleteCollectResume({resumeId:`${resumeId}`,sorKey},collectResumeList,sorKey)
            //deleteCollectResume({resumeId:"3926440",sorKey},collectResumeList,sorKey)
        } 
    }
    render() {
        const {resumeData=[],totalHits,location} = this.props;
        return (
            <div className="resumeSimple">
                {
                    resumeData.length!=0 ?
                        <table className="resumeSimpleTable">
                            <thead>
                                <tr>
                                    <th>求职意向</th>
                                    <th>姓名</th>
                                    <th>学历</th>
                                    <th>最近职位</th>
                                    <th>最近工作公司名称</th>
                                    <th>期望薪资</th>
                                    <th>工作年限</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                { resumeData.map((item,index)=>{
                                    return(
                                        <tr>
                                            <td style={{maxWidth:100}}><span>{Array.isArray(item.expectPositions) ? item.expectPositions.length==0?"无":item.expectPositions[0]:item.expectPositions}</span></td>
                                            <td>
                                                <a onClick={this.checkResumeDetail.bind(this,item.resumeId)}>
                                                {(item.sex==1 || item.sex=="男")?`${item.name}先生`:(item.sex==0 || item.sex=="女")?`${item.name}女士`:""}
                                                </a>
                                            </td>
                                            <td style={{maxWidth:80}}>
                                                <span>
                                                    {item.education==1?"小学":item.education==10?"初中":item.education==20?"高中":item.education==21?"中专":item.education==22?"技校":item.education==23?"中技":item.education==100?"大学":item.education==101?"大专":item.education==102?"专科":item.education==110?"本科":item.education==200?"研究生":item.education==201?"MBA":item.education==210?"博士":item.education}
                                                </span>
                                            </td>
                                            <td style={{maxWidth:120}}><span>{item.lastPosition}</span></td>
                                            <td style={{maxWidth:120}}><span>{item.lastCompany}</span></td>
                                            <td><span>{item.expectSalary}</span></td>
                                            <td><span>{item.workedYearsMeanly?item.workedYearsMeanly:item.workedYears}</span></td>
                                            <td>
                                                <a onClick={this.checkResumeDetail.bind(this,item.resumeId)}>查看</a>
                                                {location.pathname=="/searchResume/collectResume" &&
                                                <span>
                                                    &nbsp;|&nbsp;
                                                    <a onClick={this.deleteCollectResume.bind(this,item.resumeId)}>取消收藏</a>
                                                </span>
                                                }
                                            </td>
                                    </tr>
                                    )
                                }) 
                                }
                            </tbody>
                        </table>:
                        <div style={{textAlign:"center",marginTop:200,color:"#CDCDCD"}}>
                            <Icon type="frown-o" style={{fontSize:50}}>
                                <p style={{fontSize:14,lineHeight:"50px",color:"#CDCDCD"}}>暂未查询到相关简历~~</p>
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