<template>
    <div class="tzggStyle">
        <!--富文本全屏-->
        <full-screen-editing key="fullEditer" v-if="fullDialogOpen" :fullDialogControl="fullDialogOpen"
                             :smallEditerContent="smallEditerContent"
                             @fullEditerContent="fullEditerContent($event)"></full-screen-editing>
        <!--弹窗内容-->
        <el-dialog
                :close-on-click-modal="false"
                title="新建"
                :visible.sync="dialogVisible"
                width="80%"
                height="900px"
                :modal="true"
                :lock-scroll="true"
                v-dialogDrag
                @close="handleClose">
            <div class="el-dialog-div">
                <el-form :model="proclamationForm" :rules="rules" ref="proclamationForm" label-width="90px"
                         class="demo-ruleForm">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="proclamationForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="是否置顶" prop="isTop">
                        <el-switch v-model="proclamationForm.isTop" active-value="1" inactive-value="0"></el-switch>
                    </el-form-item>
                    <!--富文本编辑-->
                    <el-form-item label="内容" prop="content">
                        <rich
                                :setContent="setContent"
                                :editorOption="editorOption"
                                @onEditorChange="onEditorChange($event)"
                                @onEditorReady="onEditorReady($event)"
                                :uploadUrl="uploadUrl"
                        >
                        </rich>
                        <!--富文本全屏-->
                        <el-form-item style="padding-left: 85%;padding-top: 5px">
                            全屏：
                            <el-button type="info" icon="el-icon-full-screen" circle
                                       @click="openFullEditer"></el-button>
                        </el-form-item>
                    </el-form-item>
                    <!--<el-form-item label="附件" prop="fj">
                        <p key="myTip" v-if="showTip" style="font-size: 10px"><i class="el-icon-warning"></i>请先保存后再上传附件
                        </p>
                        <cy-upload key="upload" v-if="allowUpload" :file-num="fileNum" :auto-up="true"
                                   :relatedId="relatedId">
                        </cy-upload>
                    </el-form-item>-->
                    <el-form-item label="附件" prop="cyUpload">
                        <cyUpload ref="upload" :file-num="fileNum" :auto-up="true" :relatedId="relatedId"></cyUpload>
                    </el-form-item>
                    <el-form-item style="padding-left: 35%">
                        <el-button type="primary" @click="saveForm('proclamationForm')">保存</el-button>
                        <el-button @click="releaseForm('proclamationForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import rich from '@/components/richTextEditor/myRichTextEditor'
    import fullScreenEditing from "./fullScreenEditing";
    import cyUpload from '@/components/upAndDown/cyUpload';

    export default {
        name: "tzggCreOperation",
        components: {
            cyUpload,
            rich,
            fullScreenEditing,
        },
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
                //暂存表单数据
                tempData: {
                    uuid: '', //保存完提交时传递全局变量
                    tempFile: [], //暂存附件
                },
                //上传
                showTip: this.dialogData.showTip, //上传提示
                allowUpload: this.dialogData.allowUpload,  //是否上传判断
                fileNum: 100,  //最大上传数
                relatedId: this.dialogData.uuid,  //附件关联ID
                //全屏富文本编辑
                smallEditerContent: {},  //富文本内容（用于回传全屏富文本）
                fullDialogOpen: false,  //全屏富文本弹窗控制
                dialogVisible: this.taVisible, //编辑页弹窗控制
                //编辑页表单数据
                proclamationForm: {
                    uuid: this.dialogData.uuid ? this.dialogData.uuid : "",
                    proclamationDm: this.dialogData.fromType,
                    title: this.dialogData.title ? this.dialogData.title : "",
                    isTop: this.dialogData.isTop ? this.dialogData.isTop : "1",
                    content: this.dialogData.content ? this.dialogData.content : "",
                    approvalDm: this.dialogData.spType,
                    tableid: this.dialogData.uuid ? this.dialogData.uuid : "",
                },
                setContent: '', //富文本内容获取
                rules: {
                    title: [
                        {required: true, message: '请输入标题!'},
                        {max: 100, message: '请输入不超过100字！'}
                    ],
                    content: [
                        {required: true, message: '请输入内容!'},
                        {max: 10000, message: '请输入不超过10000字！', trigger: 'blur'}
                    ],
                },
                //文本编辑
                uploadUrl: '', //图片上传地址
                editorOption: { // 配置信息
                    placeholder: "请输入内容...",
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            [{'font': []}],
                            [{'color': []}, {'background': []}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image', 'video'],
                        ]
                        ,
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        }
                    }
                },
                currentFileData: {},  //当前文本内容
                fileList: this.defultFileList
            }
        },
        created() {
            //获取全屏富文本信息
            this.setContent = this.proclamationForm.content
            //打开弹窗时获取到已上传附件
            this.fileCheck()
        },
        watch: {},
        methods: {
            //打开弹窗时获取到已上传附件
            fileCheck() {
                const that = this
                if (this.dialogData.uuid !== '' && this.dialogData.uuid) {
                    this.$$request({
                        method: 'post',
                        url: this.$api.upload.queryFileList,
                        data: {
                            relatedid: this.dialogData.uuid
                        }
                    }).then((res) => {
                        if (res.info.length > 0) {
                            res.info.forEach((item) => {
                                that.tempData.tempFile.push(item)
                            })
                        }
                    })
                }
            },
            //打开全屏富文本编辑
            openFullEditer() {
                const that = this
                that.smallEditerContent = this.getContent
                this.fullDialogOpen = true
            },
            //全屏富文本编辑返回数据
            fullEditerContent(fullContent) {
                this.fullDialogOpen = false
                if (fullContent == false) {
                    this.fullDialogOpen = false
                } else {
                    this.setContent = fullContent
                    this.fullDialogOpen = false
                }
            },
            //弹窗关闭
            handleClose() {
                this.tempData = ''
                this.content = ''
                this.dialogVisible = false;
                this.allowUplaod = false;
                this.$emit("refreshTable", true)
            },
            //提交之前进行保存加载tableid
            loadData() {
                this.$emit("refreshTable", false)
            },
            //富文本回调
            onEditorReady(quill) {
            },
            //富文本回传
            onEditorChange({quill, html, text}) {
                this.getContent = html
                this.setContent = html
            },
            //旧保存方法（好使）
            saveForm(proclamationForm) {
                const that = this;
                //弹窗不关闭暂存uuid，用于控制重复提交
                const tempId = this.tempData.uuid
                if (tempId) {
                    this.proclamationForm.uuid = tempId;
                }
                //获取富文本编辑框内容赋给表单
                this.proclamationForm.content = this.getContent
                if (that.proclamationForm.uuid == null || that.proclamationForm.uuid == '') {
                    that.$refs[proclamationForm].validate((valid) => {
                        if (valid) {
                            //保存
                            that.$axios({
                                method: 'post',
                                url: that.$api.xtglApi.xtglTzggSave,
                                data: that.proclamationForm
                            }).then(function (res) {
                                that.relatedId = res.info.uuid;
                                if (res.result === 1) {
                                    that.tempData.uuid = res.info.uuid  //暂存uuid
                                    let fileList = that.$refs.upload.fileList; //判断是否有附件，有则上传
                                    if (fileList.length > 0) {
                                        let MD5Paths = [],
                                            fileNames = [];
                                        fileList.forEach((item) => {
                                            MD5Paths.push(item.url);
                                            fileNames.push(item.name);
                                        })
                                        let param = {
                                            "relatedid": res.info.uuid,
                                            "MD5Path": MD5Paths.join(','),
                                            "fileName": fileNames.join(',')
                                        }
                                        that.fileList = that.$refs.upload.fileList
                                        that.$$insertFileInfoBatch(param).then((resdata) => {
                                            that.$message({
                                                message: '操作成功',
                                                type: 'success'
                                            });
                                            that.tempData.tempFile = that.$refs.upload.fileList;  //暂存新上传附件
                                            //that.dialogFormVisible = false; //保存成功不关闭弹窗
                                        }).catch(function (err) {
                                            that.$message({
                                                message: '关联附件列表失败',
                                                type: 'warning'
                                            });
                                            //that.dialogFormVisible = false; //保存成功不关闭弹窗
                                        })
                                    } else {
                                        that.$message({
                                            message: res.msg,
                                            type: 'success'
                                        });
                                        //that.dialogFormVisible = false; //保存成功不关闭弹窗
                                    }
                                }
                                //保存完成后弹窗不关闭
                                //that.handleClose()
                                //that.proclamationForm = ''
                            })
                        } else {
                            return false;
                        }
                    });
                } else {
                    //更新
                    this.relatedId = that.proclamationForm.uuid
                    that.$axios({
                        method: 'post',
                        url: that.$api.xtglApi.xtglTzggUpdate,
                        data: that.proclamationForm
                    }).then(function (res) {
                        if (res.result === 1) {
                            let fileList = that.$refs.upload.fileList //所有文件列表
                            //如果有文件则进行新旧文件判断
                            if (fileList.length > 0) {
                                let allFile = []  //提取的所有文件信息
                                let uploadFile = [] //过滤完准备上传文件
                                let oldFileList = that.tempData.tempFile //旧文件列表
                                //获取所有文件信息用于比较md5值过滤
                                that.$$request({
                                    method: 'post',
                                    url: that.$api.upload.queryFileList,
                                    data: {
                                        relatedid: res.info.uuid
                                    }
                                }).then((res) => {
                                    allFile = res.info
                                })
                                //过滤旧文件
                                allFile.forEach((item) => {
                                    for (let oldFile of oldFileList) {
                                        if (oldFile.md5path !== item.md5path) {
                                            uploadFile.push(oldFile)
                                        }
                                    }
                                })
                                //如果有新文件则进行上传处理
                                if (uploadFile.length > 0) {
                                    //开始上传
                                    let MD5Paths = [],
                                        fileNames = [];
                                    uploadFile.forEach((item) => {
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
                                            message: '操作成功',
                                            type: 'success'
                                        });
                                        that.tempData.tempFile = that.$refs.upload.fileList;  //暂存新上传文件
                                        //that.dialogFormVisible = false; //弹窗不关闭
                                    }).catch(function (err) {
                                        that.$message({
                                            message: '关联附件列表失败',
                                            type: 'warning'
                                        });
                                        //that.dialogFormVisible = false; //弹窗不关闭
                                    })
                                } else {
                                    that.$message({
                                        message: res.msg,
                                        type: 'success'
                                    });
                                }
                            } else {
                                that.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                            }
                            that.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        } else {
                            that.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }

                    })
                    /*弹窗不关闭*/
                    //that.handleClose()
                    //that.proclamationForm = ''
                    //that.content = ''
                }
            },
            //旧提交
            releaseForm(proclamationForm) {
                const that = this;
                //弹窗不关闭暂存uuid，用于控制重复提交
                const tempId = this.tempData.uuid
                if (tempId) {
                    this.proclamationForm.uuid = tempId;
                }
                this.proclamationForm.content = this.getContent //获取富文本内容
                if (this.proclamationForm.uuid === null || this.proclamationForm.uuid === "") {
                    this.$refs[proclamationForm].validate((valid) => {
                        if (valid) {   //判空校验
                            //先保存后提交
                            this.$axios({
                                method: 'post',
                                url: this.$api.xtglApi.xtglTzggSave,
                                data: this.proclamationForm
                            }).then(function (res) {
                                if (res.result === 1) {
                                    return res.info.uuid
                                }
                            }).then((id) => {
                                let fileList = that.$refs.upload.fileList;
                                //有则上传附件
                                if (fileList.length > 0) {
                                    let MD5Paths = [],
                                        fileNames = [];
                                    fileList.forEach((item) => {
                                        MD5Paths.push(item.url);
                                        fileNames.push(item.name);
                                    })
                                    let param = {
                                        "relatedid": id,
                                        "MD5Path": MD5Paths.join(','),
                                        "fileName": fileNames.join(',')
                                    }
                                    that.$$insertFileInfoBatch(param).then((resdata) => {
                                        //附件上传成功则提交（注意参数）
                                        that.proclamationForm.tableid = id;
                                        that.proclamationForm.uuid = '';
                                        that.$axios({
                                            method: 'post',
                                            url: that.$api.xtglApi.xtglTzggSubmit,
                                            data: that.proclamationForm
                                        }).then(function (res) {
                                            if (res.result === 1) {
                                                that.$message({
                                                    message: res.msg,
                                                    type: 'success'
                                                });
                                            }
                                            that.handleClose()
                                            that.proclamationForm = ''
                                        }).catch(function (err) {
                                            that.$alert(err, "系统异常，请联系管理员！", {});
                                        })
                                    })
                                } else {
                                    //无附件则直接提交
                                    that.proclamationForm.tableid = id;
                                    that.$axios({
                                        method: 'post',
                                        url: that.$api.xtglApi.xtglTzggSubmit,
                                        data: that.proclamationForm
                                    }).then(function (res) {
                                        if (res.result === 1) {
                                            that.$message({
                                                message: res.msg,
                                                type: 'success'
                                            });
                                        }
                                        that.handleClose()
                                        that.proclamationForm = ''
                                    }).catch(function (err) {
                                        that.$alert(err, "系统异常，请联系管理员！", {});
                                    })
                                }
                            }).catch(function (err) {
                                that.$alert(err, "系统异常，请联系管理员！", {});
                            })
                        } else {
                            return false;
                        }
                    });
                } else {
                    //更新提交
                    this.$axios({
                        method: 'post',
                        url: this.$api.xtglApi.xtglTzggUpdate,
                        data: this.proclamationForm
                    }).then(function (res) {
                        if (res.result == 1) {
                            return res.info.uuid
                        }
                    }).then((id) => {
                        let fileList = that.$refs.upload.fileList;
                        //有则上传附件
                        if (fileList.length > 0) {
                            let MD5Paths = [],
                                fileNames = [];
                            fileList.forEach((item) => {
                                MD5Paths.push(item.url);
                                fileNames.push(item.name);
                            })
                            let param = {
                                "relatedid": id,
                                "MD5Path": MD5Paths.join(','),
                                "fileName": fileNames.join(',')
                            }
                            that.$$insertFileInfoBatch(param).then((resdata) => {
                                that.proclamationForm.tableid = id;
                                that.proclamationForm.uuid = '';
                                that.$axios({
                                    method: 'post',
                                    url: that.$api.xtglApi.xtglTzggSubmit,
                                    data: that.proclamationForm
                                }).then(function (res) {
                                    if (res.result === 1) {
                                        that.$message({
                                            message: res.msg,
                                            type: 'success'
                                        });
                                    }
                                    that.handleClose()
                                    that.proclamationForm = ''
                                }).catch(function (err) {
                                    that.$alert(err, "系统异常，请联系管理员！", {});
                                })
                            })
                        } else {
                            //无附件则直接提交
                            that.proclamationForm.tableid = id;
                            that.proclamationForm.uuid = '';
                            that.$axios({
                                method: 'post',
                                url: that.$api.xtglApi.xtglTzggSubmit,
                                data: that.proclamationForm
                            }).then(function (res) {
                                if (res.result === 1) {
                                    that.$message({
                                        message: res.msg,
                                        type: 'success'
                                    });
                                }
                                that.handleClose()
                                that.proclamationForm = ''
                            }).catch(function (err) {
                                that.$alert(err, "系统异常，请联系管理员！", {});
                            })
                        }
                    }).catch(function (err) {
                        that.$alert(err, "系统异常，请联系管理员！", {});
                    })
                }
            },

            /*=================后续优化===============*/
            //保存
            saveFunc(proclamationForm) {
                const that = this;
                const tempId = this.tempData.uuid
                if (tempId) {
                    this.proclamationForm.uuid = tempId;
                }
                this.proclamationForm.content = this.getContent
                if (that.proclamationForm.uuid == null || that.proclamationForm.uuid == '') {
                    that.$refs[proclamationForm].validate((valid) => {
                        if (valid) {
                            this.asyncSaveForm().then(resdata => {
                                if (resdata.result === 1) {
                                    let fileList = that.$refs.upload.fileList;
                                    if (fileList.length > 0) {
                                        const saveForm = that.proclamationForm
                                        saveForm.uuid = resdata.info.uuid;
                                        this.asyncUploadFile(saveForm).then(res => {
                                            that.$message({
                                                message: resdata.msg,
                                                type: 'success'
                                            });
                                            that.tempData.uuid = resdata.info.uuid;//暂存表单不关闭时的uuid
                                            that.tempFileList = that.$refs.upload.fileList;  //暂存新上传附件
                                        })
                                    } else {
                                        that.$message({
                                            message: resdata.msg,
                                            type: 'success'
                                        });
                                    }
                                } else {
                                    that.$message({
                                        message: resdata.msg,
                                        type: 'error'
                                    });
                                }
                            }).catch(function (err) {
                                that.$alert(err, "系统异常，请联系管理员！", {});
                            })
                        } else {
                            return false;
                        }
                    })
                } else {
                    //this.relatedId = that.proclamationForm.uuid
                    this.asyncUpdateForm(that.proclamationForm).then(resdata => {
                        if (resdata.result === 1) {
                            let fileList = that.$refs.upload.fileList;
                            if (fileList.length > 0) {
                                const saveForm = that.proclamationForm
                                saveForm.uuid = resdata.info.uuid;
                                this.asyncUploadFile(saveForm).then(res => {
                                    that.$message({
                                        message: resdata.msg,
                                        type: 'success'
                                    });
                                    that.tempData.uuid = resdata.info.uuid;//暂存表单不关闭时的uuid
                                    that.tempFileList = that.$refs.upload.fileList
                                })
                            }
                        } else {
                            that.$message({
                                message: resdata.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function (err) {
                        that.$alert(err, "系统异常，请联系管理员！", {});
                    })
                }
            },
            //提交
            releaseFunc(proclamationForm) {
                const that = this;
                const tempId = this.tempData.uuid
                if (tempId) {
                    this.proclamationForm.uuid = tempId;
                }
                this.proclamationForm.content = this.getContent
                if (this.proclamationForm.uuid === null || this.proclamationForm.uuid === "") {
                    this.$refs[proclamationForm].validate((valid) => {
                        if (valid) {
                            this.asyncSaveForm().then(res => {
                                that.relatedId = res.info.uuid
                                that.proclamationForm.tableid = res.info.uuid
                                that.proclamationForm.uuid = ''
                                if (res.result === 1) {
                                    this.asyncInsertFile(that.relatedId, that.proclamationForm).then((res, submitForm) => {
                                        this.asyncSubmit(submitForm).then(res => {
                                            if (res.result === 1) {
                                                return true
                                            } else {
                                                that.$message({
                                                    message: '操作失败',
                                                    type: 'error'
                                                });
                                                return false
                                            }
                                        })
                                    }).catch(function (err) {
                                        that.$alert(err, "系统异常，请联系管理员！", {});
                                    })
                                    that.$message({
                                        message: res.msg,
                                        type: 'success'
                                    });
                                    that.handleClose()
                                    that.proclamationForm = ''
                                } else {
                                    that.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                            }).catch(function (err) {
                                that.$alert(err, "系统异常，请联系管理员！", {});
                            })
                        } else {
                            return false
                        }
                    })
                } else {
                    this.$refs[proclamationForm].validate((valid) => {
                        if (valid) {
                            this.asyncUpdateForm(that.proclamationForm).then(res => {
                                that.relatedId = res.info.uuid;
                                that.proclamationForm.tableid = res.info.uuid
                                that.proclamationForm.uuid = ''
                                if (res.result === 1) {
                                    this.asyncInsertFile(that.relatedId, that.proclamationForm).then(res, submitForm => {
                                        this.asyncSubmit(submitForm).then(res => {
                                            if (res.result === 1) {
                                                return true
                                            } else {
                                                that.$message({
                                                    message: '操作失败',
                                                    type: 'error'
                                                });
                                                return false
                                            }
                                        })
                                    }).catch(function (err) {
                                        that.$alert(err, "系统异常，请联系管理员！", {});
                                    })
                                    that.$message({
                                        message: res.msg,
                                        type: 'success'
                                    });
                                    that.handleClose()
                                    that.proclamationForm = ''
                                } else {
                                    that.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                            }).catch(function (err) {
                                that.$alert(err, "系统异常，请联系管理员！", {});
                            })
                        }
                    })
                }
            },
            /*异步保存*/
            asyncSaveForm() {
                let that = this;
                const promise = new Promise((resolve, reject) => {
                    that.$axios({
                        method: 'post',
                        url: that.$api.xtglApi.xtglTzggSave,
                        data: that.proclamationForm
                    }).then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                    })
                })
                return promise;
            },
            /*异步更新*/
            asyncUpdateForm(proclamationForm) {
                let that = this;
                const promise = new Promise((resolve, reject) => {
                    that.$axios({
                        method: 'post',
                        url: that.$api.xtglApi.xtglTzggUpdate,
                        data: proclamationForm
                    }).then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                    })
                })
                return promise;
            },
            /*关联附件列表*/
            asyncInsertFile(uuid, submitForm) {
                let that = this;
                const promise = new Promise((resolve, reject) => {
                    let fileList = that.$refs.upload.fileList;
                    if (fileList.length > 0) {
                        let MD5Paths = [],
                            fileNames = [];
                        fileList.forEach((item) => {
                            MD5Paths.push(item.url);
                            fileNames.push(item.name);
                        })
                        let param = {
                            "relatedid": uuid,
                            "MD5Path": MD5Paths.join(','),
                            "fileName": fileNames.join(',')
                        }
                        that.$axios({
                            method: 'post',
                            url: that.$api.upload.insertFileInfoBatch,
                            data: param
                        }).then((res) => {
                            resolve(res, submitForm)
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        alert("上传没进！")
                    }
                })
                return promise;
            },
            //上传附件
            asyncUploadFile(saveForm) {
                let that = this;
                const promise = new Promise((resolve, reject) => {
                    let param = {} //上传参数
                    let MD5Paths = [], fileNames = []  //附件参数
                    let oldFileList = that.tempFileList  //本条数据已有附件
                    let newFileList = that.$refs.upload.fileList //更新时上传新附件
                    //只上传新文件
                    if ((oldFileList) && newFileList.length > 0) {
                        let isNewFile = true
                        newFileList.forEach((newFile) => {
                            for (let i = 0; i < oldFileList.length; i++) {
                                let oldFile = oldFileList[i]
                                if (newFile.url !== oldFile.url && newFile.name !== newFile.name) {
                                    isNewFile = false
                                    break
                                }
                            }
                            if (isNewFile) {
                                // 不要重复添加
                                if (MD5Paths.indexOf(newFile.url) == -1) {
                                    MD5Paths.push(newFile.url)
                                    fileNames.push(newFile.name)
                                }
                            }
                            param = {
                                "relatedid": saveForm.uuid,
                                "MD5Path": MD5Paths.join(','),
                                "fileName": fileNames.join(',')
                            }
                            that.$refs.upload.fileList.push(param);
                        })
                    } else {
                        newFileList.forEach((item) => {
                            MD5Paths.push(item.url);
                            fileNames.push(item.name);
                        })
                        param = {
                            "relatedid": saveForm.uuid,
                            "MD5Path": MD5Paths.join(','),
                            "fileName": fileNames.join(',')
                        }
                        that.$refs.upload.fileList.push(param);
                    }
                    that.$axios({
                        method: 'post',
                        url: that.$api.upload.insertFileInfoBatch,
                        data: param
                    }).then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                    })
                    return promise;
                })
            },
            // 检测是否有新附件需要上传
            UploadFileCheck(res) {
                const that = this
                let param = {}
                let MD5Paths = [], fileNames = []
                let newFileList = that.$refs.upload.fileList
                if (newFileList.length > 0) {
                    newFileList.forEach((outerItem) => {
                        let flag = true
                        for (let i = 0; i < that.fileList.length; i++) {
                            let innerItem = that.fileList[i]
                            if (outerItem.url == innerItem.url && outerItem.name == innerItem.name) {
                                flag = false
                                break
                            }
                        }
                        // 如果是新文件
                        if (flag) {
                            // 判断是否包含
                            if (MD5Paths.indexOf(outerItem.url) == -1) {
                                MD5Paths.push(outerItem.url)
                                fileNames.push(outerItem.name)
                            }
                        }
                    })
                    param = {
                        "relatedid": res.info.uuid,
                        "MD5Path": MD5Paths.join(','),
                        "fileName": fileNames.join(',')
                    }
                } else {
                    that.$message({
                        message: '新增成功',
                        type: 'success'
                    })
                }
                return param
            },
            /* asyncInsertFile(uuid,submitForm)
             {
                 let that = this;
                 const promise = new Promise((resolve, reject) => {
                     let fileList = that.$refs.upload.fileList;
                     if (fileList.length > 0) {
                         let MD5Paths = [],
                             fileNames = [];
                         fileList.forEach((item) => {
                             MD5Paths.push(item.url);
                             fileNames.push(item.name);
                         })
                         let param = {
                             "relatedid": uuid,
                             "MD5Path": MD5Paths.join(','),
                             "fileName": fileNames.join(',')
                         }
                         that.$$insertFileInfoBatch(param).then((res) => {
                             resolve(res,submitForm)
                         }).catch((err) => {
                             reject(err)
                         })
                     } else {
                         resolve()
                     }
                 })
                 return promise;
             },*/
            /*异步提交*/
            asyncSubmit(submitForm) {
                let that = this;
                const promise = new Promise((resolve, reject) => {
                    that.$axios({
                        method: 'post',
                        url: that.$api.xtglApi.xtglTzggSubmit,
                        data: submitForm
                    }).then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                    })
                })
                return promise;
            },
            /*=================后续优化===============*/

        },
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
<style scoped lang="less">
    /*调*/
    .tzggStyle /deep/ .ql-bubble .ql-picker {
        height: 40px
    }

    #formPage {
        margin: 10px auto;
        width: 80%;
        padding: 0px 22px;
        box-sizing: border-box;
        background-color: #fff
    }

    .tzggStyle /deep/ .el-select__caret el-input__icon el-icon-arrow-up {
        width: 5px
    }

    .tzggStyle /deep/ .el-dialog {
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

    .tzggStyle /deep/ .el-dialog .el-dialog__body {
        flex: 1;
        overflow: auto;
    }

    .tzggStyle /deep/ .ql-container.ql-snow {
        min-height: 200px;
    }

    .el-dialog-div {
        overflow: auto;
    }

    .tzggStyle /deep/ .el-dialog__body::-webkit-scrollbar {
        width: 2px;
        height: 100%;
    }

    .myupload .el-dialog__body {
        padding: 10px 20px;
        font-size: 16px;
    }

    .myupload .el-dialog__body-myi {
        color: #EED46F;
        margin-right: 20px;
    }

    .mytip {
        font-size: 12px;
        color: #909399;
        margin: 3px;
    }

    .tzggStyle /deep/ .editor {
        line-height: normal !important;
        height: 500px;
    }

    .ql-snow .ql-tooltip[data-mode=link]::before {
        content: "请输入链接地址:";
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '14px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
        content: '10px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
        content: '18px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
        content: '32px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '文本';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: '标题1';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: '标题2';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: '标题3';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: '标题4';
    }
</style>
