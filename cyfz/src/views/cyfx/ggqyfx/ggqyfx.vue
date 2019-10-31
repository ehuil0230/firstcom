<template>
    <div id="qgsyfx">
        <div class="qgsyfx_sm">
            <div class="zdfxzb_title">
                <i></i>
                <span>骨干企业分析</span>
            </div>
            <div class="fangxiangtu">
                <div class="city_selected">
                    <div style="width: 100%; height: 41px;margin-top: 10px;margin-bottom: -10px"></div>
                    <div style="width: 100%;height: 640px;">
                        <el-table :data="tableData"
                                  :row-style="{height:'40px'}"
                                  :cell-style="{padding:'0px'}"
                                  border
                                  style="width: 100%!important;margin: 40px auto ">
                            <el-table-column :show-overflow-tooltip="true" prop="enterprise" label="企业名称"></el-table-column>
                            <el-table-column :show-overflow-tooltip="true" prop="dynamic" label="企业动态"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="jbfxt_charts">
                    <div style="margin-top:10px;width: 100%;">
                        <div style="width: 49%;float: left ">
                            <Histogram style="width: 100%; height: 300px" :HistogramData="histogramData1"></Histogram>
                        </div>
                        <div style="width: 49%;float: left ">
                            <Histogram style="width: 100%; height: 300px" :HistogramData="histogramData2"></Histogram>
                        </div>
                        <div style="width: 49%;float: left">
                            <Histogram style="width: 100%; height: 300px" :HistogramData="histogramData3"></Histogram>
                        </div>
                        <div style="width: 49%;float: left ">
                            <Histogram style="width: 100%; height: 300px" :HistogramData="histogramData4"></Histogram>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入echarts
    import echarts from 'echarts'

    import Histogram from "@/components/echarts/Histogram2";

    export default {
        name: "ggqyfx",
        props: ['HistogramData'],
        components: {
            Histogram
        },
        data() {
            return {
                //左侧表格数据
                tableData: [],
                // 右侧四个柱形图
                histogramData1: {
                    color: ['#6cacaf'],
                    name: (new Date().getFullYear()-1).toString() + '年税收前10排行',
                    data: [],
                    yName: '税收（万元）',
                    xName: '企业',
                    rotate: 45,
                },
                histogramData2: {
                    color: ['#e4a529'],
                    name: (new Date().getFullYear()-1).toString() + '年主营利润前10排行',
                    data: [],
                    yName: '主营利润（万元）',
                    xName: '企业',
                    rotate: 45,
                },
                histogramData3: {
                    color: ['#a1cb37'],
                    name: (new Date().getFullYear()-1).toString() + '年营收前10排行',
                    data: [],
                    yName: '营收（万元）',
                    xName: '企业',
                    rotate: 45,
                },
                histogramData4: {
                    color: ['#8c97cb'],
                    name: (new Date().getFullYear()-1).toString() + '年研发经费前10排行',
                    data: [],
                    yName: '研发经费（万元）',
                    xName: '企业',
                    rotate: 40,
                },
            }
        },
        created() {
            //请求表格数据
            let that = this;
            this.$$request({
                url: this.$api.cyfxApi.queryBackboneEnterpriseInfoALL,
                data: {
                    pageSize: '10',
                    givenYear: (new Date().getFullYear() - 1).toString(),
                }
            }).then(function (res) {
                if (res.result === 1) {
                    let list = res.info.one.data;
                    that.histogramData1.data = [];
                    that.histogramData2.data = [];
                    that.histogramData3.data = [];
                    that.histogramData4.data = [];
                    for (let i = 0; i < list.length; i++) {
                        if(i<10){
                            let obj = {
                                enterprise: '',
                                dynamic: '',
                            }
                            obj.enterprise = list[i].enterprise;
                            obj.dynamic = list[i].dynamic;
                            that.tableData.push(obj);
                        }
                    }
                    let taxRevenueList = res.info.two.taxRevenue;
                    for (let i = 0; i < taxRevenueList.length; i++) {
                        let obj = {
                            name: '',
                            value: '',
                        }
                        obj.name = taxRevenueList[i].enterprise;
                        obj.value = taxRevenueList[i].value;
                        that.histogramData1.data.push(obj);
                    }
                    let majorProfit = res.info.two.majorProfit;
                    for (let i = 0; i < majorProfit.length; i++) {
                        let obj = {
                            name: '',
                            value: '',
                        }
                        obj.name = majorProfit[i].enterprise;
                        obj.value = majorProfit[i].value;
                        that.histogramData2.data.push(obj);
                    }
                    let majorIncome = res.info.two.majorIncome;
                    for (let i = 0; i < majorIncome.length; i++) {
                        let obj = {
                            name: '',
                            value: '',
                        }
                        obj.name = majorIncome[i].enterprise;
                        obj.value = majorIncome[i].value;
                        that.histogramData3.data.push(obj);
                    }
                    let researchCost = res.info.two.researchCost;
                    for (let i = 0; i < researchCost.length; i++) {
                        let obj = {
                            name: '',
                            value: '',
                        }
                        obj.name = researchCost[i].enterprise;
                        obj.value = researchCost[i].value;
                        that.histogramData4.data.push(obj);
                    }
                } else {
                    that.$alert(res.msg, "系统异常，请联系管理员！", {});
                    return false;
                }
            }).catch(function (error) {
                that.$alert(error, "系统异常，请联系管理员！", {});
            });
        },
    }
</script>

<style lang="less" scoped>
    #qgsyfx {
        width: 100%;
        background-color: @bgGray;
        overflow: hidden;
    }

    .qgsyfx_sm {
        width: 95%;
        margin: 0 auto;
    }

    .zdfxzb_title {
        width: 100%;
        height: 30px;
        text-align: left;
        line-height: 30px;
        margin-top: 10px;
        border-bottom: 2px @deepBlack solid;
    }

    .zdfxzb_title i {
        width: 5%;
        height: 100%;
    }

    .zdfxzb_title span {
        width: 95%;
        height: 100%;
        font-size: 16px;
        color: @textColor1;
        font-weight: bolder;
    }

    .zdfxzb_charts {
        width: 100%;
        height: 620px;
        background-color: @bgWhite;
        margin-bottom: 10px;
    }

    .fangxiangtu {
        width: 100%;
        height: 634px;
        background-color: @bgWhite;
    }

    .city_selected {
        text-align: center;
        width: 30.9%;
        height: 100%;
        float: left;
        margin-left: 10px;
    }

    .city_selected .el-select {
        width: 20%;
    }

    .jbfxt_charts {
        width: 67%;
        height: 100%;
        float: right;
        padding-top: 22px;

    }

    .jb_table {
        width: 100%;
        height: 100%;
        float: left;
    }

    .jb_table p {
        width: 100%;
        height: 10%;
        margin-bottom: -30px;
        padding-top: 10px;
        text-align: center;
        font-size: 18px;
        font-family: sans-serif;
        font-style: normal;
        font-weight: bold;
    }
</style>
