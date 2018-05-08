import React, {Component} from 'react';

import {Radio} from 'antd';
const RadioGroup = Radio.Group;

import TooltipComponents from './tooltip';
import TagsComponent from './tags';

export default class OfferComponents extends Component {

    state = {
        statusid: '1'
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    onChange = (e) => {
        this.setState({
            statusid: e.target.value
        });
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
                    <Radio value={'1'}>已发送</Radio>
                    <TooltipComponents>
                        <Radio value={'2'}>不发送</Radio>
                    </TooltipComponents>
                </RadioGroup>
                <TagsComponent ref='Tags' currentStage={this.props.currentStage} />
            </div>
        );
    }
}