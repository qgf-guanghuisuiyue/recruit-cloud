module.exports = {
    
    title : {
        text: '薪酬报告数据（年薪）'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['一线城市（万元）','二线城市（万元）']
    },
    toolbox: {
        show : true,
    },
    xAxis : [
        {
            type : 'category',
            data : ['P25','P50','P75']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    toolbox: {//工具栏
        show: true,
        feature: {
            magicType: {show: true, type: ['stack', 'tiled']},
            saveAsImage: {show: true}
        }
    },
    series : [
        {
            name:'一线城市（万元）',
            barWidth :60,
            itemStyle:{
                normal:{
                    color:'#0086C9'
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'outside',
                    color:"#656565",
                }
            },
            type:'bar',
            data:[0, 0, 0],
        },
        {
            name:'二线城市（万元）',
            barWidth :60,
            itemStyle:{
                normal:{
                    color:'#56A36C'
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'outside',
                    color:"#656565",
                }
            },
            type:'bar',
            data:[0, 0, 0],
        }
    ]
}