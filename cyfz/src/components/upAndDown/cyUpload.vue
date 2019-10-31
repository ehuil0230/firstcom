<!---->
<template>
    <div class="myupload">
        <el-upload
                ref="upload"
                action="#"
                :http-request="toUpload"
                :on-progress="toUploadProgress"
                :on-success="toUploadSuccess"
                :on-error="toUploadError"
                :on-preview="handlePreview"
                :on-exceed="handleExceed"
                :before-remove="beforeRemove"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="autoUp"
                :limit="fileNum">
            <el-button slot="trigger" size="small" type="primary" icon="el-icon-circle-plus">选取文件</el-button>
            <el-button v-if="!autoUp" style="margin-left: 10px;" size="small" type="success"
                       @click="submitUpload"
                       icon="el-icon-upload">
                上传文件
            </el-button>
            <div slot="tip" class="mytip">
                <slot name="mytip"></slot>
            </div>
        </el-upload>
        <!--不使用默认展示方式，使用表格-->
        <el-dialog title="提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :close="dialogClose">
            <span><i class="el-icon-warning el-dialog__body-myi"></i>对该文件进行下载？</span>
            <span slot="footer" class="dialog-footer">
        <el-button size='small' type="primary" @click="downloadFile">文件下载</el-button>
        <el-button size='small' @click="dialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'cyUpload',
        props: {
            autoUp: {//自动上传
                type: Boolean,
                default: false,
            },
            fileNum: {
                type: Number,
                default: 10000,
            },
            relatedId: {
                type: String,
                default: '',
            }
        },
        data() {
            return {
                dialogVisible: false,
                fileList: [],
            }
        },
        created() {
            let that = this;
            /*请求业务接口*/
            if (this.relatedId !== "") {
                this.$$queryFileList({
                    "relatedid": this.relatedId
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
                    that.$message({
                        type: 'error',
                        message: "获取附件失败"
                    })
                })
            }
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit()
            },
            beforeUpload(file) {
                // console.log(file)
                /*if (this.listType === 'picture') {
                    const isJPG = file.type === 'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                        this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (!isLt2M) {
                        this.$message.error('上传图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
                } else {
                    return true
                }*/
            },
            toUpload(params) {
                let that = this;
                that.$$md5ByFile(params).then((res) => {
                    let defaultParam = {
                        file: params.file,
                        md5: res.md5
                    };
                    that.$$md5CheckByFile(Object.assign(defaultParam, that.md5CheckParams)).then((checkRes) => {
                        if (checkRes && checkRes.message === "正常上传") {
                            that.$$uploadFile(Object.assign(defaultParam, {
                                progress: params.onProgress
                            })).then(function (response) {
                                let resObj = {
                                    fileExt: response.fileExt,
                                    secretKey: response.secretKey,
                                    fileSize: response.fileSize,
                                    name: response.fileSrcName,
                                    url: response.url,
                                    md5: response.md5,
                                    relatedid: that.relatedId,
                                };
                                return resObj;
                            }).then((resObj) => {
                                if (this.relatedId !== "" && this.relatedId) {
                                    let param = {
                                        "relatedid": that.relatedId,
                                        "MD5Path": resObj.url,
                                        "fileName": resObj.name
                                    }
                                    that.$$insertFileInfo(param).then((res) => {
                                        console.log(res)
                                        let sucObj = {
                                            name: param.fileName,
                                            relatedid: param.relatedid,
                                            url: param.MD5Path,
                                            uuid: res.info
                                        }
                                        /*关联业务表成功，加入列表*/
                                        that.fileList.push(sucObj);
                                        //上传成功 调用onSuccess方法，否则没有完成图标,处理自己的逻辑
                                        // params.onSuccess(sucObj)
                                    }).catch(function (err) {
                                        that.$message({
                                            type: 'error',
                                            message: "上传失败"
                                        })
                                    })
                                } else {
                                    let sucObj = {
                                        name: resObj.name,
                                        url: resObj.url,
                                    }
                                    that.fileList.push(sucObj);
                                }
                            }).catch(() => {
                                that.$message({
                                    type: 'error',
                                    message: "上传失败"
                                })
                                //上传失败 调用onError方法
                                //处理自己的逻辑
                                params.onError(error)
                            })
                        } else if (checkRes && checkRes.message === "0") {
                            /*//上传成功 调用onSuccess方法，否则没有完成图标,处理自己的逻辑
                            params.onSuccess(sucObj)*/
                            console.log(checkRes);
                            /*已上传，加入表格*/
                            if (this.relatedId !== "" && this.relatedId) {
                                let obj = {
                                    "relatedid": that.relatedId,
                                    "MD5Path": checkRes.url,
                                    "fileName": params.file.name
                                }
                                that.$$insertFileInfo(obj).then((res) => {
                                    console.log(res)
                                    let sucObj = {
                                        name: obj.fileName,
                                        relatedid: obj.relatedid,
                                        url: obj.MD5Path,
                                        uuid: res.info
                                    }
                                    /*关联业务表成功，加入列表*/
                                    that.fileList.push(sucObj);

                                }).catch(function (err) {
                                    that.$message({
                                        type: 'error',
                                        message: "上传失败"
                                    })
                                })
                                params.onSuccess(checkRes)
                            } else {
                                let sucObj = {
                                    name: params.file.name,
                                    url: checkRes.url,
                                }
                                that.fileList.push(sucObj);
                            }
                        } else {
                            that.$message({
                                type: 'error',
                                message: "上传失败"
                            })
                        }
                    })
                })
            },
            toUploadSuccess(response, file, fileList) {
            },
            toUploadError(err, file, fileList) {
            },
            toUploadProgress(event, file, fileList) {
            },
            handleExceed() {
                this.$message({
                    type: "warning",
                    message: "文件个数不能超过" + this.fileNum + "个"
                })
            },
            handleChange(file, fileList) {
                this.onUpChange(file, fileList)
            },
            beforeRemove(file, fileList) {
                console.log(file);
                console.log(fileList)
                let that = this;
                if (file.status === 'success') {
                    this.$confirm(`确定移除该文件？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(file.uuid){
                            let param = {
                                "uuids": file.uuid
                            };
                            that.$$delMultiFile(param).then((res) => {
                                if (res.msg) {
                                    that.handleRemove(file, fileList)
                                }
                                that.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                            }).catch(function (err) {
                                that.$message({
                                    type: 'error',
                                    message: '删除失败'
                                })
                            })
                        }else{
                            that.handleRemove(file, fileList)
                        }
                    }).catch(() => {
                        that.$message({
                            type: 'info',
                            message: '取消删除'
                        })
                    })
                } else {
                    that.handleRemove(file, fileList)
                }
                return false
            },
            handleRemove(file, fileList) {
                if (file.status === "success") {
                    if(file.uuid){
                        for (let i = 0; i < fileList.length; i++) {
                            if (fileList[i].uuid === file.uuid) {
                                fileList.splice(i, 1);
                                this.fileList = fileList
                                break;
                            }
                        }
                    }else {
                        for (let i = 0; i < fileList.length; i++) {
                            if (fileList[i].uid === file.uid) {
                                fileList.splice(i, 1);
                                this.fileList = fileList
                                break;
                            }
                        }
                    }

                } else {
                    for (let i = 0; i < fileList.length; i++) {
                        if (fileList[i].uid === file.uid) {
                            fileList.splice(i, 1);
                            break;
                        }
                    }
                }
            },

            handlePreview(file) {
                console.log(file)
                if (file.hasOwnProperty('status') && file.status === 'success') {
                    this.currentFileData = file.response ? file.response : file;
                    this.dialogVisible = true
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请先上传，再对文件进行下载'
                    })
                }
            },
            /*单文件下载*/
            downloadFile() {
                let that = this;
                this.$$download(this.currentFileData).then(() => {
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
                this.dialogVisible = false
            },
            dialogClose() {
                this.currentFileData = {}
            },
        }
    }
</script>

<style>
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

</style>
