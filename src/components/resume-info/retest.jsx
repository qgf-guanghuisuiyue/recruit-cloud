import React, {Component} from 'react';

import {Radio,Input,DatePicker} from 'antd';
const RadioGroup = Radio.Group;

import TooltipComponents from './tooltip';
import TagsComponent from './tags';
import InputComponents from './input';

export default class RetestComponents extends Component {

    state = {
        statusid: '4'
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
        let data = {} ,
        thelable = '';
        const {tags} = this.refs.Tags.state,
            {statusid} = this.state;
        if(statusid === '3'){
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

    getTimePlaceholder(statusid) {
        switch(statusid){
            case "3":
                return "复试时间";
            case "4":
                return "入职时间";
        }
    }

    getAddressPlaceholder(statusid) {
        switch(statusid){
            case "3":
                return "复试地点";
            case "4":
                return "入职地点";
        }
    }
    

    render() {
        const {statusid} = this.state;
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={statusid}>
                    <TooltipComponents>
                        <Radio value='1'>未去复试</Radio>
                    </TooltipComponents>
                    <TooltipComponents>
                        <Radio value='2'>淘汰</Radio>
                    </TooltipComponents>
                    <Radio value='3'>安排复试</Radio>
                    <Radio value='4'>建议入职</Radio>
                </RadioGroup>
                { (statusid === '3' || statusid === '4') &&
                    <InputComponents
                        ref="Event"
                        timePlaceholder={this.getTimePlaceholder(statusid)}
                        addressPlaceholder={this.getAddressPlaceholder(statusid)}
                    />
                }
                <TagsComponent ref='Tags' currentStage={this.props.currentStage} />
            </div>
        );
    }
}