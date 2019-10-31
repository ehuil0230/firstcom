<template>
    <div class="rightMain">
        <screenFilter :searchParams="searchParams">
            <template slot="slot_one">
                <el-button type="primary" size="small" @click="test"><i class="el-icon-edit-outline"></i>新建</el-button>
                <el-button type="primary" size="small" @click="test"><i class="el-icon-edit"></i>修改</el-button>
                <el-button type="primary" size="small" @click="test"><i class="el-icon-thumb"></i>发布</el-button>
                <el-button type="primary" size="small" @click="test"><i class="el-icon-delete"></i>删除</el-button>
                <el-button type="primary" size="small" @click="test"><i class="el-icon-search"></i>搜索</el-button>
            </template>
        </screenFilter>
        <tableList ref="table"
                   selection
                   index
                   style="border-top: none;text-align: center"
                   :getDataWay="getDataWay"
                   :columns="columns"
                   :pagination="pagination"
                   :getCheckedData.sync='getCheckedData'
        >
            <el-table-column label="标题" slot="bt" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="false" @click="selectaaa(scope.row)" class="a-link">
                        {{scope.row.bt}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>

    </div>
</template>

<script>
    import TableList from "../../../components/grid/TableList";

    export default {
        name: "jbdw",
        components: {
            TableList,
        },
        data() {
            return {
                getCheckedData: [], //全选框
                //分页
                pagination: {
                    currentPage: 1,
                    pageSize: 2,
                    position: 'center',
                    pageSizes: [10, 50, 100],//默认每页显示多少条
                    layout: 'sizes ,prev, pager, next, jumper'
                },
                //表单字段
                columns: [
                    {
                        label: '揭榜文件名称',
                        prop: 'name',
                    },
                    {
                        label: '录入部门',
                        prop: 'loggingDept',
                    },
                    {
                        label: '录入日期',
                        prop: 'loggingDate',
                    },
                    {
                        label: '状态',
                        prop: 'loggingStatus',
                    },
                ],
                //查询时需获取页面数据
                dirTableForm: {
                    cldId: '',
                    name: '',
                    loggingDept: '',
                    loggingDate: '',
                    loggingStatus: '',
                },
                //调用组件传输返回页面数据
                getDataWay: {dataType: "data", data: []},
            }
        },
        methods: {
            //点击标题跳转页面方法
            selectWj(data) {
                this.$router.push({
                    name: "jbForm",
                    params: {
                        cldId: data.cldId
                    }
                })
            },
        },
        created() {
            var that = this
            this.$$request({
                url: "http://mockjs.com/api/qldw",
                data: {type: 'top', key: '123456'}
            }).then(function (res) {
                that.getDataWay.data = res.info.list  //查询请求
                that.$refs.table.loadData()  //数据加载
            })
        }
        //加载页面前获取Mock数据

    }
</script>
<style scoped>
    .rightMain {
        margin: 10px auto;
        width: 93%;
        /*margin-right: 90px;
        align:0 auto;
        padding-left: 10px;
        padding-top: 20px;
        min-width: 150px;*/
    }

    .transition-box {
        margin-bottom: 10px;
        width: 100%;
        height: 300px;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
</style>
