<template>
    <cy-upload :file-num="fileNum" :auto-up="true" :relatedId="relatedId"></cy-upload>
</template>

<script>
    import cyUpload from "../../../components/upAndDown/cyUpload";
    export default {
        name: "cyUploadDemo",
        components:{
            cyUpload,
        },
        data(){
            return{
                fileNum:100,
                relatedId:"1234567890"
            }
        }
    }
</script>

<style scoped>

</style>
