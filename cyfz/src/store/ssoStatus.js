export default {
    namespaced: true,
    state: {
        isLogin:0,
    },
    mutations: {
        toggleLogin:function (state) {
            state.isLogin=1
        },
    },
    actions: {
        toggleLogin({commit}, p) {
            commit("toggleLogin", p)
        },

    }
}
