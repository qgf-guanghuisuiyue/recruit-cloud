module.exports = [
    {
        title: '行业',
        dataIndex: 'industry',
        width:100,
        key: 'industry',
        render(value, row, index) {
            const obj = {
                children: value,
                props: {},
            };
            if (index === 0) {
                obj.props.rowSpan = 2;
            }
            if (index === 1) {
                obj.props.rowSpan = 0;
            }
                return obj;
        },
    },
    {
        title: '部门',
        dataIndex: 'department',
        width:100,
        key: 'department',
        render(value, row, index) {
            const obj = {
                children: value,
                props: {},
            };
            if (index === 0) {
                obj.props.rowSpan = 2;
            }
            if (index === 1) {
                obj.props.rowSpan = 0;
            }
                return obj;
        },
    },
    {
        title: '职位',
        dataIndex: 'position',
        width:100,
        key: 'position',
        render(value, row, index) {
            const obj = {
                children: value,
                props: {},
            };
            if (index === 0) {
                obj.props.rowSpan = 2;
            }
            if (index === 1) {
                obj.props.rowSpan = 0;
            }
                return obj;
        },
    },
    {
        title: '城市等级',
        dataIndex: 'city',
        width:100,
        key: 'city'
    },
    {
        title: 'P25',
        dataIndex: 'P25',
        width:100,
        key: 'P25'
    }, {
        title: 'P50',
        dataIndex: 'P50',
        width:100,
        key: 'P50',
    }, {
        title: 'P75',
        dataIndex: 'P75',
        width:100,
        key: 'P75',
    }
]