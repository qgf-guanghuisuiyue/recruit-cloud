import React , {Component}from 'react';
import { Progress , Table , Select , Button , notification } from 'antd';
import archivesData from 'data/select/archives';
import archivesLeave from 'data/select/archivesLeave'

export default class ProgressComponent extends Component{
    state = {
        leftStyleState:'block',
        rightStyleState:'none',
        leftStyleColor:'#1587c7',
        rightStyleColor:'',
        sort:'2'
    };
    componentWillReceiveProps(nextProps){
        const {archivesTableData} = nextProps;
        if(archivesTableData=="2"){
            this.setState({
                leftStyleState:'none',
                rightStyleState:'block',
                leftStyleColor:'',
                rightStyleColor:'#1587c7'
            });
        }else if(archivesTableData=="1"){
            this.setState({
                leftStyleState:'block',
                rightStyleState:'none',
                leftStyleColor:'#1587c7',
                rightStyleColor:''
            });
        }
    };
    handleClick = (value) => {
        switch(value)
            {
            case '1':
                this.setState({
                    leftStyleState:'block',
                    rightStyleState:'none',
                    leftStyleColor:'#1587c7',
                    rightStyleColor:''
                });
                this.props.changeTableData('1');
                this.props.getArchivesList({sort:'2'});
                break;
            case '2':
                this.setState({
                    leftStyleState:'none',
                    rightStyleState:'block',
                    leftStyleColor:'',
                    rightStyleColor:'#1587c7'
                });
                this.props.changeTableData('2')
                this.props.getLeaveArchivesList({sort:'2'})
                break;
            default:
                break
            }
    }
    handleSelectChange = (value) => {
        const {
            archivesTableData,
            getArchivesList,
            getLeaveArchivesList,
            sortMethod
        } = this.props;
        if (archivesTableData=='1'){
            switch(value)
            {
            case '人事材料存档率升序':
                this.setState({
                    sort:'1'
                });
                break;
            case '人事材料存档率降序':
                this.setState({
                    sort:'2'
                });
                break;
            case '人员信息完整度升序':
                this.setState({
                    sort:'3'
                });
                break;
            case '人员信息完整度降序':
                this.setState({
                    sort:'4'
                });
                break;
            case '最后更新时间升序':
                this.setState({
                    sort:'5'
                });
                break;
            case '最后更新时间降序':
                this.setState({
                    sort:'6'
                });
                break;
            default:
                break ;
            };
            setTimeout(()=>{
                const {sort} = this.state;
                sortMethod(sort)
                getArchivesList({sort:sort});
            })
        }else if (archivesTableData=='2'){
            switch(value)
            {
            case '人事材料存档率升序':
                this.setState({
                    sort:'1'
                });
                break;
            case '人事材料存档率降序':
                this.setState({
                    sort:'2'
                });
                break;
            case '最后更新时间升序':
                this.setState({
                    sort:'3'
                });
                break;
            case '最后更新时间降序':
                this.setState({
                    sort:'4'
                });
                break;
            default:
                break ;
            };
            setTimeout(()=>{
                const {sort} = this.state;
                getLeaveArchivesList({sort:sort});
            })
        }
    }

    //下载材料附件
    downloadMaterial = () => {
        const {showProgress} = this.props;
        const ridName = this.props.ridName;
            if (ridName.rid){
                    this.props.downloadMaterial(ridName,showProgress)
            }else{
                notification.warning({
                    message: '请先选择具体人员！'
                });
            }
        }

