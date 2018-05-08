import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// antd
import { Tree, Icon, Modal, Input, message, Select } from 'antd';
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

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
    visible: false,
    departmentName2:'',
    resultDepartment:[],
    needArr:[]
  }
  componentDidMount(){
    // 获取数据
    this.props.getOrganizeChart();
    this.props.getArrangeDepartment({type:"2"})
  }
  // 提示框
  info = (data) => {
    message.info(data);
  };
  // 左侧树结构
  recursion(dataSource=[]) {
    return (
        dataSource.map((tree, index) => {
            if (tree.list) {
                return (
                    tree.type == "4"?
                    <TreeNode title={tree.name} key={tree.uid} sup_id={tree.supDepartmentId} leaderName = {tree.leaderName} >
                        {this.recursion(tree.list)}
                    </TreeNode>:<TreeNode title={tree.name} disabled></TreeNode>
                )
                } else {
                return (
                    tree.type == "4"?
                    <TreeNode title={tree.name} key={tree.uid} sup_id={tree.supDepartmentId} leaderName = {tree.leaderName}>
                    </TreeNode>:<TreeNode title={tree.name} disabled></TreeNode>
                )
            }
      })
    )
  }

  // 选中菜单
  onSelect = (selectedKeys, info) => {
    if(selectedKeys[0]){
      const { uid } = this.state;
      const { arrangeDepartment } = this.props;
      var needArr = [];
      arrangeDepartment.forEach((item,index)=>{
        if(item.mechanism == "0" ||item.mechanism == selectedKeys[0] ){
          needArr.push(item.uid.toString())
        }
      });
      this.setState({resultDepartment:needArr,needArr:needArr,departmentName2:info.selectedNodes[0].props.leaderName,uid:selectedKeys[0], sup_id:info.selectedNodes[0].props.sup_id, name:info.selectedNodes[0].props.title,name2:info.selectedNodes[0].props.title});
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
    this.setState({title:'添加子机构',type:'add',title2:'机构名称：'})
    this.addEditDeleteModal();
  }
  addEditDeleteModal = () => {
    const {name2, sup_id, uid} = this.state;
    if(!name2 || !sup_id || !uid){
      // this.info('请选择一个部门');
      // return;
      this.setState({name2:"一级机构",uid:"0"})
    }
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    const { uid, type, sup_id, resultDepartment } = this.state;
    const { departmentNameInput, departmentName2Input } = this.refs;
    if(type=='add'){
      this.props.addMechnism({sup_id:uid, name:departmentNameInput.refs.input.value, leader_name:departmentName2Input.refs.input.value,stype:'4',dtype:'4'})
    }else if(type =='edit'){
      this.props.editMechnism({lead_name:departmentName2Input.refs.input.value, name:departmentNameInput.refs.input.value,uid:uid})
    }else if(type =='delete'){
      this.props.deleteMechnism({uid:uid})
    }else if(type =='tool'){
      this.props.arrangeDepartmentFuc({uid:uid,ids:resultDepartment});
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
    this.setState({title:'编辑机构',type:'edit',title2:'变更名称：'});
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
    // 获取数据
    this.props.getOrganizeChart();
    this.props.getArrangeDepartment({type:"2"})
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

    // 分配部门
    showTool = () => {
      this.setState({type:'tool',title:'分配部门'});
      const {name2, sup_id, uid} = this.state;
      if(!name2 || !sup_id || !uid){
          this.info('请选择操作目标');
          return;
      }
      this.addEditDeleteModal();
    }

  handleChange = (e) => {
    this.setState({departmentName:e.target.value,name:e.target.value})
  }
  handleChange2 = (e) => {
    this.setState({departmentName2:e.target.value})
  }
  handleChange3 = (value) => {
    this.setState({resultDepartment:value})
  }
  render() {
    const {title, name, sup_id,type, title2, departmentName, name2, departmentName2, uid, needArr} = this.state;
    const { organize:{organizeList:{list},isLoading}, mechanismInfo, arrangeDepartment } = this.props;
    if(mechanismInfo == 'success'){
      // console.log(11111,mechanismInfo)
      this.afterSuccess()
      this.setState({departmentName:'',departmentName2:''});
    }
    return (
        <div className='pull-left tree-type'>
            <div className='operate-button'>
              <Icon type="plus-circle-o" className='icon' onClick={this.showAdd} />
              <Icon type="edit" className='icon' onClick={this.showEdit} />
              <Icon type="delete" className='icon' onClick={this.showDelete} />
              <Icon type="tool" className='icon' onClick={this.showTool} />
            </div>
            <div className=''>
              {isLoading &&
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
              maskClosable={false}
            >
              <div className={type=='add'?'sub':'sub hide'}>
                <span className='sub-title'>上级：</span><span className='sub-content'>{name2}</span>
              </div>
              <div className={type=='edit'?'sub':'sub hide'}>
                <span className='sub-title'>上级：</span><span className='sub-content'>{sup_id}</span>
              </div>
              <div className={type=='edit'?'sub':'sub hide'}>
                <span className='sub-title'>机构名称：</span><span className='sub-content'>{name}</span>
              </div>
              <div className={type=='delete'?'sub2':'sub2 hide'}>
                <span className='sub-title2'>该项操作执行后，该部门信息将无法恢复，确认删除？</span>
              </div>
              <div className={type=='delete'||type=='tool'?'department hide':'department'}>
                <span className='name'>{title2}</span>
                <div className='input-type'>
                  <Input value={departmentName} ref = "departmentNameInput" onChange={this.handleChange} />
                </div>
              </div>
              <div className={type=='delete'||type=='tool'?'department hide':'department'}>
                <span className='name'>管理者名称：</span>
                <div className='input-type'>
                  <Input value={departmentName2} ref = "departmentName2Input" onChange={this.handleChange2} />
                </div>
              </div>
              <div className={type=='tool'?'department2':'department2 hide'}>
                <span className='name'>选择下属部门：</span>
                <Select value = { needArr } allowClear={true} mode="tags" style={{ width: '100%' }} placeholder="" onChange={this.handleChange3} >
                  {
                    arrangeDepartment && arrangeDepartment.map((item,index)=>{
                      if(item.mechanism == "0" ||item.mechanism == uid ){
                        return <Option key={`mechanism_${index}`} value={item.uid.toString()}>{item.name}</Option>
                      }else{
                        return <Option key={`mechanism_${index}`} value={item.uid.toString()} disabled>{item.name}</Option>
                      }
                    })
                  }
                </Select>
              </div>
            </Modal>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  organize: state.Manage.organize,
  mechanismInfo: state.Manage.mechanismInfo,
  arrangeDepartment: state.Manage.arrangeDepartment
})
const mapDispatchToProps = dispatch => ({
  addMechnism: bindActionCreators(Actions.ManageActions.addMechnism, dispatch),
  deleteMechnism: bindActionCreators(Actions.ManageActions.deleteMechnism, dispatch),
  getOrganizeChart: bindActionCreators(Actions.ManageActions.getOrganizeChart, dispatch),
  editMechnism: bindActionCreators(Actions.ManageActions.editMechnism, dispatch),
  getArrangeDepartment: bindActionCreators(Actions.ManageActions.getArrangeDepartment, dispatch),
  arrangeDepartmentFuc: bindActionCreators(Actions.ManageActions.arrangeDepartmentFuc, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftTreePage);
 