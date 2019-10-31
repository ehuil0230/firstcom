import list from '@/views/demo/list/list'
import wps from '@/views/demo/wps/wpsLinux'
import TableForm from '@/views/demo/wps/TableForm'
import Timeline from '@/views/demo/Timeline/Timeline'
// import upload from '@/views/demo/upload/uploadDemo'
import upload from '@/components/upload/uploadDemo'
import copperPage from '@/views/demo/copper/copperPage'
import editor from '@/views/demo/editor/editor'
import toolBarPage from '@/views/demo/toolBar/toolbarPage'
import showMockData from '@/views/demo/mockExample/show'
import cyUploadDemo from "../views/xtgl/mainPicture/cyUploadDemo";

export default [
    {
        path: "/list",
        name: "list",
        meta: {
            tabname: "list样例"
        },
        component: list
    },
    {
        path: "/wps",
        name: "wps",
        meta: {
            tabname: "wps样例"
        },
        component: wps
    },
    {
        path: "/TableForm",
        name: "TableForm",
        meta: {
            tabname: "TableForm样例"
        },
        component: TableForm
    },
    {
        path: "/Timeline",
        name: "Timeline",
        meta: {
            tabname: "Timeline样例"
        },
        component: Timeline
    },
    {
        path: "/upload",
        name: "upload",
        meta: {
            tabname: "upload样例"
        },
        component: upload
    },{
        path: "/copperPage",
        name: "copperPage",
        meta: {
            tabname: "copperPage样例"
        },
        component: copperPage
    },{
        path: "/editor",
        name: "editor",
        meta: {
            tabname: "editor样例"
        },
        component: editor
    },{
        path: "/toolBarPage",
        name: "toolBarPage",
        meta: {
            tabname: "toolBar样例"
        },
        component: toolBarPage
    },
    {
        path: '/show/:moduleName',
        name: 'show',
        meta:{
            tabname: "Mock数据"
        },
        component: showMockData
    },{
        path: '/cyUploadDemo',
        name: 'cyUploadDemo',
        meta:{
            breadcrumb: "上传下载"
        },
        component: cyUploadDemo
    },{
        path: '/cyUpImageDemo',
        name: 'cyUpImageDemo',
        meta:{
            breadcrumb: "上传下载"
        },
        component: ()=>import('@/views/xtgl/mainPicture/cyUpImageDemo')
    }
]
