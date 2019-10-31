<template>
    <el-dialog
            title="政策汇总"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm">
            <el-form class="demo-form-inline" label-width="135px">
                <el-form-item label="标题:" prop="title">
                    <el-input v-model="ruleForm.title" style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline" label-width="135px">
                <el-form-item label="发布人员:" prop="createUser">
                    <el-select v-model="ruleForm.createUser" placeholder="请选择发布人员" style="width:101%">
                        <el-option lable="发布人员" v-for="item in ruleForm.createUserList" :key="item">{{item}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布时间:" prop="createTime" style="width:48%">
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline" label-width="135px">
                <el-form-item label="开始时间:" prop="startTime" style="width:48%">
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间:" prop="endTime" style="width:48%">
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline" label-width="135px">
                <el-form-item label="是否置顶" prop="isTop">
                    <el-switch v-model="ruleForm.isTop"></el-switch>
                </el-form-item>
                <el-form-item label="发布单位:" prop="comName" style="padding-left:20px">
                    <el-input v-model="ruleForm.comName" style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <el-form-item label="上传正文" prop="sczw">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="#"
                        :before-upload="beforeUpload"
                        :on-change="handleChange"
                        :http-request="toUpload"
                        :on-progress="toUploadProgress"
                        :on-success="toUploadSuccess"
                        :on-error="toUploadError"
                        :on-preview="handlePreview"
                        :before-remove="beforeRemove"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="autoUp"
                        :show-file-list="showFileList">
                    <el-button slot="trigger" size="small" type="primary" icon="el-icon-circle-plus">浏览...</el-button>
                    <div slot="tip" class="mytip">
                        <slot name="mytip"></slot>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="政策文件" prop="zcwj">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="#"
                        :before-upload="beforeUpload"
                        :on-change="handleChange"
                        :http-request="toUpload"
                        :on-progress="toUploadProgress"
                        :on-success="toUploadSuccess"
                        :on-error="toUploadError"
                        :on-preview="handlePreview"
                        :before-remove="beforeRemove"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="autoUp"
                        :show-file-list="showFileList">
                    <el-button slot="trigger" size="small" type="primary" icon="el-icon-circle-plus">浏览...</el-button>
                    <div slot="tip" class="mytip">
                        <slot name="mytip"></slot>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item style="padding-left: 25%">
                <el-button type="primary" @click="saveForm('proclamationForm')">保存</el-button>
                <el-button @click="releaseForm('proclamationForm')">发布</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        name: "zchzCre",
        prop: ["dialogTitle"],
        data() {
            return {
                visible: false,
                dialogVisible: true,
                ruleForm: {
                    cldId: '',
                    enterprise: '',
                    interestName: '',
                    interestNameList: [],
                    productName: '',
                    introduction: '',
                    productDescribe: '',
                },
                rules: {
                    enterprise: [
                        {required: true, message: '请输入单位名称！', trigger: 'blur'}
                    ],
                    interestName: [
                        {required: true, message: '请输入所属方向！。', trigger: 'blur'}
                    ],
                    productName: [
                        {required: true, message: '请输入内容！', trigger: 'blur'},
                        {max: 1200, message: '请输入不超过1200字！', trigger: 'blur'}
                    ],
                    introduction: [
                        {required: true, message: '请输入内容！', trigger: 'blur'},
                        {max: 1200, message: '请输入不超过1200字！', trigger: 'blur'}
                    ],
                    productDescribe: [
                        {required: true, message: '请输入内容！', trigger: 'blur'},
                        {max: 1200, message: '请输入不超过1200字！', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            //弹窗初始化
            init() {
                this.visible = true
                this.dialogVisible = true
            },
            //修改
            update() {
                /*this.$options.methods.init()*/
                this.visible = true
                this.dialogVisible = true
                this.$nextTick(() => {
                    var that = this
                    this.$$request({
                        url: "http://mockjs.com/api/xctjUpdate",
                        data: {type: 'top', key: '123456'}
                    }).then(function (res) {
                        that.ruleForm = res.info.post;
                        that.ruleForm.interestNameList = res.info.interestNameList;
                    })
                })
            },
            //保存
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    let that = this
                    if (valid) {
                        this.$axios({
                            url: "http://mockjs.com/api/xctjCre",
                            data: that.ruleForm,
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.$alert('保存成功!', '提示', {
                                    type: 'success'
                                });
                            }
                            that.dialogVisible = false
                            that.ruleForm = ''
                        })
                    } else {
                        window.console.log('操作失败!');
                        return false;
                    }
                });
            },
            closeForm(formName) {
                this.dialogVisible = false
                this.visible = false
                this.ruleForm = '',
                    this.$refs[formName].close();
                return false;
            },
        },
        getDataWay: {dataType: "data", data: []},
    }
</script>
<style scoped>
    #formPage {
        margin: 10px auto;
        width: 80%;
        padding: 0px 22px;
        box-sizing: border-box;
        background-color: #fff
    }
</style>
<style lang="less">
    .el-select__caret el-input__icon el-icon-arrow-up {
        width: 5px
    }

</style>