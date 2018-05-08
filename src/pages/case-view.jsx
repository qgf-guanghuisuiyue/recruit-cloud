import React, {Component} from 'react';

export default class CaseViewPage extends Component {
    render() {
       return(
            <div className="case-view">
                <div className="inverst-field" >
                    <div className="inverst-item info-field" style={{marginBottom:20}}>
                        <h3 className="title" style={{lineHeight:"50px"}}>
                            <span style={{color:"#0087CA"}}>▶</span>&nbsp;手机号身份证信息核查
                        </h3>
                        <div className="baseInfo" >
                            <ul style={{width:350,float:"left"}}>
                                <img style={{width:350}} src="/static/images/caseView/card.png"/>
                            </ul>
                            <ul style={{width:350,float:"right"}}>
                                <img style={{width:350}} src="/static/images/caseView/mobile.png"/>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="inverst-field" >
                    <div className="inverst-item info-field" style={{marginBottom:20}}>
                        <h3 className="title" style={{lineHeight:"50px"}}>
                            <span style={{color:"#0087CA"}}>▶</span>&nbsp;基本信息
                        </h3>
                        <div className="baseInfo" >
                            <ul style={{width:370,float:"left"}}>
                                <li>
                                    <span>姓名：</span>
                                    <span>张三</span>
                                </li>
                                <li>
                                    <span>手机：</span>
                                    <span>13215698025</span>
                                </li>
                                <li>
                                    <span>创建日期：</span>
                                    <span>2018-01-12</span>
                                </li>
                                <li>
                                    <span>订单状态：</span>
                                    <span>已完成</span>
                                </li>
                            </ul>
                            <ul style={{width:350,float:"right"}}>
                                <li>
                                    <span>身份证号：</span>
                                    <span>402582621450121254</span>
                                </li>
                                <li>
                                    <span>毕业证书号：</span>
                                    <span>402582621450121254</span>
                                </li>
                                
                                <li >
                                    <span >人工核查信息：</span>
                                    <span >点击下载</span>
                                </li>
                                <li style={{height:21}}> </li>
                            </ul>
                        </div>
                    </div>
                </div>
                    
                <div className="inverst-field">
                    <div className="inverst-item info-field">
                        <h3 className="title" style={{lineHeight:"50px"}}>
                            <span style={{color:"#0087CA"}}>▶</span>&nbsp;学历信息核查
                        </h3>
                        <div className="superior-content">
                            <div style={{width:"90%",margin:"0 auto"}}>
                                <div className="inline-block info-bar" style={{marginRight:100}}>
                                    <span>毕业证书编号 : </span>
                                    <span>402582621450121254</span>
                                </div>
                                <div className="inline-block info-bar" style={{marginRight:100}}>
                                    <span>专业 : </span>
                                    <span>电子商务</span>
                                </div>
                                <div className="inline-block info-bar">
                                    <span>院校地址 : </span>
                                    <span>上海 浦东新区</span>
                                </div>
                            </div>
                            <div style={{marginTop: 26,width:"90%",height:"80%"}}>
                                <img width="90%" height="90%" style={{margin:"0 auto"}} src="/static/images/caseView/info.png"/>
                            </div>
                        </div>             
                    </div>
                </div>
                    
                <div className="inverst-field" style={{marginBottom:30}}>
                    <div className="inverst-item info-field" style={{width:1033}}>
                        <h3 className="title" style={{lineHeight:"50px"}}>
                            <span style={{color:"#0087CA"}}>▶</span>&nbsp;调查方案查询信息
                        </h3> 
                        <div className="superior-content">
                            <div style={{width:"100%",margin:"0 auto"}}>
                                <h3 style={{lineHeight:"50px",marginLeft:20}}>一、职业资质核实</h3>
                                <h3 style={{lineHeight:"50px",marginLeft:40}}>1、人力资源管理</h3>
                                <div className="checkInfo" style={{overflow:"hidden"}}>
                                    <ul style={{width:400,float:"left"}}>
                                        <li>
                                            <span>姓名：</span>
                                            <span>张三</span>
                                        </li>
                                        <li>
                                            <span>性别：</span>
                                            <span>男</span>
                                        </li>
                                        <li>
                                            <span>文化程度：</span>
                                            <span>本科</span>
                                        </li>
                                        <li>
                                            <span>身份证号：</span>
                                            <span>51125254412621545</span>
                                        </li>
                                        <li>
                                            <span>数据上报单位：</span>
                                            <span>无</span>
                                        </li>
                                    </ul>
                                    <ul style={{width:350,float:"right"}}>
                                        <li>
                                            <span>姓名：</span>
                                            <span>张三</span>
                                        </li>
                                        <li>
                                            <span>性别：</span>
                                            <span>男</span>
                                        </li>
                                        <li>
                                            <span>文化程度：</span>
                                            <span>本科</span>
                                        </li>
                                        <li>
                                            <span>身份证号：</span>
                                            <span>51125254412621545</span>
                                        </li>
                                        <li>
                                            <span>数据上报单位：</span>
                                            <span>无</span>
                                        </li>
                                    </ul>
                                </div>    
                            </div>
                        </div> 
                    </div>
                </div>
            
                <div className="inverst-field">
                    <div className="inverst-item info-field" style={{width:1033}}>
                        <h3 className="title" style={{lineHeight:"50px"}}>
                            <span style={{color:"#0087CA"}}>▶</span>&nbsp;职业证书信息核查
                        </h3>
                        <div className="cerd" >
                            <ul style={{width:350,float:"left"}}>
                                <li>
                                    <span>姓名：</span>
                                    <span>张三</span>
                                </li>
                                <li>
                                    <span>性别：</span>
                                    <span>男</span>
                                </li>
                                <li>
                                    <span>文化程度：</span>
                                    <span>本科</span>
                                </li>
                                <li>
                                    <span>身份证号：</span>
                                    <span>51125254412621545</span>
                                </li>
                                <li>
                                    <span>数据上报单位：</span>
                                    <span>无</span>
                                </li>
                            </ul>  
                            <ul  style={{width:350,float:"right"}}>
                                <li>
                                    <span>职业名称：</span>
                                    <span>web前端开发工程师</span>
                                </li>
                                <li>
                                    <span>评定级别：</span>
                                    <span>无</span>
                                </li>
                                <li>
                                    <span>评定成绩：</span>
                                    <span>无</span>
                                </li>
                                <li>
                                    <span>证书编号：</span>
                                    <span>45125462156</span>
                                </li>
                                <li>
                                    <span>发证日期：</span>
                                    <span>2015-06-30</span>
                                </li>
                            </ul>  
                        </div>    
                    </div>
                </div>
                
                <div className="inverst-field" style={{marginBottom:50}}>
                    <div className="inverst-item info-field" style={{width:1033}}>
                        <h3 className="title" style={{lineHeight:"50px"}}>
                            <span style={{color:"#0087CA"}}>▶</span>&nbsp;失信被执行信息核查
                        </h3>
                        <div className="dishonst">
                            <ul style={{width:350,float:"left"}}>
                                <li>
                                    <span>被执行人名称：</span>
                                    <span>张三</span>
                                </li>
                                <li>
                                    <span>年龄：</span>
                                    <span>26</span>
                                </li>
                                <li>
                                    <span>执行法院：</span>
                                    <span>上海人民法院</span>
                                </li>
                                <li>
                                    <span>执行依据文号：</span>
                                    <span>51125254</span>
                                </li>
                                <li>
                                    <span>案号：</span>
                                    <span>43242</span>
                                </li>
                                <li>
                                    <span>生效法律文书确定的义务：</span>
                                    <span>43242</span>
                                </li>
                                <li>
                                    <span>失信被执行人行为情形：</span>
                                    <span>43242</span>
                                </li>
                            </ul>
                            <ul style={{width:350,float:"right"}}>
                                <li>
                                    <span>身份证号/组织机构代码：</span>
                                    <span>23242343435</span>
                                </li>
                                <li>
                                    <span>性别：</span>
                                    <span>男</span>
                                </li>
                                <li>
                                    <span>省份：</span>
                                    <span>上海市</span>
                                </li>
                                <li>
                                    <span>作出执行依据单位：</span>
                                    <span>51125254</span>
                                </li>
                                <li>
                                    <span>立案时间：</span>
                                    <span>43242</span>
                                </li>
                                <li>
                                    <span>被执行人的履行情况：</span>
                                    <span>43242</span>
                                </li>
                                <li>
                                    <span>发布时间：</span>
                                    <span>43242</span>
                                </li>
                            </ul>
                           
                        </div>
                    </div>
                </div> 
            </div>
     )}
    }
