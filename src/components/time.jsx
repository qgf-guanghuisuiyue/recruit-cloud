import React, {Component,PropTypes} from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

export default class TimeComponent extends Component {

    static propTypes = {
        style: PropTypes.object,
        showField: PropTypes.bool
    }

    state = {
        _startValue:null,
        _endValue:null
    };

    disabledStartDate = (startValue) => {
        const {_endValue} = this.state;
        if (!startValue || !_endValue) {
            return false;
        }
        return startValue.valueOf() > _endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const {_startValue} = this.state;
        if (!endValue || !_startValue) {
            return false;
        }
        // return endValue.valueOf() <= _startValue.valueOf() && endValue.valueOf() > new Date().getTime();
        return endValue.valueOf() <= _startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value
        });
    }

    onStartChange = (value) => {
        const {onChange} = this.props;
        if(onChange){
            onChange('starttime',value);
        }
        this.onChange('_startValue', value);
    }
     

    onEndChange = (value) => {
        const {onChange} = this.props;
        if(onChange){
            onChange('endtime',value);
        }
        this.onChange('_endValue', value);
    }

    handleStartOpenChange = (open) => {
        const {_endValue} = this.state;
        this.setState({
            _startOpen: open
        });
    }  

    handleEndOpenChange = (open) => {
        this.setState({ _endOpen: open });
    }
    componentDidMount(){
        this.setState({    
            _startValue:null,
            _endValue:null
        })
    }
    //获取数据赋值
    componentWillReceiveProps(){
        setTimeout(()=>{
           const {starttime , endtime} = this.props;
           const dateFormat = 'YYYY-MM-DD 00:00:00';
           //过滤获取目前默认时间
            if (starttime!=moment().format('YYYY-MM-DD')&& endtime!=moment().format('YYYY-MM-DD')){
                this.setState({
                    _startValue:starttime?moment(starttime, dateFormat):"",
                    _endValue:endtime?moment(endtime, dateFormat):""
            })
           } 
        })
    };

    render() {
        const {style={},showField=false} = this.props;
        const { _startValue, _endValue,_startOpen=false, _endOpen=false  } = this.state;
        return (
            <div style={{
                display: "inline-block"
            }}>
                {showField&&<span className="calendar-field">开始时间：</span>}
                <DatePicker
                    ref="starttime"
                    disabledDate={this.disabledStartDate}
                    format="YYYY-MM-DD"
                    value={_startValue}
                    placeholder="开始时间"
                    style={style}
                    open={_startOpen}
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                {showField&&<span className="calendar-field">结束时间：</span>}
                <DatePicker
                    ref="endtime"
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM-DD"
                    value={_endValue}
                    placeholder="结束时间"
                    style={style}
                    onChange={this.onEndChange}
                    open={_endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
            </div>
        );
    }
}