import React , { Component , PropTypes } from "React"
import {Modal , Input , Icon , Select , Button , Table, Breadcrumb,notification,Spin} from 'antd';
import echarts from 'static/js/echarts.min.js';

import industry from 'data/select/industry';


// 指定图表的配置项和数据
import options from 'data/chart/bar';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class SalaryModalComponent extends Component {

    state = {
        jobpostids:undefined,//行业
        functions: undefined, // 职能
        position: undefined, // 职位
        jobpostidsError:false,
        functionsError:false,
        positionError:false,
        activeTab:"",
        salaryData:[],
        highManage:false,
        highSalary:"",
        lowSalary:"",
        isEmpty:false,
        isSalaryLevel:false,
        remind:true,
        isLoading:false
    }
    tabList= ["P10","P50","P90","平均值"];
    chartInstance = null;
    chartInstanceSalary = null;

    componentDidMount() {
        const {salaryModalVisible} = this.props;
        const {salaryData} = this.state; 
    }

    componentWillReceiveProps (nextProps) {
        const {salaryData,positionSalary} = nextProps;
        this.setState({
            salaryData
        });
        //重置图表
        if(salaryData.length!=0){
            const salaryArr =[];//薪资
            const salarylevelArr = [];//职位层级
            for(let j=0;j<salaryData.length;j++){
                if(salaryData[j].salarylevel==="P10"){
                    salaryArr.push((Math.round(salaryData[j].monthsalary)/10000).toFixed(2) );
                    salarylevelArr.push(salaryData[j].salarylevel)
                }else if(salaryData[j].salarylevel!=="P50" && salaryData[j].salarylevel!=="P90" && salaryData[j].salarylevel!=="平均值"){
                    salaryArr.push(0);
                    salarylevelArr.push("P10")
                };
                if(salaryData[j].salarylevel==="P50"){
                    salaryArr.push((Math.round(salaryData[j].monthsalary)/10000).toFixed(2));
                    salarylevelArr.push(salaryData[j].salarylevel)
                }else if(salaryData[j].salarylevel!=="P10" && salaryData[j].salarylevel!=="P90" && salaryData[j].salarylevel!=="平均值"){
                    salaryArr.push(0);
                    salarylevelArr.push("P50")
                };
                if(salaryData[j].salarylevel==="P90"){
                    salaryArr.push((Math.round(salaryData[j].monthsalary)/10000).toFixed(2));
                    salarylevelArr.push(salaryData[j].salarylevel)
                }else if(salaryData[j].salarylevel!=="P10" && salaryData[j].salarylevel!=="P50" && salaryData[j].salarylevel!=="平均值"){
                    salaryArr.push(0);
                    salarylevelArr.push("P90")
                };
                if(salaryData[j].salarylevel==="平均值"){
                    salaryArr.push((Math.round(salaryData[j].monthsalary)/10000).toFixed(2));
                    salarylevelArr.push(salaryData[j].salarylevel)
                }else if(salaryData[j].salarylevel!=="P10" && salaryData[j].salarylevel!=="P90" && salaryData[j].salarylevel!=="P50"){
                    salaryArr.push(0);
                    salarylevelArr.push("平均值")
                }
            }
            // 实例化图表
            this.chartInstance = echarts.init(document.getElementById("echarts"));
            this.chartInstance.setOption(options);
            //使用刚指定的配置项和数据显示图表。
            if(salaryArr.length!==0){
                this.setState({
                    isLoading:false
                })
                this.chartInstance.setOption({
                    title: {
                        text: '行业薪资'
                    },
                    legend: {
                        right:20,
                        data:['月薪（万元）']
                    },
                    xAxis: {
                            data: salarylevelArr
                        },
                    series: [{
                        barWidth :60,
                        label: {
                            normal: {
                                show: true,
                                position: 'outside',
                                color:"#656565",
                                formatter: '{c}（万元）'
                            }
                        },
                        data: salaryArr
                    }]
                });
            }else if(salaryData.length===0) {
                this.setState({
                    isSalaryLevel:true
                })
            }
        }
        //获取职位月薪
        if(positionSalary){
            switch(positionSalary){
                case "1500以下":
                    this.setState({
                        highSalary:1500,
                        lowSalary:0
                    });
                break;
                case "100000以上":
                    this.setState({
                        highSalary:0,
                        lowSalary:100000
                    });
                break;
                default:
                    this.setState({
                        highSalary:positionSalary.split("-")[1],
                        lowSalary:positionSalary.split("-")[0]
                    });
                break;
            }
        }else{
            this.setState({
                highSalary:0,
                lowSalary:0, 
            })
        }   
    }

    destroyChart = () => {
        if(this.chartInstance){
            echarts.dispose(this.chartInstance);
        }
        if(this.chartInstanceSalary){
            echarts.dispose(this.chartInstanceSalary);
        }  
    }
    hideSalaryModal = () => {
        this.props.hideSalaryModal();
        this.destroyChart();
        this.props.cancelSalary();
        this.setState({
            jobpostids:undefined,//行业
            functions: undefined, // 职能
            position: undefined, // 职位
            activeTab:"",
            salaryData:[],
            highManage:false,
            highSalary:"",
            lowSalary:"",
            isEmpty:false,
            isSalaryLevel:false,
            remind:true
        })
    }
    //条件选项值
    handleSelectChange = (field,value) => {
        if(value==="高管"){
            this.setState({
                [field]: value,
                highManage: true,
                position:undefined,
            });
        }else if(field==="position") {
            this.setState({
                [field]: value,
                positionError:false
            });
        }else if(field==="jobpostids" ) {
            this.setState({
                [field]: value,
                highManage: false,
                position:undefined,
                functions: undefined,
                jobpostidsError:false
            });
        }else if(field==="functions") {
            this.setState({
                [field]: value,
                highManage: false,
                position:undefined,
                functionsError:false
            });
        }else {
            this.setState({
                [field]: value,
                highManage: false,
            });
        }
    }
    handlePositionChange = (field,value) => {
        this.setState({
            [field]: value
        });
    }
    //查询
    searchSalary = () =>{
        const {jobpostids,functions,position,highSalary,lowSalary} = this.state;
        const {positionSalary} = this.props;
        if(!jobpostids){
            this.setState({
                jobpostidsError:true
            });
            return false
        }
        if(!functions){
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
            remind:false,
            isLoading:true
        })
        //查询行业薪资
        this.props.searchSalary(jobpostids,functions,position);
        // 实例化图表
        this.chartInstance = echarts.init(document.getElementById("echarts"));
        //使用刚指定的配置项和数据显示图表。
        this.chartInstance.setOption(options);  
    }
        
    render(){
       const {salaryModalVisible ,salaryData,valueString} = this.props;
       const {
           jobpostids,
           position,
           functions,
           activeTab,
           highManage,
           isEmpty=false,
           isSalaryLevel,
           remind,
           isLoading,
           jobpostidsError,
           functionsError,
           positionError,
        } = this.state;
        return(
                <div  className="form" style={{margin:"0 auto",background:"#EBEBEB",paddingTop:20}}>
                    <div className="bottom10 search">
                        <span style={{fontSize:16}}>行业：</span>
                        <Select 
                            placeholder="请选择行业" 
                            style={{width: 189}}
                            value={jobpostids}
                            onChange={(value)=>this.handleSelectChange('jobpostids',value)}
                        >
                        {
                            ["互联网金融",
                            "银行",
                            "证券",
                            "基金、互联网基金",
                            "保险、互联网保险",
                            "期货",
                            "信托、互联网信托",
                            "互联网支付",
                            "网络借贷",
                            "大数据征信",
                            "互联网金融资讯"
                            ].map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                        </Select>  
                        <span style={{fontSize:16}}>职能：</span>
                        <Select 
                            placeholder="请选择职能" 
                            style={{width: 189}}
                            value={functions}
                            onChange={(value)=>this.handleSelectChange('functions',value)}
                        >
                        {
                            ["高管",
                            "支持职能",
                            "市场/销售",
                            "产品开发/管理",
                            "技术/研发",
                            "风险控制",
                            "资金管理",
                            "授信管理",
                            "贷后管理",
                            "理赔/核保",
                            "客服"
                            ].map((item,index)=>{
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
                            onChange={(value)=>this.handleSelectChange('position',value)}
                        >
                        {
                            (highManage?["高层管理"]:["总监/专家工程师",
                            "经理/资深工程师",
                            "主管/高级工程师",
                            "专员/技术人员",
                            "助理",
                            ]).map((item,index)=>{
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
                    <div style={{width:950,height:20, margin:"0 auto",overflow:"hidden"}}>
                        <div style={{float:"left",height:20,width:240,marginLeft:50,color:"red"}}>
                            {jobpostidsError && <span>请选择行业</span>}
                        </div>
                        <div style={{float:"left",height:20,width:240,marginLeft:35,color:"red"}}>
                            {functionsError && <span>请选择职能</span>}
                        </div>
                        <div style={{float:"left",height:20,width:240,marginLeft:40,color:"red"}}>
                            {positionError && <span>请选择职位</span>}
                        </div>
                    </div>
                    <div style={{width:950,height:25,margin:"0 auto",marginBottom:50}}>
                        <div style={{float:"left",fontSize:16,fontWeight:"bold"}}>已选条件：</div>
                        <Breadcrumb separator=">">
                            {jobpostids && <Breadcrumb.Item>{jobpostids}</Breadcrumb.Item>}
                            {functions && <Breadcrumb.Item>{functions}</Breadcrumb.Item>}
                            {position && <Breadcrumb.Item>{position}</Breadcrumb.Item>}
                        </Breadcrumb>
                    </div>
                    
                    <div style={{width:950,height:400,margin:"0 auto",overflow:"hidden",position:"relative"}}>
                        <div id="echarts" className="box-border" 
                            style={{
                                width: 950,
                                height: 380,
                                float:"right"
                            }}>
                        </div>
                        {isSalaryLevel &&
                            <div className="canvas-mask" style={{
                                    lineHeight: '380px',
                                    width: 470,
                                    height: 350,
                                    position:"absolute",
                                    right:0
                                }}>
                                    暂无数据
                            </div>}
                        {isLoading && 
                            <Spin style={{
                                    position:"absolute",
                                    left:450,
                                    top:200
                                }} />
                        }
                        {remind && 
                            <h1 
                                style={{
                                    color:"#fff",
                                    position:"absolute",
                                    top:120,
                                    height:50,
                                    width:"100%",
                                    textAlign:"center",
                                    }}
                                >
                                请先选择查询条件进行查询...
                            </h1>}
                    </div>
                    <div style={{paddingLeft:20,height:150}}>
                        <h3>说明：</h3>
                        <div style={{marginLeft:50,color:"#768490"}}>
                            <p><span style={{fontSize:14,color:"#314659"}}>分&nbsp;&nbsp;位&nbsp;&nbsp;值：</span>表示被调查群体中有n%的数据小于此数值。n的大小反应市场的不同水平，通常使用P10、P50、P90来表示市场的不同水平。</p>
                            <p><span style={{fontSize:14,color:"#314659"}}>10分位值：</span>表示有10%的数据小于此数值，反映市场的低端水平。</p>
                            <p><span style={{fontSize:14,color:"#314659"}}>50分位值：</span>表示有50%的数据小于此数值，反映市场的中等水平。</p>
                            <p><span style={{fontSize:14,color:"#314659"}}>90分位值：</span>表示有90%的数据小于此数值，反映市场的高端水平。</p>
                            <p><span style={{fontSize:14,color:"#314659"}}>平&nbsp;&nbsp;均&nbsp;&nbsp;值：</span>所有数据的平均值，反映市场的平均水平。</p>
                        </div>
                    </div>
                </div>   
        )
    }
}
const mapStateToProps = state => ({
    salaryModalVisible: state.Job.salaryModalVisible,
    salaryData: state.Job.salaryData
})
const mapDispatchToProps = dispatch => ({
    hideSalaryModal: bindActionCreators(Actions.jobActions.hideSalaryModal, dispatch),
    searchSalary: bindActionCreators(Actions.jobActions.searchSalary, dispatch),
    cancelSalary: bindActionCreators(Actions.jobActions.cancelSalary, dispatch)
})
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SalaryModalComponent)