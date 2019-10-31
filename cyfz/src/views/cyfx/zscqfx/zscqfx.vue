<template>
    <div id="zscqfx">
        <div class="zscqfx_sm">
            <div class="zdfxzb_title">
                <span></span>
                <span>知识产权量</span>
            </div>
            <div class="zdfxzb_charts">
                <div id="main_zhishichanquan" style="width: 100%;height:320px;"></div>
            </div>
            <div class="zdfxzb_title" style="width: 100%">
                <span></span>
                <span>知识申报量</span>
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
                    <Histogram style="width: 100%; height: 100%"
                               :HistogramData="histogramlistData">
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
        name: "zscqfx",
        components: {
            Histogram
        },
        data() {//数据
            return {
                yearData: (new Date().getFullYear() - 1).toString(),
                year: [],//展示项目申报柱形图年份
                datalist: [],
                histogramlistData: {// 知识申报图表接受数据
                    color: ['#70B8FF'],
                    name: '产权申报',
                    showNumber: true,
                    yName: '（数量）',
                    xName: '（地区）',
                    data: [],
                }
            }
        },
        mounted() {
            this.getZscqData();
            this.getHistogramData();
        },
        methods: {
            getHistogramData() {
                let that = this;
                this.$$request({
                    url: this.$api.cyfxApi.queryIntellectualPropertyGroupByProByYear,
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
                            obj.value = res.info.data[j].intellectualPropertyNum;
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
            //获取第一个图数据
            getZscqData() {
                let that = this;
                // 获取上面标准量柱状图数据
                this.$$request({
                    url: this.$api.cyfxApi.queryIntellectualPropertyGroupByYear,
                    data: {}
                }).then(function (res) {

                    if (res.result === 1) {
                        let showData = ['一类知识产权数', '二类知识产权数', '知识产权总数'];
                        for (let i = 0; i < res.info.data.length; i++) {
                            that.year.push(res.info.data[i].year);
                        }
                        for (let j = 0; j < showData.length; j++) { //4
                            let obj = {
                                name: '',
                                type: 'bar',
                                data: [],
                                label: {
                                    normal: {
                                        show: true, //显示数字
                                        position: 'top' //这里可以自己选择位置
                                    }
                                },
                            }
                            obj.name = showData[j].valueOf();
                            that.datalist.push(obj);
                        }
                        for (let j = 0; j < that.year.length; j++) {
                            that.datalist[0].data.push(res.info.data[j].primaryPropertyNum);
                            that.datalist[1].data.push(res.info.data[j].secondaryPropertyNum);
                            that.datalist[2].data.push(parseInt(res.info.data[j].primaryPropertyNum) + parseInt(res.info.data[j].secondaryPropertyNum));
                        }
                    } else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {});
                        return false;
                    }
                }).then(function () {
                    that.drawLinezhishichanquan();
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                });
            },
            // 绘制项目申请图表
            drawLinezhishichanquan() {
                // 基于准备好的dom，初始化echarts实例
                let $id = document.getElementById('main_zhishichanquan');
                if(!!$id){
                    let myChartmain_zhishichanquan = echarts.init($id);
                    myChartmain_zhishichanquan.setOption({
                        color: ['#6cacaf', '#e4a529', '#a1cb37'],
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
                            data: this.showData //['一类项目申请量','二类项目申请量','项目申请总量','所占比例']  接口图例数据
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
                            }
                        ],
                        series: this.datalist,//接口柱状图数据
                    })
                }
            },
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
        /*height: 400px;*/
        background-color: @bgWhite;
        margin-bottom: 10px;
        padding-top: 20px;
    }

    .zdfxzb_charts {
        width: 100%;
        /*height: 400px;*/
        background-color: @bgWhite;
        margin-bottom: 10px;
        padding-top: 20px;
    }

    .shenqing {
        width: 100%;
        height: 320px;
        /*margin-top: 4px;*/
        background-color: @bgWhite;
        border-radius: 5px;
    }

    span {
        font-size: 16px;
        font-weight: bold;
    }
</style>
