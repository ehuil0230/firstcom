import config from "@/routerFilter/config";
const baseUrl = config.baseUrl
/*chechSSo*/
const GcheckSSO = baseUrl+ '/GLoginCtrl/checkSSO'
const CcheckSSO = baseUrl+ '/CLoginCtrl/checkSSO'
/*checkSSo*/
const queryFrontPageList = baseUrl+ '/FrontPageCtrl/queryFrontPageList';
const getDetailInfoByUuid = baseUrl+ '/FrontPageCtrl/getDetailInfoByUuid'
const queryMore = baseUrl+ '/FrontPageCtrl/queryMore'
const queryByTitle = baseUrl+ '/FrontPageCtrl/queryByTitle'
const queryPilotMenu = baseUrl+ '/FrontPageCtrl/queryPilotMenu'
const cquerySystemTree = "cyfz-center/rest"+ '/CLoginCtrl/querySystemTree'
const gquerySystemTree = baseUrl+ '/GLoginCtrl/querySystemTree'
const refreshRedis = baseUrl+ '/ZhRedisCtrl/refreshRedis'
const getLoginUserList = baseUrl+ '/SsoServerCtrl/getLoginUserList'
const setComid = baseUrl+ '/ComAnnualCtrl/setComid'
const getListAllOrgTree = baseUrl+ '/SsoServerCtrl/getListAllOrgTree'
const queryUsersByOrgId = baseUrl+ '/SsoServerCtrl/getUserPageByOrgId'  ///SsoServerCtrl/queryUsersByOrgId（无分页查询）
const getPostListByOrgId = baseUrl+ '/SsoServerCtrl/getPostListByOrgId'

/**月报和年报详情---by */
const getComMonthlyApprovalInfo = baseUrl+ '/ComMonthlyCtrl/getComMonthlyApprovalInfo'
const getComAnnualApprovalInfo = baseUrl+ '/ComInfoCtrl/getComAnnualApprovalInfo'


export default {
    GcheckSSO,
    CcheckSSO,

    queryFrontPageList,
    getDetailInfoByUuid,
    queryMore,
    queryByTitle,
    cquerySystemTree,
    gquerySystemTree,
    refreshRedis,
    getLoginUserList,
    getListAllOrgTree,
    queryUsersByOrgId,
    getPostListByOrgId,
    queryPilotMenu,
    setComid,
    getComMonthlyApprovalInfo,
    getComAnnualApprovalInfo,
}
