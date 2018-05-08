import React, {Component,PropTypes} from 'react';
import { Button, Select, Menu, Dropdown, notification } from 'antd';
import trim from 'lodash/trim';
import isNumber from 'lodash/isNumber';
import moment from 'moment';
moment.locale("zh-cn");

import clerkInfo from 'data/clerk/clerk';
import LoadingComponent from 'components/loading';


export default class HeaderInfoComponent extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state = {
        constellation:'',
        name:'',           //姓名
        englishname:'',    //英文名      
        department:'',     //部门
        position:'',       //职位
        sex:'',            //性别
        birthday:'',       //出生日期
        inthetime:'',       //入职时间
        resumeid:'',
        isLoading: true
    }

    componentWillReceiveProps(nextProps){
        const dataArr = Object.keys(nextProps.data);
        if(dataArr.length!=0) {
            const {data}=nextProps,
            {isLoading} = this.state,
            {resumeoff={},constellation} = data,
            {
                name,           //姓名
                englishname,    //英文名      
                department,     //部门
                position,       //职位
                sex,            //性别
                birthday,       //出生日期
                inthetime,       //入职时间
                resumeid,
                workstatus
            } = resumeoff;
            this.setState({
                constellation,
                name,           //姓名
                englishname,    //英文名      
                department,     //部门
                position,       //职位
                sex,            //性别
                birthday,       //出生日期
                inthetime,       //入职时间
                resumeid,
                workstatus,
                isLoading: false
            });
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps !== this.props || nextState != this.state;
    }

    // creditInvestgation = () => {
    //     console.log('人员征信');
    // }

    //查看简历
    showResumeModal = (resumeid,rid) => {
        const {
            showResumeModal
        } = this.props;
        showResumeModal({resumeid,rid})
    }

    handleMoreOthersClick = (e) => {
        const {
            showPermanentModal,
            showDismissionModal
        } = this.props;
        const {workstatus} = this.state;
        switch(e.key){
            // case '1': console.log('生成信息填写二维码'); break;
            case '1': 
                if(workstatus === 1) {
                    notification.info({
                        message: '提示',
                        description: '该员工已转正'
                    });
                }else {
                    showPermanentModal(); 
                }; 
                break;
            case '2': 
                if(workstatus === 2) {
                    notification.info({
                        message: '提示',
                        description: '该员工已离职'
                    });
                }else {
                    showDismissionModal();
                }; 
                break;
            // case '4': console.log('删除员工'); break;
        }
    }

    render() {
        const {
            rid,
            showTransferPersonnelModal
        }=this.props,        
        {
            constellation='',
            name='',           //姓名
            englishname='',    //英文名      
            department='',     //部门
            position='',       //职位
            sex='',            //性别
            birthday='',       //出生日期
            inthetime='',       //入职时间
            resumeid='',
            workstatus='',
            isLoading
        } = this.state;
        const moreOthers = (
            <Menu onClick={this.handleMoreOthersClick}>
                {/* <Menu.Item key="1">生成信息填写二维码</Menu.Item> */}
                <Menu.Item key="1">转正</Menu.Item>
                <Menu.Item key="2">办理离职</Menu.Item>
                {/* <Menu.Item key="4">删除员工</Menu.Item> */}
            </Menu>
        );
        return (
            <div className="header-info" style={{position: 'relative'}}>
                {isLoading && 
                    <LoadingComponent style={{
                        position: 'absolute',
                        height: 198,
                        top: 0,
                        width: '100%',
                        backgroundColor: '#FFF',
                        zIndex: 2
                    }} />
                }
                <div className="prime-name pull-left">
                    <span>{trim(name == undefined ? '' : name).substr(0,1)}</span>
                </div>
                <div className="base-info pull-left"
                    style={{
                        marginLeft: 28
                    }} 
                >
                    <ul>
                        <li>
                            <div className="inline-block">
                                {trim(name)}
                            </div>
                            {englishname && <div className="inline-block en-name">
                                {englishname}
                            </div>}
                        </li>
                        <li>
                                <span style={{
                                    marginRight: 6
                                }}>{department}</span>
                                {position && <span>|</span>}
                                {position && <span style={{
                                    marginLeft: 6
                                }}>{position}</span>}
                        </li>
                        <li>
                            <span style={{
                                marginRight: 6
                            }}>{sex}</span>
                            {birthday && <span>|</span>}
                            {birthday && <span style={{
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{parseInt(moment(birthday,"YYYYMMDD").fromNow())}岁</span>}
                            {constellation && <span>|</span>}
                            {constellation &&  <span style={{
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>{constellation}</span>}
                            {inthetime && <span>|</span>}
                            {inthetime && <span style={{ 
                                    marginLeft: 6,
                                    marginRight: 6
                            }}>入职时长：{moment(inthetime).startOf("day").fromNow()}</span>}
                        </li> 
                    </ul>
                </div>
                <div className="ctr-btns pull-right">
                    {/* <Button onClick={this.creditInvestgation}>
                        <img src="static/images/manager/clerk/test.png" alt="测试"/>
                        人员征信
                    </Button> */}
                    <Button onClick={this.showResumeModal.bind(this,resumeid,rid)}>
                        查看简历
                    </Button>
                    <Button onClick={showTransferPersonnelModal}>
                        人事调动
                    </Button>
                    <Dropdown overlay={moreOthers}>
                        <Button style={{ width: 100 }}>
                            更多
                            <img src="static/images/manager/arrow-up.png" alt="选择"/>
                        </Button>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
