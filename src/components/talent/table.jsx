import React, {Component,PropTypes} from 'react';

import {Table,Icon} from 'antd';

import MoveModalComponents from './modal';

// 表格列数据
import columns from 'data/table-columns/talent-table';


// lodash
import trim from 'lodash/trim';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponent extends Component {
    
    static propTypes = {
        paginationChange: PropTypes.func
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    _getColumns = () => {
        const {collectionResume,cancelCollectionResume} = this.props;
        columns[0].render = (text,record,index) => {
            return (
                <a 
                    href="javascript:;" 
                    className="hover"
                    onClick={()=>this.showResumeModal(record)}
                >
                    {trim(text)}
                </a>
            )
        }

        columns[columns.length - 2].render = (text,record,index) => {
            return (
                <a onClick={()=>this.showResumeModal(record)} href="javascript:;" className="highlight-text">
                   {text}
                </a>
            )
        }

        columns[columns.length - 1].render = (text,record,index) => {
            const {resumeid} = record;
            return (
                <a href="javascript:;">
                    <img 
                        src={`./static/images/talent/fav${parseInt(text) ? 1 : 2}.png`} 
                        alt={parseInt(text) ? '收藏' : '未收藏'} 
                        onClick={
                            parseInt(text) ? ()=>cancelCollectionResume({resumeid}) : ()=>collectionResume({resumeid})
                        }
                        style={{
                            height: 17,
                            verticalAlign: 'middle',
                            marginLeft: 7
                        }}
                    />
                </a>
            )
        }
        return columns;
    }

    showResumeModal(record) {
        const {resumeid} = record;
        this.props.showResumeModal({resumeid});
    }

    render() {
        const {
            tableHead,
            talentList,
            paginationChange,
            isLoading,
            paginationCurrent,
            customNavData,
            selectedRowKeys,
            onSelectChange 
        } = this.props,
            {list,count} = talentList,
            hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <MoveModalComponents 
                    title={tableHead}
                    hasSelected={hasSelected} 
                    customNavData={customNavData} 
                    data={list}
                    selectedRowKeys={selectedRowKeys}
                />
                <Table 
                    rowSelection={{
                        type:'checkbox',
                        selectedRowKeys,
                        onChange: onSelectChange
                    }}
                    bordered
                    loading={isLoading}
                    columns={this._getColumns()} 
                    dataSource={
                        list.map((item,index)=>{
                            item.key = index;
                            item.control =<span className="action" >推荐&nbsp;<Icon type="caret-right"/></span>;
                            return item;
                        })
                    }
                    pagination={{
                        defaultPageSize:18,
                        total: count,
                        current: paginationCurrent,
                        onChange:(page,pageSize)=> paginationChange(page,pageSize)
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Talent.isListLoading,
    talentList: state.Talent.talentList // 列表数据
})
const mapDispatchToProps = dispatch => ({
    showResumeModal: bindActionCreators(Actions.RecruitActions.showResumeModal, dispatch),
    collectionResume: bindActionCreators(Actions.TalentActions.collectionResume, dispatch),
    cancelCollectionResume: bindActionCreators(Actions.TalentActions.cancelCollectionResume, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);