import config from "@/routerFilter/config";
const baseUrl = config.baseUrl
// 先导区信息填报接口
const pilotAreaQuery = baseUrl+ '/PilotAreaCtrl/queryPilotArea';
const pilotAreaSave = baseUrl+ '/PilotAreaCtrl/savePilotArea';
const pilotAreaUpdate = baseUrl+ '/PilotAreaCtrl/updatePilotArea';
const pilotAreaDelete = baseUrl+ '/PilotAreaCtrl/deletePilotAreaByUuid';
const pilotAreaDetail = baseUrl+ '/PilotAreaCtrl/getPilotAreaByUuid';
const pilotAreaQueryAll = baseUrl+ '/PilotAreaCtrl/queryPilotAreaAll';

// 绩效考核接口
const pilotAssessQuery = baseUrl+ '/PilotAssessCtrl/queryPilotAssess';
const pilotAssessSave = baseUrl+ '/PilotAssessCtrl/savePilotAssess';
const pilotAssessUpdate = baseUrl+ '/PilotAssessCtrl/updatePilotAssess';
const pilotAssessDelete = baseUrl+ '/PilotAssessCtrl/deletePilotAssessByUuid';
const pilotAssessDetail = baseUrl+ '/PilotAssessCtrl/getPilotAssessByUuid';

// 通用提交接口
const uniformSubmit = baseUrl+ '/ApprovalCtrl/saveSubmitInfo';

export default {
    // 先导区信息填报
    pilotAreaQuery,
    pilotAreaSave,
    pilotAreaUpdate,
    pilotAreaDelete,
    pilotAreaDetail,
    pilotAreaQueryAll,
    // 绩效考核
    pilotAssessQuery,
    pilotAssessSave,
    pilotAssessUpdate,
    pilotAssessDelete,
    pilotAssessDetail,
    // 统一提交
    uniformSubmit
}
