import React, {Component} from 'react';
import echarts from 'static/js/echarts.min.js';
import {Button} from 'antd';
// pie option
import chartOptions from 'data/chart/pie';

// loading
import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// lodash
import filter from 'lodash/filter';

class PieChartComponent extends Component {
    
    state = {
        isLoading: false,
        activeTab: 0,
        isEmpty: false
    }

    tabList= [7,30,180,360];
    
    chartInstance = null;

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        // 实例化echart
        this.chartInstance = echarts.init(this.refs.echarts);
        // 渲染图表
        // 使用指定的配置项和数据显示图表。
        this.chartInstance.setOption(chartOptions);
        this.props.getTaskProgress(this.tabList[this.state.activeTab]);
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    componentWillUnmount() {
        if(this.chartInstance){
            // 组件卸载后销毁echart实例
            // this.destroyChart();
        }
    }

    componentWillUpdate(nextProps,nextState) {
        const {taskProgress} = nextProps,
            {isLoading} = nextState;
        if( nextProps.taskProgress !== this.props.taskProgress && isLoading){
            // 去除loading
            this.setState({
                isLoading: false
            });
             /**
             * stageid 
             * 1: 职位申请
             * 2: 预约管理
             * 3: 面试管理
             * 4: 复试管理
             * 5: 发送office
             * 6: 入职管理
             * 7: 结束管理
             */
            let {data} = chartOptions.legend,
            filterData = filter(taskProgress,item=>{
                return typeof item.stageid === 'number';
            });
            filterData = filter(filterData,item=>{
                return item.stageid !== 2 && item.stageid !== 7;
            });
            let result = [];
            filterData.forEach( (item,index) => {
                const {cnt,stageid} = item;
                result.push({
                    value: cnt,
                    name:  data[index].name
                });
            });
            if(result.length === 0) {
                result = chartOptions.series[0].data;
                this.setState({
                    isEmpty: true
                });
            }
            this.chartInstance.setOption({
                series: [{
                    name: '任务完成指数',
                    data: result
                }]
            });
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        const {isLoading,activeTab} = this.state;
        return nextProps.taskProgress !== this.props.taskProgress 
        || nextState.isLoading !== isLoading 
        || nextState.activeTab !== activeTab;
    }

    destroyChart = () => {
        echarts.dispose(this.chartInstance);
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
        this.props.getTaskProgress(this.tabList[index]);
    }

    render() {
        const {isLoading,activeTab,isEmpty} = this.state;
        return (
            <div className="task-progress box-border" style={{
                position: 'relative'
            }}>
                <div 
                    className="title" 
                    onClick={this.onCancelRequest}
                    style={{
                        backgroundImage: 'url()'
                    }}
                >任务完成指数</div>
                {isLoading &&
                    <div style={{
                        position: 'absolute',
                        width: 244,
                        height: 276,
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
                            lineHeight: '330px',
                            left: 0
                        }}>
                            暂无数据
                    </div>
                }
                <div className="chart-tab">
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
                    top: -1
                }} ref="echarts" className="pie-chart">
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    taskProgress: state.Home.taskProgress
})
const mapDispatchToProps = dispatch => ({
    getTaskProgress: bindActionCreators(Actions.homeActions.getTaskProgress, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PieChartComponent);