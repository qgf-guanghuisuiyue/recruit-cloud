import React from 'react';

const renderWithATag = (text,record,index) => {
    return <a href="javascript:void(0)" title={text}>{text}</a>
}

module.exports = [
    {
        "title": "姓名",
        "dataIndex": "username",
        "key": "username",
        "width": 94
    },
    {
        "title": "职位",
        "dataIndex": "positionname",
        "key": "positionname",
        "width": 132,
        //render: renderWithATag
    },
    {
        "title": "部门",
        "dataIndex": "department", 
        "key": "department",
        "width": 80,
        //render: renderWithATag
    },
    {
        "title": "工作年限",
        "dataIndex": "workyears",
        "key": "workyears",
        "width": 90,
        //render: renderWithATag
    },
    {
        "title": "电话",
        "dataIndex": "telephone",
        "key": "telephone",
        "width": 113
    },
    {
        "title": "邮箱",
        "dataIndex": "email",
        "key": "email",
        "width": 129
    },
    {
        "title": "居住地",
        "dataIndex": "livecityid",
        "key": "livecityid",
        "width": 109
    },
    {
        "title": "申请时间",
        "dataIndex": "deliverytime",
        "key": "deliverytime",
        "width": 99,
        //render: renderWithATag
    },
    {
        "title": "状态",
        "dataIndex": "prestatusname",
        "key": "prestatusname"
    }
]