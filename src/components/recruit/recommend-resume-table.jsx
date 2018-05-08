import React, {Component} from 'react';

import {Table} from 'antd';

import moment from 'moment';

import columns from 'data/table-columns/recommend-resume-table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RecommendResumeTableComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps;
    }

    componentDidMount() {
        const {resumeid,requestData} = this.props;
        // 获取导入简历选择职位列表
        requestData(resumeid);
    }

    selectPosition = record => {
        const {selectPosition,hideModal} = this.props;
        // 隐藏Modal
        hideModal();
        // 传递选中的职位名
        selectPosition(record);
    }

    handleClick = record => {
        if(location.hash.indexOf('resumeInfo') !== -1) {
            const {resumeid,recommendPosition,recommendPositioning,res} = this.props,
                {positionid} = record;
            if(recommendPositioning) return ;
            recommendPosition({resumeid,positionid},res.data);
        }else{
            this.selectPosition(record)
        }
    }

    _getColumns() {
        columns[columns.length - 1].render = (text,record,index)=>{
            const isFlag = text === '已申请' ? 0 : 1;
            return (
                <a 
                    href="javascript:;" 
                    className={isFlag ? "highlight-text" : ''}
                    onClick={isFlag ? ()=>this.handleClick(record) : null}
                >
                    {text}
                </a>
            )
        }
        return columns;
    }

    render() {
        const {res,paginationCurrent,paginationChange} = this.props,
            {isLoading,data} = res,
            {allRecords,list} = data;
        const {hash} = location;
        return (
            <Table 
                columns={this._getColumns()}
                dataSource={
                    list.map((item,index)=>{
                        item.starttime = moment(item.starttime).format('YYYY-MM-DD');
                        item.endtime = moment(item.endtime).format('YYYY-MM-DD');
                        item.key = index;
                        item.control = hash.indexOf('resumeInfo') !== -1 ? item.isFlag : '选择';
                        return item;
                    })
                }
                loading={isLoading}
                bordered
                pagination={{
                    defaultPageSize:10,
                    total: allRecords,
                    current: paginationCurrent,
                    onChange:(page,pageSize)=> paginationChange(page,pageSize)
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    res: state.Recruit.recommendModal,
    recommendPositioning: state.Talent.recommendPositioning
})
const mapDispatchToProps = dispatch => ({
    selectPosition: bindActionCreators(Actions.RecruitActions.selectPosition, dispatch),
    recommendPosition: bindActionCreators(Actions.TalentActions.recommendPosition, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecommendResumeTableComponent);