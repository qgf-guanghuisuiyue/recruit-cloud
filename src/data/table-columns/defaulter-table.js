const renderWithATag = (text,record,index) => {
    return <a href="javascript:void(0)" title={text}>{text}</a>
}

module.exports = [
    {
        "dataIndex": "item",
        "key": "item",
        "width": 231
    },
    {
        "dataIndex": "content",
        "key": "content",
        "width": 90,
        render: renderWithATag
    },
    {
        "dataIndex": "percent", 
        "key": "percent",
        "width": 120,
        render: renderWithATag
    },
    {
        "dataIndex": "card",
        "key": "card",
        "width": 80,
        render: renderWithATag
    }
]