import React, {Component} from 'react';
import ClerkInfo from 'data/clerk/clerk';
import moment from 'moment';

import {Input , Button ,Select ,DatePicker} from 'antd';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

import LoadingComponent from 'components/loading';
import nation from 'data/select/nation.json';
import education from 'data/select/education.json';

export default class PersonalInfo extends Component {
    state = {
        btnState:'none',
        borderState:"1px solid transparent",
        isdisabled:true,
        eduBtnState:'none',
        eduBorderState:"1px solid transparent",
        isEdudisabled:true,
    }
    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.data)){
            const {
                name,                   //姓名
                documenttype,           //证件类型
                mobile,                 //手机号
                birthday,               //生日
                married,                //是否已婚
                national,               //民族
                natives,                //籍贯
                accounttype,            //户口类型
                englishname,            //英文名
                card,                   //证件号码
                workemail,              //个人邮箱
                sex,                    //性别
                children,               //是否已育
                political,              //政治面貌
                city,                   //户籍城市
                tolive,                 //居住地址
                schooling,              //最高学历
                professional,           //专业
                degree,                 //学位
                school,                 //毕业学校
                schendtime,             //毕业时间
                recruitment,            //是否统招
                rid
            } = nextProps.data;
            if(rid){
                this.setState({
                    isLoading:false
                })
            }
            this.setState({
                name,                   //姓名
                documenttype,           //证件类型
                mobile,                 //手机号
                birthday,               //生日
                married,                //是否已婚
                national,               //民族
                natives,                //籍贯
                accounttype,            //户口类型
                englishname,            //英文名
                card,                   //证件号码
                workemail,              //个人邮箱
                sex,                    //性别
                children,               //是否已育
                political,              //政治面貌
                city,                   //户籍城市
                tolive,                 //居住地址
                schooling,              //最高学历
                professional,           //专业
                degree,                 //学位
                school,                 //毕业学校
                schendtime,                //毕业时间
                recruitment,            //是否统招
                rid:rid+''
            })
        }
    }
    componentDidMount(){
        const rid = this.props.data.rid+'';
        this.props.queryEmployee({rid:rid});
    }

    handleSelectChange  = (field,value) => {
        const {
                name,                   //姓名
                documenttype,           //证件类型
                mobile,                 //手机号
                birthday,               //生日
                married,                //是否已婚
                national,               //民族
                natives,                //籍贯
                accounttype,            //户口类型
                englishname,            //英文名
                card,                   //证件号码
                workemail,              //个人邮箱
                sex,                    //性别
                children,               //是否已育
                political,              //政治面貌
                city,                   //户籍城市
                tolive,                 //居住地址
                schooling,              //最高学历
                professional,           //专业
                degree,                 //学位
                school,                 //毕业学校
                schendtime,             //毕业时间
                recruitment,            //是否统招
            } = this.props.data;
        if(field=='cancelBtnState'){
            this.setState({
                name,                   //姓名
                documenttype,           //证件类型
                mobile,                 //手机号
                birthday,               //生日
                married,                //是否已婚
                national,               //民族
                natives,                //籍贯
                accounttype,            //户口类型
                englishname,            //英文名
                card,                   //证件号码
                workemail,              //个人邮箱
                sex,                    //性别
                children,               //是否已育
                political,              //政治面貌
                city,                   //户籍城市
                tolive,                 //居住地址
                btnState:'none',
                borderState:"1px solid transparent",
                isdisabled:true
            })
        }else if(field=='cancelTimeBtnState'){
            this.setState({
                schooling,              //最高学历
                professional,           //专业
                degree,                 //学位
                school,                 //毕业学校
                schendtime,             //毕业时间
                recruitment,            //是否统招
                eduBtnState:'none',
                eduBorderState:"1px solid transparent",
                isEdudisabled:true,
            })
        }else{
            this.setState({
                [field]:value
            })
        }
    }
    handleChange = (field,e)=>{
        this.setState({
            [field]:e.target.value
        })
    }
    onTimeChange = (field,value) => {
        this.setState({
            [field]: value
        })
    }
    //编辑信息
    editInformation = (field) => {
        if(field=='baseInformation'){
            this.setState({
                btnState:'block',
                borderState:"1px solid #d9d9d9",
                isdisabled:false
            })
        }else if(field=='eduInformation'){
            this.setState({
                eduBtnState:'block',
                eduBorderState:"1px solid #d9d9d9",
                isEdudisabled:false
            })
        }
    }
    saveInfomation = (field) => {
        const { birthday } = this.state;
        if (field== 'btnState'){

           const filterObj = pickBy(this.state,(val,key)=>{
            return key !='schooling' && key !='professional'  && key !='degree' && key !='school' && key !='endtime' && key !='recruitment' ;
        });
            this.props.editEmployeeInformation({...filterObj, birthday});
            this.setState({
                btnState:'none',
                borderState:"1px solid transparent",
                isdisabled:true
            })

        }else if (field== 'eduBtnState'){

            const filterObj = pickBy(this.state,(val,key)=>{
            return key =='schooling' || key =='professional' || key =='degree' || key =='school' || key =='schendtime' || key =='recruitment' || key =='rid';
            });
            const filterObjEdu = pickBy(filterObj,(val,key)=>{
                return val !='';
                });
            this.props.editEmployeeInformation({...filterObjEdu})
            this.setState({
                eduBtnState:'none',
                eduBorderState:"1px solid transparent",
                isEdudisabled:true,
            })
        }
    }

    render() {
        const {
            name,                   //姓名
            documenttype,           //证件类型
            mobile,                 //手机号
            birthday,               //生日
            married,                //是否已婚
            national,               //民族
            natives,                //籍贯
            accounttype,            //户口类型
            englishname,            //英文名
            card,                   //证件号码
            workemail,              //个人邮箱
            sex,                    //性别
            children,               //是否已育
            political,              //政治面貌
            city,                   //户籍城市
            tolive,                 //居住地址
            schooling,              //最高学历
            professional,           //专业
            degree,                 //学位
            school,                 //毕业学校
            schendtime,             //毕业时间
            recruitment,            //是否统招
            btnState ,
            borderState ,
            isdisabled,
            eduBtnState,
            eduBorderState,
            isEdudisabled ,
            isLoading =true
        } = this.state;
        const dateFormat = 'YYYY-MM-DD';
        return (
            <div className="personal-info clerk-tab-container" ref="PersonalInfoHeight">
                {isLoading &&
                    <LoadingComponent style={{
                        position: 'absolute',
                        top: 60,
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#FFF',
                        zIndex: 2
                    }} />
                }
                <ul>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}
                    >
                        <div className="info-field">
                            <h3 className="title">
                                基本信息
                            </h3>
                            <div className="editor-wrap inline-block">
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span
                                    onClick = {this.editInformation.bind(this,'baseInformation')}
                                >
                                    编辑
                                </span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>姓名 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            value={name}
                                            disabled={isdisabled}
                                            placeholder="请输入姓名"
                                            onChange={this.handleChange.bind(this,'name')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>证件类型 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686'}}
                                            disabled={isdisabled}
                                            value={documenttype}
                                            placeholder="请选择"
                                            onChange={this.handleSelectChange.bind(this,'documenttype')}
                                        >
                                            {
                                                ["身份证","护照","军人证","香港身份证","其他"].map((item)=>{
                                                    return  <Option value={item}>{item}</Option>
                                                })
                                            }

                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>手机号 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            value={mobile}
                                            disabled={isdisabled}
                                            placeholder="请输入手机号"
                                            onChange={this.handleChange.bind(this,'mobile')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>生日 : </span>
                                    <span>
                                        {/* <DatePicker
                                            disabled={isdisabled}
                                            value={birthday?moment(moment(birthday), dateFormat):''}
                                            format={dateFormat}
                                            allowClear={false}
                                            onChange={this.onChange.bind(this,'birthday')}
                                        /> */}
                                        <Input
                                            //style={{border:borderState}}
                                            value={birthday}
                                            disabled={isdisabled}
                                            placeholder="请输入出生日期"
                                            onChange={this.handleChange.bind(this,'birthday')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>是否已婚 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686'}}
                                            disabled={isdisabled}
                                            value={married}
                                            placeholder="请选择"
                                            onChange={this.handleSelectChange.bind(this,'married')}
                                        >
                                            <Option value="已婚">已婚</Option>
                                            <Option value="未婚">未婚</Option>
                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>民族 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686'}}
                                            disabled={isdisabled}
                                            value={national}
                                            placeholder="请选择"
                                            onChange={this.handleSelectChange.bind(this,'national')}
                                        >
                                            {
                                                nation.map((item)=>{
                                                    return  <Option value={item}>{item}</Option>
                                                })
                                            }

                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>籍贯 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            value={natives}
                                            disabled={isdisabled}
                                            placeholder="请输入籍贯"
                                            onChange={this.handleChange.bind(this,'natives')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>户口类型 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686'}}
                                            disabled={isdisabled}
                                            value={accounttype}
                                            placeholder="请选择"
                                            onChange={this.handleSelectChange.bind(this,'accounttype')}
                                        >
                                            {
                                                ["城镇","农村"].map((item)=>{
                                                    return  <Option value={item}>{item}</Option>
                                                })
                                            }

                                        </Select>
                                    </span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>英文名 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            value={englishname}
                                            disabled={isdisabled}
                                            placeholder="请输入英文名"
                                            onChange={this.handleChange.bind(this,'englishname')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>证件号码 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            value={card}
                                            disabled={isdisabled}
                                            placeholder="请输入证件号"
                                            onChange={this.handleChange.bind(this,'card')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>个人邮箱 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            value={workemail}
                                            disabled={isdisabled}
                                            placeholder="请输入个人邮箱"
                                            onChange={this.handleChange.bind(this,'workemail')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>性别 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686'}}
                                            disabled={isdisabled}
                                            value={sex}
                                            placeholder="请选择性别"
                                            onChange={this.handleSelectChange.bind(this,'sex')}
                                        >
                                            {
                                                ["男","女"].map((item)=>{
                                                    return <Option value={item}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>是否已育 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686'}}
                                            disabled={isdisabled}
                                            value={children}
                                            placeholder="请选择"
                                            onChange={this.handleSelectChange.bind(this,'children')}
                                        >
                                            {
                                                ["已育","未育"].map((item)=>{
                                                    return <Option value={item}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>政治面貌 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150 ,color:'#868686'}}
                                            disabled={isdisabled}
                                            value={political}
                                            placeholder="请选择政治面貌"
                                            onChange={this.handleSelectChange.bind(this,'political')}
                                        >
                                            {
                                                ["中共党员","共青团员","民主党派人士","无党派民主人士","普通公民"].map((item)=>{
                                                    return <Option value={item}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>户籍城市 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            value={city}
                                            disabled={isdisabled}
                                            placeholder="请输入户籍城市"
                                            onChange={this.handleChange.bind(this,'city')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>居住地址 : </span>
                                    <span>
                                        <Input
                                            //style={{border:borderState}}
                                            value={tolive}
                                            disabled={isdisabled}
                                            placeholder="请输入居住地址"
                                            onChange={this.handleChange.bind(this,'tolive')}
                                        />
                                    </span>
                                </li>
                            </ul>
                            <div style={{position:'absolute',bottom:20,left:'45%'}}>
                                <Button
                                    type='primary'
                                    style={{display:btnState,float:'left',marginRight:20}}
                                    onClick={this.saveInfomation.bind(this,'btnState')}
                                    >
                                    保存
                                 </Button>
                                 <Button
                                    style={{display:btnState}}
                                    onClick={this.handleSelectChange.bind(this,'cancelBtnState')}
                                    >
                                    取消
                                 </Button>
                            </div>
                        </div>
                    </li>
                    <li className="clerk-list-item"
                        style={{position:"relative"}}>
                        <div className="info-field">
                            <h3 className="title">
                                教育经历
                            </h3>
                            <div className="editor-wrap inline-block">
                                <img src="/static/images/manager/clerk/edit.png" alt="编辑"/>
                                <span onClick={this.editInformation.bind(this,'eduInformation')}>编辑</span>
                            </div>
                            <ul className="field-list inline-block" style={{marginLeft: 90}}>
                                <li>
                                    <span>最高学历 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686'}}
                                            disabled={isEdudisabled}
                                            value={schooling}
                                            placeholder="请选择"
                                            onChange={this.handleSelectChange.bind(this,'schooling')}
                                        >
                                            {
                                                education.map((item)=>{
                                                    return  <Option value={item}>{item}</Option>
                                                })
                                            }

                                        </Select>
                                    </span>
                                </li>
                                <li>
                                    <span>专业 : </span>
                                    <span>
                                        <Input
                                            //style={{border:eduBorderState}}
                                            value={professional}
                                            disabled={isEdudisabled}
                                            placeholder="请输入专业"
                                            onChange={this.handleChange.bind(this,'professional')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>学位 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686' }}
                                            disabled={isEdudisabled}
                                            value={degree}
                                            placeholder="请选择"
                                            onChange={this.handleSelectChange.bind(this,'degree')}
                                        >
                                            {
                                                ["学士","硕士","博士"].map((item)=>{
                                                    return  <Option value={item}>{item}</Option>
                                                })
                                            }

                                        </Select>
                                    </span>
                                </li>
                            </ul>
                            <ul className="field-list inline-block">
                                <li>
                                    <span>毕业学校 : </span>
                                    <span>
                                        <Input
                                            //style={{border:eduBorderState}}
                                            value={school}
                                            disabled={isEdudisabled}
                                            placeholder="请输入毕业学校"
                                            onChange={this.handleChange.bind(this,'school')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>毕业时间 : </span>
                                    <span>
                                        <DatePicker
                                            disabled={isEdudisabled}
                                            value={schendtime?moment(moment(schendtime), dateFormat):''}
                                            format={dateFormat}
                                            allowClear={false}
                                            onChange={this.onTimeChange.bind(this,'schendtime')}
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span>是否统招 : </span>
                                    <span>
                                        <Select
                                            style={{ width: 150,color:'#868686' }}
                                            disabled={isEdudisabled}
                                            value={recruitment}
                                            placeholder="请选择"
                                            onChange={this.handleSelectChange.bind(this,'recruitment')}
                                        >
                                            {
                                                ["是","否"].map((item)=>{
                                                    return  <Option value={item}>{item}</Option>
                                                })
                                            }

                                        </Select>
                                    </span>
                                </li>
                            </ul>
                            <div style={{position:'absolute',bottom:20,left:'45%'}}>
                                <Button
                                    type='primary'
                                    style={{display:eduBtnState,float:'left',marginRight:20}}
                                    onClick={this.saveInfomation.bind(this,'eduBtnState')}
                                    >
                                    保存
                                 </Button>
                                 <Button
                                    style={{display:eduBtnState}}
                                    onClick={this.handleSelectChange.bind(this,'cancelTimeBtnState')}
                                    >
                                    取消
                                 </Button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
