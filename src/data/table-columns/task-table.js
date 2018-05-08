import React from 'react';

module.exports = function(totalRow=0){
    const rednerContent = (text,record,index) => {
        const obj = {
            children: text,
            props: {}
        }
        // if(index === (totalRow - 1)){
        //     obj.props.colSpan = 0;
        // }
        return obj;
    }
    return [
            {
                "title": "所属机构",
                "dataIndex": "organization",
                "key": "organization",
                "width": 95,
                "render": (text,record,index) => {
                    const obj = {
                        children: <span>{text}</span>,
                        props: {
                            rowSpan: 0
                        }
                    }
                    if(index === 0){
                        obj.props.rowSpan = totalRow;
                    }
                    return obj;
                }
            },
            {
                "title": "姓名",
                "dataIndex": "userName",
                "key": "userName",
                "width": 65,
                "render": rednerContent
            },
            {
                "title": "登陆次数",
                "dataIndex": "loginNum", 
                "key": "loginNum",
                "width": 79,
                "render": rednerContent
            },
            {
                "title": "简历总数",
                "dataIndex": "resumeCount",
                "key": "resumeCount",
                "width": 79,
                "render": rednerContent
            },
            {
                "title": "简历导入量(51job)",
                "dataIndex": "hand51Num",
                "key": "hand51Num",
                "width": 137,
                "render": rednerContent
            },
            {
                "title": "简历导入量(智联)",
                "dataIndex": "handZLNum",
                "key": "handZLNum",
                "width": 130,
                "render": rednerContent
            },
            {
                "title": "关注职位数",
                "dataIndex": "positionNum",
                "key": "positionNum",
                "width": 92,
                "render": rednerContent
            },
            {
                "title": "待处理申请者",
                "dataIndex": "applicationNum_todo",
                "key": "applicationNum_todo",
                "width": 105,
                "render": rednerContent
            },
            {
                "title": "申请",
                "dataIndex": "applicationNum",
                "key": "applicationNum",
                "width": 65,
                "render": rednerContent
            },
            {
                "title": "预约",
                "dataIndex": "reservationNum",
                "key": "reservationNum",
                "width": 61,
                "render": rednerContent
            },
            {
                "title": "面试",
                "dataIndex": "interviewNum",
                "key": "interviewNum",
                "width": 61,
                "render": rednerContent
            },
            {
                "title": "复试",
                "dataIndex": "reexaminationNum",
                "key": "reexaminationNum",
                "width": 61,
                "render": rednerContent
            },
            {
                "title": "入职",
                "dataIndex": "entryNum",
                "key": "entryNum",
                "width": 61,
                "render": rednerContent
            },
            {
                "title": "已处理",
                "dataIndex": "processedNum",
                "key": "processedNum",
                "render": (text,record,index) => {
                    const obj = {
                        children: text,
                        props: {}
                    }
                    // if(index === (totalRow - 1)){
                    //     obj.props.colSpan = 13;
                    // }
                    return obj;
                }
            }
        ]
}