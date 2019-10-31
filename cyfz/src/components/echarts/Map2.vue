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
                max: 1500,
                param: this.Data.params,//传过来的业务类型参数
                color: this.Data.color,//传递过来的颜色
                name: this.Data.name,//图标题
                download: this.Data.download,//是否下载按钮
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            //获取数据
            getData(){
                let that = this;
                this.$$request({
                    url: this.Data.url,
                    data: {
                        mapType: this.param,
                    }
                }).then(function (res) {
                    let list = res.info.one.data;
                    for (let i = 0; i < list.length; i++) {
                        let obj = {
                            name:'',
                            value:'',
                        }
                        obj.name = list[i].name;
                        obj.value = list[i].value;
                        that.data.push(obj);
                    }
                    that.max = res.info.one.maxCount;
                    that.$emit("sendData", res.info.two);
                }).then(function () {
                    that.drawLine();
                })
            },
            //绘制图表
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let id = "echartBar" + Math.random() * 1000;
                this.$el.setAttribute("id", id);
                let myChartContainer = document.getElementById(id);
                let myChartChina = echarts.init(myChartContainer);
                // 绘制图表
                let optionMap = { //地图配置项
                    tooltip: {},//鼠标悬停提示是否显示
                    title: {
                        text: this.name,
                        left: 'center',
                        top: [10],
                    },
                    toolbox: {
                        show: this.download,
                        top: [5],
                        right: [20],
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    // legend: {   //定位
                    //     orient: 'vertical',
                    //     left: 'left',
                    //     data: ['']
                    // },
                    visualMap: {
                        min: 0,
                        max: this.max,
                        left: '5%',
                        top: '50%',
                        text: ['高', '低'],
                        calculable: true,
                        color: this.color,
                        itemWidth: [10],
                        itemHeight: [100],
                    },
                    selectedMode: 'single',
                    series: [
                        {
                            name: '',
                            type:'map',
                            // type: 'scatter',
                            mapType: 'china',
                            itemStyle: {
                                normal: {
                                    borderColor: 'rgba(0, 0, 0, 0.2)'
                                },
                                emphasis: {
                                    shadowOffsetX: 10,
                                    shadowOffsetY: 10,
                                    shadowBlur: 20,
                                    borderWidth: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            showLegendSymbol: true,
                            label: {
                                position: [4, 5],
                                show: true,
                                fontSize: 8,
                                color: '#888888',
                                align: 'center'
                            },
                            data: this.data,//展示的地图数据
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
            'Data.params':function (val) {
                alert(val);
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
