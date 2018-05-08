import React, {Component, PropTypes} from 'react';
import { Button, Menu, Dropdown,Icon, Select, notification} from 'antd';

import UploadClerkModal from './upload-clerk-modal';
import pickBy from 'lodash/pickBy';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';


class ControlComponent extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    handleLinkTo = () => {
        this.context.router.push(`manager/newClerkForm`);
        NProgress.start();
    }

    handlePlusClerkClick = (e) => {
        switch(e.key){
            case '1': this.props.showUploadClerkModal(); break;
            case '2': this.handleLinkTo(); break;
        }
    }

    handleIntheTimeClick = (value) => {
        const {handleFind} = this.props;
        switch(value)
            {
                case "按入职时间从早到晚":
                    handleFind({sort:"asc"});
                    break;
                case "按入职时间降序":
                    handleFind({sort:"desc"});
                    break;
                default :
                    break;    
            }
    }

    //导出
    handleExportClerkClick = () => {
        const {
            exportEmployees,
            ridList,
            startExportEmployees
        } = this.props;
        const ridArr = ridList.split(',');
        if(ridArr.length===0 || ridArr[0] == ''){
            notification.warning({
                message: '警告',
                description: '至少选择一位具体人员！'
            });
            return false;
        }else {
            startExportEmployees();
            exportEmployees(ridList);
        }   
    }

    //删除
    handleDeleteClerkClick = () => {
        const {
            deleteEmployees,
            ridList,
        } = this.props;
        deleteEmployees(ridList);
    }

    render() {
        const { 
            title,
            ridList,
            exportClerkList,
            deleteClerkList
        } = this.props;
        const plusClerkMenu = (
            <Menu onClick={this.handlePlusClerkClick}>
              <Menu.Item key="1">导入Excel人员信息</Menu.Item>
              <Menu.Item key="2">手动添加</Menu.Item>
            </Menu>
        );
        return (
            <div className="control">
                <div className="pull-left">
                    <h2>{title}</h2>
                </div>
                <div className="pull-right">
                    <Dropdown overlay={plusClerkMenu}>
                        <Button style={{ width: 100 }} type="primary">
                            添加员工
                            <img src="static/images/manager/arrow-down.png" alt="选择"/>
                        </Button>
                    </Dropdown>
                    <Select 
                        defaultValue="按入职时间降序" 
                        style={{width: 170,height:30,marginLeft: 10}}
                        onChange={this.handleIntheTimeClick}
                    >
                        {
                            [
                                "按入职时间降序",
                                "按入职时间从早到晚"
                            ].map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Button
                        style={{
                            width: 100
                        }}
                        loading={exportClerkList.isLoading}
                        onClick={this.handleExportClerkClick}
                    >
                        导出
                    </Button>
                    <Button
                        style={{
                            width: 100
                        }}
                        loading={deleteClerkList.isLoading}
                        onClick={this.handleDeleteClerkClick}
                    >
                        删除
                    </Button>
                </div>
                <div className="clearfix"></div>
                <UploadClerkModal {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    uploadClerkModal: state.Manage.uploadClerkModal
})

const mapDispatchToProps = dispatch => ({
    showUploadClerkModal: bindActionCreators(Actions.ManageActions.showUploadClerkModal,dispatch),
    hideUploadClerkModal: bindActionCreators(Actions.ManageActions.hideUploadClerkModal,dispatch),
    removeUploadFIle: bindActionCreators(Actions.FileActions.removeUploadFIle, dispatch),
    uploadClerkExcel: bindActionCreators(Actions.ManageActions.uploadClerkExcel, dispatch),
    setResetFormFalse: bindActionCreators(Actions.ManageActions.setResetFormFalse, dispatch),
    downloadTememployees: bindActionCreators(Actions.ManageActions.downloadTememployees, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlComponent)