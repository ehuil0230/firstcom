<template>
    <div class="app-step">
        <div class="step-left">
            <p>审批流程：</p>
        </div>
        <div class="step-right">
            <el-timeline :reverse="true" v-if="stepList.length>4">
                <el-timeline-item
                        v-for="(stepItem, index) in stepList"
                        :key="index"
                        :timestamp="stepItem.completeTime">
                    审批人：{{stepItem.qualfiedNames}}
                </el-timeline-item>
            </el-timeline>

            <el-steps v-else :active="stepList.length-1" align-center finish-status="success">
                <el-step  v-for="(stepItem, index) in stepList" :key="index"
                          :title="'审批人：'+stepItem.qualfiedNames" :description="stepItem.completeTime">
                </el-step>
            </el-steps>

            <!-- <el-steps :active="2" finish-status="success" simple style="margin-top: 20px">
                 <el-step title="步骤 1"></el-step>
                 <el-step title="步骤 2"></el-step>
                 <el-step title="步骤 3"></el-step>
                 <el-step title="步骤 4"></el-step>
                 <el-step title="步骤 5"></el-step>
             </el-steps>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "approvalStep",
        props:{
            apprData:{
               type:Object,
            }
        },
        data() {
            return {
                stepList:[],
               /* activities: [{
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                }],*/
            }
        },
        created() {
            let that = this;
            this.$axios({
                method:'post',
                url:that.$api.xtglApi.getApprovalStep,
                data:{
                    uuid:this.apprData.approvalId
                }
            }).then((res)=>{
                if(res.result===1){
                    that.stepList = res.info;
                    if(that.stepList.length<4){
                        that.stepList = that.stepList.reverse()
                    }
                }
                /*
                *qualfiedNames: "test"
                *statusVal: "提交"
                * completeTime: "2019-10-15 10:47:38"
                * */
                console.log(res)
            }).catch(function (err) {

            })
        }
    }
</script>

<style scoped lang="less">
    .app-step{
        width: 1000px;
        margin: 0 auto;
        padding-top: 10px;
        border: 1px solid #DDD;

        .step-left{
            width: 100px;
            margin: 0;
            padding: 0;
            text-align: center;
            font-size: 16px;
            /*display: inline-block;*/
        }

        .step-right{
            width: 900px;
            margin-left: 100px;
            padding: 0;
            /*display: inline-block;*/
        }
    }

</style>
