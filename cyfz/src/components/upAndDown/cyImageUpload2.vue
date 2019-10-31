<template>
    <div>
        <el-upload
                ref="upload"
                :class="{disabled: hideUpload}"
                action="#"
                list-type="picture-card"
                :auto-upload="autoUp"
                :limit="fileNum"
                :file-list="imageList"
                :http-request="toUpload"
                :before-upload="beforeImageUpload"
                :on-preview="handleImagePreview"
                :on-remove="handleImageRemove"
                :on-change="handleImageChange">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="previewDialogVisible">
            <img width="100%" :src="previewImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "cyImageUpload",
        props: {
            autoUp: {//自动上传
                type: Boolean,
                default: false,
            },
            fileNum: {
                type: Number,
                default: 1,
            },
            canPreview: {
                type: Boolean,
                default: true
            },
            canDelete: {
                type: Boolean,
                default: true
            },
            //是否能弹出默认的打开文件，默认禁止
            disableOpenFile: {
                type: Boolean,
                default: true
            },
            relatedId: {
                type: String,
                default: '',
                required: true
            }
        },
        components: {

        },
        data() {
            return {
                image: {
                    relatedid: '',
                    MD5Path: '',
                    fileName: '',
                    url: ''
                },
                imageList: [{
                    relatedid: '',
                    MD5Path: '',
                    fileName: '',
                    url: ''
                }],
                hideUpload: false,
                previewImageUrl: '',
                previewDialogVisible: false
            }
        },
        // 组件加载完，立刻请求关联图片
        created() {
            window.console.log('created-------------')
            this.getImageFileByRelatedId()
        },
        watch: {
            relatedId(newVal, oldVal) {
                window.console.log('relatedId changed')
                this.getImageFileByRelatedId()
            }
        },
        computed: {
            hideUpload:function() {
                return this.imageList.length >0
            },

        },
        methods: {
            getImageFileByRelatedId() {
                let that = this;
                if (that.relatedId) {
                    /*请求业务接口*/
                    that.$$queryFileList({
                        "relatedid": that.relatedId
                    }).then((res) => {
                        let data = res.info
                        if (data && data.length != 0){
                            window.console.log(data)
                            let param = {
                                "relatedid": that.relatedId,
                                "MD5Path": data.url,
                                "fileName": data.name
                            }
                            if (data instanceof Array) {
                                let index = data.length - 1;
                                that.image = param
                                that.image.url = that.$api.upload.reqUrl +
                                    that.$api.upload.download+"?md5Path="+data[index].md5path
                            } else if (data instanceof Object){
                                that.image = param
                                that.image.url = that.$api.upload.reqUrl +
                                    that.$api.upload.download+"?md5Path="+data.md5path
                            }
                        }else {
                            that.clearImage()
                        }
                    }).catch(function (err) {
                        that.$message({
                            type: 'error',
                            message: "获取图片失败"
                        })
                    })
                } else {
                    that.clearImage()
                }
            },
            clearImage() {
                let param = {
                    relatedid: '',
                    MD5Path: '',
                    fileName: '',
                    url: ''
                }
                this.image = param
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
                                let param = {
                                    "relatedid": that.relatedId,
                                    "MD5Path": resObj.url,
                                    "fileName": resObj.name
                                }
                                that.$$insertFileInfo(param).then((res) => {
                                    window.console.log(res)
                                    let sucObj = {
                                        name: param.fileName,
                                        relatedid: param.relatedid,
                                        url: param.MD5Path,
                                        uuid: res.info
                                    }
                                    that.image = param
                                    // 将图片回显
                                    that.image.url = that.$api.upload.reqUrl +
                                        that.$api.upload.download+"?md5Path="+sucObj.url

                                    //上传成功 调用onSuccess方法，否则没有完成图标,处理自己的逻辑
                                    // params.onSuccess(sucObj)
                                }).catch(function (err) {
                                    that.$message({
                                        type: 'error',
                                        message: "上传失败"
                                    })
                                })
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
                            window.console.log(checkRes);
                            /*已上传，加入表格*/
                            let obj = {
                                "relatedid": that.relatedId,
                                "MD5Path": checkRes.url,
                                "fileName": params.file.name
                            }
                            that.$$insertFileInfo(obj).then((res) => {
                                window.console.log(res)
                                let sucObj = {
                                    name: obj.fileName,
                                    relatedid: obj.relatedid,
                                    url: obj.MD5Path,
                                    uuid: res.info
                                }
                                that.image = obj
                                // 将图片回显
                                that.image.url = that.$api.upload.reqUrl +
                                    that.$api.upload.download+"?md5Path="+sucObj.url

                            }).catch(function (err) {
                                that.$message({
                                    type: 'error',
                                    message: "上传失败"
                                })
                            })
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
            // 上传前验证文件格式，只能是jpeg/png后缀的图片
            beforeImageUpload(file) {
                const isJPG = (file.type === 'image/jpeg') ||
                    (file.type === 'image/png');

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                return isJPG;
            },
            handleImagePreview(file) {
                this.previewImageUrl = file.url;
                this.previewDialogVisible = true;
            },
            handleImageRemove(file, fileList) {
                window.console.log('image delete success')

                this.hideUpload = fileList >= 1;
            },
            handleImageChange(file, fileList) {
                window.console.log('image change success')

                this.hideUpload = fileList.length >= 1;
            },
            handleImageUpload(response, file, fileList) {
                window.console.log('image upload success')
            }
        }
    }
</script>

<style scoped>
    /deep/ .avatar-uploader{
        position: relative;
        text-align: center;
    }
    .avatar-uploader /deep/ .el-upload {
        width: 164px;
        height: 164px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        left: auto;
        transform: none;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 164px;
        height: 164px;
        line-height: 164px;
        text-align: center;
    }
    .avatar {
        width: 164px;
        height: 164px;
        display: block;
    }
    .avatar-uploader .el-upload-wrapper {
        position: relative;
    }
    .avatar-uploader .el-upload-item-actions {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;
    }
    .avatar-uploader .el-upload-item-actions:hover {
        opacity: 1;
    }
    .avatar-uploader .el-upload-item-actions::after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
    }
    .avatar-uploader .el-upload-item-actions:hover span{
        display: inline-block;
    }
    .avatar-uploader .el-upload-item-actions span{
        cursor: pointer;
    }

    .disabled .el-upload--picture-card {
        display: none;
    }
</style>