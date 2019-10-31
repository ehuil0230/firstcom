<template>
    <div class="linechart">

    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "LineChart",
        props: {
            LineChartData: {
                text: String, //标题  不需要标题可不传
                titleSize: {  //标题大小
                    type: Number,
                    default: 20
                },
                download: { //是否显示下载按钮
                    type: Boolean,
                    default: false
                },
                data:[]
            },
        },
        data() {
            return {
                tipData: [],//线数据
                showData: [],//展示数据
                text: this.LineChartData.text, //大标题
                titleSize: this.LineChartData.titleSize, //标题大小
                download: this.LineChartData.download,
            }
        },
        // mounted() {
        //     this.drawLine();
        // },
        methods: {
            //绘制图表
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let id = "echartBar" + Math.random() * 1000;
                this.$el.setAttribute("id", id);
                let myChartContainer = document.getElementById(id);
                let myChartChina = echarts.init(myChartContainer);
                // 绘制图表
                let optionMap = {//折线图配置数据
                    color:['#6cacaf','#e4a526','#e4391d','#a1cb37','#8c97cb'],
                    title: {
                        x: 'center',
                        text: this.text,
                        textStyle: {
                            fontSize: this.titleSize,
                        },
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        top: [30],
                        data: this.tipData,
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        show: this.download,
                        top: [5],
                        right: [20],
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        interval: ['0'], //标签显示间隔
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] //x轴数据
                    },
                    yAxis: {
                        name: '(万元)',
                        nameGap: [10],
                        type: 'value'
                    },
                    series: this.showData,
                };
                myChartChina.setOption(optionMap);
                window.onresize = function () {
                    myChartChina.resize();
                }
            },
        },
        watch: {
            'LineChartData.data':function (val) {
                this.tipData = [];
                this.showData = [];
                for (let i = 0; i < val.length; i++) {
                    let obj = { //折线图需要的数据结构
                        name: '',
                        type: 'line',
                        data: []
                    };
                    obj.name = val[i].name;
                    this.tipData.push(val[i].name);
                    for(let j=0;j<val[i].monthlySales.length;j++){
                        obj.data.push(parseFloat(val[i].monthlySales[j]));
                    }
                    this.showData.push(obj);
                }
                this.drawLine();
            }
        }
    }
</script>

<style scoped>
    .linechart {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
</style>
