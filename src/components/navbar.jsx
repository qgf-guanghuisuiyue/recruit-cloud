import React, {Component,PropTypes} from 'react';
import {Link} from 'react-router';

import isEmpty from 'lodash/isEmpty';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class NavBarComponents extends Component {

    state = {
        isLoading: false,
        showSetting: false,
        keyword: ''
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.getUserInfo();
    }

    componentWillUpdate(nextProps,nextState) {
        if(!isEmpty(nextProps.userInfo) && nextState.isLoading ){
            this.setState({
                isLoading: false
            });
        }
        /**
         * 切换页面清空搜索框
         * this.props.location.pathname 为当前页面的路径
         * nextProps.location.pathname 为要切换到哪个页面
         */
        if(this.state.keyword !== '' && this.props.location.pathname.indexOf('/talent') !== -1 && nextProps.location.pathname.indexOf('/talent') === -1){
            this.setState({
                keyword: ''
            });
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || nextState !== this.state;
    }

    showNprogress=(uri='')=>{
        const {location} = this.props,
            {pathname} = location;
        if(uri === pathname) return ;
        NProgress.start();
    }

    showSettings = () => {
        this.setState({
            showSetting: true
        });
    }

    hideSettings = () => {
        this.setState({
            showSetting: false
        });
    }

    logout = () => {
        this.hideSettings();
        NProgress.start();
        this.props.userLoginout(this.context);
    }

    handleClickSetting = (uri) => {
        const {location} = this.props,
            {pathname} = location;
        if(uri === pathname) return ;
        this.showNprogress();
        this.hideSettings();
    }

    handleKeyUp = event => {
        if(event.keyCode === 13){
            this.searchKeyword();            
        }
    }

    searchKeyword = () => {
        const {location} = this.props;
        const {pathname} = location;
        const matchPath = /\/talent/i;
        if(!matchPath.test(pathname)){
            NProgress.start();
        }
        this.context.router.push(`/talent/${this.state.keyword}`);
    }

    handleChange = e => {
        this.setState({
            keyword: e.target.value
        });
    }

    render() {
        const {isLoading,keyword} = this.state,
        {location,userInfo} = this.props,
            {pathname} = location,
            {username='',companyname=''} = userInfo,
            prefix = './static/images/navbar/',
            navData = [
                {name: '职位管理',path:'/job/index'},
                {name: '招聘流程',path:'/recruit'},
                {name: '人才库',path:'/talent'},
                {name: '任务报表',path:'/task'},
                {name: '员工管理',path:'/manager'},
                {name: '简历搜索',path:'searchResume'},
                {name: '薪酬数据',path:'/salaryQuery'},
            ];
        return (
            <div className="navbar">
                <div className="navbar-inner">
                    <div className="logo">
                        <Link to="/" onClick={()=>this.showNprogress('/')}>
                            <img src={`${prefix}logo.png`} alt="51云招聘"/>
                        </Link>
                    </div>
                    <div className="home" style={{backgroundColor: pathname === '/' ? '#00699f' : ''}}>
                        <Link to='#/' onClick={()=>this.showNprogress('/')}><img src={`${prefix}home.png`} alt="首页"/></Link>
                    </div>
                    <ul className="nav-list">
                        {
                            navData.map((item,index)=>{
                                const {path,name} = item;
                                return (
                                    <li 
                                        key={index} 
                                        style={{
                                            backgroundColor: pathname.indexOf(path) !== -1 ? '#00699f' : ''
                                        }}
                                    >
                                        <Link onClick={()=>this.showNprogress(path)} to={path}>{name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="user">
                        {!isLoading &&
                            <div className="table">
                                <div className="table-row">
                                    <div 
                                        className="email-address dropdown-wrapper" 
                                        onMouseLeave={this.hideSettings} 
                                        onMouseOver={this.showSettings}
                                    >
                                        {username}
                                        <ul className="dropdown-menu box-border" style={{
                                            transform: this.state.showSetting ? 'translateY(10px)' : ''
                                        }}>
                                            <li>
                                                <p className="email-address">{username}</p>
                                            </li>
                                            <li>
                                                <Link to="/changePasswd" onClick={this.handleClickSetting.bind(this,'/changePasswd')}>
                                                    修改密码
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/settingEmail" onClick={this.handleClickSetting.bind(this,'/settingEmail')}>
                                                    配置邮箱
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/help" onClick={this.handleClickSetting.bind(this,'/help')}>
                                                    使用帮助
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="javascript:;" onClick={this.logout}>
                                                    退出系统
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="table-row">
                                    <p className="company-name">{companyname}</p>
                                </div>
                            </div>
                        }
                        {isLoading &&
                            <div className="preloader-white absolute-center" style={{
                                width: 25,
                                height: 25
                            }}>
                            </div>
                        }
                    </div>
                    <Link 
                        to="/email" 
                        className={`email ${pathname==='/email' ? 'active' : ''}`} 
                        onClick={()=>this.showNprogress()}
                    >
                        <img src={`${prefix}email.png`} alt="邮箱" />
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.User.userInfo
})
const mapDispatchToProps = dispatch => ({
    getUserInfo: bindActionCreators(Actions.UserActions.getUserInfo, dispatch),
    userLoginout:bindActionCreators(Actions.logoutActions.userLoginout, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBarComponents);