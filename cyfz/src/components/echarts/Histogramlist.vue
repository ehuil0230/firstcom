<!--
    柱状图组件
-->
<template>
    <div class="histogram">

    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "Histogram",
        props: {
            HistogramData: {
                url: String,
                color: { //柱子颜色
                    type: Array,
                    default: ['#02a7b9'],
                },
                name: String, //标题  不需要标题可不传
                download: {   //是否显示下载按钮
                    type: Boolean,
                    default: false
                },
                showNumber: {  //柱顶是否显示具体数值
                    type: Boolean,
                    default: false
                },
                params: {  //参数
                    type: String,
                    default: '',
                },
                rotate: { //标签字体旋转角度 不传默认不旋转
                    default: [0]
                }
            }
        },
        data() {
            return {
                xData: [],//x轴数据
                yData: [],//y轴数据
                param: '',
                color: this.HistogramData.color,
                name: this.HistogramData.name,
                download: this.HistogramData.download,
                showNumber: this.HistogramData.showNumber,
                rotate: this.HistogramData.rotate,//标签字体旋转角度 不传默认不旋转
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            // 绘制图表
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let id = "echartBar" + Math.random() * 1000;
                this.$el.setAttribute("id", id);
                let myChartContainer = document.getElementById(id);
                let myChartChina = echarts.init(myChartContainer);
                // 绘制图表
                let optionMap = {  //柱形图配置项
                    color: this.color,
                    title: {
                        text: this.name,
                        left: 'center',
                        top: [],
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        show: this.download,
                        top: [5],
                        right: [20],
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        axisLabel: {
                            interval: ['0'], //标签显示间隔
                            rotate: this.rotate, //标签旋转角度
                        },
                        type: 'category',
                        data: this.xData,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: this.name,
                            type: 'bar',
                            barWidth: '60%',
                            data: this.yData,
                            label: {
                                normal: {
                                    show: this.showNumber,
                                    position: 'top',
                                    textStyle: {
                                        color: this.color,
                                    }
                                }
                            },
                        }
                    ],

                    // 柱形图另一个样式
                    //
                    //         color: ['#3398DB'],
                    //         tooltip: {
                    //             trigger: 'axis',
                    //             axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    //                 type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    //             }
                    //         },
                    //         grid: {
                    //             left: '1%',
                    //             right: '1%',
                    //             bottom: '1%',
                    //             containLabel: true
                    //         },
                    //         xAxis: [{
                    //             minInterval: 2,
                    //             type: 'category',
                    //             max:11,//限制显示的条数
                    //             data:this.xData,//X轴显示传入的数据
                    //             axisLabel: {
                    //                 inside: true,
                    //                 textStyle: {
                    //                     color: '#fff'
                    //                 }
                    //             },
                    //             axisTick: {
                    //                 show: false
                    //             },
                    //             axisLine: {
                    //                 show: false
                    //             },
                    //             z: 10
                    //         }],
                    //         yAxis: [{
                    //             type: 'value'
                    //         }],
                    //         series: [{
                    //             name: '1',
                    //             type: 'bar',
                    //             barWidth: '50%',
                    //             data:this.yData,//Y轴显示传入的数据
                    //             label: {
                    //                 normal: {
                    //                     show: true, //显示数字
                    //                     position: 'top' //这里可以自己选择位置
                    //                 }
                    //             }
                    //         }]
                    //     })
                    // },

                };
                myChartChina.setOption(optionMap);
                window.onresize = function () {
                    myChartChina.resize();
                }
            },
            //获取图表数据
            getData() {
                let that = this;
                this.$$request({
                    url: this.HistogramData.url,
                    data: {
                        code: this.param,
                    }
                }).then(function (res) {
                    that.xData = res.info.xData;
                    that.yData = res.info.yData;
                }).then(function () {
                    that.drawLine();
                })
            }
        },
        watch: {
            'HistogramData.params': function (val) {
                this.param = val;
                this.getData();
            }
        }
    }
</script>

<style lang="less" scoped>
    .histogram {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
</style>
