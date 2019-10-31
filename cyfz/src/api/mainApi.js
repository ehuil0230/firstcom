import Vue from 'vue'
import login from './login'
import upload from "./upload/upload";
import xtglApi from "./xtglApi"
import hyglApi from "./hyglApi";
import cyfxApi from "./cyfxApi";
import xdqglApi from "./xdqglApi";
import homeApi from "./homeApi"

// 请求字典码表
import config from "@/routerFilter/config";
const baseUrl = config.baseUrl
const getCodeData = baseUrl+ '/ZhRedisCtrl/queryTableFromRedisByTableName'

const api ={
    login,
    homeApi,
    upload,
    xtglApi,
    hyglApi,
    cyfxApi,
    xdqglApi,
    getCodeData
}
export default api
Vue.prototype.$api = api
