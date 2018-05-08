import React, {Component} from 'react';
import moment from 'moment';
import { Input, Radio, Tooltip } from 'antd';
const RadioGroup = Radio.Group;
// import TimeComponent from 'components/time';
import {InputComponent} from 'components/input';

export default class OtherInfoComponent extends Component {

    state = {
        // workType: 1,
        isurgent: false,//是否紧急
        isintelligent:false,//是否智能匹配
        starttime:'',//开始时间
        endtime:'',//结束时间
    }

    onChange = (field,e) => {
        this.setState({
            [field]: e.target.value,
        });
    }
    onChangeIntelligent = () => {
        this.setState({
            isintelligent:!this.state.isintelligent
        });
    }

    resetForm() {
        const {onStartChange,onEndChange} = this.refs.TimeComponent;
        this.setState({
            isurgent: false,
            isintelligent:false,
        });
        onStartChange(null);
        onEndChange(null);
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value ? moment(value).format('YYYY-MM-DD')+' 00:00:00' : ''
        });
    }
    getFormData = () => {
        return {...this.state}
    }
    resetForm = () => {
        const{
            urgent , 
            intelligent,
            starttime=null ,
            endtime=null,
        }=this.props.jobInfo;
        this.setState({
            isurgent:urgent , 
            isintelligent:intelligent,
            starttime:moment(starttime).format('YYYY-MM-DD')+' 00:00:00' ,
            endtime:moment(endtime).format('YYYY-MM-DD')+' 00:00:00',
        })
    }
    componentWillReceiveProps(nextProps){
        const{
            urgent , 
            intelligent,
            starttime=null ,
            endtime=null,
        }=nextProps.jobInfo;
        this.setState({
            isurgent:urgent , 
            isintelligent:intelligent,
            starttime:moment(starttime).format('YYYY-MM-DD')+' 00:00:00' ,
            endtime:moment(endtime).format('YYYY-MM-DD')+' 00:00:00',
        })
    }
    
    
    render() {
        // workType 工作类型
        // workDuty 工作职责
        // dicatate 工作资格
        // isUrgent 是否紧急
        const {
            isurgent , 
            isintelligent,
            starttime=null ,
            endtime=null,
        } = this.state;
        const{isdisabled} = this.props;
        return (
            <li className="other-info">
                <h2 className="title">
                    其他信息
                </h2>
                <ul>
                    <li className="start-end">
                        <InputComponent 
                            name="开始时间："
                            value={moment(starttime).format('YYYY-MM-DD')}
                            disabled={isdisabled}
                        />
                        <InputComponent 
                            name="结束时间："
                            value={moment(endtime).format('YYYY-MM-DD')}
                            disabled={isdisabled}
                        />
                    </li>
                    <li>
                        <span>是否紧急：</span>
                        <RadioGroup onChange={this.onChange.bind(this,'isurgent')} 
                                value={isurgent}
                                disabled={isdisabled}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </RadioGroup>
                    </li>
                    <li>
                        <div className="inline-block">
                            <Radio 
                                onChange={this.onChangeIntelligent} 
                                checked={isintelligent}
                                disabled={isdisabled}
                            >
                                智能筛选投递该职位的简历
                            </Radio>
                            <Tooltip    overlayClassName="help-tooltip"
                                        placement="right" 
                                        title={"通过工作年限、学历、年龄智能筛选投递到该职位的简历，匹配度低的简历转入人才库被过滤的人才分类。"}>
                                <i className="help-icon"></i>
                            </Tooltip>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }
}