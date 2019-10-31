import Vue from 'vue'
import Router from 'vue-router'
import index from "../views/index"
import login from "../views/login"
import mainPage from "../views/mainPage"
import contentPage from "../views/contentPage";
import demo from "./demo";
import cyfx from "./cyfx";
import hygl from "./hygl";
import xdqgl from "./xdqgl";
import xtgl from "./xtgl";
import mainp from "./mainPage"

Vue.use(Router)

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    base: "/front-cyfz-web",
    routes: [
        {
            path: '/',
            redirect:'/mainPage',
            name: 'index',
            component: index,
            children: [
                {
                    path: '/mainPage',
                    name: 'mainPage',
                    component: mainPage,
                },
                {
                    path: '/contentPage',
                    name: 'contentPage',
                    component: contentPage,
                    children:[].concat(cyfx).concat(hygl).concat(xdqgl).concat(xtgl).concat(demo)
                },
                {
                    path:'/approvalDetial',
                    name:'approvalDetial',
                    component:()=>import('@/views/mainPage/approvalDetial')
                },
                {
                    path:'/detail',
                    name:'detail',
                    component:()=>import('@/views/mainPage/detailPage')
                },
                {
                    path:'/xdqDetail',
                    name:'xdqDetail',
                    component:()=>import('@/views/mainPage/xdqDetailPage')
                },
                {
                    path:'/jxkhDetail',
                    name:'jxkhDetail',
                    component:()=>import('@/views/mainPage/jxkhDetailPage')
                },
                {
                    path:'/xctjDetail',
                    name:'xctjDetail',
                    component:()=>import('@/views/mainPage/xctjDetailPage')
                },
                {
                    path:'/more',
                    name:'more',
                    component:()=>import('@/views/mainPage/morePage')
                },
                {
                    path:'/xxtbDetail',
                    name:'xxtbDetail',
                    component:()=>import('@/views/mainPage/xxtbDetail')
                },
                {
                    path:'/ybDetail',
                    name:'ybDetail',
                    component:()=>import('@/views/mainPage/ybDetail')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login,
        },

    ].concat(mainp)
})
