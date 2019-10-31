<!--全国产业信息监测-->
<template>
    <div id="echartsDemo">
        <div class="echarts_zhuce">
            <div class="echarts_map_zhuce">
                <Map style="width: 100%;height: 100%"
                     :Data="mapData1" @sendData="sendData1">
                </Map>
            </div>
            <div class="echarts_histogram_zhuce">
                <Histogram style="width: 100%; height: 85%"
                           :HistogramData="histogramData1">
                </Histogram>
                <div style="width: 100%; height: 15%">
                    <p>企业登记数</p>
                    <p>{{qydjs}}</p>
                </div>
            </div>

        </div>

        <div class="echarts_ziping">
            <div class="echarts_map_ziping">
                <Map style="width: 100%;height: 100%"
                     :Data="mapData2" @sendData="sendData2">
                </Map>
            </div>
            <div class="echarts_histogram_ziping">
                <Histogram style="width: 100%; height: 85%"
                           :HistogramData="histogramData2">
                </Histogram>
                <div style="width: 100%; height: 15%">
                    <p>企业填报数</p>
                    <p>{{qytbs}}</p>
                </div>
            </div>
        </div>

        <div class="echarts_tianbao">
            <div class="echarts_map_tianbao">
                <Map style="width: 100%;height: 100%"
                     :Data="mapData3" @sendData="sendData3">
                </Map>
            </div>
            <div class="echarts_histogram_tianbao">
                <Histogram style="width: 100%; height: 85%"
                           :HistogramData="histogramData3">
                </Histogram>
                <div style="width: 100%; height: 15%">
                    <p>企业申报数</p>
                    <p>{{qysbs}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Map from "@/components/echarts/Map";
    import Histogram from "@/components/echarts/Histogram";

    export default {
        name: "qgcyxxjc",

        components: {
            Map,
            Histogram
        },

        data() {
            return {
                qydjs: '',//企业登记数
                qytbs: '',//企业填报数
                qysbs: '',//企业申报数
                mapData1: {
                    // url: 'http://mockjs.com/api/getMapData',
                    url: this.$api.hyglApi.queryComSelfCommentNumGroupByProvByYear,
                    color: ['#62cee3', '#bae0e3'],
                    name: '企业登记数',
                    download: true, //是否显示保存为图片按钮 默认为false
                    params:'01'
                },

                histogramData1: {
                    color: ['#6ab5ff'],
                    name: '企业登记数',
                    download: true, //是否显示保存为图片按钮 默认为false
                    data:[],//向柱状图组件传递展示数据
                },

                mapData2: {
                    // url: 'http://mockjs.com/api/getMapData',
                    url: this.$api.hyglApi.queryComSelfCommentNumGroupByProvByYear,
                    color: ['#70b8ff', '#bcdeff'],
                    name: '企业填报数',
                    download: true, //是否显示保存为图片按钮 默认为false
                    params:'02'
                },

                histogramData2: {
                    color: ['#6ab5ff'],
                    name: '企业填报数',
                    download: true, //是否显示保存为图片按钮 默认为false
                    data:[],//向柱状图组件传递展示数据
                },

                mapData3: {
                    // url: 'http://mockjs.com/api/getMapData',
                    url: this.$api.hyglApi.queryComSelfCommentNumGroupByProvByYear,
                    color: ['#6ca7f1', '#c7d9f1'],
                    name: '企业申报数',
                    download: true, //是否显示保存为图片按钮 默认为false
                    params:'03'
                },

                histogramData3: {
                    color: ['#6ab5ff'],
                    name: '企业申报数',
                    download: true, //是否显示保存为图片按钮 默认为false
                    data:[],//向柱状图组件传递展示数据
                },
            }
        },
        methods:{
            sendData1(val){
                this.qydjs = val.totalCount[0];
                this.histogramData1.data = [];
                for (let i = 0; i < val.data.length; i++) {
                    if(i<10){
                        this.histogramData1.data.push(val.data[i])
                    }
                }
            },

            sendData2(val){
                this.qytbs = val.totalCount[1];
                this.histogramData2.data = [];
                for (let i = 0; i < val.data.length; i++) {
                    if(i<10){
                        this.histogramData2.data.push(val.data[i])
                    }
                }
            },

            sendData3(val){
                this.qysbs = val.totalCount[2];
                this.histogramData3.data = [];
                for (let i = 0; i < val.data.length; i++) {
                    if(i<10){
                        this.histogramData3.data.push(val.data[i])
                    }
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    #echartsDemo {
        text-align: center;
        margin: 20px auto;
        width: 95%;
    }

    .echarts_zhuce, .echarts_ziping, .echarts_tianbao {
        width: 100%;
        height: 400px;
        float: left;
        margin-bottom: 20px;
    }

    .echarts_map_zhuce, .echarts_map_ziping, .echarts_map_tianbao {
        width: 49.5%;
        height: 100%;
        float: left;
        box-shadow:0px 0px 3px 3px #f3f3f3;
    }

    .echarts_histogram_zhuce, .echarts_histogram_ziping, .echarts_histogram_tianbao {
        width: 49.5%;
        height: 100%;
        float: right;
        box-shadow:0px 0px 3px 3px #f3f3f3;
    }
</style>
