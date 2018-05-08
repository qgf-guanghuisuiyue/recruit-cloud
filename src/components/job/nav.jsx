import React, {Component,PropTypes} from 'react';

import {Badge} from 'antd';

export default class LeftNavComponent extends Component {

    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.array,
        isLoading: PropTypes.bool,
        onClick: PropTypes.func
    }

    state = {
        _selectedIndex: 0
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.state !== nextState || nextProps !== this.props;
    }

    setSelectedIndex = _selectedIndex => {
        this.setState({_selectedIndex});
    }

    handleClick = (index,type,title) => {
        if(this.state._selectedIndex === index) return;
        this.setSelectedIndex(index);
        const {onClick} = this.props;
        if(onClick){
            onClick(type,title);
        }
    }

    getItem = (item,index) => {
        const {_selectedIndex} = this.state,
            {type,title,num=0} = item,
            {isLoading} = this.props;
        return (
            <dd 
                key={index} 
                onClick={this.handleClick.bind(this,index,type,title)}
                className={_selectedIndex === index ? 'active' : ''}
            >
                {title} 
                {isLoading ?
                    <div 
                        className={_selectedIndex === index ? 'preloader-white' : 'preloader'} 
                        style={{
                            position: 'relative',
                            top: 3,
                            width: 16,
                            height: 16
                        }}
                    >
                    </div> :
                    <Badge showZero count = {num} overflowCount = {num} style = {{backgroundColor: item.bgcolor,borderRadius: "5px",marginLeft: "11px"}}/>
                }
            </dd>
        )
    }

    render() {
        const {_selectedIndex} = this.state,
            {
                title='',
                data=[]
            } = this.props;
            const leftData = [];
            for(let i=0;i<data.length;i++){
                if(data[i].title!=="复试管理"){
                    leftData.push(data[i])
                }
            }  
        return (
            <ul className="left-nav box-border">
                <li>
                    <a className="title" href="javascript:void(0);">{title}</a>
                    <dl>
                        {leftData.map((item,index)=>{
                            return this.getItem(item,index);
                        })}
                    </dl>
                </li>
            </ul>
        );
    }
}