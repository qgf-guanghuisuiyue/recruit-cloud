import React, {Component} from 'react';

import {Radio} from 'antd';
const RadioGroup = Radio.Group;

import TooltipComponents from './tooltip';
import TagsComponent from './tags';

export default class ReplyComponents extends Component {

    state = {
        statusid: '2'
    }

    onChange = (e) => {
        this.setState({
            statusid: e.target.value
        });
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    getFormData = () => {
        const {tags} = this.refs.Tags.state,
            {statusid} = this.state;
        if(tags.length > 0){
            const thelable = tags.join(',');
            return {thelable,statusid}
        }
        return {statusid};
    }

    render() {
        const {statusid} = this.state;
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={statusid}>
                    <TooltipComponents>
                        <Radio value={'1'}>
                            不适合
                        </Radio>
                    </TooltipComponents>
                    <Radio value={'2'}>适合</Radio>
                </RadioGroup>
                <TagsComponent ref='Tags' />
            </div>
        );
    }
}