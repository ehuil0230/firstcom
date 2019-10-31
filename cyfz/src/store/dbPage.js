export default {
    namespaced: true,
    state: {
        isDouble:true,
        isCollapse:false,
    },
    mutations: {
        toggleDb:function (state) {
            state.isDouble=!state.isDouble
            state.isCollapse=state.isDouble
        },
        toggleCollapse:function(state){
            state.isCollapse=!state.isCollapse
        },
        setDb:function (state,dspDm) {
            if(dspDm==='M'){
                state.isDouble=true;
                state.isCollapse=true;
            }else {
                state.isDouble=false;
            }
        }
    },
    actions: {

    }
}
