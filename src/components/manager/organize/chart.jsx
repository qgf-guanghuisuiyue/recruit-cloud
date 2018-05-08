import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import {Link} from 'react-router';
import './chart.css' 
// loading
import LoadingComponent from 'components/loading';
// antd
import { Modal, Select } from 'antd';
const Option = Select.Option;

class OrganizeChart extends Component {
  state = { 
    isLoading:true
  }
  componentDidMount(){
    // 获取数据
    this.props.getOrganizeChart();
  }
  componentShouldUpdate(){
    return nextProps !== this.props || nextState !== this.state
  }
  componentWillUpdate(nextProps,nextState) {
    const {organize:{organizeList}} = nextProps;
    const zhis = this;
    if(nextProps !== this.props){
        var newOrg = JSON.parse(JSON.stringify(organizeList).replace(/list/g, "childrens"))
        var result = {
            data:[newOrg]
        }
        function dd (result){
            var showlist = $("<ul id='org' style='display:none'></ul>");
            showall(result.data, showlist);
            $("#jOrgChart").empty().append(showlist);
            $("#org").jOrgChart({
                chartElement : '#jOrgChart',//指定在某个dom生成jorgchart
                dragAndDrop : false //设置是否可拖动
            });
            zhis.setState({isLoading:false})
        }
        dd(result);
        function showall(menu_list, parent) {
            $.each(menu_list, function(index, val) {
                if(val.childrens && val.childrens.length > 0){
                    var li = $("<li></li>");
                    if(val.type == '4'){
                        li.append("<a href='javascript:void(0)' class='myOnly' >"+val.name+"</a>").append("<ul></ul>").appendTo(parent);
                        //递归显示
                        showall(val.childrens, $(li).children().eq(1));
                    }else if(val.type == undefined){
                        li.append("<a href='javascript:void(0)' class='first'>"+val.name+"</a>").append("<ul></ul>").appendTo(parent);
                        //递归显示
                        showall(val.childrens, $(li).children().eq(1));
                    }else{
                        li.append("<a href='javascript:void(0)' >"+val.name+"</a>").append("<ul></ul>").appendTo(parent);
                        //递归显示
                        showall(val.childrens, $(li).children().eq(1));
                    }
                }else{
                    if(val.type == '4'){
                        $("<li></li>").append("<a href='javascript:void(0)' class='myOnly' >"+val.name+"</a>").appendTo(parent);
                    }else{
                        $("<li></li>").append("<a href='javascript:void(0)' >"+val.name+"</a>").appendTo(parent);
                    }
                }
            });
        }
        $('.myOnly').parent('div').addClass('blue');
        $('.first').parent('div').addClass('first-name');
    }
}
  
render() {
    // const { organize:{ isLoading } } = this.props;
    const { isLoading } = this.state;
    console.log(isLoading)
    return (
        <div>
            {isLoading &&
                <div>
                    <LoadingComponent style={{
                        width: '100%',
                        backgroundColor: '#FFF',
                    }} />
                </div>
            }
            <div id='jOrgChart'>
            </div>
        </div>
    );
  }
}
const mapStateToProps = state => ({
    organize: state.Manage.organize
})
const mapDispatchToProps = dispatch => ({
    getOrganizeChart: bindActionCreators(Actions.ManageActions.getOrganizeChart, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizeChart);

