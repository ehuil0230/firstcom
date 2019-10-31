<template>
    <div class="yb-class">
        <el-form :model="form" label-width="80px" size="small">
            <div class="form-item">
                <el-form-item label="标题" class="bt">
                    <el-input v-model="form.title" placeholder="请输入标题" style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item prop="date" label="提交时间">
                    <el-date-picker
                            style="width: 160px;"
                            class="sj"
                            v-model="form.createTime"
                            type="date"
                            placeholder="选择提交时间"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="类型" class="lx">
                    <el-select v-model="form.approvalDm" placeholder="请选择类型" style="width: 160px;">
                        <el-option :key="1" label="通知公告" value="010001"></el-option>
                        <el-option :key="2" label="政策文件" value="010002"></el-option>
                        <el-option :key="3" label="政策解读" value="010003"></el-option>
                        <el-option :key="4" label="揭榜单位" value="010004"></el-option>
                        <el-option :key="5" label="潜力单位" value="010005"></el-option>
                        <el-option :key="6" label="揭榜结果公示" value="010006"></el-option>
                        <el-option :key="7" label="先导区绩效考核" value="010007"></el-option>
                        <el-option :key="8" label="宣传推荐" value="010008"></el-option>
                        <el-option :key="9" label="政策汇总" value="010009"></el-option>
                        <el-option :key="10" label="成果发布" value="010010"></el-option>
                        <el-option :key="11" label="先导区信息填报" value="010020"></el-option>
                        <el-option :key="12" label="企业自评" value="020001"></el-option>
                        <el-option :key="13" label="企业年报" value="020002"></el-option>
                        <el-option :key="14" label="企业月报" value="020003"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="btn-item" style="margin-left: 0">
                <el-button type="primary" icon="el-icon-search" @click="search()" size="small" style="padding: 9px 7px;">查询</el-button>
                <el-button type="primary" icon="el-icon-circle-close" @click="reset()" size="small" style="padding: 9px 7px;">重置</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="refresh()" size="small" style="padding: 9px 7px;">刷新</el-button>
            </div>
        </el-form>
        <tableList ref="table"
                   :getDataWay="getDataWay"
                   :columns="columns"
                   index
                   :pagination="pagination">
        </tableList>
    </div>
</template>

<script>
    import tableList from '@/components/grid/TableList.vue';

    export default {
        name: "CommissionTask",
        components: {
            tableList
        },
        data() {
            return {
                getCheckedData: [], //复选框选中的数据
                // getDataWay:{dataType:"url",type:'get',data:'/mockData/list/data.json',param:{}}, // 通过url方式
                getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: '/ApprovalCtrl/queryApproval',
                    param: {
                        isApproval:'Y'
                    }
                }, // 通过url方式
                pagination: {     //分页
                    currentPage: 1,
                    pageSize: 10,
                    position: 'right',
                    layout: 'total,prev, pager, next, jumper'
                },
                form: {
                    title: "",
                    createTime: '',
                    approvalDm: "",
                },
                columns: [
                    {
                        label: '名称',
                        prop: 'title',
                        width: '400',
                    },
                    {
                        label: '类型',
                        prop: 'approvalName',
                        width: '250',
                    },
                    {
                        label: '提交时间',
                        prop: 'createTime',
                        width: '230',
                    },
                ],
            }
        },
        methods: {
            //查询
            search: function () {
                let queryObj={};
                for (let item in this.form){
                    if(this.form[item]!==""){
                        queryObj[item] = this.form[item];
                    }
                }
                this.getDataWay.param=Object.assign(queryObj,{
                    isApproval:'Y'
                });
                this.$refs.table.loadData();
            },
            //重置
            reset: function () {
                this.form.title="";
                this.form.createTime="";
                this.form.approvalDm="";
                this.getDataWay.param={isApproval:'Y'};
                this.$refs.table.loadData();
            },
            //刷新
            refresh: function () {
                this.$refs.table.loadData();
            },

        }
    }
</script>

<style scoped>
    .yb-class /deep/ .el-form-item{
        margin-bottom: 10px;
        display: inline-block;
        vertical-align: middle;
    }

    .form-item{
        display: inline-block;
    }

    .btn-item {
        padding-top: 0;
        display: inline-block;
        margin-left: 0px;
        vertical-align: middle;
        float: right;
        padding-right: 5px;
    }

</style>
