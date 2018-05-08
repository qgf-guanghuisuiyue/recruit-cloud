const renderWithATag = (text,record,index) => {
    return <a href="javascript:void(0)" title={text}>{text}</a>
}

module.exports = [
    {
        "title": "人员姓名",
        "dataIndex": "name",
        "key": "name",
        "width": 150
    },
    {
        "title": "人事材料存档率",
        "dataIndex": "percent", 
        "key": "percent",
        "width": 150,
        render: renderWithATag
    },
    {
        "title": "劳动合同",
        "dataIndex": "approve",
        "key": "approve",
        "width": 150,
        render: renderWithATag
    },
    {
        "title": "离职证明",
        "dataIndex": "proof",
        "key": "proof",
        "width": 150
    },
    {
        "title": "离职交接表",
        "dataIndex": "handover",
        "key": "handover",
        "width": 150
    },
    {
        "title": "最后更新时间",
        "dataIndex": "updatedate",
        "key": "updatedate",
        
    }
]