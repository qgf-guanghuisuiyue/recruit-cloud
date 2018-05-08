import React from 'react';
import ReactDom from 'react-dom';
import Promise from 'promise-polyfill';
// import figlet from 'figlet';

// figlet.defaults({fontPath: "/static/fonts"});

// figlet('51JRQ', 'Doh', function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });

// 全局uri注入
//window.prefixUri = 'http://yun.51jrq.com/51hr/api/web';
// window.prefixUri = '/51hr/api/web';
// window.resumeUrl = '/resumeClient/api';
window.prefixUri = '/hrmanage/api/web';
window.resumeUrl = '/resumeClient/api';
// css文件
import 'rc-steps/assets/index.css';
import 'static/css/normalize.css';
import 'static/css/nprogress.css';
import './scss/main.scss';

// NProgress configure
NProgress.configure({
    className: 'top56'
})

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

// React 性能分析工具
// import Perf from 'react-addons-perf';
// window.Perf = Perf;

// react-router
import { Router , hashHistory } from 'react-router'

// redux
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
// import getRoutes from './router/router.bak';
// const routes = getRoutes();
import routes from './router';
import 'babel-polyfill';

// 创建一个store
const store = createStore(
    reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    //     name: 'test'
    // }),
    applyMiddleware(thunk)
);

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}>
        </Router>
    </Provider>
,document.getElementById('app'));