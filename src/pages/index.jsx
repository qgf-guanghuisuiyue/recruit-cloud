import React, {Component} from 'react';
import BasicPage from './basic';
import moment from 'moment';
import TimeComponent from 'components/index/time';
// 列表
import ListComponent from 'components/index/list';
// 折线图
import LineChartComponent from 'components/index/line-chart';
// 饼图
import PieChartComponent from 'components/index/pie-chart';
// 表格
import TableComponent from 'components/index/table';
//备忘日历

import MemoCalendarComponent from 'components/index/memo-calendar';
//备忘录modal
import MemoModalComponent from 'components/index/memo-modal';
//视频
import VideoComponent from 'components/index/video';

import ScrollPageContent from 'components/scroll-page-content';
//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class IndexPage extends BasicPage {
    
    componentDidMount() {
        this.hideNProgress();
        const date = moment().format("YYYY-MM-01")
        this.props.getMemoContent({onDateMM:date})
    }
    
    render() {
        const {MemoContent , getMemoContent , DateMemoContent ,getDateMemoContent ,editVideo,video} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content index-page">
                    <div className="list-block">
                        <div className="pull-left">
                            <TimeComponent />
                            <ListComponent />
                        </div>
                        <div className="pull-right" style={{width: 914}}>
                            <div style={{overflow: "auto"}}>
                                <div style={{background: "#fff", float: "left"}}>
                                    <LineChartComponent/>
                                </div>
                                <div className="pull-right" style={{background: "#fff"}}>
                                    <MemoCalendarComponent 
                                        MemoContent={MemoContent}
                                        DateMemoContent={DateMemoContent}
                                        getDateMemoContent = {getDateMemoContent}
                                    />
                                     {/*添加备忘录modal*/}
                                    <MemoModalComponent/>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div className="list-block">
                        <div className="pull-left">
                            <PieChartComponent />
                            <VideoComponent editVideo={editVideo} video={video}/>
                        </div>
                        <div className="pull-right">
                            <TableComponent />
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}
const mapStateToProps = state => ({
    MemoContent:state.Home.MemoContent,
    DateMemoContent:state.Home.DateMemoContent,
    video:state.Home.video
})
const mapDispatchToProps = dispatch => ({
    getMemoContent: bindActionCreators(Actions.homeActions.getMemoContent, dispatch),
    getDateMemoContent: bindActionCreators(Actions.homeActions.getDateMemoContent, dispatch),
    editVideo: bindActionCreators(Actions.homeActions.editVideo, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);