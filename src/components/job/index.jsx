import React, {Component} from 'react';

import LeftNav from 'components/job/nav';
import RightComponent from './right';

// lodash
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import BreadCrumbComponent from 'components/breadcrumb';

import navData from 'data/nav/job';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class IndexPage extends Component {
    state = {
        paginationCurrent: 1
    }
    //显示条件
    params = {
        type: 'all',
        skip: 0,
        count:"20"
    };

    // 表单数据
    formData = {
    };

    componentDidMount() {
        NProgress.done();
        const {params,getJobCategory} = this.props;
        // 获取职位分类统计
        getJobCategory();
        // 获取职位列表
        this._requestData();
        const {positionid} = params;
        //打开弹出层
        // setTimeout(()=>{
            if(positionid){
                const {getJobInfo,showJobModal} = this.props;
                getJobInfo({positionid});
                showJobModal();
            }
        // },500);
    }
    
    _requestData = () => {
        this.props.getJobList({...this.params,...this.formData});
    }

    _getNavData(data) {
        let navArr =  Object.keys(data).map(item=>{
            navData[item].num = data[item]
            return navData[item];
        }); 
        navArr.sort((a,b)=>{
             return a.index - b.index;
        });
        return navArr;        
    }

    clickNav(type) {
        // 点击侧边栏分类
        this.params.type = type;
        // this.params.skip = 0;
        // this.setPaginationCurrent(1);
        // this._requestData();
        this.refs.RightComponent.refs.FormComponent.resetForm(true);
    }

    handleSearch = (params,clickNav=false) => {
        if(isEqual(this.formData,params)&&!clickNav) return ;
        // 点击搜索按钮
        //params:
        //department:"12"
        //position:"12"
        //starttime:"2017-08-02"
        //endtime:"2017-08-07"
        this.params.skip = 0;
        this.formData = params;
        this.setPaginationCurrent(1);
        this._requestData();
    }

    paginationChange = (page,pageSize) => {
        this.params.skip = (page-1)*20;
        this._requestData();
        this.setPaginationCurrent(page);
    }   

    setPaginationCurrent = paginationCurrent => {
        this.setState({paginationCurrent});
    }

    getRoutes = routes => {
        let routesCopy = [];
        routes.forEach(item=>{
            routesCopy.push(pick(item,['breadcrumbName','path']));
        });
        return routesCopy.slice(1,-1);
    }

    render() {
        const {paginationCurrent} = this.state,
            {routes,categoryData,isLoading,resetForm} = this.props;
        return (
            <div className="page-content job-page">
                <BreadCrumbComponent routes={this.getRoutes(routes)} />
                <div className="list-block">
                    <div className="pull-left">
                        <LeftNav 
                            title="职位分类" 
                            isLoading={isLoading}
                            data={this._getNavData(categoryData)}
                            onClick={this.clickNav.bind(this)} 
                        />
                    </div>
                    <div className="pull-right">
                        <RightComponent 
                            ref="RightComponent"
                            getJobList={this._requestData}
                            onSearch={this.handleSearch} 
                            paginationChange={this.paginationChange} 
                            paginationCurrent={paginationCurrent}
                            resetForm={resetForm}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categoryData: state.Job.categoryData, // 统计列表数据
    isLoading: state.Job.isLoadingCategory
})
const mapDispatchToProps = dispatch => ({
    getJobInfo: bindActionCreators(Actions.jobActions.getJobInfo, dispatch),
    showJobModal: bindActionCreators(Actions.jobActions.showJobModal, dispatch),
    getJobCategory: bindActionCreators(Actions.jobActions.getJobCategory, dispatch),
    getJobList: bindActionCreators(Actions.jobActions.getJobList, dispatch),
    resetForm: bindActionCreators(Actions.jobActions.resetForm, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);