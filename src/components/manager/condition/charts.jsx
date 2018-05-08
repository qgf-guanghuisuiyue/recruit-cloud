import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
// 员工性质分布饼图
import FirstChartComponent from 'components/manager/condition/first-chart';

class SearchComponent extends Component {
     componentDidMount(){
        NProgress.done();
     }
     render(){
        const {work,sex,edu,age,marry,child,depart,post} = this.props;
        return (
            <div>
                <div className="pull-left">
                    <FirstChartComponent work = {work} pageType = "work"/>
                    <FirstChartComponent work = {sex} pageType = "sex"/>
                    <FirstChartComponent work = {edu} pageType = "edu"/>
                    <FirstChartComponent work = {age} pageType = "age"/>
                    <FirstChartComponent work = {marry} pageType = "marry"/>
                    <FirstChartComponent work = {child} pageType = "child"/>
                    <FirstChartComponent work = {depart} pageType = "depart"/>
                    <FirstChartComponent work = {post} pageType = "post"/>
                </div>
            </div>
        );
     }
 }
 const mapStateToProps = state => ({
    work: state.Manage.work,
    sex: state.Manage.sex,
    edu: state.Manage.edu,
    age: state.Manage.age,
    marry: state.Manage.marry,
    child: state.Manage.child,
    depart: state.Manage.depart,
    post: state.Manage.post,
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchComponent);