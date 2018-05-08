import React, {Component} from 'react';
import LoadingComponent from 'components/loading';
import echarts from 'static/js/echarts.min.js';

// 指定图表的配置项和数据
 import options from 'data/chart/bar';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class BarChartComponent extends Component {
    

    chartInstance = null;

    state = {
        isLoading: false,
        activeTab: 0,
        isEmpty: false
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        // 实例化图表
        this.chartInstance = echarts.init(this.refs.echarts);
        // 使用刚指定的配置项和数据显示图表。
        this.chartInstance.setOption(options);
    }

    render() {
        
        return (
            <div ref="echarts" className="box-border" style={{
                width: 885,
                height: 300,
            }}>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BarChartComponent);