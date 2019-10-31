<!--全国收益分析-->
<template>
    <div id="qgsyfx">
        <div class="qgsyfx_sm">
            <div class="zdfxzb_title">
                <i></i>
                <span>重点方向占比图及趋势</span>
            </div>
            <div class="zdfxzb_charts">
                <Piechart style="width: 100%;height: 50%; float: left"
                          :PieChart="pieChartData">
                </Piechart>
                <LineChart style="width: 100%;height: 50%;float: left"
                           :LineChartData="lineChartData">
                </LineChart>
            </div>
            <div class="zdfxzb_title">
                <i></i>
                <span>揭榜方向分析图</span>
            </div>
            <div class="fangxiangtu">
                <div class="city_selected">
                    <div style="width: 100%;height: 100%;">
                        <Histogram style="width: 100%; height: 100%"
                                   :HistogramData="histogramData">
                        </Histogram>
                    </div>
                </div>
                <div class="jbfxt_charts">
                    <div class="jb_table">
                        <p>全国各省（市）收入排名TOP5（时间：{{year}}年）</p>
                        <el-table
                                :data="tableData"
                                :row-style="{height:'40px'}"
                                :cell-style="{padding:'0px'}"
                                border
                                style="width: 90%!important;margin: 40px auto 30px auto">
                            <el-table-column prop="num" label="排名" width="50"></el-table-column>
                            <el-table-column :show-overflow-tooltip="true" prop="city" label="省份" width="150"></el-table-column>
                            <el-table-column :show-overflow-tooltip="true" prop="money" label="产业收入（万元）"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Piechart from "@/components/echarts/Piechart";
    import LineChart from "@/components/echarts/LineChart";
    import Histogram from "@/components/echarts/Histogram";

    export default {
        name: "qgsyfx",
        components: {
            Piechart,
            LineChart,
            Histogram
        },
        data() {
            return {
                tableData: [],//表格数据
                year: '',
                pieChartData: {
                    text: '重点方向收入占比',
                    subtext: (new Date().getFullYear()-1).toString()+'年',
                    titleSize: 16,
                    download: true,
                    data:[],
                    danwei:'万元',
                },
                lineChartData: {
                    text: '重点方向分析',
                    titleSize: 16,
                    download: true,
                    data:[]
                },
                histogramData: {
                    color: ['#70b8ff'],
                    showNumber: false,
                    rotate: [60],
                    yName:'（万元）',
                    data:[]
                }
            }
        },
        created() {
            let that = this;
            //获取年份
            this.year = (new Date().getFullYear()-1).toString();
            //获取数据
            this.$$request({
                // url: 'http://mockjs.com/api/getChanzhishouyi',
                url: this.$api.cyfxApi.queryIndustryProfitResult,
                data: {

                }
            }).then(function (res) {
                if(res.result === 1){
                    that.pieChartData.data = res.info.pie.data;
                    that.lineChartData.data = res.info.lineChart.data;
                    that.histogramData.data = res.info.histogram.data;

                    //判断返回数据的长度是否大于5
                    let listlength= res.info.list.data.length;
                    if (listlength>5){
                        listlength=5;
                    }

                    for (let i = 0; i <listlength; i++) {
                        let obj = {
                            num: 0,
                            city: '',
                            money: '',
                        }
                        obj.num = i+1;
                        obj.city = res.info.list.data[i].province;
                        obj.money = res.info.list.data[i].annualSales;
                        that.tableData.push(obj);
                    }
                }else{
                    that.$alert(res.msg, "系统异常，请联系管理员！", {});
                    return false;
                }
            }).catch(function (error) {
                that.$alert(error, "系统异常，请联系管理员！", {});
                return false;
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
        height: 700px;
        background-color: @bgWhite;
        margin-bottom: 10px;
    }

    .fangxiangtu {
        width: 100%;
        height: 320px;
        background-color: @bgWhite;
    }

    .city_selected {
        text-align: center;
        width: 50%;
        height: 100%;
        float: left;
    }

    .city_selected .el-select {
        width: 20%;
    }

    .jbfxt_charts {
        width: 50%;
        height: 100%;
        float: left;
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
