import React, {Component,PropTypes} from 'react';

import {Button,Modal,Input} from 'antd';

// scrollbars
import { Scrollbars } from 'react-custom-scrollbars';

// lodash
import trim from 'lodash/trim';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class LeftNavComponent extends Component {

    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.array,
        isLoading: PropTypes.bool,
        onClick: PropTypes.func
    }

    state = {
        _selectedIndex: 0,
        lablename: '',
        deleteLabelName: '',
        deleteLabelId: ''
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    componentWillUpdate(nextProps,nextState) {
        const {createModal} = this.props;
        if(!createModal.isLoading && !createModal.modalVisible && this.state.lablename !== ''){
            this.setState({
                lablename: ''
            });
        }
    }

    handleClick(index,record) {
        if(this.state._selectedIndex === index) return;
        this.setState({
            _selectedIndex: index
        });
        const {onClick} = this.props;
        if(onClick){
            onClick(record);
        }
    }

    createLabel = () => {
        // 创建分类标签
        const {lablename} = this.state;
        if(trim(lablename) === ''){
            this.refs.Input.focus();
            this.setError(true);
            return ;
        } 
        this.props.createLabel({lablename},this.props.getTalentCategory);
    }

    deleteLabel = () => {
        // 删除分类标签
        const {deleteLabelName,deleteLabelId} = this.state;
        if(deleteLabelName === '' || deleteLabelId === '') return ;
        this.props.deleteLabel({
            lableid: deleteLabelId,
            lablename: deleteLabelName
        },this.props.getTalentCategory);
    }

    setError = (error) => {
        // 设置是否显示错误文本
        this.setState({error});
    }

    showDeleteLabelModal = (record={},e) => {
        // 显示删除分类Modal
        // 阻止时间冒泡
        e.stopPropagation();
        const {lablename,id} =record;
        this.setState({
            deleteLabelName: lablename,
            deleteLabelId: id
        });
        this.props.showDeleteLabelModal();
    }

    handleChange = e => {
        // 输入框onChange事件
        let val = trim(e.target.value);
        this.setState({
            lablename: val
        });
        if(val.length > 0){
            this.setError(false);
        }
    }

    handleKeyUp = e => {
        if(e.keyCode === 13){
            this.createLabel();
        }
    }

    render() {
        const {
            _selectedIndex,
            error,
            lablename,
            deleteLabelName
        } = this.state,
            {
                title='',
                data=[],
                isLoading,
                createModal,
                deleteModal
            } = this.props;
        return (
            <ul className="left-nav box-border">
                <li>
                    <a className="title" href="javascript:void(0);">{title}</a>
                    <Scrollbars style={{
                        height: 802
                    }} autoHide={true}>
                        <dl>
                            {data.map((item,index)=>{
                                const {type,title,num=0} = item;
                                return (
                                    <dd 
                                        key={index} 
                                        onClick={this.handleClick.bind(this,index,item)}
                                        className={_selectedIndex === index ? 'active' : ''}
                                    >
                                        {title} 
                                        ({isLoading ?
                                            <div 
                                                className={_selectedIndex === index ? 'preloader-white' : 'preloader'} 
                                                style={{
                                                    position: 'relative',
                                                    top: 3,
                                                    width: 16,
                                                    height: 16
                                                }}
                                            >
                                            </div> :
                                            num
                                        })
                                        {type === 'custom' && _selectedIndex !== index &&
                                            <a href="javascript:;" className="delete" onClick={(e)=>{this.showDeleteLabelModal(item,e)}}>
                                                <img 
                                                    src="./static/images/talent/delete.png" 
                                                    alt="删除"
                                                />
                                            </a>
                                        }
                                    </dd>
                                )
                            })}
                        </dl>
                    </Scrollbars>
                </li>
                <li>
                    <div className="float-button" onClick={()=>this.props.showCreateLabelModal()}>
                        <Button />
                        <span>新建类别</span>
                    </div>
                </li>
                {/*新建分类标签Modal*/}
                <Modal
                    title="新建分类"
                    wrapClassName="vertical-center-modal talent-modal"
                    visible={createModal.modalVisible}
                    confirmLoading={createModal.isLoading}
                    onOk={this.createLabel}
                    onCancel={() => this.props.hideCreateLabelModal()}
                >   
                    <div style={{
                        margin: '0 auto',
                        width: 395,
                        position: 'relative'
                    }}>
                        <Input
                            ref="Input"
                            style={{
                                width: 395,
                                height: 40,
                                fontSize: '16px',
                                border: error ? '1px solid #ff3131' : ''
                            }}
                            value={lablename}
                            placeholder="请输入分类名称" 
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                        />
                        {error &&
                            <div style={{
                                position: 'absolute',
                                fontSize: '12px',
                                marginTop: 3,
                                marginLeft: 5,
                                color: '#ff3131'
                            }}>
                                必填
                            </div>
                        }
                    </div>
                </Modal>
                {/*删除分类Modal*/}
                <Modal 
                    title="删除分类"
                    wrapClassName="vertical-center-modal talent-modal"
                    visible={deleteModal.modalVisible}
                    onOk={this.deleteLabel}
                    confirmLoading={deleteModal.isLoading}
                    onCancel={()=>{this.props.hideDeleteLabelModal()}}
                >
                    <p style={{
                        paddingLeft: 20,
                        fontSize: 16
                    }}>是否删除【{deleteLabelName}】此分类？</p>
                </Modal>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    createModal: state.Talent.createModal,
    deleteModal: state.Talent.deleteModal
})

const mapDispatchToProps = dispatch => ({
    createLabel: bindActionCreators(Actions.TalentActions.createLabel, dispatch),
    deleteLabel: bindActionCreators(Actions.TalentActions.deleteLabel, dispatch),
    getTalentCategory: bindActionCreators(Actions.TalentActions.getTalentCategory, dispatch),
    showCreateLabelModal: bindActionCreators(Actions.TalentActions.showCreateLabelModal, dispatch),
    hideCreateLabelModal: bindActionCreators(Actions.TalentActions.hideCreateLabelModal, dispatch),
    showDeleteLabelModal: bindActionCreators(Actions.TalentActions.showDeleteLabelModal, dispatch),
    hideDeleteLabelModal: bindActionCreators(Actions.TalentActions.hideDeleteLabelModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftNavComponent);