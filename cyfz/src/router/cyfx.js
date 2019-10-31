// 投资信息分析
import tzxxfx from '@/views/cyfx/tzxxfx/tzxxfx'
//知识产权分析
import zscqfx from '@/views/cyfx/zscqfx/zscqfx'
// 标准情况分析
import bzqkfx from '@/views/cyfx/bzqkfx/bzqkfx'
//骨干企业分析
import ggqyfx from '@/views/cyfx/ggqyfx/ggqyfx'
//先导区展示
import xdqzs from '@/views/cyfx/xdqzs/xdqzs'
//全国收益分析
import qgsyfx from "@/views/cyfx/czsyfx/qgsyfx";
//先导区收益分析
import xdqsyfx from "@/views/cyfx/czsyfx/xdqsyfx";
//各省收益分析
import gssyfx from "@/views/cyfx/czsyfx/gssyfx";
//行业分析概览
import hyfxgl from "@/views/cyfx/hyfxgl/hyfxgl";

export default [
    {
        path: "/hyfxgl",
        name: "hyfxgl",
        meta: {
            breadcrumb: "行业分析概览"
        },
        component: hyfxgl
    },{
        path: "/tzxxfx",
        name: "tzxxfx",
        meta: {
            breadcrumb: "投资信息分析"
        },
        component: tzxxfx
    },{
        path: "/zscqfx",
        name: "zscqfx",
        meta: {
            breadcrumb: "知识产权分析"
        },
        component: zscqfx
    },{
        path: "/bzqkfx",
        name: "bzqkfx",
        meta: {
            breadcrumb: "标准情况分析"
        },
        component: bzqkfx
    },{
        path: "/ggqyfx",
        name: "ggqyfx",
        meta: {
            breadcrumb: "骨干企业分析"
        },
        component: ggqyfx
    },{
        path: "/xdqzs",
        name: "xdqzs",
        meta: {
            breadcrumb: "先导区展示"
        },
        component: xdqzs
    },{
        path: "/qgsyfx",
        name: "qgsyfx",
        meta: {
            breadcrumb: "产值收益分析-全国收益分析"
        },
        component: qgsyfx
    },{
        path: "/xdqsyfx",
        name: "xdqsyfx",
        meta: {
            breadcrumb: "产值收益分析-先导区收益分析"
        },
        component: xdqsyfx
    },{
        path: "/gssyfx",
        name: "gssyfx",
        meta: {
            breadcrumb: "产值收益分析-各省收益分析"
        },
        component: gssyfx
    }
]
