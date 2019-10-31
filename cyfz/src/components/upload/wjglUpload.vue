<!--文件管理文件上传，满足业务模块-->
<template>
    <div class="myupload">
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
            <el-button slot="trigger" size="small" type="primary" icon="el-icon-circle-plus">选取文件</el-button>
            <el-button v-if="!autoUp" style="margin-left: 10px;" size="small" type="success"
                       @click="submitUpload"
                       icon="el-icon-upload">
                上传文件
            </el-button>
            <el-button v-if="downAll" style="margin-left: 10px;" size="small" type="success" @click="downloadAll"
                       icon="el-icon-download">
                批量下载
            </el-button>
            <div slot="tip" class="mytip">
                <slot name="mytip"></slot>
            </div>
        </el-upload>
        <el-dialog v-if="downAndPreview"
                   title="提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :close="dialogClose">
            <span><i class="el-icon-warning el-dialog__body-myi"></i>对该文件进行预览或者下载？</span>
            <span slot="footer" class="dialog-footer">
         <el-button size='small' type="primary" @click="preViewFile">文件预览</el-button>
         <el-button size='small' type="primary" @click="downloadFile">文件下载</el-button>
         <el-button size='small' @click="dialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'

    // const reqUrl = 'http://10.2.52.23:9110'//开发环境使用
    // window.location.host 测试或生产环境使用

    function noop() {
    }

    export default {
        name: 'wjglUpload',
        props: {
            defaultFileList: {
                type: Array,
                default: () => [],
                required: false
            },
            autoUp: {
                type: Boolean,
                default: false,
            },
            downAll: {
                type: Boolean,
                default: false,
            },
            downAndPreview: {
                type: Boolean,
                default: false,
            },
            showFileList: {
                type: Boolean,
                default: true,
            },
            md5CheckParams: {
                type: Object,
                default: () => ({//md5校验需要的参数
                    userId: '222222',
                    moduleName: 'CheckForFrontEnd'
                })
            },
            upLoadParams: {
                type: Object,
                default: () => ({//上传需要的其他参数
                    userId: '222222',
                    moduleName: 'CheckForFrontEnd'
                })
            },
            downLoadOneParams: {
                type: Object,
                default: () => ({//下载需要的参数
                    isPreview: 1,
                    forceDocx: 1,
                    webOffice: 1,
                    wordWaterMark: 1,
                    isWpsSecure: 1,
                    caToken: 1,
                    waterMark: 1,
                })
            },
            downLoadAllParams: {
                type: Object,
                default: () => ({//下载需要的参数
                    waterMark: 1,
                    zipName: 'zipDownload',
                })
            },
            getPdfPathParams: {
                type: Object,
                default: () => ({
                    isPreview: 1,
                    forceRefresh: 1,
                    xdocPdf: 1,
                })
            },
            onUpSuccess: {
                type: Function,
                default: noop
            },
            onUpError: {
                type: Function,
                default: noop
            },
            onUpProgress: {
                type: Function,
                default: noop
            },
            onUpChange: {
                type: Function,
                default: noop
            },
            onUpRemove: {
                type: Function,
                default: noop
            },
            onUpDownloadOne: {
                type: Function,
                default: noop
            },
            onUpDownloadMany: {
                type: Function,
                default: noop
            },
        },
        data() {
            return {
                dialogVisible: false,
                currentFileData: {},
                fileList: this.defaultFileList
            }
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit()
            },
            beforeUpload(file) {
                // console.log(file)
            },
            toUpload(params) {
                let this_ = this
                console.log(params)
                let file = params.file
                let formData = new FormData()
                if (this.upLoadParams.glbdId) {
                    formData.append('glbdId', this.upLoadParams.glbdId)
                }
                if (this.upLoadParams.wlwjlxDm) {
                    formData.append('wlwjlxDm', this.upLoadParams.wlwjlxDm)
                }
                formData.append('file', file)
                let config = {
                    headers: {
                        'Content-type': 'multipart/form-data',
                    },
                    onUploadProgress: progressEvent => {
                        let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
                        //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                        params.onProgress({percent: percent})
                    }
                }
                axios.post(this.$api.wjglApi.Zh001saveFile, formData, config).then(function (response) {
                    console.log(response)
                    //上传成功 调用onSuccess方法，否则没有完成图标
                    //处理自己的逻辑
                    params.onSuccess(response.info)
                }).catch(function (error) {
                    console.log(error)
                    //上传失败 调用onError方法
                    //处理自己的逻辑
                    params.onError(error)
                })
            },
            toUploadSuccess(response, file, fileList) {
                this.onUpSuccess(response, file, fileList);
            },
            toUploadError(err, file, fileList) {
                this.onUpError(err, file, fileList);
            },
            toUploadProgress(event, file, fileList) {
                this.onUpProgress(event, file, fileList)
            },
            handleChange(file, fileList) {
                this.onUpChange(file, fileList)
            },
            beforeRemove(file, fileList) {
                console.log(file);
                console.log(fileList)
                if (!!this.onUpRemove && this.onUpRemove.name != "noop") {
                    this.onUpRemove(file, fileList);
                } else {
                    let that = this;
                    this.$confirm(`确定移除该文件？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (file.status === 'success') {
                            that.$axios({
                                method: 'post',
                                url: this.$api.wjglApi.Zh001deleteFile,
                                data: {
                                    id: file.response.id,
                                }
                            }).then(function (response) {
                                if (response.msg) {
                                    that.handleRemove(file, fileList)
                                }
                                that.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                            }).catch(function (error) {
                                that.$message({
                                    type: 'error',
                                    message: '删除失败'
                                })
                            })
                        } else {
                            that.handleRemove(file, fileList)
                        }
                    }).catch(() => {
                        that.$message({
                            type: 'error',
                            message: '删除失败'
                        })
                    })


                    /*let that = this;
                    this.$confirm(`确定移除该文件？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (file.status === 'success') {//上传到文件服务器的
                            that.$axios({
                                method: 'post',
                                url: this.$api.upload.deleteUpLoad,
                                data: {
                                    md5Path: file.response.md5Path,
                                }
                            }).then(function (response) {
                                console.log(response);
                                if (response.msg) {
                                    that.handleRemove(file, fileList)
                                }
                            }).catch(function (error) {
                                that.$message({
                                    type: 'warning',
                                    message: '删除失败'
                                })
                            })
                        } else {
                            that.handleRemove(file, fileList)
                        }
                    }).catch(() => {
                        that.$message({
                            type: 'warning',
                            message: '删除失败'
                        })
                    })*/
                }
                return false
            },
            handleRemove(file, fileList) {
                if (file.status === "success") {
                    for (let i = 0; i < fileList.length; i++) {
                        if (fileList[i].response.id === file.response.id) {
                            fileList.splice(i, 1);
                            this.fileList = fileList
                            console.log(this.fileList)
                            break;
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
            }
            ,

            handlePreview(file) {
                console.log(file)
                if (file.hasOwnProperty('status') && file.status === 'success') {
                    this.currentFileData = file
                    this.dialogVisible = true
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请先上传，再对文件进行预览或下载'
                    })
                }
            }
            ,
            preViewFile() {//文件预览

                if (this.currentFileData.hasOwnProperty('response') && !!this.currentFileData.response.md5Path) {
                    let name = this.currentFileData.name.split('.')[1];
                    let that = this;
                    console.log(name)
                    let url = that.$api.upload.reqUrl + that.$api.upload.preview + '?md5Path='
                    if (name === 'pdf') {
                        window.open(url + this.currentFileData.response.md5Path + '&waterMark=1&forceRefresh=1', '_blank')
                    } else {//非pdf文件获取pdf地址
                        this.$axios({
                            method: 'post',
                            url: that.$api.upload.getPdfPath,
                            data: Object.assign({
                                md5Path: this.currentFileData.response.md5Path,
                                isPreview: 1,
                                forceRefresh: 1,
                                xdocPdf: 1,
                            }, this.getPdfPathParams)
                        }).then(function (res) {
                            console.log(res)
                            if (res.msg.indexOf('@') !== -1) {
                                window.open(url + res.msg + '&waterMark=1&forceRefresh=1', '_blank')
                            } else {
                                that.$message({
                                    type: 'info',
                                    message: '预览失败，请检查文件路径！'
                                })
                            }
                        }).catch(function (error) {
                            console.log(error)
                            that.$message({
                                type: 'info',
                                message: '获取pdf路径失败！'
                            })
                        })
                    }
                    this.dialogVisible = false
                } else {
                    this.$message({
                        type: 'info',
                        message: '预览失败，请检查文件路径！'
                    })
                }
            }
            ,
            downloadFile() {//form表单文件下载
                if (!!this.onUpDownloadOne && this.onUpDownloadOne.name != "noop") {
                    this.onUpDownloadOne(this.currentFileData);
                } else {
                    if (this.currentFileData.hasOwnProperty('response')) {
                        console.log(this.currentFileData)
                        let downloadOneParams = Object.assign({// 参数
                            md5Path: this.currentFileData.response.md5Path,
                        }, this.downLoadOneParams);
                        this.handeldownloadFile(downloadOneParams);
                    } else {
                        this.$message({
                            type: 'info',
                            message: '下载失败，请检查文件路径！'
                        })
                    }
                }
            }
            ,

            handeldownloadFile(Params) {
                let actoinURL = this.$api.upload.reqUrl + this.$api.upload.download
                let form = $('<form>')
                $('div.myupload').append(form)
                form.attr('style', 'display:none')
                // form.attr('target', '_blank')
                form.attr('method', 'post')
                form.attr('enctype', 'application/json')
                form.attr('action', actoinURL)//下载文件的请求路径
                for (let param in Params) {
                    let input = $('<input>')
                    input.attr('type', 'hidden')
                    input.attr('name', param)
                    input.attr('value', Params[param])
                    form.append(input)
                }
                form.submit()
                form.remove()
                this.dialogVisible = false
            }
            ,
            dialogClose() {
                this.currentFileData = {}
            }
            ,

            downloadAll() {
                if (!!this.onUpDownloadMany && this.onUpDownloadMany.name != "noop") {
                    this.onUpDownloadMany(this.fileList);
                } else {
                    let md5Path = [];
                    for (let fList of this.fileList) {
                        if (fList.status === 'success') {
                            md5Path.push(fList.response.md5Path)
                        }
                    }
                    console.log(md5Path);
                    let downloadAllParams = Object.assign({
                        md5Paths: md5Path,
                    }, this.downLoadAllParams);
                    this.handeldownloadAll(downloadAllParams)
                }
            }
            ,

            handeldownloadAll(Params) {//form打包下载文件
                console.log(Params);
                let zipName = Params.zipName;
                var fileDownload = require("js-file-download");
                // let config = {
                //     timeout: 600000,
                //     responseType:'blob',
                // }
                // this.$axios.post(this.$api.upload.downloadPackage,Params,config).then(function (res) {
                this.$axios({
                    method: 'post',
                    responseType: 'blob',
                    timeout: 600000,
                    url: this.$api.upload.downloadPackage,
                    data: Params
                }).then(function (res) {
                    fileDownload(res, zipName);
                }).catch(function (error) {
                    // console.log(error)
                    this.$message({
                        type: 'info',
                        message: '下载失败！'
                    })
                })
                /* let actoinURL = this.$api.upload.reqUrl + this.$api.upload.downloadPackage
                 let form = $('<form>')
                 $('div.myupload').append(form)
                 form.attr('style', 'display:none')
                 form.attr('method', 'post')
                 form.attr('enctype', 'application/json')
                 form.attr('action', actoinURL)//下载文件的请求路径
                 for (let param in Params) {
                     let input = $('<input>')
                     input.attr('type', 'hidden')
                     input.attr('name', param)
                     input.attr('value', Params[param])
                     form.append(input)
                 }
                 form.submit()
                 form.remove()*/
            }
            ,
            // downloadFileBlob () {}   blob文件下载，axios
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
