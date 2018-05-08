import React, {Component} from 'react';
import { Input , Button , Cascader , Select , Icon, Form } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search

class SearchComponent extends Component {

     componentDidMount(){
        NProgress.done();
     }
     search = () => {
        this.props.form.validateFields(
            (err,values) => {
                if (!err) {
                console.info('success',values);
                }
            },
        );
    }
     render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='form'>
                <div className="inline-block">
                    <FormItem>
                        {getFieldDecorator('company', {
                            rules: [{
                            required: false
                            }],
                        })(
                            <Select
                                style={{ width: 200, 'margin-right':'16px' }}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        )}
                    </FormItem>
                </div>
                <div className="inline-block">
                    <FormItem>
                        {getFieldDecorator('job', {
                            rules: [{
                            required: false
                            }],
                        })(
                            <Input 
                                placeholder="请输入岗位名称" 
                            />
                        )}
                    </FormItem>
                </div>
                <div className="bottom28 inline-block">
                    <div className="inline-block">
                        <FormItem>
                            <Button  style={{'margin-left':'16px' }} onClick={this.search}>
                                搜索
                            </Button>
                        </FormItem>
                    </div>
                </div>
                <div className="pull-right">
                    <Button style={{width: '40px',padding: 0,border: 'none',backgroundColor: '#ffa93a'}} >
                        <img 
                            style = {{
                                width: 40,
                                height: 40
                            }}
                            src="./static/images/resume/share.jpg" alt="分享"/>
                    </Button>
                </div>
            </div>
        );
     }
 }
 const WrappedSearchComponent = Form.create()(SearchComponent);
 export default WrappedSearchComponent;