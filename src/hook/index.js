import store from 'store';

import {cancelRequest} from 'utils/ajax';
import {clearResumeData} from 'actions/resumeSearch'

// 已经登录如果再次进入登陆页,跳转到首页
export const onEnterLoginHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    if(token) replace({pathname:'/'});
}

// 权限验证
export const requireAuthHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    if(!token) replace({pathname:'/login'});
    // 修改网页title
    const {routes} = nextState,
    title = routes[routes.length - 1 ].breadcrumbName;
    document.title = `51云招聘 - ${title ? title : routes[routes.length - 2 ].breadcrumbName}`;  
}

export const requireHook = (nextState,replace) => {
    // 修改网页title
    const {routes} = nextState,
    title = routes[routes.length - 1 ].breadcrumbName;
    document.title = `51云招聘 - ${title ? title : routes[routes.length - 2 ].breadcrumbName}`;  
}

// 离开页面触发此钩子
export const onLeavePage = (nextState,replace) => {
    cancelRequest();
}