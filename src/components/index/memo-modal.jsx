import React , { Component } from "React"
import {Modal , Input , Icon} from 'antd';

import InputComponent from './input';
import pickBy from 'lodash/pickBy';
import moment from 'moment';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MemoModalComponent extends Component {
    
    state = {
        memos:'',
        memonsdate: null,
        errorText: false,
        errorTime: false
    }
    //备忘录内容
    addMemo = (value) => {
        this.setState({
           memos:value
        })
    }
    //时间
    addTime = (value) => {
        this.setState({
           memonsdate:value
        })
    }
    //添加备忘录
    addMemoValue = () =>{
        const {memonsdate, memos} = this.state;
        const onDateMM = moment().format("YYYY-MM-01")
       //没有选择时间打开弹层
        if(!memonsdate){
            this.setState({
                errorTime:true
            })
            return false
        }else {
            this.setState({
                errorTime:false
            })
        }
        if(memos === ''){
            this.setState({
                errorText:true
            })
            return false
        }else {
            this.setState({
                errorText:false
            })
        }
        const filterObj = pickBy(this.state,(val,key)=>{
            return val !== false;
        });
        this.props.addMemoContent({...this.state},this.props,{onDateMM:onDateMM})
        this.props.hideMemoModal()  
    }
    //隐藏添加备忘录modal
    hideMemoModal = () => {
        this.props.hideMemoModal()
    }
    //重置添加备忘录内容
    resetForm = (e) => {
        if (e!=undefined && e!=null){
            e.resetForm()
            this.setState({
                memos:'',
                memonsdate: null,
                errorTime: false
            }) 
        }      
    }
    render(){
       const {memoModalVisible} = this.props
        return(
            <Modal
                title="添加备忘录"
                visible = {memoModalVisible}
                className = "add-memo-modal grey-close-header"
                onCancel = {this.hideMemoModal}
                width = {510}
                okText = "添加"
                onOk = {this.addMemoValue}
            >
                <div className="memo-body">
                    {memoModalVisible?
                    <InputComponent
                        ref = {this.resetForm} 
                        resetForm = {this.resetForm}
                        getTime = {this.addTime}
                        getValue = {this.addMemo}
                        error = {{...this.state}}
                        timePlaceholder="请填写预处理时间"
                        memoPlaceholder="将文本添加到备忘录......"
                    />:null}
                </div>
            </Modal>
        )
    }
}
const mapStateToProps = state => ({
    memoModalVisible: state.Home.memoModalVisible
})
const mapDispatchToProps = dispatch => ({
    hideMemoModal: bindActionCreators(Actions.homeActions.hideMemoModal, dispatch),
    addMemoContent: bindActionCreators(Actions.homeActions.addMemoContent, dispatch),
    getMemoContent:bindActionCreators(Actions.homeActions.getMemoContent, dispatch)
})
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(MemoModalComponent)