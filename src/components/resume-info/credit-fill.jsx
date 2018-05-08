import React, {Component, PropTypes} from 'react';
import { Input, Button, Card, Row, Col,Upload ,Icon , Select, Collapse,notification} from 'antd';
const Panel = Collapse.Panel;
import axios from 'axios';

import clerkInfo from 'data/clerk/clerk';
const {cardList} = clerkInfo.creditInvestgation.cardList;
import LoadingComponent from 'components/loading';

import {ErrorInputComponent} from 'components/manager/clerk/input-select-time';
import store from 'store';
import pickBy from 'lodash/pickBy';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class CreditFillComponent extends Component {

     state = {
        name:'',
        mobile:'',
        card:'',
        certid:'',
        rid:'',
        resumeid:'',
        searchLoading:false,
        fileList:[],
        dataType:"简历文件",
        resume:"",
        authorizationFile:"",
        graduationFile:"",
        degreeFile:"",
        overseasEducationFile:"",
        certificateVocationalFile:"",
        transactionType:"",
        disableState:false ,
        border:false,

        idcard:"",
        highEducate:"",
        commercialProfit:"",
        financialRisk:"",
        lawCourt:"",
        badRecord:"",
        workplace:"",

        homeWork:"",
        globalWork:"",
        homeExpress:"",
        globalExpress:"",
        educate:"",
        globalEducate:""
     }

     handleChange = (field,e) => {
         switch(field)
            {
            case 'name':
                this.setState({
                    [field]:this.refs.candidatenameInput.refs.input.refs.input.value
                })
            break;
            case 'mobile':
                this.setState({
                    [field]:this.refs.phonenumInput.refs.input.refs.input.value
                })
            break;
            case 'card':
                this.setState({
                    [field]:this.refs.idnumInput.refs.input.refs.input.value
                })
            break;
            case 'certid':
                this.setState({
                    [field]:this.refs.diplomanumInput.refs.input.refs.input.value
                })
            break;
            }
    }
     componentWillReceiveProps(nextprops){
            const {searchLoading ,data={},creditData,queryEmployeeList} = nextprops;
            const{
                username,
                resumeid
            } = data.resumeInfo;
            if(data!={}){
                this.setState({
                    isLoading:false
                })
            }
            if(resumeid){
                this.setState({
                    name:username,
                    resumeid
                })
            }
            this.setState({
                searchLoading
            })
    }
    searchCredit = () => {
        const {
            searchCredit,
            data,
            showcredit,
            creditData
        }=this.props;
        const {
            name,
            mobile,
            card,
            certid,
            resume,
            authorizationFile,
            graduationFile,
            overseasEducationFile,

            idcard,
            highEducate,
            commercialProfit,
            financialRisk,
            lawCourt,
            badRecord,
            workplace,

            homeWork,
            globalWork,
            homeExpress,
            globalExpress,
            educate,
            globalEducate
        }= this.state;
        //检验必选项是否为空
        if(!mobile){
            this.refs.phonenumInput.triggerError(true);
            notification.warning({
                message:"请输入手机号！"
            })
            return false
        }
        if(!card){
            this.refs.idnumInput.triggerError(true);
            this.refs.idnumInput.refs.input.focus();
            notification.warning({
                message:"请输入身份证号！"
            })
            return false
        }
        if(!certid && highEducate){
            this.refs.diplomanumInput.triggerError(true);
            this.refs.diplomanumInput.refs.input.focus();
            notification.warning({
                message:"请输入毕业证书号！"
            })
            return false
        }
        if(homeWork || globalWork || homeExpress || globalExpress || educate || globalEducate){
            if(!resume){
                notification.warning({
                    message:"请上传简历文件！"
                })
                return false
            }else if(!authorizationFile){
                notification.warning({
                    message:"请上传授权证明文件附件！"
                })
                return false
            } 
        }
        if(educate && !graduationFile){ 
            notification.warning({
                message:"请上传学历证书！"
            })
            return false  
        }
        if(globalEducate && !overseasEducationFile){
            notification.warning({
                message:"请上传海外学历证书！"
            });
            return false
        }
        
        //已选方案
        const arr =[];
        //已选方案转为数字代替
        const numArr = [];
        arr.push(idcard,highEducate,commercialProfit,financialRisk,lawCourt,badRecord,workplace,homeWork,globalWork,homeExpress,globalExpress,educate,globalEducate)

        for(let i=0;i<arr.length;i++){
            switch(arr[i])
                {
                case "身份证信息核查":
                    numArr.push('100')
                break;
                case "国内最高学历核实":
                    numArr.push('120')
                break;
                case "国内学历核实":
                    numArr.push('122')
                break;
                case "海外学历核实":
                    numArr.push('123')
                break;
                case "商业利益冲突核查":
                    numArr.push('130')
                break;
                case "金融风险核查":
                    numArr.push('140')
                break;
                case "法院诉讼核查":
                    numArr.push('145')
                break;
                case "不良记录核查":
                    numArr.push('150')
                break;
                case "职业资质核查":
                    numArr.push('160')
                break;
                case "国内工作履历核实":
                    numArr.push('200')
                break;
                case "海外工作履历核实":
                    numArr.push('201')
                break;
                case "国内工作表现访谈":
                    numArr.push('210')
                break;
                case "海外工作表现访谈":
                    numArr.push('211')
                break;    
                    }
        }
        //已选调查方案
        const numString = numArr.join(",")
        //过滤需要的参数
        const filterObj = pickBy(this.state,(val,key)=>{
            return  key=== 'graduationFile' || key=== 'degreeFile' || key=== 'overseasEducationFile' || key=== 'certificateVocationalFile' || key=== 'resumeid' || key=== 'name' || key=== 'card' || key=== 'certid' || key=== 'resume' || key=== 'authorizationFile' || key=== 'rid'
        });
        //过滤不为空的参数
        const filterdata = pickBy(filterObj,(val,key)=>{
            return  val !=="" 
        });
        //新建需要参数的对象
        const addData = {phone:mobile,transactionType:numString};
        //合并请求需要的对象参数
        const requiredata = Object.assign(filterdata,addData);
        //判断是否已选调查方案
        if(!numString){
            notification.warning({
                message:"请选择调查方案！"
            })
            return false
        }
        this.setState({
            searchLoading:true,
        })
        //开始调查
        searchCredit(requiredata,showcredit);
    }
    //快速核查项
    onClick = (value) => {
        if(value==="身份证信息核查"){
            $('.idcard').css({"color":"#BDC5D4"});
            $('.idcard i').css({"color":"#BDC5D4"});
            this.setState({
                idcard:"身份证信息核查"
            })
        }else if(value==="国内最高学历核实"){
            $('.highEducate').css({"color":"#BDC5D4"});
            $('.highEducate i').css({"color":"#BDC5D4"});
            this.setState({
                highEducate:"国内最高学历核实",
            })
        }else if(value==="商业利益冲突核查"){
            $('.commercialProfit').css({"color":"#BDC5D4"});
            $('.commercialProfit i').css({"color":"#BDC5D4"});
            this.setState({
                commercialProfit:"商业利益冲突核查"
            })
        }else if(value==="金融风险核查"){
            $('.financialRisk').css({"color":"#BDC5D4"});
            $('.financialRisk i').css({"color":"#BDC5D4"});
            this.setState({
                financialRisk:"金融风险核查"
            })
        }else if(value==="法院诉讼核查"){
            $('.lawCourt').css({"color":"#BDC5D4"});
            $('.lawCourt i').css({"color":"#BDC5D4"});
            this.setState({
                lawCourt:"法院诉讼核查"
            })
        }else if(value==="不良记录核查"){
            $('.badRecord').css({"color":"#BDC5D4"});
            $('.badRecord i').css({"color":"#BDC5D4"});
            this.setState({
                badRecord:"不良记录核查"
            })
        }else if(value==="职业资质核查"){
            $('.workplace').css({"color":"#BDC5D4"});
            $('.workplace i').css({"color":"#BDC5D4"});
            this.setState({
                workplace:"职业资质核查"
            })
        }
    }
    //人工核查项
    onWorkClick = (value) => {
        if(value==="homeWork"){
            $('.homeWork').css({"color":"#BDC5D4"});
            $('.homeWork i').css({"color":"#BDC5D4"});
            this.setState({
                homeWork:"国内工作履历核实"
            })
        }else if(value==="globalWork"){
            $('.globalWork').css({"color":"#BDC5D4"});
            $('.globalWork i').css({"color":"#BDC5D4"});
            this.setState({
                globalWork:"海外工作履历核实"
            })
        }else if(value==="homeExpress"){
            $('.homeExpress').css({"color":"#BDC5D4"});
            $('.homeExpress i').css({"color":"#BDC5D4"});
            this.setState({
                homeExpress:"国内工作表现访谈"
            })
        }else if(value==="globalExpress"){
            $('.globalExpress').css({"color":"#BDC5D4"});
            $('.globalExpress i').css({"color":"#BDC5D4"});
            this.setState({
                globalExpress:"海外工作表现访谈"
            })
        }else if(value==="educate"){
            $('.educate').css({"color":"#BDC5D4"});
            $('.educate i').css({"color":"#BDC5D4"});
            this.setState({
                educate:"国内学历核实"
            })
        }else if(value==="globalEducate"){
            $('.globalEducate').css({"color":"#BDC5D4"});
            $('.globalEducate i').css({"color":"#BDC5D4"});
            this.setState({
                globalEducate:"海外学历核实"
            })
        }
    }
    //快速核查项删除
    onRemove = (field) => {
        this.setState({
            [field]:""
        })
        if(field==="idcard"){
            $('.idcard').css({"color":"#595959"});
            $('.idcard i').css({"color":"#3188ff"});
        }else if(field==="highEducate"){
            $('.highEducate').css({"color":"#595959"});
            $('.highEducate i').css({"color":"#3188ff"});
        }else if(field==="commercialProfit"){
            $('.commercialProfit').css({"color":"#595959"});
            $('.commercialProfit i').css({"color":"#3188ff"});
        }else if(field==="financialRisk"){
            $('.financialRisk').css({"color":"#595959"});
            $('.financialRisk i').css({"color":"#3188ff"});
        }else if(field==="lawCourt"){
            $('.lawCourt').css({"color":"#595959"});
            $('.lawCourt i').css({"color":"#3188ff"});
        }else if(field==="badRecord"){
            $('.badRecord').css({"color":"#595959"});
            $('.badRecord i').css({"color":"#3188ff"});
        }else if(field==="workplace"){
            $('.workplace').css({"color":"#595959"});
            $('.workplace i').css({"color":"#3188ff"});
        } 
    }
    //人工核查项删除
    onworkRemove = (field) => {
        this.setState({
            [field]:""
        })
        if(field==="homeWork"){
            $('.homeWork').css({"color":"#595959"});
            $('.homeWork i').css({"color":"#3188ff"});
        }else if(field==="globalWork"){
            $('.globalWork').css({"color":"#595959"});
            $('.globalWork i').css({"color":"#3188ff"});
        }else if(field==="homeExpress"){
            $('.homeExpress').css({"color":"#595959"});
            $('.homeExpress i').css({"color":"#3188ff"});
        }else if(field==="globalExpress"){
            $('.globalExpress').css({"color":"#595959"});
            $('.globalExpress i').css({"color":"#3188ff"});
        }else if(field==="educate"){
            $('.educate').css({"color":"#595959"});
            $('.educate i').css({"color":"#3188ff"});
        }else if(field==="globalEducate"){
            $('.globalEducate').css({"color":"#595959"});
            $('.globalEducate i').css({"color":"#3188ff"});
        }
    }

    // 文件上传之前的钩子函数
    onFilebeforeUpload = (file) => {
       const {error,fileList} = this.state,
            {name,size} = file;
       const matchName = /(\.html|\.xls|\.xlsx|\.xlsm|\.mht|\.htm|\.doc|\.docx|\.pdf)$/i;
         if(!matchName.test(name)){
                notification.warning({
                    message: '文件类型暂不支持！'
                    });
                return false;
        }
         if(size > 3*1024*1024){
                notification.warning({
                    message: '文件大小不能超过3MB！'
                    });
                return false;
            }
            return true;
        }   
    

    // 上传文件改变时的状态
    onFileChange = info =>{
        const {dataType} = this.state;
        let fileList = info.fileList;
        if (info.file.status === 'error') {
            notification.error({
                message: '文件上传失败！'
              });
        }
        switch(dataType)
            {
            case "简历文件":
                this.setState({
                    fileList,
                    resume:fileList[0].response
                });
            break;
            case "授权证书文件":
                this.setState({
                    fileList,
                    authorizationFile:fileList[0].response
                });
            break;
            case "学历证书":
                this.setState({
                    fileList,
                    graduationFile:fileList[0].response
                });
            break;
            case "学信证书":
                this.setState({
                    fileList,
                    degreeFile:fileList[0].response
                });
            break;
            case "海外学历证书":
                this.setState({
                    fileList,
                    overseasEducationFile:fileList[0].response
                });
            break;
            case "职位资格证书":
                this.setState({
                    fileList,
                    certificateVocationalFile:fileList[0].response
                });
            break; 
            }
    }

    // 文件移除
    onFileRemove = file => {
        this.setState({
            fileList:[]
        })
    }
    //选择上传文件类型
    handleSelectChange = (value) => {
        const {
            resume,
            authorizationFile,
            graduationFile,
            degreeFile,
            overseasEducationFile,
            certificateVocationalFile
        } = this.state;
        if(value==="简历文件" && resume || 
            value==="授权证书文件" && authorizationFile || 
            value==="学历证书" && graduationFile
            || value==="学信证书" && degreeFile || 
            value==="海外学历证书" && overseasEducationFile || 
            value==="职位资格证书" && certificateVocationalFile){
                notification.warning({
                    message:"该类型文件已存在！"
                })
                return false
        }
        this.setState({
            dataType:value,
            fileList:[],
            border:false
        })
    }
    //上传文件点击
    UploadFile = () => {
        const {
            fileList,
            dataType,
            resume,
            authorizationFile,
            graduationFile,
            degreeFile,
            overseasEducationFile,
            certificateVocationalFile
        } = this.state;
        
        if(fileList.length!=0){
            this.setState({
                border:true
            })
            notification.warning({
                message: '每种文件类型一次只能上传一个文件！'
            });
        }
    }
    //删除上传文件
    deleteFile = (value) => {
        switch(value)
            {
            case "简历文件":
                this.setState({
                    resume:"",
                    fileList:[]
                })
            break;
            case "授权证书文件":
                this.setState({
                    authorizationFile:"",
                    fileList:[]
                })
            break;
            case "学历证书":
                this.setState({
                    graduationFile:"",
                    fileList:[]
                })
            break;
            case "学信证书":
                this.setState({
                    degreeFile:"",
                    fileList:[]
                })
            break;
            case "海外学历证书":
                this.setState({
                    overseasEducationFile:"",
                    fileList:[]
                })
            break;
            case "职业资格证书":
                this.setState({
                    certificateVocationalFile:"",
                    fileList:[]
                })
            break;
            }
    }
     render(){
         const {
            name,
            mobile,
            card,
            certid,
            searchLoading,
            isLoading=true,
            fileList=[],
            dataType,
            resume,
            authorizationFile,
            graduationFile,
            degreeFile,
            overseasEducationFile,
            certificateVocationalFile,
            disableState,
            border,

            idcard,
            highEducate,
            commercialProfit,
            financialRisk,
            lawCourt,
            badRecord,
            workplace,

            homeWork,
            globalWork,
            homeExpress,
            globalExpress,
            educate,
            globalEducate
         } = this.state;
         const {creditData , data}=this.props;
         return(
             <li>
                 <div className="fill-field" style={{height:1000}}>
                    <Collapse defaultActiveKey={['1','2']} style={{height:1160}}>
                        <Panel header="第一步：候选人信息" key="1">
                        <div className="basic-input">
                            {isLoading &&
                                <LoadingComponent style={{
                                    position: 'absolute',
                                    top: 100,
                                    left:'40%',
                                    height: '5%',
                                    width: '10%',
                                    zIndex: 2
                                }} />
                            }
                            <ul>
                                <li style={{paddingBottom: 40,width:450}}>
                                    <ErrorInputComponent
                                        ref="candidatenameInput"
                                        name="姓名："
                                        field="candidatename"
                                        value={name}
                                        onChange={this.handleChange.bind(this,'name')}
                                        asterisk={true}
                                    />
                                </li>
                                <li style={{paddingBottom: 40,width:450}}>
                                    <ErrorInputComponent
                                        ref="phonenumInput"
                                        name="手机号："
                                        placeholder="请输入手机号"
                                        field="phonenum"
                                        value={mobile}
                                        onChange={this.handleChange.bind(this,'mobile')}
                                        asterisk={true}
                                    />
                                </li>
                                <li style={{paddingBottom: 25,width:450}}>
                                    <ErrorInputComponent
                                        ref="idnumInput"
                                        name="身份证号："
                                        placeholder="请输入身份证号"
                                        field="idnum"
                                        value={card}
                                        onChange={this.handleChange.bind(this,'card')}
                                        asterisk={true}
                                    />
                                </li >
                                <li style={{paddingBottom: 25,width:450}}>
                                    <ErrorInputComponent
                                        ref="diplomanumInput"
                                        name="毕业证书号："
                                        field="diplomanum"
                                        placeholder="请输入毕业证书号"
                                        value={certid}
                                        onChange={this.handleChange.bind(this,'certid')}
                                    />
                                </li>
                            </ul>
                        </div>
                        
                        </Panel>
                        <Panel header="第二步：选择调查方案" key="2">
                            <div className="hint-field" style={{float:"left",width:600}}>
                                <div className="card-list" style={{width:650,borderRight: "1px solid #e3e1e1"}}>
                                    <span 
                                        style={{color:"#108ee9",display:"block",marginBottom:20}}>
                                        ●&nbsp;&nbsp;快速核查
                                    </span>
                                    <ul>
                                        <li 
                                            title="点击选择"
                                            className="idcard" 
                                            onClick={this.onClick.bind(this,"身份证信息核查","100")}
                                        >
                                            <i className="iconfont">&#xe613;</i><br/>
                                            <span>身份证信息核查</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="highEducate" 
                                            onClick={this.onClick.bind(this,"国内最高学历核实","120")}
                                        >
                                            <i className="iconfont i">&#xe69e;</i><br/>
                                            <span>国内最高学历核实<br/>（02年以后毕业）</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="commercialProfit" 
                                            onClick={this.onClick.bind(this,"商业利益冲突核查","130")}
                                        >
                                            <i className="iconfont i">&#xe602;</i><br/>
                                            <span>商业利益冲突核查</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="financialRisk" 
                                            onClick={this.onClick.bind(this,"金融风险核查","140")}
                                        >
                                            <i className="iconfont">&#xe63c;</i><br/>
                                            <span>金融风险核查</span>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="lawCourt"
                                            onClick={this.onClick.bind(this,"法院诉讼核查","145")}
                                        >
                                            <i className="iconfont">&#xe655;</i><br/>
                                            <span>法院诉讼核查</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="badRecord" 
                                            onClick={this.onClick.bind(this,"不良记录核查","150")}
                                        >
                                            <i className="iconfont">&#xe738;</i><br/>
                                            <span>不良记录核查</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="workplace" 
                                            onClick={this.onClick.bind(this,"职业资质核查","160")}
                                        >
                                            <i className="iconfont">&#xe506;</i><br/>
                                            <span>职业资质核查</span><br/>
                                        </li>
                                    </ul>   
                                </div>
                                <div className="card-list" style={{height:570,width:650,borderRight: "1px solid #e3e1e1"}}>
                                    <span 
                                        style={{color:"#108ee9",display:"block",marginBottom:20,marginTop:20}}>
                                        ●&nbsp;&nbsp;人工核查(3-5个工作日)
                                    </span>
                                    <ul className="peopleSearch">
                                        <li 
                                            title="点击选择"
                                            className="educate"
                                            onClick={this.onWorkClick.bind(this,"educate")}
                                        >
                                            <i className="iconfont i">&#xe69e;</i><br/>
                                            <span>国内学历核实</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="globalEducate" 
                                            onClick={this.onWorkClick.bind(this,"globalEducate")}
                                        >
                                            <i className="iconfont i">&#xe69e;</i><br/>
                                            <span>海外学历核实</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="homeWork" 
                                            onClick={this.onWorkClick.bind(this,"homeWork")}
                                        >
                                            <i className="iconfont">&#xe646;</i><br/>
                                            <span>国内工作履历核实</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择" 
                                            className="globalWork"
                                            onClick={this.onWorkClick.bind(this,"globalWork")} 
                                        >
                                            <i className="iconfont">&#xe646;</i><br/>
                                            <span>海外工作履历核实</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择"
                                            className="homeExpress" 
                                            onClick={this.onWorkClick.bind(this,"homeExpress")}
                                        >
                                            <i className="iconfont">&#xe625;</i><br/>
                                            <span>国内工作表现访谈</span><br/>
                                        </li>
                                        <li 
                                            title="点击选择" 
                                            className="globalExpress"
                                            onClick={this.onWorkClick.bind(this,"globalExpress")}
                                        >
                                            <i className="iconfont">&#xe625;</i><br/>
                                            <span>海外工作表现访谈</span><br/>
                                        </li>
                                    </ul>
                                    <div className="inline-block"
                                        style={{
                                            left: 516,
                                            width: 422,
                                            paddingLeft: 37,
                                            marginTop: 30
                                        }}>
                                        <div className="hint-field" style={{textAlign: "center"}}>
                                            <div className="resumeSource">
                                                <span>选择上传文件类型：</span>
                                                <Select
                                                    ref="fileSelect"
                                                    className={border?"borderState":"borderNoneState"}
                                                    style={{ width: 200,height:50,color:'#868686' }}
                                                    placeholder="请选择上传文件类型"
                                                    value={dataType}
                                                    onChange={this.handleSelectChange}
                                                >
                                                    {
                                                        ["简历文件","授权证书文件","学历证书","学信证书","海外学历证书","职位资格证书"].map((item)=>{
                                                            return  <Option value={item}>{item}</Option>
                                                        })
                                                    }

                                                </Select>
                                            </div>
                                            <div className="hint-list" style={{width: 385}}>
                                                <span className="span-title">候选人文件上传：</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Upload
                                                    name='file'
                                                    disabled={fileList.length==0?false:true}
                                                    action="http://www.jztest.cc/JZSystem/jz/file/upload.action"
                                                    fileList={fileList}
                                                    beforeUpload={this.onFilebeforeUpload}
                                                    onChange={this.onFileChange}
                                                    onRemove={this.onFileRemove}
                                                >
                                                    <Icon 
                                                        className="upLoad"
                                                        type="upload" 
                                                        title="请先选择要上传的文件类型再上传"
                                                        onClick= {this.UploadFile}
                                                    />
                                                </Upload>
                                                <span className="explaination" style={{position:"relative"}}>
                                                    <span>温馨提示：</span>请先选择要上传的文件类型再上传文件，
                                                    <span style={{color:"red"}}>候选人简历文件和授权证书文件为必须上传文件</span>，
                                                    其他为可选上传文件，文件支持.doc, .docx, .pdf等文件格式，文件大小应小于3MB;
                                                </span>
                                            </div>
                                            
                                            <div 
                                                className="uploadFile"
                                                style={{position:"relative",width:400,textAlign:"left"}}>
                                                已上传文件类型列表：
                                                {!resume && !authorizationFile && !graduationFile && !degreeFile && !overseasEducationFile && !certificateVocationalFile && <a>暂无上传文件</a> }
                                                <span>
                                                    {resume?<a>&nbsp;&nbsp;简历文件&nbsp;&nbsp;<b title="点击删除"  onClick={this.deleteFile.bind(this,"简历文件")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                                <span>
                                                    {authorizationFile?<a>&nbsp;&nbsp;授权证书文件&nbsp;&nbsp;<b title="点击删除" onClick={this.deleteFile.bind(this,"授权证书文件")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                                <span>
                                                    {graduationFile?<a>&nbsp;&nbsp;学历证书&nbsp;&nbsp;<b title="点击删除" onClick={this.deleteFile.bind(this,"学历证书")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                                <span>
                                                    {degreeFile?<a>&nbsp;&nbsp;学信证书&nbsp;&nbsp;<b title="点击删除"  onClick={this.deleteFile.bind(this,"学信证书")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                                <span>
                                                    {overseasEducationFile?<a>&nbsp;&nbsp;海外学历证书&nbsp;&nbsp;<b title="点击删除" onClick={this.deleteFile.bind(this,"海外学历证书")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                                <span>
                                                    {certificateVocationalFile?<a>&nbsp;&nbsp;职业资格证书&nbsp;&nbsp;<b title="点击删除" onClick={this.deleteFile.bind(this,"职业资格证书")}>×</b>&nbsp;&nbsp;</a>:""}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="SurveyPlan" style={{width:252,height:850}}>
                                <p className="p-title">已选调查方案</p>
                                <div className="data">
                                    <div className="basicData" style={{width:250,height:300}}>
                                        <span 
                                            style={{
                                                color:"#108ee9",
                                                display:"block",
                                                marginBottom:20,
                                                marginTop:20,
                                                float:"left"
                                            }}
                                        >
                                             ●&nbsp;&nbsp;快速核查
                                       </span>
                                       <ul className="basicDataUl" style={{overflow:"hidden",marginTop:16,paddingLeft:0}}  onClick={this.onRemove}>
                                           <li>
                                                {idcard?
                                                    <a>&nbsp;&nbsp;{idcard}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onRemove.bind(this,"idcard")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {highEducate?
                                                    <a>&nbsp;&nbsp;{highEducate}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onRemove.bind(this,"highEducate")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {commercialProfit?
                                                    <a>&nbsp;&nbsp;{commercialProfit}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onRemove.bind(this,"commercialProfit")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {financialRisk?
                                                    <a>&nbsp;&nbsp;{financialRisk}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onRemove.bind(this,"financialRisk")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {lawCourt?
                                                    <a>&nbsp;&nbsp;{lawCourt}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onRemove.bind(this,"lawCourt")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {badRecord?
                                                    <a>&nbsp;&nbsp;{badRecord}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onRemove.bind(this,"badRecord")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {workplace?
                                                    <a>&nbsp;&nbsp;{workplace}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onRemove.bind(this,"workplace")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                       </ul>
                                    </div>
                                    <div className="work" style={{width:250,height:320}}>
                                        <span 
                                            style={{
                                                color:"#108ee9",
                                                display:"block",
                                                marginBottom:20,
                                                marginTop:20
                                            }}
                                        >
                                                ●&nbsp;&nbsp;人工核查
                                        </span>
                                        <ul className="workUl" style={{overflow:"hidden",marginTop:16,height:300,paddingLeft:0}}>
                                            <li>
                                                {homeWork?
                                                    <a>&nbsp;&nbsp;{homeWork}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onworkRemove.bind(this,"homeWork")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {globalWork?
                                                    <a>&nbsp;&nbsp;{globalWork}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onworkRemove.bind(this,"globalWork")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {homeExpress?
                                                    <a>&nbsp;&nbsp;{homeExpress}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onworkRemove.bind(this,"homeExpress")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {globalExpress?
                                                    <a>&nbsp;&nbsp;{globalExpress}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onworkRemove.bind(this,"globalExpress")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {educate?
                                                    <a>&nbsp;&nbsp;{educate}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onworkRemove.bind(this,"educate")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                           <li>
                                                {globalEducate?
                                                    <a>&nbsp;&nbsp;{globalEducate}&nbsp;&nbsp;
                                                        <b 
                                                        title="点击删除"  
                                                        onClick={this.onworkRemove.bind(this,"globalEducate")}
                                                        >×</b>&nbsp;&nbsp;
                                                    </a>:""
                                                }
                                           </li>
                                       </ul>
                                    </div>
                                </div>
                                <div className="bottomBtn" style={{textAlign:"center"}}>
                                    <Button
                                        loading={searchLoading}
                                        type="primary" 
                                        onClick={this.searchCredit}
                                        style={{width:150,height:40,fontSize:16}}
                                    >
                                    开始调查
                                    </Button>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                 </div>
             </li>
         )
     }
 }
 const mapStateToProps = state => ({
    creditData: state.Manage.creditData,
    creditInfoData: state.Manage.creditInfoData,
    isFill: state.Manage.isFill,
    searchLoading: state.Manage.searchLoading,
    queryEmployeeList: state.Manage.queryEmployeeList,
    data: state.Resume.resumeInfo,
})

const mapDispatchToProps = dispatch => ({
    showcredit:bindActionCreators(Actions.ManageActions.showcredit, dispatch),
    searchCredit: bindActionCreators(Actions.ManageActions.searchCredit, dispatch)   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditFillComponent)
