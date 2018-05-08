import React, {Component,PropTypes} from 'react';

import {Button , Menu , Select ,Table , Spin , Breadcrumb} from 'antd';
const SubMenu = Menu.SubMenu;
import echarts from 'static/js/echarts.min.js';

import columns from 'data/table-columns/salaryReport';

// 指定图表的配置项和数据
import options from 'data/chart/salaryBar';

import ScrollPageContent from 'components/scroll-page-content';
import BreadCrumbComponent from 'components/breadcrumb';


// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class SalaryReport extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        isLoading: false,
        activeTab: 0,
        industry:undefined,//行业
        industryArr:[],
        departmentArr:[],
        positionArr:[],
        department: undefined, //部门
        position: undefined, //职位
        jobpostidsError:false,
        functionsError:false,
        positionError:false,
        bigCity:[],
        smallCity:[],
        isSalary:false,
        bCity:"",
        sCity:""
    }

    tabList = ["一线城市","二线城市","综合"];
    chartInstance = null;
    componentDidMount(){
        NProgress.done();
        // 实例化图表
        this.chartInstance = echarts.init(this.refs.salaryEcharts);
        // 使用刚指定的配置项和数据显示图表。
        this.chartInstance.setOption(options);
        //获取条件
        this.props.getCondition();

        if(!this.state.industry){
            this.props.deleteData();
        }
    }
    searchSalary = () => {
        const {industry , department ,  position } = this.state;
        if(!industry){
            this.setState({
                jobpostidsError:true
            });
            return false
        }
        if(!department){
            this.setState({
                functionsError:true
            });
            return false
        }
        if(!position){
            this.setState({
                positionError:true
            })
            return false
        }
        this.setState({
            isLoading:true
        })
        this.props.searchData({industry,department,positions:position})
        
    }
    handleSelectChange = (field,value) => {
        this.setState({
            [field]:value
        })
        if(field==="position") {
            this.setState({
                positionError:false
            });
        }else if(field==="industry" ) {
            this.setState({
                [field]: value,
                jobpostidsError:false,
                position: undefined,
                department:undefined,
                positionArr:[],
                departmentArr:[]
            });
            this.props.getCondition({industry:value})
        }else if(field==="department") {
            this.setState({
                [field]: value,
                functionsError:false,
                position: undefined,
                positionArr:[]
            });
            this.props.getCondition({industry:this.state.industry,department:value})
        }
    }
    
    componentWillReceiveProps(nextProps){
        const salaryData = nextProps.salaryData;
        this.setState({
            industryArr:nextProps.industry,
            departmentArr:nextProps.department,
            positionArr:nextProps.position
        }) 
        if(salaryData.length!=0){
            this.setState({
                isLoading:false,
                isSalary:false
            })
            const firstArr = [];
            const secondArr = [];
            for(let i=0;i<salaryData.length;i++){
                if(salaryData[i].citylevel==="一线城市"){
                    firstArr.push(parseInt(Math.round(salaryData[i].levela)/10000),parseInt(Math.round(salaryData[i].levelb)/10000),parseInt(Math.round(salaryData[i].levelc)/10000))
                    this.setState({
                        bigCity:firstArr,
                        bCity:salaryData[i].citylevel
                    })
                }
                if(salaryData[i].citylevel==="二线城市"){
                    secondArr.push(parseInt(Math.round(salaryData[i].levela)/10000),parseInt(Math.round(salaryData[i].levelb)/10000),parseInt(Math.round(salaryData[i].levelc)/10000));
                    this.setState({
                        smallCity:secondArr,
                        sCity:salaryData[i].citylevel
                    })
                }
            }
            // 实例化图表
            this.chartInstance = echarts.init(this.refs.salaryEcharts);
            // 使用刚指定的配置项和数据显示图表。
            this.chartInstance.setOption({
                series : [
                    {
                        name:'一线城市（万元）',
                        barWidth :60,
                        itemStyle:{
                            normal:{
                                color:'#0086C9'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'outside',
                                color:"#656565",
                            }
                        },
                        type:'bar',
                        data:firstArr,
                    },
                    {
                        name:'二线城市（万元）',
                        barWidth :60,
                        itemStyle:{
                            normal:{
                                color:'#56A36C'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'outside',
                                color:"#656565",
                            }
                        },
                        type:'bar',
                        data:secondArr,
                    }
                ]
            });
        }else if(salaryData.length==0){
            this.setState({
                isSalary:true
            })
        } 
    }
    render() {
        const {location,routes} = this.props;
        const {
            isLoading,
            activeTab,
            isEmpty, 
            industry , 
            department , 
            position ,
            jobpostidsError,
            functionsError,
            positionError,
            industryArr,
            departmentArr,
            positionArr,
            bigCity,
            smallCity,
            isSalary,
            bCity,
            sCity
        } = this.state;
        const data = [
            {
                key: '1',
                city:<b style={{color:'#473E3E'}}>{bCity?`${bCity}`:""}</b>,
                industry:industry,
                department:department,
                position:position,
                P25: bigCity[0]?`${bigCity[0]}万元`:"",
                P50: bigCity[1]?`${bigCity[1]}万元`:"",
                P75: bigCity[2]?`${bigCity[2]}万元`:"",
            },
            {
                key: '2',
                city:<b style={{color:'#473E3E'}}>{sCity?`${sCity}`:""}</b>,
                industry:industry,
                department:department,
                position:position,
                P25: smallCity[0]?`${smallCity[0]}万元`:"",
                P50: smallCity[1]?`${smallCity[1]}万元`:"",
                P75: smallCity[2]?`${smallCity[2]}万元`:"",
            }
        ];
        return (
            <ScrollPageContent>
                <div className="page-content" ref="pageContent">
                    <BreadCrumbComponent routes={routes} />
                    <div className="box-border salary-report">
                        <div className="salaryReport">
                            <span style={{fontSize:16}}>行业：</span>
                            <Select 
                                placeholder="请选择行业" 
                                style={{width: 189}}
                                value={industry}
                                allowClear
                                onChange={(value)=>this.handleSelectChange('industry',value)}
                            >
                            {
                                industryArr.map((item,index)=>{
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                            </Select>  
                            <span style={{fontSize:16}}>部门：</span>
                            <Select 
                                placeholder="请选择部门" 
                                style={{width: 189}}
                                value={department}
                                allowClear
                                disabled = {industry?false:true}
                                onChange={(value)=>this.handleSelectChange('department',value)}
                            >
                            {
                                departmentArr.map((item,index)=>{
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                            </Select>
                            <span style={{fontSize:16}}>职位：</span>
                            <Select 
                                placeholder="请选择职位" 
                                style={{width: 189}}
                                value={position}
                                allowClear
                                disabled = {(industry && department)?false:true}
                                onChange={(value)=>this.handleSelectChange('position',value)}
                            >
                            {
                                positionArr.map((item,index)=>{
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }  
                            </Select>
                            <Button 
                                type="primary" 
                                icon="search"
                                style={{height:40,top:-2,fontSize:16}}
                                onClick={this.searchSalary}
                            >
                                查&nbsp;&nbsp;询
                            </Button>
                        </div>
                        
                        <div style={{width:1000,height:20, margin:"0 auto",overflow:"hidden"}}>
                            <div style={{float:"left",height:20,width:240,marginLeft:50,color:"red"}}>
                                {jobpostidsError && <span>请选择行业</span>}
                            </div>
                            <div style={{float:"left",height:20,width:240,marginLeft:60,color:"red"}}>
                                {functionsError && <span>请选择部门</span>}
                            </div>
                            <div style={{float:"left",height:20,width:240,marginLeft:60,color:"red"}}>
                                {positionError && <span>请选择职位</span>}
                            </div>
                        </div>
                        <div style={{width:1000,height:25,margin:"0 auto",marginBottom:30}}>
                            <div style={{float:"left",fontSize:16,fontWeight:"bold"}}>已选条件：</div>
                            <Breadcrumb separator=">">
                                {industry && <Breadcrumb.Item>{industry}</Breadcrumb.Item>}
                                {department && <Breadcrumb.Item>{department}</Breadcrumb.Item>}
                                {position && <Breadcrumb.Item>{position}</Breadcrumb.Item>}
                            </Breadcrumb>
                        </div>
                        { isLoading &&
                            <Spin style={{
                                position:"absolute",
                                left:'50%',
                                top:400
                            }} />
                        }
                        { isSalary &&
                            <div className="canvas-mask" style={{
                                    lineHeight: '500px',
                                    width: 1000,
                                    height: 500,
                                    position:"absolute",
                                    top:203,
                                    fontSize:23,
                                    left:'50%',
                                    opacity:0.7,
                                    marginLeft:"-500px",
                                    borderRadius:10
                                }}>
                                    暂无数据，请选择以上查询条件进行查询...
                            </div>
                        }
                        <div ref="salaryEcharts" className="box-border" ></div>

                        <Table columns={columns} dataSource={data} pagination={false} bordered={true}/>

                        <div style={{paddingLeft:100,height:150,marginTop:50}}>
                            <h3>说明：</h3>
                            <div style={{marginLeft:50,color:"#768490"}}>
                                <p><span style={{fontSize:14,color:"#314659"}}>分&nbsp;&nbsp;位&nbsp;&nbsp;值：</span>表示被调查群体中有n%的数据小于此数值。n的大小反应市场的不同水平，通常使用P25、P50、P75来表示市场的不同水平。</p>
                                <p><span style={{fontSize:14,color:"#314659"}}>25分位值：</span>表示有25%的数据小于此数值，反映市场的低端水平。</p>
                                <p><span style={{fontSize:14,color:"#314659"}}>50分位值：</span>表示有50%的数据小于此数值，反映市场的中等水平。</p>
                                <p><span style={{fontSize:14,color:"#314659"}}>75分位值：</span>表示有75%的数据小于此数值，反映市场的高端水平。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = (state) => ({
    industry:state.SalaryReport.industry,
    department:state.SalaryReport.department,
    position:state.SalaryReport.position,
    salaryData:state.SalaryReport.salaryData
});
const mapDispatchToProps = (dispatch) => ({
    getCondition: bindActionCreators(Actions.SalaryActions.getCondition, dispatch),
    searchData: bindActionCreators(Actions.SalaryActions.searchData, dispatch),
    deleteData: bindActionCreators(Actions.SalaryActions.deleteData, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SalaryReport)