import store from "../store/store";
import router from "../router/router";
import axios from 'axios'
import Vue from 'vue'
import config from "@/routerFilter/config";
import homeApi from "../api/homeApi";

/*互联网和政务外网区分*/
const packageStatus = config.packsgeStatus
Vue.prototype.$packageStatus = packageStatus;

/*
*互联网过滤，进行sso拦截
*
* */
const internetFilter = (to, from, next) => {
    //cssSsoTicket
    if (store.state.ssoStatus.isLogin === 0) {
        axios({
            method: 'post',
            url: homeApi.CcheckSSO
        }).then(function (res) {
            window.console.log(res, '======')
            if (res.info.state == '0') {
                /*if (to.name === "mainPage" || to.name === "search" || to.name === "detail" || to.name === "more") {
                    next()
                } else {
                    window.console.log("========互联网单点登录0000===========")
                    console.log(res.info.url)
                    window.location.href = res.info.url
                }*/
                next(false)
                window.console.log("========互联网单点登录0000===========")
                console.log(res.info.url)
                window.location.href = res.info.url
            } else {
                window.console.log("========互联网单点登录1111===========")
                localStorage.setItem("userName", res.info.userName);
                store.dispatch("ssoStatus/toggleLogin");
                // store.commit('ssoStatus/isLogin');
                next();
            }
        }).catch(function (err) {
            alert("统一用户登录失败，请联系管理员");
            localStorage.setItem("userName", "");
            next(false)
        })
    } else {
        next();
    }
}
/*
* 政务外网，sso拦截，
* 所有页面都需要登录
* */
const outnetFilter = (to, from, next) => {
    if (store.state.ssoStatus.isLogin === 0) {
        axios({
            method: 'post',
            url: homeApi.GcheckSSO,
        }).then(function (res) {
            window.console.log(res)
            if (res.info.state == '0') {
                window.console.log("========政务外网单点登录0000===========")
                next(false);
                // window.location.href = res.info.url
                console.log(res.info.url)
                if(to.name==='approvalDetial'){
                    let uri = "?url="+encodeURI(to.name+"&"+to.fullPath.split('?')[1]);
                    console.log(res.info.url+uri)
                    window.location.href = res.info.url+uri
                }else {
                    window.location.href = res.info.url
                }
            } else {
                window.console.log("=========政务外网单点登录1111===========")
                localStorage.setItem("userName", res.info.userName);
                store.dispatch("ssoStatus/toggleLogin");
                next();
                console.log(store.state.ssoStatus.isLogin)
            }
        }).catch(function (err) {
            alert("统一用户登录失败，请联系管理员");
            localStorage.setItem("userName", "");
            next(false)
        })
    } else {
        window.console.log("========政务外网单点登录2222===========")
        next();
    }
    /*if (store.state.ssoStatus.isLogin === 0){
        new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: '/GLoginCtrl/checkSSO',
            }).then(function (res) {
                resolve(res)
            }).catch(function (err) {
                reject(err)
            })
        }).then(function (res) {
            window.console.log("========单点登录===========")
            window.console.log(res)
            if (res.info.state == '0') {
                next(false);
                console.log(res.info.url)
                window.location.href = res.info.url
            } else {
                window.console.log("========登录成功===========")
                next();
                localStorage.setItem("userName", res.info.userName);
                store.dispatch("ssoStatus/toggleLogin");
                console.log(store.state.ssoStatus.isLogin)
            }
        }).catch(function (err) {
            next(false)
            alert("统一用户登录失败，请联系管理员");
            localStorage.setItem("userName", "");
        })
    }else {
        next()
    }*/

}

router.beforeEach((to, from, next) => {
    window.console.log("-------路由拦截器:from -> to--------");
    window.console.log(from);
    window.console.log(to)
    console.log(packageStatus)
    //hlwzwww
    //outnetFilter(to, from, next)
    /*if(packageStatus==="hlw"){ /!*互联网外网*!/
        internetFilter(to, from, next)
    }else { /!*政务外网*!/
        outnetFilter(to, from, next)
    }*/
    /*let toUrl=window.location.port+'/front-cyfz-web/'+to.name;
    console.log(toUrl);
    next()*/
    next()
})

