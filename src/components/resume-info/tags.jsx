import React, {Component} from 'react';

// lodash
import remove from 'lodash/remove';
import find from 'lodash/find';

import {Input,Button,Tag} from 'antd';

export default class TagsComponent extends Component {

    state = {
        tag: '',
        tags: [],
        error: false
    }

    componentDidMount() {
        const {currentStage={}} = this.props,
            {thelable=''} = currentStage;
        this.setState({
            tags: thelable === ''? [] : thelable.split(',')
        });
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.state !== nextState;
    }

    handleKeyUp = (e) => {
        if(e.keyCode === 13){
            this.addTag();
        }
    }

    handleChange = (e) => {
        const {tag,error} = this.state;
        if(error){
            this.setInputError(false);
        }
        this.setState({
            tag: e.target.value
        });
    }

    setInputError(error,errorMsg='标签名不能为空！') {
        this.setState({error,errorMsg});
    }

    addTag = () => {
        const {tag,tags,error} = this.state;
        
        // 判断标签是否为空
        if(tag === ''){
            this.setInputError(true);
            return ;
        }
        // 判断已经添加标签的数量
        if(tags.length > 9){
            this.setInputError(true,'最多只能添加10个标签！');
            return ;
        }
        // 判断标签是否已经存在
        const isHasTag = find(tags,item=>{
            return tag === item;
        });
        if(typeof isHasTag !== 'undefined'){
            this.setInputError(true,'不能有重复的标签！');
            return ;
        }
        if(error){
            this.setInputError(false);
        }
        tags.push(tag);
        this.setState({tags,tag:''});
    }

    onTagClose(item) {
        const {tags} = this.state;
        remove(tags,val=>{
            return val == item;
        });
        this.setState({tags});
    }

    render() {
        const {tag,tags,error,errorMsg} = this.state;
        return (
            <div className="tag-area">
                <div>
                    添加标签
                    <div className="inline-block" style={{
                        position: 'relative'
                    }}>
                        <Input 
                            value={tag}
                            className={error ? 'error' : ''}
                            placeholder="请输入标签名"
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                        />
                        {error && 
                            <div className="error-promote" style={{
                                paddingLeft: 11
                            }}>
                                <label className="error">{errorMsg}</label>
                            </div>
                        }
                    </div>
                    <Button className="addTag-button" type="primary" onClick={this.addTag}>添加</Button>
                </div>
                {tags.length > 0 &&
                    <div style={{
                        marginTop: 26
                    }}>
                        <p>标签 :</p>
                        <div className="tags-list" style={{
                            whiteSpace: 'normal',
                            marginTop: 7
                        }}>
                            {
                                tags.map((item,index)=>{
                                    const isLongTag = item.length > 20;
                                    return (
                                        <Tag 
                                            key={item} 
                                            closable
                                            onClose={()=>this.onTagClose(item)}
                                        >
                                            {isLongTag ? `${item.slice(0, 40)}...` : item}
                                        </Tag>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}