import React, {Component} from 'react';
import LoadingComponent from 'components/loading';
import columns from 'data/table-columns/defaulter-table';
import BarChartComponent from './bar-chart';
import { Collapse , Icon } from 'antd';
import store from 'store';
const Panel = Collapse.Panel;
import moment from 'moment';
import pickBy from 'lodash/pickBy';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class CreditReturnComponent extends Component {
    state = {
        Loading:true
    }
    componentDidMount() {
        const {searchCredit , data , creditData={}, queryEmployeeList} = this.props,
        {resumeid,rid} = queryEmployeeList.list.resumeoff;
        if(creditData.flag){
            if(resumeid){
                searchCredit({resumeid});
            }else{
                searchCredit({rid:rid+""});
            }
        }
    }
    render(){
        const jzarr =[];
        const Data =[];
        const DataJzlist = [];
        const iseducation = [];
        const {creditInfoData={},creditData,isDataLoading} = this.props;
       
        //判断creditInfoData是否为空对象
        if(creditInfoData==null || creditInfoData=={} || (!creditInfoData.cerditcerinfo && !creditInfoData.dishonest && !creditInfoData.education && !creditInfoData.selfinfo && !creditInfoData.basic && !creditInfoData.jzList)){
            Data.push({
                cerditcerinfo:[],
                dishonest:[],
                education:[],
                selfinfo:{},
                basic:{},//基本信息{}
                jzList:[]//较真返回的各方案信息[]
            }) ;
        }else{
            Data.push(creditInfoData)
        };
        //过滤调查方案
        if(Array.isArray(Data[0].jzList)){ 
            for(let j=0;j<Data[0].jzList.length;j++){
                if(Data[0].jzList[j].transactiontype!="110" && Data[0].jzList[j].transactiontype!="127" && Data[0].jzList[j].transactiontype!="212" && Data[0].jzList[j].transactiontype!="213"){
                    DataJzlist.push(Data[0].jzList[j])
                }
            }
        }
        const DataObject = Data[0];
        if(Array.isArray(DataObject.jzList)){
            for(let i=0;i<DataObject.jzList.length;i++){
                if(DataObject.jzList[i].transactiontype==="122" || DataObject.jzList[i].transactiontype==="123" || DataObject.jzList[i].transactiontype==="200" || DataObject.jzList[i].transactiontype==="201" || DataObject.jzList[i].transactiontype==="210" || DataObject.jzList[i].transactiontype==="211"){
                    jzarr.push(DataObject.jzList[i].transactiontype)
                }
                if(DataObject.jzList[i].transactiontype==='120'){
                    iseducation.push(DataObject.jzList[i].transactiontype)
                }
            }
        }
        const {Loading} = this.state;
            //         const {
            //         sid="",
            //         card="",
            //         certcard="",
            //         mobile="",
            //         verifymessage="",//返回消息
            //         bizno="",//"transactionid": "2017102010510295036e89a77-b06a-4ead-9ab7-850defdfa0fb",//业务流水号
            //         cid="",
            //         createby="",
            //         createdate="",
            //         activeflag="",
            //         flg1=false,//姓名和身份证是否匹配标识字段
            //         flg2=false//电话号码和姓名是否匹配标识字段
            //     } = selfinfo;
        const token = store.get('token');
        return (
            <li > 
               { DataObject.selfinfo==null||!DataObject.selfinfo.name?"":
                <div 
                    className="inverst-field" 
                    style={{
                        width:890,
                        margin:"0 auto",
                        marginBottom:50,
                        paddingLeft:20
                    }}
                >
                    <div>
                        <div className="inverst-item inline-block box-border" style={{width:360}}>
                            <div className="top-title">
                                身份证核查
                                <span className="pull-right" style={{color: "#48df81"}}>信息源自中国公安部</span>
                            </div>
                            <div 
                                className="superior-content" 
                                style={{padding: "27px 0 0 49px",height:95}}
                            >
                                <div className="inline-block">
                                    <img src={`/static/images/manager/clerk/${DataObject.selfinfo.flg1 ? `gou` : `cha`}.png`} alt="勾差" style={{height: 44}}/>   
                                </div>
                                <div className="info-right inline-block">
                                    <ul>
                                        <li className="list-item">
                                            <span style={{fontSize: 20}}>{DataObject.selfinfo.name?DataObject.selfinfo.name:""}</span>
                                            <span></span>
                                            <span></span>
                                        </li>
                                        <li className="list-item">
                                        <span>{DataObject.selfinfo.card?DataObject.selfinfo.card:""}</span>
                                        <span></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <img className="consquence"
                                src={`/static/images/manager/clerk/${DataObject.selfinfo.flg1 ? `pipei.png` : `bupipei.png`}`
                                } alt="匹配"/>
                        </div>
                        <div className="inverst-item inline-block box-border" style={{width:360}}>
                            <div className="top-title">
                                手机号核查
                                <span className="pull-right" style={{color: "#c25255"}}>信息源自运营商</span>
                            </div>
                            <div className="superior-content" style={{
                                padding: "27px 0 0 49px",height:95
                            }}>
                                <div className="inline-block">
                                    <img src={`/static/images/manager/clerk/${DataObject.selfinfo.flg2 ? `gou` : `cha`}.png`} 
                                        alt="勾差"
                                        style={{height: 44}}/>
                                </div>
                                <div className="info-right inline-block">
                                    <ul>
                                        <li className="list-item">
                                            <span style={{fontSize: 20}}>{DataObject.selfinfo.mobile?DataObject.selfinfo.mobile:""}</span>
                                            <span>移动号码</span>
                                        </li>
                                        <li className="list-item">
                                            <span>{DataObject.selfinfo.name?DataObject.selfinfo.name:""}</span>
                                            <span></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <img   className="consquence"
                                src={`/static/images/manager/clerk/${DataObject.selfinfo.flg2 ? `pipei.png` : `bupipei.png`}`
                                } alt="匹配"/>
                        </div>
                    </div>
                </div>}
                {isDataLoading && <Icon type="loading" 
                    style={{
                        position:"relative",
                        fontSize:48,
                        color:"#66BCEC",
                        top:80,
                        left:"45%"
                    }} />
                }
                {DataObject.basic!=null && <div className="inverst-field" style={{marginBottom:30}}>
                    <div className="inverst-item info-field" style={{width:1033}}>
                            <h3 className="title">
                                基本信息
                            </h3>{DataObject.basic.name?
                            <div style={{margin:"0 auto",width:890}}>
                                <ul className="field-list inline-block" style={{width:350}}>
                                    <li>
                                        <span>姓名：</span>
                                        <span>{DataObject.basic.name?DataObject.basic.name:"无"}</span>
                                    </li>
                                    <li>
                                        <span>手机：</span>
                                        <span>{DataObject.basic.phone?DataObject.basic.phone:"无"}</span>
                                    </li>
                                    <li>
                                        <span>创建日期：</span>
                                        <span>{DataObject.basic.createdate?moment(DataObject.basic.createdate).format("YYYY-MM-DD"):"无"}</span>
                                    </li>
                                    <li>
                                        <span>订单状态：</span>
                                        <span>{DataObject.basic.orderstatus===1?"未开始":DataObject.basic.orderstatus===2?"进行中":DataObject.basic.orderstatus===3?"已完成":DataObject.basic.orderstatus===4?"已取消":"暂无状态"}</span>
                                    </li>
                                </ul>
                                <ul className="field-list inline-block" style={{width:350}}>
                                    <li>
                                        <span>身份证号：</span>
                                        <span>{DataObject.basic.card?DataObject.basic.card:"无"}</span>
                                    </li>
                                    <li>
                                        <span>毕业证书号：</span>
                                        <span>{DataObject.basic.certcard?DataObject.basic.certcard:"无"}</span>
                                    </li>
                                    
                                    <li style={{height:50,position:"relative",left:"-8px"}}>
                                        <span style={{display:"block",float:"left"}}>人工核查信息：</span>
                                        {
                                            jzarr.length==0?"无":
                                            <span style={{display:"block",float:"left",overflow:"hidden",width:160,height:80}}>{DataObject.basic.filepath?
                                                <a href={`${prefixUri}/downloadJz?token=${token.token}&tokenKey=${token.tokenKey}&fileName=${DataObject.basic.filepath}`} title="点击下载">点击下载</a>:"请等待3-5个工作日"}
                                            </span>
                                    }
                                    </li>
                                </ul>
                            </div>:<h4 style={{paddingLeft:50,color:'#AFAFAF'}}>暂未查询到相关信息...</h4>}
                    </div> 
                </div>
                }
                {iseducation.length==0 && DataObject.education && DataObject.education.length!=0 && <div className="inverst-field">
                    <div className="inverst-item info-field" style={{width:1033}}>
                        <h3 className="title">
                            学历信息核查
                        </h3>
                        <Collapse defaultActiveKey={['1']} style={{width:890,margin:"0 auto"}}>
                            {
                                DataObject.education.map((item,index)=>{
                                        return <Panel header="学历信息" key={index+1}>
                                                    <div className="superior-content" 
                                                        style={{padding: "27px 0 0 49px"}}>
                                                    <div>
                                                        <div className="inline-block info-bar">
                                                            <span>毕业证书编号 : </span>
                                                            <span>{DataObject.selfinfo.certcard}</span>
                                                        </div>
                                                        <div className="inline-block info-bar">
                                                            <span>专业 : </span>
                                                            <span>{item.major}</span>
                                                        </div>
                                                        <div className="inline-block info-bar">
                                                            <span>院校地址 : </span>
                                                            <span>无</span>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: 26, position: "relative"}}>
                                                        <div className="inline-block">
                                                            <div className="inline-block">
                                                            <img alt="example" style={{ width: '110px',height:'130px',marginBottom:'-90px'}} src={`${prefixUri}/view_cerdit?fileName=${item.headimg}`} />
                                                            </div>
                                                            <div className="inline-block remark">
                                                                <ul>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#ff0000"
                                                                        }}></i>
                                                                        <span>{item.level}</span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#517fa0"
                                                                        }}></i>
                                                                        <span></span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#61aa61"
                                                                        }}></i>
                                                                        <span>全国热度排名 : </span>
                                                                        <span>无</span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="inline-block" style={{
                                                                            backgroundColor: "#efcb5b"
                                                                        }}></i>
                                                                        <span>学校人气值 : </span>
                                                                        <span>无</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="duration inline-block" style={{
                                                            position: "absolute",
                                                            top: 10,
                                                            left: 410
                                                        }}>
                                                            <div className="inline-block">
                                                                <ul>
                                                                    <li>
                                                                        <span>开始时间</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>{item.inschooldate}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="inline-block"style={{textAlign: "center", margin: "0 20px"}}>
                                                                <h3 style={{marginBottom: 15}}>{creditInfoData.education[0].schoolname}</h3>
                                                                <img src="/static/images/manager/clerk/time.png" alt="time"
                                                                    style={{
                                                                        width: 136,
                                                                        height: 70
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="inline-block">
                                                                <ul>
                                                                    <li>
                                                                        <span>毕业时间</span>
                                                                    </li>
                                                                    <li>
                                                                        <span>{item.endschooldate}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Panel> 
                                })
                            }                               
                        </Collapse>   
                    </div>
                </div>
                }
                <div className="inverst-field">
                    <div className="inverst-item info-field" style={{width:1033}}>
                        <div className="title">
                            调查方案查询信息
                        </div>{DataJzlist.length!=0 ? 
                        <Collapse style={{width:890,margin:"0 auto"}}>
                            {
                                DataJzlist.map((item,index)=>{
                                        return <Panel 
                                            header={item.transactiontype==="100"?"身份信息核实":item.transactiontype==="120"?"国内最高学历核实":item.transactiontype==="130"?"商业利益冲突核实":item.transactiontype==="140"?"金融风险信息核查":item.transactiontype==="145"?"法院诉讼核查":item.transactiontype==="150"?"犯罪记录核实":item.transactiontype==="160"?"职业资质核实":item.transactiontype==="122"?"国内学历核实":item.transactiontype==="123"?"海外学历核实":item.transactiontype==="200"?"国内工作履历核实":item.transactiontype==="201"?"海外工作履历核实":item.transactiontype==="210"?"国内工作表现访谈":item.transactiontype==="211"&& "海外工作表现访谈"} 
                                            key={index+1}
                                        >
                                                    <div className="superior-content" style={{padding: "27px 0 0 49px"}}>
                                                        {item.transactiontype=="100"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype==="120"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>学校名称</td>
                                                                <td>{JSON.parse(item.content).university?
                                                                    JSON.parse(item.content).university:"无"}</td>
                                                                <td>是否毕业</td>
                                                                <td>{JSON.parse(item.content).graduateResult?
                                                                    JSON.parse(item.content).graduateResult:"无"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>毕业院校类型</td>
                                                                <td>{JSON.parse(item.content).schoolType?
                                                                    JSON.parse(item.content).schoolType:"无"}</td>
                                                                <td>学历</td>
                                                                <td>{JSON.parse(item.content).degree?
                                                                    JSON.parse(item.content).degree:"无"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>学历类型</td>
                                                                <td>{JSON.parse(item.content).degreesType?
                                                                    JSON.parse(item.content).degreesType:"无"}</td>
                                                                <td>专业</td>
                                                                <td>{JSON.parse(item.content).major?
                                                                    JSON.parse(item.content).major:"无"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>报名时间</td>
                                                                <td>{JSON.parse(item.content).enrolDate?
                                                                    JSON.parse(item.content).enrolDate:"无"}</td>
                                                                <td>毕业日期</td>
                                                                <td>{JSON.parse(item.content).graduateDate?
                                                                    JSON.parse(item.content).graduateDate:"无"}</td>
                                                            </tr>
                                                        </table>:item.transactiontype==="130"? 
                                                                <Collapse>
                                                                    <Panel header="注册及职位信息" key="1">
                                                                    {
                                                                        JSON.parse(item.content).conflictResult.length==0?
                                                                        <p>暂无注册及职位信息</p>:
                                                                        JSON.parse(item.content).conflictResult.map((item,index)=>{
                                                                        return <Collapse style={{marginBottom:20}}>
                                                                                    <Panel header={item.entName?item.entName:"无"}
                                                                                     key="1">
                                                                                        <table cellSpacing={0}>
                                                                                            <tr>
                                                                                                <td>公司名称</td>
                                                                                                <td>{item.entName?item.entName:"无"}
                                                                                                </td>
                                                                                                <td>注册号</td>
                                                                                                <td>{item.regNo?item.regNo:"无"}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>注册资本（万元）</td>
                                                                                                <td>{item.regCap?item.regCap:"无"}</td>
                                                                                                <td>币种</td>
                                                                                                <td>{item.regCapCur?item.regCapCur:"无"}
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>企业状态</td>
                                                                                                <td>{item.entStatus?item.entStatus:"无"}
                                                                                                </td>
                                                                                                <td>担任职位</td>
                                                                                                <td>{item.position?item.position:"无"}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </Panel>
                                                                                </Collapse>
                                                                        })
                                                                    }
                                                                    </Panel>
                                                                    <Panel header="企业法人" key="2">
                                                                    {
                                                                        JSON.parse(item.content).ryPosFrList.length==0?
                                                                        <p>暂无企业法人信息</p>:
                                                                        JSON.parse(item.content).ryPosFrList.map((item,index)=>{
                                                                        return <Collapse style={{marginBottom:20}}>
                                                                                    <Panel header={item.entName?item.entName:"无"} key="1">
                                                                                        <table cellSpacing={0}>
                                                                                            <tr>
                                                                                                <td>企业法人</td>
                                                                                                <td>{item.type?item.type:"无"}</td>
                                                                                                <td>公司名称</td>
                                                                                                <td>{item.entName?item.entName:"无"}
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>企业(机构)类型</td>
                                                                                                <td>{item.entType?item.entType:"无"}
                                                                                                </td>
                                                                                                <td>注册号</td>
                                                                                                <td>{item.regNo?item.regNo:"无"}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>注册资本（万元）</td>
                                                                                                <td>{item.regCap?item.regCap:"无"}</td>
                                                                                                <td>币种</td>
                                                                                                <td>{item.regCapCur?item.regCapCur:"无"}
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>企业状态</td>
                                                                                                <td>{item.entStatus?item.entStatus:"无"}
                                                                                                </td>
                                                                                                <td></td>
                                                                                                <td></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </Panel>
                                                                                </Collapse>
                                                                        
                                                                            })
                                                                    }
                                                                    </Panel>
                                                                    <Panel header="企业股东" key="3">
                                                                    {
                                                                        !JSON.parse(item.content).ryPosShaList?
                                                                        <p>暂无企业股东信息</p>:
                                                                        JSON.parse(item.content).ryPosShaList.map((item,index)=>{
                                                                        return <Collapse style={{marginBottom:20}}>
                                                                                    <Panel header={item.entName?item.entName:"无"}
                                                                                     key="1">
                                                                                        <table cellSpacing={0}>
                                                                                        <tr>
                                                                                            <td>公司名称</td>
                                                                                            <td>{item.entName?item.entName:"无"}</td>
                                                                                            <td>企业(机构)类型</td>
                                                                                            <td>{item.entType?item.entType:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>注册号</td>
                                                                                            <td>{item.regNo?item.regNo:"无"}</td>
                                                                                            <td>注册资本（万元）</td>
                                                                                            <td>{item.regCap?item.regCap:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>币种</td>
                                                                                            <td>{item.regCapCur?item.regCapCur:"无"}
                                                                                            </td>
                                                                                            <td>企业状态</td>
                                                                                            <td>{item.entStatus?item.entStatus:"无"}
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    </Panel>
                                                                                </Collapse>
                                                                        
                                                                        })
                                                                    }
                                                                    </Panel>
                                                                    <Panel header="企业高管" key="4">
                                                                    {
                                                                        !JSON.parse(item.content).ryPosPerList?
                                                                        <p>暂无企业高管信息</p>:
                                                                        JSON.parse(item.content).ryPosPerList.map((item,index) => {
                                                                            return <Collapse style={{marginBottom:20}}>
                                                                                        <Panel header={item.entName?item.entName:"无"}
                                                                                         key="1">
                                                                                         <table cellSpacing={0}>
                                                                                            <tr>
                                                                                                <td>公司名称</td>
                                                                                                <td>{item.entName?item.entName:"无"}
                                                                                                </td>
                                                                                                <td>企业(机构)类型</td>
                                                                                                <td>{item.entType?item.entType:"无"}
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>注册号</td>
                                                                                                <td>{item.regNo?item.regNo:"无"}</td>
                                                                                                <td>注册资本（万元）</td>
                                                                                                <td>{item.regCap?item.regCap:"无"}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>币种</td>
                                                                                                <td>{item.regCapCur?item.regCapCur:"无"}
                                                                                                </td>
                                                                                                <td>企业状态</td>
                                                                                                <td>{item.entStatus?item.entStatus:"无"}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                        </Panel>
                                                                                    </Collapse>
                                                                            
                                                                            })
                                                                    }
                                                                    </Panel>
                                                                </Collapse>                            
                                                        :item.transactiontype==="140"?
                                                        <Collapse>
                                                            <Panel header="欠税公告" key="1">
                                                            {
                                                                JSON.parse(item.content).taxDuesAnnouncementList==null?
                                                                <p>暂无欠税公告</p>:
                                                                JSON.parse(item.content).taxDuesAnnouncementList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.leader?item.leader:"无"} key="1">
                                                                            <table cellSpacing={0}>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>所欠税种</td>
                                                                                    <td>{item.taxType?item.taxType:"无"}</td>
                                                                                    <td>期初陈欠</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>当期发生欠税余额（元）</td>
                                                                                    <td>{item.money2?item.money2:"无"}</td>
                                                                                    <td>欠税余额</td>
                                                                                    <td>{item.money3?item.money3:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>应征发生日期</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                    <td>认定日期</td>
                                                                                    <td>{item.time2?item.time2:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                    <td>分管领导</td>
                                                                                    <td>{item.leaderShip?item.leaderShip:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>主管税务人员</td>
                                                                                    <td>{item.taxPeople?item.taxPeople:"无"}</td>
                                                                                    <td>所属市县区</td>
                                                                                    <td>{item.region?item.region:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>认定字号</td>
                                                                                    <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                    <td>公告期次</td>
                                                                                    <td>{item.period?item.period:"无"}</td>
                                                                                </tr>
                                                                            </table>
                                                                            </Panel>
                                                                         </Collapse>
                                                                })
                                                            }
                                                            </Panel>
                                                            <Panel header="失踪纳税人信息" key="2">
                                                            {
                                                                JSON.parse(item.content).taxMissList==null?
                                                                <p>暂无失踪纳税人信息</p>:
                                                                JSON.parse(item.content).taxMissList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.leader?item.leader:"无"} key="1">
                                                                                    <table cellSpacing={0}>
                                                                                        <tr>
                                                                                            <td>纳税人识别号</td>
                                                                                            <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                            <td>经营地址</td>
                                                                                            <td>{item.address?item.address:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>法定代表人（业主）</td>
                                                                                            <td>{item.leader?item.leader:"无"}</td>
                                                                                            <td>证件类别</td>
                                                                                            <td>{item.type?item.type:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>主管税务机关</td>
                                                                                            <td>{item.unit?item.unit:"无"}</td>
                                                                                            <td>认定失踪日期</td>
                                                                                            <td>{item.missTime?item.missTime:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>偷逃欠税税额</td>
                                                                                            <td>{item.money?item.money:"无"}</td>
                                                                                            <td>公告时间</td>
                                                                                            <td>{item.time?item.time:"无"}</td>
                                                                                        </tr> 
                                                                                    </table>
                                                                                </Panel>
                                                                         </Collapse>
                                                                    
                                                                })
                                                            }
                                                            </Panel>
                                                            <Panel header="注销信息" key="3">
                                                            {
                                                                JSON.parse(item.content).taxCancleList==null?
                                                                <p>暂无注销信息</p>:
                                                                JSON.parse(item.content).taxCancleList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.court?item.court:"无"} key={index}>
                                                                                    <table cellSpacing={0}>
                                                                                        <tr>
                                                                                            <td>纳税人识别号</td>
                                                                                            <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                            <td>纳税户类型</td>
                                                                                            <td>{item.peopleType?item.peopleType:"无"}
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>经营地址</td>
                                                                                            <td>{item.address?item.address:"无"}</td>
                                                                                            <td>法定代表人（业主）</td>
                                                                                            <td>{item.leader?item.leader:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>证件类别</td>
                                                                                            <td>{item.type?item.type:"无"}</td>
                                                                                            <td>主管税务机关</td>
                                                                                            <td>{item.unit?item.unit:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>注销日期</td>
                                                                                            <td>{item.cancleTime?item.cancleTime:"无"}
                                                                                            </td>
                                                                                            <td>注销类型</td>
                                                                                            <td>{item.cancleType?item.cancleType:"无"}
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>注销原因</td>
                                                                                            <td>{item.cancleReason?item.cancleReason:
                                                                                                "无"}</td>
                                                                                            <td>公告时间</td>
                                                                                            <td>{item.time?item.time:"无"}</td>
                                                                                        </tr> 
                                                                                    </table>
                                                                                </Panel>
                                                                          </Collapse>   
                                                                })
                                                            }
                                                            </Panel>
                                                            <Panel header="失信纳税人信息" key="4">
                                                            {
                                                                JSON.parse(item.content).taxDishonestList==null?
                                                                <p>暂无失信纳税人信息</p>:
                                                                JSON.parse(item.content).taxDishonestList.map((item,index)=>{
                                                                return <Collapse style={{marginBottom:10}}>
                                                                            <Panel header={item.leader?item.leader:"无"} key={index}>
                                                                                <table cellSpacing={0}>
                                                                                    <tr>
                                                                                        <td>纳税人识别号</td>
                                                                                        <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                        <td>法定代表人（业主）</td>
                                                                                        <td>{item.leader?item.leader:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>证件类别</td>
                                                                                        <td>{item.type?item.type:"无"}</td>
                                                                                        <td>主管税务机关</td>
                                                                                        <td>{item.unit?item.unit:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>是否评定为D级</td>
                                                                                        <td>{item.isD?item.isD:"无"}</td>
                                                                                        <td>评定时间</td>
                                                                                        <td>{item.time?item.time:"无"}</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </Panel>
                                                                        </Collapse>
                                                                })
                                                            }
                                                            </Panel>
                                                            
                                                            <Panel header="税务违法信息" key="5">
                                                            {
                                                                JSON.parse(item.content).taxIllegalList==null?
                                                                <p>暂无税务违法信息</p>:
                                                                    JSON.parse(item.content).taxIllegalList.map((item,index)=>{
                                                                    return <Collapse  style={{marginBottom:10}}>
                                                                                <Panel header={item.leader?item.leader:"无"} 
                                                                                    key={index}>
                                                                                    <table cellSpacing={0}>
                                                                                        <tr>
                                                                                            <td>纳税人识别号</td>
                                                                                            <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                            <td>法定代表人（业主）</td>
                                                                                            <td>{item.leader?item.leader:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>证件类别</td>
                                                                                            <td>{item.type?item.type:"无"}</td>
                                                                                            <td>主管税务机关</td>
                                                                                            <td>{item.unit?item.unit:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>检查/稽查年度</td>
                                                                                            <td>{item.year?item.year:"无"}</td>
                                                                                            <td>违法违章事实</td>
                                                                                            <td>{item.fact?item.fact:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>违法违章手段</td>
                                                                                            <td>{item.means?item.means:"无"}</td>
                                                                                            <td>处理处罚决定日期</td>
                                                                                            <td>{item.punishTime?item.punishTime:"无"}
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>处理处罚限定履行日期</td>
                                                                                            <td>{item.decisionTime?item.decisionTime:
                                                                                                "无"}</td>
                                                                                            <td>罚款金额</td>
                                                                                            <td>{item.money?item.money:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>处罚处理实际履行时间</td>
                                                                                            <td>{item.performTime?item.performTime:"无"}
                                                                                            </td>
                                                                                            <td>实缴税款/入库金额</td>
                                                                                            <td>{item.money2?item.money2:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>未缴税款/未入库金额</td>
                                                                                            <td>{item.money3?item.money3:"无"}</td>
                                                                                            <td>限改状态</td>
                                                                                            <td>{item.statute?item.statute:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>纳税人当前状态</td>
                                                                                            <td>{item.statute2?item.statute2:"无"}</td>
                                                                                            <td>公告时间</td>
                                                                                            <td>{item.time?item.time:"无"}</td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="税务逾期信息" key="6">
                                                            {
                                                                JSON.parse(item.content).taxOverdueList==null?
                                                                <p>暂无税务逾期信息</p>:
                                                                    JSON.parse(item.content).taxOverdueList.map((item,index)=>{
                                                                    return <Collapse  style={{marginBottom:10}}>
                                                                                <Panel header={item.leader?item.leader:"无"} 
                                                                                    key={index}>
                                                                                <table cellSpacing={0}>
                                                                                    <tr>
                                                                                        <td>纳税人识别号</td>
                                                                                        <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                        <td>法定代表人（业主）</td>
                                                                                        <td>{item.leader?item.leader:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>证件类别</td>
                                                                                        <td>{item.type?item.type:"无"}</td>
                                                                                        <td>主管税务机关</td>
                                                                                        <td>{item.unit?item.unit:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>海关代码</td>
                                                                                        <td>{item.code?item.code:"无"}</td>
                                                                                        <td>经营地址</td>
                                                                                        <td>{item.address?item.address:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>申报期限</td>
                                                                                        <td>{item.timeLimit?item.timeLimit:"无"}</td>
                                                                                        <td>未申报项目</td>
                                                                                        <td>{item.project?item.project:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>未申报税种</td>
                                                                                        <td>{item.taxType?item.taxType:"无"}</td>
                                                                                        <td>欠缴税额</td>
                                                                                        <td>{item.money?item.money:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>处罚金额</td>
                                                                                        <td>{item.money2?item.money2:"无"}</td>
                                                                                        <td>处理时间</td>
                                                                                        <td>{item.time?item.time:"无"}</td>
                                                                                    </tr>
                                                                                </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="税务行政处罚决定书信息" key="7">
                                                            {
                                                                JSON.parse(item.content).administrativePunishmentDecisionList==null?
                                                                <p>暂无税务行政处罚决定书信息</p>:
                                                                JSON.parse(item.content).administrativePunishmentDecisionList.map((item,index)=>{
                                                                    return <table cellSpacing={0} style={{marginBottom:10}}>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>违法事实</td>
                                                                                    <td>{item.situation?item.situation:"无"}</td>
                                                                                    <td>处罚时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>处罚类别</td>
                                                                                    <td>{item.punishmentType?item.punishmentType:"无"}</td>
                                                                                    <td>处罚结果</td>
                                                                                    <td>{item.punishmentResult?item.punishmentResult:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>公告时间</td>
                                                                                    <td>{item.openTime?item.openTime:"无"}</td>
                                                                                    <td>生产经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                </tr>
                                                                            </table>
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="税务行政处罚信息" key="8">
                                                            {
                                                                JSON.parse(item.content).administrativePunishmentInfoList==null?
                                                                <p>暂无税务行政处罚信息</p>:
                                                                    JSON.parse(item.content).administrativePunishmentInfoList.map((item,index)=>{
                                                                    return <table cellSpacing={0} style={{marginBottom:10}}>
                                                                                <tr>
                                                                                    <td>纳税人识别号</td>
                                                                                    <td>{item.taxNum?item.taxNum:"无"}</td>
                                                                                    <td>法定代表人（业主）</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>证件类别</td>
                                                                                    <td>{item.type?item.type:"无"}</td>
                                                                                    <td>主管税务机关</td>
                                                                                    <td>{item.unit?item.unit:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>责令限改通知书号</td>
                                                                                    <td>{item.num?item.num:"无"}</td>
                                                                                    <td>责令限改状态</td>
                                                                                    <td>{item.statute?item.statute:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>公告时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                    <td>生产经营地址</td>
                                                                                    <td>{item.address?item.address:"无"}</td>
                                                                                </tr>
                                                                            </table>
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="催欠公告信息" key="9">
                                                            {
                                                                JSON.parse(item.content).netLoanBlacklistLessList==null?
                                                                <p>暂无催欠公告信息</p>:
                                                                JSON.parse(item.content).netLoanBlacklistLessList.map((item,index)=>{
                                                                    return <table cellSpacing={0} style={{marginBottom:10}}>
                                                                                <tr>
                                                                                    <td>催欠金额</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                    <td>催欠状态</td>
                                                                                    <td>{item.statute?item.statute:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>催欠时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </table>
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="网贷逾期信息" key="10">
                                                            {
                                                                JSON.parse(item.content).netLoanBlacklistOverdueList==null?
                                                                <p>暂无网贷逾期信息</p>:
                                                                    JSON.parse(item.content).netLoanBlacklistOverdueList.map((item,index)=>{
                                                                    return <table cellSpacing={0} style={{marginBottom:10}}>
                                                                                <tr>
                                                                                    <td>借入本金</td>
                                                                                    <td>{item.money?item.money:"无"}</td>
                                                                                    <td>逾期笔数</td>
                                                                                    <td>{item.debtNum?item.debtNum:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>借款时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                    <td>逾期总罚息</td>
                                                                                    <td>{item.overdueInterest?item.overdueInterest:"无"}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                    })
                                                            }
                                                            </Panel>
                                                        </Collapse> 
                                                        :item.transactiontype==="145"?
                                                        <Collapse>
                                                            <Panel header="判决文书" key="1">
                                                            {
                                                                JSON.parse(item.content).litigationDecisionList==null?
                                                                <p>暂无判决文书信息</p>:
                                                                JSON.parse(item.content).litigationDecisionList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.title?item.title:"无"} key="1">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>标题</td>
                                                                                        <td>{item.title?item.title:"无"}</td>
                                                                                        <td>审理程序</td>
                                                                                        <td>{item.trialProcedure?item.trialProcedure:
                                                                                            "无"}
                                                                                        </td> 
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>法院</td>
                                                                                        <td>{item.court?item.court:"无"}</td>
                                                                                        <td>文书字号</td>
                                                                                        <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>文书类型</td>
                                                                                        <td>{item.dateTime?item.dateTime:"无"}</td>
                                                                                        <td>审结日期</td>
                                                                                        <td>{item.time?item.time:"无"}</td>
                                                                                    </tr>
                                                                                </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    
                                                                })
                                                            }
                                                            </Panel>
                                                            <Panel header="失信被执行人信息" key="2">
                                                            {
                                                                JSON.parse(item.content).litigationDecisionList==null?
                                                                <p>暂无失信被执行人信息</p>:
                                                                JSON.parse(item.content).litigationDecisionList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.leader?item.leader:"无"} key="1">
                                                                                <table>
                                                                                <tr>
                                                                                    <td>法定代表人/负责人</td>
                                                                                    <td>{item.leader?item.leader:"无"}</td>
                                                                                    <td>住所地</td>
                                                                                    <td>{item.address?item.address:'无'}</td> 
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>执行法院</td>
                                                                                    <td>{item.court?item.court:"无"}</td>
                                                                                    <td>立案时间</td>
                                                                                    <td>{item.time?item.time:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>执行案号</td>
                                                                                    <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                    <td>执行依据文号</td>
                                                                                    <td>{item.base?item.base:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>做出执行依据单位</td>
                                                                                    <td>{item.baseCompany?item.baseCompany:"无"}</td>
                                                                                    <td>生效法律文书确定的义务</td>
                                                                                    <td>{item.obligation?item.obligation:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>生效法律文书确定后履行截止时间</td>
                                                                                    <td>{item.lastTime?item.lastTime:"无"}</td>
                                                                                    <td>被执行人的履行情况</td>
                                                                                    <td>{item.performance?item.performance:"无"}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>实行被执行人行为具体情形</td>
                                                                                    <td>{item.concreteSituation?
                                                                                        item.concreteSituation:"无"}
                                                                                    </td>
                                                                                    <td>认定失信时间</td>
                                                                                    <td>{item.breakTime?item.breakTime:"无"}</td>
                                                                                </tr>
                                                                            </table>
                                                                            </Panel>
                                                                         </Collapse>
                                                                    
                                                                })
                                                            }
                                                            </Panel>
                                                            <Panel header="最高法执行信息" key="3">
                                                            {
                                                                JSON.parse(item.content).litigationSupremeLawList==null?
                                                                <p>暂无最高法执行信息</p>:
                                                                JSON.parse(item.content).litigationSupremeLawList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.court?item.court:"无"} key={index}>
                                                                                    <table style={{marginBottom:20}}>
                                                                                        <tr>
                                                                                            <td>执行法院</td>
                                                                                            <td>{item.court?item.court:"无"}</td>
                                                                                            <td>立案时间</td>
                                                                                            <td>{item.time?item.time:'无'}</td> 
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>执行案号</td>
                                                                                            <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                            <td>案件状态</td>
                                                                                            <td>{item.statute?item.statute:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>执行依据</td>
                                                                                            <td>{item.basic?item.basic:"无"}</td>
                                                                                            <td>做出执行依据的机构</td>
                                                                                            <td>{item.basicCourt?item.basicCourt:"无"} 
                                                                                            </td>
                                                                                        </tr>      
                                                                                    </table>
                                                                                </Panel>
                                                                          </Collapse>   
                                                                })
                                                            }
                                                            </Panel>
                                                            <Panel header="限制高消费被执行人信息" key="4">
                                                            {
                                                                JSON.parse(item.content).litigationSpendingLimitsList==null?
                                                                <p>暂无限制高消费被执行人信息</p>:
                                                            JSON.parse(item.content).litigationSpendingLimitsList.map((item,index)=>{
                                                                return <Collapse style={{marginBottom:10}}>
                                                                            <Panel header={item.leader?item.leader:"无"} key={index}>
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>法定代表人/负责人</td>
                                                                                        <td>{item.leader?item.leader:"无"}</td>
                                                                                        <td>住所地</td>
                                                                                        <td>{item.address?item.address:'无'}</td> 
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>执行法院</td>
                                                                                        <td>{item.court?item.court:"无"}</td>
                                                                                        <td>执行案号</td>
                                                                                        <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>案由</td>
                                                                                        <td>{item.anyou?item.anyou:"无"}</td>
                                                                                        <td>标的</td>
                                                                                        <td>{item.money?item.money:"无"}</td>
                                                                                    </tr> 
                                                                                    <tr>
                                                                                        <td>立案时间</td>
                                                                                        <td>{item.time?item.time:"无"}</td>
                                                                                        <td>发布时间</td>
                                                                                        <td>{item.postTime?item.postTime:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>具体内容</td>
                                                                                        <td>{item.content?item.content:"无"}</td>
                                                                                        <td>执行依据</td>
                                                                                        <td>{item.basic?item.basic:"无"}</td>
                                                                                    </tr>     
                                                                                </table>
                                                                            </Panel>
                                                                        </Collapse>
                                                                })
                                                            }
                                                            </Panel>
                                                            
                                                            <Panel header="限制出境被执行人信息" key="5">
                                                            {
                                                                JSON.parse(item.content).litigationOutboundLimitsList==null?
                                                                <p>暂无限制出境被执行人信息</p>:
                                                                    JSON.parse(item.content).litigationOutboundLimitsList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header="限制出境被执行人信息" key={index}>
                                                                                    <table>
                                                                                        <tr>
                                                                                            <td>被限制人地址</td>
                                                                                            <td>{item.address?item.address:"无"}</td>
                                                                                            <td>边控措施</td>
                                                                                            <td>{item.control?item.control:'无'}</td> 
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>边控日期</td>
                                                                                            <td>{item.controlTime?item.controlTime:"无"}
                                                                                            </td>
                                                                                            <td>承办法院 </td>
                                                                                            <td>{item.court?item.court:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>执行案号</td>
                                                                                            <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                            <td>执行依据</td>
                                                                                            <td>{item.basic?item.basic:"无"}</td>
                                                                                        </tr> 
                                                                                        <tr>
                                                                                            <td>执行标的</td>
                                                                                            <td>{item.money?item.money:"无"}</td>
                                                                                            <td>立案时间</td>
                                                                                            <td>{item.time?item.time:"无"}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>具体内容</td>
                                                                                            <td>{item.content?item.content:"无"}</td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                        </tr>     
                                                                                    </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="老赖信息" key="6">
                                                            {
                                                                JSON.parse(item.content).litigationOldLaiList==null?
                                                                <p>暂无老赖信息</p>:
                                                                    JSON.parse(item.content).litigationOldLaiList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.court?item.court:'无'} key="1">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>失信情形</td>
                                                                                        <td>{item.situation?item.situation:"无"}</td>
                                                                                        <td>执行法院</td>
                                                                                        <td>{item.court?item.court:'无'}</td> 
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>执行案号</td>
                                                                                        <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                        <td>立案时间 </td>
                                                                                        <td>{item.time?item.time:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>发布日期</td>
                                                                                        <td>{item.postTime?item.postTime:"无"}</td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                    </tr>    
                                                                                </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="立案信息" key="7">
                                                            {
                                                                JSON.parse(item.content).litigationFilingList==null?
                                                                <p>暂无立案信息</p>:
                                                                    JSON.parse(item.content).litigationFilingList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.defendant?item.defendant:"无"}
                                                                                 key="1">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>原告(上诉人)</td>
                                                                                        <td>{item.plaintiff?item.plaintiff:"无"}</td>
                                                                                        <td>原审原告</td>
                                                                                        <td>{item.plaintiff2?item.plaintiff2:'无'}</td> 
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>被告(被上诉人)</td>
                                                                                        <td>{item.defendant?item.defendant:"无"}</td>
                                                                                        <td>原审被告 </td>
                                                                                        <td>{item.defendant2?item.defendant2:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>第三人</td>
                                                                                        <td>{item.thirdPeople?item.thirdPeople:"无"}
                                                                                        </td>
                                                                                        <td>原审第三人</td>
                                                                                        <td>{item.thirdPeople2?item.thirdPeople2:"无"}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>受理法院</td>
                                                                                        <td>{item.court?item.court:"无"}</td>
                                                                                        <td>立案时间</td>
                                                                                        <td>{item.time?item.time:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>案由</td>
                                                                                        <td>{item.anYou?item.anYou:"无"}</td>
                                                                                        <td>案号</td>
                                                                                        <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                    </tr>      
                                                                                </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="开庭信息" key="8">
                                                            {
                                                                JSON.parse(item.content).litigationHoldCourtList==null?
                                                                <p>暂无开庭信息</p>:
                                                                    JSON.parse(item.content).litigationHoldCourtList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.court?item.court:"无"} key="1">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>原告(上诉人)</td>
                                                                                        <td>{item.plaintiff?item.plaintiff:"无"}</td>
                                                                                        <td>原审原告</td>
                                                                                        <td>{item.plaintiff2?item.plaintiff2:'无'}</td> 
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>被告(被上诉人)</td>
                                                                                        <td>{item.defendant?item.defendant:"无"}</td>
                                                                                        <td>原审第三人</td>
                                                                                        <td>{item.thirdPeople2?item.thirdPeople2:"无"}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>受理法院</td>
                                                                                        <td>{item.court?item.court:"无"}</td>
                                                                                        <td>开庭时间</td>
                                                                                        <td>{item.time?item.time:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>案由</td>
                                                                                        <td>{item.anYou?item.anYou:"无"}</td>
                                                                                        <td>案号</td>
                                                                                        <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                    </tr>      
                                                                                </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="送达公告" key="9">
                                                            {
                                                                JSON.parse(item.content).litigationServiceAnnouncementList==null?
                                                                <p>暂无送达公告</p>:
                                                                    JSON.parse(item.content).litigationServiceAnnouncementList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={item.title?item.title:"无"} key="1">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>标题</td>
                                                                                        <td>{item.title?item.title:"无"}</td>
                                                                                        <td>送达类型</td>
                                                                                        <td>{item.type?item.type:'无'}</td> 
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>送达内容</td>
                                                                                        <td>{item.content?item.content:"无"}</td>
                                                                                        <td>送达法院</td>
                                                                                        <td>{item.court?item.court:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>刊登媒体</td>
                                                                                        <td>{item.media?item.media:"无"}</td>
                                                                                        <td>刊登日期</td>
                                                                                        <td>{item.time?item.time:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>刊登版面</td>
                                                                                        <td>{item.banmian?item.banmian:"无"}</td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                    </tr>      
                                                                                </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    
                                                                    })
                                                            }
                                                            </Panel>
                                                            <Panel header="其他信息" key="10">
                                                            {
                                                                JSON.parse(item.content).litigationOtherList==null?
                                                                <p>暂无其他信息</p>:
                                                                    JSON.parse(item.content).litigationOtherList.map((item,index)=>{
                                                                    return <Collapse style={{marginBottom:10}}>
                                                                                <Panel header={`${index+1}、其他信息`} key="1">
                                                                                <table>
                                                                            <tr>
                                                                                <td>执行申请人 </td>
                                                                                <td>{item.applyName?item.applyName:"无"}</td>
                                                                                <td>法定代表人/负责人</td>
                                                                                <td>{item.leader?item.leader:'无'}</td> 
                                                                            </tr>
                                                                            <tr>
                                                                                <td>异议申请人</td>
                                                                                <td>{item.applyName2?item.applyName2:"无"}</td>
                                                                                <td>执行法院</td>
                                                                                <td>{item.court?item.court:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>执行案号</td>
                                                                                <td>{item.caseNum?item.caseNum:"无"}</td>
                                                                                <td>执行标的</td>
                                                                                <td>{item.money?item.money:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>未履行标的（万元）</td>
                                                                                <td>{item.money2?item.money2:"无"}</td>
                                                                                <td>执行依据文号</td>
                                                                                <td>{item.basic?item.basic:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>立案时间</td>
                                                                                <td>{item.time?item.time:"无"}</td>
                                                                                <td>执行状态</td>
                                                                                <td>{item.statute?item.statute:"无"}</td>
                                                                            </tr> 
                                                                            <tr>
                                                                                <td>执行依据制作单位</td>
                                                                                <td>{item.unit?item.unit:"无"}</td>
                                                                                <td>公开日期</td>
                                                                                <td>{item.openTime?item.openTime:"无"}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>生效文书确定的义务</td>
                                                                                <td>{item.obligation?item.obligation:"无"}</td>
                                                                                <td>住所地</td>
                                                                                <td>{item.address?item.address:"无"}</td>
                                                                            </tr>       
                                                                        </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    
                                                                    })
                                                            }
                                                            </Panel>
                                                        </Collapse> 
                                                        :item.transactiontype==="150"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无犯罪记录":JSON.parse(item.content).resCode=="1"?
                                                                    "有犯罪记录":"查询异常"}
                                                                </td>
                                                                <td>案发时间</td>
                                                                <td>{JSON.parse(item.content).caseTime?JSON.parse(item.content).caseTime:"无"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>案发描述</td>
                                                                <td>{JSON.parse(item.content).des?JSON.parse(item.content).des:"无"}</td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype==="160"?
                                                        <div>
                                                        {
                                                            !JSON.parse(item.content).certificateVocationalList?"暂无职业资质信息":
                                                                JSON.parse(item.content).certificateVocationalList.map((item,index)=>{
                                                                    return <Collapse>
                                                                                <Panel header={item.occupation?item.occupation:"无"}
                                                                                 key="1">
                                                                                    <table cellSpacing={0}>
                                                                                    <tr>
                                                                                        <td>证书职业名称</td>
                                                                                        <td>{item.occupation?item.occupation:"无"}</td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>姓名</td>
                                                                                        <td>{item.name?item.name:"无"}</td>
                                                                                        <td>证书编号</td>
                                                                                        <td>{item.certificateId?item.certificateId:"无"}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>身份证号</td>
                                                                                        <td>{item.cid?item.cid:"无"}</td>
                                                                                        <td>证书级别</td>
                                                                                        <td>{item.level?item.level:"无"}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>颁证日期</td>
                                                                                        <td>{item.banZhengRiQi?item.banZhengRiQi:"无"}
                                                                                        </td>
                                                                                        <td>证书上报单位</td>
                                                                                        <td>{item.submitOrgName?item.submitOrgName:"无"}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>笔试成绩</td>
                                                                                        <td>{item.textMark?item.textMark:"无"}</td>
                                                                                        <td>上机成绩</td>
                                                                                        <td>{item.operationMark?item.operationMark:"无"}
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                                </Panel>
                                                                            </Collapse>
                                                                    })
                                                                }
                                                        </div>
                                                        :item.transactiontype==="122"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype==="123"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype==="200"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype==="201"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype==="210"?
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>:item.transactiontype==="211" &&
                                                        <table cellSpacing={0}>
                                                            <tr>
                                                                <td>查询结果</td>
                                                                <td>
                                                                    {JSON.parse(item.content).resCode=="0"?
                                                                    "无相关记录":JSON.parse(item.content).resCode=="1"?
                                                                    "匹配成功":"查询异常"}
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </table>
                                                        }
                                                    </div>
                                            </Panel> 
                                })
                            }        
                        </Collapse>: <h4 style={{paddingLeft:50,color:'#AFAFAF'}}>暂未查询到相关信息...</h4>  } 
                    </div>
                </div>
               
                { DataObject.cerditcerinfo && DataObject.cerditcerinfo.length!=0 &&
                <div className="inverst-field">
                    <div className="inverst-item info-field" style={{width:1033}}>
                        <h3 className="title">
                            职业证书信息核查
                        </h3>
                        <Collapse defaultActiveKey={['1']} style={{width:890,margin:"0 auto"}}>
                            {DataObject.cerditcerinfo.map((item,index)=>{
                                return <Panel header={`${item.occupation}证书信息`} key={index+1}>
                                        <div className="superior-content" style={{padding: "27px 0 0 78px"}}>
                                            <ul className="field-list inline-block">
                                                <li>
                                                    <span>姓名</span>
                                                    <span>{item.name}</span>
                                                </li>
                                                <li>
                                                    <span>性别</span>
                                                    <span></span>
                                                </li>
                                                <li>
                                                    <span>文化程度</span>
                                                    <span>{item.level}</span>
                                                </li>
                                                <li>
                                                    <span>身份证号</span>
                                                    <span>{item.card}</span>
                                                </li>
                                                <li>
                                                    <span>数据上报单位</span>
                                                    <span></span>
                                                </li>
                                            </ul>  
                                            <ul className="field-list inline-block" style={{left: 490}}>
                                                <li>
                                                    <span>职业名称</span>
                                                    <span>{item.occupation}</span>
                                                </li>
                                                <li>
                                                    <span>评定级别</span>
                                                    <span>{item.certlevel}</span>
                                                </li>
                                                <li>
                                                    <span>评定成绩</span>
                                                    <span></span>
                                                </li>
                                                <li>
                                                    <span>证书编号</span>
                                                    <span></span>
                                                </li>
                                                <li>
                                                    <span>发证日期</span>
                                                    <span>{item.createdate}</span>
                                                </li>
                                            </ul>  
                                        </div>
                                    </Panel>
                                })
                            }   
                        </Collapse>
                          
                    </div>
                </div>
                }
                {DataObject.dishonest && DataObject.dishonest.length!=0 && 
                <div className="inverst-field">
                    <div className="inverst-item info-field" style={{width:1033}}>
                        <h3 className="title">
                            失信被执行信息核查
                        </h3>
                        <Collapse defaultActiveKey={['1']} style={{width:890,margin:"0 auto"}}>
                            {DataObject.dishonest.map((item,index)=>{
                                return <Panel header={`${item.courtname}核查`} key={index+1}>
                                            <div className="superior-content" style={{
                                            padding: "10px 0 0 8px"
                                        }}>
                                            <table cellSpacing={0}>
                                                <tr>
                                                    <td>被执行人名称</td>
                                                    <td>{item.name}</td>
                                                    <td>身份证号/组织机构代码</td>
                                                    <td>{item.card}</td>
                                                </tr>
                                                <tr>
                                                    <td>年龄</td>
                                                    <td>{item.age}</td>
                                                    <td>性别</td>
                                                    <td>{item.sexy}</td>
                                                </tr>
                                                <tr>
                                                    <td>执行法院</td>
                                                    <td>{item.courtname}</td>
                                                    <td>省份</td>
                                                    <td>{item.areaname}</td>
                                                </tr>
                                                <tr>
                                                    <td>执行依据文号</td>
                                                    <td>{item.casecode}</td>
                                                    <td>作出执行依据单位</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>案号</td>
                                                    <td>{item.casecode}</td>
                                                    <td>立案时间</td>
                                                    <td>{item.createdate}</td>
                                                </tr>
                                                <tr>
                                                    <td>生效法律文书确定的义务</td>
                                                    <td colSpan={3}>{item.disrupttypename}</td>
                                                </tr>
                                                <tr>
                                                    <td>被执行人的履行情况</td>
                                                    <td colSpan={3}>{item.performance}</td>
                                                </tr>
                                                <tr>
                                                    <td>失信被执行人行为情形</td>
                                                    <td colSpan={3}>{item.duty}</td>
                                                </tr>
                                                <tr>
                                                    <td>发布时间</td>
                                                    <td colSpan={3}>{item.publishdate}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Panel>
                                })
                            }  
                        </Collapse>  
                    </div>
                </div>
                }
                {/* <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            网贷黑名单核查
                            <span className="pull-right">网贷黑名单核查</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}>
                            <p className='above-all'>
                            基于51招聘云大数据及网贷黑名单匹配核查，未发现该被调人信息。
                            </p>
                        </div>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            职场信用核查
                            <span className="pull-right">数据来源职场黑名单</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}>
                            <p className='above-all'>
                            基于51招聘云大数据及职场黑名单匹配核查，未发现该被调人信息。
                            </p>
                        </div>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            企业经营核查
                            <span className="pull-right">数据来源中国工商局</span>
                        </div>
                        <div className="superior-content" style={{
                            padding: "10px 0 0 8px"
                        }}>
                            <p className='above-all'>
                            基于51招聘云大数据及工商局信息匹配核查，未发现该被调人企业注册经营信息。
                            </p>
                        </div>
                    </div>
                </div> */}
            </li>
        )
    }
}
const mapStateToProps = state => ({
    creditData: state.Manage.creditData,
    creditInfoData: state.Manage.creditInfoData,
    isDataLoading: state.Manage.isDataLoading,
    isFill: state.Manage.isFill,
    searchLoading: state.Manage.searchLoading,
    queryEmployeeList: state.Manage.queryEmployeeList,
})

const mapDispatchToProps = dispatch => ({
    showcredit:bindActionCreators(Actions.ManageActions.showcredit, dispatch),
    searchCredit: bindActionCreators(Actions.ManageActions.searchCredit, dispatch)   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditReturnComponent)