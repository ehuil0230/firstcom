<!--自评表-->
<template>
    <div class="self_main">
        <div class="demo-input-suffix">
            <div class="si">企业自评表</div>
            <div class="si1">企业名称：{{comName}}</div>
        </div>
        <el-form ref="selfform" :model="selfform" label-width="80px">
            <span style="display: inline;font-size: large; margin-left: 30px;">一、基本准入条件判定</span>
            <el-form-item class="top">
                <span style="display: inline;">1、注册地：企业为在中国境内（不包括港、澳、台地区）注册的居民企业。</span>
                <br>
                <span class="zt">
                     <el-radio-group :disabled="selfformState.state===1" v-model="selfform.isRegistryPlace">
                        <el-radio label="Y">符合</el-radio>
                        <el-radio label="N">不符合</el-radio>
                     </el-radio-group>
                </span>
            </el-form-item>
            <el-form-item class="top">
                <span style="display: inline;">2、企业规模：企业职工总数不超过500人、年销售收入不超过2亿元、资产总额不超过2亿元。</span>
                <br>
                <span class="zt">
                     <el-radio-group :disabled="selfformState.state===1" v-model="selfform.isScale">
                         <el-radio label="Y">符合</el-radio>
                         <el-radio label="N">不符合</el-radio>
                     </el-radio-group>
                </span>
            </el-form-item>
            <el-form-item class="top">
                <span style="display: inline;">3、产品及服务范围：企业提供的产品和服务不属于国家规定的禁止、限制和淘汰类。</span>
                <br>
                <span class="zt">
                     <el-radio-group :disabled="selfformState.state===1" v-model="selfform.isServiceRange">
                        <el-radio label="Y">符合</el-radio>
                        <el-radio label="N">不符合</el-radio>
                     </el-radio-group>
                </span>
            </el-form-item>
            <el-form-item class="top">
                <span style="display: inline;">4、企业信用：企业在填报上一年及当年内未发生重大安全、重大质量事故和严重环境违法、科研严重失信行为，且企业未列入经营异常名录和严重违法失信企业名单。</span>
                <br>
                <span class="zt">
                     <el-radio-group :disabled="selfformState.state===1" v-model="selfform.isCreditCon">
                        <el-radio label="Y">符合</el-radio>
                        <el-radio label="N">不符合</el-radio>
                     </el-radio-group>
                </span>
            </el-form-item>
            <span style="display: inline;font-size: large; margin-left: 30px;">二、相关重要条件判定</span>
            <el-form-item class="top">
                <span style="display: inline;">5、高新技术企业：企业拥有有效期内高新技术企业资格证书。</span>
                <br>
                <span class="zt">
                     <el-radio-group :disabled="selfformState.state===1" v-model="selfform.isHighTech">
                        <el-radio label="Y">是</el-radio>
                        <el-radio label="N">否</el-radio>
                     </el-radio-group>
                </span>
            </el-form-item>
            <el-form-item class="top">
                <span style="display: inline;">6、制定标准：企业近五年内主导制定过国际标准、国家标准、或行业标准。</span>
                <br>
                <span class="zt">
                     <el-radio-group :disabled="selfformState.state===1" v-model="selfform.isStandard">
                        <el-radio label="Y">是</el-radio>
                        <el-radio label="N">否</el-radio>
                     </el-radio-group>
                </span>
            </el-form-item>
            <span style="display: inline;font-size: large; margin-left: 30px;">三、企业科技活动评分</span>
            <el-form-item class="top">
                <span style="display: inline;">7、科技人员：上一会计年度企业科技人员占企业职工总数的比例。</span>
                <br>
                <span class="zt">
                      <el-radio-group :disabled="selfformState.state===1" v-model="selfform.researcherRatioDm">
                           <table>
                              <tr>
                                  <td><el-radio label="0">30%（含）- 以上(20分)</el-radio></td>
                                  <td><el-radio label="1">25%（含）- 30%(16分)</el-radio></td>
                                  <td><el-radio label="2">20%（含）- 25%(12分)</el-radio></td>
                              </tr>
                               <tr>
                                   <td><el-radio label="3">15%（含）- 20%(8分)</el-radio></td>
                                   <td><el-radio label="4">10%（含）- 15%(4分)</el-radio></td>
                                   <td><el-radio label="5">10%以下（0分）</el-radio></td>
                              </tr>
                          </table>
                     </el-radio-group>
                </span>
            </el-form-item>
            <el-form-item>
                <span style="display: inline;">8、研发投入（企业从（1）、（2）两项指标中选择一个指标进行评分）</span>
                <br>
                <span class="zt1">
                    <span style="display: inline;">（1）上一会计年度企业研发费用总额占销售收入总额的比例。</span>
                    <!-- -->
                    <table style="margin-left: 50px;line-height: 1px">
                        <tr>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="0">30%（含）- 以上(50分)</el-radio></td>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="1">25%（含）- 30%(40分)</el-radio></td>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="2">20%（含）- 25%(30分)</el-radio></td>
                        </tr>
                        <tr>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="3">15%（含）- 20%(20分)</el-radio></td>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="4">10%（含）- 15%(10分)</el-radio></td>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="5">10%以下（0分）</el-radio></td>
                        </tr>
                    </table>
                    <span style="display: inline;">（2）上一会计年度企业研发费用总额占成本费用支出总额的比例。</span>
                    <!--:disabled="selfformState.state===1" -->
                    <table style="margin-left: 50px;line-height: 1px">
                        <tr>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="6">30%（含）- 以上(50分)</el-radio></td>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="7">25%（含）- 30%(40分)</el-radio></td>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="8">20%（含）- 25%(30分)</el-radio></td>
                        </tr>
                        <tr>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="9">15%（含）- 20%(20分)</el-radio></td>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="10">10%（含）- 15%(10分)</el-radio></td>
                            <td><el-radio :disabled="selfformState.state===1" v-model="selfform.researchCostaDm" label="11">10%以下（0分）</el-radio></td>
                        </tr>
                    </table>
                </span>
            </el-form-item>
            <el-form-item>
                <span style="display: inline;">9、科技成果：企业拥有的在有效期内的主要产品（或服务）相关的知识产权类别和数量（知识产权应没有争议或纠纷）。</span>
                <br>
                <span class="zt">
                      <el-radio-group :disabled="selfformState.state===1" v-model="selfform.researchResultDm">
                          <table>
                              <tr>
                                  <td><el-radio label="0">1项及以上Ⅰ类知识产权（30分）</el-radio></td>
                                  <td><el-radio label="1">4项及以上Ⅱ类知识产权（24分）</el-radio></td>
                                  <td><el-radio label="2">3项及以上Ⅱ类知识产权（18分）</el-radio></td>
                              </tr>
                               <tr>
                                  <td><el-radio label="3">2项及以上Ⅱ类知识产权（12分）</el-radio></td>
                                  <td><el-radio label="4">1项及以上Ⅱ类知识产权（6分）</el-radio></td>
                                  <td><el-radio label="5">没有知识产权（0分）</el-radio></td>
                              </tr>
                          </table>
                     </el-radio-group>
                </span>
            </el-form-item>
            <el-form-item class="btnwz">
                <el-button type="primary" :disabled="selfformState.state===1" @click="saveform" class="btn1">保存</el-button>
                <el-button type="primary" :disabled="selfformState.state===1" @click="scoreform" class="btn1">评分</el-button>
            </el-form-item>
        </el-form>

        <div id="dialog1">
            <el-dialog v-if="dialogVisible"
                       title="评分结果"
                       :visible.sync="dialogVisible"
                       width="30%" class="diaheight">
                <span class="pfwzz">本次自评分数</span>
                <div class="pfwz1"> {{fenshu}}</div>
                <div class="pfwz2"> {{wenzi}}</div>
                <div class="pfwz3"> {{wenzi1}}</div>
                <div class="pfbtn">
                    <el-button type="primary" @click="dialogVisible=false">返回首页</el-button>
                    <el-button type="primary" :disabled="isIf" @click="keepOn">继续填报</el-button>
                </div>
            </el-dialog>
        </div>

        <el-dialog
                v-if="dialogVisibledia"
                title="进度"
                :visible.sync="dialogVisibledia"
                width="30%">
            <el-steps :active="annualState">
                <el-step title="自评" icon="el-icon-edit"></el-step>
                <el-step title="填报" icon="el-icon-upload"></el-step>
                <el-step title="受理" icon="el-icon-picture"></el-step>
                <el-step title="审核" icon="el-icon-picture"></el-step>
            </el-steps>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "SelfEvaluationTable",
        components: {},
        data() {
            return {
                fenshu: 0,
                wenzi: "",
                wenzi1: "",
                isIf: true,
                //评分dialog
                dialogVisible: false,
                //进度dialog
                dialogVisibledia: false,
                //企业名称
                comName:'',
                //自评数据项
                selfform: {
                    uuid: '',
                    registryPlaceCon: '',
                    isScale: "",
                    isServiceRange: "",
                    isCreditCon: "",
                    isHighTech: "",
                    isStandard: "",
                    researcherRatioDm: "",
                    researchCostaDm: "",
                    researchResultDm: "",
                },
                //后台返回 步骤条状态   用来显示那四个小球的：1表示第一个球，2表示第二个球，3第三个球，大于4第四个球
                annualState: 1,
                // 后台返回 用来控制自评表表示自评表的状态：0是可以随便保存修改，1是不可以修改
                selfformState:{
                    state: '',
                }
            }
        },
        created() {
            this.getComSelfcommentByAnnualId();
            this.getName();
            this.dialogVisibledia = true
        },
        methods: {
            //保存
            saveform: function () {
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.saveComSelfcomment,
                    data: Object.assign(this.selfform, {
                        "state": "0",
                        'uuid': this.selfform.uuid,
                    })
                }).then(function (res) {
                    if (res.result === 1) {
                        that.$message({
                            type: "success",
                            message: "保存成功"
                        })
                        that.$set(that.selfform,'uuid',res.info.uuid);
                    } else {
                        that.$message({
                            type: "warning",
                            message: "保存失败"
                        })
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //评分
            scoreform: function () {
                if (this.selfform.isRegistryPlace == "" || this.selfform.isScale == "" || this.selfform.isServiceRange == "" ||
                    this.selfform.isCreditCon == "" || this.selfform.isHighTech == "" || this.selfform.isStandard == "" ||
                    this.selfform.researcherRatioDm == "" || this.selfform.researchCostaDm == "" || this.selfform.researchResultDm == "") {
                    alert("请全部选择完成再评分");
                    return;
                }
                this.fenshu = 0;
                switch (this.selfform.researcherRatioDm) {
                    case "0":
                        this.fenshu = this.fenshu + 20;
                        break;
                    case "1":
                        this.fenshu = this.fenshu + 16;
                        break;
                    case "2":
                        this.fenshu = this.fenshu + 12;
                        break;
                    case "3":
                        this.fenshu = this.fenshu + 8;
                        break;
                    case "4":
                        this.fenshu = this.fenshu + 4;
                        break;
                    case "5":
                        this.fenshu = this.fenshu + 0;
                        break;
                }
                switch (this.selfform.researchCostaDm) {
                    case "0":
                        this.fenshu = this.fenshu + 50;
                        break;
                    case "1":
                        this.fenshu = this.fenshu + 40;
                        break;
                    case "2":
                        this.fenshu = this.fenshu + 30;
                        break;
                    case "3":
                        this.fenshu = this.fenshu + 20;
                        break;
                    case "4":
                        this.fenshu = this.fenshu + 10;
                        break;
                    case "5":
                        this.fenshu = this.fenshu + 0;
                        break;
                    case "6":
                        this.fenshu = this.fenshu + 50;
                        break;
                    case "7":
                        this.fenshu = this.fenshu + 40;
                        break;
                    case "8":
                        this.fenshu = this.fenshu + 30;
                        break;
                    case "9":
                        this.fenshu = this.fenshu + 20;
                        break;
                    case "10":
                        this.fenshu = this.fenshu + 10;
                        break;
                    case "11":
                        this.fenshu = this.fenshu + 0;
                        break;
                }
                switch (this.selfform.researchResultDm) {
                    case "0":
                        this.fenshu = this.fenshu + 30;
                        break;
                    case "1":
                        this.fenshu = this.fenshu + 24;
                        break;
                    case "2":
                        this.fenshu = this.fenshu + 18;
                        break;
                    case "3":
                        this.fenshu = this.fenshu + 12;
                        break;
                    case "4":
                        this.fenshu = this.fenshu + 6;
                        break;
                    case "5":
                        this.fenshu = this.fenshu + 0;
                        break;
                }
                if (this.fenshu > 80) {
                    if (this.selfform.isRegistryPlace == "Y" && this.selfform.isScale == "Y" &&
                        this.selfform.isServiceRange == "Y" && this.selfform.isCreditCon == "Y") {
                        this.wenzi = "";
                        this.wenzi1 = "符合评分标准，请继续填报！";
                        this.isIf = false;
                        this.dialogVisible = true;

                        let that = this;
                        this.$$request({
                            url: this.$api.hyglApi.saveComSelfcomment,
                            data: Object.assign(this.selfform, {
                                'uuid': this.selfform.uuid,
                                "state": "1"
                            })
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.selfform.uuid = res.info.uuid;
                            }
                        }).catch(function (error) {
                            that.$alert(error, "系统异常，请联系管理员！", {});
                        })

                        this.$$request({
                            url: this.$api.hyglApi.changeComStatus,
                            data: {
                                state: '-1'
                            }
                        }).then(function (res) {
                            if (res.result === 1) {

                            } else {
                                that.$alert(res.msg, "系统异常，请联系管理员！", {});
                            }
                        }).catch(function (error) {
                            that.$alert(error, "系统异常，请联系管理员！", {});
                        })

                        this.getComSelfcommentByAnnualId();

                    } else {
                        this.wenzi1 = "";
                        this.wenzi = " 您参与的自评结果为：" + this.fenshu + "分，基本准入条件不符合标准，不能填报企业信息！";
                        this.isIf = true;
                        this.dialogVisible = true;
                    }
                } else {
                    if (this.selfform.isRegistryPlace == "Y" && this.selfform.isScale == "Y" &&
                        this.selfform.isServiceRange == "Y" && this.selfform.isCreditCon == "Y") {
                        this.wenzi1 = "";
                        this.wenzi = " 您参与的自评结果为：" + this.fenshu + "分，不符合评分标准，不能填报企业信息！";
                        this.isIf = true;
                        this.dialogVisible = true;
                    } else {
                        this.wenzi1 = "";
                        this.wenzi = " 您参与的自评结果为：" + this.fenshu + "分，基本准入条件不符合标准，不能填报企业信息！";
                        this.isIf = true;
                        this.dialogVisible = true;
                    }
                }
            },
            //继续填报
            keepOn() {
                this.$router.push({
                    name: 'InformationReporting',
                    query: {}
                })
            },

            getComSelfcommentByAnnualId() {
                let that = this;
                //自评表进入调用查询接口
                this.$$request({
                    url: this.$api.hyglApi.getComSelfcommentByAnnualId,
                    data: {}
                }).then(function (res) {
                    if (res.info != null) {
                        that.selfform.isRegistryPlace = res.info.isRegistryPlace;
                        that.selfform.isScale = res.info.isScale;
                        that.selfform.isServiceRange = res.info.isServiceRange;
                        that.selfform.isCreditCon = res.info.isCreditCon;
                        that.selfform.isHighTech = res.info.isHighTech;
                        that.selfform.isStandard = res.info.isStandard;
                        that.selfform.researcherRatioDm = res.info.researcherRatioDm;
                        that.selfform.researchCostaDm = res.info.researchCostaDm;
                        that.selfform.researchResultDm = res.info.researchResultDm;
                        that.selfform.uuid = res.info.uuid;
                        that.annualState = res.info.annualState;
                        that.$set(that.selfformState,'state',res.info.state)
                    }
                })
            },
            //获取企业名称
            getName(){
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComName,
                    data: {}
                }).then(function (res) {
                    if (res.result === 1) {
                        if(res.info.comName){
                            that.comName = res.info.comName;
                        }else {
                            that.comName = '';
                        }
                    }else{
                        that.$alert(res.msg, "系统异常，请联系管理员！", {});
                        return false;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                    return false;
                })
            },
        }
    }
</script>

<style scoped>
    .self_main {
        width: 800px;
        height: 500px;
    }

    .zt {
        display: inline;
        padding-bottom: -30px;
        margin-left: 50px;
    }

    .zt1 {
        display: inline;
    }

    .si {
        font-size: 30px;
        margin-left: 350px;
        font-family: STSong;
    }

    .si1 {
        font-size: 15px;
        margin-left: 350px;
        font-family: STSong;
    }

    .btnwz {
        margin-top: 20px;
        padding-bottom: 20px;
        text-align: center;
    }

    .top {
        margin-bottom: -10px;
    }

    .btn1 {
        width: 100px;
        height: 40px;

    }

    #dialog1 >>> .el-dialog .el-dialog__body{
        text-align: center;
    }

    .self_main >>> .el-form-item {
        margin-bottom: 0px;
    }

    .pfwzz {
        font-size: 24px;
    }

    .pfbtn {
        margin: 30px auto 10px auto;
    }

    .pfwz1 {
        font-size: 40px;
    }

    .diaheight {
        height: 500px;
    }

</style>
