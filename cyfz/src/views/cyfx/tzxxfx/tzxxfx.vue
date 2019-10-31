<template>
    <div id="qgsyfx">
        <div class="qgsyfx_sm">
            <div class="zdfxzb_title">
                <i></i>
                <span>投资信息分析</span>
            </div>
            <div class="fangxiangtu">
                <div class="city_selected">
                    <div style="width: 95%;height: 100%;margin: 20px auto">
                        <div id="tzxxfx_myChart" style="width: 100%;height: 100%"></div>
                    </div>
                </div>
                <div class="jbfxt_charts">
                    <el-table
                        :data="tableData"
                        :row-style="{height:'40px'}"
                        :cell-style="{padding:'0px'}"
                        border
                        style="width:80%!important;margin: 0 auto">
                    <el-table-column prop="year" label="年度(年)" width="100"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="Investment" label="投资(万元)" width="150"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="Merger" label="融资(万元)" width="150"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="financing" label="并购(万元)" width="150"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="research" label="研发经费(万元)"></el-table-column>
                </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<!--右侧图表的代码-->
<script>
    // 引入echarts
    import echarts from 'echarts'
    //引入tablelist
    export default {
        // 表格
        name: 'table',
        props: ['HistogramData'],

        data() {
            return {
                tableData: [],//表格数据
                showData: [],//展示柱形图分类数据
                year: [],//展示柱形图年份
                datalist: [],//4条柱形图数据
            }
        },

        mounted() {
            this.gettouzifenxiData();
        },

        methods: {
            gettouzifenxiData() {
                let that = this;
                // 获取上面标准量柱状图数据
                this.$$request({
                    url: this.$api.cyfxApi.queryInvestmentInfoALL,
                    data: {}
                }).then(function (res) {
                    if (res.result === 1) {
                        that.showData = ['投资', '并购', '融资', '研发经费'];
                        for (let i = 0; i < res.info.one.data.length; i++) {
                            that.year.push(res.info.one.data[i].year);
                        }
                        that.datalist = [];
                        for (let j = 0; j < that.showData.length; j++) { //4
                            let obj = {
                                name: '',
                                type: 'bar',
                                data: [],
                                label: {
                                    normal: {
                                        show: false, //显示数字
                                        position: 'top' //这里可以自己选择位置
                                    }
                                },
                            }
                            obj.name = that.showData[j].valueOf();
                            that.datalist.push(obj);
                        }
                        for (let j = 0; j < that.year.length; j++) {
                            that.datalist[0].data.push(res.info.one.data[j].ventureNum);
                            that.datalist[1].data.push(res.info.one.data[j].financeNum);
                            that.datalist[2].data.push(res.info.one.data[j].mergerNum);
                            that.datalist[3].data.push(res.info.one.data[j].researchCost);
                        }
                        ;
                        that.tableData = [];
                        let list = res.info.two.data;
                        for (let i = 0; i < list.length; i++) {
                            let obj2 = {
                                year: '',
                                Investment: '',
                                Merger: '',
                                financing: '',
                                research: '',
                            }
                            obj2.year = list[i].year;
                            obj2.Investment = list[i].ventureNum;
                            obj2.Merger = list[i].mergerNum;
                            obj2.financing = list[i].financeNum;
                            obj2.research = list[i].researchCost;
                            that.tableData.push(obj2);
                        }
                    } else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {});
                        return false;
                    }
                }).then(function () {
                    that.drawLine();
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                });
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let $id = document.getElementById('tzxxfx_myChart')
                if(!!$id){
                    let myChart = echarts.init($id);
                    // 绘制图表
                    myChart.setOption({
                        title: {
                            text: '',//柱形图名字
                        },
                        color: ['#6cacaf', '#e4a529', '#a1cb37', '#8c97cb'],
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            axisPointer: {
                                type: 'shadow'
                            },
                            formatter: function (params) {
                                // for text color
                                let res = '<div style="color:' + 'black' + '">' + '<strong>' + params[0].name + '</strong>'
                                for (let i = 0, l = params.length; i < l; i++) {
                                    res += '<br/>' + params[i].seriesName + ' : ' + params[i].value
                                }
                                res += '</div>';
                                return res;
                            }
                        },
                        legend: {
                            x: 'center',
                            data: this.showData,
                        },
                        toolbox: {
                            show: true,
                            orient: 'vertical',
                            y: 'center',
                            right:'5%',
                            feature: {
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: true,
                        grid: {
                            top: '25%',
                            left: '5%',
                            right: '15%',
                            bottom: '5%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: this.year,
                                name: '(年）'
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '消费（万元）'
                            }
                        ],
                        series: this.datalist,
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #qgsyfx {
        width: 100%;
        background-color: @bgGray;
        overflow: hidden;
    }

    .qgsyfx_sm {
        width: 95%;
        margin: 0 auto;
    }

    .zdfxzb_title {
        width: 100%;
        height: 30px;
        text-align: left;
        line-height: 30px;
        margin-top: 10px;
        border-bottom: 2px @deepBlack solid;
    }

    .zdfxzb_title i {
        width: 5%;
        height: 100%;
    }

    .zdfxzb_title span {
        width: 95%;
        height: 100%;
        font-size: 16px;
        color: @textColor1;
        font-weight: bolder;
    }

    .fangxiangtu {
        width: 100%;
        height: 650px;
        background-color: @bgWhite;
    }

    .city_selected {
        text-align: center;
        width: 100%;
        height: 52%;
        float: left;
        padding: 0 auto;
    }

    .jbfxt_charts {
        width: 100%;
        height: 48%;
        float: left;
        padding-top: 25px;
        background-color: @bgWhite;
    }

    .city_selected .el-select {
        width: 20%;
    }

    .jb_table {
        width: 100%;
        height: 100%;
        float: left;
    }

    .jb_table p {
        width: 100%;
        height: 10%;
        margin-bottom: -30px;
        padding-top: 10px;
        text-align: center;
        font-size: 18px;
        font-family: sans-serif;
        font-style: normal;
        font-weight: bold;
    }
</style>
