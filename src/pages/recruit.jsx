import React, {Component} from 'react';
import BasicPage from './basic';
import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/job/nav';
import BreadCrumbComponent from 'components/breadcrumb';

import NavData from 'data/nav/recruit';

import FormComponents from 'components/recruit/form';
import TableComponents from 'components/recruit/table';

// lodash
import isEqual from 'lodash/isEqual';

// 招聘人员详细信息Modal页面
import ResumeModalComponent from 'components/resume-modal';
// 上传简历Modal
import UploadResumeModalComponents from 'components/recruit/upload-resume-modal';
// 职位推荐Modal
import RecommendResumeModalComponents from 'components/recruit/recommend-resume-modal'

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RecruitPage extends BasicPage {

    state = {
        paginationCurrent: 1,
        tableHead: "职位申请"
    }

    // 子框架是否刷新
    isIframeRefresh = false;

    params = {
        stageid: '1',
        skip: 0,
        range:"2",
        positionid:"",
        degree:''
    };

    formData = {};

    componentDidMount() {
        this.hideNProgress();
        const {params,getRecruitCategory,interview} = this.props,
            {stageid} = params;
        getRecruitCategory();
        //恢复positionid/stageid
        this.props.cancellResumeId({positionid:"",stageid:"1"})
        //通过职位ID判断是否要进行参数赋值 ,interview
        if (interview.positionid || interview.stageid){
            this.params.positionid =interview.positionid;
            this.params.stageid =interview.stageid;
            this.params.degree =interview.degree;
            this.setState({
                tableHead:interview.title
            })
            if(interview.stageid=='0'){
                this.refs.LeftNav.setSelectedIndex(parseInt(interview.stageid)+7);
            }else{
                this.refs.LeftNav.setSelectedIndex(parseInt(interview.stageid)-1);
            }
            
        }
         if(stageid){
            this.params.stageid = stageid;
            this.refs.LeftNav.setSelectedIndex(parseInt(stageid)-1);
        }
        this._requestData();
        // 监听简历详情页面是否发生流程更改
        window.addEventListener('message',e=>{
            const {data} = e;
            if(data === 'rerequest'){
                this.isIframeRefresh = true;
            }
        });
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.visible !== this.props.visible || this.isIframeRefresh){
            this.isIframeRefresh = false;
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props.isLoading !== nextProps.isLoading || 
            this.props.categoryData !== nextProps.categoryData ||
            this.state.paginationCurrent !== nextState.paginationCurrent ||
            this.state.tableHead !== nextState.tableHead
    }
    //获取职位申请列表
    _requestData(){
        this.props.getRecruitList({...this.params,...this.formData});
    }   
    //获取leftnav数据
     _getNavData(data){
         const navArr = []
         for (let item in data){
            navArr.push(data[item][item])
         }
         const dataAll = navArr[0];
         navArr.splice(0,1)
         navArr.push(dataAll)
         navArr.forEach((item,index)=>{
            NavData[index].num = item;
        });
        return NavData;
    }

    handleClickNav = (type,title) => {
        this.params.stageid = type;
        this.params.skip = 0;
        this.setPaginationCurrent(1);
        this.params.positionid="";
        this.params.degree="";
        this.refs.FormComponents.resetForm(true); 
        this.formData.workyear="";
        this.formData.educationbg="";
        this.formData.username="";
        this._requestData();  
        this._setTableHead(title);
    }

    _setTableHead = tableHead => {
        this.setState({tableHead});
    }

    //点击筛选按钮查找
    handleFind = (params,clickNav=false) => {
        // 点击开始查找按钮
        if(isEqual(this.formData,params)&&!clickNav) return ;
        this.formData = params;
        this.params.skip = 0;
        this.setPaginationCurrent(1);
        this._requestData();
    }

    paginationChange = (page,pageSize) => {
        // 点击分页器
        this.params.skip = (page - 1) * 20;
        this._requestData();
        this.setPaginationCurrent(page);
    }

    setPaginationCurrent = paginationCurrent => {
        this.setState({paginationCurrent});
    }

    onModalChange = () => {
        if(this.isIframeRefresh){
            this.props.getRecruitCategory();
            this._requestData();
        }
    }

    render() {
        const {
            paginationCurrent,
            tableHead="职位申请"
        } = this.state;
        const {routes,isLoading,categoryData} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content recruit-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <LeftNav
                                ref="LeftNav"
                                title="招聘流程管理" 
                                isLoading={isLoading}
                                data={this._getNavData(categoryData)}
                                onClick={this.handleClickNav} 
                            />
                        </div>
                        <div className="pull-right">
                            <div className="box-border right-panel">
                                <FormComponents
                                    ref="FormComponents"
                                    handleFind={this.handleFind} 
                                    showUploadModal={this.props.showUploadModal}
                                />
                                <TableComponents
                                    title={tableHead}
                                    paginationChange={this.paginationChange}
                                    paginationCurrent={paginationCurrent}
                                />
                            </div>
                        </div>   
                    </div>
                </div>
                {/*招聘人员详细信息Modal页面*/}
                <ResumeModalComponent onChange={this.onModalChange} />
                {/*上传简历Modal*/}
                <UploadResumeModalComponents />
                {/*职位推荐Modal*/}
                <RecommendResumeModalComponents />
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    visible: state.Recruit.visible,
    isLoading: state.Recruit.isCategoryLoading,
    categoryData: state.Recruit.categoryData, // 统计列表数据
    interview: state.Job.interview
})
const mapDispatchToProps = dispatch => ({
    getRecruitCategory: bindActionCreators(Actions.RecruitActions.getRecruitCategory, dispatch),
    getRecruitList: bindActionCreators(Actions.RecruitActions.getRecruitList, dispatch),
    showUploadModal: bindActionCreators(Actions.RecruitActions.showUploadModal, dispatch),
    cancellResumeId: bindActionCreators(Actions.jobActions.cancellResumeId, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecruitPage);