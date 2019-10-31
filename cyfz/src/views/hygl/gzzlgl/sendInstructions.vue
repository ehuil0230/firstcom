<template>
    <div style="margin: 20px">
            <div style="display: inline-block;margin-bottom: 20px">
                <el-button @click="dialogFormVisible=true" size="small" type="primary">新建</el-button>
                <el-button size="small" style="margin-left: 10px" type="primary" @click="reload">刷新</el-button>
            </div>
            <div style="display: inline-block;float: right;">
                <el-input size="small" v-model="searchParams.title" placeholder="请输入标题名称"
                          prefix-icon="el-icon-search" @input="search">
                </el-input>
            </div>

        <tableList :columns="columns"
                   :getDataWay="getDataWay"
                   :pagination="pagination"
                   ref="table"
                   index
        >
            <el-table-column label="标题" slot="title" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="false" @click.stop="selectGg(scope.row)" class="a-link">
                        {{scope.row.title}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>
        <zl-dialog v-if="dialogFormVisible" :dialogFormVisible.sync="dialogFormVisible" :form="form" @afterNew="afterNew"></zl-dialog>
    </div>
</template>

<script>
    import tableList from '@/components/grid/TableList.vue';
    import zlDialog from "./zlDialog";

    export default {
        name: "sendInstructions",
        components: {
            tableList,
            zlDialog
        },
        data() {
            return {
                reciverList: [],
                form:{
                    //站内信代码
                    MailDm: '002',
                    //接收人ID
                    recievers: [],
                    //接收人姓名
                    recieverNames: '',
                    //接收标题
                    title: '',
                    //接收内容
                    content: '',
                    //传入uuid以此区分新建还是修改
                    uuid:''
                },
                //详情弹出框
                dialogFormVisibleInfo: false,
                //新建弹出框
                dialogFormVisible: false,
                //搜索框中的数据
                searchParams: {
                    //标题
                    title: '',
                    //接收人
                    recieverNames: '',
                },
                //数据接收
                getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryMySendMail,
                    param: {MailDm: '0002'}
                    //data: '/MailDetailCtrl/queryMySendMailDetail',
                }, // 通过url方式
                //分页
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'right',
                    layout: 'total,prev, pager, next, jumper'
                },
                columns: [
                    {
                        label: '接收人',
                        prop: 'recieverName',
                        width: '15%',
                    },
                    {
                        label: '标题',
                        prop: 'title',
                        template: true
                    },
                    {
                        label: '发送时间',
                        prop: 'createTime',
                        width: '20%',
                    },
                ],
            }
        },
        methods: {
            afterNew(obj){
                this.form = {
                    //站内信代码
                    MailDm: '002',
                    //接收人ID
                    recievers: [],
                    //接收人姓名
                    recieverNames: '',
                    //接收标题
                    title: '',
                    //接收内容
                    content: '',
                    //传入uuid以此区分新建还是修改
                    uuid:'',
                    type:0
                }
                this.$refs.table.loadData();
            },
            search(){
                this.$set(this.getDataWay.param,'title',this.searchParams.title);
                this.$refs.table.loadData()
            },
            reload() {
                this.$refs.table.loadData();
            },

            //点击标题弹出详情框
            selectGg(data) {
                this.dialogFormVisible = true;
                this.form.uuid = data.uuid;
                this.form.recieverNames = data.recieverName;
                this.form.title = data.title;
                this.form.content = data.content;

            },


        },
        created() {
            let that = this
            this.$$request({
                url: this.$api.homeApi.getLoginUserList,
                data: {}
            }).then(function (res) {
                that.reciverList = res.info;
            })
        }
    }
</script>

<style scoped lang="less">


    .task-form-item{
        margin-left: 200px;
        display: inline-block;
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
