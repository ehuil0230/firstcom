<template>
    <div class="container-fluid" style="width: 1200px;padding: 0px">
        <el-container style="margin: 30px">
            <el-aside width="250" v-if="$route.query.readOnly!=='1'||$route.query.readOnly!=='2'">
                <div class="work_menu">
                    <div class="menu-bar">
                        <span>导航</span>
                    </div>
                    <div class="menu-main">
                        <el-menu class="leftPart">
                            <el-menu-item v-for="(item,index) in menuList"
                                          :index=item.uuid
                                          @click.native="mainContent(item.uuid)">
                                <i class="el-icon-menu"></i>
                                <span slot="title">{{item.pilotName}}</span>
                            </el-menu-item>
                        </el-menu>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <div class="itemHeaderLeft">
                    <img src="../../assets/img/header/ico_Notice.png" style="padding-left: 10px">
                    <span style="padding-left: 5px;">
                                园区介绍
                    </span>
                    <hr style="margin:2px 0px 30px;border: none;border-top: 2px solid #0066cc"/>
                </div>
                <div style="width: 100%;height: 530px;text-align: center;">
                    <div style="margin: 0 auto;width: 745px;height: 394px;background-color: black">
                        <div class="img-background">
                            <el-image style="width:697px; height:360px; cursor: pointer" :src="xdqInfo.picUrl"></el-image>
                        </div>
                    </div>
                    <div style="height: 200px;margin-top: 35px;text-align: left">
                        <p style="text-indent: 2em">{{xdqInfo.introduction}}</p>
                    </div>
                </div>
                <div class="itemHeaderLeft" style="margin-top: 20px">

                    <img src="../../assets/img/header/ico_Notice.png" style="padding-left: 10px">
                    <span style="padding-left: 5px;">
                                基本信息
                    </span>
                    <hr style="margin:2px 0px 20px;border: none;border-top: 2px solid #0066cc"/>
                </div>
                <div style="height: 300px;overflow: hidden;margin-left: 100px">
                    <div class="row" style="line-height:50px;"><span class="col-sm">园区级别：{{xdqInfo.pilotLevelDm}}</span><span
                            class="col-sm">批准机关：{{xdqInfo.approvalOrg}}</span></div>
                    <div class="row" style="line-height:50px;"><span
                            class="col-sm">审批时间：{{xdqInfo.createTime}}</span><span class="col-sm">入园企业数量：{{xdqInfo.aiEnterpriseNum}}</span>
                    </div>
                    <div class="row" style="line-height:50px;"><span class="col-sm">园区面积：{{xdqInfo.area}}</span><span
                            class="col-sm">所属经济区：{{xdqInfo.provinceDm}}</span></div>
                    <div class="row" style="line-height:50px;"><span
                            class="col-sm">所属地区：{{xdqInfo.provinceDm}}</span><span class="col-sm">主导产业：{{xdqInfo.primeIndustry}}</span>
                    </div>
                </div>
            </el-main>
        </el-container>
        <approval v-if="$route.query.readOnly==1" :apprData="$route.query"></approval>
    </div>
</template>

<script>
    import workMenu from "../../components/home/WorkMenu"
    import xdq from "../../assets/img/header/xdt1.jpg"
    import wuxi from "../../assets/img/header/wuxi.jpg"
    import sh from "../../assets/img/header/sh.jpg"
    import approval from "./approval";

    export default {
        name: "xdqDetailPage",
        components: {
            workMenu: workMenu,
            approval
        },
        data() {
            return {
                xdqimg: xdq,
                wuxi: wuxi,
                sh: sh,
                xdqInfo: {
                    uuid: '',
                    introduction: '',
                    area: '',
                    pilotLevelDm: '',
                    primeIndustry: '',
                    approvalOrg: '',
                    provinceDm: '',
                    aiEnterpriseNum: '',
                    createTime: '',
                    picUrl:''
                },
                title: '',
                menuList: [],
                code: ''
            }
        },
        methods: {
            mainContent(obj) {
                if (obj) {
                    this.xdqInfo.uuid = obj;
                }
                this.loadData();
            },
            loadData() {
                let that = this
                this.$$request({
                    url: this.$api.homeApi.getDetailInfoByUuid,
                    data: {uuid: this.xdqInfo.uuid, moduleCode: this.$route.query.moduleCode}
                }).then(function (res) {
                    that.xdqInfo.introduction = res.info.introduction;
                    that.xdqInfo.area = res.info.area;
                    that.xdqInfo.pilotLevelDm = res.info.pilotLevelDm;
                    that.xdqInfo.primeIndustry = res.info.primeIndustry;
                    that.xdqInfo.approvalOrg = res.info.approvalOrg;
                    that.xdqInfo.provinceDm = res.info.provinceDm;
                    that.xdqInfo.aiEnterpriseNum = res.info.aiEnterpriseNum;
                    that.xdqInfo.createTime = res.info.createTime;
                    that.xdqInfo.picUrl =that.$api.upload.reqUrl+that.$api.upload.download+"?md5Path="+ res.info.picUrl;
                })
            },
        },
        created() {
           this.xdqInfo.uuid = this.$route.query.uuid
            if(this.$route.query.readOnly!=='1'){
                let that = this
                /*if(this.$route.query.state){
                    this.$$request({
                        url: this.$api.homeApi.queryPilotMenu,
                        data: {}
                    }).then(function (res) {
                        that.menuList = res.info
                    })
                }else {*/
                    this.$$request({
                        url: this.$api.homeApi.queryPilotMenu,
                        data: {}
                    }).then(function (res) {
                        that.menuList = res.info
                    })


            }
            this.loadData()
        },
        mounted() {
            //alert($route.params.moduleCode)
        },
    }
</script>

<style scoped lang="less">
    a {
        color: inherit;
    }

    a:hover {
        color: #0066cc;
    }

    .itemHeaderLeft {
        font-size: 18px;
        font-weight: 580;
        color: #0066cc;
    }

    .work_menu {
        width: 210px;
        margin-right: 40px;
        height: 100%;

        .menu-main {
            min-height: calc(100vh - 235px);
            border: 1px solid #DDDDDD;
            box-sizing: border-box;
            text-align: left;
            position: relative;
        }

        .menu-bar {
            width: 210px;
            height: 30px;
            background-image: url(../../assets/img/header/table_public.png);
            background-size: 200% 100%;
            background-repeat: no-repeat;
            margin-bottom: 1px;

            span {
                color: #fff;
                font-size: 18px;
                margin-left: 30px;
                padding: 10px;
            }
        }

    }

    .leftPart {
        border-right: 0px;
    }

    .collmin {
        min-width: 15em;
    }

    .show-menu {
        z-index: 10;
        line-height: 60px;
        position: absolute;
        top: 48%;
        right: 0;
        width: 14px;
        height: 60px;
        opacity: 0.7;
        background-color: #888;
        color: #fff;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .el-main {
        width: 950px;
        padding: 2px;
        min-height: calc(100vh - 195px);
    }

    .img-background {
        padding: 20px;
        width: 745px;
        height: 394px;
        background-image: url(../../assets/img/background.png);
    }
</style>
