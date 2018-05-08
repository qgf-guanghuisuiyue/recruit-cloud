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
            <div className="recruit" >
                <h3 >招聘流程</h3>
                <p>
                在招聘管理界面，用户可以进行筛选简历，查看<a>候选人信息，添加候选人信息</a>及查看<a>招聘流程</a>中各个进度的情况数据。主要显示数据为<a>候选人姓名、职位、部门、工作年限、电话、邮箱、居住地、职位申请时间和候选人</a>简历状态。查看具体的简历信息，直接点击该候选人姓名即可。
                </p>
                <div className="img">
                    <img src="/static/images/help/recruit.png" width="100%" height="100%"/>
                </div>
                <div className="imgtitle">图4-1 招聘流程界面</div>
                

                <p>
                    <span style={{color:"#0086C9"}}>【筛选】：</span>
                    当用户账户内收到较多简历的时候，根据工作年限和学历条件，可筛选出某一批较为符合条件的人才，提高用人单位挑选人才的工作效率。
                </p>
                <p>
                    <span style={{color:"#0086C9"}}>【重置】：</span>
                    点击该按钮，可清空筛选栏中的信息，便于其他条件的查询。
                </p>
                <p>
                    <span style={{color:"#0086C9"}}>【候选人搜索框】：</span>
                    当简历较多，记得候选人的姓名时候，系统可根据输入框输入的姓名智能匹配到该候选人的简历，节约用人单位查找时间。
                </p>
                <p>
                    <span style={{color:"#0086C9"}}>【排序】：</span>
                    根据自己的需求可以点击设置不同的排序方式。
                </p>
                <p>
                    <span style={{color:"#0086C9"}}>【简历上传】：</span>
                    人工上传简历，选择不同的简历来源（智联招聘/51job/51金融圈）选择及对应的推荐职位，上传html/xls等格式的简历，系统会自动分析该简历并储存到人才库。
                </p>
                <div className="img">
                    <img src="/static/images/help/resumeupload.png" width="100%" height="100%"/>
                </div>
                <div className="imgtitle">图4-2 简历上传界面</div>

                <p>
                    <span style={{color:"#0086C9"}}>【简历详情】：</span>
                    点击候选人姓名可查看候选人简历及目前面试流程进展情况。此界面包含了职位下载、打印简历、分享简历到其他社交平台，添加面试评估表等功能。
                </p>
                <p>
                    <span style={{color:"#0086C9"}}>【简历分享】：</span>
                    渠道分为链接分享和二维码分享两种，可根据用户需求进行选择分享到各社交平台。
                </p>
               
                <div className="img">
                    <img src="/static/images/help/share.png" width="100%" height="100%"/>
                </div>
                <div className="imgtitle">图4-3 简历详情渠道分享</div>
                <p>
                    <span style={{color:"#0086C9"}}>【面试评估表】：</span>
                    当候选人的面试流程进入到面试阶段，系统操作员可以点击填写该面试评估表，对该候选人的面试情况进行评判。鉴于可能多人面试候选人，可点击右上角的分享按钮，二维码扫描分享给其他面试官填写。
                </p>
                <div className="img">
                    <img src="/static/images/help/pgu.png" width="100%" height="100%"/>
                </div>
                <div className="imgtitle">图4-4 候选人面试评估表填写及二维码分享</div>
            </div>
            
        );
    }
}