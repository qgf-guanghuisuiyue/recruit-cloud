import React, {Component} from 'react';

import FormComponent from './form';
import TableComponent from './table';

export default class RightComponent extends Component {
    
    render() {
        return (
            <div className="box-border right-panel">
                <FormComponent ref="FormComponent" {...this.props} />
                <TableComponent {...this.props} />
            </div>
        );
    }
}