import config from "@/routerFilter/config";
const baseUrl = config.baseUrl
//通知公告
const xtglTzggQuery = baseUrl+ '/ProclamationCtrl/queryProclamation';  //查询
const xtglTzggSubmit = baseUrl+ '/ApprovalCtrl/saveSubmitInfo';  //提交
const xtglTzggSave = baseUrl+ '/ProclamationCtrl/saveProclamation';  //保存
const xtglTzggUpdate = baseUrl+ '/ProclamationCtrl/updateProclamation';  //修改
const xtglTzggDelete = baseUrl+ '/ProclamationCtrl/deleteProclamationByUuid'; //删除
//宣传推荐
const xtglXctjDelete = baseUrl+ '/AnnounceRecommendCtrl/deleteAnnounceRecommendByUuid';  //删除
const xtglXctjSave = baseUrl+ '/AnnounceRecommendCtrl/saveAnnounceRecommend';  //保存
const xtglXctjQuery = baseUrl+ '/AnnounceRecommendCtrl/queryAnnounceRecommend';  //查询
const xtglXctjUpdate = baseUrl+ '/AnnounceRecommendCtrl/updateAnnounceRecommend';  //修改
const xtglXctjQueryTable = baseUrl+ '/ZhRedisCtrl/queryTableFromRedisByTableName' //查询宣传推荐所属方向
const xtglXctjSubmit = baseUrl+ '/ApprovalCtrl/saveSubmitInfo'  //提交
//获取组织列表
const xtglGetOrgList = baseUrl+ '/SsoServerCtrl/getAllOrgList'  //筛选过滤页获取部门列表

/*任务中心*/
const queryApproval = baseUrl+ '/ApprovalCtrl/queryApproval'
const approvalPass = baseUrl+ '/ApprovalCtrl/approvalPass'
const approvalFail = baseUrl+ '/ApprovalCtrl/approvalFail'
const getApprovalStep = baseUrl+ "/ApprovalCtrl/getApprovalStep"
const getApprovalInfo = baseUrl+ '/ApprovalCtrl/getApprovalInfo'
/*审批人管理*/
const queryApproveUser = baseUrl+'/ApproveUserCtrl/queryApproveUser'
const updateApproveUser = baseUrl+'/ApproveUserCtrl/updateApproveUser'
/*刷新redis缓存*/
const queryRedisTable = baseUrl+ '/ZhRedisCtrl/queryTable'
const refreshRedis = baseUrl+ '/ZhRedisCtrl/refreshRedis'

export default {
    //通知公告
    xtglTzggQuery,
    xtglTzggSave,
    xtglTzggUpdate,
    xtglTzggDelete,
    xtglTzggSubmit,

    //宣传推荐
    xtglXctjQuery,
    xtglXctjSave,
    xtglXctjUpdate,
    xtglXctjDelete,
    xtglXctjQueryTable,
    xtglXctjSubmit,
    //获取组织列表
    xtglGetOrgList,

    queryApproval,
    approvalPass,
    approvalFail,
    getApprovalStep,
    getApprovalInfo,

    queryApproveUser,
    updateApproveUser,

    //刷新redis缓存
    queryRedisTable,
    refreshRedis,
}
