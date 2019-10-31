<template>
    <div class="xdq-dialog">
        <el-dialog
            title="先导区信息填报详情"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
            width="80%"
            height="800px"
            :open="handleOpen"
            :before-close="handleClose">
            <div class="form-t">
                <el-form :model="xdqxxtbForm" :rules="rules" ref="xdqxxtbForm" label-width="0px" class="formTable">
                    <el-input type="hidden" class="hidden-input" v-model="xdqxxtbForm.uuid"></el-input>
                    <el-row type="flex" justify="space-around" align="top">
                        <el-col :span="18">
                            <el-row type="flex" justify="space-around" align="middle">
                                <el-col class="label-col" :span="4">
                                    <label>先导区名称</label>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="pilotAreaName">
                                        <el-input v-model="xdqxxtbForm.pilotAreaName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col class="label-col" :span="4">
                                    <label>先导区级别</label>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="pilotLevelDm">
                                        <el-select v-model="xdqxxtbForm.pilotLevelDm" placeholder="请选择先导区级别">
                                            <el-option
                                                    v-for="item in pilotLevels"
                                                    :key="item.CODE"
                                                    :label="item.CAPTION"
                                                    :value="item.CODE">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around" align="middle">
                                <el-col class="label-col" :span="4">
                                    <label>所在省份</label>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="provinceDm">
                                        <el-select v-model="xdqxxtbForm.provinceDm" placeholder="请选择所在省份">
                                            <el-option
                                                    v-for="item in provinces"
                                                    :key="item.CODE"
                                                    :label="item.CAPTION"
                                                    :value="item.CODE">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col class="label-col" :span="4">
                                    <label>批准机关</label>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="approvalOrg">
                                        <el-input v-model="xdqxxtbForm.approvalOrg"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around" align="middle">
                                <el-col class="label-col" :span="4">
                                    <label class="long-label">主导产业</label>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="primeIndustry">
                                        <el-input v-model="xdqxxtbForm.primeIndustry"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col class="label-col" :span="4">
                                    <label class="long-label">占地面积 (km²)</label>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="area">
                                        <el-input v-model.number="xdqxxtbForm.area" placeholder="单位：平方公里"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6">
