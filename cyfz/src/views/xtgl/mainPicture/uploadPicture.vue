<template>
    <cy-upload :file-num="fileNum" :auto-up="true" :relatedId="relatedId">
        <template v-slot:mytip>
            <p><i class="el-icon-warning"></i>上传图片文件，不超过3张</p>
        </template>
    </cy-upload>
</template>

<script>
    import cyUpload from "../../../components/upAndDown/cyUpload";
    export default {
        name: "uploadPicture",
        components:{
            cyUpload,
        },
        data(){
            return{
                fileNum:3,
                relatedId:"lbu1234567890"
            }
        }
    }
</script>

<style scoped>

</style>
