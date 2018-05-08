import React, {Component} from 'react';
import moment from 'moment';

export default class TimeComponent extends Component {

    state = {};

    componentDidMount() {
        this.timeout();
        this.loopTime = setInterval(()=>{
            this.timeout();
        },1000);
    }

    componentWillUnmount() {
        clearInterval(this.loopTime);
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.state !== nextState;
    }

    _getBigLetter(num) {
        switch(parseInt(num)){
            case 1:
                return '一';
            case 2:
                return '二';
            case 3: 
                return '三';
            case 4: 
                return '四';
            case 5:
                return '五';
            case 6:
                return '六';
            case 7:
                return '日';
            default: 
                return '一';
        };
    }

    timeout() {
        this.setState({
            hourTime: moment().format('HH:mm:ss')
        });
    }

    render() {
        const {hourTime=''} = this.state;
        return (
            <div className="time box-border">
                <div className="left">
                    <p className="top">
                        {hourTime}
                    </p>
                    <p className="bottom">
                        {moment().format('YYYY-MM-DD')}
                    </p>
                </div>
                <div className="right">
                    {`周${this._getBigLetter(moment().format('d'))}`}
                </div>
            </div>
        );
    }
}