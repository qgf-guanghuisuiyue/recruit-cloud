import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon, Spin} from 'antd';
const SubMenu = Menu.SubMenu;
import pickBy from 'lodash/pickBy';

import ResumeDetailComponent from 'components/resumeSearch/resumeDetail';
import ResumeSimpleComponent from 'components/resumeSearch/resumeSimple';
import CandidateResumeComponent from 'components/resumeSearch/candidateResume';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class DownloadResumePage extends Component {
    state = {
        switchContent:"详",
        detail:true,
        isCheckResume:true,
        isCandidateResume:false,
        pageNo:"1",
        pageSize:"10",
        company:"",
        position:"",
        industry:""
    }
    switch = (switchContent) => {
        this.setState({
            switchContent:switchContent=="简"?"详":"简",
            detail:!this.state.detail
        })
    }
    sorKey = () => {
        const {companyname} = this.props.userInfo;
            //加密关键字
            const key = "%!##@$%|$#$%(^)$}$*{^*+%";
            //请求参数       
            const partters=`key=51hr&value=${companyname}`;
            //请求参数加密
            const  sorKey = strEnc(`${partters}`,key);
            return sorKey
    }
    componentDidMount(){
        setTimeout(()=>{
            const {pageNo,pageSize} = this.state;
            const sorKey = this.sorKey();
            //获取已下载简历列表
            this.props.downLoadResumeList({pageNo,pageSize,sorKey});
            //获取用户可下载简历数据量
            this.props.getRemainedDownloadNum({sorKey});
        },300)   
    }
    componentWillUnmount(){
        //清空简历列表数据
        this.props.clearResumeListData()
    };
    //查询
    searchDownLoadResume = () => {
        const {company,position,industry,pageNo,pageSize} = this.state;
        const sorKey = this.sorKey();
        const filterObj = pickBy(this.state,(val,key)=>{
               return key==="company" || key==="position"|| key==="industry"
            });
            const filter = pickBy(filterObj,(val,key)=>{
               return val!=="" 
            });
        this.props.downLoadResumeList({...filter,pageNo,pageSize,sorKey});

    }
    //重置
    resetForm = () => {
        this.setState({
            company:"",
            position:"",
            industry:""
        });
    }
    onChange = (feild,e) => {
        this.setState({
            [feild]:e.target.value
        })
    }
    //显示查看联系人内容
    showResumeDetail = () => {
        // this.setState({
        //     isCheckResume:false,
        //     isCandidateResume:true
        // })
    }
    //隐藏联系人内容，显示简历详情
    checkCandidate = () => {
        this.setState({
            isCheckResume:true,
            isCandidateResume:false,
        })
    }
    render() {
        const {
            switchContent,
            detail,
            isCheckResume,
            isCandidateResume,
            company,
            position,
            industry
        } = this.state;
        const {
            resumeData=[],
            searchResumeDetail,
            resumeDetailData,
            isLoading,
            clearResumeData,
            detailLoading,
            downLoadResume,
            totalHits,
            userInfo,
            location,
            clearResumeDetailData,
            isView,
            collectResume,
            contract_count,
            downLoadResumeList
        } = this.props;
        return (
            <div className="mydownLoad">
                <div style={{marginLeft:20,marginBottom:20}}>
                    <Input
                        placeholder="请输入行业"
                        value={industry}
                        onChange={this.onChange.bind(this,'industry')}
                    />
                    <Input
                        placeholder="请输入求职意向"
                        value={position}
                        onChange={this.onChange.bind(this,'position')}
                    />
                    <Input
                        placeholder="请输入公司名称"
                        value={company}
                        onChange={this.onChange.bind(this,'company')}
                    />
                    <Button 
                        type="primary" 
                        icon="search"
                        onClick={this.searchDownLoadResume}
                    >
                        搜索
                    </Button>
                    <Button onClick={this.resetForm} style={{marginLeft:20}}>重置</Button>
                </div>
                {
                    isLoading && <Spin size="large" style={{position: "relative",left: 450,top: 400}}/>
                }
                {
                    (isCheckResume && resumeData.length!=0) && <div className="queryResult">
                    <div style={{height:35}}>
                        <span>共找到{totalHits}份简历</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <a 
                            onClick={this.switch.bind(this,switchContent)}
                        >
                            <Icon type="swap" />
                            切换至{switchContent}版
                        </a>
                    </div>
                        {
                            detail && <ResumeDetailComponent 
                                checkCandidate={this.checkCandidate}
                                showResumeDetail={this.showResumeDetail}
                                searchResumeDetail={searchResumeDetail}
                                downLoadResume={downLoadResume}
                                resumeData={resumeData}
                                totalHits={totalHits}
                                searchResume={this.searchResume}
                                location={location}
                                collectResume={collectResume}
                                userInfo={userInfo}
                                downLoadResumeList={downLoadResumeList}
                            />
                        }
                        {
                            !detail && <ResumeSimpleComponent 
                                showResumeDetail={this.showResumeDetail}
                                searchResumeDetail={searchResumeDetail}
                                resumeData={resumeData}
                                totalHits={totalHits}
                                searchResume={this.searchResume}
                                location={location}
                                userInfo={userInfo}
                            />
                        }
                    </div>
                }
                {resumeData.length===0 && !isCandidateResume &&
                    <div style={{textAlign:"center",marginTop:200,color:"#CDCDCD"}}>
                        <Icon type="frown-o" style={{fontSize:50}}>
                            <p style={{fontSize:14,lineHeight:"50px",color:"#CDCDCD"}}> 
                                您还没有下载任何简历~
                            </p>
                        </Icon>
                    </div>
                }
                {
                    isCandidateResume && <CandidateResumeComponent 
                        checkCandidate= {this.checkCandidate}
                        resumeDetailData= {resumeDetailData}
                        clearResumeDetailData= {clearResumeDetailData}
                        detailLoading= {detailLoading}
                        downLoadResume= {downLoadResume}
                        userInfo= {userInfo}
                        isView= {isView}
                        location={location}
                        contract_count= {contract_count}
                    />
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    userInfo: state.User.userInfo,
    resumeData: state.ResumeSearch.resumeData,
    resumeDetailData: state.ResumeSearch.resumeDetailData,
    isLoading: state.ResumeSearch.isLoading,
    detailLoading: state.ResumeSearch.detailLoading,
    totalHits: state.ResumeSearch.totalHits,
    isView: state.ResumeSearch.isView,
    contract_count: state.ResumeSearch.contract_count
});
const mapDispatchToProps = (dispatch) => ({
    downLoadResumeList: bindActionCreators(Actions.SearchActions.downLoadResumeList, dispatch),
    searchResume: bindActionCreators(Actions.SearchActions.searchResume, dispatch),
    searchResumeDetail: bindActionCreators(Actions.SearchActions.searchResumeDetail, dispatch),
    clearResumeListData: bindActionCreators(Actions.SearchActions.clearResumeListData, dispatch),
    clearResumeDetailData: bindActionCreators(Actions.SearchActions.clearResumeDetailData, dispatch),
    collectResume: bindActionCreators(Actions.SearchActions.collectResume, dispatch),
    downLoadResume: bindActionCreators(Actions.SearchActions.downLoadResume, dispatch),
    getRemainedDownloadNum: bindActionCreators(Actions.SearchActions.getRemainedDownloadNum, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadResumePage)