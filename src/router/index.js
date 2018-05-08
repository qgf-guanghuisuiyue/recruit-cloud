import {onEnterLoginHook,requireAuthHook,onLeavePage,requireHook} from '../hook';

/**
 * 引入子路由
 */

// 职位管理页面子路由
const JobIndex = {
    path: 'index(/:positionid)',
    breadcrumbName:"职位管理",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/job/index').default)
        }, 'JobIndexPage')
    }
}

// 创建职位页面路由
const NewJob = {
    path: 'newJob',
    breadcrumbName:"新建职位",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/create-job').default)
        }, 'NewJobPage')
    } 
}

// 引入职位管理路由组件
const Job = {
    path: 'job',
    breadcrumbName: '职位管理',
    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                JobIndex,
                NewJob
            ])
        })
    },
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/job').default)
        }, 'JobPage')
    } 
}

// 引入招聘流程路由组件
const Recruit = {
    path: 'recruit(/:stageid)',
    breadcrumbName:"招聘流程", 
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/recruit').default)
        }, 'RecruitPage')
    }
}

// 引入招聘详情页面路由组件
const resumeInfo = {
    path: 'resumeInfo(/:resumeId)(/:logId)', // resumeId:职位id logId:流程id
    // breadcrumbName:"招聘流程", 
    onEnter:requireAuthHook,
    // onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/resume-info').default)
        }, 'ResumeInfoPage')
    }
}

// 引入人才库路由组件
const Talent = {
    path:"talent(/:keywords)",
    breadcrumbName:"人才库",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/talent').default)
        }, 'TalentPage')
    }
}

// 引入任务报表路由组件
const Task = {
    path:"task",
    breadcrumbName:"任务报表",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/task').default)
        }, 'TaskPage')
    }
}

// 引入邮件路由组件
const Email = {
    path:"email",
    breadcrumbName:"邮件管理",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/email').default)
        }, 'EmailPage')
    }
}

//引入登陆路由组件
const Login = {
    path:"login",
    breadcrumbName:"登陆",
    onEnter:onEnterLoginHook,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/login').default)
        }, 'LoginPage') 
    }
}

//引入修改密码路由
const ChangePasswd = {
    path:"changePasswd",
    breadcrumbName:"修改密码",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/change-passwd').default)
        }, 'ChangePasswdPage')
    }
}

// 引入配置邮箱路由
const SettingEmail = {
    path:"settingEmail",
    breadcrumbName:"配置邮箱(候选人管理)",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/setting-email').default)
        }, 'SettingEmailPage')
    } 
}

// 引入404页面路由
const NotFoundPage = {
    path:"*",
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/404').default)
        }, 'NotFoundPage')
    } 
}

//员工管理页面子路由
const ManageClerk = {
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/manager/clerk').default)
        }, 'ClerkPage')
    }
}

//员工详情页面路由
const ClerkDetail = {
    path: 'clerkDetail/:rid',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/manager/clerk/clerk-detail').default)
        }, 'ClerkDetailPage')
    } 
}

//添加员工页面路由
const NewClerkForm = {
    path: 'newClerkForm',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/manager/clerk/new-clerk-form').default)
        }, 'NewClerkForm')
    } 
}

// 引入员工简历页面路由组件
const employeeInfo = {
    path: 'employeeInfo(/:resumeid)(/:rid)', // resumeId:职位id rid
    onEnter:requireAuthHook,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/employee-info').default)
        }, 'EmployeeInfoPage')
    }
}

//档案管理页面子路由
const Crchives = {
    path: 'archives',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/manager/archives').default)
        }, 'ArchivesPage')
    } 
}

//组织架构页面子路由
const Organize = {
    path: 'organize',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/manager/organize').default)
        }, 'OrganizePage')
    } 
}

//全员状况页面子路由
const Condition = {
    path: 'condition',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/manager/condition').default)
        }, 'ConditionPage')
    } 
}

//人事动态页面子路由
const Dynamics = {
    path: 'dynamics',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/manager/dynamics').default)
        }, 'DynamicsPage')
    } 
}

