import React, { Component } from 'react';

import { Button, Tag } from 'antd';

import hotJobData from 'data/create-job/hot-job'; 

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 export default class TopComponent extends Component {

    handleClick = () => {
        window.history.back(-1)
    }

    tagClick = (positionid) => {
       this.props.getJobInfo({positionid})    
    }
    
    render() {
        const { 
            recentJobData,
            isLoading
        } = this.props;
        return(
            <ul>
                <li className="hot-job"> 
                    <div className="inline-block back-btn">
                        <Button onClick={ this.handleClick}>&lt;&nbsp;返回</Button>
                    </div>
                    <div className="inline-block hot-job-list">
                        <span>热招职位：</span>
                        {
                            hotJobData.map((item,index) => {
                                return (
                                    <div className="inline-block" key={index}>
                                        <span className="hot-job-item">{item}</span>
                                        { index === hotJobData.length-1 ? "" : <b>|</b> }
                                    </div>
                                )
                            })
                        }
                    </div>
                </li>
                <li className="recent-job">
                    <span>最近发布职位：</span>
                    {
                        recentJobData.map((item,index) => {
                            const isLongTag = item.length > 20;
                            return (
                                <Tag
                                    key = {index}
                                    closable
                                    onClick={this.tagClick.bind(this,item.positioid)}
                                >   
                                    {
                                        isLoading ? 
                                            <div 
                                                className='preloader'
                                                style={{
                                                    position: 'relative',
                                                    width: 16,
                                                    height: 16
                                                }}
                                            ></div> : 
                                            isLongTag ? `${item.positionname.slice(0,20)}...` : item.positionname
                                    }
                                    
                                </Tag>
                            )
                        })
                    }
                </li>
            </ul>
        )
    }
}