import React, {Component} from 'react';
import {Button} from 'antd';

import trim from 'lodash/trim';

// 职位推荐Modal
import RecommendResumeModalComponents from 'components/recruit/recommend-resume-modal'

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TalentHeaderInfoComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps !== this.props;
    }

    componentWillUpdate(nextProps,nextState) {
        const {resumeInfo={}} = nextProps.data;
        // 设置简历页面的标题
        if(resumeInfo.username&&!this.isSetTitle){
            document.title = `${trim(resumeInfo.username)}的个人简历`;
        }
    }

    printResume() {
        // 打印简历
        window.print();
    }

    mapChannelToChinese(channel) {
        switch(channel){
            case '51job':
                return '前程无忧';
            case 'zhilian':
                return '智联招聘';
            case 'unknown':
                return '其他';
        }
    }

    downloadResume = () => {
        if(this.props.isDownLoading) return ;
        NProgress.configure({className:'top0'});
        NProgress.start();
        // 下载简历
        const {data} = this.props;
        /**
         * currentPId 当前职位id
         * resumeid 简历id
         */
        const {resumeid,resumeInfo} = data;
        this.props.downloadResume({
            resumeid
        },resumeInfo.username);
    }

    render() {
        const {data,showRecommendModal} = this.props,
            {
                resumeid,
                resumeInfo={}
            } = data,
            {
                headimg, // 头像
                username, //姓名
                telephone, //电话
                email, //邮箱
                workyears, //工作年限
                educationbg, //学历
                channel, // 简历来源
            } = resumeInfo;
        return (
            <div className="header-info">
                <div>
                    <div className="inline-block">
                        <img src={headimg && headimg !== '' ? headimg : "./static/images/head.jpg"} alt="默认头像" />
                    </div>
                    <div className="info-right inline-block">
                        <ul>
                            <li style={{
                                overflow: 'hidden',
                                minHeight: 40
                            }}>
                                <div className="pull-left">
                                    <span>{trim(username)}</span>
                                    <span style={{
                                        marginLeft: 30,
                                        marginRight: 17
                                    }}>{telephone}</span>
                                    {email && <span>|</span>}
                                    <span style={{
                                        marginLeft: 17
                                    }}>{email}</span>
                                </div>
                                <div className="pull-right noprint">
                                    <Button type="primary" onClick={this.downloadResume}>
                                        简历下载
                                    </Button>
                                    <Button type="primary" onClick={this.printResume} >
                                        打印简历
                                    </Button>   
                                </div>
                            </li>
                            <li>
                                <span style={{
                                    marginRight: 6
                                }}>{workyears}</span>
                                {educationbg && <span>|</span>}
                                <span style={{
                                    marginLeft: 6
                                }}>{educationbg}</span>
                            </li>
                            <li style={{
                                marginTop: 14
                            }}>
                                简历来源 : {this.mapChannelToChinese(channel)}
                            </li>
                        </ul>
                        <div className="noprint">
                            <Button
                                type="orange" 
                                onClick={()=>showRecommendModal()}
                                style={{
                                    marginRight: 0
                                }}
                            >职位推荐</Button>
                        </div>
                    </div>
                </div>
                {/*职位推荐Modal*/}
                <RecommendResumeModalComponents
                    resumeid={resumeid}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isDownLoading: state.Resume.isDownLoading,
})
const mapDispatchToProps = dispatch => ({
    showRecommendModal: bindActionCreators(Actions.RecruitActions.showRecommendModal, dispatch),
    downloadResume: bindActionCreators(Actions.ResumeActions.downloadResume, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalentHeaderInfoComponent);