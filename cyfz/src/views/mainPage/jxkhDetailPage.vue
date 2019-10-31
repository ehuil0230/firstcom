<template>
    <div>
        <div class="container-fluid" style="width: 1200px;padding: 0px">
            <div class="row" style="margin: 0;" >
                <span><img src="../../assets/img/ico_Home.png" style="margin-right: 15px;"></span>
                <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 25px">
                    <!--                    <img src="../assets/img/header/ico_Notice.png" style="padding-left: 10px">-->
                    <el-breadcrumb-item :to="{ name: 'mainPage' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>绩效考核</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container-fluid" style="width: 1000px;padding: 0px">
                    <div style="width: 100%;margin: 30px 0px;font-family: SimSun-ExtB;font-size: 14px;color: #333333;text-align: center">
                        <div class="row row-blue " ><span class="col-sm" style="text-align: left;padding-left: 0px;">发布日期：{{time}}</span></div>
                        <div class="row row-white" >先导区名称：{{pilotAreaName}}</div>
                        <div class="row row-blue" >所在省份：{{provinceName}}</div>
                    </div>
                    <div class="itemHeaderLeft" style="margin-top: 20px">
                        <img src="../../assets/img/icon.png" style="padding-left: 10px">
                        <span class="itemHeaderFont" >
                               考核说明:
                        </span>
                        <hr style="margin:2px 0px 20px;border: none;border-top: 2px solid #0066cc"/>
                    </div>
                    <div style="width: 100%;padding: 20px;font-weight: 500;font-size: 14px;text-align: center" >
                        {{introduction}}
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
        <approval v-if="$route.query.readOnly==1" :apprData="$route.query"></approval>
    </div>
</template>

<script>
    import approval from "./approval";
    export default {
        name: "jxkhDetailPage",
        components:{
            approval,
        },
        data(){
            return {
                pilotAreaName:'',
                time:'',
                provinceName:'',
                introduction:'',
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
            this.$$request({
                url: this.$api.xdqglApi.pilotAssessDetail,
                data: {uuid:this.$route.query.uuid}
            }).then(function (res) {
                that.pilotAreaName = res.info.pilotAreaName;
                that.time = res.info.createTime;
                that.provinceName = res.info.provinceName;
                that.introduction = res.info.introduction;
            })
            this.$$queryFileList({
                relatedid:this.$route.query.uuid
            }).then((res)=>{
                that.fjList = res.info
            }).catch(function (err) {

            })
        },
        mounted() {
            let route = this.$route;
            console.log(route);
        }
    }
</script>

<style scoped lang="less">
    .itemHeaderLeft{
        font-size: 18px;
        font-weight: 580;
        color: #0066cc;
    }
    .itemHeaderFont{
        padding-left: 5px;
        font-family: 'Microsoft YaHei';
        font-size: 16px
    }
    .row-blue{
        background-color:#f3f9ff;
        line-height:30px;
        margin: 0px;
        padding-left: 10px;
    }
    .row-white{
        line-height:42px;
        margin: 0px;
        padding-left: 10px;
    }
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
