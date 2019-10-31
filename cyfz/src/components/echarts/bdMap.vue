<!--地图组件-->
<template>
    <div class="chart_map">

    </div>
</template>

<script>
    import echarts from 'echarts'
    import china from 'echarts/map/json/china.json'
    echarts.registerMap('china', china)

    export default {
        name: 'Map',
        props: {
            Data: {
                url: String,
                color: { //地图的颜色范围
                    type: Array,
                    default: ['#0eb93d', '#00f4b3'], //深到浅
                },
                max: Number, //显示的最大值
                name: String,//标题名字
                download: { //是否显示下载按钮
                    type: Boolean,
                    default: false
                },
                params: {
                    type: String,
                    default:'',
                }
            }
        },
        data() {
            return {
                data: [],
                param:'',//传过来的业务类型参数
                color: this.Data.color,
                max: this.Data.max,
                name: this.Data.name,
                download: this.Data.download,
                data:this.data,

            }
        },
        mounted() {
            this.drawLine()
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
                let optionMap = { //地图配置项
                    geo: {
                        map: 'china',
                        itemStyle: {					// 定义样式
                            normal: {					// 普通状态下的样式
                                areaColor: '#bcdeff',
                                borderColor: '#fff'
                            },
                            emphasis: {					// 高亮状态下的样式
                                areaColor: '#e4a529'
                            }
                        }
                    },
                    // hover显示目标数据
                    tooltip : {
                        trigger: 'item',
                        // tooltip的trigger的值可以有'item'、'axis'。
                        //'item':数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
                        //'axis':坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                        textStyle:{
                            align:'left'
                        },
                    },
                    backgroundColor: '#fff',  		// 图表背景色
                    color: 'red',
                    // 新建散点图series
                    series: [{
                        type: 'scatter',//为散点类型
                        coordinateSystem: 'geo',// series坐标系类型
                        bddata:this.bddata
                        //     [
                        //     {name: '海门', value: [121.15, 31.89, 90]},
                        //     {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
                        //     {name: '招远', value: [120.38, 37.35, 142]},
                        //     {name: '舟山', value: [122.207216, 29.985295, 123]},
                        //     {name:'泉州', value: [118.58, 24.93]},
                        //     {name:'莱西', value: [120.53, 36.86]},
                        //     {name:'南通', value: [121.05, 32.08]},
                        //     {name:'拉萨', value: [91.11, 29.97]},
                        //     {name:'云浮', value: [112.02, 22.93]},
                        //     {name:'梅州', value: [116.1, 24.55]},
                        //     {name:'文登', value: [122.05, 37.2]},
                        //     {name:'上海', value: [121.48, 31.22]},
                        //
                        // ]
                        ,
                        symbol: 'pin',
                        symbolSize: [30, 30]
                    }],
                }

                myChartChina.setOption(optionMap);
                window.onresize = function () {
                    myChartChina.resize();
                }
            },
            //获取数据
            getData(){
                let that = this;
                this.$$request({
                    url: this.Data.url,
                    data: {
                        code: this.param,
                    }
                }).then(function (res) {
                    that.data = res.info.list;
                }).then(function () {
                    that.drawLine();
                })
            },
        },
        watch: {
            'Data.params':function (val) {
                this.param = val;
                this.getData();
            }
        },

    }
</script>

<style lang="less" scoped>
    .chart_map {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
</style>
