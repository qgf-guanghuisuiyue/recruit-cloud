import React, {Component} from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import EmployeesOverview from './condition/overview';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ConditionPage extends Component {

     componentDidMount(){
        NProgress.done();
        [1,2,3,4,5,6,7,8].forEach((item)=>{
            this.props.getEmployeeQuality({counttype: item.toString()});
        })
     }
     callback(key) {
        // console.log(key);
     }
     render(){
        const {routes} = this.props;
        return (
            <div className="right-panel condition-page">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="员工概览" key="1">
                        <EmployeesOverview/>
                    </TabPane>
                    {/* <TabPane tab="趋势分析" key="2">趋势分析</TabPane>
                    <TabPane tab="离职分析" key="3">离职分析</TabPane>
                    <TabPane tab="招聘分析" key="4">招聘分析</TabPane> */}
                </Tabs>
            </div>
        );
     }
 }
const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    getEmployeeQuality: bindActionCreators(Actions.ManageActions.getEmployeeQuality, dispatch)
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConditionPage)