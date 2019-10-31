<template>
    <div>
        <div class="container-fluid" style="width: 1200px;padding: 0px">
            <div class="row" style="margin: 0;" >
                <span><img src="../../assets/img/ico_Home.png" style="margin-right: 15px;"></span>
                <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 25px">
                    <!--                    <img src="../assets/img/header/ico_Notice.png" style="padding-left: 10px">-->
                    <el-breadcrumb-item :to="{ name: 'mainPage' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ name: 'more',query:{moduleCode: this.$route.query.moduleCode} }" v-if="this.$route.query.moduleCode!='zchz'&&this.$route.query.moduleCode!='cgfb'">{{module}}</el-breadcrumb-item>
                    <el-breadcrumb-item>正文</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container-fluid" style="width: 1000px;padding: 0px">
                <div style="width: 100%;margin: 30px 0px;font-family: SimSun-ExtB;font-size: 14px;color: #333333;text-align: center">
                    <div  style="text-align: center" ><h2>{{title}}</h2></div>
                    <!--<div class="row" style="line-height:50px;margin: 0px;padding-left: 10px;"><span class="col-sm" style="text-align: left;padding-left: 0px;">成文日期：2019-09-02</span><span class="col-sm" style="text-align: left;padding-left: 0px;">发布日期：2019-09-12</span ></div>-->
                    <div  style="text-align: center;margin-top: 20px;color: gray">发布日期：{{time}}</div>
                </div>
                <div style="width: 100%;border-top: 1px solid #eaf2fb" >
                    <div style="width: 100%;padding: 20px" v-html="content" class="ql-editor">
                        {{content}}
                    </div>
                    <div style="margin-top: 50px;margin-bottom: 20px;padding-left:10px;background-color: #f3f9ff">
                        <img src="../../assets/img/fj.png">
                        <span style="line-height: 40px;padding-left: 5px"> 附件 ({{fjList.length}}个)</span>
                    </div>
                    <div style="margin-left: 55px">
                        <div class="row" v-for="item in fjList">
                            <a  href="#" @click.prevent="downLoad(item)" style="cursor: pointer">{{item.fileName}} <img style="padding-left: 10px" src="../../assets/img/xz1.png"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <approval v-if="$route.query.readOnly==1" :apprData="$route.query"></approval>
    </div>
</template>

<script>
    import approval from "./approval";
    export default {
        name: "detailPage",
        components:{
            approval,
        },
        data(){
            return {
                module:'',
                title:'',
                time:'',
                content:'',
                fjList:[]
            }
        },
        methods:{
            downLoad(item){
                let obj={
                    name: item.fileName,
                    url: item.md5path,
                }
                let that = this
                this.$$download(obj).then(() => {
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
            }
        },
        created() {
            var that = this
            /*<<<  请求通知通告*/
            this.$$request({
                url: this.$api.homeApi.getDetailInfoByUuid,
                data: {uuid:this.$route.query.uuid,moduleCode:this.$route.query.moduleCode}
            }).then(function (res) {
                that.orgName = res.info.createOrg
                that.title = res.info.title
                that.time = res.info.createTime
                that.content = res.info.content
            })
            this.$$queryFileList({
                relatedid:this.$route.query.uuid
            }).then((res)=>{
                that.fjList = res.info
            }).catch(function (err) {

            })
            /*请求通知通告  >>>*/
            switch (this.$route.query.moduleCode) {
                case 'tzgg':
                    this.module = "通知公告";
                    break;
                case 'jbjggs':
                    this.module = "揭榜公示";
                    break;
                case 'zcwj':
                    this.module = "政策文件与解读";
                    break;
                case 'zcjd':
                    this.module = "政策解读";
                    break;
                case 'zdjbdw':
                    this.module = "重点揭榜单位";
                    break;
                case 'pyqldw':
                    this.module = "培育潜力单位";
                    break;
                case 'xctj':
                    this.module = "宣传推荐";
                    break;
            }


        },
        mounted() {
            let route = this.$route;
            console.log(route);
        }
    }
</script>

<style scoped lang="less">
    a{
        color: inherit;
    }
    a:hover{
        color: #0066cc;
        text-decoration: none;

        img{
            content: url('../../assets/img/xz2.png');
        }
    }

</style>
