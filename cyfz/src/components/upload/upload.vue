<!---->
/**
*  附件上传组件
*  @params
***
*  autoUp 是否开启自动上传
*  downAll 是否可以批量下载
*  show-file-list 是否采用elementUi默认展示方式？
*  down-and-preview  show-file-list为true情况下是否可以预览和下载
*  show-table 和 show-file-list 只能一个为true 或者都为false 自定义 success 回调的展示
*  show-table  采用表格展示方式 false
*  columns 采用表格展示，需要配置表头
*  defaultFileList 初始化filelist数据
**/
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
                :on-exceed="handleExceed"
                :file-list="fileList"
                :auto-upload="autoUp"
                :show-file-list="showFileList"
                :limit="fileNum">
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
        <!--不使用默认展示方式，使用表格-->
        <upload-list v-if="showTable" :list-columns="columns" :list-data="fileList"
                     :list-type="listType"></upload-list>
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
    import uploadList from "./uploadList";

    function noop() {
    }

    export default {
        name: 'upload',
        props: {
            autoUp: {//自动上传
                type: Boolean,
                default: false,
            },
            downAll: {//下载全部
                type: Boolean,
                default: false,
            },
            showFileList: {//是否使用elementUi自带的展示方式
                type: Boolean,
                default: true,
            },
            showTable: {//是否使用elementUi自带的展示方式
                type: Boolean,
                default: false,
            },
            downAndPreview: {//elementUi展示是否可以预览
                type: Boolean,
                default: false,
            },
            fileNum: {
                type: Number,
                default: 10000,
            },
            listType: {
                type: String,
                default: "text",
            },
            defaultFileList: {//初始化list数据
                type: Array,
                default: () => [],
                required: false
            },
            columns: {//表格展示表头
                type: Array
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
        components: {
            uploadList,
        },
        data() {
            return {
                dialogVisible: false,
                fileList: this.defaultFileList,
            }
        },
        created() {
            this.defaultFileList.forEach((item, index) => {
                console.log(item)
            })
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
                            that.$$uploadFile(Object.assign(defaultParam, {progress:params.onProgress
                            })).then(function (response) {
                                console.log(response)
                                let resObj = {
                                    fileExt: response.fileExt,
                                    secretKey: response.secretKey,
                                    fileSize: response.fileSize,
                                    name: response.fileSrcName,
                                    url: response.url,
                                    md5:response.md5,
                                }
                                /*上传成功，加入表格*/
                                that.fileList.push(resObj)
                                /*目前接口不是业务接口，只能采用假数据拼接*/
                                /*that.fileList.push(Object.assign(resObj, {
                                    deptName: "白昱",
                                    date: that.getCurrentDateStr()
                                }));*/
                                //上传成功 调用onSuccess方法，否则没有完成图标
                                //处理自己的逻辑
                                params.onSuccess(Object.assign(resObj,response))
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
                            console.log(checkRes);
                            /*已上传，加入表格*/
                            console.log(params)
                            // this.fileList.push(checkRes.info);
                            /*目前接口不是业务接口，只能采用假数据拼接*/
                            let obj = {
                                name: params.file.name,
                                deptName: "白昱",
                                date: that.getCurrentDateStr()
                            }
                            console.log(Object.assign(checkRes, obj))
                            that.fileList.push(Object.assign(checkRes, obj))
                            params.onSuccess(checkRes)
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
                this.onUpSuccess(response, file, fileList);
            },
            toUploadError(err, file, fileList) {
                this.onUpError(err, file, fileList);
            },
            toUploadProgress(event, file, fileList) {
                this.onUpProgress(event, file, fileList)
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
                if (!!this.onUpRemove && this.onUpRemove.name != "noop") {
                    this.onUpRemove(file, fileList)
                    // this.onUpRemove(file, fileList).then(this.handleRemove(file, fileList));
                } else {
                    let that = this;
                    if (file.status === 'success') {
                        this.$confirm(`确定移除该文件？`, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

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
                        }).catch(() => {
                            that.$message({
                                type: 'error',
                                message: '删除失败'
                            })
                        })
                    } else {
                        that.handleRemove(file, fileList)
                    }
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
            },

            handlePreview(file) {
                console.log(file)
                if (file.hasOwnProperty('status') && file.status === 'success') {
                    this.currentFileData = file.response ? file.response : file;
                    this.dialogVisible = true
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请先上传，再对文件进行预览或下载'
                    })
                }
            },
            preViewFile() {//文件预览
                if (this.currentFileData.url) {
                    let name = this.currentFileData.name.split('.')[1];
                    let that = this;
                    console.log(name)
                    let url = that.$api.upload.reqUrl + that.$api.upload.preview + '?md5Path='
                    if (name === 'pdf') {
                        window.open(url + this.currentFileData.url,'_blank')
                    } else {//非pdf文件获取pdf地址
                        that.$message({
                            type: 'info',
                            message: '仅支持pdf预览，该文件需要先下载！'
                        })
                    }
                    this.dialogVisible = false
                } else {
                    this.$message({
                        type: 'info',
                        message: '预览失败，请检查文件路径！'
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
            //批量下载
            downloadAll() {
                let that = this;
                let md5Path = [];
                this.fileList.forEach((item, index) => {
                    console.log(item)
                    md5Path.push(item.md5Path)
                });
                let Params = Object.assign({//拼接参数
                    md5Paths: md5Path,
                }, this.downLoadAllParams);
                this.$$downloadPackage(Params).then(() => {
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
