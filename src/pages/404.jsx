import React, {Component,PropTypes} from 'react';

import {Button} from 'antd';

import ScrollPageContent from 'components/scroll-page-content';

export default class NotFoundPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    goHome = () => {
        NProgress.start();
        this.context.router.push('/');
    }

    render() {
        return (
            <ScrollPageContent>
                <div className="page-content not-found-page">
                    <div className="error-img"></div>
                    {/*<img src="./static/images/404/404.png" alt="page not found"/>*/}
                    <div className="error-text">
                        <p>出错了，您访问的页面不存在！</p>
                        <p>Page not Found</p>
                    </div>
                    <Button type="primary" onClick={this.goHome}>返回首页</Button>
                </div>
            </ScrollPageContent>
        );
    }
}