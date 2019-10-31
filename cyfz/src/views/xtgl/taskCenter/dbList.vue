<template>
    <div class="db-class">
        <el-form :model="ruleForm" label-width="80px" size="small">
            <div class="task-form-item">
                <el-form-item label="标题" class="bt">
                    <el-input v-model="ruleForm.title" placeholder="请输入标题" style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item prop="date" label="提交时间">
                    <el-date-picker
                            style="width: 160px;"
                            class="sj"
                            v-model="ruleForm.createTime"
                            type="date"
                            placeholder="选择提交时间"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="类型" class="lx">
                    <el-select v-model="ruleForm.approvalDm" placeholder="请选择类型" style="width: 160px;">
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
            <div class="task-btn-item" style="margin-left: 0">
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
            <el-table-column label="操作" slot="opts" width="150">
                <template v-slot="scope">
                    <el-button type="primary" size="mini" @click="examine(scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </tableList>
    </div>
</template>

<script>
    import tableList from '@/components/grid/TableList.vue';
    export default {
        name: "dbList",
        components: {
            tableList
        },
        data() {
            return {
                getDataWay: {
                    dataType: "url",
                    type: 'post',
                    // data: '/ApprovalCtrl/queryApproval',
                    data: this.$api.xtglApi.queryApproval,
                    param: {
                        isApproval: '0'
                    }
                }, // 通过url方式
                pagination: {     //分页
                    currentPage: 1,
                    pageSize: 10,
                    position: 'right',
                    layout: 'total,prev, pager, next, jumper'
                },
                ruleForm: {
                    title: "",
                    createTime: "",
                    approvalDm: "",
                },
                columns: [
                    {
                        label: '名称',
                        prop: 'title',
                        width: '300',
                    },
                    {
                        label: '类型',
                        prop: 'approvalName',
                        width: '210',
                    },
                    {
                        label: '提交时间',
                        prop: 'createTime',
                        width: '220',
                    },
                    {
                        label: '操作',
                        prop: 'opts',
                        template: true,//添加模板，一般处理操作列(注意：tempate、formatter不能同时使用)
                        width: '200',
                    },
                ],
            }
        },
        created() {
        },
        methods: {
            //查询
            search: function () {
                let queryObj = {};
                for (let item in this.ruleForm) {
                    if (this.ruleForm[item] !== "") {
                        queryObj[item] = this.ruleForm[item];
                    }
                }
                this.getDataWay.param = Object.assign(queryObj, {
                    isApproval: '0'
                });
                this.$refs.table.loadData();
            },
            //重置
            reset: function () {
                this.ruleForm.title = "";
                this.ruleForm.createTime = "";
                this.ruleForm.approvalDm = "";
                this.getDataWay.param = {isApproval: '0'};
                this.$refs.table.loadData();
            },
            //刷新
            refresh: function () {
                this.$refs.table.loadData();
            },
            //审核
            examine(row) {
                if(row.route){
                    let routerName = row.route.split('?')[0];
                    let routerParams = row.route.split('?')[1].split("&");
                    let queryObj = {};
                    routerParams.forEach((item) => {
                        let key = item.split('=')[0];
                        let value = item.split('=')[1];
                        queryObj[key] = value
                    });
                    this.$router.push({
                        name: routerName,
                        query: queryObj
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .db-class /deep/ .el-form-item{
        margin-bottom: 10px;
        display: inline-block;
        vertical-align: middle;
    }

    .task-form-item{
        display: inline-block;
    }

    .task-btn-item {
        padding-top: 0;
        display: inline-block;
        margin-left: 0px;
        vertical-align: middle;
        float: right;
        padding-right: 5px;
    }

</style>
