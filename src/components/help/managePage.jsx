import React, {Component,PropTypes} from 'react';

import {Button , Menu , Icon} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';

export default class NotFoundPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    archives =() => {
        $(".employeesManagement").animate({
            scrollTop: $("#archives").offset().top-200 }, {duration: 500,easing: "swing"});
        return false;
    }
    organize = () => {
        $(".employeesManagement").animate({
            scrollTop: $("#organize").offset().top-300 }, {duration: 500,easing: "swing"});
        return false;
    }
    condition = () => {
        $(".employeesManagement").animate({
            scrollTop: $("#condition").offset().top+1200 }, {duration: 500,easing: "swing"});
        return false;
    }
    arrowUp = () => {
        $(".employeesManagement").animate({
            scrollTop: $("#employyee").offset().top }, {duration: 500,easing: "swing"});
        return false;
    }
    render() {
        return (
            <div className="employeesManagement">
                <h3>员工管理</h3>
                <p>
                    员工管理模块主要是对已入职员工的信息进行管理。主要有&nbsp;&nbsp;
                    <a>员工名册</a>&nbsp;&nbsp;
                    <a onClick={this.archives}>档案管理</a>&nbsp;&nbsp;
                    <a onClick={this.organize}>组织架构</a>&nbsp;&nbsp;
                    <a onClick={this.condition}>全员概况</a>
                </p>
                <div className="employeesManagementmodel">
                    <h4 id="employyee">员工名册</h4>
                    <p>
                        员工名册区域模块主要是对公司正式员工、试用期员工、待入职人员及离职员工的各项管理操作。同时也可在该界面通过添加员工信息和导出人员信息操作。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【全部人员】：</span>
                        包含了公司的正式员工和试用期员工在内的人员信息，以列表的形式展示。（注：待入职员工和离职员工不计入人员总数，不会在全部人员名单中显示）
                    </p>
                    <div className="img">
                        <img src="/static/images/help/yuangmc.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-1 员工管理—员工名册</div>

                    
                    <p>
                        <span style={{color:"#0086C9"}}>【添加员工】：</span>
                        可通过导入Excel人员信息和手动添加两种方式添加未在系统内进行面试流程的人员信息。（注：为避免数据解析错误，导入excel人员信息需先下载人员信息模板，完善信息后重新上传）
                    </p>
                    <div className="img">
                        <img src="/static/images/help/addperson.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-2 导入Excel方式员工信息录入</div>


                    <p>
                        <span style={{color:"#0086C9"}}>【排序】：</span>
                        根据自己的需求可以点击设置“按入职时间降序”和“按入职时间从早到晚”两种方式来显示员工信息。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【导出】：</span>
                        可点选单个员工或批量选择员工，导出excel表格。表格中包含员工在系统中录入管理的个人信息。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【删除】：</span>
                        可点选单个员工或批量选择员工，进行删除操作。（注：该删除操作一旦进行，数据会从系统中删除，无法恢复，请谨慎进行该项操作）
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【员工详情操作管理】：</span>
                        点击员工列表中的员工姓名，可跳转至员工详细信息管理界面。该界面可查看到该员工的详细信息，并可进行编辑操作。主要包含快捷操作为：查看简历、人事调动、办理转正和离职。主要包含七大模块：该员工的在职信息、个人信息、工资社保、合同情况、材料附件、操作记录、人员征信。除操作记录是系统自动记录之外，其他几个模块均可人员手工进行信息编辑改动。
                    </p>
                    
                    <div className="img">
                        <img src="/static/images/help/info.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-3 员工详细信息管理界面</div>

                    <p>
                        <span style={{color:"#0086C9"}}>【查看简历】：</span>
                        可查看该员工的求职简历信息，并可进行打印操作。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【人事调动】：</span>
                        对部门在职员工进行调岗、晋升、降级、薪资调整等操作。
                    </p>
                
                    <div className="img">
                        <img src="/static/images/help/renshidd.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-4 在职员工人事调动界面</div>

                    <p>
                        <span style={{color:"#0086C9"}}>【办理离职】：</span>
                        对在职员工进行离职流程操作，除去预设的离职员工外，用户也可以自定义添加员工离职原因。操作后，该员工信息会转存到离职员工列表中。
                    </p>
                    <div className="img">
                        <img src="/static/images/help/leave.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-5 在职员工办理离职</div>

                    <p>
                        <span style={{color:"#0086C9"}}>【在职信息】：</span>
                        展现的是该员工包含工号、部门、工作性质、岗位、电话等在职信息及员工目前的工作状态（入职时间、转正时间、试用期）。该模块信息均可进行编辑修改。
                    </p>
                    <div className="img">
                        <img src="/static/images/help/zaizhiinfo.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-5 在职员工基本信息</div>

                    <p>
                        <span style={{color:"#0086C9"}}>【个人信息】：</span>
                        展现的是员工的基本信息和教育经历。默认是不可编辑状态，点击编辑按钮可对信息进行补充修正。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【工资社保】：</span>
                        展现的是员工的工资卡信息、社保公积金及薪酬状况，默认是不可编辑状态，点击编辑按钮可对信息进行补充修正。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【合同情况】：</span>
                        展现的是员工入职后与公司签署的合同信息及合同附件。，合同信息默认是不可编辑状态，点击编辑按钮可对信息进行补充修正。（注：添加的文件或图片大小限制在2M以内）
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【材料附件】：</span>
                        展现的是与该员工相关的基本资料，档案附件，离职资料。（注：添加的文件或图片大小限制在2M以内）
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【操作记录】：</span>
                        根据用户操作系统自动记录生成的人事操作记录。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【人员征信】：</span>
                        用于入职员工的被调。通过被调员工的姓名、手机号、身份证号、毕业证书号查询反馈出该被调人员的信息真实可靠性。可查内容包含身份证信息、手机号实名、学历信息、失信被执行等信息核查。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【办理转正】：</span>
                        处于试用期的人员在试用期满时，用户可通过此入口对员工进行办理转正操作。
                    </p>
                    <div className="img">
                        <img src="/static/images/help/zhuanzhen.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-6 员工转正信息界面</div>

                    <p>
                        <span style={{color:"#0086C9"}}>【待入职人员】：</span>
                        已经走完面试流程，发送过offer，等待入职报道人员信息。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【离职员工】：</span>
                        会展示企业已经离职员工的基本信息。
                    </p>

                    <h4 id="archives">档案管理</h4>
                    <p>企业所有在职人员及离职人员的档案管理。</p>
                    <div className="img">
                        <img src="/static/images/help/archives.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-7 员工档案管理界面</div>
                    <p>
                        <span style={{color:"#0086C9"}}>【在职人员存档情况】：</span>
                        系统根据目前企业在职人员存档情况自动生成的进度条。并将汇总的数据展示在进度条下方。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【在职人员信息完整率】：</span>
                        系统根据目前企业在职人员档案信息完善程度自动生成的进度条。下方对应会显示每个在职人员的信息情况。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【离职人员存档情况】：</span>
                        系统根据目前企业离职人员存档情况自动生成的进度条。并将汇总的数据展示在进度条下方。下方对应会显示每个离职人员的姓名，认识材料存档，劳动合同，离职证明文件，离职交接表等信息，便于用户对离职员工进行跟踪完善操作。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【排序】：</span>
                        根据自身需求，可将员工列表信息以人事材料存档率升序及降序、人员信息完整度升序及降序，最后更新时间升序及降序进行排序展示。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【下载材料附件】：</span>
                        勾选所需下载材料附件的人员，点击下载材料附件，既可将所需员工材料附件下载存储到本地。
                    </p>

                    <h4 id="organize">组织架构</h4>
                    <p>根据系统内已有的部门人员数据和操作人员手动添加的信息，自动生成该企业的组织架构图，点击下载组织架构可下载该组织架构图存储到本地。</p>
                    <div className="img">
                        <img src="/static/images/help/jiagou.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-8 组织机构界面</div>
                    <p>
                        <span style={{color:"#0086C9"}}>【显示筛选】：</span>
                        包含显示负责人、岗位名称、人员数目、隐藏无人部门等选项，可自主选择组织架构图中显示哪些信息。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【机构管理】：</span>
                        根据已有的数据信息，生成的关于领导层的下拉菜单和图表式的展示数据，也可在数据上面进行添加移动编辑等操作。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【部门管理】：</span>根据已有的数据信息，生成的下拉菜单和图表式的展示数据，也可在数据上面进行添加移动编辑等操作。
                    </p>
                    <div className="img">
                        <img src="/static/images/help/bumenmanage.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-9 部门管理界面</div>

                    <h4 id="condition">全员概览</h4>
                    <p>系统根据目前系统内存储的在职人员信息，智能分析数据生成员工数据饼状图。主要分为：员工性质分布、员工性别分布、员工学历分布、员工年龄分布、与昂工已婚情况、员工已育情况、部门人数TOP5、岗位人数TOP5。通过饼状图，可直观查看到目前公司内人员分布情况。</p>
                    <div className="img">
                        <img src="/static/images/help/all.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图7-10 全员概览界面</div>
                    <a className="arrow-up" onClick={this.arrowUp}>
                        <Icon type="arrow-up" /><br/>
                        回到顶部
                    </a>
                </div>
            </div>
        );
    }
}