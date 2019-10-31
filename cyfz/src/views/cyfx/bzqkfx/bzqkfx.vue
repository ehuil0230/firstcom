<template>
    <div id="zscqfx">
        <div class="zscqfx_sm">
            <div class="zdfxzb_title">
                <span></span>
                <span>标准总量分析</span>
            </div>
            <div class="zdfxzb_charts">
                <div id="bzqk_echarts" style="width: 100%;height:320px;"></div>
            </div>
            <div class="zdfxzb_title" style="width: 100%">
                <span></span>
                <span>标准情况分析</span>
            </div>
            <div style="width: 100%;height: 35px;background-color: #fff">
                <div style="width: 150px;float: right;top: 50px">
                    <el-date-picker style="width: 150px"
                                    v-model="yearData"
                                    format="yyyy"
                                    value-format="yyyy"
                                    type="year"
                                    placeholder="选择年份">
                    </el-date-picker>
                </div>
            </div>
            <div class="shenqing" style="width: 100%">
                <div style="width: 100%;height:300px">
                    <Histogram style="width: 100%; height: 100%" :HistogramData="histogramlistData">
                    </Histogram>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入echarts
    import echarts from 'echarts'
    import Histogram from "@/components/echarts/Histogram";

    export default {
        name: "bzqkfx",
        components: {
            Histogram
        },

        data() {//数据
            return {
                yearData: (new Date().getFullYear() - 1).toString(),
                year: [],//展示标准情况柱形图年份
                showData: ['标准总量'],
                histogramlistData: {// 标准情况图接受数据
                    color: ['#6CACAf'],
                    showNumber: true,
                    // rotate: [60],
                    yName: '（数量）',
                    xName: '（地区）',
                    name: '标准数量',
                    data: [],
                },
                bzqkobj: {
                    name: '标准总量',
                    type: 'bar',
                    data: []
                }
            }
        },
        mounted() {
            this.getBzqkData();
            this.getHistogramData();
        },
        methods: {
            getHistogramData() {
                let that = this;
                this.$$request({
                    url: this.$api.cyfxApi.queryStandardConditionGroupByProByYear,
                    data: {
                        givenYear: this.yearData
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.histogramlistData.data = [];
                        for (let j = 0; j < res.info.data.length; j++) { //4
                            let obj = {
                                name: '',
                                value: '',
                            }
                            obj.name = res.info.data[j].province;
                            obj.value = res.info.data[j].standardNum;
                            if (j < 10) {
                                that.histogramlistData.data.push(obj);
                            }
                        }
                    } else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {});
                        return false;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            // 绘制项目申请图表
            drawLinexiangmushenbao() {
                // 基于准备好的dom，初始化echarts实例
                let $id = document.getElementById('bzqk_echarts');
                if(!!$id){
                    let myChartmain_xiangmushenqing = echarts.init($id);
                    myChartmain_xiangmushenqing.setOption({
                        color: ['#70b8ff'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        toolbox: {
                            feature: {
                                magicType: {
                                    show: true,
                                    type: ['line', 'bar']
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        legend: {
                            data: ['标准数量']  //标准数量接口图例数据
                        },
                        xAxis: [{
                            type: 'category',
                            data: this.year, //['2015','2016','2017','2018','2019'],接口x轴数据
                            axisPointer: {
                                type: 'shadow'
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            name: '（数量）',
                            axisLabel: {
                                formatter: '{value} 个'
                            }
                        },
                            {
                                type: 'value',
                                name: '（所占比例）',
                                min: 0,
                                max: 100,
                                interval: 10,
                                axisLabel: {
                                    formatter: '{value} %'
                                }
                            }],
                        series: this.bzqkobj
                    })
                }
            },
            //获取第一个图数据
            getBzqkData() {
                let that = this;
                // 获取上面标准量柱状图数据
                this.$$request({
                    url: this.$api.cyfxApi.queryStandardConditionGroupByYear,
                    data: {}
                }).then(function (res) {
                    let obj = {
                        name: '标准总量',
                        type: 'bar',
                        data: [],
                        barWidth: 40
                    }
                    if (res.result === 1) {
                        for (let i = 0; i < res.info.data.length; i++) {
                            that.year.push(res.info.data[i].year);
                            obj.data.push(res.info.data[i].standardNum);
                        }
                        that.bzqkobj = obj;
                    } else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {});
                        return false;
                    }
                }).then(function () {
                    that.drawLinexiangmushenbao();
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                });
            }
        },

        watch: {
            yearData: function (val) {
                this.yearData = val;
                this.getHistogramData();
            }
        },
    }
</script>

<style lang="less" scoped>
    #zscqfx {
        width: 100%;
        background-color: @bgGray;
        overflow: hidden;
    }

    .zscqfx_sm {
        width: 95%;
        margin: 0 auto;
    }

    .zdfxzb_title {
        width: 100%;
        height: 30px;
        text-align: left;
        line-height: 30px;
        border-bottom: 2px solid black;
    }

    .zdfxzb_charts {
        width: 100%;
        background-color: @bgWhite;
        margin-bottom: 10px;
        padding-top: 20px;
    }

    .shenqing {
        width: 100%;
        height: 320px;
        background-color: @bgWhite;
        border-radius: 5px;
    }

    span {
        font-size: 16px;
        font-weight: bold;
    }
</style>
