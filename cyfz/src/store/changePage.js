export default {
    namespaced: true,
    state: {
        pageType:'sy',
    },
    mutations: {
        togglePageType:function(state,data){
            state.pageType=data.type
        },
    },
    actions: {
        togglePage:function ({commit},p) {
            commit("togglePageType", p)
        }
    }
}
