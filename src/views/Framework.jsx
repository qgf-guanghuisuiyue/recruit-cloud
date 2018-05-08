import React, {Component} from 'react';
import NavBarComponents from 'components/navbar';

export default class  extends Component {
    
    render() {
        const {location} = this.props,
            pathname = location.pathname,
            patternLogin = /\/login/i, // 匹配login路径
            patternResume = /(\/resumeInfo)/i; // 匹配 /resumeInfo/:resumeId/:logId
        const patternShowResume = /\/showResume/i;
        const patternEvaluation = /\/evaluation/i;
        const patternCaseView =  /\/CaseView/i;
        const patternResumeDetail = /\/resumeDetail/i;
        return (
            <div>
                {!patternLogin.test(pathname) && !patternResume.test(pathname) && !patternShowResume.test(pathname) && !patternEvaluation.test(pathname) && !patternCaseView.test(pathname) && !patternResumeDetail.test(pathname) && <NavBarComponents location={location} />}
                {this.props.children}
            </div>
        );
    }
}