<template>
    <div style="overflow-x: hidden" class="rcdwjsStyle">
        <div class="xbt">
            <el-button v-if="packageStatus === 'hlw'" @click="add" size="medium" type="primary">添加</el-button>
            <el-button v-if="packageStatus === 'hlw'" @click="update" size="medium" type="primary">修改</el-button>
            <el-button v-if="packageStatus === 'hlw'" @click="del" size="medium" type="primary">删除</el-button>
        </div>
        <div style="margin-top: 15px">
            <tableList ref="table"
                       :columns="columns"
                       :checkedData='checkedData'
                       :getDataWay="getDataWay"
                       :pagination="pagination"
                       index
                       selection>
                <el-table-column label="年度" slot="givenYear" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-link :underline="false" @click.stop="getDetail(scope.row)" class="a-link">
                            {{scope.row.givenYear}}
                        </el-link>
                    </template>
                </el-table-column>
            </tableList>
        </div>
        <el-dialog
                :close-on-click-modal="false"
                :visible.sync="dialogFormVisible"
                title="人才队伍建设"
                v-dialogDrag
                width="960px"
                @open="openDialog"
                @close="handleClose"
        >
            <el-form :inline="true" :model="form" :rules="rules" class="df" label-width="180px" ref="form" size="mini">
                <!--hide-required-asterisk="false"-->
                <el-form-item label="企业名称：" prop="comName">
                    <el-input :disabled="true" class="rc" v-model="form.comName"></el-input>
                </el-form-item>
                <el-form-item label="所属年度：" prop="givenYear">
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
                <el-form-item label="经营管理人才数：" prop="managerNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.managerNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="职称人才总数：" prop="tiledPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.tiledPeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="博士人数：" prop="doctorNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.doctorNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="初级职称人数：" prop="jtitledPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.jtitledPeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="硕士人数：" prop="masterNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.masterNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="中级职称人数：" prop="stitledPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.stitledPeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="本科人数：" prop="bachelorNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.bachelorNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="副高级职称人数：" prop="htitledPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.htitledPeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="大专人数：" prop="juniorNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.juniorNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="正高级职称人数：" prop="extitledPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.extitledPeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="专业技术人才总数：" prop="technicalNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.technicalNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="高端人才数：" prop="topPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.topPeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="省专家人数：" prop="provinceManagerNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.provinceManagerNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="创新人才数：" prop="innovatedPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.innovatedPeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="市管专家人数：" prop="cityManagerNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.cityManagerNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="高端人才引进数：" prop="topExpeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.topExpeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="执行资格注册师人数：" prop="qualifiedPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" v-model.number="form.qualifiedPeopleNum"
                              maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="团队情况：" prop="teamInfo">
                    <el-input :disabled="packageStatus !== 'hlw'" style="width: 680px" type="textarea"
                              v-model="form.teamInfo" :rows="7"></el-input>
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
        name: "rcdwjsqk",
        components: {TableList},
        data() {
            return {
                packageStatus: this.$packageStatus,
                checkedData: [],
                dialogFormVisible: false,
                //人才队伍建设表
                form: {
                    comid: '',
                    uuid: '',
                    //企业名称自动带出
                    comName: '',
                    //以下字段填报
                    givenYear: '',
                    managerNum: '',
                    tiledPeopleNum: '',
                    doctorNum: '',
                    jtitledPeopleNum: '',
                    masterNum: '',
                    stitledPeopleNum: '',
                    bachelorNum: '',
                    htitledPeopleNum: '',
                    juniorNum: '',
                    extitledPeopleNum: '',
                    technicalNum: '',
                    topPeopleNum: '',
                    provinceManagerNum: '',
                    innovatedPeopleNum: '',
                    cityManagerNum: '',
                    topExpeopleNum: '',
                    qualifiedPeopleNum: '',
                    teamInfo: ''
                },
                /*区分---内网*/
                getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryComTeam,
                    param:{
                        netType: this.$packageStatus==='zwww'?'in':'ex',
                    }
                },
                /*区分---外网*/
                /*getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryComTeam,
                    param: {
                        netType: 'ex',
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
                        width: '20%',
                        showOverflowTooltip: true,
                        template: true
                    },
                    {
                        label: '企业名称',
                        prop: 'comName',
                    },
                    {
                        label: '经营管理人才数',
                        prop: 'managerNum',
                    },
                    {
                        label: '职称人才数',
                        prop: 'tiledPeopleNum',
                        width: '20%',
                    },
                    {
                        label: '专业技术人才数',
                        prop: 'technicalNum',
                        width: '20%',
                    },
                    {
                        label: '高端人才数',
                        prop: 'topExpeopleNum',
                        width: '15%',
                    },
                ],
                //输入框验证
                rules: {
                    givenYear: [
                        {required: true, message: '请选择所属年度'},
                    ],
                    managerNum: [
                        {required: true, message: '请输入经营管理人才数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    tiledPeopleNum: [
                        {required: true, message: '请输入职称人才总数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    doctorNum: [
                        {required: true, message: '请输入博士人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    jtitledPeopleNum: [
                        {required: true, message: '请输入初级职称人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    masterNum: [
                        {required: true, message: '请输入硕士人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    stitledPeopleNum: [
                        {required: true, message: '请输入中级职称人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ], bachelorNum: [
                        {required: true, message: '请输入本科人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    htitledPeopleNum: [
                        {required: true, message: '请输入副高级职称人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    juniorNum: [
                        {required: true, message: '请输入大专人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    extitledPeopleNum: [
                        {required: true, message: '请输入正高级职称人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    technicalNum: [
                        {required: true, message: '请输入专业技术人才总数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ], topPeopleNum: [
                        {required: true, message: '请输入高端人才数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    provinceManagerNum: [
                        {required: true, message: '请输入省专家人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    innovatedPeopleNum: [
                        {required: true, message: '请输入创新人才数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    cityManagerNum: [
                        {required: true, message: '请输入市管专家人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    topExpeopleNum: [
                        {required: true, message: '请输入高端人才引进数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    qualifiedPeopleNum: [
                        {required: true, message: '请输入执行资格注册师人数'},
                        {type: 'number', message: '人数必须为数字值'},
                    ],
                    teamInfo: [
                        {required: true, message: '请输入团队情况'},
                        {max: 1000, message: '输入字数长度最多为1000字！',}
                    ],
                }
            }
        },
        methods: {
            handleClose() {
                    this.form.givenYear = '',
                    this.form.managerNum = '',
                    this.form.tiledPeopleNum = '',
                    this.form.doctorNum = '',
                    this.form.jtitledPeopleNum = '',
                    this.form.masterNum = '',
                    this.form.stitledPeopleNum = '',
                    this.form.bachelorNum = '',
                    this.form.htitledPeopleNum = '',
                    this.form.juniorNum = '',
                    this.form.extitledPeopleNum = '',
                    this.form.technicalNum = '',
                    this.form.topPeopleNum = '',
                    this.form.provinceManagerNum = '',
                    this.form.innovatedPeopleNum = '',
                    this.form.cityManagerNum = '',
                    this.form.topExpeopleNum = '',
                    this.form.qualifiedPeopleNum = '',
                    this.form.teamInfo = '',
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
                    that.$set(that.form, 'givenYear', data.givenYear.toString());
                    that.dialogFormVisible = true
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
            //提交表单方法
            submitForm(form) {
                let that = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        //添加接口
                        let req = that.form;
                        this.$axios({
                            method: 'post',
                            url: this.$api.hyglApi.saveComTeam,
                            data: that.form
                        }).then(function (res) {
                            console.log(res)
                            if (res.result === 1) {
                                that.$message({
                                    message: '操作成功',
                                    type: 'success'
                                })
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
                const that = this
                if (this.checkedData.length > 1 || this.checkedData.length == 0) {
                    this.$alert("请选择一条数据进行修改！", "提示", {
                        type: 'warning'
                    })
                } else {
                    /*this.$axios({
                        method: 'post',
                        url: this.$api.hyglApi.getComName,
                        data: {
                            comid: this.checkedData.comid,
                            givenYear: this.checkedData.givenYear,
                        }
                    }).then(function (res) {
                        that.form.comName = res.info.comName
                    })*/
                    let checkData = this.checkedData[0];
                    this.$set(this.form, 'givenYear', checkData.givenYear.toString())
                    this.form.comName = checkData.comName,
                    this.form.uuid = checkData.uuid,
                    this.form.managerNum = checkData.managerNum,
                    this.form.tiledPeopleNum = checkData.tiledPeopleNum,
                    this.form.doctorNum = checkData.doctorNum,
                    this.form.jtitledPeopleNum = checkData.jtitledPeopleNum,
                    this.form.masterNum = checkData.masterNum,
                    this.form.stitledPeopleNum = checkData.stitledPeopleNum,
                    this.form.bachelorNum = checkData.bachelorNum,
                    this.form.htitledPeopleNum = checkData.htitledPeopleNum,
                    this.form.juniorNum = checkData.juniorNum,
                    this.form.extitledPeopleNum = checkData.extitledPeopleNum,
                    this.form.technicalNum = checkData.technicalNum,
                    this.form.topPeopleNum = checkData.topPeopleNum,
                    this.form.provinceManagerNum = checkData.provinceManagerNum,
                    this.form.innovatedPeopleNum = checkData.innovatedPeopleNum,
                    this.form.cityManagerNum = checkData.cityManagerNum,
                    this.form.topPeopleNum = checkData.topPeopleNum,
                    this.form.topExpeopleNum = checkData.topExpeopleNum,
                    this.form.qualifiedPeopleNum = checkData.qualifiedPeopleNum,
                    this.form.teamInfo = checkData.teamInfo
                    this.form.comName = checkData.comName
                    this.$set(this.form, 'givenYear', this.checkedData[0].givenYear.toString())
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
                        let uuid = '';
                        for (let i = 0; i < this.checkedData.length; i++) {
                            uuid += this.checkedData[i].uuid + ',';
                        }
                        this.$axios({
                            method: 'post',
                            url: this.$api.hyglApi.delComTeam,
                            data: {
                                uuid: uuid,
                            }
                        }).then(function (res) {
                            if (res.result == 1) {
                                that.$message({
                                    message: '删除成功',
                                    type: 'success'
                                })
                                that.checkedData = []
                                that.$refs.table.loadData()
                            } else {
                                that.$message({
                                    message: '删除失败',
                                    type: 'success'
                                })
                            }
                        })
                    }).catch(function () {
                    })
                }
            }
        },
    }
</script>
<style scoped>
    .rcdwjsStyle /deep/ .el-dialog {
        display: flex;
        flex-direction: column;
        margin: 0 !important;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /*height:600px;*/
        max-height: calc(100% - 30px);
        max-width: calc(100% - 30px);
    }
    .rcdwjsStyle /deep/ .el-dialog .el-dialog__body {
        flex: 1;
        overflow: auto;
    }
    .rcdwjsStyle /deep/ .el-dialog__body::-webkit-scrollbar {
        width: 2px;
        height: 100%;
    }
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
