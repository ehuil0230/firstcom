<template>
    <div id="xdqzs">
        <div class="zscqfx_sm">
            <div class="zdfxzb_title">
                <span></span>
                <span>先导区分布展示</span>
            </div>
            <div class="zdfxzb_charts">
                <div id='MapBox'>
                    <Map2 style="width: 100%;height: 100%"
                          :Data="mapData1 " @sendData="sendData">
                    </Map2>
                </div>
            </div>
            <div class="zdfxzb_title" style="width: 100%">
                <span></span>
                <span>先导区图表分析</span>
            </div>
            <div class="shenqing" style="width: 100%">
                <div style="width: 100%;height:300px">
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
    import Map2 from "@/components/echarts/Map2";
    // import china from '@/static/china.js'

    export default {
        name: "xdqzs",
        props: ['HistogramData'],
        components: {
            Histogram,
            Map2
        },
        data() {
            return {
                //上侧地图数据
                mapData1: {
                    url: this.$api.cyfxApi.queryPilotAreaInfoALL,
                    color: ['#9ac6c8', '#e5f1f0'],
                    name: '先导区分布图',
                    download: true, //是否显示保存为图片按钮 默认为false
                },
                // 下侧四个柱形图
                histogramData1: {
                    color: ['#6cacaf'],
                    name: new Date().getFullYear().toString() - 1 + '年税收前10排行',
                    yName: '税收(万元)',
                    xName: '省份',
                    data: []
                },
                histogramData2: {
                    color: ['#e4a529'],
                    name: new Date().getFullYear().toString() - 1 + '年主营利润前10排行',
                    yName: '主营利润(万元)',
                    xName: '省份',
                    data: []
                },
                histogramData3: {
                    color: ['#a1cb37'],
                    name: new Date().getFullYear().toString() - 1 + '年营收前10排行',
                    yName: '营收(万元)',
                    xName: '省份',
                    data: []
                },
                histogramData4: {
                    color: ['#8c97cb'],
                    name: new Date().getFullYear().toString() - 1 + '年研发经费前10排行',
                    yName: '研发经费(万元)',
                    xName: '省份',
                    data: []
                },
            }
        },
        methods: {
            sendData(val) {
                this.histogramData1.data = [];
                this.histogramData2.data = [];
                this.histogramData3.data = [];
                this.histogramData4.data = [];
                for (let i = 0; i < val.taxRevenue.length; i++) {
                    let obj = {
                        name: '',
                        value: '',
                    }
                    obj.name = val.taxRevenue[i].province;
                    obj.value = val.taxRevenue[i].value;
                    this.histogramData1.data.push(obj);
                }
                for (let i = 0; i < val.majorProfit.length; i++) {
                    let obj = {
                        name: '',
                        value: '',
                    }
                    obj.name = val.majorProfit[i].province;
                    obj.value = val.majorProfit[i].value;
                    this.histogramData2.data.push(obj);
                }
                for (let i = 0; i < val.majorIncome.length; i++) {
                    let obj = {
                        name: '',
                        value: '',
                    }
                    obj.name = val.majorIncome[i].province;
                    obj.value = val.majorIncome[i].value;
                    this.histogramData3.data.push(obj);
                }
                for (let i = 0; i < val.researchCost.length; i++) {
                    let obj = {
                        name: '',
                        value: '',
                    }
                    obj.name = val.researchCost[i].province;
                    obj.value = val.researchCost[i].value;
                    this.histogramData4.data.push(obj);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #xdqzs {
        width: 100%;
        overflow: hidden;
        background-color: @bgGray;
    }

    #xdqzs .shenqing{
        height: 620px;
        background-color: @bgWhite;
        border-radius: 5px;
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
        margin-top: 20px;
    }

    .zdfxzb_charts {
        width: 100%;
        height: 600px;
        background-color: @bgWhite;
        margin-bottom: 10px;
        padding-top: 20px;
    }

    .shenqing {
        width: 100%;
        height: 650px;
        background-color: @bgWhite;
        border-radius: 5px;
    }

    span {
        font-size: 16px;
        font-weight: bold;
    }

    /*地图样式*/
    #MapBox {
        width: 100%;
        height: 100%;
        padding: 10px;
        position: relative;
    }

    /* 地图 */
    .baiduMap {
        height: 100%;
        width: 100%;
    }

    /* 去除地图上，左下字体标注 */
    .anchorBL {
        display: none;
    }
</style>
