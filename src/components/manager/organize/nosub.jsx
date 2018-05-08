import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import store from 'store';
import {Link} from 'react-router';
// antd
import { Modal, Select } from 'antd';
const Option = Select.Option;

export default class NoSubDepartment extends Component {
  state = { 
  }
  componentDidUpdate(){
  }

  
  
  render() {
    
    return (
      <div className='pull-left organize-tree-right'>
          <div className='department-title'>暂无下级部门</div>
          <div className='down-line'></div>

          {/* 下级部门 */}

          <div className='sub-department'>
            <Link to='manager/newClerkForm' ><img src="/static/images/manager/clerk/head.png"/></Link>
              <div className='text'><span>点击部门，调整员工 / </span><Link to='manager/newClerkForm' ><span className='one'>添加员工+</span></Link></div>
          </div>
      </div>
    );
  }
}
