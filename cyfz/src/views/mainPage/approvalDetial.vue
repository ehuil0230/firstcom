<template>
    <div></div>
</template>

<script>
    export default {
        name: "approvalDetial",
        data(){
            return{}
        },
        created() {
            let that = this;
            let params = that.$route.query
            console.log(params)
            this.$$request({
                url:that.$api.xtglApi.getApprovalInfo,
                data:params
            }).then((res)=>{
                if(res.result==1&&res.info.url){
                    console.log(res.info.url);
                    window.location.href=res.info.url;
                }else {
                    that.$router.push({
                        name:'mainPage',
                    })
                }
            }).catch(function (err) {
                that.$router.push({
                    name:'mainPage',
                })
            })
        }
    }
</script>

<style scoped>

</style>
