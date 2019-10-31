import Vue from 'vue'
import Vuex from 'vuex'
import workTab from "./workTab"
import dmb from "./dmb"
import dbPage from "./dbPage"
import changePage from "./changePage";
import ssoStatus from "./ssoStatus";
import codeTable from "./codeTable";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        screenWidth: document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight,
        contentHeight:0
    },
    mutations: {
        contentHeight(state,height){
            state.contentHeight = height
        }
    },
    actions: {
        contentHeight({commit,height}){
            commit("contentHeight",height)
        },
    },
    modules: {
        workTab: workTab,
        dmb: dmb,
        dbPage:dbPage,
        changePage:changePage,
        ssoStatus:ssoStatus,
        codeTable:codeTable
    }
})
