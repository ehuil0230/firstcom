import config from "@/routerFilter/config";
const baseUrl = config.baseUrl
//产值收益分析
const queryIndustryProfitResult = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryIndustryProfitResult';
//产值收益分析按年显示
const queryStandardConditionGroupByYear = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryStandardConditionGroupByYear';
//产值收益分析按地区显示，传参为年
const queryStandardConditionGroupByProByYear = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryStandardConditionGroupByProByYear';
//知识产权分析按年显示
const queryIntellectualPropertyGroupByYear = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryIntellectualPropertyGroupByYear';
//知识产权分析按地区显示，传参为年
const queryIntellectualPropertyGroupByProByYear = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryIntellectualPropertyGroupByProByYear';
//投资信息分析按年显示
const queryInvestmentInfoALL = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryInvestmentInfoALL';
//骨干企业分析
const queryBackboneEnterpriseInfoALL = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryBackboneEnterpriseInfoALL';
//先导区展示
const queryPilotAreaInfoALL = baseUrl+ '/CyfzIndustryAndAnalyzCtrl/queryPilotAreaInfoALL';

export default {
    queryIndustryProfitResult,
    queryStandardConditionGroupByYear,
    queryStandardConditionGroupByProByYear,
    queryIntellectualPropertyGroupByYear,
    queryIntellectualPropertyGroupByProByYear,
    queryInvestmentInfoALL,
    queryBackboneEnterpriseInfoALL,
    queryPilotAreaInfoALL
}
