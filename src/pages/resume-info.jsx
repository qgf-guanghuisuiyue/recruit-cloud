import React, {Component , PropTypes} from 'react';
import { Icon , Tooltip} from 'antd';
import find from 'lodash/find';

// components
import HeaderInfoComponent from 'components/job/recruit-info/header-info';
import TalentHeaderInfoComponent from 'components/job/recruit-info/talent-header-info';
import MainContentComponent from 'components/job/recruit-info/main-content'; 
import SearchSalaryComponent from 'components/job/recruit-info/searchSalary'; 

import ModalComponents from 'components/resume-info/modal';
import ShareModalComponents from 'components/resume-info/share-modal';
import EvaluationModalComponents from 'components/resume-info/interview-evaluation-modal';
import BackgroundSurveyModalComponents from 'components/resume-info/background-survey';
import ShareEvaluationModalComponents from 'components/resume-info/share-evaluationModal';

// 富文本编辑器
import EmailEditorComponents from 'components/email/right';


// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ResumeInfoPage extends Component {

    state = {
        type: 0,
        time:"",//当前流程约定时间
        stage:"",//当前流程
        thelable:"",//标签
        emailState:"none"
    }
    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        const { location, routeParams, getEmailHistory} = this.props,
              { resumeId, logId } = routeParams; 
        if(this.isInRecruitPage(location.pathname)) {
            // 获取简历详情
            this.props.getRecruitResumeInfo({
                resumeId: resumeId,
                logId: logId
            });
        }
        if(this.isInTalentPage(location.pathname)){
            this.props.getTalentResumeInfo({
                resumeid: resumeId
            });
        }
        
        //获取历史邮件
        getEmailHistory();
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    handleChangeType = (type) => {
        this.setState({type});
    }

    isInTalentPage(pathname) {
        const patternTalent = /\/resumeInfo\/\d{1,}$/i;
        return patternTalent.test(pathname);
    }
    isInRecruitPage(pathname) {
        const patternRecruit = /\/resumeInfo\/\d{1,}\/\d{1,}$/i;
        return patternRecruit.test(pathname);
    }
    
    //点击查看已发送邮件
    clickLookEmail = () => {
        this.props.hideResumeModal()
        //this.context.router.push(`/email`);
    }
    componentWillReceiveProps(nextProps){
        const {historyEmail , data} = nextProps,
              {list} = historyEmail;                 
        if (list.length != 0 && data.resumeInfo){
        const {resumeInfo} = data,
            {username} = resumeInfo;
            for (let i=0;i<list.length;i++){
                if(list[i].resumename===username){
                    this.setState({
                    emailState:"block"
                    })
                }
            }
        };            
    };

    render() {
        const {type , time , stage, thelable ,emailState} = this.state,
            {isLoading,data,location,routeParams,getRecruitResumeInfo,uriParams} = this.props,      
            { logId } = routeParams,   
            isTalent = this.isInTalentPage(location.pathname),
            isRecruit = this.isInRecruitPage(location.pathname),
            {resumeid,currentPId,resumeInfo={},evaluationId,lastStageLog,stagesMap} = data,
            {username,email} = resumeInfo; 
        const staged = find(stagesMap,item=>{
                return item.iscurrentstage === '1'
            });
        return (
            <div className="resume-info-container" style={{
                height: isLoading ? '100%' : '',
                padding: isLoading ? '' : '20px 30px'
            }}>
                {isLoading &&
                    <div id="common-loader" className="common-loader page-loader theme-loader">
                        <div className="spinner">
                            <div className="dot1"></div>
                            <div className="dot2"></div>
                        </div>
                    </div>
                }
                {!isLoading &&
                        <div>
                            {isTalent && 
                                <TalentHeaderInfoComponent 
                                    data={data}
                                />
                            }
                            {isRecruit &&
                                <HeaderInfoComponent 
                                    data={data}
                                />
                            }
                            {isRecruit &&
                                <ul className="table tabs-container">
                                    <li className="table-cell empty"></li>
                                    <li 
                                        className={`tab-item table-cell boder-right-none ${type==0 ? 'active' : ''}`}
                                        onClick={() => this.handleChangeType(0)}
                                    >
                                        个人简历
                                    </li>
                                    <li 
                                        className={`tab-item table-cell ${type==1 ? 'active' : ''}`}
                                        onClick={() => this.handleChangeType(1)}
                                    >
                                    <Tooltip title={<span onClick={this.clickLookEmail}>邮件已发送！</span>}>
                                        <Icon 
                                            type="check-circle-o" 
                                            style={{display:emailState,float:"left",color:"#0086c9",position:'relative',top:-7.5,left:91}}
                                            onClick={this.searchEmail}
                                        />
                                    </Tooltip> 
                                        邮件
                                    </li>
                                    {staged!=undefined && staged.stageid>=3 && <li 
                                        className={`tab-item table-cell ${type==2 ? 'active' : ''}`}
                                        onClick={() => this.handleChangeType(2)}
                                    >
                                        行业薪资
                                    </li>}
                                    <li className="table-cell empty"></li>
                                </ul>
                            }
                            <div className="main-content" style={{
                                marginTop: isTalent ? 36 : 0
                            }}>
                                <div className={`info-content ${type==0? '' : 'none'}`}>
                                    <MainContentComponent data={data} />
                                </div>
                                {isRecruit &&
                                    <div className={`email-content ${type==1 ? '' : 'none'}`}>
                                        <EmailEditorComponents
                                            addressee={{
                                                resumeid,
                                                ...{positionid: currentPId},
                                                ...{resumename: username},
                                                ...{logId: logId},
                                                email,
                                            }}
                                        />
                                    </div>
                                }
                                {isRecruit &&
                                    <div className={`email-content ${type==2 ? '' : 'none'}`}>
                                        <SearchSalaryComponent/>
                                    </div>
                                }
                            </div> 
                            <ModalComponents />
                            {/*简历分享Modal*/}
                            <ShareModalComponents {...this.props}/>
                            {/*面试评估表*/}
                            <EvaluationModalComponents 
                                resumeid={resumeid}
                                jobid = {currentPId}
                                username = {username}
                                evaluationId={evaluationId}
                                logId={logId}
                            />
                            {/* 背景调查 */}
                            <BackgroundSurveyModalComponents resumeid={resumeid}/>
                            <ShareEvaluationModalComponents
                                resumeid={resumeid}
                                jobid = {currentPId}
                                username = {username}
                            />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Resume.resumeInfo,
    isLoading: state.Resume.isInfoLoading,
    //历史邮件
    historyEmail: state.Email.historyEmail,
})
const mapDispatchToProps = dispatch => ({
    getRecruitResumeInfo: bindActionCreators(Actions.ResumeActions.getRecruitResumeInfo, dispatch),
    getTalentResumeInfo: bindActionCreators(Actions.ResumeActions.getTalentResumeInfo, dispatch),
    getCrewList: bindActionCreators(Actions.ManageActions.getCrewList,dispatch),
    getEmailHistory: bindActionCreators(Actions.EmailActions.getEmailHistory, dispatch),
    hideResumeModal: bindActionCreators(Actions.RecruitActions.hideResumeModal, dispatch) 
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResumeInfoPage);