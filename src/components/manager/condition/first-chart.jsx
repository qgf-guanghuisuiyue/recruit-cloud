import React, {Component} from 'react';
import echarts from 'static/js/echarts.min.js';
import {Button} from 'antd';
import store from 'store';
// pie option
import chartOptions from 'data/employees-overview/first-pie';

// loading
import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// lodash
import filter from 'lodash/filter';

// 饼图下载分享
import OperateEmployeesPie from './operate';

// 第一个饼图-员工性质分布
export default class FirstChartComponent extends Component {

    state = {
        isLoading: false,
        activeTab: 0,
        isEmpty: false,
        pageWord:{
            'work':'员工性质分布',
            'sex':'员工性别分布',
            'edu':'员工学历分布',
            'age':'员工年龄分布',
            'marry':'员工已婚情况',
            'child':'员工已育情况',
            'depart':'部门人数TOP5',
            'post':'岗位人数TOP5',
        }
    }
    
    chartInstance = null;

    componentDidMount() {
        const { type } = this.props;
        this.setState({
            isLoading: true
        });
        // 实例化echart
        this.chartInstance = echarts.init(this.refs.echarts);
        // 渲染图表
        // 使用指定的配置项和数据显示图表。
        this.chartInstance.setOption(chartOptions);
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    componentWillUnmount() {
        if(this.chartInstance){
            // 组件卸载后销毁echart实例
            this.destroyChart();
        }
    }

    componentWillUpdate(nextProps,nextState) {
        const {work,pageType} = nextProps;
        const {pageWord} = this.state;
        const {isLoading} = nextState;
        if(nextProps !== this.props){
            // 去除loading
            this.setState({
                isLoading: false
            });
            let result = [];
            let needData = []
            work.forEach((item,index) => {
                result.push({
                    value: item.cnt,
                    name:  item.cname
                });
                needData.push({
                    name:  item.cname
                })
            });
            if(result.length === 0) {
                this.setState({
                    isEmpty: true
                });
            }else if(result.length > 0){
                this.setState({
                    isEmpty: false
                });
            }
            this.chartInstance.setOption({
                series: [{
                    name: pageWord[pageType],
                    data: result
                }],
                legend: [{
                    data: needData
                }]
            });
        }
    }

    destroyChart = () => {
        echarts.dispose(this.chartInstance);
    }

    render() {
        const {pageType} = this.props;
        const {isLoading,activeTab,isEmpty,pageWord} = this.state;
        return (
            <div className="task-progress box-border pull-left" style={{'margin':'0 20px 20px 0'}} >
                <div style={{ position: 'relative' }}>
                    <div className='pie-title'>{pageWord[pageType]}</div>
                    {/* <OperateEmployeesPie/> */}
                    {isLoading &&
                        <div style={{
                            position: 'absolute',
                            width: 483,
                            height: 310,
                            zIndex: 1
                        }}>
                            <LoadingComponent style={{
                                position: 'absolute',
                                width: '100%',
                                backgroundColor: '#FFF'
                            }} />
                        </div>
                    }
                    {isEmpty &&
                        <div className="canvas-mask" style={{
                                lineHeight: '310px',
                                left: 0
                            }}>
                                暂无数据
                        </div>
                    }
                    <div style={{ top: -1 }} ref="echarts" className="pie-chart">
                    </div>
                </div>
            </div>
        );
    }
}