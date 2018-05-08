import React, {Component} from 'react';
import { Tabs ,Menu, Dropdown, Icon, message} from 'antd';
const TabPane = Tabs.TabPane;

import PositionInfo from './position-info';
import PersonalInfo from './personal-info';
import WagesSocialSecurity from './wages-si';
import Contract from './contract';
import MaterialAttach from './material-attach';
import OperateHistory from './operate-history';
import CreditInvestgation from './credit-investgation';

export default class MainContent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps !== this.props;
    }

    render() {
        const { 
            data, 
            editEmployeeInformation , 
            operationList , 
            UploadMaterial,
            queryEmployee,
            searchCreditInvestgation,
            getTreeList,
            departmentList,
            crewList
        } = this.props;
        const {
            resumeoff={},                   //员工信息表
            wage={},                        //薪资状况
            contract={},                    //合同信息
            edu = {},
            list={},                        //人员附件列表集合
            listAll={}                      //人员基本附件说明
        } = data;
        const allCrewList = crewList.list;
        const contractData = contract == null ? {} : contract;
        const menu ={}
        return (
            <div className="clerk-nav-tabs">
                <Tabs defaultActiveKey="1" 
                      tabBarStyle = {{
                        width: 870,
                        borderBottom: "none",
                        fontSize: '16',
                        fontWeight: "bold"
                      }}
                >
                    <TabPane tab="在职信息" key="1">
                        <PositionInfo 
                            data={resumeoff} 
                            editEmployeeInformation={editEmployeeInformation}
                            departmentList={departmentList}
                            getTreeList={getTreeList}
                            allCrewList={allCrewList}
                        />
                    </TabPane>
                    <TabPane tab="个人信息" key="2">
                        <PersonalInfo 
                            data={resumeoff} 
                            edu={edu} 
                            editEmployeeInformation={editEmployeeInformation}
                            queryEmployee={queryEmployee}
                             />
                    </TabPane>
                    <TabPane tab="工资社保" key="3">
                        <WagesSocialSecurity 
                            data={resumeoff} 
                            wage={wage}
                            editEmployeeInformation={editEmployeeInformation}
                            queryEmployee={queryEmployee}
                        />
                    </TabPane>
                    <TabPane tab="合同情况" key="4">
                        <Contract 
                            data={resumeoff}
                            listAll={listAll} 
                            editEmployeeInformation={editEmployeeInformation}
                        />
                    </TabPane>
                    <TabPane tab="材料附件" key="5">
                        <MaterialAttach/>
                    </TabPane>
                    <TabPane tab="操作记录" key="6">
                        <OperateHistory data={operationList} />
                    </TabPane>
                    <TabPane tab="人员征信" key="7">
                        <CreditInvestgation data={resumeoff} {...this.props}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}