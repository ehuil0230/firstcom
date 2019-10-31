<template>
    <div class="app-btn">
        <el-row>
            <el-button size="small" icon="el-icon-error" type="primary" @click="fail">不通过</el-button>
            <el-button size="small" icon="el-icon-success" type="primary" @click="pass">通过</el-button>
        </el-row>
        <el-dialog
                title="审批不通过"
                :visible.sync="dialogVisible"
                width="50%"
                :close-on-click-modal="false"
                @close="handleClose">
            <div>
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 6}"
                        placeholder="请输入内容"
                        v-model="text">
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "approval",
        props: {
            apprData: {
                type: Object
            }
        },
        data() {
            return {
                dialogVisible: false,
                text:""
            }
        },
        methods: {
            pass() {//审批通过
                let that = this;
                console.log(this.apprData)
                this.$axios({
                    method: 'post',
                    // url: "/ApprovalCtrl/approvalPass",
                    url: this.$api.xtglApi.approvalPass,
                    data: {
                        uuid: this.apprData.approvalId,
                        tableid:this.apprData.uuid,  //增传tableid进审核通过接口
                        moduleCode: this.apprData.moduleCode, //增传modelCode进审核通过接口
                        taskId: this.apprData.taskId, //增传taskId进审核通过接口
                    }
                }).then((res) => {
                    if (res.result === 1) {
                        that.$message({
                            type: 'success',
                            message: res.msg
                        })
                        that.$router.push({
                            name: 'dbList'
                        });
                    }
                }).catch(function (err) {
                    that.$message({
                        type: 'success',
                        message: '审批失败'
                    })
                })
            },
            fail() {//审批不通过
                this.dialogVisible=true;
            },
            sure(){
                let that = this;
                console.log(this.apprData)
                this.$axios({
                    method: 'post',
                    // url: "/ApprovalCtrl/approvalFail",
                    url: this.$api.xtglApi.approvalFail,
                    data: {
                        uuid: this.apprData.approvalId,
                        tableid:this.apprData.uuid,  //增传tableid进审核通过接口
                        moduleCode: this.apprData.moduleCode, //增传modelCode进审核通过接口
                        taskId: this.apprData.taskId, //增传taskId进审核通过接口
                        text:this.text
                    }
                }).then((res) => {
                    if (res.result === 1) {
                        that.$message({
                            type: 'success',
                            message: res.msg
                        });
                        this.dialogVisible=false;
                        that.$router.push({
                            name: 'dbList'
                        });
                    }
                }).catch(function (err) {
                    that.$message({
                        type: 'success',
                        message: '审批失败'
                    })
                })
            },
            cancel(){
                this.dialogVisible=false;
            },
            handleClose(){
                this.text="";
            }
        }
    }
</script>

<style scoped>
    .app-btn {
        text-align: center;
        margin-top: 20px;
        width: 100%;
    }

</style>
