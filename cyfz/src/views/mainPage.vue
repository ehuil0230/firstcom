<template>
    <div>
        <div class="container-fluid" style="width: 1200px;padding: 0px">
            <!--轮播-->
            <div class="block">
                <el-carousel trigger="click" height="300px">
                    <el-carousel-item v-for="item in lbt">
                        <img class="d-block w-100" :src="item" alt="First slide">{{item}}
                    </el-carousel-item>
                </el-carousel>
            </div>

            <!-- 通知公告，揭榜结果公示 -->
            <div class="row" style="margin-top:30px; height: 180px ;">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="itemHeaderLeft">
                                <img src="../assets/img/header/ico_Notice.png" style="padding-left: 10px">
                                <span style="padding-left: 5px;cursor: pointer" @click.prevent="goMore('tzgg')">
                                通知公告
                                 </span>

                            </div>
                            <hr style="margin:2px 0px 0px;border: none;border-top: 2px solid #0066cc"/>
                        </div>
                        <div class="col-sm-5">
                            <div class="itemHeaderRight">
                            <span style="margin-left: 30px;cursor: pointer" @click.prevent="goMore('jbjggs')">
                            揭榜公示
                            </span>
                            </div>
                            <hr style="margin:2px 0px 0px;border: none;border-top: 2px solid #0066cc"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-7 text" style="height: 85%">
                    <div v-if="tzggModel.length!==0">
                        <ul style="padding-left: 10px;">
                            <li v-for="o in tzggModel" style="padding-top: 7px;padding-left: 10px">
                                ·<a href="#" @click.prevent="goDetail(o)" style="padding-left: 15px">{{o.title}}</a>
                                <span style="float: right;color: gray">{{o.dateTime}}</span>
                            </li>
                        </ul>
                    </div>
                    <div style="line-height:200px;text-align: center;color: gray" v-else>
                        暂无数据
                    </div>
                </div>
                <div class="col-sm-5 text" style="height: 85%">
                    <div v-if="jbgsModel.length!==0">
                        <ul style="padding-left: 10px;">
                            <li v-for="o in jbgsModel" style="padding-top: 7px;padding-left: 10px">
                                ·<a href="#" @click.prevent="goDetail(o)" style="padding-left: 15px">{{o.title}}</a>
                            </li>

                        </ul>
                    </div>
                    <div style="line-height:200px;text-align: center;color: gray" v-else>
                        暂无数据
                    </div>
                </div>
            </div>
            <!-- 政策文件，政策解读，英雄榜 -->
            <div class="row" style="margin-top:30px; height: 180px ;">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="itemHeaderLeft">
                                <img src="../assets/img/header/ico_policy.png" style="padding-left: 10px">
                                <!--border-top: 2px solid #0066cc;-->
                                <span style="margin-left: 7px; cursor: pointer" :class="{selectZC:zcModel!=zc.zcwj}"
                                      @mouseenter="zcHoverEnter(0)" @click.prevent="goMore('zcwj')">
                                    政策文件与解读
                                </span>

                            </div>
                            <hr style="margin:2px 0px 0px;border: none;border-top: 2px solid #0066cc"/>
                        </div>
                        <div class="col-sm-5">
                            <div class="itemHeaderRight">
                            <span style="padding-left: 40px;cursor: pointer" @click.prevent="goMore('zdjbdw')">
                            英雄榜
                            </span>
                                <span style="color:#0066cc ">
                                <span style="float: right;font-size: 14px;padding-top: 5px;cursor: pointer"
                                      :class="{selectZC:yxbModel!=yxb.qldw}" @mouseenter="yxbHoverEnter(0)"
                                      @click.prevent="goMore('pyqldw')">
                                     / 培育潜力单位
                                </span>
                                <span style="float: right ;font-size: 14px;padding-top: 5px;cursor: pointer"
                                      :class="{selectZC:yxbModel!=yxb.jbdw}" @mouseenter="yxbHoverEnter(1)"
                                      @click.prevent="goMore('zdjbdw')">
                                   重点揭榜单位&nbsp;
                                </span>
                                    </span>
                            </div>
                            <hr style="margin:2px 0px 0px;border: none;border-top: 2px solid #0066cc"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-7 text" style="height: 85%">
                    <div v-if="zcModel.length!==0">
                        <ul style="padding-left: 10px">
                            <li v-for="o in zcModel" style="padding-top: 7px;padding-left: 10px">
                                ·<a href="#" @click.prevent="goDetail(o)" style="padding-left: 15px">{{o.title}}</a>
                                <span style="float: right;color: gray">{{o.dateTime}}</span>
                            </li>
                        </ul>

                    </div>
                    <div style="line-height:200px;text-align: center;color: gray" v-else>
                        暂无数据
                    </div>
                </div>
                <div class="col-sm-5 text" style="height: 85%">
                    <div v-if="yxbModel.length!==0">
                        <ul style="padding-left: 10px">
                            <li v-for="o in yxbModel" style="padding-top: 7px;padding-left: 10px">
                                ·<a href="#" @click.prevent="goDetail(o)" style="padding-left: 15px">{{o.title}}</a>
                            </li>
                        </ul>
                    </div>
                    <div style="line-height:200px;text-align: center;color: gray" v-else>
                        暂无数据
                    </div>
                </div>
            </div>
            <!-- 宣传推荐，先导区 -->
            <div class="row" style="margin-top:30px; height: 250px ;">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="itemHeaderLeft">
                                <img src="../assets/img/header/ico_Propaganda.png" style="padding-left: 10px">
                                <span style="padding-left: 5px;cursor: pointer" @click.prevent="goMore('xctj')">
                            宣传推荐
                            </span>

                            </div>
                            <hr style="margin:2px 0px 0px;border: none;border-top: 2px solid #0066cc"/>
                        </div>

                        <div class="col-sm-5">
                            <div class="itemHeaderRight">
                            <span style="padding-left: 40px;cursor: pointer" @click.prevent="goXdq()">
                            先导区
                            </span>
                            </div>
                            <hr style="margin:2px 0px 0px;border: none;border-top: 2px solid #0066cc"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-7 text" style="height: 91%">
                    <div v-if="xctjModel.length!==0">
                        <ul style="padding-left: 10px">
                            <li v-for="o in xctjModel" style="padding-top: 7px;padding-left: 10px">
                                ·<a href="#" @click.prevent="goXctj(o)" style="padding-left: 15px">{{o.title}}</a>
                                <span style="float: right;color: gray">{{o.dateTime}}</span>
                            </li>
                        </ul>
                    </div>
                    <div style="line-height:200px;text-align: center;color: gray" v-else>
                        暂无数据
                    </div>
                </div>
                <div class="col-sm-5 text" style="margin-top: 10px">
                    <div>
                        <div class="block">
                            <el-carousel trigger="click" height="220px">
                                <el-carousel-item v-for="item in xdqModel">
