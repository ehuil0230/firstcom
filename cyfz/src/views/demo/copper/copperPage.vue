<template>
    <div>
        <cropper @uploadList="uploadList" type="blob" :limit="3"></cropper>
    </div>
</template>

<script>
    import cropper from '@/components/cropper/cropper.vue';
    export default {
        name: "copperPage",
        data(){
            return {
                dialogVisible: false,
                fileList:[],
                options:{
                    url:'',
                }
            }
        },
        components:{
            cropper
        },
        methods:{
            uploadList(list){
                window.console.info(list);
            },
            beforeupload(obj){
                window.console.log(obj)
            },

        }
    }
</script>

<style scoped>

</style>
