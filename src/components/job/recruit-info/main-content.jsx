import React, {Component} from 'react';

// 个人基本信息
import PersonalInfoComponent from './personal-info';
// 求职意向
import IntentionComponent from './intention';
// 自我评价
import SelfMarkComponent from './selfmark';
// 教育经历
import EducationComponent from './education';
// 项目经验
import ProjectListComponent from './project-list';
// 工作经历
import WorkListComponent from './work-list';
// 语言能力
import LanguageListComponent from './language-list';
// 培训经历
import TrainListComponent from './train';
// 获得证书
import CertListComponent from './cert';
// 附加信息
import OtherComponent from './other';

export default class MainContentComponent extends Component {
    render() {
        const {
            resumeInfo={}, // 个人基本信息
            jobInfo={}, // 求职意向
            eduList=[], // 教育经历信息
            projList=[], // 项目经验
            workList=[], // 工作经历
            lanList=[], // 语言能力
            trainList=[], // 培训经历
            certList=[], // 获得证书
            otherList=[] // 附加信息
        } = this.props.data;
        return (
            <ul className="info-list">
                <PersonalInfoComponent data={resumeInfo} />
                <IntentionComponent data={jobInfo} />
                <SelfMarkComponent data={jobInfo} />
                <EducationComponent data={eduList} />
                <ProjectListComponent data={projList} />
                <WorkListComponent data={workList} />
                <LanguageListComponent data={lanList} />
                <TrainListComponent data={trainList} />
                <CertListComponent data={certList} />
                <OtherComponent data={otherList} />
            </ul>
        );
    }
}