<template>
    <div class=" zlDialogStyle">
        <el-dialog
                :close-on-click-modal="false"
                :visible.sync="dialogFormVisible"
                title="新建指令"
                v-dialogDrag
                width="1050px"
                :before-close="beforeClose"
                :destroy-on-close="true"
        >
            <div class="zlStyle" style="width:100%;">
                <el-form :inline="true" :model="form" :rules="rules" label-width="120px" ref="form" size="medium">
                    <el-form-item :label="form.type===1?'发送人':'接收人'" prop="recievers">
                        <!--<el-select v-model="form.recievers" multiple placeholder="请选择" v-if="form.uuid==''">
                            <el-option
                                    v-for="item in reciverList"
                                    :key="item.uuid"
                                    :label="item.realName"
                                    :value="item.uuid">
                            </el-option>
                        </el-select>-->
                        <!--选框空时-->
                        <el-input :disabled="true" class="rc" type="text" v-model="form.recieverNames"
                                  v-if="form.uuid==''">
                            <el-button slot="append" icon="el-icon-folder-opened"
                                       @click="openOrg"></el-button>
                        </el-input>
                        <!--有选人时-->
                        <el-input :disabled="true" class="rc" type="text" v-model="form.recieverNames"
                                  v-else></el-input>
                        <transition name="el-zoom-in-top">
                            <div v-show="show2" class="transition-box">
                                <org-tree @nodeClick="nodeClick" @checkedChange="checkedChange"
                                          :org-tree-obj="orgTreeObj"></org-tree>
                            </div>
                        </transition>
                    </el-form-item>

                    <el-form-item label="指令标题" prop="title">
                        <el-input class="rc" type="text" v-model="form.title" maxlength="30" show-word-limit
                                  :disabled="(form.uuid!='')"></el-input>
                    </el-form-item>
                    <el-form-item label="指令内容" prop="content">
                        <el-input :rows="5" class="rc" type="textarea" v-model="form.content" maxlength="1000"
                                  :disabled="(form.uuid!='')"
                                  show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="附件" prop="cyUpload" v-if="form.uuid==''">
                        <cyUpload ref="upload" :file-num="fileNum" :auto-up="true"></cyUpload>
                    </el-form-item>
                    <el-form-item label="附件" v-else>
                        <p class="fj_list" v-for="item in fileList" @click="downl(item)"><i class="el-icon-tickets"></i>{{item.name}}
                        </p>
                    </el-form-item>
                    <el-form-item style="width: 100%;text-align: center" v-if="form.uuid==''">
                        <el-button @click="submitForm('form')" size="medium " type="primary">保存</el-button>
                        <el-button @click="cancel" size="medium ">取消</el-button>
                    </el-form-item>
                    <el-form-item style="width: 100%;text-align: center" v-else>
                        <el-button @click="cancel" size="medium ">关闭</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import cyUpload from "../../../components/upAndDown/cyUpload";
    import OrgTree from "../../xtgl/myToolbar/OrgTree";

    export default {
        name: "zlDialog",
        components: {
            cyUpload,
            OrgTree
        },
        props: {
            form: {
                type: Object,
                default: {
                    //站内信代码
                    MailDm: '002',
                    //接收人ID
                    recievers: [],
                    //接收人姓名
                    recieverNames: '',
                    //接收标题
                    title: '',
                    //接收内容
                    content: '',
                    //传入uuid以此区分新建还是修改
                    uuid: '',
                    type: 0
                }
            },
            dialogFormVisible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                tempUser: [],
                show2: false,
                orgTreeObj: {
                    leftTreeProps: {// 左侧树props
                        label: 'name',
                        children: 'children'
                    },
                    daixuanTreeProps: {// 待选树props
                        label: 'realName'
                    },
                    orgTree: [],
                    daixuanData: [],
                    type: 'zl'
                },
                fileNum: 100,
                reciverIdList: [],
                reciverList: [],
                fileList: [],
                //验证表单
                rules: {
                    recievers: [
                        {required: true, message: '请选择接收人'},
                    ],
                    title: [
                        {required: true, message: '请输入标题'}
                    ],
                    content: [
                        {required: true, message: '请输入内容'}
                    ],
                },
            }
        },
        methods: {
            //树形式展示
            /*checkChange(data, checked) {
                let checkedObj = {
                    uuid: data.uuid,
                    realName: data.realName
                };
                if (checked) {
                    this.reciverList.push(checkedObj);
                } else {
                    for (let i = 0; i < this.reciverList.length; i++) {
                        if (this.reciverList[i].uuid === checkedObj.uuid) {
                            this.reciverList.splice(i, 1);
                            break;
                        }
                    }
                }
                if (this.reciverList.length > 0) {
                    this.form.recieverNames = this.reciverList[0].realName
                    this.form.recievers = this.reciverList[0].uuid
                    for (let i = 1; i < this.reciverList.length; i++) {
                        this.form.recieverNames += ',' + this.reciverList[i].realName
                        this.form.recievers += ',' + this.reciverList[i].uuid
                    }
                } else {
                    this.form.recieverNames = ''
                    this.form.recievers = ''
                }
            },*/
            //选中人时展示
            checkedChange(data, isChecked) {
                this.tempUser = data
                for (let i = 0; i < data.length; i++) {
                    this.reciverList.push(data[i]);
                }
                //输入框展示人名
                if (this.reciverList.length > 0) {
                    this.form.recieverNames = this.reciverList[0].realName
                    this.form.recievers = this.reciverList[0].uuid
                    for (let i = 1; i < this.reciverList.length; i++) {
                        this.form.recieverNames += ',' + this.reciverList[i].realName
                        this.form.recievers += ',' + this.reciverList[i].uuid
                    }
                } else {
                    this.form.recieverNames = ''
                    this.form.recievers = ''

                }
                this.reciverList = []
                this.tempUser = []
            },
            checkedChange1(data, isChecked) {
                const tempData = this.tempUser;
                if (isChecked) {  //选中
                    let item = ''
                    let oldUser = ''
                    for (let i = 0; i < data.length; i++) {
                        item = data[i].uuid
                        if (this.tempUser.length > 0) {
                            for (let j = 0; j < this.tempUser.length; j++) {
                                oldUser = this.tempUser[j] //旧数据uuid
                                if(this.tempUser.indexOf(item)===-1){ //未出现过
                                    this.reciverList.push(data[i]);
                                    tempData.push(item)  //保存已有uuid
                                }
                            }
                        }else{
                            this.reciverList.push(data[i]);
                            tempData.push(item)
                        }
                    }
                    this.tempUser = tempData;
                } else {  //取消选择
                    for (let i = 0; i < this.reciverList.length; i++) {
                        if (this.reciverList[i].uuid === checkedObj.uuid) {
                            this.reciverList.splice(i, 1);
                            break;
                        }
                    }
                }
                //输入框展示人名
                if (this.reciverList.length > 0) {
                    this.form.recieverNames = this.reciverList[0].realName
                    this.form.recievers = this.reciverList[0].uuid
                    for (let i = 1; i < this.reciverList.length; i++) {
                        this.form.recieverNames += ',' + this.reciverList[i].realName
                        this.form.recievers += ',' + this.reciverList[i].uuid
                    }
                } else {
                    this.form.recieverNames = ''
                    this.form.recievers = ''
                }
            },
            openOrg() {
                this.show2 = !this.show2;
                let that = this
                this.$$request({
                    url: this.$api.homeApi.getListAllOrgTree,
                    data: {}
                }).then(function (res) {
                    if (res.result === 1) {
                        that.orgTreeObj.orgTree = res.info
                    }
                })
            },
            nodeClick(data) {

            },
            downl(data) {
                console.log(data);
                let that = this;
                this.$$download(data).then(() => {
                    that.$message({
                        type: 'success',
                        message: '下载成功！'
                    })
                }).catch((err) => {
                    that.$message({
                        type: 'info',
                        message: '下载失败！'
                    })
                })
            },
            beforeClose(done) {
                this.form = {
                    //站内信代码
                    MailDm: '002',
                    //接收人ID
                    recievers: [],
                    //接收人姓名
                    recieverNames: '',
                    //接收标题
                    title: '',
                    //接收内容
                    content: '',
                    type: 0
                };
                this.tempUser = []
                this.orgTreeObj.daixuanData = []
                this.$emit("afterNew", this.form)
                this.$emit('update:dialogFormVisible', false)
                done()
            },
            cancel() {
                this.form = {
                    //站内信代码
                    MailDm: '002',
                    //接收人ID
                    recievers: [],
                    //接收人姓名
                    recieverNames: '',
                    //接收标题
                    title: '',
                    //接收内容
                    content: '',
                    type: 0
                };
                this.$emit("afterNew", this.form)
                this.$emit('update:dialogFormVisible', false)
            },
            //新建工作指令
            submitForm(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //添加接口
                        let req = that.form;
                        this.$axios({
                            method: 'post',
                            url: this.$api.hyglApi.saveMail,
                            data: req
                        }).then(function (res) {
                            console.log(res)
                            if (res.result === 1) {
                                let fileList = that.$refs.upload.fileList;
                                if (fileList.length > 0) {
                                    /*保存成功，关联附件列表*/
                                    console.log(that.$refs.upload.fileList);
                                    let MD5Paths = [], fileNames = [];
                                    fileList.forEach((item) => {
                                        MD5Paths.push(item.url);
                                        fileNames.push(item.name);
                                    })
                                    let param = {
                                        "relatedid": res.info.uuid,
                                        "MD5Path": MD5Paths.join(','),
                                        "fileName": fileNames.join(',')
                                    }
                                    that.$$insertFileInfoBatch(param).then((resdata) => {
                                        that.$message({
                                            message: '新增成功',
                                            type: 'success'
                                        });
                                        that.dialogFormVisible = false;
                                    }).catch(function (err) {
                                        that.$message({
                                            message: '关联附件列表失败',
                                            type: 'warning'
                                        });
                                    })
                                } else {
                                    that.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                }
                                that.$emit("afterNew", that.form)
                                that.$emit('update:dialogFormVisible', false)
                                that.dialogFormVisible = false
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
        },
        created() {
            let that = this
            if (this.form.uuid !== '') {
                this.$$queryFileList({
                    "relatedid": this.form.uuid
                }).then((res) => {
                    return res.info
                }).then((data) => {
                    if (data.length > 0) {
                        data.forEach((item) => {
                            let obj = {
                                relatedid: item.relatedid,
                                uuid: item.uuid,
                                name: item.fileName,
                                url: item.md5path,
                            };
                            that.fileList.push(obj);
                        })
                    }
                }).catch(function (err) {

                })
            }
            if (this.form.uuid !== '' && this.form.type === 1) {
                this.$$request({
                    url: this.$api.hyglApi.updateReadStateByUuid,
                    data: {uuid: this.form.uuid}
                }).then().catch()
            }
        }
    }
</script>

<style lang="less">
    .zlDialogStyle /deep/ .el-dialog {
        display: flex;
        flex-direction: column;
        margin: 0 !important;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /*height:600px;*/
        max-height: calc(100% - 30px);
        max-width: calc(100% - 30px);
    }

    .zlDialogStyle /deep/ .el-dialog .el-dialog__body {
        flex: 1;
        overflow: auto;
    }
    .zlDialogStyle /deep/ .el-dialog__body::-webkit-scrollbar {
        width: 2px;
        height: 100%;
    }

    .zlStyle /deep/ .el-form-item__content {
        width: 846px;
    }

    .fj_list {
        cursor: pointer;
    }

    .fj_list:hover {
        color: #03A9F4;
    }

    .rc {
        width: 820px;
    }
</style>
