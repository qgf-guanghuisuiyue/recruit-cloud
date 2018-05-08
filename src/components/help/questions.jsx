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
            <div className="questions" >
                <h3>常见问题</h3>
                <div style={{width:890,marginLeft:20}}>
                    <h4>问：51招聘云企业账号是否支持多人登录？</h4>
                    <p>答：51招聘云针对每个合作企业都会开通一个主账号，同时，每个主账号下面可以创建多个子账号，用于企业内部工作人员进行使用。主账号可以看到各子账号工作进度情况，但是子账号只能看到自己的日常工作情况。</p>
                    
                    <h4>问：51招聘云内能够直接给用户发送邮件吗？</h4>
                    <p>答：可以的。个人信息中绑定好个人邮箱，通过51招聘云平台，直接对候选人发送邮件就可以了。</p>
                    
                    <h4>问：在其他平台上发布了职位，收到的候选人简历如何同步到51招聘云平台内？</h4>
                    <p>答：在类似与智联、前程无忧等招聘平台发布职位需求后，邮件进入到您的邮箱账户内，招聘云平台会对收到的简历进行智能分析匹配，根据邮件名称分别投入到招聘云不同的职位需求内。同时，如果您在招聘云内部勾选了智能筛选功能，招聘云在进行分类匹配需求的同事，也会智能帮您筛选出一部分不太符合的简历转存到被过滤的人才分类中。您可以根据需求进行查看。</p>
                    
                    <h4>问：招聘云内的背景调查真实吗？</h4>
                    <p>答：51招聘云背景调查功能，数据源自于公安局，学信网、最高人民法院等权威机构，依托强大的数据库资源，真实性可以放心。但是不排除个别人员在机构内信息未及时更新导致的错误，调查结果，供企业参考。</p>
                    
                    <h4>问：如何修改密码？</h4>
                    <p>答：51招聘云工作界面—右上角—修改密码。</p>
                    
                    <h4>问：简历收件邮箱和平台内发送邮件的邮箱必须是一样的吗？</h4>
                    <p>答：可以不一样。在账户设置中，可以分别配置简历邮箱和发件邮箱。</p>
                    
                    <h4>问：自己账号内的候选人信息其他人可以看到吗？</h4>
                    <p>答：无法看到。如果需要其他人看到，可通过简历二维码分享或链接分享渠道分享到其他人。</p>
                </div>     
            </div>
        );
    }
}