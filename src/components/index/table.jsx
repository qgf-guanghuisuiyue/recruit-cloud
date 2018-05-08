import React, {Component,PropTypes} from 'react';

import merge from 'lodash/merge';
import trim from 'lodash/trim';

import {Table , Icon} from 'antd';
import columns from 'data/table-columns/index-table';

import moment from 'moment'

import LoadingComponent from 'components/loading';

// 招聘人员详细信息Modal页面
import ResumeModalComponent from 'components/resume-modal';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponent extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    isIframeRefresh = false;
    columns = this._getColumns();
    componentDidMount() {
        this.props.getEntryPerson();
        // 监听简历详情页面是否发生流程更改
        window.addEventListener('message',e=>{
            const {data} = e;
            if(data === 'rerequest'){
                this.isIframeRefresh = true;
            }
        });
    }

    componentWillUnmount() {
        this.props.resetEntryPerson();
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props.list !== nextProps.list || 
            this.props.isLoading !== nextProps.isLoading;
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.visible !== this.props.visible || this.isIframeRefresh){
            this.isIframeRefresh = false;
        }
    }

    showResumeModal(record) {
        // 显示详情页面Modal
        const {id,resumeid} = record;
        this.props.showResumeModal({id,resumeid});
    }

    _getColumns() {
        columns[0].render = (text,record,index) => {
            /**
             * resumeid 简历id
             * id 当前流程id
             */
            return (
                <a 
                    className="hover" 
                    href="javascript:void(0);"
                    onClick={this.showResumeModal.bind(this,record)}
                >
                    {trim(text)}
                </a>
            )
        }  
        columns[columns.length - 1].render = (text,record,index) => {
            return  <a 
                        onClick={this.showResumeModal.bind(this,record)}
                        className="highlight-text"
                    >
                        {text}
                    </a>
        }
        columns[columns.length - 2].render = (text,record,index) => {
            return moment(text).format('YYYY-MM-DD')
        }
        columns[4].render = (text,record,index) => {
            return moment(text).format('YYYY-MM-DD')
        }
        return columns;
    }

    handleClick = () => {
        this.context.router.push('/recruit/6');     
    }

    onModalChange = () => {
        if(this.isIframeRefresh){
            this.props.getEntryPerson();
        }
    }

    render() {
        const {isLoading=false,list=[]} = this.props;
        return (
            <div className="entry-person box-border">
                <div className="title" onClick={this.handleClick}>待入职人员</div>
                <Table 
                    columns={this.columns}
                    dataSource={list.map((item,index)=>{
                        return merge(
                            {key:index},
                            item,
                            {entry: 
                                <span className="entry-manage">
                                    管理&nbsp;<Icon type="caret-right" />
                                </span>}
                        );
                    })}
                    pagination={false}
                    loading={isLoading}
                />
                {/*招聘人员详细信息Modal页面*/}
                <ResumeModalComponent onChange={this.onModalChange} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    visible: state.Recruit.visible,
    list: state.Home.entryPersonList,
    isLoading: state.Home.isEntryLoading
})
const mapDispatchToProps = dispatch => ({
    getEntryPerson: bindActionCreators(Actions.homeActions.getEntryPerson, dispatch),
    resetEntryPerson: bindActionCreators(Actions.homeActions.resetEntryPerson, dispatch),
    showResumeModal: bindActionCreators(Actions.RecruitActions.showResumeModal, dispatch)  
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);