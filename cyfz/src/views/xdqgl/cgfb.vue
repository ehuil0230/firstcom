<template>
    <div class="rightMain">
        <tableList ref="table"
                   selection
                   index
                   style="border-top: none;text-align: center"
                   :getDataWay="getDataWay"
                   :columns="columns"
                   :pagination="pagination"
                   :getCheckedData.sync='getCheckedData'>
            <el-table-column label="标题" slot="bt" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="false" @click="selectXdq(scope.row)" class="a-link">
                        {{scope.row.bt}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>
    </div>
</template>

<script>
    import TableList from "../../components/grid/TableList";

    export default {
        name: "cgfb",
        components: {
            TableList
        },
        data() {
            return {
                //表单字段
                columns: [
                    {
                        label: '标题',
                        prop: 'title'
                    },{
                        label: '录入人',
                        prop: 'createUserName'
                    },{
                        label: '录入时间',
                        prop: 'createTime'
                    },{
                        label: '状态',
                        prop: 'stateName'
                    }
                ],
                //查询时需获取页面数据
                dirTableForm: {
                    uuid: '',
                    title: '',
                    createUserName: '',
                    createTime: '',
                    stateName: ''
                },
                //调用组件传输返回页面数据
                getDataWay:{dataType:"data",data:[]},
                pagination:{
                    totalSize: 15
                }
            }
        },
        methods: {
            //点击标题跳转页面方法
            selectXdq(data) {
                this.$router.push({
                    name: "xdqForm",
                    params: {
                        cldId: data.uuid
                    }
                })
            },
        },
        //加载页面前获取Mock数据
        beforeCreate: function () {
            const that = this
            this.$$request({
                url: "http://mockjs.com/api/cgfb",
                data: {type: 'top', key: '123456'}
            }).then(function (res) {
                that.getDataWay.data = res.info.list  //查询请求
                that.$refs.table.loadData()  //数据加载
            })
        }
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
</style>