import Instructions from '@/views/hygl/gzzlgl/Instructions'
import sendInstructions from '@/views/hygl/gzzlgl/sendInstructions'

import rcdwjsqk from '@/views/hygl/rcjpxgl/rcdwjsqk'
import rgznyfjgjs from '@/views/hygl/rcjpxgl/rgznyfjgjs'
import pxzzjgl from '@/views/hygl/rcjpxgl/pxzzjgl'
import MonthlyReportList from '@/views/hygl/informationManagement/MonthlyReportList'
import InformationReporting from '@/views/hygl/informationManagement/InformationReporting'
import SelfEvaluationTable from '@/views/hygl/informationManagement/SelfEvaluationTable'
import IndustryOrganization from '@/views/hygl/IndustryOrganizationManagement/IndustryOrganization'
import AlreadyDone from '@/views/hygl/Task/AlreadyDone'
import CommissionTask from '@/views/hygl/Task/CommissionTask'
//全国产业信息监测
import qgcyxxjc from "@/views/hygl/qgcyxxjc/qgcyxxjc"

export default [
    {
        path: "/qgcyxxjc",
        name: "qgcyxxjc",
        meta: {
            breadcrumb: "全国产业信息监测"
        },
        component: qgcyxxjc
    },
    {
        path: "/Instructions",
        name: "Instructions",
        meta: {
            breadcrumb: "工作指令管理-已收指令"
        },
        component: Instructions
    },
    {
        path: "/sendInstructions",
        name: "sendInstructions",
        meta: {
            breadcrumb: "工作指令管理-已发指令"
        },
        component: sendInstructions
    },
    {
        path: "/rcdwjsqk",
        name: "rcdwjsqk",
        meta: {
            breadcrumb: "人才及培训管理-人才队伍建设"
        },
        component: rcdwjsqk
    },
    {
        path: "/rgznyfjgjs",
        name: "rgznyfjgjs",
        meta: {
            breadcrumb: "人才及培训管理-人工智能研发机构建设"
        },
        component: rgznyfjgjs
    },
    {
        path: "/pxzzjgl",
        name: "pxzzjgl",
        meta: {
            breadcrumb: "人才及培训管理-培训组织及管理"
        },
        component: pxzzjgl
    },
    {
        path: "/MonthlyReportList",
        name: "MonthlyReportList",
        meta: {
            breadcrumb: "企业信息管理-月报"
        },
        component: MonthlyReportList
    },
    {
        path: "/InformationReporting",
        name: "InformationReporting",
        meta: {
            breadcrumb: "企业信息管理-信息填报"
        },
        component: InformationReporting
    },
    {
        path: "/IndustryOrganization",
        name: "IndustryOrganization",
        meta: {
            breadcrumb: "行业组织管理"
        },
        component: IndustryOrganization
    },
    {
        path: "/SelfEvaluationTable",
        name: "SelfEvaluationTable",
        meta: {
            breadcrumb: "企业信息管理-自评表"
        },
        component: SelfEvaluationTable
    },
    {
        path: "/AlreadyDone",
        name: "AlreadyDone",
        meta: {
            breadcrumb: "已办任务"
        },
        component: AlreadyDone
    },
    {
        path: "/CommissionTask",
        name: "CommissionTask",
        meta: {
            breadcrumb: "代办任务"
        },
        component: CommissionTask
    },
]
