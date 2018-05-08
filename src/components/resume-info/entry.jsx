import React, {Component} from 'react';

import {Radio,Input,DatePicker} from 'antd';
const RadioGroup = Radio.Group;

import TooltipComponents from './tooltip';
import TagsComponent from './tags';
import InputComponents from './input';

export default class EntryComponents extends Component {

    state = {
        statusid: '2'
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.state !== nextState;
    }

    onChange = (e) => {
        this.setState({
            statusid: e.target.value
        });
    }

    getFormData = () => {
        let data = {} ,
        thelable = '';
        const {tags} = this.refs.Tags.state,
            {statusid} = this.state;
        if(statusid === '1'){
            data = this.refs.Event.getFormData();
        }
        if(data === false){
            return false;
        }
        if(tags.length > 0){
             thelable = tags.join(',');
        }
        return {statusid,thelable,...data};
    }
    

    render() {
        const {statusid} = this.state;
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={statusid}>
                    <Radio value='2'>已按时到岗</Radio>
                    <Radio value='3'>未按时到岗</Radio>
                </RadioGroup>
                {statusid === '2' &&
                    <InputComponents 
                        ref="Event"
                        timePlaceholder='到岗时间'
                        addressPlaceholder='到岗地点'
                    />
                }
                <TagsComponent ref='Tags' currentStage={this.props.currentStage} />
            </div>
        );
    }
}