import React, {Component , PropTypes} from 'react';

import {Table,Modal,Popover,Button, notification} from 'antd';
import moment from 'moment';

import columns from 'data/table-columns/job-table';
import LoadingComponent from 'components/loading';
import JobInfoComponent from './job-info';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponent extends Component {
    state = {
        currentClickJob:{},
        positionname:"",
        positionInfo:{},
        isdisabled:true
    }
    static contextTypes = {
        router: PropTypes.object
    }

    columns = [];

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    componentDidMount() {
        this.columns = this.getColumns();
    }

    showJobInfo = (record) => {
        const {getJobInfo,showJobModal} = this.props;
        const {positionid} = record;
        getJobInfo({positionid});
        // 当前点的职位的详细信息
        this.setState({currentClickJob:record});
        showJobModal();
    }
    //跳转到招聘流程页面，通过传参数获取面试者数据
    getInterviewNum = (record) =>{
        const {positionid} = record;
        //3代表面试管理
        this.props.getResumeId({positionid:positionid,stageid:"3",title:'面试管理'})
        //路由跳转
        this.context.router.push(`recruit`);
    }
    //跳转到招聘流程页面，通过传参数获取复试者数据
    getReInterviewNum = (record) =>{
        const {positionid} = record;
        //4代表复试管理
        this.props.getResumeId({positionid:positionid,stageid:"4",title:'复试管理'})
        //路由跳转
        this.context.router.push(`recruit`);
    }
    //跳转到招聘流程页面，通过传参数获取收到offer者数据
    getOfferNum = (record) =>{
        const {positionid} = record;
        //5代表offer管理
        this.props.getResumeId({positionid:positionid,stageid:"5",title:'发送offer'})
        //路由跳转
        this.context.router.push(`recruit`);
    }
    getDegreeNum = (record) => {
        const {positionid} = record;
        //0代表全部
        this.props.getResumeId({positionid:positionid,stageid:"0",degree:'1',title:'智能筛选'})
        //路由跳转
        this.context.router.push(`recruit`);
    }
    componentDidMount() {
        this.columns = this.getColumns();
    }

    getColumns() {
        columns[2].render = this.renderWithAtag;
        columns[3].render = this.renderWithPartment;
        columns[6].render = this.renderWithInterview;
        columns[7].render = this.renderWithReInterview;
        columns[8].render = this.renderWithgetOffer;
        columns[10].render = this.renderWithgetDegree;
        columns[columns.length - 2].render = this.renderWithstarttime;
        columns[columns.length - 3].render = this.renderWithendtime;
        columns[columns.length - 1].render = (text,record,index) => {
            switch(parseInt(text)) {
                case 0:
                    return <button className="status-button plan">准备中</button>;
                case 1:
                    return (
                            <button className="status-button progress">进行中</button>
                    );
                case 2:
                    return <button className="status-button complete">已完成</button>;
                case 3:
                    return <button className="status-button end">已终止</button>;
            }
        }
        return columns;
    }
    renderWithstarttime = (text, record, index) => {
        return (
            <span
                //className="positionname" 
                href="javascript:;" 
                title={moment(text).format("YYYY-MM-DD")}
            >
                {moment(text).format("YYYY-MM-DD")}
            </span>
        )
    }
    renderWithendtime = (text, record, index) => {
        return (
            <span 
                //className="positionname" 
                href="javascript:;" 
                title={moment(text).format("YYYY-MM-DD")}
            >
            {moment(text).format("YYYY-MM-DD")}
            </span>
        )
    }

    renderWithAtag = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                style={{display:"block",width:100,overflow:"hidden"}}
                onClick={this.positionClick.bind(this,record)}
            >
                {text}
            </a>
        )
    }
    renderWithPartment = (text, record, index) => {
        return (
            <span 
                title={text}
                style={{display:"block",width:80,overflow:"hidden"}}
            >
                {text}
            </span>
        )
    }
    //面试列渲染
    renderWithInterview = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={() => this.getInterviewNum(record)}
            >
                {text}
            </a>
        )
    }
    //复试列渲染
    renderWithReInterview = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={() => this.getReInterviewNum(record)}
            >
                {text}
            </a>
        )
    }
    //offer列渲染
    renderWithgetOffer = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={() => this.getOfferNum(record)}
            >
                {text}
            </a>
        )
    }
    renderWithgetDegree = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={() => this.getDegreeNum(record)}
            >
                {text}
            </a>
        )
    }
    positionClick = (record) => {
        this.setState({
            isdisabled:true
        })
        this.showJobInfo(record)
    }
    //修改职位信息
    editPositionInfo = () => {
        this.setState({
            isdisabled:false
        })
        const{positionInfo} = this.state;
        if(positionInfo.status==3){
            notification.warning({
                message: '该职位已终止，暂不能修改！',
              });
        }else if(positionInfo.positionid){
            this.showJobInfo(positionInfo)
        }else{
            notification.warning({
                message: '请先选择职位！',
              });
        }   
    }
    //表格选择框选择
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            positionInfo:selectedRows[0]
        })
    }

    render() {
        const {
            listData,
            isLoading,
            isLoadingAbort,
            paginationCurrent,
            paginationChange,
            getJobList,
            getJobCategory,
            modalVisible,
            hideJobModal,
        } = this.props;
        const {positionname,isdisabled} = this.state;
        const {list,count} = listData;
        return (
            <div style={{
                position: 'relative',
                width: 950,
                height: 780
            }}>
                <Button
                    type="primary" ghost
                    style={{position:'absolute',left:710,top:-44}}
                    onClick={this.editPositionInfo}>
                    修改职位信息
                </Button>
                <Table 
                    className="personnelMaterilTable"
                    rowSelection={{
                        type:'radio',
                        onChange: this.onSelectChange
                    }}
                    dataSource={
                        list.map((item,index)=>{
                            item.key = index;
                            return item;
                        })
                    }
                    scroll={{x:list.length==0?0:1090}} 
                    bordered
                    loading={isLoading}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize:20,
                        total: count,
                        current: paginationCurrent,
                        onChange:(page,pageSize)=> paginationChange(page,pageSize)
                    }}
                />
                <Modal
                    wrapClassName="vertical-center-modal"
                    visible={modalVisible}
                    onCancel={!isLoadingAbort ? () => hideJobModal() : () => {}}
                    width={1100}
                    footer={null}
                >
                    <JobInfoComponent
                        data={this.state.currentClickJob} 
                        getJobList={getJobList}
                        getJobCategory={getJobCategory}
                        isdisabled={isdisabled}
                    />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listData: state.Job.listData, // 统计列表数据
    isLoading: state.Job.isLoadingList,
    modalVisible: state.Job.modalVisible,
    isLoadingAbort: state.Job.isLoadingAbort
})
const mapDispatchToProps = dispatch => ({
    getJobCategory: bindActionCreators(Actions.jobActions.getJobCategory, dispatch),
    getJobInfo: bindActionCreators(Actions.jobActions.getJobInfo, dispatch),
    showJobModal: bindActionCreators(Actions.jobActions.showJobModal, dispatch),
    hideJobModal: bindActionCreators(Actions.jobActions.hideJobModal, dispatch),
    getResumeId: bindActionCreators(Actions.jobActions.getResumeId, dispatch)
})

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);