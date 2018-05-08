import React, {Component,PropTypes} from 'react';

import {Button , Menu} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/resumeSearch/left-nav';
import BreadCrumbComponent from 'components/breadcrumb';

export default class ResumeSearchComponent extends Component {

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
                <div className="page-content" ref="pageContent">
                    <BreadCrumbComponent routes={routes} />
                    <div className="box-border">
                        <div className="pull-left">
                            <LeftNavComponent location={location}/>
                        </div>
                        <div className="pull-right resumeSearchContent">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                
            </ScrollPageContent>
        );
    }
}