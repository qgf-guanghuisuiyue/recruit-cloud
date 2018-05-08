import React, {Component} from 'react';

import {Modal,Input,Button} from 'antd';

import RecommendResumeTableComponent from './recommend-resume-table';

// lodash
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RecommendResumeModalComponents extends Component {

    state = {
        positionname: '',
        city: '',
        paginationCurrent: 1
    }

    skip = 0;

    resumeid = ''

    params = {
    }

    shouldComponentUpdate(nextProps,nextState) {
        return nextProps !== this.props || this.state !== nextState;
    }

    handleChange = (field,e) => {
        this.setState({
            [field]: e.target.value
        });
    }

    _requestData = (resumeid='') => {
        let params = {...this.params,skip:this.skip};
        if(resumeid !== ''){
            this.resumeid = resumeid;
        }
        this.props.getRecommendRecruit({...params,resumeid:this.resumeid});
    }

    handleSeach = () => {
        const filterObj = pickBy(this.state,item=>{
            return item !== '';
        });
        const omitObj = omit(filterObj,['paginationCurrent']);
        if(!isEqual(this.params,omitObj)){
            this.params = omitObj;
            this.setPagination(1);
            this._requestData();
        }
    }

    resetForm = () => {
        this.setState({
            positionname: '',
            city: ''
        });
        if(!isEmpty(this.params)){
            this.params = {};
            this.setPagination(1);
            this._requestData();
        }
    }

    setPagination = paginationCurrent => {
        this.setState({paginationCurrent});
        this.skip = (paginationCurrent - 1)*10;
    }

    paginationChange = (page,pageSize) => {
        if(isEqual(page,this.state.paginationCurrent)) return ;
        this.setPagination(page);
        this._requestData();
    }

    render() {
        // recommendPositioning 推荐职位中
        const {hideModal,data,resumeid,recommendPositioning} = this.props,
            {positionname,city,paginationCurrent} = this.state,
            {visible} = data;
        return (
            <Modal
                title="职位推荐"
                wrapClassName="vertical-center-modal recommend-resume-modal"
                visible={visible}
                onCancel={recommendPositioning ? ()=>{} : hideModal}
                footer={null}
            >
                <div>
                    <div className="form">
                        <Input 
                            value={positionname}
                            placeholder="职位名称"
                            onChange={(e)=>this.handleChange('positionname',e)}
                        />
                        <Input 
                            value={city}
                            placeholder="工作地点"
                            onChange={(e)=>this.handleChange('city',e)}
                        />
                        <Button type="primary" onClick={this.handleSeach}>
                            查询
                        </Button>
                        <Button className="grey" onClick={this.resetForm}>
                            清空条件
                        </Button>
                    </div>
                    <RecommendResumeTableComponent 
                        resumeid={resumeid}
                        hideModal={hideModal}
                        visible={visible}
                        requestData={this._requestData}
                        paginationCurrent={paginationCurrent}
                        paginationChange={this.paginationChange}
                    />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Recruit.recommendModal,
    recommendPositioning: state.Talent.recommendPositioning
})
const mapDispatchToProps = dispatch => ({
    hideModal: bindActionCreators(Actions.RecruitActions.hideRecommendModal, dispatch),
    getRecommendRecruit: bindActionCreators(Actions.RecruitActions.getRecommendRecruit, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecommendResumeModalComponents);