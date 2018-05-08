import React, {Component} from 'react';

import {Table} from 'antd';

// moment
import moment from 'moment';

// lodash
import size from 'lodash/size';
import omitBy from 'lodash/omitBy';

import columns from 'data/table-columns/task-table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponents extends Component {

    descColumns = [{
        "title": "说明",
        "dataIndex": "desc",
        "key": "desc",
        "render": (text,record,index) => {
            const obj = {
                children: <span>{text}</span>,
                props: {
                }
            }
            // if(index === 0){
            //     obj.props.rowSpan = totalRow;
            // }
            return obj;
        }
    }]

    keies = [
        'loginNum',             //登录次数
        'resumeCount',          //简历总数
        'hand51Num',            //简历导入量51
        'handZLNum',            //简历导入量zl
        'positionNum',          //职位数
        'applicationNum_todo',  //待处理申请者
        'applicationNum',       //申请
        'reservationNum',       //预约
        'interviewNum',         //面试
        'reexaminationNum',     //复试
        'entryNum',             //入职
        'processedNum'          //已处理
    ]

    state = {
        searchStartTime:"",
        searchEndTime:""
    }

    componentDidMount() {
        this.props.getTaskReport();
        // document.getElementsByTagName('table')[0].id = 'table';
    }

    calcTotal(data,key) {
        return data.reduce((prevObj,currentObj)=>{
                    return {[key]:prevObj[key] + currentObj[key]};
                },{[key]:0})[key];
    }

    getDataSource = (data) => {
        data = data ? data : {};
        let dataSource = [];
        let filterData = omitBy(data,item=>{
            return item.length === 0;//删除空对象
        }),
        dataLength = size(filterData);
        Object.keys(filterData).forEach((key,index)=>{
           // 添加机构名称
           if(data[key].length === 0 ) return ;
           data[key][0].organization = key;
           let totalObj = {userName:'合计'};
           this.keies.map(item=>{
                totalObj[item] = this.calcTotal(data[key],item);
           });    
           data[key].push(totalObj);
        //    if( dataLength === 1 || (dataLength > 1 && (index === dataLength - 1)) ){
        //         data[key].push({processedNum:`注：用户名为空的人，显示该用户的编号 
        //         ［数据来源日期 ${moment(starttime).format('YYYY-MM-DD')} 至 
        //         ${moment(endtime).format('YYYY-MM-DD')}］`});
        //    }
           dataSource.push(data[key]);
       });
       return dataSource.length === 0 ? [[]] : dataSource;
    }

    render() {
        const {isLoading,data,dataTime} = this.props;
        const {starttime,endtime} = data;
        const dataSource = !isLoading ? this.getDataSource(data.list) : [];
        return (
            <div>
                {isLoading ? 
                    <Table
                        columns={columns()} 
                        loading={isLoading}
                        dataSource={[]} 
                        bordered
                        pagination={false}
                    /> : null
                }
                {!isLoading ? dataSource.map((item,index)=>{
                        const showHeader = index === 0 ? true : false;
                        const className = index === 0 ? '' : 'no-margin-border';
                        return (
                            <Table
                                key={index}
                                columns={columns(item&&item.length)} 
                                dataSource={item} 
                                className={`${className} data-table`}
                                bordered
                                showHeader={showHeader}
                                pagination={false}
                            />
                        )
                    }) : null
                }
                {!isLoading ? 
                        <Table
                            columns={this.descColumns} 
                            dataSource={[
                                {
                                    desc:`注：用户名为空的人，显示该用户的编号 
                                        ［数据来源日期${moment(starttime).format("YYYY-MM-DD")} 至 ${moment(endtime).format("YYYY-MM-DD")}］`
                                }
                            ]} 
                            className="no-margin-border desc-table"
                            bordered
                            showHeader={false}
                            pagination={false}
                        /> : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Task.data, // 统计列表数据
    isLoading: state.Task.isLoading
})
const mapDispatchToProps = dispatch => ({
    getTaskReport: bindActionCreators(Actions.TaskActions.getTaskReport, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponents);