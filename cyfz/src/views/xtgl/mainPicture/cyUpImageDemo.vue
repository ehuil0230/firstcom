<template>
<!--    <cy-upload :file-num="fileNum" :auto-up="true" :relatedId="relatedId"></cy-upload>-->
    <cy-upload-image :file-num="fileNum" :auto-up="true" :relatedId="relatedId"></cy-upload-image>
</template>

<script>
    import cyUploadImage from "../../../components/upAndDown/cyUploadImage";
    export default {
        name: "cyUpImageDemo",
        components:{
            cyUploadImage,
        },
        data(){
            return{
                fileNum:2,
                relatedId:"1234567887654321"
            }
        }
    }
</script>

<style scoped>

</style>
