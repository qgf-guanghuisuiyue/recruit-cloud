import React, {Component} from 'react';

import { Tag } from 'antd';
const { CheckableTag } = Tag;

import data from 'data/create-job';

class MyTag extends Component {
    state={
        checked:false,
    }
    handleChange = (checked) => {
        const {addTags,children} = this.props;
        if(checked){
            addTags(children);
        }
        this.setState({ checked });
    }
    render() {
        return (
            <CheckableTag 
                checked={this.state.checked} 
                onChange={this.handleChange}
                children={this.props.children}
            />
        )
    }
}

export default class TagsComponent extends Component {
    selectedTags = [];
    addTags=(tagName)=>{
        this.selectedTags.push(tagName);
    }
    render() {
        return (
            <li className="tags">
                <h2 className="title">
                    福利标签
                </h2>
                <ul>
                    <li>选择职位亮点，提升职位吸引力，有效增加职位投递！</li>
                    <li>
                        <ul>
                            {
                                data.tags.map((item,index)=>{
                                    return (
                                        <li key={index}>
                                            {
                                                item.map( (val,key)=>{
                                                    return (
                                                        <MyTag key={key} addTags={this.addTags}>{val}</MyTag>
                                                    )
                                                })
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                </ul>
            </li>
        );
    }
}