<template>
    <div>
        <rich
        :editorOption="editorOption"
        :onEditorChange.sync= "content"
        :uploadUrl="uploadUrl"
        >
        </rich>
        <el-button type="danger" @click="getContent">获取富文本内容</el-button>
    </div>
</template>

<script>
    import rich from '@/components/richTextEditor/myRichTextEditor'
    export default {
        name: "Editor",
        components: {
            rich
        },
        data () {
            return {
                content: '', //富文本编辑器内容
                uploadUrl:'', //图片上传地址
                editorOption: { // 配置信息
                    placeholder: "请输入...",
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video']
                        ]
                        ,
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                        }
                    }
                }
            }
        },
        methods: {
            getContent:function () {
                alert(this.content)
            }
        }
    }
</script>

<style scoped>

</style>
