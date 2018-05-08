// 指定图表的配置项和数据
/**
 * #ff9362 申请人数
 * #9d7449 面试人数
 * #fcbc49 复试人数
 * #96d7fa offer人数
 * #e389dd 入职人数
 */
module.exports = {
    tooltip: { // 提示框组件
        trigger: 'item', // 触发类型
        formatter: "{a} <br/>{b}: {c} ({d}%)", // 提示框浮层内容格式器
        confine: true // 是否将 tooltip 框限制在图表的区域内。
        // position: function (pos, params, dom, rect, size) {
        //     // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        //     var obj = {top: 60};
        //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        //     return obj;
        // }
    },
    color: ['#ff9362','#9d7449','#fcbc49','#96d7fa','#e389dd'],
    legend: { // 图例组件
        itemWidth: 15, // 图例标记的图形宽度。
        itemGap: 11, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
        textStyle: { // 图例的公用文本样式。
            color: '#6b6b6b',
            fontSize: 12
        },
        padding: 7, // 图例内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
        bottom: 0, // 图例组件离容器下侧的距离。
        borderColor: '#d5d5d5', // 图例的边框颜色。支持的颜色格式同 backgroundColor。
        borderWidth: 1, // 图例的边框线宽。
        data:[ // 图例的数据数组
            {
                name: '申请人数 ',
                icon: 'image://static/images/index/reply.png'
            },
            {
                name: '面试人数',
                icon: 'image://static/images/index/interview.png'
            },
            {
                name: '复试人数',
                icon: 'image://static/images/index/sinterview.png'
            },
            {
                name: 'offer人数',
                icon: 'image://static/images/index/offer.png'
            },
            {
                name: '入职人数',
                icon: 'image://static/images/index/entry.png'
            }
        ],
        tooltip: { // 提示框组件
            show: true
        }
    },
    series: [
        {
            name:'任务完成指数',
            type:'pie',
            center: ['50%',115], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            radius: ['43%', '65%'], // 饼图的半径，数组的第一项是内半径，第二项是外半径。
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
                {value:0, name:'申请人数 '},
                {value:0, name:'面试人数'},
                {value:0, name:'复试人数'},
                {value:0, name:'offer人数'},
                {value:0, name:'入职人数'}
            ]
        }
    ]
};