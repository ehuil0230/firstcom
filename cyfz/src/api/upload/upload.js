// const reqUrl = 'http://file.guohai110.com'//开发环境使用
const reqUrl = 'http://file.miit.gov.cn'//正式环境使用

const uploadCenterUrl = ""
const md5CheckUpload = uploadCenterUrl+'/file/md5CheckUpload'//md5校验
const uploadDfs = uploadCenterUrl+'/file/uploadDfs?identityId=admin&token=123456'//上传地址url
const preview = uploadCenterUrl+'/file/preview'//预览url
const download = uploadCenterUrl+'/file/download'//下载地址url

// https://10.15.255.5/file/uploadDfs?identityId=admin&token=123456
const downloadByMd5Path = uploadCenterUrl + '/file/downloadByMd5Path'//下载地址url
const getPdfPath = uploadCenterUrl+'/file/getPdfPath'//pdfurl
const downloadPackage = uploadCenterUrl+'/file/downloadPackage'//打包下载url
const deleteUpLoad = uploadCenterUrl+'/file/delete'//删除url

/*业务代码*/
import config from "@/routerFilter/config";
const baseUrl = config.baseUrl
const insertFileInfo = baseUrl+"/CyfzFileCtrl/insertFileInfo"   //关联业务表
const insertFileInfoBatch = baseUrl+"/CyfzFileCtrl/insertFileInfoBatch"   //批量关联业务表
const queryFileList = baseUrl+'/CyfzFileCtrl/queryFileListByRelatedIdAndFileTypeDm'//查询业务表
const delMultiFile = baseUrl+'/CyfzFileCtrl/updateMultiFileDelFlagByPK'//删除


export default {
    reqUrl,
    md5CheckUpload,
    uploadDfs,
    preview,
    download,

    insertFileInfo,
    insertFileInfoBatch,
    queryFileList,
    delMultiFile,

    downloadByMd5Path,
    getPdfPath,
    downloadPackage,
    deleteUpLoad
}

