import config from "@/routerFilter/config";
const baseUrl = config.baseUrl
//企业信息管理start
//自评表进入调用查询接口
const getComSelfcommentByAnnualId = baseUrl+  '/ComSelfcommentCtrl/getComSelfcommentByAnnualId';
//自评表保存   自评表评分
const saveComSelfcomment  = baseUrl+ '/ComSelfcommentCtrl/saveComSelfcomment';
//查询企业信息列表处是否允许添加
const getCreatedStatus = baseUrl+ '/ComInfoCtrl/getCreatedStatus';
//企业信息单查询接口
const getComInfoByComIdYear = baseUrl+ '/ComInfoCtrl/getComInfoByComIdYear';
//企业信息添加
const saveComInfo = baseUrl+ '/ComInfoCtrl/saveComInfo';
//企业财务添加
const saveComFinance = baseUrl+ '/ComFinanceCtrl/saveComFinance';
//企业财务查询
const getComFinanceByAnnualId = baseUrl+ '/ComFinanceCtrl/getComFinanceByAnnualId';
//添加产品
const saveClaimProduct = baseUrl+ "/ClaimProductCtrl/saveClaimProduct";
//提交
const changeComStatus = baseUrl+ '/ComAnnualCtrl/changeComStatus';
//获取点击状态
const getComInfoState = baseUrl+ '/ComAnnualCtrl/getComInfoState';
//查询重点方向
const queryTableFromRedisByTableName = baseUrl+ '/ZhRedisCtrl/queryTableFromRedisByTableName';
//查询 下拉选父节点查询子列表
const querySubSelcetListByTableNameAndParentCode = baseUrl+ '/ZhRedisCtrl/querySubSelcetListByTableNameAndParentCode';
//提审核
const saveSubmitInfo = baseUrl+ '/ApprovalCtrl/saveSubmitInfo';
//查询月报列表
const queryComMonthly = baseUrl+ '/ComMonthlyCtrl/queryComMonthly';
//查询产品列表
const queryClaimProduct = baseUrl+ '/ClaimProductCtrl/queryClaimProduct';
//删除产品
const deleteClaimProductByUuid = baseUrl+ '/ClaimProductCtrl/deleteClaimProductByUuid';
//保存月报
const saveComMonthly = baseUrl+ '/ComMonthlyCtrl/saveComMonthly';
//查询年报列表
const queryComInfo = baseUrl+ '/ComInfoCtrl/queryComInfo';
//初始化查询企业名称
const getComName = baseUrl+ '/ComInfoCtrl/getComName';
//判断年报年份是否可以使用
const getComInfoYearStatus = baseUrl+ '/ComInfoCtrl/getComInfoYearStatus';
//判断月报年份是否可以使用
const getComMonthlyYMStatus = baseUrl+ '/ComMonthlyCtrl/getComMonthlyYMStatus';
//企业信息管理end


//人才队伍建设情况查询接口
const getComTeamByComid = baseUrl+ '/ ComTeamCtrl / getComTeamByComid';
//地图
const queryComSelfCommentNumGroupByProvByYear = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryMapNodeDataGroupByProvByYear';
//工作指令管理
const queryMySendMail = baseUrl+ '/MailCtrl/queryMySendMail'
const querySendMeMail = baseUrl+ '/MailCtrl/querySendMeMail'
const saveMail = baseUrl+ '/MailCtrl/saveMail'
const getMySendMailByUuid =  baseUrl+ '/MailCtrl/getMySendMailByUuid'
const getSendMeMailByUuid =  baseUrl+ '/MailCtrl/getSendMeMailByUuid'
const updateReadStateByUuid =  baseUrl+ '/MailCtrl/updateReadStateByUuid'

//行业组织管理
const deleteIndustryOrgByUuid =  baseUrl+ '/IndustryOrgCtrl/deleteIndustryOrgByUuid'
const saveIndustryOrg =  baseUrl+ '/IndustryOrgCtrl/saveIndustryOrg'
const queryIndustryOrg =  baseUrl+ '/IndustryOrgCtrl/queryIndustryOrg'


//人才队伍建设情况
const queryComTeam =  baseUrl+ '/ComTeamCtrl/queryComTeam'
const saveComTeam =  baseUrl+ '/ComTeamCtrl/saveComTeam'
const delComTeam = baseUrl + '/ComTeamCtrl/deleteComTeamByUuid'
//人工智能研发机构建设
const queryResearchOrg =  baseUrl+  '/ResearchOrgCtrl/queryResearchOrg'
const saveReasearchOrg =  baseUrl+ '/ResearchOrgCtrl/saveReasearchOrg'
const deleteResearchOrgByUuid = baseUrl+ '/ResearchOrgCtrl/deleteResearchOrgByUuid'
//培训组织及管理
const saveComTrainorg=  baseUrl+ '/ComTrainorgCtrl/saveComTrainorg'
const queryComTrainorg =  baseUrl+  '/ComTrainorgCtrl/queryComTrainorg'
const deleteComTrainorgByUuid =  baseUrl+  '/ComTrainorgCtrl/deleteComTrainorgByUuid'

export default {
    //行业组织管理
    deleteIndustryOrgByUuid,
    saveIndustryOrg,
    queryIndustryOrg,
    //企业信息管理start
    getComSelfcommentByAnnualId,
    saveComSelfcomment,
    getCreatedStatus,
    getComInfoByComIdYear,
    saveComInfo,
    saveComFinance,
    getComFinanceByAnnualId,
    saveClaimProduct,
    changeComStatus,
    getComInfoState,
    queryTableFromRedisByTableName,
    querySubSelcetListByTableNameAndParentCode,
    saveSubmitInfo,
    queryComMonthly,
    queryClaimProduct,
    deleteClaimProductByUuid,
    saveComMonthly,
    queryComInfo,
    getComName,
    getComInfoYearStatus,
    getComMonthlyYMStatus,
    //企业信息管理end

    //工作指令管理
    //已发工作指令
    queryMySendMail,
    //已收工作指令
    querySendMeMail,
    //新转增工作指令
    saveMail,
    //已发工作指令查看
    getMySendMailByUuid,
    //已收工作指令查看
    getSendMeMailByUuid,
    //修改已收指令查看状态
    updateReadStateByUuid,


    //人才队伍建设情况
    queryComTeam,
    saveComTeam,
    delComTeam,
    //人工智能研发机构建设
    queryResearchOrg,
    saveReasearchOrg,
    deleteResearchOrgByUuid,
    //培训组织及管理
    saveComTrainorg,
    queryComTrainorg,
    deleteComTrainorgByUuid,

    getComTeamByComid,
    queryComSelfCommentNumGroupByProvByYear,
}