<!--                            <p key="myTip" v-if="fileData.showTip" class="file-tip" style="font-size: 10px">-->
<!--                                <i class="el-icon-warning">请先保存后再上传附件</i>-->
<!--                            </p>-->
                            <cy-image-upload ref="upload" v-if="fileData.allowUpload" :autoUp="fileData.autoUp"
                                            :file-num="fileData.fileNum" :relatedId="fileData.relatedId">
                            </cy-image-upload>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around" align="middle">
                        <el-col class="label-col" :span="3">
                            <label class="short-label">人工智能企业数</label>
                        </el-col>
                        <el-col :span="21">
                            <el-form-item prop="aiEnterpriseNum">
                                <el-input v-model.number="xdqxxtbForm.aiEnterpriseNum"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around" align="middle">
                        <el-col class="label-col textarea-row" :span="3">
                            <label class="short-label">先导区简介</label>
                        </el-col>
                        <el-col class="textarea-row" :span="21">
                            <el-form-item prop="introduction">
                                <el-input type="textarea" placeholder="200字以内" v-model="xdqxxtbForm.introduction"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around" align="middle">
                        <el-col class="label-col textarea-row" :span="3">
                            <label class="short-label">优惠政策</label>
                        </el-col>
                        <el-col class="textarea-row" :span="21">
                            <el-form-item prop="preferentialPolicy">
                                <el-input type="textarea" placeholder="200字以内" v-model="xdqxxtbForm.preferentialPolicy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around" align="middle">
                        <el-col class="label-col textarea-row" :span="3">
                            <label class="short-label">先导区取得成效</label>
                        </el-col>
                        <el-col class="textarea-row" :span="21">
                            <el-form-item prop="achievement">
                                <el-input type="textarea" placeholder="200字以内" v-model="xdqxxtbForm.achievement"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="btns" :span="24">
                            <el-button type="primary" @click="saveForm('xdqxxtbForm')">保存</el-button>
                            <el-button @click="submitForm('xdqxxtbForm')">提交</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import cyImageUpload from "../../../components/upAndDown/cyImageUpload";

    export default {
        name: "xdqxxtbCreOperation",
        components: {
            cyImageUpload
        },
        props : {
        },
        data() {
            return {
                dialogVisible: false,
                //表单
                rules: {
                    pilotAreaName: [
                        { required: true, message: '请填写先导区名称'},
                        { max: 50, message: '长度在50个字符串'}
                    ],
                    pilotLevelDm: [
                        { required: true, message: '请选择先导区级别'}
                    ],
                    provinceDm: [
                        { required: true, message: '请选择所属省份'}
                    ],
                    approvalOrg: [
                        { required: true, message: '请填写批准机关'},
                        { max: 50, message: '长度在50个字符串'}
                    ],
                    primeIndustry: [
                        { required: true, message: '请填写主导产业'},
                        { max: 200, message: '长度在200个字符串'}
                    ],
                    area: [
                        { required: true, message: '请填写占地面积' },
                        { type: 'number', message: '占地面积必须是数字' }
                        // { max: 50, message: '长度在50个字符串', trigger: 'blur' }
                    ],
                    aiEnterpriseNum: [
                        { required: true, message: '请填写人工智能企业数' },
                        { type: 'number', message: '人工智能企业数必须是数字' },
                        // { min:1, max: 50, message: '长度在50个字符串以内', trigger: 'blur' }
                    ],
                    introduction: [
                        { required: true, message: '请填写先导区简介' },
                        { max: 200, message: '长度在200个字符以内' }
                    ],
                    preferentialPolicy: [
                        { required: true, message: '请填写优惠政策' },
                        { max: 200, message: '长度在200个字符以内' }
                    ],
                    achievement : [
                        { required: true, message: '请填写先导区取得成效' },
                        { max: 200, message: '长度在200个字符以内' }
                    ],
                    pictureUrl : [
                        { required: true, message: '请上传先导区展示图' }
                    ]
                },
                pilotLevels: [],
                provinces: [],
                xdqxxtbForm: {
                    uuid: '',
                    pilotAreaName: '',
                    imageUrl: '',
                    pilotLevelDm: '',
                    provinceDm:'',
                    approvalOrg: '',
                    primeIndustry: '',
                    area: '',
                    aiEnterpriseNum: '',
                    introduction: '',
                    preferentialPolicy: '',
                    achievement: '',
                    state: 0,
                    tableid: ''
                },
                fileData: {
                    fileNum: 1,
                    relatedId: '',
                    allowUpload: true,
                    autoUp: true,
                    fromType: '0001',
                    spType: '010001'
                }
            }
        },
        created() {
            window.console.log('xdqxxtbCreOperation created-------------')
        },
        methods: {
            //弹窗初始化
            init(uuid)
            {
                let that = this
                window.console.log('弹窗初始化')
                // 加载下拉框字典数据
                that.initCodeData()

                that.dialogVisible = true

                // 若是修改，数据初始化
                if ($.isNotEmpty(uuid)){
                    // 修改
                    this.$$request({
                        method: 'post',
                        url: this.$api.xdqglApi.pilotAreaDetail,
                        data: {
                            uuid : uuid
                        }
                    }).then(function (res) {
                        if (res.result === 1) {
                            that.xdqxxtbForm = res.info

                            that.xdqxxtbForm.area = $.isNotEmpty(that.xdqxxtbForm.area)?
                                Number(that.xdqxxtbForm.area):0

                            // 修改时，文件上传数据
                            that.fileData.relatedId = that.xdqxxtbForm.uuid
                        }else {
                            that.$alert(res.msg, "系统异常，请联系管理员！", {})
                            return false
                        }
                    }).catch(function (error) {
                        that.$alert(error, "系统异常，请联系管理员！", {})
                        return false
                    })
                }else{
                    if (that.$refs.xdqxxtbForm) {
                        that.$refs.xdqxxtbForm.resetFields()
                    }
                    if (that.$refs.upload) {
                        that.$refs.upload.image = {
                            relatedid: '',
                            MD5Path: '',
                            fileName: '',
                            url: ''
                        }
                    }

                    that.xdqxxtbForm.uuid = ''
                    that.xdqxxtbForm.state = ''

                    // 新建时，初始化文件上传
                    that.fileData.relatedId = ''

                }
            },
            initCodeData() {
                const that = this
                this.$$request({
                    method: 'post',
                    url: that.$api.getCodeData,
                    data: {
                        tableName : "DM_PROVINCE"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.provinces = res.info
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })
                this.$$request({
                    method: 'post',
                    url: that.$api.getCodeData,
                    data: {
                        tableName : "DM_PILOT_LEVEL"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.pilotLevels = res.info
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })
            },
            // 统一保存方法，保存和提交都会调用
            uniformSave(formName){
                // 首先判断状态，审批完成后无法修改
                if (this.xdqxxtbForm.state > 0 && this.xdqxxtbForm.state < 9) {
                    this.$alert('审核状态中无法修改！', '提示', {
                        type: 'warning'
                    })
                    return false
                } else if(this.xdqxxtbForm.state == 9){
                    this.$alert('已发布内容无法修改！', '提示', {
                        type: 'warning'
                    })
                    return false
                }

                let that = this
                let url = ''
                // 后台代码问题暂时处理，今后要删除，不应该在前端传递状态
                this.xdqxxtbForm.state = 0
                let data = {
                    ...this.xdqxxtbForm
                }
                if ($.isNotEmpty(this.xdqxxtbForm.uuid)) {
                    // 修改
                    url = this.$api.xdqglApi.pilotAreaUpdate
                    data.uuid = this.xdqxxtbForm.uuid
                } else {
                    // 新增
                    url = this.$api.xdqglApi.pilotAreaSave
                }
                let saveRequestPromise = null
                this.$refs[formName].validate((valid) => {
                    // 表单验证通过
                    if (valid) {
                        const promise = that.$$request({
                            method: 'post',
                            url: url,
                            data: data
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.xdqxxtbForm.uuid = res.info.uuid
                                return res
                            }else {
                                that.$alert(res.msg, "系统异常，请联系管理员！", {})
                                return false
                            }
                        }).then(function (res) {
                            // 保存成功后，检查是否需要上传附件
                            let res1 = res
                            // 只有新增才需要单独处理上传，修改不需要
                            if (res1 && url == that.$api.xdqglApi.pilotAreaSave) {
                                let param = {
                                    "relatedid": res.info.uuid,
                                    "MD5Path": that.$refs.upload.image.MD5Path,
                                    "fileName": that.$refs.upload.image.fileName
                                }
                                that.$$insertFileInfo(param).
                                then((resdata) => {
                                    res1 = resdata
                                }).catch(function (err) {
                                    that.$message({
                                        message: '关联附件列表失败',
                                        type: 'warning'
                                    })
                                })
                            }
                            return res1
                        })
                        saveRequestPromise = promise
                    }else {
                        window.console.log('验证未通过!')
                        return false
                    }
                })
                return saveRequestPromise
            },
            // 保存
            saveForm(formName)
            {
                let that = this
                let successTip = ''
                if ($.isNotEmpty(this.xdqxxtbForm.uuid)) {
                    // 修改
                    successTip = '修改成功'
                } else {
                    // 新增
                    successTip = '保存成功'
                }
                const savePromise = this.uniformSave(formName)
                if (savePromise instanceof Promise) {
                    savePromise.then((res) => {
                        if (res.result === 1) {
                            that.$alert(successTip, '提示', {
                                type: 'success'
                            })
                            that.dialogVisible = false
                            // 控制外层父组件对话框
                            that.$emit('displayDialog', false)

                            that.$refs[formName].resetFields()
                            // that.$refs.table.loadData()
                            that.$emit('loadData')
                        }
                    }).catch((error) => {
                        that.$alert(error, "保存时出现异常，请联系管理员！", {})
                        return false
                    })
                }
            },
            // 提交
            submitForm(formName) {
                let that = this
                let url = that.$api.xdqglApi.uniformSubmit
                let successTip = '提交成功'
                let approvalDm = '010020' // 审核代码
                const savePromise = this.uniformSave(formName)
                if (savePromise instanceof Promise) {
                    savePromise.then((res) => {
                        if (res.result === 1) {
                            that.xdqxxtbForm.tableid = that.xdqxxtbForm.uuid
                            that.xdqxxtbForm.uuid = ''
                            // 后台代码问题暂时处理，今后要删除，不应该在前端传递状态
                            // 1-8之间任意数字，先随便设置为5
                            that.xdqxxtbForm.state = 5
                            let data = {
                                ...that.xdqxxtbForm,
                                approvalDm: approvalDm,
                                title:that.xdqxxtbForm.pilotAreaName
                            }
                            this.$$request({
                                method: 'post',
                                url: url,
                                data: data
                            }).then(function (res) {
                                if (res.result === 1) {
                                    that.$alert(successTip, '提示', {
                                        type: 'success'
                                    })
                                    that.dialogVisible = false
                                    // 控制外层父组件对话框
                                    that.$emit('displayDialog', false)

                                    that.$refs[formName].resetFields()
                                    // that.$refs.table.loadData()
                                    that.$emit('loadData')
                                }else {
                                    that.$alert(res.msg, "系统异常，请联系管理员！", {})
                                    return false
                                }
                            })
                        }
                    }).catch((error) => {
                        that.$alert(error, "提交时出现异常，请联系管理员！", {})
                        return false
                    })
                }
            },
            //关闭
            closeForm(formName)
            {
                this.dialogVisible = false
                this.visible = false
                /*this.ruleForm = '', */
                this.$refs[formName].close();
                return false;
            },
            handleOpen() {

            },
            handleClose(done){
                done()
                window.console.log('对话框关闭前')
            },

        }
    }
</script>

<style scoped lang="less">
    /*.form-t /deep/ .el-row {*/
    /*    height: 66px;*/
    /*    line-height: 50px;*/
    /*}*/
    .form-t /deep/ .el-col{
        position: relative;
    }
    .form-t /deep/ .el-form-item{
        /*position: absolute;*/
        /*top: 50%;*/
        /*transform: translate(0, -50%);*/
    }

    .form-t .label-col {
        text-align: right;
        padding-right: 26px;
        padding-bottom: 14px;
    }

    .form-t /deep/ .el-select {
        width: 100%;
    }
    .form-t .upload-demo{
        display: inline-block;
    }
    .form-t .btns{
        text-align: center;
    }
    .form-t /deep/ .el-form-item__error {
        /*margin-top: -10px;*/
    }
    .form-t /deep/ .el-col.textarea-row .el-form-item__error {
        margin-top: 0;
    }

    .form-t .hidden-input {
        display: none;
    }
</style>

<!-- 图片上传样式 -->
<style>
    .form-t .file-tip{
        font-size: 10px;
        text-align: center;
        height: 160px;
        line-height: 160px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader /deep/ .el-upload {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 160px;
        height: 160px;
        line-height: 160px;
        text-align: center;
    }
    .avatar {
        width: 160px;
        height: 160px;
        display: block;
    }
</style>