    render() {
       const {
           departure ,
           info ,
           leaveCount ,
           material ,
           resumeCount
        } = this.props.archivesData,
            {
                leftStyleState ,
                rightStyleState ,
                leftStyleColor ,
                rightStyleColor
            } = this.state;
       const PercentageResume = ((parseInt(material)/parseInt(resumeCount))*100).toFixed(0);
       const PercentageLeave = ((parseInt(departure)/parseInt(leaveCount))*100).toFixed(0);
        return (
            <div>
                <div className="archives-progress">
                    <div
                        className="left-progress"
                        style={{borderColor:leftStyleColor}}
                        onClick={this.handleClick.bind(this,'1')}
                    >
                        <div className="left-progress-archives">
                            <span
                                style={{
                                    display:'block',
                                    marginBottom:5,
                                    color:'#868686'
                                    }}
                            >
                                在职人员存档情况：
                            </span>
                            <Progress
                                style={{color:'#f68f6b'}}
                                percent={(resumeCount==0 || material==0 || !resumeCount|| !material) ?0:PercentageResume} strokeWidth={25}
                            />
                            <div
                                style={{
                                    marginTop:5,
                                    color:'#1587c7'}}
                            >
                                <span>当前员工数：{resumeCount?resumeCount:0}</span>&nbsp;&nbsp;
                                <span style={{color:'#979797'}}>|</span>&nbsp;&nbsp;
                                <span>已完整存档：{material?material:0}</span>
                            </div>
                        </div>
                        <div className="left-progress-information">
                            <span
                                style={{
                                    display:'block',
                                    marginBottom:5,
                                    color:'#868686'
                                }}
                            >
                                在职人员信息完整率：
                            </span>
                            <Progress style={{color:'#6b88f6'}}  percent={info} strokeWidth={25}  />
                        </div>
                        <div
                            className="left-triangle"
                            style={{display:leftStyleState}}
                        >
                        </div>
                    </div>
                    <div
                        className="right-progress"
                        style={{borderColor:rightStyleColor}}
                        onClick={this.handleClick.bind(this,'2')}
                    >
                            <span
                                style={{display:'block',marginBottom:5,color:'#868686'}}
                            >
                                离职人员存档情况：
                            </span>
                            <Progress
                                style={{color: '#f6cd6b'}}
                                percent={(leaveCount==0 || departure==0 || !leaveCount || !departure) ?0:PercentageLeave} strokeWidth={25}
                            />
                            <div
                                style={{
                                    marginTop:5,
                                    color:'#979797'}}
                            >
                                <span>离职员工数：{leaveCount?leaveCount:'0'}</span>&nbsp;&nbsp;
                                <span style={{color:'#979797'}}>|</span>&nbsp;&nbsp;
                                <span>已完整存档：{departure?departure:'0'}</span>
                            </div>
                            <div
                                className="right-triangle"
                                style={{display:rightStyleState}}
                            >
                            </div>
                    </div>
                </div>
                <div
                    className="archives-title"
                    style={{
                        height:50,
                        display:leftStyleState}}
                >
                    <div
                        style={{
                            float:'left',
                            marginTop:15}}
                        >
                        <b style={{fontSize:16,fontWeight:'bold',color:'#000'}}>在职人员</b>&nbsp;&nbsp;（点击员工姓名上传
                        <b style={{color:'#f68f6b'}}>人事材料</b>；点击员工的每一项信息
                        <b style={{color:'#6b88f6'}}>快速补充人员信息</b>）
                    </div>
                    <div  className="archives-select">
                        <Select
                            defaultValue="人事材料存档率降序"
                            style={{width: 180,height:35,lineHeight:35}}
                            onChange={this.handleSelectChange}
                        >
                            {
                                archivesData.map((item , index)=> {
                                    return(
                                        <Option key={index} value={item}>{item}</Option>
                                        )
                                })
                            }
                        </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.downloadMaterial}>下载材料附件</Button>
                    </div>
                </div>
                <div
                    className="archives-title"
                    style={{height:50,display:rightStyleState}}>
                    <div style={{float:'left',marginTop:15}}>
                        <b style={{fontSize:16,fontWeight:'bold',color:'#000'}}>离职人员</b>&nbsp;&nbsp;（点击员工姓名上传
                        <b style={{color:'#f68f6b'}}>人事材料</b>）
                    </div>
                    <div
                        className="archives-select"
                    >
                        <Select
                            defaultValue="人事材料存档率升序"
                            style={{width: 180,height:35,lineHeight:35}}
                            onChange={this.handleSelectChange}
                        >
                            {
                                archivesLeave.map((item , index)=> {
                                    return(
                                        <Option key={index} value={item}>{item}</Option>
                                        )
                               })
                            }
                        </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.downloadMaterial}>下载材料附件</Button>
                    </div>
                </div>
            </div>
        )
    }
}
