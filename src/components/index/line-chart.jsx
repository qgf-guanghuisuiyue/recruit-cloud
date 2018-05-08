import React, {Component} from 'react';
import {Button} from 'antd';
import LoadingComponent from 'components/loading';
import echarts from 'static/js/echarts.min.js';

import moment from 'moment';

import extend from 'lodash/extend';

// 指定图表的配置项和数据
import options from 'data/chart/line';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class LineChartComponent extends Component {

    tabList = [7,30,180,360];

    chartInstance = null;

    state = {
        isLoading: false,
        activeTab: 0,
        isEmpty: false
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.resumeWareHousing();
        this.props.resumeAccount();
        
        // 实例化图表
        this.chartInstance = echarts.init(this.refs.echarts);
        // 使用刚指定的配置项和数据显示图表。
        this.chartInstance.setOption(options);
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    componentWillUpdate(nextProps,nextState) {
        const {data,resumeCount} = nextProps;
        const {pieSourceList,content} = data;
        if(content !== this.props.data.content && nextState.isLoading) {
            this.setState({
                isLoading: false
            });
            let xaxis = [],
                job = [],
                zhilian = [],
                unknown = [];
            if(data.size === '1'){
                // pieSourceList
                xaxis = content[pieSourceList[0].labelname].map((item,index)=>{
                    return item.labelname;
                });
                if(xaxis.length === 7) xaxis.push('');
                job = content['51job'] &&  content['51job'].map((item,index)=>{
                    return item.cnt;
                });
                zhilian = content['zhilian'] &&  content['zhilian'].map((item,index)=>{
                    return item.cnt;
                });
                unknown = content['unknown'] &&  content['unknown'].map((item,index)=>{
                    return item.cnt;
                });
                this.setState({
                    isEmpty: false
                });
            }else{
                xaxis = this._getDefaultXaxis();
                xaxis.push(' ');
                job = [42,40,62,26,20,45,28,43];
                zhilian = [22,63,42,59,105,100,11,62];
                this.setState({
                    isEmpty: true
                });
            }
            //更改数据
            this.chartInstance.setOption({
                xAxis: {
                    data: xaxis
                },
                series: [
                    {
                        name:'前程无忧',
                        data: job
                    },
                    {
                        name: '智联招聘',
                        data: zhilian
                    },
                    {
                        name: '其他',
                        data: unknown
                    }
                ]
            });
        }
    }

    _getDefaultXaxis(){
        let step = 86400000,
            i = 1,
            timeArr = [];
        function getTimeArr(time) {
            if(i>7){
                return ;
            }
            timeArr.push(moment(time).format('YYYY-MM-DD'));
            i++;
            getTimeArr(time+step);
        }
        getTimeArr(new Date().getTime());
        return timeArr;
    }

    handleClick = (index) => {
        if(index === this.state.activeTab) return ;
        this.setState({
            activeTab:index,
            isLoading: true,
            isEmpty: false
        });
        // 销毁实例化图表
        // this.destroyChart();
        this.props.resumeWareHousing(this.tabList[index]);
    }

    render() {
        const {isLoading,activeTab,isEmpty} = this.state;
        const {resumeCount} = this.props;
        const {resumeAll,resumeMonth,resumeYear} = resumeCount;
        return (
            <div style={{
                position: 'relative',
                width: 629,
                height: 380
            }}>
                <div className="line-title" 
                    style={{ 
                        top:13,
                        left:16
                    }}
                >
                    简历入库情况
                </div>
                {isLoading && 
                    <LoadingComponent style={{
                        position: 'absolute',
                        top: 68,
                        height: 310,
                        width: '100%',
                        backgroundColor: '#FFF',
                        zIndex: 2
                    }} />
                }
                {isEmpty &&
                    <div className="canvas-mask" style={{
                            lineHeight: '380px'
                        }}>
                            暂无数据
                    </div>
                }
                <div className="chart-tab" style={{
                    top: 13,
                    right: 35
                }}>
                    {
                        this.tabList.map((item,index)=>{
                            return (
                                <Button 
                                    key={index} 
                                    type={ index === activeTab ? 'primary' : ''}
                                    onClick={this.handleClick.bind(this,index)}
                                    disabled={ index !== activeTab && isLoading ? true : false}
                                >{item}天</Button>
                            )
                        })
                    }
                </div>
                <div style={{
                        position:'absolute',
                        top:45,
                        left:16
                    }}
                >
                    <p>截至今日（{moment(Date.now()).format('MM月DD日')}）</p>
                    <span>共入库：<span className="jianli-data">{resumeAll}份</span></span>，
                    <span>本年：<span className="jianli-data">{resumeYear}份</span></span>，
                    <span>本月：<span className="jianli-data">{resumeMonth}份</span></span>
                </div>
                <div ref="echarts" className="box-border" style={{
                    width: 629,
                    height: 380,
                }}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Home.resumeData,
    resumeCount: state.Home.resumeCount
})
const mapDispatchToProps = dispatch => ({
    resumeWareHousing: bindActionCreators(Actions.homeActions.resumeWareHousing, dispatch),
    resumeAccount: bindActionCreators(Actions.homeActions.resumeAccount, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LineChartComponent);