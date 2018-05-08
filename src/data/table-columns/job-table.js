import React from 'react';
import moment from 'moment';
// 格式化时间
const renderTime = (text,record,index) => {
    return moment(text).format('YYYY-MM-DD');
}
const renderTextWithATag = (text, record, index) => {
    return <a href="javascript:;" title={text}>{text}</a>
}

module.exports = [
    {
        "title": "紧急",
        "dataIndex": "isurgent",
        "key": "isurgent",
        "width": 50,
        "fixed": 'left',
        "render": (text, record, index)=>{
            return text ? <i className="urgent-icon"></i> : null;
        }
    },
    {
        "title": "编号",
        "dataIndex": "positionid",
        "key": "positionid",
        "width": 80,
        "fixed": 'left',
    },
    {
        "title": "职位名",
        "dataIndex": "positionname", 
        "key": "positionname",
        "width": 120,
        "fixed": 'left',
    },
    {
        "title": "部门",
        "dataIndex": "department",
        "key": "department",
        "width": 100,
        "fixed": 'left',
        "render": renderTextWithATag
    },
    {
        "title": "薪资要求",
        "dataIndex": "salary",
        "key": "salary",
        "width": 105,
        //"render": renderTextWithATag
    },
    {
        "title": "申请",
        "dataIndex": "cnt",
        "key": "cnt",
        "width": 48
    },
    {
        "title": "面试",
        "dataIndex": "interview",
        "key": "interview",
        "width": 48
    },
    {
        "title": "复试",
        "dataIndex": "sinterview",
        "key": "sinterview",
        "width": 48
    },
    {
        "title": "offer",
        "dataIndex": "off",
        "key": "off",
        "width": 48
    },
    {
        "title": "入职",
        "dataIndex": "induction",
        "key": "induction",
        "width": 48
    },
    {
        "title": "智能筛选",
        "dataIndex": "degree",
        "key": "degree",
        "width": 70
    },
    {
        "title": "开始时间",
        "dataIndex": "starttime",
        "key": "starttime",
        "width": 100,
        //"render": renderTime
    },
    {
        "title": "结束时间",
        "dataIndex": "endtime",
        "key": "endtime",
        "width": 100,
        //"render": renderTime
    },
    {
        "title": "状态",
        "dataIndex": "status",
        "key": "status",
        "fixed": 'right',
    }
]