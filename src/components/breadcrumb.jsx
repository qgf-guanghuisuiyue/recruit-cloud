import React, {Component} from 'react';

import {Breadcrumb} from 'antd';

export default class BreadCrumbComponent extends Component {

    handleClick() {
        NProgress.start();
    }

    render() {
        const {routes} = this.props;
        let filterRoutes = [];
        routes.forEach((item,index)=>{
            if(item.breadcrumbName){
                filterRoutes.push(item);
            }
        });
        const currentPage = filterRoutes.pop();
        return (
            <Breadcrumb separator="&gt;">
                {
                    filterRoutes.map( (item,index)=>{
                        return <Breadcrumb.Item className="hover" key={index} 
                                    href={`#${item.path}`} 
                                    onClick={this.handleClick}>{item.breadcrumbName}
                               </Breadcrumb.Item>
                    })
                }
                <Breadcrumb.Item>{currentPage.breadcrumbName}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}