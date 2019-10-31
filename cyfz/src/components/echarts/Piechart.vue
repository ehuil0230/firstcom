<!--饼图组件-->
<template>
    <div class="piechart">

    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "Piechart",
        props: {
            PieChart: {
                text: String, //标题
                subtext: String, //小标题
                titleSize: { //标题大小
                    type: Number,
                    default: 20
                },
                download: { //是否显示下载按钮
                    type: Boolean,
                    default: false
                },
                data:[],//接收展示数据
                danwei:String,
            },
        },
        data() {
            return {
                text: this.PieChart.text, //大标题
                subtext: this.PieChart.subtext, //小标题
                titleSize: this.PieChart.titleSize, //标题大小
                tipData: [],//提示数据
                showData: [],//展示数据
                download: this.PieChart.download,
                danwei:this.PieChart.danwei,//返回单位
            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            //绘制图表
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let id = "echartBar" + Math.random() * 1000;
                this.$el.setAttribute("id", id);
                let myChartContainer = document.getElementById(id);
                let myChartChina = echarts.init(myChartContainer);
                // 绘制图表
                let optionMap = { //饼图配置项
                    title: {
                        text: this.text,
                        subtext: this.subtext,
                        x: 'center',
                        textStyle: {
                            fontSize: this.titleSize,
                        },
                        top: [10],
                    },
                    tooltip: {
                        name:'',
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show: this.download,
                        top: [5],
                        right: [20],
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.tipData,
                    },
                    series: [
                        {
                            color:['#6cacaf','#e4a526','#e4391d','#a1cb37','#8c97cb'],
                            name:'',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: '60%',
                            center: ['50%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{b|{b}：}{c}'+this.danwei+'  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 20,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 12,
                                            lineHeight: 20
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#393947',
                                            borderRadius: 2,
                                            height: 14
                                        }
                                    }
                                }
                            },
                            data: this.showData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
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
            'PieChart.data':function (val) {
                for (let i = 0; i < val.length; i++) {
                    this.tipData.push(val[i].name);
                    this.showData = val;
                }
                this.drawLine();
            }
        }
    }
</script>

<style lang="less" scoped>
    .piechart {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
</style>
