import React, {Component} from 'react';
import SearchComponent from './Search';
import ChartsComponent from './charts';

export default class EmployeesOverview extends Component {

     componentWillMount(){
        NProgress.done();
     }

     render(){
        const {routes} = this.props;
        return (
            <div>
                {/* <SearchComponent /> */}
                <ChartsComponent />
            </div>
        );
     }
 }