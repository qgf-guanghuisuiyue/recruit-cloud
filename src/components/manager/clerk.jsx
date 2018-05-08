import React, {Component, PropTypes} from 'react';
import {notification} from 'antd';

import TopComponent from './clerk/top';
import ControlComponent from './clerk/control';
import TableComponent from './clerk/table';
import store from 'store';
//top navdata
import navData from 'data/nav/crewstatis';
// lodash
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';
import get from 'lodash/get';
//async
import async from 'async';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ClerkPage extends Component {

    state = {
        paginationCurrent: 1,
        tableHead: '全部人员',
        ridList: '',
        workstatus: '',
        type: '',
        selectedRowKeys: [],
    }

    //显示条件
    params = {
        skip: 0,
        count:"20",
        sort:"desc"
    }

    // 表单数据
    formData = {
    };

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount(){
        NProgress.done();
        //请求全部员工数据
        this.props.getCrewStatis();
        //员工管理人员信息列表
        this._requestCrewData();
    }

    _getNavData = list => {
        let data = [];
        // {
        //     sum,        //总人数
        //     formal,     //正式员工数量
        //     trial,      //试用期人数
        //     hired,      //待入职人数
        //     departure,  //离职人员数量 
        // } = list;
        if(!isEmpty(list)){
            Object.keys(navData).forEach((item)=>{
                navData[item].num = list[item];
                data.push(navData[item])
            });
        }else{
            Object.keys(navData).forEach(item=>{
                navData[item].num = 0;
                data.push(navData[item])
            });
        }
        return data;
    }

    //获取员工管理人员信息列表
    _requestCrewData = () => {
        this.props.getCrewList({...this.params,...this.formData});
    }

    setPaginationCurrent = paginationCurrent => {
        this.setState({paginationCurrent});
    }

    //页码改变的回调，参数是改变后的页码及每页条数
    paginationChange = (page,pageSize) => {
        this.params.skip = (page-1)*20;
        this._requestCrewData();
        this.setPaginationCurrent(page);
        this.clearTableCheckbox();
    }

    //清空表格选择框
    clearTableCheckbox = () => {
        const {selectedRowKeys} = this.state;
        if(selectedRowKeys.length === 0) return ;
        this.setState({
            selectedRowKeys:[]
        }) 
    }   

    onSelectChange = (selectedRowKeys) => {
        const {crewList} = this.props,
        {list} = crewList;
        let filterArr = filter(list,(item,index)=>{
            return indexOf(selectedRowKeys,index) !== -1;
        });
        let str = filterArr.map(item=>{
            return get(item,['rid']);
        }).join(',');
        this.getRidStr(str);
        this.setState({selectedRowKeys});
    }

    handleClickTop = (type,desc) => {
        switch(type){
            case 'sum': this.setWorkStatus(''); break;              //不传显示全部
            case 'formal': this.setWorkStatus('1'); break;
            case 'trial': this.setWorkStatus('0'); break;
            case 'hired': 
                 this.props.getResumeId({stageid:"6",title:'待入职'});
                 this.context.router.push(`recruit`); 
                break;
            case 'departure': this.setWorkStatus('2'); break;
        }
        this.setState({type});
        this.params.skip = 0;
        this._requestCrewData();
        this.setPaginationCurrent(1);
        this.setTableHead(desc);
    }

    setTableHead = tableHead => {
        this.setState({tableHead});
    }
    
    setWorkStatus = workstatus => {
        this.setState({workstatus});
        if(workstatus){
            this.params.workstatus = workstatus;
        }else{
            this.params={
                skip: 0,
                count:"20",
                sort:"desc"
            }
        }
    }

    //查找
    handleFind = (params,clickNav=false) => {
        // 点击开始查找按钮
        if(isEqual(this.formData,params)&&!clickNav) return ;
        this.formData = params;
        this.params.skip = 0;
        this.setPaginationCurrent(1);
        this._requestCrewData();
    }

    //获取选中的rid列表
    getRidStr = (ridList) => {
        this.setState({ridList})
    }

    //删除
    handleDeleteClerkClick = (ridList) => {
        const {
            deleteEmployees,
            getCrewStatis,
            deleteClerkList
        } = this.props;
        const {paginationCurrent} = this.state;
        const ridArr = ridList.split(',');
        const {isDelete} = deleteClerkList;
        if(ridArr.length===1 && ridArr[0] != ''){
            const rid = ridArr[0]
            deleteEmployees({rid},getCrewStatis);
            setTimeout(() => {
                this.setPaginationCurrent(paginationCurrent);
                this.params.skip = (paginationCurrent-1)*20;
                this._requestCrewData();
                this.clearTableCheckbox();
            },500);
        }else {
            notification.warning({
                message: '警告',
                description: '请先选择一位具体人员！'
            });
            return false;
        }
    }

    //导出
    exportEmployees = (ridList) => {
        const {token,tokenKey} = store.get('token') || {};
        const {stopExportEmployees} = this.props;
        this.refs.token.value = token;
        this.refs.tokenKey.value = tokenKey;
        this.refs.ridList.value = ridList;
        this.refs.form.submit();
        stopExportEmployees();
        this.clearTableCheckbox();
    }

    render() {
        const {
            paginationCurrent,
            tableHead,
            ridList,
            type,
            selectedRowKeys
        } = this.state,
        {
            manageStastistics,
            crewList,
            showUploadClerkModal,
            exportClerkList,
            startExportEmployees,
            deleteClerkList
        } = this.props,
        {isLoading, list} = manageStastistics,
        {near} = list;
        return (
            <div className="right-panel clerk-page">
                <TopComponent 
                    circle={near}
                    data={this._getNavData(list)}
                    onClick={this.handleClickTop}
                    isLoading= {isLoading}
                    handleFind={this.handleFind}
                />
                <form 
                    ref="form" 
                    action={`${prefixUri}/employeeinfo/exportEmployees`}
                    method="post"
                    target="exportEmployees"
                >
                    <div className="form">
                        <input ref="token" type="hidden" name="token" />
                        <input ref="tokenKey" type="hidden" name="tokenKey" />
                        <input ref="ridList" type="hidden" name="ridList" />
                    </div> 
                </form>       
                <ControlComponent 
                    title={tableHead}
                    ridList={ridList}
                    exportClerkList={exportClerkList}
                    handleFind={this.handleFind}
                    deleteEmployees={this.handleDeleteClerkClick}
                    exportEmployees={this.exportEmployees}
                    startExportEmployees={startExportEmployees}
                    deleteClerkList={deleteClerkList}
                />
                <TableComponent 
                    crewList={crewList}
                    type={type}
                    selectedRowKeys={selectedRowKeys}
                    paginationChange={this.paginationChange}
                    paginationCurrent={paginationCurrent}
                    onSelectChange={this.onSelectChange}
                />
                <iframe 
                    id="exportEmployees" 
                    name="exportEmployees" 
                    style={{display:'none'}} 
                    src="" 
                    frameborder="0"
                ></iframe>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    manageStastistics: state.Manage.manageStastistics,
    crewList: state.Manage.crewList,
    exportClerkList: state.Manage.exportClerkList,
    deleteClerkList: state.Manage.deleteClerkList
})

const mapDispatchToProps = dispatch => ({
    getCrewStatis: bindActionCreators(Actions.ManageActions.getCrewStatis,dispatch),
    getCrewList: bindActionCreators(Actions.ManageActions.getCrewList,dispatch),
    getResumeId: bindActionCreators(Actions.jobActions.getResumeId, dispatch),
    deleteEmployees: bindActionCreators(Actions.ManageActions.deleteEmployees, dispatch),
    startExportEmployees: bindActionCreators(Actions.ManageActions.startExportEmployees, dispatch),
    stopExportEmployees: bindActionCreators(Actions.ManageActions.stopExportEmployees, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClerkPage)