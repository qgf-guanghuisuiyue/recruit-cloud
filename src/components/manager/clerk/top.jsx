import React, {Component} from 'react';

import { Input } from 'antd';

import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

export default class TopComponent extends Component {

    state = {
        key: '',
        _selectedIndex: 0,   //当前选中的
        workstatus: '0',
    }

    //监听键盘Enter键
    componentDidMount() {
        const _this = this;
        window.addEventListener('keydown', function(e){
            switch(e.keyCode){
            case 13:
                _this.handleSearch();
                break;
            default:
                break;
            }
        })
    }

    setSelectedIndex = _selectedIndex => {
        this.setState({_selectedIndex});
    }

    getItem = (item, index) => {
        const {_selectedIndex} = this.state,
            {
                num=0,
                desc='',
                numColor='',
                type=''
            } =item,
            {isLoading, circle} = this.props;
            return(
                <div 
                    className={`box ${_selectedIndex === index ? 'active' : ''}`}
                    style={{
                        borderColor: _selectedIndex === index && numColor,
                        marginRight: index === 2 && 40
                    }}
                    onClick={this.handleClickBox.bind(this,index,type,desc)}
                >
                    <div className="table">
                        <div className="table-cell">
                            <p className="num" style={{
                                color: numColor
                            }}>
                                {
                                    isLoading ? 
                                    <div 
                                        className={_selectedIndex === index ? 'preloader-white' : 'preloader'} 
                                    >
                                    </div> : 
                                    num
                                }
                            </p>
                            <p className="desc">
                                {desc}
                            </p>
                        </div>
                    </div>
                    {
                        _selectedIndex === index && <div className="triangle" style={{borderBottomColor: _selectedIndex === index  ? numColor : ''}}></div>
                    }
                    {
                        type=="trial" && circle && <div className="circle"></div>
                    }
                </div>
            )

    }

    handleClickBox = (index,type,desc) => {
        this.setSelectedIndex(index);
        const {onClick} = this.props;
        if(onClick){
            onClick(type,desc)
        }
    }

    handleChange = e => {
        this.setState({
            key: e.target.value
        });
    }

    handleSearch = () => {
        const filterObj = pickBy(this.state,(val,key)=>{
            return val !== '' && val !=undefined && val !=0;
        });
        this.props.handleFind(filterObj);
    }

    

    render() {
        const {keyWord} = this.state;
        const {data=[],isLoading} = this.props;
        return (
            <div
                style={{
                    position: 'relative',
                    fontSize: 0
                }}
            >
                {data.map((item,index) => {
                    return this.getItem(item, index)
                })}
                <Input 
                    placeholder="员工搜索"
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: 200
                    }}
                    onChange = {this.handleChange}
                    suffix={
                        <a 
                            href="javascript:;"
                            onClick={this.handleSearch}
                        >
                            <img src="static/images/manager/search.png" alt="搜索"/>
                        </a>
                    }
                />
                <p style={{
                    fontSize: '12px',
                    color: '#868686',
                    marginTop: 8
                }}>
                    *待入职员工和离职员工不计入人员总数，不会在全部人员中显示。
                </p>
            </div>
        );
    }
}

