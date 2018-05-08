import React, {Component} from 'react';

import {Button,Modal,Select} from 'antd';
const Option = Select.Option;

import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';
import get from 'lodash/get';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MoveModalComponents extends Component {

    state = {
        selectLabelId: undefined
    }

    moveResume = () => {
        // 移动简历操作
        const {selectLabelId} = this.state;
        if(!selectLabelId) return ;
        const {data,selectedRowKeys,moveResume,getTalentCategory} = this.props;
        let filterArr = filter(data,(item,index)=>{
            return indexOf(selectedRowKeys,index) !== -1;
        });
        let str = filterArr.map(item=>{
            return get(item,['resumeid']);
        }).join(',');
        moveResume({
            resumeid: str,
            lableid: selectLabelId
        },getTalentCategory);
    }   

    componentWillUpdate(nextProps,nextState) {
        const {customNavData} = nextProps;
        if(customNavData.length === 0 && this.state.selectLabelId){
            this.handleChange(undefined);
        }
        if(customNavData.length > 0 && !this.state.selectLabelId){
            this.setState({
                selectLabelId:customNavData[0].id
            });
        }
    }

    setModalVisible(modalVisible) {
        // 设置Modal的显示与隐藏
        if(modalVisible){
            this.props.showMoveResumeModal();
        }else{
            this.props.hideMoveResumeModal();
        }
    }

    handleChange = (value) => {
        // 多选框变化回调
        this.setState({
            selectLabelId: value
        });
    }

    render() {
        const {
            hasSelected,
            customNavData,
            moveModal,
            title
        } = this.props,
            {selectLabelId} = this.state,
            {isLoading,modalVisible} = moveModal;
        return (
            <div className="table-control">
                    <Button className="pull-right"
                        onClick={()=>this.setModalVisible(true)}
                        disabled={!hasSelected}
                    >移动</Button>
                     <span 
                        className="pull-left"
                        style={{
                            fontWeight:"bold",
                            fontSize:16,
                            color:"black"}}
                     >{title}</span>
                    <Modal
                        title="移动"
                        wrapClassName="vertical-center-modal"
                        visible={modalVisible}
                        confirmLoading={isLoading}
                        onOk={this.moveResume}
                        onCancel={() => this.setModalVisible(false)}
                    >
                        <span style={{
                            marginRight: 16
                        }}>移动到</span>
                       
                        <Select 
                            placeholder="请选择要移动到的分类" 
                            style={{ width: 395 }}
                            onChange={this.handleChange}
                            value={selectLabelId}
                        >
                            {
                                customNavData.map((item,index)=>{
                                    return (
                                        <Option 
                                            key={index} 
                                            value={item.id}
                                        >
                                            {item.lablename}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    moveModal: state.Talent.moveModal
})
const mapDispatchToProps = dispatch => ({
    moveResume: bindActionCreators(Actions.TalentActions.moveResume, dispatch),
    getTalentCategory: bindActionCreators(Actions.TalentActions.getTalentCategory, dispatch),
    showMoveResumeModal: bindActionCreators(Actions.TalentActions.showMoveResumeModal, dispatch),
    hideMoveResumeModal: bindActionCreators(Actions.TalentActions.hideMoveResumeModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoveModalComponents);