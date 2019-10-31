<template>
    <div>
        <el-form :inline="true"  size="small" >
            <div class="task-btn-item" style="margin-left: 0">
                <el-button @click="dialogFormVisible=true" size="small" type="primary">新建</el-button>
                <el-button size="small" style="margin-left: 10px" type="primary" @click="reload">刷新</el-button>
            </div>
            <div class="task-form-item">
                <el-form-item label="发送人" class="bt">
                    <el-select v-model="searchParams.user" clearable placeholder="请选择" :disabled="uploadVisible">
                        <el-option
                                v-for="item in reciverList"
                                :key="item.uuid"
                                :label="item.realName"
                                :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" class="lx">
                    <el-input v-model="searchParams.title"></el-input>
                </el-form-item>
                <el-button  @click="search" size="small" style="margin-left: 10px" type="primary">搜索</el-button>
            </div>

        </el-form>
        <!--指令添加弹出框-->
        <el-dialog
                :close-on-click-modal="false"
                :visible.sync="dialogFormVisible"
                title="新建指令"
                v-dialogDrag
                width="1050px"
                @close="formClose"
                :destroy-on-close="true"
        >
            <div style="width:100%;">
                <el-form :inline="true" :model="form" :rules="rules" label-width="120px" ref="form" size="medium">
                    <el-form-item label="接收人" prop="recievers">
                        <el-select v-model="form.recievers" multiple placeholder="请选择" :disabled="uploadVisible">
                            <el-option
                                    v-for="item in reciverList"
                                    :key="item.uuid"
                                    :label="item.realName"
                                    :value="item.uuid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指令标题" prop="title">
                        <el-input :disabled="uploadVisible" class="rc" type="text" v-model="form.title" maxlength="30"
                                  show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="指令内容" prop="content">
                        <el-input :disabled="uploadVisible" :rows="5" class="rc" type="textarea" v-model="form.content"
                                  maxlength="1000"
                                  show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="附件" prop="cyUpload">
                        <cyUpload ref="upload" :file-num="fileNum" :auto-up="true"></cyUpload>
                    </el-form-item>
                    <el-form-item style="width: 100%;text-align: center">
                        <el-button v-if="showTip" @click="submitForm('form')" size="medium " type="primary">保存</el-button>
                        <el-button @click="dialogFormVisible = false" size="medium ">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <tableList :columns="columns"
                   :getDataWay="getDataWay"
                   :pagination="pagination"
                   ref="table"
                   selection
        >
            <el-table-column label="标题" slot="title" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="false" @click.stop="selectGg(scope.row)" class="a-link">
                        {{scope.row.title}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>
        <!--指令详情弹出框-->
        <el-dialog
                :close-on-click-modal="false"
                :visible.sync="dialogFormVisibleInfo"
                title="指令详情"
                v-dialogDrag
                width="1050px"
        >
            <div style="width:100%;">
                <el-form :inline="true" :model="formInfo" :rules="rules" label-width="120px" ref="form" size="medium">
                    <el-form-item label="发送人" prop="senderName">
                        <el-input :disabled="true" class="rc" type="name" v-model="formInfo.senderName"></el-input>
                    </el-form-item>
                    <el-form-item label="指令标题" prop="title">
                        <el-input :disabled="true" class="rc" type="text" v-model="formInfo.title"></el-input>
                    </el-form-item>
                    <el-form-item label="指令内容" prop="content">
                        <el-input :disabled="true" :rows="10" class="rc" type="textarea"
                                  v-model="formInfo.content"></el-input>
                    </el-form-item>
                    <el-form-item label="附件">
                        <p class="fj_list" v-for="item in fileList" @click="downl(item)"><i class="el-icon-tickets"></i>{{item.name}}
                        </p>
                    </el-form-item>
                    <el-form-item style="width: 100%;text-align: center">
                        <el-button @click="dialogFormVisibleInfo = false" size="medium ">关闭</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import tableList from '@/components/grid/TableList.vue';
    import cyUpload from '@/components/upAndDown/cyUpload';
    export default {
        name: "ys",
        components: {
            cyUpload,
            tableList
        },
        data() {
            return {
                fileList:[],
                showTip: true,
                uploadVisible: false,
                fileNum: 100,
                relatedId: '',
                reciverList: [],
                //新建弹出框
                dialogFormVisibleInfo: false,
                dialogFormVisible: false,
                form: {
                    //站内信代码
                    MailDm: '002',
                    //接收人ID
                    recievers: '',
                    //接收人姓名
                    recieverNames: '',
                    //接收标题
                    title: '',
                    //接收内容
                    content: '',
                },
                formInfo: {
                    senderName: '',
                    //接收标题
                    title: '',
                    //接收内容
                    content: '',
                },
                //验证表单
                rules: {
                    recievers: [
                        {required: true, message: '请输入接收人', trigger: 'blur'},
                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                },
                //搜索框中的数据
                searchParams: {
                    //标题
                    title: '',
                    //发送人
                    user: ''
                },
                //数据接收
                getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.querySendMeMail,
                    param:{}
                    //data: '/MailDetailCtrl/querySendMeMailDetail',
                }, // 通过url方式
                //分页
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'right',
                    layout: 'total,prev, pager, next, jumper'
                },
                //tablelist表单的列名
                columns: [
                    {
                        label: '发送人',
                        prop: 'senderName',
                        width: '15%',
                    },
                    {
                        label: '标题',
                        prop: 'title',
                        template: true
                    },
                    {
                        label: '发送部门',
                        prop: 'sendOrgName',
                        width: '15%',
                    },
                    {
                        label: '发送时间',
                        prop: 'createTime',
                        width: '20%',
                    },
                ],
            }
        },
        methods: {
            formClose() {
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
                };
                // this.$refs['form'].resetFields();
            },
            reload(){
                this.$refs.table.loadData();
            },
            search(){
                /*  let that = this
                let params={
                     title:this.searchParams.title,
                     user:this.searchParams.user
                 }
                 this.$refs.table.loadData(params);*/
                /*this.$axios({
                    method: 'post',
                    url: this.$api.hyglApi.querySendMeMail,
                    data: {
                        title:this.searchParams.title,
                        sender:this.searchParams.user
                    }
                }).then(function (res) {
                    that.$refs.table.loadData();
                })*/
                this.$set(this.getDataWay.param,'title',this.searchParams.title);
                this.$set(this.getDataWay.param,'sender',this.searchParams.user);
                this.$refs.table.loadData()

            },

            closeDialogFunc() {
                this.dialogFormVisible = false;
                this.relatedid = 'init'
            },
            //新建工作指令
            submitForm(formName) {
                let that = this;
                let tempArr = [];
                for (let item of that.form.recievers) {
                    for (let temp of that.reciverList) {
                        if (item === temp.uuid) {
                            tempArr.push(temp.realName);
                        }
                    }
                }
                if (tempArr.length >= 2) {
                    that.form.recieverNames = tempArr.join(",");
                    that.form.recieverNames += "..."
                } else {
                    that.form.recieverNames = tempArr.join(",");
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //添加接口
                        that.form.recievers = that.form.recievers.join(",");
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
                                        that.dialogFormVisible = false;
                                    })
                                } else {
                                    that.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    that.dialogFormVisible = false;
                                }
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //点击标题弹出详情框
            selectGg(data) {
                let that = this;
                this.dialogFormVisibleInfo = true;
                console.log(data);
                this.form.uuid = data.uuid;
                this.formInfo.senderName = data.senderName;
                this.formInfo.title = data.title;
                this.formInfo.content = data.content;
                this.$$queryFileList({
                    "relatedid": data.uuid
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
            }
        },
        created() {

            var that = this
            this.$$request({
                url: this.$api.homeApi.getLoginUserList,
                data: {}
            }).then(function (res) {
                that.reciverList = res.info;
            })
        }
    }
</script>

<style scoped>
    .fj_list {
        cursor: pointer;
    }
    .fj_list:hover{
        color: #03A9F4;
    }

    .rc {
        width: 820px;
    }
    .task-form-item{
        margin-left: 200px;
        display: inline-block;
    }

    .task-btn-item {
        padding-top: 0;
        display: inline-block;
        margin-left: 0px;
        vertical-align: middle;
        float: left;
        padding-left: 10px;
    }

</style>