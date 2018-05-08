module.exports = {
    title: {
        // text: '简历入库情况',
        textStyle: {
            color: '#4d4d4d',
            fontSize: 16,
            fontFamily: 'Microsoft YaHei',
            fontWeight: 'bolder'
        },
        padding: 0,
        top: 13,
        left: 13
    },
    color: ['#ac4100','#00b1c6','#f9a326'],
    tooltip: {
        trigger: 'axis'
    },
    grid: {//直角坐标系内绘图网格
        left: 23,
        top: 78,
        right: 43,
        bottom: 15,
        containLabel: true //防止标签溢出
    },
    legend: {//图例组件
        top: 28,
        right: 35,
        itemWidth: 15,
        data:[{//图例的数据数组
            name: '前程无忧',
            icon: `image://static/images/index/rect-1.png`,
            textStyle: {
                color: '#6b6b6b',
                fontSize: 12
            }
        },{
            name: '智联招聘',
            icon: `image://static/images/index/rect-2.png`,
            textStyle: {
                color: '#6b6b6b',
                fontSize: 12
            }
        },{
            name: '其他',
            icon: `image://static/images/index/rect-3.png`,
            textStyle: {
                color: '#6b6b6b',
                fontSize: 12
            }
        }]
    },
    toolbox: {//工具栏
        show: true,
        feature: {
            magicType: {show: true, type: ['stack', 'tiled']},
            saveAsImage: {show: true}
        }
    },
    xAxis: {
        type: 'category', //类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
        boundaryGap: false, //坐标轴两边留白策略
        // min: 'dataMin',
        // max: 'dataMax',
        data: [],
        axisTick: {
            show: false // 不显示刻度
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12,
                align: 'left'
            }
        },
        splitLine: { //坐标轴在 grid 区域中的分隔线
            show: true
        }
    },
    yAxis: {
        axisTick: {
            show: false // 不显示刻度
        },
        axisLabel: { //坐标轴刻度标签的相关设置
            show: true,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12,
                baseline: 'bottom'
            }
        },
        splitLine: {
            show: true
        }
    },
    series: [   //这里三个系列共用一个平行坐标系
        {
            name: '前程无忧',
            type: 'line',
            smooth: false,
            lineStyle: {
                normal: {
                    color: '#ac4100'
                }
            },
            data: []
        },
        {
            name: '智联招聘',
            type: 'line',
            smooth: false,
            lineStyle: {
                normal: {
                    color: '#00b1c6'
                }
            },
            data: []
        },
        {
            name: '其他',
            type: 'line',
            smooth: false,
            lineStyle: {
                normal: {
                    color: '#f9a326'
                }
            },
            data: []
        }
    ]
}