import React, {Component} from 'react';
import { Link } from 'react-router'

export default class LeftNavComponent extends Component {

    navData = [
        {name:'简历搜索',path:'/searchResume'},            
        {name:'我的下载',path:'/searchResume/downloadResume'},
        {name:'我的收藏',path:'/searchResume/collectResume'},
    ];

    state = {
        // activeType: 0
    }

    _showNprogress=(uri='')=>{
        const {location} = this.props,
            {pathname} = location;
        if(uri === pathname) return ;
        NProgress.start();
    }

    handleClick = (activeType, path) => {
        //this.setState({activeType});
        //this._showNprogress(path)
    }

    render() {
        const {activeType} = this.state;
        const {location} = this.props,
        {pathname} = location;
        return (
            <div className="left-nav resumeSearch">
                <a className="title" style={{cursor:"default"}}>简历搜索管理</a>
                <ul>
                    
                    {
                        this.navData.map((item,index)=>{
                            const {path,name} = item;
                            return (
                                <Link 
                                    to={path}
                                    style={{display:"block"}}
                                    className={pathname === item.path ? 'active': ''}
                                    //onClick={()=>this.handleClick(index,path)}
                                >
                                    {item.name} 
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}