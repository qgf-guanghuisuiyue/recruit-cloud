import React, {Component , PropTypes} from 'react';
import { Icon , Tooltip} from 'antd';

// components
import ClerkHeaderInfoComponent from 'components/job/recruit-info/clerk-header-info';
import MainContentComponent from 'components/job/recruit-info/main-content'; 

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class EmployeeInfoPage extends Component {

    
    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        const { location, routeParams} = this.props,
              { resumeid, rid } = routeParams; 
            // 获取简历详情
            this.props.getEmployeeResumeInfo({
                resumeid,
                rid
            });
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    render() {
        const 
            {isLoading,data,location,routeParams,getEmployeeResumeInfo,uriParams} = this.props,      
            { rid } = routeParams,   
            {resumeid,currentPId,resumeInfo={},evaluationId,lastStageLog} = data,
            {username} = resumeInfo; 
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
                            <ClerkHeaderInfoComponent 
                                    data={data}
                            />
                            <div className="main-content" style={{marginTop: 36}}>
                                <div className="info-content">
                                    <MainContentComponent data={data} />
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Manage.employeeInfo,
    isLoading: state.Manage.isInfoLoading,
})
const mapDispatchToProps = dispatch => ({
    getEmployeeResumeInfo: bindActionCreators(Actions.ManageActions.getEmployeeResumeInfo, dispatch),
    hideResumeModal: bindActionCreators(Actions.ManageActions.hideResumeModal, dispatch) 
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeInfoPage);