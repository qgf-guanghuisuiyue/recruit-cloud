module.exports = {
    
    title: {
        text: ''
    },
        tooltip: {},
    legend: {
        data:['月薪（万元）']
    },
    xAxis: {
        data: ["P10","P50","平均值","P90"]
    },
    yAxis: {
        max:12
    },
    series: [{
        name: '月薪（万元）',
        barWidth :60,
        label: {
            normal: {
                show: true,
                position: 'outside',
                color:"#656565",
            }
        },
        type: 'bar',
        data: [0,0,0,0]
    }]
}