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
            <div className="talent">
                <h3 style={{marginBottom:20}}>人才库</h3>
                <p 
                    style={{ textIndent:"2em",marginBottom:20}}
                >
                在招聘管理界面，用户可以进行筛选简历，查看候选人信息，导入人才信息及自定义标签给各类人才进行分组管理。该界面主要显示数据为<a>候选人姓名、性别、居住地、出生日期、学历、工作年下、期待职位、简历创建日期</a>。查看具体的简历信息，直接点击该候选人姓名即可。如觉得候选人简历比较符合已创建的某个职位需求，可进行推荐操作和收藏操作。
                </p>
                <div className="img">
                    <img src="/static/images/help/talent.png" width="100%" height="100%"/>
                </div>
                <div className="imgtitle">图5-1 人才库界面</div>

                <p>
                    <span style={{color:"#0086C9"}}>【筛选】：</span>
                    当用户账户内存有较多简历的时候，根据工作年限和学历要求、行业、职位、目前工作状态、性别，可筛选出某一批较为符合条件的人才，提高用人单位挑选人才的工作效率。
                </p>
                <p>
                    <span style={{color:"#0086C9"}}>【重置】：</span>
                    点击该按钮，可清空筛选栏中的信息，便于输入其他查询条件。
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
                    <span style={{color:"#0086C9"}}>【移动】：</span>
                    勾选人才，点击该按钮可跳出弹出框，选择自定义的分组标签，确定，即可将该候选人移动到对应标签组内。（注：可批量移动候选人所在编组，但只能将候选人简历移动到自定义标签组内，不能移动到预设编组内。）
                </p>
                <div className="img">
                    <img src="/static/images/help/move.png" width="100%" height="100%"/>
                </div>
                <div className="imgtitle">图5-2 人才库候选人简历分组变更</div>

                <p>
                    <span style={{color:"#0086C9"}}>【导入人才】：</span>
                    人工上传简历，选择不同的简历来源（智联招聘/51job/51金融圈/通用），选择上传html/xls等格式的简历，系统会自动分析该简历数据并存储到人才库。
                </p>
            
                <div className="img">
                    <img src="/static/images/help/resumupload.png" width="100%" height="100%"/>
                </div>
                <div className="imgtitle">图5-3 简历上传界面</div>
                <p>
                    <span style={{color:"#0086C9"}}>【推荐】：</span>
                    对某个候选人简历进行推荐操作，会弹出候选人的简历详情，可选择已创建的项目进行推荐，该简历会自动投递到所推荐项目的招聘流程中。已推荐的项目会自动显示为已申请的状态。
                </p>
                <div className="img">
                    <img src="/static/images/help/tuijian.png" width="100%" height="100%"/>
                </div>
                <div className="imgtitle">图5-4 人才库简历推荐</div>
            </div>
            
        );
    }
}