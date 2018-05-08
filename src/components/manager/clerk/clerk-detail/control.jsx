import React, {Component} from 'react';
import { Button } from 'antd';

import store from 'store';

export default class ControlComponent extends Component {

    state = {
        round: true
    }

    handleClick = () => {
        window.history.back(-1);
        //清除缓存
        this.props.queryResetForm();
        this.props.hidecredit();
        this.props.cancelData();
    }
    
    render() {
        const {round} = this.state;
        return (
            <div className="control">
                <div className="pull-left">
                    <Button
                        style={{
                            width: 70,
                        }}
                        onClick={ this.handleClick}
                    >&lt;&nbsp;返回</Button>
                </div>
                {/* <div className="ctr-btns pull-right">
                    <div className="inline-block hint">
                        {
                            round && <div className="round"></div>
                        }
                        <img src="static/images/manager/clerk/hint.png" alt="提示"/>
                    </div>
                    <div className="inline-block ps">
                        <img src="static/images/manager/clerk/ps.png" alt="备注"/>
                    </div>
                    <div className="inline-block print"> 
                        <img src="static/images/manager/clerk/print.png" alt="打印"/>
                    </div>
                </div> */}
                <div className="clearfix"></div>
            </div>
        );
    }
}