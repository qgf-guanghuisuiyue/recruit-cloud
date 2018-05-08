import React from 'react';

import moment from 'moment';

const renderWithATag = (text,record,index) => {
    return <a href="javascript:;" title={text}>{text}</a>;
}

module.exports = [
    {
        "title": "姓名",
        "dataIndex": "username",
        "key": "username",
        "width": 77
    },
    {
        "title": "性别",
        "dataIndex": "sex",
        "key": "sex",
        "width": 50
    },
    {
        "title": "居住地",
        "dataIndex": "livecityid", 
        "key": "livecityid",
        "width": 97,
        //render: renderWithATag
    },
    {
        "title": "出生日期",
        "dataIndex": "borndate",
        "key": "borndate",
        "width": 130
    },
    {
        "title": "学历",
        "dataIndex": "educationbg",
        "key": "educationbg",
        "width": 50
    },
    {
        "title": "工作年限",
        "dataIndex": "workyears",
        "key": "workyears",
        "width": 84
    },
    {
        "title": "期望职位",
        "dataIndex": "postids",
        "key": "postids",
        "width": 190,
       // render: renderWithATag
    },
    {
        "title": "创建日期",
        "dataIndex": "createdate",
        "key": "createdate",
        "width": 102,
        render: (text,record,index) => {
            return moment(text).format('YYYY-MM-DD');
        }
    },
    {
        "title": "操作",
        "dataIndex": "control",
        "key": "control",
        "width": 79
    },
    {
        "title": "收藏",
        "dataIndex": "iscollection",
        "key": "iscollection"
    }
]