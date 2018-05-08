import React, {Component} from 'react';

// antd
import { Modal, Select, Pagination } from 'antd';
const Option = Select.Option;

//lodash
import pickBy from 'lodash/pickBy';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class DepartmentStaff extends Component {
  state = { 
    visible: false,
    name:'',
    resultTree: [],
    flag: true,
    departmentInfo:{},
    department:'',
    uid:'',
    curr:''
  }

  componentDidMount(){
    const { flag } = this.state;
    const { departmentList:{list} ,getTreeList} = this.props;
    const resultTree = getTreeList(list);
    if(flag){
      this.setState({flag:false,resultTree})
    }
  }

  // 调换部门
  changeDepartment = (item) => {
    this.setState({departmentInfo:item})
    this.showModal()
  }
  handleChange = (value, data) => {
    this.setState({uid:value,department:data.props.children})
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    const { departmentInfo, uid, department } = this.state;
    var dataInfo = {};
    dataInfo.department = department;
    dataInfo.rid = departmentInfo.rid.toString();
    dataInfo.departmentid = uid.toString();
    this.props.editEmployeeInformation(dataInfo, this.props);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  
  // 点击改变样式
  handleClick = (i) => {
    this.setState({curr: i})
  }

  // 点击分页
  changePage = (page, pageSize)=>{
    const { currentUid, departmentName,departmentStaff:{count} } = this.props;
    this.props.getDepartMentStaff({departmentId:currentUid,skip:(page-1)*5+'',count:count.toString()},currentUid,departmentName,page)
  }
  
  render() {
    const { departmentInfo, resultTree } = this.state;
    const { departmentStaff, departmentList:{list}, currentUid, departmentName, current } = this.props;
    return (
      <div className='pull-left organize-tree-right'>
          <div className='department-title'><div></div>{departmentName}</div>
          <div className='down-line'></div>

          {/* 下级部门 */}

          <div className='sub-department'>
            <div className='sub-title'>下级部门</div>
            <div className='sub-depart-table'>
              <div className='sub-depart-table-title'>
                <span>部门名称</span>
                <span className='left-width'>部门人数</span>
              </div>
              {
                departmentStaff.departmentList && departmentStaff.departmentList.length > 0 ? departmentStaff.departmentList.map((item,index)=>(
                  <div className='sub-depart-table-lab'>
                    <span className='left'>{item.name}</span>
                    <span className='right'>{item.count?item.count:0}</span>
                  </div>
                )):
                <div className='sub-depart-table-lab'>
                  <div className='center'>暂无数据</div>
                </div>
              }
            </div>
          </div>
          {/* 部门在职员工 */}

          <div className='sub-department-two'>
            <div className='sub-title'>部门在职员工（{departmentStaff && departmentStaff.count}）<span className='pull-right operate' style={{display:'none'}}>批量调整</span></div>
            <div className='sub-depart-table'>
              <div className='sub-depart-table-title'>
                <span className='one'>姓名</span>
                <span className='two'>部门</span>
                <span className='three'>岗位</span>
                <span className='four'>操作</span>
              </div>
              {
                departmentStaff.resumeoffList && departmentStaff.resumeoffList.length > 0 ?  departmentStaff.resumeoffList.map((item,index)=>(
                  index<5?
                  <div className={item === this.state.curr ? 'curr sub-depart-table-lab' : 'sub-depart-table-lab'} onClick={this.handleClick.bind(this, item)}>
                    <span className='one'>{item.name}</span>
                    <span className='two'>{item.department}</span>
                    <span className='three'>{item.position}</span>
                    <span className='four' onClick={this.changeDepartment.bind(this,item)}>调换部门</span>
                  </div>:""
                )):
                <div className='sub-depart-table-lab'>
                  <div className='center'>暂无数据</div>
                </div>
              }
              <Pagination defaultCurrent={1} current={current} defaultPageSize={5} total={departmentStaff.count} size={"small"} style={{textAlign: 'center',marginBottom:'8px'}} onChange={this.changePage} />
            </div>
          </div>

          {/* 调换部门弹窗 */}

          <div>
            <Modal
              title="部门人员调动"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className='sub'>
                <span className='sub-title'>原属部门：</span><span className='sub-content'>{departmentInfo.department}</span>
              </div>
              <div className='department'>
                <span className='name'>调至部门：</span>
                <div className='input-type'>
                  <Select
                      style={{ width: 200 }}
                      onSelect={this.handleChange}
                    >
                      {
                        resultTree.map((item,index)=>{
                            return (<Option key={item.supDepartmentId} value={item.uid}>{item.name}</Option>)
                          }
                        )
                      }
                  </Select>
                </div>
              </div>
            </Modal>
          </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  departmentList: state.Manage.departmentList,
  departmentStaff: state.Manage.departmentStaff,
  currentUid: state.Manage.currentUid,
  departmentName: state.Manage.departmentName,
  current: state.Manage.current,
})
const mapDispatchToProps = dispatch => ({
  getDepartMentStaff: bindActionCreators(Actions.ManageActions.getDepartMentStaff, dispatch),
  editEmployeeInformation:bindActionCreators(Actions.ManageActions.editEmployeeInformation,dispatch),
  getTreeList:bindActionCreators(Actions.ManageActions.getTreeList,dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentStaff);