import xdqxxtb from '@/views/xdqgl/xdqxxtb'
import zchz from '@/views/xdqgl/zchz'
import cgfb from '@/views/xdqgl/cgfb2'
import jxkh from "@/views/xdqgl/jxkh";
export default [
    {
        path: "/xdqxxtb",
        name: "xdqxxtb",
        meta: {
            breadcrumb: "先导区信息填报"
        },
        component: xdqxxtb
    },
    {
        path: "/zchz",
        name: "zchz",
        meta: {
            breadcrumb: "政策汇总"
        },
        component: zchz
    },
    {
        path: "/cgfb",
        name: "cgfb",
        meta: {
            breadcrumb: "成果发布"
        },
        component: cgfb
    },
    {
        path: "/jxkh",
        name: "jxkh",
        meta: {
            breadcrumb: "绩效考核"
        },
        component: jxkh
    },
]
