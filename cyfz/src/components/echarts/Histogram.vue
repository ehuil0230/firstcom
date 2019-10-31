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
                data:[],
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
                rotate: { //标签字体旋转角度 不传默认不旋转
                    default: [0]
                },
                xName: { //x轴名字
                    type:String,
                    default:'',
                },
                yName: { //y轴名字
                    type:String,
                    default:'',
                }
            }
        },
        data() {
            return {
                xData: [],//x轴数据
                yData: [],//y轴数据
                color: this.HistogramData.color,
                name: this.HistogramData.name,
                download: this.HistogramData.download,
                showNumber: this.HistogramData.showNumber,
                rotate: this.HistogramData.rotate,//标签字体旋转角度 不传默认不旋转
                xName: this.HistogramData.xName,//x轴名字
                yName: this.HistogramData.yName,//y轴名字
            }
        },
        mounted(){
            if(this.HistogramData.url){
                this.getData()
            }
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
                        top: [10],
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
                        right: '10%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        name: this.xName,
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
                            name: this.yName,
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
                    ]
                };
                myChartChina.setOption(optionMap);
                window.onresize = function () {
                    myChartChina.resize();
                }
            },
        },
        watch: {
            'HistogramData.data':function (val) {
                this.xData = [];
                this.yData = [];
                for (let i = 0; i < val.length; i++) {
                    this.xData.push(val[i].name);
                    this.yData.push(val[i].value);
                }
                this.name = this.HistogramData.name;
                this.drawLine();
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
