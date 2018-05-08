import React, {Component,PropTypes} from 'react';

import {Button , Menu} from 'antd';
const SubMenu = Menu.SubMenu;

import ScrollPageContent from 'components/scroll-page-content';
import LeftNavComponent from 'components/help/left-menu';

export default class NotFoundPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    render() {
        return (
           
            <div className="resume" style={{overflow:"auto",margin:30,height:760}}>
                    <h3>职位管理</h3>
                    <p>
                        在职位管理界面，用户可以创建新的职位，与此同时能查看到自己所创建的所有项目及项目完成情况，便于对自己的工作计划及时作出最佳调整。职位分类中包含了一个项目完成的全部流程，系统会自动识别项目的进展情况匹配到各个分组，便于用户查看。
                    </p>
                    <div className="img">
                        <img src="/static/images/help/remanage.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图3-1 职位管理界面</div>
                    

                    <p>
                        <span style={{color:"#0086C9"}}>【职位筛选】：</span>
                        当用户创建的项目过多时，根据职位、部门、开始时间和结束时间条件，可筛选出自己想要查看的某个项目的进展情况。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【清空条件】：</span>
                        点击该按钮，可清空筛选栏中的信息，便于查询其他信息。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【修改职位信息】：</span>
                        在职位管理中查看到的职位详情是处于“只读模式”的。根据项目完成情况，若想对某个项目的需求进行设置，则勾选某个职位，点击修改职位信息，可对该项目信息进行编辑修改。
                    </p>
                    <div className="img">
                        <img src="/static/images/help/reshaixuan.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图3-2 职位管理筛选和创建职位</div>

                    <p>
                        <span style={{color:"#0086C9"}}>【新建职位】：</span>
                        如有新的项目进行，可以点击该按钮，会弹出职位创建的界面，在该界面可以进行项目创建发布。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【最近发布职位】：</span>
                        展示的是最近创建修改过的职位名称，最多预储存创建新职位时候，如有之前发过类似的职位信息，可以直接点击该职位名称进行重复使用。如个别职位基本不用，可以点击职位名称后的删除图标，直接删除该图标。其他职位数据会自动替补上去。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【热招职位】：</span>
                        根据大数据，和行业数据，自动分析出行业内最近热招职位，并形成职位模板，如有需要，直接点击，会自动套用在创建职位信息内。
                    </p>
                    <p><span style={{color:"#0086C9"}}>【开始时间】：</span>项目开始进行的时间。</p>
                    <p><span style={{color:"#0086C9"}}>【结束时间】：</span>项目开始进行的时间。</p>
                    <p>
                        <span style={{color:"#0086C9"}}>【是否紧急】：</span>
                        如果是比较紧急需要完成的项目，可以勾选紧急，那么在职位管理界面，职位信息会被自动标记小红旗，便于查看操作该职
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【智能筛选投递该职位的简历】：</span>
                        通过工作年限、学历、年限等智能筛选投递到该职位的简历，匹配度低的简历自动转入到人才库被过滤的人才分类。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【发布】：</span>
                        创建了项目的职位信息后面，点击发布，会自动进入到职位管理界面。
                    </p>
                    <p>
                        <span style={{color:"#0086C9"}}>【重置】：</span>
                        如果新建职位的信息区域已经填写内容，但是想重新编写，点击重置可在不跳转界面的情况下清空表内数据。
                    </p>
                    <div className="img">
                        <img src="/static/images/help/create.png" width="100%" height="100%"/>
                    </div>
                    <div className="imgtitle">图3-3新建职位界面功能介绍</div>
            </div>
            
        );
    }
}