import React, {Component} from 'react';
import ProgressComponent from './archives/progress';
import TableComponent from './archives/table';
import { Modal , Progress } from 'antd';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class ArchivesPage extends Component {
    state = {
        ridName :{},
        sort:'2',
        progressVisible:false,
        percent:0
    }
     componentDidMount(){
        this.props.getArchivesList({sort:'2'});
        this.props.getArchivesData();
        NProgress.done();
        
     }
    componentWillUnmount() {
        clearInterval(this.loopTime);
    }
    progressPercent = () => {
        this.setState({
            percent:parseInt(this.state.percent)+10
        })
        if(this.state.percent>=100){
            clearInterval(this.loopTime);
            this.props.cancelProgress();
            this.setState({
                percent:0
            })
        }
     }
     componentWillReceiveProps(nextProps){
        const {progressVisible} = nextProps;
        this.setState({
            progressVisible
        })
        if(progressVisible){
            this.loopTime = setInterval(()=>{
                this.progressPercent()
            },100);
        }     
    }
     
     getRid = (value) => {
        this.setState({
            ridName:value
        })
    }
    sortMethod = (value) => {
        this.setState({
            sort:value
        })
    }
     

     render(){
        const { 
            routes , 
            archivesList ,//在职人员列表
            archivesData , //在职、离职人数、百分比数据
            changeTableData , //改变在职、离职table数据索引
            archivesTableData,//在职、离职table数据索引
            leaveArchivesList,//离职人员table列表
            getArchivesList,//获取在职人员列表数据
            getLeaveArchivesList,//获取离职人员列表数据
            showPersonalMaterialModal,//显示个人材料Modal
            hidePersonalMaterialModal,//隐藏个人材料Modal
            personalMaterialVisible,//个人材料状态
            personalMaterialData,//个人材料数据
            downloadMaterial,//下载材料附件
            editEmployeeInformation,//添加、编辑员工信息
            showProgress
        } = this.props;
        const {progressVisible, percent} = this.state;
        return (
            <div className="archives-right">
                <div className="box-border right-panel">
                    <ProgressComponent 
                        archivesData={archivesData}
                        changeTableData={changeTableData}
                        getArchivesList={getArchivesList}
                        getLeaveArchivesList={getLeaveArchivesList}
                        archivesTableData={archivesTableData}
                        downloadMaterial={downloadMaterial}
                        ridName = {this.state.ridName}
                        sortMethod={this.sortMethod}
                        showProgress = {showProgress}
                    />
                    <div>
                        <TableComponent 
                            archivesList={archivesList}
                            leaveArchivesList={leaveArchivesList}
                            archivesTableData={archivesTableData}
                            showPersonalMaterialModal={showPersonalMaterialModal}
                            hidePersonalMaterialModal={hidePersonalMaterialModal}
                            personalMaterialVisible={personalMaterialVisible}
                            personalMaterialData={personalMaterialData}
                            getRid = {this.getRid}
                            getArchivesList={getArchivesList}
                            getLeaveArchivesList={getLeaveArchivesList}
                            editEmployeeInformation={editEmployeeInformation}
                            sort={this.state.sort}
                        />
                    </div>
                    <Modal
                        style={{top:400}}
                        closable={false}
                        footer={null}
                        visible={progressVisible}
                    >
                        <Progress percent={percent} />
                        <span>材料附件下载</span>
                    </Modal>
                </div>
            </div>
        );
     }
 }

 const mapStateToProps = state => ({
    archivesList: state.Manage.archivesList,
    archivesData: state.Manage.archivesData,
    archivesTableData: state.Manage.archivesTableData,
    leaveArchivesList: state.Manage.leaveArchivesList,
    personalMaterialVisible: state.Manage.personalMaterialVisible,
    personalMaterialData: state.Manage.personalMaterialData,
    progressVisible: state.Manage.progressVisible
 })
 const mapDispatchToProps = dispatch => ({
    getArchivesList:bindActionCreators(Actions.ManageActions.getArchivesList, dispatch),
    getArchivesData:bindActionCreators(Actions.ManageActions.getArchivesData, dispatch),
    changeTableData:bindActionCreators(Actions.ManageActions.changeTableData, dispatch),
    getLeaveArchivesList:bindActionCreators(Actions.ManageActions.getLeaveArchivesList, dispatch),
    showPersonalMaterialModal:bindActionCreators(Actions.ManageActions.showPersonalMaterialModal, dispatch),
    hidePersonalMaterialModal:bindActionCreators(Actions.ManageActions.hidePersonalMaterialModal, dispatch),
    downloadMaterial:bindActionCreators(Actions.ManageActions.downloadMaterial, dispatch),
    editEmployeeInformation:bindActionCreators(Actions.ManageActions.editEmployeeInformation,dispatch),
    cancelProgress: bindActionCreators(Actions.ManageActions.cancelProgress,dispatch),
    showProgress: bindActionCreators(Actions.ManageActions.showProgress,dispatch)
 })
 export default connect(
     mapStateToProps,
     mapDispatchToProps
 )(ArchivesPage)