const renderWithATag = (text,record,index) => {
    return <a href="javascript:void(0)" title={text}>{text}</a>
}

module.exports = [
    {
        "title": "人员姓名",
        "dataIndex": "name",
        "key": "name",
        "width": 90
    },
    {
        "title": "人事材料存档率",
        "dataIndex": "percent", 
        "key": "percent",
        "width": 120,
        render: renderWithATag
    },
    {
        "title": "证件号",
        "dataIndex": "card",
        "key": "card",
        "width": 80,
        render: renderWithATag
    },
    {
        "title": "居住地址",
        "dataIndex": "tolive",
        "key": "tolive",
        "width": 120
    },
    {
        "title": "紧急联系人",
        "dataIndex": "contactname",
        "key": "contactname",
        "width": 90
    },
    {
        "title": "社保账户",
        "dataIndex": "soci_card",
        "key": "soci_card",
        "width": 80
    },
    {
        "title": "公积金账号",
        "dataIndex": "fund_card",
        "key": "fund_card",
        "width": 99,
        render: renderWithATag
    },
    {
        "title": "工资卡账号",
        "dataIndex": "wage_card",
        "key": "wage_card",
        "width": 100,
        render: renderWithATag
    },
    {
        "title": "最后更新时间",
        "dataIndex": "updatedate",
        "key": "updatedate",
        
    }
]