// 引入员工管理页面路由
const ManagerPage = {
    path:"manager",
    breadcrumbName:"员工管理",
    indexRoute:ManageClerk,
    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                ManageClerk,
                ClerkDetail,
                NewClerkForm,
                Crchives,
                Organize,
                Condition,
                Dynamics
            ])
        })
    },
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/manager').default)
        }, 'ManagerPage')
    }
}
//引入使用帮助页面编辑目的子路由
const HelpEditPurpose = {
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/helpEditPurpose').default)
        }, 'HelpEditPurpose')
    }
}
//引入使用帮助页面使用对象子路由
const UseObject = {
    path: 'useObject',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/useObject').default)
        }, 'UseObject')
    } 
}
//引入使用帮助页面登录界面子路由
const LogPage = {
    path: 'logPage',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/logPage').default)
        }, 'LogPage')
    } 
}
//引入使用帮助页面主界面子路由
const MainPage = {
    path: 'mainPage',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/mainPage').default)
        }, 'MainPage')
    } 
}
//引入使用帮助页面职位管理界面子路由
const ResumePage = {
    path: 'resumePage',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/resumePage').default)
        }, 'ResumePage')
    } 
}
//引入使用帮助页面招聘流程界面子路由
const RecrtPage = {
    path: 'RecrtPage',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/recrtPage').default)
        }, 'RecrtPage')
    } 
}
//引入使用帮助页面人才库界面子路由
const TlentPage = {
    path: 'TlentPage',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/tlentPage').default)
        }, 'TlentPage')
    } 
}
//引入使用帮助页面任务报表界面子路由
const TskPage = {
    path: 'TskPage',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/tskPage').default)
        }, 'TskPage')
    } 
}
//引入使用帮助页面员工管理界面子路由
const ManagePage = {
    path: 'ManagePage',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/managePage').default)
        }, 'ManagePage')
    } 
}
//引入使用帮助页面常见问题界面子路由
const Questions = {
    path: 'Questions',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/questions').default)
        }, 'Questions')
    } 
}
//引入使用帮助页面说明界面子路由
const Explain = {
    path: 'Explain',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/help/explain').default)
        }, 'Explain')
    } 
}
// 引入使用帮助页面路由
const HelpPage = {
    path:"help",
    breadcrumbName:"使用帮助",
    indexRoute:HelpEditPurpose,
    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                HelpEditPurpose,
                UseObject,
                LogPage,
                MainPage,
                ResumePage,
                RecrtPage,
                TlentPage,
                TskPage,
                ManagePage,
                Questions,
                Explain
            ])
        })
    },
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/help').default)
        }, 'HelpPage')
    }
}
//引入薪酬报告查询路由
const SalaryQuery = {
    path:"salaryQuery",
    breadcrumbName:"薪酬数据",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/salaryReport').default)
        }, 'SalaryReport')
    }
}

// 引入简历展示页面路由
const ShowResume = {
    path:"showResume",
    breadcrumbName:"简历分享",
    onEnter:requireHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/show-resume').default)
        }, 'ShowResumePage')
    }
}
//分享面试评估表
const Evaluation = {
    path:"evaluation",
    breadcrumbName:"面试评估表",
    onEnter:requireHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/evaluation').default)
        }, 'Evaluation')
    }
}
//简历搜索页面
const QueryResume = {
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/resumeSearch/searchResume').default)
        }, 'QueryResume')
    } 
}
//我的下载页面
const DownloadResume = {
    path: 'downloadResume',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/resumeSearch/downloadResume').default)
        }, 'DownloadResume')
    } 
}
//我的收藏页面
const CollectResume = {
    path: 'collectResume',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/resumeSearch/collectResume').default)
        }, 'CollectResume')
    } 
}
// 简历搜索页面路由
const SearchResumePage = {
    path:"searchResume",
    breadcrumbName:"简历搜索",
    indexRoute:QueryResume,
    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                QueryResume,
                DownloadResume,
                CollectResume
            ])
        })
    },
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/resumeSearch').default)
        }, 'SearchResumePage')
    }
}
//背调案例
const CaseView = {
    path:"caseView",
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/case-view').default)
        }, 'CaseView')
    }
}
//简历详情
const ResumeDetail = {
    path:"resumeDetail",
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/resumeDetail').default)
        }, 'ResumeDetail')
    }
}

/*路由配置*/
const RouteConfig = {
  childRoutes: [ {
    path: '/',
    breadcrumbName:'首页',
    component: require('views/Framework').default,
    indexRoute: {
        onEnter:requireAuthHook,
        onLeave:onLeavePage,
        getComponent(nextState,cb){
            require.ensure([], (require) => {
                cb(null, require('pages/index').default)
            }, 'IndexPage')
        } 
    },
    childRoutes: [
            Job, // 职位
            Recruit, // 招聘
            Talent, // 人才
            Task, // 任务报表
            Login, // 登陆
            ChangePasswd, // 修改密码
            SettingEmail, // 设置邮箱
            resumeInfo, // 简历详情
            Email,
            ManagerPage, // 员工管理
            employeeInfo, //员工简历详情
            HelpPage, //使用帮助
            ShowResume ,//分享简历页面
            Evaluation,//分享面试评估表页面
            SearchResumePage,//简历搜索页面
            CaseView,//背调案例
            ResumeDetail,
            SalaryQuery,
            NotFoundPage// 404
        ]
  } ]
}

module.exports = RouteConfig;