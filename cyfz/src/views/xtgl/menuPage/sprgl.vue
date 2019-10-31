<template>
    <div class="rightMain">
        <el-form :inline="true" size="small">
            <div class="task-btn-item">
                <el-button @click="openXG" size="small" type="primary">修改</el-button>
                <el-button size="small" type="primary" @click="refreshTable">刷新</el-button>
            </div>
            <div class="task-form-item">
                <el-form-item label="所属省份">
                    <el-select v-model="provinceName" clearable placeholder="请选择">
                        <el-option
                                v-for="item in provinceNames"
                                :key="item.CODE"
                                :label="item.CAPTION"
                                :value="item.CODE">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button @click="search" size="small" style="margin-left: 10px" type="primary">搜索</el-button>
            </div>

        </el-form>
        <tableList ref="table"
                   selection
                   index
                   style="border-top: none;text-align: center"
                   :getDataWay="getDataWay"
                   :columns="columns"
                   :pagination="pagination"
                   :checkedData='checkedData'
        >
        </tableList>
        <el-dialog
                :close-on-click-modal=false
                title="修改审批人"
                :visible.sync="dialogFormVisible"
                v-dialogDrag
                @close="handleClose">
            <div class="el-dialog-div">
                <el-form :model="spForm" ref="spForm" label-width="90px"
                         class="demo-ruleForm">
                    <el-form-item label="审批人" prop="approverName">
                        <!--<el-select v-model="spForm.approverid" placeholder="请选择">
                            <el-option
                                    v-for="item in approverNames"
                                    :key="item.uuid"
                                    :label="item.realName"
                                    :value="item.uuid">
                            </el-option>
                        </el-select>-->
                        <el-input v-model="spForm.approverName" disabled="disabled">
                            <el-button slot="append" icon="el-icon-folder-opened"
                                       @click="openOrg"></el-button>
                        </el-input>
                        <transition name="el-zoom-in-top">
                            <div v-show="show2" class="transition-box">
                                <org-tree @nodeClick="nodeClick" @spCheckedChange="spCheckedChange"
                                          :org-tree-obj="orgTreeObj"></org-tree>
                            </div>
                        </transition>
                    </el-form-item>
                    <el-form-item label="审批类型" prop="approverTypeName">
                        <el-input v-model="spForm.approverTypeName" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="所属省份" prop="provinceName">
                        <el-input v-model="spForm.provinceName" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item style="padding-left: 35%">
                        <el-button type="primary" @click="saveForm()">保存</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </el-dialog>
    </div>
</template>
<script>
    import TableList from "../../../components/grid/TableList";
    import OrgTree from "../myToolbar/OrgTree";

    export default {
        name: "sprgl",
        components: {
            TableList,
            OrgTree
        },
        data() {
            return {
                show2: true,
                orgTreeObj: {
                    leftTreeProps: {// 左侧树props
                        label: 'name',
                        children: 'children'
                    },
                    daixuanTreeProps: {// 待选树props
                        label: 'realName'
                    },
                    orgTree: [],
                    daixuanData: [],
                    type: ''
                },
                provinceNames: [],
                provinceName: '',
                approverNames: [],
                dialogFormVisible: false,
                checkedData: [], //全选框
                //分页
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'center',
                    pageSizes: [10, 50, 100],//默认每页显示多少条
                    layout: 'sizes ,prev, pager, next, jumper'
                },
                //表单字段
                columns: [
                    {
                        label: '审批人',
                        prop: 'approverName',

                    },
                    {
                        label: '审批类型',
                        prop: 'approverTypeName',

                    },
                    {
                        label: '所属省份',
                        prop: 'provinceName',
                    }

                ],
                //调用组件传输返回页面数据
                getDataWay: {
                    dataType: "url",
                    data: this.$api.xtglApi.queryApproveUser,
                    type: "post",
                    param: {},
                },
                spForm: {
                    approverid: '',
                    approverName: '',
                    approverTypeName: '',
                    provinceName: ''
                }
            }
        },
        methods: {
            //审批人选中时
            spCheckedChange(data) {
                this.spForm.approverName = data.realName;
                this.spForm.approverid = data.uuid;
            },
            openOrg() {
                this.show2 = !this.show2;
            },
            nodeClick(data) {
                this.spForm.approverName = data.realName;
                this.spForm.approverid = data.uuid;
            },
            saveForm() {
                var that = this
                this.$$request({
                    url: this.$api.xtglApi.updateApproveUser,
                    data: {uuid: this.checkedData[0].uuid, approverid: this.spForm.approverid}
                }).then(function (res) {
                    if (res.result == 1) {
                        that.dialogFormVisible = false;
                        that.$refs.table.loadData();
                        that.$message({type: 'success', message: '修改成功'})
                    }
                }).catch(
                    function () {
                        that.$message({type: 'error', message: '修改失败'})
                    }
                )
            },
            search() {
                this.$set(this.getDataWay.param, 'provinceDm', this.provinceName);
                this.$refs.table.loadData();
            },
            //页面刷新
            refreshTable(refresh) {
                this.checkedData = [];
                this.$refs.table.loadData()
            },
            handleClose() {
                this.checkedData = [];
                this.$refs.table.loadData()
                this.orgTreeObj.daixuanData = []
                this.dialogFormVisible = false;

            },
            openXG() {
                if (this.checkedData.length === 1) {
                    this.dialogFormVisible = true
                    this.$set(this.spForm, 'approverid', this.checkedData[0].approverid);
                    this.$set(this.spForm, 'approverName', this.checkedData[0].approverName);
                    let that = this
                    this.$$request({
                        url: this.$api.homeApi.getListAllOrgTree,
                        data: {}
                    }).then(function (res) {
                        if (res.result === 1) {
                            that.orgTreeObj.orgTree = res.info
                        }
                    })

                    this.spForm.approverTypeName = this.checkedData[0].approverTypeName;
                    this.spForm.provinceName = this.checkedData[0].provinceName;
                } else {
                    this.$message({type: 'warning', message: '请选择一条数据'})
                }
            }
        },
        created() {
            var that = this
            // 请求省份码表
            this.$$request({
                url: this.$api.getCodeData,
                data: {
                    tableName: "DM_PROVINCE"
                }
            }).then(function (res) {
                if (res.result === 1) {
                    that.provinceNames = res.info;
                } else {
                    this.$message({type: 'error', message: '系统异常，请联系管理员！'})
                    return false
                }
            }).catch(function () {
                this.$message({type: 'error', message: '系统异常，请联系管理员！'})
                return false
            })
        },
    }


</script>
<style scoped lang="less">

    .rightMain {
        margin: 10px auto;
        width: 93%;
        /*margin-right: 90px;
        align:0 auto;
        padding-left: 10px;
        padding-top: 20px;
        min-width: 150px;*/
    }

    .task-form-item {
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