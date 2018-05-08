// 指定图表的配置项和数据
/**
 * #fcd165 全职
 * #8edbfd 兼职
 * #8db7fc 实习
 * #d2d2d2 未填写
 */
module.exports = {
    tooltip: { // 提示框组件
        trigger: 'item', // 触发类型
        formatter: "{a} <br/>{b}: {c} ({d}%)", // 提示框浮层内容格式器
        confine: true // 是否将 tooltip 框限制在图表的区域内。
    },
    toolbox: {
    　　show: true,
    　　feature: {
    　　　　saveAsImage: {
    　　　　show:true,
    　　　　excludeComponents :['toolbox'],
    　　　　pixelRatio: 2
    　　　　}
    　　}
    },
    color: ['#fcd165','#8edbfd','#8db7fc','#d2d2d2','#fda78e','#fd8edc','#fb8562','#fc5a2b','#89fc2b','#2bfcf0','#2b9cfc','#d72bfc'],
    legend: { // 图例组件
        orient: 'vertical',
        right: '0%',
        top:'16%',
        textStyle:{    //图例文字的样式
            color:'#868686',
            fontSize:12
        },
        data:[ // 图例的数据数组
            {
                name: '全职'
            },
            {
                name: '兼职'
            },
            {
                name: '实习'
            },
            {
                name: '未填写'
            }
        ],
        tooltip: { // 提示框组件
            show: true
        }
    },
    series: [
        {
            name:'员工性质分布',
            type:'pie',
            center: ['32%','50%'], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            radius: ['47%', '82%'], // 饼图的半径，数组的第一项是内半径，第二项是外半径。
            label: { // 饼图图形上的文本标签
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}',
                    textStyle:{
                        fontSize: 12
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            },
            data:[ // 系列中的数据内容数组
                {value:0, name:'全职 '},
                {value:0, name:'兼职'},
                {value:0, name:'实习'},
                {value:0, name:'未填写'}
            ]
        }
    ]
};