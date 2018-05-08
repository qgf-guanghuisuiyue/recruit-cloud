import React, {Component} from 'react';

 export default class OperateEmployeesPie extends Component {

     componentDidMount(){
        // NProgress.done();
     }

     render(){
        return (
            <div className='operate-div'>
                <img src="static/images/manager/condition/download.png" alt="提示"/>
                <img src="static/images/manager/condition/refresh.png" alt="提示"/>
            </div>
        );
     }
 }