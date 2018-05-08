import React , { Component } from 'react';
import { Table , Progress , Icon , Modal ,Select,Input , Tooltip } from 'antd';
const Option = Select.Option;
import moment from 'moment';
import {Link} from 'react-router';
import resumeColumns from 'data/table-columns/archives-table';
import LeaveColumns from 'data/table-columns/archives-leaveTable';

export default class TableComponent extends Component{
    state = {
        name:'',//姓名
        documenttype:'',//证件类型
        card:'',//证件号
        tolive:'',//居住地址
        soci_card:'',//社保账号
        fund_card:'',//公积金账号
        wage_card:'',//工资卡账号
        contactname:'',//紧急联系人
        mobile:'',//紧急联系人电话
        rid:'',//人员ID
        selectedRowKeys:[]
    };
    setPersonnelMaterials = (record) => {
        const {
            showPersonalMaterialModal
        } = this.props;
        showPersonalMaterialModal(record);

    }
    hidePersonalMaterilModal = () =>{
        this.props.hidePersonalMaterialModal()
    }
    componentWillReceiveProps(nextProps){
            const {personalMaterialData} = nextProps;
            const {
                    name,
                    documenttype,
                    card,tolive,
                    soci_card,
                    fund_card,
                    wage_card,
                    contactname,
                    mobile,
                    rid
                } = personalMaterialData;
            this.setState({
                name:name,//姓名
                documenttype:documenttype,//证件类型
                card:card,//证件号
                tolive:tolive,//居住地址
                soci_card:soci_card,//社保账号
                fund_card:fund_card,//公积金账号
                wage_card:wage_card,//工资卡账号
                contactname:contactname,//紧急联系人
                mobile:mobile,//紧急联系人电话
                rid:rid+''
            })
    }
    handleSelectChange =(field,e)=> {
        this.setState({
            [field]:e.target.value
        })
    }
    handleSelect =(field,value)=> {
        this.setState({
            [field]:value
        })
    }
    //表格列渲染
    getColumns = ()=> {
        const archivesTableData = this.props.archivesTableData;
        if (archivesTableData=='1'){
            resumeColumns[0].render = (text,record,index) => {
                    const {rid} = record;
                    return (
                        <Link to={`/manager/clerkDetail/${rid}`} >
                            <a className='personalName' title={text}>{text}</a>
                        </Link>
                    )
            }
            resumeColumns[1].render = (text,record,index) => {
                return <Progress
                            className="personnelMaterials "
                            percent={(text*100).toFixed(0)}
                            style={{color:'#f68f6b'}}
                       />
            };
            resumeColumns[2].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle';
                const color = text?'rgb(134, 226, 124)':'#b0b0b0';
                return <Icon
                            type={type}
                            style={{color:color,cursor:"pointer"}}
                            onClick={this.setPersonnelMaterials.bind(this,record)}
                       />
            }
            resumeColumns[3].render = (text,record,index) => {
                return <a onClick={this.setPersonnelMaterials.bind(this,record)}>{text}</a>
            }
            resumeColumns[4].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle';
                const color = text?'rgb(134, 226, 124)':'#b0b0b0';
                return <Icon
                            type={type}
                            style={{color:color,cursor:"pointer"}}
                            onClick={this.setPersonnelMaterials.bind(this,record)}
                       />
            }
            resumeColumns[5].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle';
                const color = text?'rgb(134, 226, 124)':'#b0b0b0';
                return <Icon
                            type={type}
                            style={{color:color,cursor:"pointer"}}
                            onClick={this.setPersonnelMaterials.bind(this,record)}
                       />
            }
            resumeColumns[6].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle';
                const color = text?'rgb(134, 226, 124)':'#b0b0b0';
                return <Icon
                            type={type}
                            style={{color:color,cursor:"pointer"}}
                            onClick={this.setPersonnelMaterials.bind(this,record)}
                       />
            }
            resumeColumns[7].render = (text,record,index) => {
                const type = text?'check-circle':'question-circle';
                const color = text?'rgb(134, 226, 124)':'#b0b0b0';
                return <Icon
                            type={type}
                            style={{color:color,cursor:"pointer"}}
                            onClick={this.setPersonnelMaterials.bind(this,record)}
                       />
            }
            resumeColumns[resumeColumns.length-1].render = (text,record,index) => {
                return moment(text).format('YYYY-MM-DD')
            };
            return resumeColumns
        }else if(archivesTableData=='2'){
            LeaveColumns[0].render = (text,record,index) => {
                const {rid} = record;
                return (
                    <Link to={`/manager/clerkDetail/${rid}`} >
                        <a className='personalName'>{text}</a>
                    </Link>
                )
            };

            LeaveColumns[1].render = (text,record,index) => {
                return <Progress
                            className="personnelMaterials "
                            percent={(text*100).toFixed(0)}
                            style={{color:'#f68f6b'}}
                       />
            };
            LeaveColumns[2].render = (text,record,index) => {
                const type = text == '1'?'check-circle':'question-circle';
                const color = text == '1'?'rgb(134, 226, 124)':'#b0b0b0';
                return <Icon
                    type={type}
                    style={{color:color}}
                />
            };
            LeaveColumns[3].render = (text,record,index) => {
                const type = text == '1'?'check-circle':'question-circle';
                const color = text == '1'?'rgb(134, 226, 124)':'#b0b0b0';
                return <Icon
                    type={type}
                    style={{color:color}}
                />
            };
            LeaveColumns[4].render = (text,record,index) => {
                const type = text == '1'?'check-circle':'question-circle';
                const color = text == '1'?'rgb(134, 226, 124)':'#b0b0b0';
                return <Icon
                    type={type}
                    style={{color:color}}
                />
            };
            LeaveColumns[5].render = (text,record,index) => {
                return moment(text).format('YYYY-MM-DD')
            };
            return LeaveColumns
        }
    }
    //表格选择框选择
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.getRid({rid:selectedRows[0].rid,name:selectedRows[0].name});
        this.setState({selectedRowKeys});
    }
    //清空表格选择框
    clearTableCheckbox = () => {
        const {selectedRowKeys} = this.state;
        if(selectedRowKeys.length === 0) return ;
        this.setState({
            selectedRowKeys:[]
        })
    }
    //页码回调
    onChangPage = (page, pageSize) => {
        const {archivesTableData , sort} = this.props;
        if (archivesTableData=='1'){
            this.props.getArchivesList({sort:sort,pageNo:(page-1)*18+1+''});
        }else if(archivesTableData=='2'){
            this.props.getLeaveArchivesList({sort:sort,pageNo:(page-1)*18+1+''});
        }
        this.clearTableCheckbox();
    }
    //添加、编辑员工信息
    editEmployeeInformation = () => {
        const {
                editEmployeeInformation ,
                hidePersonalMaterialModal ,
                personalMaterialData
            } = this.props;
        const {
                name,
                documenttype,
                card,
                tolive,
                soci_card,
                fund_card,
                wage_card,
                contactname,
                mobile,
                rid
            } = personalMaterialData;
            //判断所有输入框是否有改变，有改变则编辑员工信息
            if (name!=this.state.name ||documenttype!=this.state.documenttype
                ||card!=this.state.card||tolive!=this.state.tolive||soci_card!=this.state.soci_card
                ||fund_card!=this.state.fund_card||wage_card!=this.state.wage_card
                ||contactname!=this.state.contactname||mobile!=this.state.mobile
            ){
                editEmployeeInformation({...this.state},this.props);
            }
        //隐藏Modal
        hidePersonalMaterialModal();
    }

    render(){
        const {
            archivesList ,
            leaveArchivesList ,
            archivesTableData,
            personalMaterialVisible
        } = this.props;
        const {
            name,
            documenttype,
            card,
            tolive,
            soci_card,
            fund_card,
            wage_card,
            contactname,
            mobile,
            selectedRowKeys
        } = this.state;
        return (
            <div >
                <Table
                    className='personnelMaterilTable'
                    rowSelection={{
                        type:'radio',
                        selectedRowKeys,
                        onChange: this.onSelectChange
                        }}
                    bordered
                    loading={archivesTableData=='1'?archivesList.isLoading:leaveArchivesList.isLoading}
                    columns={this.getColumns()}
                    dataSource={
                        (archivesTableData=='1'?archivesList.list:leaveArchivesList.list).map((item , index)=>{
                            item.key=index;
                            return item
                        })
                    }
                    pagination={{
                        defaultCurrent:1,
                        defaultPageSize:18,
                        total:archivesTableData=='1'?archivesList.count:leaveArchivesList.count,
                        onChange:this.onChangPage
                    }}
                />
                <Modal
                    className='grey-close-header personnelModal'
                    title={<span>{name}&nbsp;员工重要信息</span>}
                    okText='保存'
                    visible={personalMaterialVisible}
                    onCancel={this.hidePersonalMaterilModal}
                    onOk={this.editEmployeeInformation}
                >
                    <ul className="personalMaterial">
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">&nbsp;&nbsp;&nbsp; 证件类型：</span>
                                <Select
                                    placeholder='请选择证件类型'
                                    value={documenttype}
                                    onChange={this.handleSelect.bind(this,'documenttype')}
                                >
                                    {
                                        [
                                            '身份证件',
                                            '其他证件'
                                        ].map((item , index)=>{
                                            return <Option key={index} value={item}>{item}</Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="right-div">
                                <span>证件号：</span>
                                <Input
                                    placeholder='请输入证件号'
                                    value={card}
                                    onChange={this.handleSelectChange.bind(this,'card')}
                                />
                            </div>
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">&nbsp;&nbsp;&nbsp; 居住地址：</span>
                                <Input
                                    placeholder='请输入居住地址'
                                    value={tolive}
                                    onChange={this.handleSelectChange.bind(this,'tolive')}
                                />
                            </div>
                            <div className="right-div">
                                <span>社保账号：</span>
                                <Input
                                    placeholder='请输入社保账号'
                                    value={soci_card}
                                    onChange={this.handleSelectChange.bind(this,'soci_card')}
                                />
                            </div>
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">公积金账号：</span>
                                <Input
                                    placeholder='请输入公积金账号'
                                    value={fund_card}
                                    onChange={this.handleSelectChange.bind(this,'fund_card')}
                                />
                            </div>
                            <div className="right-div">
                                <span>工资卡卡号：</span>
                                <Input
                                    placeholder='请输入工资卡号'
                                    value={wage_card}
                                    onChange={this.handleSelectChange.bind(this,'wage_card')}
                                />
                            </div>
                        </li>
                        <li style={{overflow:'hidden',marginBottom:24}}>
                            <div className="left-div">
                                <span className="name">紧急联系人：</span>
                                <Input
                                    placeholder='请输入紧急联系人'
                                    value={contactname}
                                    onChange={this.handleSelectChange.bind(this,'contactname')}
                                />
                            </div>
                            <div className="right-div">
                                <span>紧急联系人电话：</span>
                                <Input
                                    placeholder='紧急联系人电话'
                                    value={mobile}
                                    onChange={this.handleSelectChange.bind(this,'mobile')}
                                />
                            </div>
                        </li>
                    </ul>
                </Modal>
            </div>
        )
    }
}
