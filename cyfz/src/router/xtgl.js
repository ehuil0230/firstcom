import tzgg from '@/views/xtgl/menuPage/tzgg'
import jbdw from '@/views/xtgl/menuPage/jbdw'
import qldw from '@/views/xtgl/menuPage/qldw'
import xctj from '@/views/xtgl/menuPage/xctj'
import jbjggs from '@/views/xtgl/menuPage/jbjggs'
import zcwj from '@/views/xtgl/menuPage/zcwj'
import zcjd from '@/views/xtgl/menuPage/zcjd'
import shtjsx from '@/views/xtgl/menuPage/shtjsx'
import uploadPicture from "@/views/xtgl/mainPicture/uploadPicture";
import sprgl from "@/views/xtgl/menuPage/sprgl";
import refreshRedis from "@/views/xtgl/menuPage/refreshRedis";

/*任务中心---by---start*/
import dbList from "../views/xtgl/taskCenter/dbList";
import ybList from "../views/xtgl/taskCenter/ybList";
/*任务中心---by---end*/

export default [
    {
        path: "/tzgg",
        name: "tzgg",
        meta: {
            breadcrumb: "通知公告"
        },
        component: tzgg
    },
    {
        path: "/jbdw",
        name: "jbdw",
        meta: {
            breadcrumb: "英雄榜-揭榜单位"
        },
        component: jbdw
    },
    {
        path: "/qldw",
        name: "qldw",
        meta: {
            breadcrumb: "英雄榜-潜力单位"
        },
        component: qldw
    },
    {
        path: "/xctj",
        name: "xctj",
        meta: {
            breadcrumb: "宣传推荐"
        },
        component: xctj
    },
    {
        path: "/jbjggs",
        name: "jbjggs",
        meta: {
            breadcrumb: "揭榜结果公示"
        },
        component: jbjggs
    },
    {
        path: "/zcwj",
        name: "zcwj",
        meta: {
            breadcrumb: "政策文件"
        },
        component: zcwj
    },
    {
        path: "/zcjd",
        name: "zcjd",
        meta: {
            breadcrumb: "政策解读"
        },
        component: zcjd
    },
    {
        path: "/shtjsx",
        name: "shtjsx",
        meta: {
            breadcrumb: "任务中心"
        },
        component: shtjsx
    },
    {
        path: "/uploadPicture",
        name: "uploadPicture",
        meta: {
            breadcrumb: "轮播图维护"
        },
        component: uploadPicture
    },
    {
        path: "/dbList",
        name: "dbList",
        meta: {
            breadcrumb: "待办任务"
        },
        component: dbList
    },
    {
        path: "/ybList",
        name: "ybList",
        meta: {
            breadcrumb: "已办任务"
        },
        component: ybList
    },
    {
        path: "/sprgl",
        name: "sprgl",
        meta: {
            breadcrumb: "审批人管理"
        },
        component: sprgl
    },
    {
        path: "/refreshRedis",
        name: "refreshRedis",
        meta: {
            breadcrumb: "刷新缓存"
        },
        component: refreshRedis
    },

]
