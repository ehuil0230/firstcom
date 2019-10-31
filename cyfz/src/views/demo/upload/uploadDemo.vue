<template>
  <div>
    <upload
      ref="upload"
      :up-load-data="uploadData"
      :on-up-change="onChange"
      :on-up-success="onSuccess"
      :on-up-progress="onProgress"
      :on-up-error="onError"
      :auto-up="true"
      :show-file-list="true"
      :defult-file-list="uploadData.filelist"
      :md5-check-params="uploadData.md5CheckParams"
      :up-load-params="uploadData.upLoadParams"
      :down-load-one-params="uploadData.downLoadOneParams"
      :down-load-all-params="uploadData.downLoadAllParams"
      :get-pdf-path-params="uploadData.getPdfPathParams"
    >
      <template v-slot:mytip>
        <h1><i class="el-icon-warning"></i>上传文件</h1>
      </template>
    </upload>
  </div>
</template>
:on-up-remove="onRemove"
<!--:on-up-download-one="onDownloadOne"-->    //自定义下载
<!--:on-up-download-many="onDownloadMany"-->  //自定义批量下载
<script>
  import upload from './upload'
  export default {
    name:'uploadDemo',
    components:{
      upload
    },
    data(){
      return{
        uploadData:{
          filelist:[{name:"111"},{name:"221"},],
          md5CheckParams:{//md5校验需要的参数
            userId: '222222',
            moduleName: 'CheckForFrontEnd'
          },
          upLoadParams:{//上传需要的其他参数
            userId: '222222',
            moduleName: 'CheckForFrontEnd'
          },
          downLoadOneParams:{//下载需要的参数
            isPreview:1,
            forceDocx:1,
            webOffice:1,
            wordWaterMark:1,
            isWpsSecure:1,
            caToken:1,
            waterMark:1,
          },
          downLoadAllParams: {//下载需要的参数
            waterMark:1,
            zipName:"",
          },
          getPdfPathParams: {
            isPreview: 1,
            forceRefresh: 1,
            xdocPdf: 1,
          }
        },

      }
    },
    methods:{
      onSuccess(res, file, fileList){
        console.log(res);
        console.log(file);
        console.log(fileList);
      },
      onProgress(event, file, fileList){
        console.log(event);
        console.log(file);
        console.log(fileList);
      },
      onError(err, file, fileList){
        console.log(err);
        console.log(file);
        console.log(fileList);
      },
      onChange(file,fileList){
        console.log(file,fileList);
      },
      onRemove(file,fileList){
        console.log(file);
        console.log(fileList);
      },
      onDownloadOne(file){//自定义下载
          // console.log(file);
      },
      onDownloadMany(fileList){//自定义批量下载
          // console.log(fileList);
      },

    }
  }

</script>

<style scoped>

</style>
