import React, {Component} from 'react';
import BasicPage from './basic';
import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/talent/nav';
import FormComponent from 'components/talent/form';
import TableComponent from 'components/talent/table';
import BreadCrumbComponent from 'components/breadcrumb';

// lodash
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// nav data
import navData from 'data/nav/talent';

// 招聘人员详细信息Modal页面
import ResumeModalComponent from 'components/resume-modal';
// 上传简历Modal
import UploadResumeModalComponents from 'components/talent/upload-resume-modal';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TalentPage extends BasicPage {

    state = {
        paginationCurrent: 1,
        selectedRowKeys: [],
        tableHead: '全部人才'
    }

    // labelid
    labelid = '';

    // form 表单数据
    formData = {};

    params = {
        type: 'all',
        start: 0
    }

    componentDidMount() {
        this.hideNProgress();
        const {routeParams} = this.props,
         {keywords} = routeParams;
        // 请求分类数据
        this.props.getTalentCategory();
        // 请求列表数据
        if(keywords){
            this.formData = {keywords};
            // this.setKeywords(keywords);
        }
        this._requestData();
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || nextState !== this.state;
    }

    componentWillUpdate(nextProps,nextState) {
        if(this.props.routeParams.keywords !== nextProps.routeParams.keywords){
            const keywords = nextProps.routeParams.keywords;
            this.formData = {keywords};
            // this.setKeywords(keywords);
            this._requestData();
        }
    }

    setKeywords(keywords) {
        this.refs.FormComponent.handleChange('keywords',{
            target: {value:keywords}
        });
    }

    _requestData() {
        const label = this.labelid === '' ? {lableid:''} : {lableid:this.labelid}
        this.props.getTalentList({
            ...this.params,...this.formData,...label
        });
    }

    _getCustomLabel() {
        const {categoryData} = this.props;
        let arr = [];
            const pattern = /\{(\w|\W){0,}\}$/ig,
            {content} = categoryData;
        if(categoryData.content){
            Object.keys(content || {}).forEach(item=>{
                let res = '',
                pairs = [],
                obj = {};
                if(pattern.test(item)){
                    const str = item.match(pattern)[0];
                    res = str.replace(/'/ig,""); // 去除单引号
                    res = res.replace(/(\{|\})/ig,""); // 去除花括号
                    res = res.replace(/\s/ig,""); // 去除空格
                    pairs = res.split(',');
                    pairs.forEach(item=>{
                        let tempPairs = item.split('=');
                        obj[tempPairs[0]] = tempPairs[1];                            
                    });
                    obj.title = obj.lablename;
                    obj.num = content[item];
                    obj.type = 'custom'; // 其他
                    arr.push(obj);
                }
            });
            arr = arr.sort((preObj,nextObj)=>{
                return parseInt(preObj.id) - parseInt(nextObj.id);
            });
        }
        return arr;
    }

    _getNavData = () => {
        let data = [];
        const {categoryData} = this.props;
        if(!isEmpty(categoryData)){
            Object.keys(navData).forEach(item=>{
                navData[item].num = categoryData[item];
                data.push(navData[item]);
            });
        }else{
            Object.keys(navData).forEach(item=>{
                navData[item].num = 0;
                data.push(navData[item]);
            });
        }

        return data;
    }

    handleClickNav = (record) => {
        // 点击侧边栏导航
        const {type,id,title} = record;
        this.params.type = type;
        if(type === 'custom'){
            this.labelid = id;
        }else{
            this.labelid = '';
        }
        this.refs.FormComponent.resetForm(true);
        // 清空表格选择框
        this.clearTableCheckbox();
        this.setTableHead(title)
    }

    setTableHead = tableHead => {
        this.setState({tableHead});
    }

    handleFind = (params,clickNav=false) => {
        // 点击开始查找按钮
        if(isEqual(this.formData,params)&&!clickNav) return ;
        this.formData = params;
        this.params.start = 0;
        this.setPaginationCurrent(1);
        this._requestData();
        // 清空表格选择框
        this.clearTableCheckbox();
    }

    paginationChange = (page,pageSize) => {
        // 点击分页器
        this.params.start = (page - 1) * 18;
        this._requestData();
        this.setPaginationCurrent(page);
        // 清空表格选择框
        this.clearTableCheckbox();
    }

    setPaginationCurrent = paginationCurrent => {
        this.setState({paginationCurrent});
    }
    
    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    }

    clearTableCheckbox = () => {
        const {selectedRowKeys} = this.state;
        if(selectedRowKeys.length === 0) return ;
        this.onSelectChange([]);
    }

    render() {
        const {
            paginationCurrent,
            selectedRowKeys,
            tableHead
        } = this.state,
            {routes,isLoading,showUploadModal} = this.props,
            customNavData = this._getCustomLabel();
        return (
            <ScrollPageContent>
                <div className="page-content talent-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <LeftNav 
                                title="人才分类"
                                data={this._getNavData().concat(customNavData)}
                                isLoading={isLoading}
                                onClick={this.handleClickNav} 
                                handleDelete={record=>this.showDeleteLabelModal(record)}
                            />
                        </div>
                        <div className="pull-right">
                            <div className="box-border right-panel">
                                <FormComponent 
                                    ref="FormComponent"
                                    findEvent={this.handleFind} 
                                    showUploadModal={showUploadModal}
                                />
                                <TableComponent
                                    tableHead={tableHead}
                                    selectedRowKeys={selectedRowKeys}
                                    paginationCurrent={paginationCurrent}
                                    paginationChange={this.paginationChange}
                                    customNavData={customNavData}
                                    onSelectChange={this.onSelectChange}
                                />
                            </div>
                        </div>
                        {/*上传简历Modal*/}
                        <UploadResumeModalComponents />
                        {/*招聘人员详细信息Modal页面*/}
                        <ResumeModalComponent />
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Talent.isCategoryLoading,
    categoryData: state.Talent.categoryData // 分类数据
})
const mapDispatchToProps = dispatch => ({
    getTalentCategory: bindActionCreators(Actions.TalentActions.getTalentCategory, dispatch),
    getTalentList: bindActionCreators(Actions.TalentActions.getTalentList, dispatch),
    showUploadModal: bindActionCreators(Actions.RecruitActions.showUploadModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalentPage);