<template>
    <el-dialog
            title="宣传推荐维护"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form :inline="true" class="demo-form-inline" label-width="150px">
                <el-form-item label="推荐重点单位名称:" prop="name">
                    <el-input v-model="ruleForm.enterprise" style="width:110% "></el-input>
                </el-form-item>
                <el-form-item label="所属方向:" prop="direct" style="padding-left: 30px">
                    <el-select v-model="ruleForm.interestName" placeholder="请选择所属方向">
                        <el-option lable="direct" v-for="item in ruleForm.interestNameList" :key="item" style="width:140%">{{item}}</el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form-item label="揭榜产品和服务:" prop="desc">
                <el-input type="textarea" v-model="ruleForm.productName"></el-input>
            </el-form-item>
            <el-form-item label="企业简介:" prop="desc">
                <el-input type="textarea" v-model="ruleForm.productName2"></el-input>
            </el-form-item>
            <el-form-item label="揭榜产品和服务描述:" prop="desc">
                <el-input type="textarea" v-model="ruleForm.productName3" class="trightSize"></el-input>
            </el-form-item>
            <el-form-item style="padding-left: 25%">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="closeForm('ruleForm')">关闭</el-button>
                <!--<el-button type="primary" @click="dialogConfirm">确 定</el-button>
                <el-button @click="dialogCancel">取 消</el-button>-->
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        name: "xctjxj",
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
                    productName2: '',
                    productName3: '',
                },
                rules: {
                    desc1: [
                        {required: true, message: '字数小于200字。', trigger: 'blur'}
                    ],
                    desc2: [
                        {required: true, message: '字数小于200字。', trigger: 'blur'}
                    ],
                    desc3: [
                        {required: true, message: '字数小于1000字。', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            //弹窗初始化
            init(){
              this.visible = true
                this.dialogVisible = true
                /*this.$nextTick(() => {

                })*/
            },
            update(){
                this.$options.methods.init()
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
            //取消提交
            /*dialogCancel(){
                return this.dialogTypeVisible = false
            },*/
            //确认提交
            /*dialogConfirm(){
                return this.dialogTypeVisible = false
            },*/
            //表单提交待更。。
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$router.push({
                            name: "ruleForm",
                            params: {
                                cldId: formName.cldId
                            }
                        })
                        alert('保存成功!');
                    } else {
                        window.console.log('保存出错!');
                        return false;
                    }
                });
            },
            closeForm(formName) {
                this.$refs[formName].close();
                this.dialogVisible = false
                this.visible = false
                return false;
            },
        },
        getDataWay: {dataType: "data", data: []},
        /*created() {
            var that = this
            this.$$request({
                url: "http://mockjs.com/api/formMock",
                data: {type: 'top', key: '123456'}
            }).then(function (res) {
                alert(res.info.regionList)
                that.ruleForm = res.info.post;
                that.ruleForm.regionList = res.info.regionList;
            })
        }*/
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
    .el-select__caret el-input__icon el-icon-arrow-up{
          width: 5px
    }

</style>