<!--                                    {{item.picUrl}}-->
                                    <!-- <img class="d-block w-100" src="../assets/img/header/xdt1.jpg" alt="First slide" >{{item}}-->
                                    <!--<el-image
                                            style="width: 100%; height: 100%; cursor: pointer"
                                            :src="wuxi"
                                            @click.native="goXdq(item)"
                                    ></el-image>-->
                                    <el-image
                                            style="width: 100%; height: 100%; cursor: pointer"
                                            :src="item.picUrl"
                                            @click.native="goXdq(item)"
                                    ></el-image>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 产业分析 -->
            <div class="row" style="margin-top: 30px;height: 450px">
                <div class="col-sm-12">
                    <div class="itemHeaderLeft">
                        <img src="../assets/img/header/ico_Industryanalysis.png" style="padding-left: 10px">
                        <span style="padding-left: 5px;">
                            产业分析
                            </span>
                    </div>
                    <hr style="margin:2px 0px 0px;border: none;border-top: 2px solid #0066cc"/>
                </div>
                <div class="col-sm-6" style="height: 400px;border-right:1px dashed #d3e9fe">
                    <div class="echarts_map_zhuce">
                        <Map style="width: 100%;height: 100%;" @sendData="sendData" :Data="mapData">
                        </Map>
                    </div>
                </div>
                <div class="col-sm-6" style="height: 400px">
                    <div class="echarts_histogram_zhuce">
                        <Histogram style="width: 100%; height: 100%"
                                   :HistogramData="histogramData">
                        </Histogram>
                    </div>
                </div>
            </div>
            <div style="width: 100%;height:42px;overflow: hidden;margin-left: 49px">
                <div class="row" style="width: 100% ">
                    <span class="text" style="width:30%;height:10%;text-align: center">
                        <img src="../assets/img/header/ico_qiye.png" style="padding-left: 10px">
                        <a @click.prevent="qyzcMap" style="padding-left: 10px;cursor: pointer">企业登记数</a>
                        <p style="padding-left: 10px">{{qydjs}}</p>
                    </span>
                    <span class="col-sm-4" style="text-align: center">
                        <img src="../assets/img/header/ico_zipingshu.png" style="padding-left: 10px">
                            <a @click.prevent="qyzpMap" style="padding-left: 10px;cursor: pointer">企业填报数</a>
                            <p style="padding-left: 10px">{{qytbs}}</p>
                    </span>
                    <span class="col-sm-4" style="text-align: center">
                        <img src="../assets/img/header/ico_shebao.png">
                            <a @click.prevent="xmsbMap" style="cursor: pointer;"> 企业申报数</a>
                            <p style="padding-left: 10px">{{qysbs}}</p>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Map from "@/components/echarts/Map";
    import Histogram from "@/components/echarts/Histogram";
    import banner from "../assets/img/header/banner.jpg"
    import banner1 from "../assets/img/header/banner1.jpg"
    import banner2 from "../assets/img/header/banner2.jpg"
    import xdq from "../assets/img/header/xdt1.jpg"
    import wuxi from "../assets/img/header/wuxi.jpg"
    import sh from "../assets/img/header/sh.jpg"

    export default {
        name: "mainPage",
        components: {
            Map,
            Histogram
        },
        data() {
            return {
                packageStatus: this.$packageStatus,
                lbt: [banner, banner1, banner2],
                xdqlbt: xdq,
                wuxi: wuxi,
                sh: sh,
                qydjs: '',//企业登记数
                qytbs: '',//企业填报数
                qysbs: '',//企业申报数

                mapData: {
                    url: this.$api.hyglApi.queryComSelfCommentNumGroupByProvByYear,
                    color: ['#70b8ff', '#bcdeff'],
                    max: 1500,//需要后台传，或者自己去子组件遍历获取最大值
                    params: '01',
                    name: '企业登记数',
                },

                histogramData: {
                    color: ['#64b3fd'],
                    params: '01',
                    name: '企业登记数',
                    data: []
                },
                tzggModel: [],
                jbgsModel: [],
                zc: {zcwj: [], zcjd: []},
                zcModel: [],
                yxb: {jbdw: [], qldw: []},
                yxbModel: [],
                xctjModel: [],
                xdqModel: []
            }
        },
        methods: {
            goXdq(obj) {
                if (obj) {
                    this.$router.push({
                        name: 'xdqDetail',
                        query: {
                            uuid: obj.uuid,
                            moduleCode: obj.moduleCode
                        }
                    })
                } else {
                    this.$router.push({
                        name: 'xdqDetail',
                        query: {
                            uuid: this.xdqModel[0].uuid,
                            moduleCode: 'xdq'
                        }
                    })

                }
            },
            goXctj(obj) {
                this.$router.push({
                    name: 'xctjDetail',
                    query: {
                        uuid: obj.uuid,
                        moduleCode: obj.moduleCode
                    }
                })
            },
            goMore(obj) {
                this.$router.push({
                    name: 'more',
                    query: {
                        moduleCode: obj
                    }
                })
            },
            goDetail(obj) {
                this.$router.push({
                    name: 'detail',
                    query: {
                        uuid: obj.uuid,
                        moduleCode: obj.moduleCode
                    }
                })
            },
            qyzcMap() {
                this.mapData.params = '01';
                this.mapData.name = '企业登记数';
                this.histogramData.name = '企业登记数';
            },
            qyzpMap() {
                this.mapData.params = '02';
                this.mapData.name = '企业填报数';
                this.histogramData.name = '企业填报数';
            },
            xmsbMap() {
                this.mapData.params = '03';
                this.mapData.name = '企业申报数';
                this.histogramData.name = '企业申报数';
            },
            zcHoverEnter(obj) {
                if (obj === 0) {
                    this.zcModel = this.zc.zcwj
                } else {
                    this.zcModel = this.zc.zcjd
                }
            },
            yxbHoverEnter(obj) {
                if (obj === 0) {
                    this.yxbModel = this.yxb.qldw
                } else {
                    this.yxbModel = this.yxb.jbdw
                }
            },
            //地图报漏出来的数据
            sendData(val) {
                this.qydjs = val.totalCount[0];
                this.qytbs = val.totalCount[1];
                this.qysbs = val.totalCount[2];
                this.histogramData.data = [];
                for (let i = 0; i < val.data.length; i++) {
                    if (i < 10) {
                        this.histogramData.data.push(val.data[i])
                    }
                }
            },
            filterTime(list = []) {
                let showList = []
                list.forEach(item => {
                    if (item.dateTime) {
                        let arr = item.dateTime.toString().split(' ')
                        item.dateTime = arr[0]
                    }
                    showList.push(item)
                })
                return showList
            }
        },
        created() {
            var that = this
            this.$$request({
                url: this.$api.homeApi.queryFrontPageList,
                data: {}
            }).then(function (res) {
                that.tzggModel = res.info.tzgg; //查询请求
                that.tzggModel = that.filterTime(that.tzggModel);
                that.jbgsModel = res.info.jbjggs;
                that.zc.zcwj = that.filterTime(res.info.zcwj);
                that.zc.zcjd = that.filterTime(res.info.zcjd);
                that.zcModel = that.zc.zcwj;
                that.yxb.qldw = that.filterTime(res.info.pyqldw);
                that.yxb.jbdw = that.filterTime(res.info.zdjbdw);
                that.yxbModel = that.yxb.jbdw;
                that.xctjModel = res.info.xctj;
                that.xctjModel = that.filterTime(that.xctjModel);
                res.info.xdq.forEach((item,index)=>{
                    let picObj = {};
                    picObj.uuid = item.uuid;
                    picObj.title = item.title;
                    picObj.picUrl = that.$api.upload.reqUrl+that.$api.upload.download+"?md5Path="+item.picUrl;
                    picObj.dateTime = item.dateTime;
                    picObj.moduleCode = item.moduleCode;
                    picObj.moduleName = item.moduleName;
                    that.xdqModel.push(picObj)
                })
            })
        },
        mounted() {
            /*首次来页面刷新redis*/
            /*this.$axios({
                method: "post",
                url: this.$api.homeApi.refreshRedis,
                data: {}
            }).then((res) => {}).catch((err) => {})*/
        },
        watch: {}

    }
</script>

<style scoped lang="less">
    a {
        color: inherit;
    }

    a:hover {
        color: #0066cc;
    }

    .selectZC {
        color: gray;
    }

    .aHover {

    }

    .itemHeaderLeft {
        font-size: 18px;
        font-weight: 580;
        color: #0066cc;
    }

    .itemHeaderRight {
        font-size: 18px;
        color: #FFFFFF;
        width: 100%;
        background-image: url('../assets/img/header/table_public.png')
    }

    .head-font {
        font-size: 30px;
        font-weight: 500;
        color: white;
    }

    .text {
        font-family: "Microsoft YaHei";
        font-size: @fontSize14;
        color: #2c3e50;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .echarts_map_zhuce {
        width: 100%;
        height: 90%;
        float: left;

    }

    .echarts_histogram_zhuce {
        width: 100%;
        height: 90%;
        float: right;

    }
</style>
