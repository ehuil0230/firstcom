<template>
    <div class="lyf-resetclass">
        <el-dialog
                title="宣传推荐维护"
                :visible.sync="dialogVisible"
                width="70%"
                @close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="153px" class="demo-ruleForm">
                <!--<el-form :inline="true" ref="ruleForm" class="demo-form-inline"
                         label-width="153px">-->
                <!--<el-form-item label-width="153px" class="demo-ruleForm">-->
                <table>
                    <tr>
                        <td>
                            <el-form-item label="推荐重点单位名称:" prop="comName">
                                <el-input v-model="ruleForm.comName" style="width:110%" maxlength="50"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="所属方向:" prop="claimDirectionDm" style="padding-left:70px">
                                <el-select v-model="ruleForm.claimDirectionDm" placeholder="请选择所属方向">
                                    <el-option class="myStyle"
                                               v-for="item in claimDirectionDm"
                                               :key="item.CODE"
                                               :label="item.CAPTION"
                                               :value="item.CODE">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <!--</el-form-item>-->
                <!--</el-form>-->
                <el-form-item label="揭榜产品和服务:" prop="productService">
                    <el-input type="textarea" maxlength="200" v-model="ruleForm.productService"
                              placeholder="字数小于200字"></el-input>
                </el-form-item>
                <el-form-item label="企业简介:" prop="introduction">
                    <el-input type="textarea" v-model="ruleForm.introduction" maxlength="200"
                              placeholder="字数小于200字"></el-input>
                </el-form-item>
                <el-form-item label="揭榜产品和服务描述:" prop="productDescribe">
                    <el-input type="textarea" v-model="ruleForm.productDescribe" class="trightSize"
                              maxlength="1000" placeholder="字数小于1000字"></el-input>
                </el-form-item>
                <el-form-item style="padding-left: 25%">
                    <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
                    <el-button @click="releaseForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "creOperation",
        props: {
            dialogData: {
                type: Object,
            },
            taVisible: {
                type: Boolean,
            },
        },
        data() {
            return {
                dialogVisible: this.taVisible,
                //下拉选框
                claimDirectionDm: this.dialogData.Dm,
                ruleForm: {
                    uuid: this.dialogData.uuid ? this.dialogData.uuid : "",
                    comName: this.dialogData.comName ? this.dialogData.comName : "",
                    proclamationDm: this.dialogData.fromType,
                    approvalDm: this.dialogData.spType,
                    //areaDirectionDm: this.dialogData.areaDirectionDm ? this.dialogData.areaDirectionDm : "",
                    introduction: this.dialogData.introduction ? this.dialogData.introduction : "",
                    productDescribe: this.dialogData.productDescribe ? this.dialogData.productDescribe : "",
                    productService: this.dialogData.productService ? this.dialogData.productService : "",
                    claimDirectionDm: this.dialogData.claimDirectionDm ? this.dialogData.claimDirectionDm : "",
                },
                rules: {
                    claimDirectionDm:[
                        {required: true, message: '请输入所属方向！'}
                    ],
                    comName: [
                        {required: true, message: '请输入单位名称！'}
                    ],
                    productService: [
                        {required: true, message: '请输入内容！'},
                        {max: 1200, message: '请输入不超过200字！'}
                    ],
                    introduction: [
                        {required: true, message: '请输入内容！'},
                        {max: 1200, message: '请输入不超过1000字！'}
                    ],
                    productDescribe: [
                        {required: true, message: '请输入内容！'},
                        {max: 1200, message: '请输入不超过1000字！'}
                    ],
                },
            };
        },
        methods: {
            //弹窗关闭
            handleClose() {
                this.dialogVisible = false;
                this.$emit("refreshTable", true)
            },
            saveForm(ruleForm) {
                const that = this;
                if (this.ruleForm.uuid == null || this.ruleForm.uuid == '') {
                    this.$refs[ruleForm].validate((valid) => {
                        if (valid) {
                            //添加接口
                            this.$axios({
                                method: 'post',
                                url: this.$api.xtglApi.xtglXctjSave,
                                data: this.ruleForm
                            }).then(function (res) {
                                if (res.result === 1) {
                                    that.$message({
                                        message: res.msg,
                                        type: 'success'
                                    });
                                }
                                that.handleClose()
                                that.ruleForm = ''
                            })
                        } else {
                            window.console.log('操作失败!');
                            return false;
                        }
                    });
                } else {
                    this.$axios({
                        method: 'post',
                        url: this.$api.xtglApi.xtglXctjUpdate,
                        data: this.ruleForm
                    }).then(function (res) {
                        if (res.result === 1) {
                            that.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }
                        that.handleClose(),
                            that.ruleForm = ''
                    })
                }
            },
            //发布
            releaseForm(ruleForm) {
                const that = this;
                if (this.ruleForm.uuid === null || this.ruleForm.uuid === "") {
                    this.$refs[ruleForm].validate((valid) => {
                        if (valid) {
                            //添加接口
                            this.$axios({
                                method: 'post',
                                url: this.$api.xtglApi.xtglXctjSave,
                                data: this.ruleForm
                            }).then(function (res) {
                                if (res.result === 1) {
                                    return res.info.uuid
                                }
                            }).then((id) => {
                                that.ruleForm.tableid = id;
                                let param = Object.assign(that.ruleForm, {
                                    title: that.ruleForm.comName
                                });
                                that.$axios({
                                    method: 'post',
                                    url: that.$api.xtglApi.xtglXctjSubmit,
                                    data: param
                                }).then(function (res) {
                                    if (res.result === 1) {
                                        that.$message({
                                            message: res.msg,
                                            type: 'success'
                                        });
                                    }
                                    that.handleClose()
                                    that.ruleForm = ''
                                })
                            }).catch(function (err) {

                            })
                        } else {
                            window.console.log('操作失败!');
                            return false;
                        }
                    });
                } else {
                    this.$axios({
                        method: 'post',
                        url: this.$api.xtglApi.xtglXctjUpdate,
                        data: this.ruleForm
                    }).then(function (res) {
                        if (res.result == 1) {
                            return res.info.uuid
                        }
                    }).then((id) => {
                        this.ruleForm.uuid = '';
                        that.ruleForm.tableid = id;
                        let param = Object.assign(that.ruleForm, {
                            title: that.ruleForm.comName
                        });
                        that.$axios({
                            method: 'post',
                            url: that.$api.xtglApi.xtglXctjSubmit,
                            data: param
                        }).then(function (res) {
                            if (res.result == 1) {
                                that.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                            }
                            that.handleClose()
                            that.ruleForm = ''
                        })
                    }).catch(function (err) {
                    })
                }
            },
        },
        getDataWay: {dataType: "data", data: []},
    }
</script>
<style scoped lang="less">
    .lyf-resetclass /deep/ .el-input__inner {
        width: 127%;
    }

    .lyf-resetclass /deep/ .el-select-dropdown el-popper {
        min-width: 270px;
    }

    .el-select-dropdown__item {
        width: 273px
    }

    #formPage {
        margin: 10px auto;
        width: 80%;
        padding: 0px 22px;
        box-sizing: border-box;
        background-color: #fff
    }

    .lyf-resetclass /deep/ .el-input__suffix {
        right: -33px;
    }

    .lyf-resetclass /deep/ .el-textarea__inner {
        width: 93%;
    }

    .lyf-resetclass /deep/ .el-select__caret el-input__icon el-icon-arrow-up {
        width: 5px
    }
</style>

