<template>
    <div class="fullEditerStyle">
        <el-form>
                    <!--内层编辑框-->
                    <el-dialog class="my-content"
                               width="30%"
                               title="编辑内容"
                               :visible.sync="fullDialogVisible"
                               fullscreen = 'true'
                               @close="cancelContent"
                               append-to-body>
                        <rich
                                :setContent="setContent"
                                :editorOption="editorOption"
                                @onEditorChange="onEditorChange($event)"
                                @onEditorReady="onEditorReady($event)"
                                :uploadUrl="uploadUrl"
                        >
                        </rich>
                        <el-form-item style="padding-left: 45%;padding-top: 20px">
                            <el-button  type = "primary" @click="completeContent()">完成</el-button>
                            <el-button @click="cancelContent()">取消</el-button>
                        </el-form-item>
                    </el-dialog>
        </el-form>
    </div>
</template>
<script>
    import rich from '@/components/richTextEditor/myRichTextEditor'
    export default {
        name: "fullScreenEditing",
        components: {
            rich,
        },
        props: {
            //回传文本内容
           /* fullEditerContent: {
                type: Object,
            },*/
            //全屏富文本框显示控制(父组件控制)
            fullDialogControl: {
                type: Boolean,
            },
            //传至此全屏富文本框的内容
            smallEditerContent: {
                type: Object,
            },
        },
        data() {
            return {
                fullDialogVisible: this.fullDialogControl,
                //fullContent: this.getContent(),
                contentForm: this.fullEditerContent,
                setContent: '',
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
                currentFileData: {},
                fileList: this.defultFileList
            }
        },
        created() {
            this.setContent = this.smallEditerContent
        },
        watch: {},
        methods: {
            completeContent() {
                this.fullEditerContent = this.getContent
                this.$emit("fullEditerContent", this.fullEditerContent)
            },
            cancelContent() {
                this.fullDialogVisible = false;
                this.$emit("fullEditerContent", false)
            },
            onEditorReady(quill) {
                // console.log('editor ready!', quill)
            },
            onEditorChange({quill, html, text}) {
                this.getContent = html
                console.log('editor change!', quill, html, text)
            },
        },
    }

</script>
<style scoped lang="less">
    /*调*/
    /*.fullEditerStyle /deep/ .el-dialog__header{
        background-color:dimgray;
    }
    .fullEditerStyle /deep/ .ql-bubble .ql-picker{
        height:40px
    }
    .fullEditerStyle /deep/ .ql-container.ql-snow {
        min-height: 380px;
    }*/

    .fullEditerStyle /deep/ .ql-bubble .ql-picker{
        height:40px
    }
    #formPage {
        margin: 10px auto;
        width: 80%;
        padding: 0px 22px;
        box-sizing: border-box;
        background-color: #fff
    }
    .fullEditerStyle /deep/ .el-select__caret el-input__icon el-icon-arrow-up {
        width: 5px
    }
    .fullEditerStyle /deep/ .el-dialog {
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

    .fullEditerStyle /deep/ .el-dialog .el-dialog__body {
        flex: 1;
        overflow: auto;
    }

    .my-content /deep/ .ql-container.ql-snow {
        min-height: 400px;
    }


    .el-dialog-div {
        overflow: auto;
    }

    .fullEditerStyle /deep/ .el-dialog__body::-webkit-scrollbar {
        width:2px;
        height:100%;
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

    .fullEditerStyle /deep/ .editor {
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
