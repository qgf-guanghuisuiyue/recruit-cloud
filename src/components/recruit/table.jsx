import React, {Component} from 'react';

import {Table,Button, Icon} from 'antd';

import LoadingComponent from 'components/loading';

import columns from 'data/table-columns/recruit-table';
import trim from 'lodash/trim';
import merge from 'lodash/merge';
import moment from 'moment';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponents extends Component {
    
    showResumeModal = (record) => {
        // 显示详情页面Modal 
        /**
         * id 流程id
         * resumeid 简历id
         */
        const {resumeid,id} = record;
        // 获取简历详细信息
        this.props.showResumeModal({id,resumeid});
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.props !== nextProps;
    }
    componentDidMount(){
        this.getColumns()
    }
    getColumns = () => {
        columns[0].render = (text,record,index) => {           
            return  <a 
                        className="hover" 
                        href="javascript:void(0)" 
                        title={text}
                        onClick={this.showResumeModal.bind(this,record)}
                    >
                        {trim(text)}
                    </a>
        }
        columns[columns.length-2].render = (text,record,index)=>{
            return <span title={moment(text).format("YYYY-MM-DD")}>{moment(text).format("YYYY-MM-DD")}</span>;
        }
        columns[columns.length-1].render = (text,record,index)=>{
            return <span className="prestatusname-manage">{text?text:"无"}</span>;
        }
        return columns;
    }

    render() {
        const {
            recruitList,
            isLoading,
            paginationChange,
            paginationCurrent,
            title
        } = this.props;
        return (
            <div style={{
                position: 'relative'
            }}>
                <div className="table-control" style={{width:200}}>
                    <span style={{fontWeight:"bold",fontSize:16,color:"black"}}>{title}</span>  
                </div>

                <Table 
                    bordered
                    loading={isLoading}
                    columns={this.getColumns()} 
                    dataSource={
                        recruitList.list.map((item,index)=>{
                            item.key = index;
                            return item;
                        })
                    }
                    pagination={{
                        defaultPageSize: 20 ,
                        total: recruitList.count,
                        current: paginationCurrent,
                        onChange:(page,pageSize)=> paginationChange(page,pageSize)
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Recruit.isListLoading,
    recruitList: state.Recruit.recruitList // 列表数据
})
const mapDispatchToProps = dispatch => ({
    showResumeModal: bindActionCreators(Actions.RecruitActions.showResumeModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponents);