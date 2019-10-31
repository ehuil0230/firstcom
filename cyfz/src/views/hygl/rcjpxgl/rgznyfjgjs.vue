<template>
    <div style="overflow-x: hidden">
        <div class="xbt">
            <el-button v-if="packageStatus === 'hlw'" @click="add('form')" size="medium" type="primary">添加</el-button>
            <el-button v-if="packageStatus === 'hlw'" @click="update" size="medium" type="primary">修改</el-button>
            <el-button v-if="packageStatus === 'hlw'" @click="del" size="medium" type="primary">删除</el-button>
        </div>
        <div style="margin-top: 15px">
            <table-list :columns="columns"
                        :checkedData='checkedData'
                        :getDataWay="getDataWay"
                        :pagination="pagination"
                        index
                        ref="table"
                        selection>
                <el-table-column label="年度" slot="givenYear" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-link :underline="false" @click.stop="getDetail(scope.row)" class="a-link">
                            {{scope.row.givenYear}}
                        </el-link>
                    </template>
                </el-table-column>
            </table-list>
        </div>
        <el-dialog
                @open="openDialog"
                :close-on-click-modal="false"
                :visible.sync="dialogFormVisible"
                title="人工智能研发机构建设"
                v-dialogDrag
                width="960px"
                @close="handleClose"
        >
            <el-form :inline="true" :model="form" :rules="rules" class="demo-form df" label-width="180px" ref="form"
                     size="mini">
                <el-form-item label="企业名称">
                    <el-input :disabled="true" class="rc" v-model="form.comName"></el-input>
                </el-form-item>
                <el-form-item label="所属年度" prop="givenYear">
                    <el-date-picker
                            :disabled="packageStatus !== 'hlw'"
                            class="rc"
                            placeholder="选择年度"
                            type="year"
                            v-model="form.givenYear"
                            format="yyyy"
                            value-format="yyyy">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="企业建立研发机构数" prop="researchOrgNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.researchOrgNum"
                              maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="当年新建研发机构数" prop="newOrgNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.newOrgNum"
                              maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="在境外建立研发机构数" prop="exOrgNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.exOrgNum"
                              maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="研发机构场地总面积" prop="area">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" placeholder="单位平方米"
                              v-model.number="form.area" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="企业研发设备资产总额" prop="equipAccounts">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" placeholder="单位万元"
                              v-model.number="form.equipAccounts"
                              maxlength="8"></el-input>
                </el-form-item>
                <el-form-item label="研发机构人员数" prop="researcherNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.researcherNum"
                              maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="当年新增研发设备数" prop="newEquipNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.newEquipNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item style="width: 100%;text-align: center">
                    <el-button v-if="packageStatus === 'hlw'" class="btnc" @click="submitForm('form')" size="medium "
                               type="primary">保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import TableList from "../../../components/grid/TableList";

    export default {
        name: "rgznyfjgjs",
        components: {TableList},
        data() {
            return {
                packageStatus: this.$packageStatus,
                dialogFormVisible: false,
                checkedData: [],
                //tablelist数据传输

                /*区分---内网*/
                getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryResearchOrg,
                    param:{
                        netType:this.$packageStatus==='zwww'?'in':'ex',
                    },
                },
                /*区分---内网*/
                /*getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryResearchOrg,
                    param: {
                        netType: 'ex'
                    }
                },*/
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'center',
                    pageSizes: [10, 50, 100],//默认每页显示多少条
                    layout: 'sizes ,prev, pager, next, jumper'
                },
                //tablelist表单表头
                columns: [
                    {
                        label: '年度',
                        prop: 'givenYear',
                        showOverflowTooltip: true,
                        template: true
                    },
                    {
                        label: '企业名称',
                        prop: 'comName',
                    },
                    {
                        label: '企业建立研发机构数',
                        prop: 'researchOrgNum',
                        width: '18%',
                    },
                    {
                        label: '当年新建研发机构数',
                        prop: 'newOrgNum',
                        width: '18%',
                    },
                    {
                        label: '在境外建立研发机构数',
                        prop: 'exOrgNum',
                        width: '18%',
                    },
                    {
                        label: '研发机构场地总面积（单位/面积）',
                        prop: 'area',
                        width: '18%',
                    },
                ],
                //人工智能研发机构建设表
                form: {
                    uuid: '',
                    //指定comid
                    //企业名称自动带出
                    comName: '',
                    //以下字段填报
                    givenYear: '',
                    /**企业建立研发机构数*/
                    researchOrgNum: '',
                    /**当年新增研发设备数*/
                    newOrgNum: '',
                    /**在境外建立研发机构数*/
                    exOrgNum: '',
                    /**研发机构场地总面积*/
                    area: '',
                    /**企业研发设备资产总额(万元）*/
                    equipAccounts: '',
                    /**研发机构人员*/
                    researcherNum: '',
                    /**当年新增研发设备数*/
                    newEquipNum: ''
                },
                //输入框验证
                rules: {
                    givenYear: [
                        {required: true, message: '请选择所属年度'},
                    ],
                    researchOrgNum: [
                        {required: true, message: '请输入企业建立研发机构数'},
                        {type: 'number', message: '数量必须为数字值'}
                    ],
                    newOrgNum: [
                        {required: true, message: '请输入当年新建研发机构数'},
                        {type: 'number', message: '数量必须为数字值'}
                    ],
                    exOrgNum: [
                        {required: true, message: '请输入在境外建立研发机构数'},
                        {type: 'number', message: '数量必须为数字值'}
                    ],
                    area: [
                        {required: true, message: '请输入研发机构场地总面积'},
                        {type: 'number', message: '面积必须为数字值'}
                    ],
                    equipAccounts: [
                        {required: true, message: '请输入企业研发设备资产总额数'},
                        {type: 'number', message: '数量必须为数字值'}
                    ],
                    researcherNum: [
                        {required: true, message: '请输入研发机构人员数'},
                        {type: 'number', message: '人数必须为数字值'}
                    ],
                    newEquipNum: [
                        {required: true, message: '请输入当年新增研发设备数'},
                        {type: 'number', message: '数量必须为数字值'}
                    ]
                }
            }
        },
        methods: {
            handleClose() {
                    this.form.givenYear = '',
                    this.form.researchOrgNum = '',
                    this.form.newOrgNum = '',
                    this.form.exOrgNum = '',
                    this.form.area = '',
                    this.form.equipAccounts = '',
                    this.form.researcherNum = '',
                    this.form.newEquipNum = '',
                    this.$nextTick(() => {
                        this.$refs['form'].clearValidate();
                    })
                this.checkedData = []
                this.dialogFormVisible = false;
                this.$refs.table.loadData()
            },
            //获取列表详情
            getDetail(data) {
                if (this.packageStatus === 'hlw') {
                    return false
                } else {
                    const that = this
                    that.form = data
                    //that.form.comName = res.info.comName
                    that.$set(that.form, 'givenYear', data.givenYear.toString());
                    that.dialogFormVisible = true
                    /*return new Promise(((resolve, reject) => {*/
                    /*this.$$request({
                        method: 'post',
                        url: this.$api.hyglApi.getComName,
                        data: {
                            comid: data.comid,
                            givenYear: data.givenYear,
                        }
                    }).then(function (res) {
                        if (res.result === 1) {
                            that.form = data
                            that.form.comName = res.info.comName
                            that.$set(that.form, 'givenYear', data.givenYear.toString());
                            that.dialogFormVisible = true
                        } else {
                            that.$alert(res.msg, "系统异常，请联系管理员！", {});
                        }
                    }).catch(function (error) {
                        that.$alert(error, "系统异常，请联系管理员！", {});
                    })*/
                }
            },
            add() {
                const that = this
                this.$axios({
                    method: 'post',
                    url: this.$api.hyglApi.getComName,
                    data: {
                        comid: '',
                        givenYear: '',
                    }
                }).then(function (res) {
                    that.form.comName = res.info.comName
                    that.dialogFormVisible = true
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                    return false;
                })
            },
            //保存按钮事件
            submitForm(form) {
                let that = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let req = that.form;
                        this.$axios({
                            method: 'post',
                            url: this.$api.hyglApi.saveReasearchOrg,
                            data: that.form
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                that.checkedData = [];
                                that.dialogFormVisible = false;
                                that.$refs.table.loadData()
                            } else {
                                that.checkedData = [];
                                that.dialogFormVisible = false;
                                that.$refs.table.loadData()
                            }
                        })
                    } else {
                        that.checkedData = [];
                        that.$refs.table.loadData()
                        return false;
                    }
                });
            },
            //修改
            update() {
                let that = this;
                if (this.checkedData.length > 1 || that.checkedData.length == 0) {
                    that.$alert('请选中一条数据进行修改', '提示', {
                        type: 'warning'
                    })
                } else {
                    /*this.$axios({
                        method: 'post',
                        url: this.$api.hyglApi.getComName,
                        data: {
                            comid: this.checkedData.comName,
                            givenYear: this.checkedData.givenYear,
                        }
                    }).then(function (res) {
                        that.form.comName = res.info.comName
                    })*/
                    let checkData = this.checkedData[0];
                    this.form.comName = checkData.comName,
                    this.form.uuid = checkData.uuid,
                    this.$set(this.form, 'givenYear', checkData.givenYear.toString())
                    this.form.comName = checkData.comName,
                    this.form.researchOrgNum = checkData.researchOrgNum,
                    this.form.newOrgNum = checkData.newOrgNum,
                    this.form.exOrgNum = checkData.exOrgNum,
                    this.form.area = parseInt(checkData.area)
                    this.form.equipAccounts = parseInt(checkData.equipAccounts),
                    this.form.researcherNum = checkData.researcherNum,
                    this.form.newEquipNum = checkData.newEquipNum
                    this.dialogFormVisible = true
                }
            },
            //删除
            del() {
                const that = this
                if (that.checkedData.length < 1) {
                    that.$alert('请选择至少一条数据进行删除！', '提示', {
                        type: 'warning'
                    })
                } else {
                    that.$confirm('确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let that = this;
                        let uuid = '';
                        for (let i = 0; i < this.checkedData.length; i++) {
                            uuid += this.checkedData[i].uuid + ',';
                        }
                        this.$axios({
                            method: 'post',
                            url: this.$api.hyglApi.deleteResearchOrgByUuid,
                            data: {
                                uuid: uuid,
                            }
                        }).then(function (res) {
                            if (res.result == 1) {
                                that.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                that.checkedData = []
                                that.$refs.table.loadData()
                            } else {
                                that.$message({
                                    message: '删除失败',
                                    type: 'error'
                                });
                                that.checkedData = []
                            }
                        })
                    }).catch(function () {
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .bt {
        margin-top: 30px;
        height: 80px;
        width: 100%;
        text-align: center;
        font-size: 30px
    }

    .xbt {
        color: #3a8ee6;
        height: auto;
        width: 100%;
        text-align: left;
        font-size: 20px;
        margin: 0px 20px 0px 20px;
    }

    .rc {
        width: 250px;
    }

    .df {
        padding-top: 20px
    }

    .btnc {
        width: 150px;
    }
</style>


