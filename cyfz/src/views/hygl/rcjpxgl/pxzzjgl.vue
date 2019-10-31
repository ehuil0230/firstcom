<template>
    <div style="overflow-x:hidden">
        <div class="xbt">
            <el-button v-if="packageStatus === 'hlw'" @click="add('form')" size="medium" type="primary">添加</el-button>
            <el-button v-if="packageStatus === 'hlw'" @click="del" size="medium" type="primary">删除</el-button>
        </div>
        <el-dialog
                :close-on-click-modal="false"
                :visible.sync="dialogFormVisible"
                title="培训信息"
                v-dialogDrag
                width="960px">
            <el-form :inline="true" :model="form" :rules="rules" label-width="170px" label-position="right" ref="form"
                     style="padding-top: 20px">
                <el-form-item label="登记年度" prop="givenYear">
                    <el-date-picker
                            :disabled="packageStatus !== 'hlw'"
                            class="rc"
                            v-model="form.givenYear"
                            type="year"
                            placeholder="选择年度"
                            value-format="yyyy">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="培训次数" prop="trainNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" type="text" v-model.number="form.trainNum"
                              maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="总课时数" prop="courseNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" type="text" v-model.number="form.courseNum"
                              maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="参培人次" prop="trainPeopleNum">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" type="text"
                              v-model.number="form.trainPeopleNum" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="培训费用" prop="trainFee">
                    <el-input :disabled="packageStatus !== 'hlw'" class="rc" type="text" v-model.number="form.trainFee"
                              maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="年度培训总结" prop="trainInfo">
                    <el-input :disabled="packageStatus !== 'hlw'" :rows="7" style="width: 680px" type="textarea"
                              v-model="form.conclusion" maxlength="1000"></el-input>
                </el-form-item>
                <el-form-item style="padding-left: 41%;">
                    <el-button v-if="packageStatus === 'hlw'" @click="submitForm('form')" type="primary">立即创建
                    </el-button>
                    <el-button v-if="packageStatus === 'hlw'" @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
    </div>
</template>

<script>
    import TableList from "../../../components/grid/TableList";

    export default {
        name: "pxzzjgl",
        components: {TableList},
        data() {
            return {
                packageStatus: this.$packageStatus,
                checkedData: [],
                //添加功能
                dialogFormVisible: false,
                //培训组织管理表
                form: {
                    uuid: '',
                    //指定comid
                    //登记年度
                    givenYear: '',
                    //培训次数
                    trainNum: '',
                    //培训课时数
                    courseNum: '',
                    //参培人数
                    trainPeopleNum: '',
                    //培训费用
                    trainFee: '',
                    //年度培训总结
                    conclusion: ''
                },
                /*区分---内网*/
                getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryComTrainorg,
                    param: {
                        netType: this.$packageStatus === 'zwww' ? 'in' : 'ex',
                    },
                },
                /*区分---外网*/
                /*getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryComTrainorg,
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
                // getDataWay: {dataType: "data", data: []}, // 直接展示
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
                        label: '培训次数',
                        prop: 'trainNum',
                    },
                    {
                        label: '总课时数',
                        prop: 'courseNum',
                        width: '20%',
                    },
                    {
                        label: '参培人数',
                        prop: 'trainPeopleNum',
                        width: '20%',
                    },
                    {
                        label: '培训费用',
                        prop: 'trainFee',
                        width: '15%',
                    },
                ],
                //输入框验证
                rules: {
                    givenYear: [
                        {required: true, message: '请选择年度'},
                    ],
                    trainNum: [
                        {required: true, message: '请输入培训次数'},
                        {type: 'number', message: '次数必须为数字值'}
                    ],
                    courseNum: [
                        {required: true, message: '请输入总课时数'},
                        {type: 'number', message: '数量必须为数字值'}
                    ],
                    trainPeopleNum: [
                        {required: true, message: '请输入参培人次'},
                        {type: 'number', message: '人数必须为数字值'}
                    ],
                    trainFee: [
                        {required: true, message: '请输入培训费用'},
                        {type: 'number', message: '费用必须为数字值'}
                    ],
                    conclusion: [
                        {required: true, message: '请输入参培年度总结'},
                        {max: 1000, message: '输入字数最多为1000字！'}
                    ]
                }
            };
        },
        methods: {
            //获取列表详情
            getDetail(data) {
                if (this.packageStatus === 'hlw') {
                    return false
                } else {
                    this.form = data
                    this.form.trainInfo = data.trainInfo
                    this.$set(this.form, 'givenYear', data.givenYear.toString());
                    this.dialogFormVisible = true
                }
            }
            ,
            //添加按钮事件
            add() {
                this.$set(this.form, 'uuid', '')
                this.dialogFormVisible = true;
                //this.$refs[formName].resetFields()
            }
            ,
            //提交表单方法
            submitForm(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //添加接口
                        let req = that.form;
                        this.$axios({
                            method: 'post',
                            url: this.$api.hyglApi.saveComTrainorg,
                            data: req
                        }).then(function (res) {
                            console.log(res)
                            if (res.result === 1) {
                                that.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });
                                that.$refs.table.loadData()
                                that.dialogFormVisible = false;
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
            ,

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
                            url: this.$api.hyglApi.deleteComTrainorgByUuid,
                            data: {
                                uuid: uuid,
                            }
                        }).then(function (res) {
                            if (res.result == 1) {
                                that.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });

                                that.$refs.table.loadData()
                            } else {
                                that.$message({
                                    message: '删除失败',
                                    type: 'error'
                                });
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
</style>
