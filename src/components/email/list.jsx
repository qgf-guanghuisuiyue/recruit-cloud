import React, {Component} from 'react';

import moment from 'moment';

import {Input} from 'antd';

// scrollbars
import { Scrollbars } from 'react-custom-scrollbars';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

import LoadingComponent from '../loading';

class EmailListComponents extends Component {

    state = {
        keyword: '',
        activeTabIndex: 9999
    }

    keyword = '';

    componentDidMount() {
        this.props.getEmailHistory();
    }

    handleChange = e => {
        this.setState({
            keyword: e.target.value
        });
    }

    handleKeyUp = e => {
        if(e.keyCode === 13){
            this.handleSearch();            
        }
    }

    calcTimeDiff(timeStamp) {
        const now = moment().format('x');
        const timeDiff = now-timeStamp;
        const diffHour = timeDiff/1000/60/60;
        if(diffHour < 24) {
            return Math.floor(diffHour) + '小时前';
        }
        return Math.floor(diffHour/24) + '天前';
    }

    selectAddressee = (item,index) => {
        this.setState({
            activeTabIndex: index
        });
        this.props.selectAddressee(item);
        const {resumeid,positionid} = item;
        this.props.getEmailBoxDetail({resumeid,positionid});
    }
    
    handleSearch = () => {
        const {keyword} = this.state;
        if(this.keyword !== keyword){
            this.keyword = keyword;
            this.props.getEmailHistory({keyword});
        }
    }

    render() {
        const {keyword,activeTabIndex} = this.state,
            {historyEmail} = this.props,
            {list,isLoading} = historyEmail;
        return (
            <div className="box-border">
                <div style={{
                    padding: '0 20px'
                }}>
                    <Input 
                        value={keyword}
                        className="search"
                        placeholder="搜索职位或简历"
                        onChange={this.handleChange}
                        onKeyUp = {this.handleKeyUp}
                        suffix={
                            <span className="search-icon" onClick={this.handleSearch}></span>
                        }
                    />
                </div>
                {isLoading &&
                    <LoadingComponent
                        style={{height: 300}}
                    />
                }
                {!isLoading && list.length === 0 &&
                    <div className="empty-area">暂无数据</div>
                }
                {!isLoading && list.length > 0 &&
                    <Scrollbars style={{
                        height: 510
                    }} autoHide={true}>
                        <ul className="history-list">
                            {
                                list.map((item,index)=>{
                                    const {headimg,resumename,positionname,srdate,srdateStr} = item;
                                    return <li 
                                                key={index} 
                                                className={activeTabIndex === index ? 'active' : ''}
                                                onClick={()=>this.selectAddressee(item,index)}
                                            >
                                                <div className="table">
                                                    <div className="table-cell">
                                                        <img src="/static/images/email/head.png" alt="用户头像"/>
                                                    </div>
                                                    <div className="table-cell">
                                                        <div className="name">
                                                            {resumename}
                                                        </div>
                                                        <div className="position-name">
                                                            {positionname}
                                                        </div>
                                                    </div>
                                                    <div className="table-cell">
                                                        {/*{this.calcTimeDiff(srdate)}*/}
                                                        {srdateStr}
                                                    </div>
                                                </div>
                                            </li>
                                })
                            }
                        </ul>
                    </Scrollbars>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    historyEmail: state.Email.historyEmail
})
const mapDispatchToProps = dispatch => ({
    getEmailHistory: bindActionCreators(Actions.EmailActions.getEmailHistory, dispatch),
    getEmailBoxDetail: bindActionCreators(Actions.EmailActions.getEmailBoxDetail, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailListComponents);