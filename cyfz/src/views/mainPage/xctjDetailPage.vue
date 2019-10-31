<template>
    <div class="xctj-detail">
        <div class="container-fluid" style="width: 1200px;padding: 0px">
            <div class="row" style="margin: 0;">
                <span><img src="../../assets/img/ico_Home.png" style="margin-right: 15px;"></span>
                <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 25px">
                    <!--                    <img src="../assets/img/header/ico_Notice.png" style="padding-left: 10px">-->
                    <el-breadcrumb-item :to="{ name: 'mainPage' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ name: 'more',query:{moduleCode: this.$route.query.moduleCode} }">宣传推荐
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>正文</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container-fluid" style="width: 1000px;padding: 0px">
                <div style="width: 100%;margin: 30px 0px;font-family: SimSun-ExtB;font-size: 14px;color: #333333;text-align: center">
                    <div class="row row-blue "><span class="col-sm" style="text-align: left;padding-left: 0px;">发布日期：{{xctj.createTime}}</span>
                    </div>
                    <div class="row row-white">推荐重点单位名称：{{xctj.comName}}</div>
                    <div class="row row-blue">所属方向：{{xctj.claimDirectionDm}}</div>
                </div>
                <div class="itemHeaderLeft" style="margin-top: 20px">
                    <img src="../../assets/img/icon.png" style="padding-left: 10px">
                    <span class="itemHeaderFont">
                               揭榜产品和服务:
                        </span>
                    <hr style="margin:2px 0px 20px;border: none;border-top: 2px solid #0066cc"/>
                </div>
                <div style="width: 100%;padding: 20px;font-weight: 500;font-size: 14px">
                    <p style="text-indent: 2em">{{xctj.productService}}</p>
                </div>
                <div class="itemHeaderLeft" style="margin-top: 20px">
                    <img src="../../assets/img/icon_qiyejianjie.png" style="padding-left: 10px">
                    <span class="itemHeaderFont">
                       企业简介:

                    </span>
                    <hr style="margin:2px 0px 20px;border: none;border-top: 2px solid #0066cc"/>
                </div>
                <div style="width: 100%;padding: 20px;font-weight: 500;font-size: 14px;">
                    <p style="text-indent: 2em">{{xctj.introduction}}</p>
                </div>
                <div class="itemHeaderLeft" style="margin-top: 20px">
                    <img src="../../assets/img/icon_miaoshu.png" style="padding-left: 10px">
                    <span class="itemHeaderFont">
                               揭榜产品和服务描述:
                    </span>
                    <hr style="margin:2px 0px 20px;border: none;border-top: 2px solid #0066cc"/>
                </div>
                <div style="width: 100%;padding: 20px;font-weight: 500;font-size: 14px">
                    <p style="text-indent: 2em">{{xctj.productDescribe}}</p>
                </div>

            </div>
        </div>
        <approvalStep v-if="$route.query.readOnly==1" :apprData="$route.query"></approvalStep>
        <approval v-if="$route.query.readOnly==1" :apprData="$route.query"></approval>
    </div>
</template>

<script>
    import approvalStep from "./approvalStep";
    import approval from "./approval";

    export default {
        name: "xctjDetailPage",
        components: {
            approval,
            approvalStep
        },
        data() {
            return {
                orgName: '',
                title: '',
                time: '',
                content: '',
                xctj: {
                    claimDirectionDm: "",
                    productDescribe: '',
                    introduction: '',
                    productService: '',
                    createTime: '',
                    orgName: '',
                    comName: ''
                },
                fjList: []
            }
        },
        methods: {},
        created() {
            var that = this
            /*<<<  请求通知通告*/
            this.$$request({
                url: this.$api.homeApi.getDetailInfoByUuid,
                data: {uuid: this.$route.query.uuid, moduleCode: this.$route.query.moduleCode}
            }).then(function (res) {
                that.xctj.introduction = res.info.introduction;
                that.xctj.productDescribe = res.info.productDescribe;
                that.xctj.productService = res.info.productService;
                that.xctj.createTime = res.info.createTime;
                that.xctj.orgName = res.info.orgName;
                that.xctj.comName = res.info.comName;
                that.xctj.claimDirectionDm = res.info.claimDirectionDm;
            })
            /*请求通知通告  >>>*/
        },
        mounted() {
            let route = this.$route;
            console.log(route);
        }
    }
</script>

<style scoped lang="less">
    .xctj-detail{
        .sp-step{
            width: 1000px;
            margin: 0 auto;
        }
    }
    .itemHeaderLeft {
        font-size: 18px;
        font-weight: 580;
        color: #0066cc;
    }

    .itemHeaderFont {
        padding-left: 5px;
        font-family: 'Microsoft YaHei';
        font-size: 16px
    }

    .row-blue {
        background-color: #f3f9ff;
        line-height: 30px;
        margin: 0px;
        padding-left: 10px;
    }

    .row-white {
        line-height: 42px;
        margin: 0px;
        padding-left: 10px;
    }
</style>
