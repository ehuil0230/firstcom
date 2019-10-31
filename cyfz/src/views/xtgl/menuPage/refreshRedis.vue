<template>
    <div class="rightMain">
        <el-form :inline="true"  size="small" >
            <div class="" style="margin-bottom: 23px;margin-top:15px">
                <el-button size="small"  type="primary"  @click="refreshTable"><i class="el-icon-refresh ywBtn"></i>一键刷新</el-button>
            </div>
        </el-form>
        <tableList ref="table"
                   selection
                   index
                   style="border-top: none;text-align: center"
                   :getDataWay="getDataWay"
                   :columns="columns"
                   :checkedData='checkedData'
        >
        </tableList>
    </div>
</template>
<script>
    import TableList from "../../../components/grid/TableList";

    export default {
        name: "refreshRedis",
        components: {
            TableList,
        },
        data() {
            return {
                checkedData: [], //全选框
                //表单字段
                columns: [
                    {
                        label: '表名',
                        prop: 'tableName',

                    },
                    /*{
                        label: '索引列',
                        prop: 'indexColumns'
                    },*/
                    {
                        label: 'SQL脚本',
                        prop: 'dataQuerySql',
                    },
                    {
                        label: '分组列',
                        prop: 'groupIndex'
                    },
                    {
                        label: '存储类型',
                        prop: 'redisType',

                    },
                    /*{
                        label: '说明',
                        prop: 'indexCaption',
                    },*/
                ],
                //调用组件传输返回页面数据
                getDataWay: {
                    dataType: "url",
                    data: this.$api.xtglApi.queryRedisTable,
                    type: "post",
                    param: {},
                },
            }
        },
        methods: {
            //直接全部刷新
            refreshTable() {
                const that = this
                this.$$request({
                    method:'post',
                    url:this.$api.xtglApi.refreshRedis,
                    data:{
                        'tableName': ''
                    },
                }).then(res => {
                    if(res.result == 1){
                        that.$message({
                            message: '缓存刷新成功！',
                            type: 'success'
                        })
                    }else{
                        that.$message({
                            message: '缓存刷新失败!',
                            type: 'error'
                        })
                    }
                    this.checkedData = [];
                    this.$refs.table.loadData()
                }).catch(function (err) {
                    that.$alert(err, "系统异常，请联系管理员！", {});
                })
            },
            //页面刷新
            refreshTable2() {
                const that = this
                let refreshParam = ''
                //暂时无批量刷新，但可一键刷新全部
                if(this.checkedData.length > 1) {
                    this.$alert('请选中一条数据进行刷新！','提示',{
                        type: 'warning'
                    })
                    return false
                }else if(this.checkedData.length == 1) {
                    //预留批量刷新方法
                    this.checkedData.forEach((item) => {
                        refreshParam += (item.tableName + ',')
                    })
                }
                this.$$request({
                    method:'post',
                    url:this.$api.xtglApi.refreshRedis,
                    data:{
                        'tableName': refreshParam
                    },
                }).then(res => {
                    if(res.result == 1){
                        that.$message({
                            message: '缓存刷新成功！',
                            type: 'success'
                        })
                    }else{
                        that.$message({
                            message: '缓存刷新失败!',
                            type: 'error'
                        })
                    }
                    this.checkedData = [];
                    this.$refs.table.loadData()
                }).catch(function (err) {
                    that.$alert(err, "系统异常，请联系管理员！", {});
                })
            },
        },
    }




</script>
<style scoped>
    /*.screenFilter{
       overflow-x: hidden;
       overflow-y: hidden;
   }*/
    .rightMain {
        margin: 10px auto;
        width: 93%;
        /*margin-right: 90px;
        align:0 auto;
        padding-left: 10px;
        padding-top: 20px;
        min-width: 150px;*/
    }

    .task-form-item{
        margin-left: 359px;
        display: inline-block;
        vertical-align: middle;
    }

    .task-btn-item {
        padding-top: 0;
        display: inline-block;
        margin-left: 0px;
        vertical-align: middle;
        float: left;
        padding-left: 10px;
    }
</style>