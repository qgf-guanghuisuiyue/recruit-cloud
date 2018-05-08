import React, {Component,PropTypes} from 'react';

import {Button , Menu} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';
import BreadCrumbComponent from 'components/breadcrumb';

export default class HelpPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount(){
        NProgress.done();
    }

    goHome = () => {
        NProgress.start();
        this.context.router.push('/');
    }
    render() {
        const {location,routes} = this.props;
        return (
            <ScrollPageContent>
                <div className="page-content not-found-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="box-border">
                        <div className="pull-left" style={{height:800}}>
                            <LeftNavComponent/>
                        </div>
                        <div className="pull-right helpContent">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}