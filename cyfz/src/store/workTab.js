export default {
    namespaced: true,
    state: {
        list: [
            // {
            //     name: "mainPage",
            //     path: "/",
            //     tabname:"主页",
            //     component:MainPage
            // }
        ],
        current: {
            // name: "MainPage",
            // path: "/",
            // tabname:"主页",
            // component:MainPage
        },
        tabCount: 0
    },
    mutations: {
        worktabRemove(state, p) {
            // 关闭标签
            let ind = state.list.findIndex(s => s.name === p)
            if (ind > -1) {
                state.list.splice(ind, 1)
                state.tabCount--;
            }
        },
        worktabRoute(state, p) {
            let ind = state.list.findIndex(s => s.name === p.to.name)
            if (ind > -1) {
                // 标签已存在
                state.list.splice(ind, 1, p.to)
                state.current = state.list[ind]
            } else {
                // 标签不存在，现在新建
                state.list.push(p.to)
                state.current = p.to
                state.tabCount++;
                //记录当前功能
                ind = state.list.findIndex(s => s.name === p.to.name)
            }
            state.current.index = ind
        },

        updeteTabname(state,newName){
            state.current.tabname=newName;
        },
    },
    actions: {
        worktabRemove({commit}, p) {
            commit("worktabRemove", p)
        },
        worktabRoute({commit}, p) {
            commit("worktabRoute", p)
        }
    }
}
