import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import store from 'store';

// antd
import { Tree, Icon, Modal, Input, message } from 'antd';
const TreeNode = Tree.TreeNode;

// loading
import LoadingComponent from 'components/loading';

class LeftTreePage extends Component {
  state = {
    name:'',
    uid:'',
    sup_id:'',
    title:'',
    title2:'',
    name2: '',
    type:'',
    departmentName:'',
    visible: false
  }
  componentDidMount(){
    this.props.getDepartMentList()
  }
  // 提示框
  info = (data) => {
    message.info(data);
  };
  // 左侧树结构
  recursion = (dataSource) => {
    return (
      dataSource.map((tree, index) => {
        if (tree.list) {
          return (
            <TreeNode title={tree.name} key={tree.uid} sup_id={tree.supDepartmentId}>
                {this.recursion(tree.list)}
            </TreeNode>
          )
        } else {
          return (
              <TreeNode title={tree.name} key={tree.uid} sup_id={tree.supDepartmentId}>
              </TreeNode>
          )
        }
      })
    )
  }

  // 选中菜单
  onSelect = (selectedKeys, info) => {
    if(selectedKeys[0]){
      const { uid } = this.state;
      this.props.getDepartMentStaff({departmentId:selectedKeys[0],skip:"0"},selectedKeys[0],info.selectedNodes[0].props.title,"1");
      this.setState({uid:selectedKeys[0], sup_id:info.selectedNodes[0].props.sup_id, name:info.selectedNodes[0].props.title,name2:info.selectedNodes[0].props.title});
    }else{
      this.setState({
        name:'',
        uid:'',
        sup_id:''
      })
      return;
    }
  }

  // 添加子部门弹窗
  showAdd = () => {
    this.setState({title:'添加子部门',type:'add',title2:'部门名称：'})
    this.addEditDeleteModal();
  }
  addEditDeleteModal = () => {
    const {name2, sup_id, uid} = this.state;
    if(!name2 || !sup_id || !uid){
      // this.info('请选择一个部门');
      // return;
      this.setState({name2:"一级部门",sup_id:"0"})
    }
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    const { uid, type, sup_id } = this.state;
    const { departmentNameInput } = this.refs;
    if(type=='add'){
      this.props.addEditDepartment({sup_id:uid,name:departmentNameInput.refs.input.value})
    }else if(type =='edit'){
      this.props.addEditDepartment({sup_id:sup_id,name:departmentNameInput.refs.input.value,uid:uid})
    }else{
      this.props.deleteDepartment({uid:uid})
    }
    this.setState({
      visible: false
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  // 编辑部门
  showEdit = () => {
    this.setState({title:'编辑部门',type:'edit',title2:'变更名称：'});
    const {name2, sup_id, uid} = this.state;
    if(!name2 || !sup_id || !uid){
        this.info('请选择一个机构');
        return;
    }
    this.addEditDeleteModal();
  }

  // 成功后执行的操作
  afterSuccess = () => {
    const { type } = this.state;
    this.info('操作成功');
    this.props.refreshDepartmentInfo();
    if(type=='delete'){
      this.setState({ name:'', uid:'', sup_id:''})
    }
  }

  // 删除部门
  showDelete = () => {
    this.setState({type:'delete',title:'删除部门'});
    const {name2, sup_id, uid} = this.state;
    if(!name2 || !sup_id || !uid){
        this.info('请选择一个机构');
        return;
    }
    this.addEditDeleteModal();
  }
  handleChange = (e) => {
    this.setState({departmentName:e.target.value,name:e.target.value})
  }
  render() {
    const {title, name, sup_id,type, title2, departmentName, name2} = this.state;
    const { departmentList:{list,isLoading}, departmentInfo } = this.props;
    // const {token,tokenKey} = store.get('token') || {};
    // console.log(tokenKey)
    // console.log(token)
    if(departmentInfo == 'success'){
      this.afterSuccess()
      this.setState({departmentName:''});
    }
    return (
        <div className='pull-left tree-type'>
            <div className='operate-button'>
              <Icon type="plus-circle-o" className='icon' onClick={this.showAdd} />
              <Icon type="edit" className='icon' onClick={this.showEdit} />
              <Icon type="delete" className='icon' onClick={this.showDelete} />
            </div>
            <div className='tree-box'>
              {!isLoading &&
                  <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      zIndex: 1
                  }}>
                      <LoadingComponent style={{
                          position: 'absolute',
                          width: '100%',
                          backgroundColor: '#FFF'
                      }} />
                  </div>
              }
              {
                <Tree 
                      defaultExpandAll={true}
                      onSelect={this.onSelect}
                >
                  {this.recursion(list)}
                </Tree>
              }
            </div>
            {/* 添加子部门-编辑部门弹窗 */}
            <Modal
              title={title}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className={type=='add'?'sub':'sub hide'}>
                <span className='sub-title'>上级：</span><span className='sub-content'>{name2}</span>
              </div>
              <div className={type=='edit'?'sub':'sub hide'}>
                <span className='sub-title'>上级：</span><span className='sub-content'>{sup_id}</span>
              </div>
              <div className={type=='edit'?'sub':'sub hide'}>
                <span className='sub-title'>部门名称：</span><span className='sub-content'>{name}</span>
              </div>
              <div className={type=='delete'?'sub2':'sub2 hide'}>
                <span className='sub-title2'>该项操作执行后，该部门信息将无法恢复，确认删除？</span>
              </div>
              <div className={type=='delete'?'department hide':'department'}>
                <span className='name'>{title2}</span>
                <div className='input-type'>
                  <Input value={departmentName} ref = "departmentNameInput" onChange={this.handleChange} />
                </div>
              </div>
            </Modal>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  departmentList: state.Manage.departmentList,
  departmentInfo: state.Manage.departmentInfo,
  isLoading: state.Manage.isLoading
})
const mapDispatchToProps = dispatch => ({
  getDepartMentList: bindActionCreators(Actions.ManageActions.getDepartMentList, dispatch),
  getDepartMentStaff: bindActionCreators(Actions.ManageActions.getDepartMentStaff, dispatch),
  addEditDepartment: bindActionCreators(Actions.ManageActions.addEditDepartment, dispatch),
  refreshDepartmentInfo: bindActionCreators(Actions.ManageActions.refreshDepartmentInfo, dispatch),
  deleteDepartment: bindActionCreators(Actions.ManageActions.deleteDepartment, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftTreePage);
 