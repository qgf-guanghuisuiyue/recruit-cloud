import React, {Component} from 'react';
import {Calendar , Icon ,Popover } from 'antd';
import moment from 'moment';
import each from 'lodash/each';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MemoCalendarComponent extends Component {
    state = {
        memos :[]
    }
    
    componentWillReceiveProps(){
        setTimeout(()=>{
           let memos=[];
           const {MemoContent} = this.props;
           for(let i in MemoContent){
            memos.push(MemoContent[i])
           }
           this.setState({memos}) 
        })   
    }

    handleClick =() => {
        this.props.showMemoModal();
    }


    //自定义渲染日期单元格，返回内容会被追加到单元格
    dateCellRender = (value) => {
        const {memos} = this.state;
        //当前查看的日期
        const watchDate = parseInt(moment(value._d).format("YYYYMMDD"));
        //今天的日期
        const nowDates =parseInt(moment().format('YYYYMMDD'));
        
        if (memos.length!=0){
            for (let k=0;k<memos.length;k++){
                //已添加备忘录的日期处理
                if (memos[k].length!=0){
                  const eventDate = memos[k][0].labelname.replace(/-/g,"");
                  if (watchDate>=nowDates && eventDate==watchDate){
                        return <i className="event-circle pre" style={{borderColor: '#0689ca'}}></i>
                     }else if (watchDate<nowDates && eventDate==watchDate) {
                        return <i className="event-circle expired" style={{borderColor: '#ac4100'}}></i>
                    }  
                }   
            }      
        }  
    }
    //选择日期方法
    onSelect = (value)=> {
        const date = moment(value).format("YYYY-MM-DD")
        this.props.getDateMemoContent({onDate:date})      
    }

    render(){
        let memos = [] , dateArr = [], dateContent = [];
        const {
            MemoContent, 
            DateMemoContent         //产看被选当天的事件
        } = this.props;
        const date = moment().format('YYYY-MM-DD');
        MemoContent[date] && each(MemoContent[date],item=>{
            memos.push(item.memos)
        })
        for (let key in DateMemoContent) {
            dateArr=DateMemoContent[key]
        }
        //遍历每日备忘录
        for (let j=0;j<dateArr.length;j++){
            dateContent.push(dateArr[j].memos)
        }
        return(
            <div className="memo-calendar box-border">
                <div className="memo-header title" onClick={this.handleClick}>
                    备忘日历
                </div>
                <div className="memo-body">
                    {
                        dateArr.length!=0 &&  
                        <div>
                            <span>{dateArr[0].labelname}</span>
                            <p>
                                {
                                    dateContent.join("、")
                                }
                            </p>
                        </div>
                    }
                    {
                        dateArr.length==0 && 
                        <div>
                            <span>今日事项：</span>
                            <p>
                                {memos.length!=0?memos.join("、"):"未添加今日事项。。。"}
                            </p>
                        </div>
                    }
                    <div className="calendar-wrap" style={{width:230,height:230,marginTop:50}}>
                        <Calendar 
                            fullscreen={false}
                            dateCellRender={this.dateCellRender}
                            onSelect = {this.onSelect}
                            onMousemove= {this.onSelect}
                        />
                        <div style={{marginTop:15,textAlign:"center",height:20}}>
                            <img src="static/images/index/expired.png" alt="过期"/>&nbsp;&nbsp;<span>过期</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <img src="static/images/index/pre.png" alt="预先记录"/>&nbsp;&nbsp;<span>预先记录</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    showMemoModal: bindActionCreators(Actions.homeActions.showMemoModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemoCalendarComponent);

