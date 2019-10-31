<template>
    <div class="mainContent">
        <div class="rightMain">
            <div class="toolbar">
            <div class="wz" style="width: 350px">
                <div class="operateBtnWrap">
                    <el-button v-if="packageStatus === 'zwww'" type="button" size="small" icon="el-icon-edit-outline" class="el-button el-button--primary topBtn" @click="add" style="width:68px;height: 32px;padding-left: 11px;">
                        添加
                    </el-button>
                    <el-button v-if="packageStatus === 'zwww'" type="button" size="small" icon="el-icon-edit" class="el-button el-button--primary topBtn" @click="upda" style="width:68px;height: 32px;padding-left: 11px">
                        修改
                    </el-button>
                    <el-button v-if="packageStatus === 'zwww'" type="button" size="small" icon="el-icon-delete" class="el-button el-button--primary topBtn" @click="del" style="width:68px;height: 32px;padding-left: 11px">
                        删除
                    </el-button>
                </div>
            </div>
            <div style="margin-left: 537px;width: 362px">
            <!--<screenFilter :searchParams="searchParams">
                <template slot="slot_two">
                    <el-input class="search-name" size="small" v-model="searchParams.title" placeholder="请输入标题名称"
                              prefix-icon="el-icon-search" @input="searchBtn">
                    </el-input>
                </template>
                <template slot="slot_search">
                    <el-form-item label="状态">
                        <el-select v-model="searchParams.state" clearable placeholder="选择状态" style="width: 100%">
                            <el-option v-for="item of this.stateList" :label="item.caption" :value="item.value">
                                {{item.caption}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker
                                v-model="searchParams.timeStamp"
                                value-format="YYYY-MM-DD"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="timeOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发布人">
                        <el-input v-model="searchParams.createUserName"></el-input>
                    </el-form-item>
                    <el-form-item label="发布部门">
                        <el-input v-model="searchParams.createOrgName"></el-input>
                    </el-form-item>
                </template>
            </screenFilter>-->
            </div>
            </div>
            <div class="operateBtnWrap">
                <tableList ref="table"
                           selection
                           index
                           :getDataWay="getDataWay"
                           :columns="columns"
                           :checkedData='checkedData'
                           :pagination="pagination"
                >
                    <el-table-column label="年度" slot="industryOrgName" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-link :underline="false" @click.stop="getDetail(scope.row)" class="a-link">
                                {{scope.row.industryOrgName}}
                            </el-link>
                        </template>
                    </el-table-column>
                </tableList>
            </div>
        </div>
        <!--弹出框-->
        <div class="hyglStyle">
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="1100px" :close-on-click-modal="false"
                   @close="closeDialog('stryForm')" >
            <el-form :model="stryForm" :rules="rules" ref="stryForm" label-width="150px" class="demo-stryForm"
                     style="position:relative">
                <table>
                    <td colspan="3" style="font-size: large;padding-bottom: 40px">
                        <strong>法人信息</strong>
                    </td>
                    <tr>
                        <td>
                            <el-form-item label="法人代表姓名：" prop="legalPersonName" :rules="[{ required: true, message: '法人代表姓名不能为空'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model="stryForm.legalPersonName"  maxlength="50" class="kd"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="电话：" prop="phone">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model="stryForm.phone" class="kd"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="任社会组织职务：" prop="technicalTitle"  :rules="[{ required: true, message: '社会组织职称不能为空'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model="stryForm.technicalTitle" maxlength="100" class="kd"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <el-form-item label="住所：" prop="address"  :rules="[{ required: true, message: '住所不能为空'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model="stryForm.address" maxlength="250"></el-input>
                            </el-form-item>
                        </td>

                        <td>
                            <el-form-item label="邮编：" prop="postcode">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model="stryForm.postcode"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <td colspan="3" style="font-size: large;padding-bottom: 40px">
                        <el-divider></el-divider>
                        <strong>行业信息</strong>
                    </td>
                    <tr>
                        <td>
                            <el-form-item label="社会组织名称：" prop="industryOrgName"  :rules="[{ required: true, message: '社会组织名称不能为空'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model="stryForm.industryOrgName" maxlength="100"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="理事数：" prop="directorNum"   :rules="[{ required: true, message: '理事数不能为空'},{ type: 'number', message: '理事数必须为数字值'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model.number="stryForm.directorNum" maxlength="9"></el-input>
                            </el-form-item>
                        </td>

                        <td>
                            <el-form-item label="监事数：" prop="supervisorNum"  :rules="[{ required: true, message: '监事数不能为空'},{ type: 'number', message: '监事数必须为数字值'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model.number="stryForm.supervisorNum" maxlength="9"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom:30px "><el-divider>会员数（社会团体）</el-divider></td>
                        <td style="padding-bottom:30px;"><el-divider>工作人员数</el-divider></td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="团体会员：" prop="teamMemberNum"  :rules="[{ required: true, message: '团体会员不能为空'},{ type: 'number', message: '团体会员必须为数字值'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model.number="stryForm.teamMemberNum" maxlength="9"></el-input>
                            </el-form-item>
                        </td>

                        <td border="1px solid">
                            <el-form-item label="总数：" prop="totalNum"  :rules="[{ required: true, message: '总数不能为空'},{ type: 'number', message: '总数必须为数字值'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model.number="stryForm.totalNum" maxlength="9"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="个体会员：" prop="personMemberNum"  :rules="[{ required: true, message: '个体会员不能为空'},{ type: 'number', message: '个体会员必须为数字值'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model.number="stryForm.personMemberNum" maxlength="9"></el-input>
                            </el-form-item>
                        </td>

                        <td>
                            <el-form-item label="其中专职人员：" prop="professionalNum"  :rules="[{ required: true, message: '专职人员不能为空'},{ type: 'number', message: '专职人员必须为数字值'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" v-model.number="stryForm.professionalNum" maxlength="9"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <el-form-item label="宗旨：" prop="purpose"  :rules="[{ required: true, message: '宗旨不能为空'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" type="textarea"
                                          :rows="3" v-model="stryForm.purpose" maxlength="500"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <el-form-item label="业务范围：" prop="businessScope"  :rules="[{ required: true, message: '业务范围不能为空'}]">
                                <el-input :disabled="packageStatus !== 'zwww'" type="textarea"
                                          :rows="3" v-model="stryForm.businessScope" maxlength="400"></el-input>
                            </el-form-item>
                        </td>

                    </tr>
                    <tr>
                        <td></td>
                        <td style="padding-left: 90px">
                             <span slot="footer" class="dialog-footer">
                                <el-button v-if="packageStatus === 'zwww'" type="primary" @click="saveDialog('stryForm')">保 存</el-button>
                                   <el-button  v-if="packageStatus === 'zwww'" @click="cancelDialog('stryForm')">取 消</el-button>
                             </span>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </el-form>
        </el-dialog>
        </div>
    </div>

</template>

<script>
    import tableList from '../../../components/grid/TableList.vue';
    export default {
        name: "IndustryOrganization",
        components: {
            tableList,
        },
        data() {
            return {
                packageStatus: this.$packageStatus,
                searchParams: {
                    title: '',
                    createUserName: '',
                    createOrgName: '',
                    createTime: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    state: '',
                    timeStamp: [],
                },
                checkedData:[], //复选框选中的数据
                getDataWay:{
                    dataType:"url",
                    type:'post',
                    data:this.$api.hyglApi.queryIndustryOrg,
                    param:{}
                    }, // 通过url方式
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'center',
                    pageSizes: [10, 50, 100],//默认每页显示多少条
                    layout: 'sizes ,prev, pager, next, jumper'
                },
                stryForm: {       //表单初始化
                    legalPersonName: "",
                    phone: "",
                    technicalTitle: "",
                    address: "",
                    postcode: "",
                    industryOrgName: "",
                    directorNum: "",
                    supervisorNum: "",
                    teamMemberNum: "",
                    totalNum: "",
                    personMemberNum: "",
                    professionalNum: "",
                    purpose: "",
                    businessScope: ""
                },
                dialogTitle: "",
                saveOrEdit: '',
                columns: [
                    {
                        label: '行业组织名称',
                        prop: 'industryOrgName',
                        showOverflowTooltip: true,
                        template: true

                    },
                    {
                        label: '法定代表人',
                        prop: 'legalPersonName',

                    },
                ],
                dialogFormVisible: false,
                rules: {
                    legalPersonName:[
                        {max: 50, message: '请输入不超过50字！'}
                    ],
                    technicalTitle:[{max: 100, message: '请输入不超过100字！'}],
                    address:[{max: 250, message: '请输入不超过250字！'}],
                    directorNum:[{

                    }],
                    supervisorNum:[{

                    }],
                    teamMemberNum:[{

                    }],
                    totalNum:[{

                    }],
                    personMemberNum:[{

                    }],
                    professionalNum:[{

                    }],
                    purpose:[{max: 500, message: '请输入不超过500字！'}],
                    businessScope:[{max: 500, message: '请输入不超过500字！'}],
                    phone:[{
                        required: true,
                        message:'电话格式不正确',
                        pattern: '(^((\\+|00)86)?1[3-9]\\d{9}$)|(^(\\d{3}(-)?\\d{8}|\\d{4}(-)?\\d{7})$)'
                    }],
                    postcode: [
                        {
                            required: true,
                            message: '邮政编码格式不正确',
                            pattern: '^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\\d{4}$'
                            //pattern: '(^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)'

                        }
                    ],
                }
            }
        },
        created() {
           // let that = this;
           // this.$axios({
            //    url: "http://mockjs.com/api/posts",
            //    data: {type: 'top', key: '123456'}
            //}).then(function (res) {
           //     that.getDataWay.data = res.info.list
            //    that.$refs.table.loadData()
           // })
        },
        methods: {
            //获取列表详情
            getDetail(data) {
                if (this.packageStatus === 'zwww') {
                    return false
                } else {
                    const that = this
                    that.dialogTitle = "行业组织信息";
                    that.stryForm = data
                    that.dialogFormVisible = true
                   /* this.$$request({
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
            add: function () {
                this.saveOrEdit = 'save';
                this.dialogTitle = "行业组织申请表";
                this.dialogFormVisible = true;
            },
            upda: function () {
                let that = this;
                if (this.checkedData.length > 1 || that.checkedData.length === 0) {
                    that.$alert('请选择一条数据',"提示",{
                        type: 'warning'
                    });
                } else {
                    this.saveOrEdit = 'edit';
                    this.dialogTitle = "行业组织申请表";
                    this.dialogFormVisible = true;
                    let checkData = that.checkedData[0];
                    this.stryForm.uuid = checkData.uuid,
                        this.stryForm.legalPersonName = checkData.legalPersonName,
                        this.stryForm.phone = checkData.phone,
                        this.stryForm.technicalTitle = checkData.technicalTitle,
                        this.stryForm.address = checkData.address,
                        this.stryForm.postcode = checkData.postcode,
                        this.stryForm.industryOrgName = checkData.industryOrgName,
                        this.stryForm.directorNum = checkData.directorNum,
                        this.stryForm.supervisorNum = checkData.supervisorNum,
                        this.stryForm.teamMemberNum = checkData.teamMemberNum,
                        this.stryForm.totalNum = checkData.totalNum,
                        this.stryForm.personMemberNum = checkData.personMemberNum,
                        this.stryForm.professionalNum = checkData.professionalNum,
                        this.stryForm.purpose = checkData.purpose,
                        this.stryForm.businessScope = checkData.businessScope
                }
            },
            del: function () {
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
                        let uuid='';
                        for (let i = 0; i < this.checkedData.length; i++) {
                            uuid+=this.checkedData[i].uuid+',';
                        }
                        this.$axios({
                            method:'post',
                            url: this.$api.hyglApi.deleteIndustryOrgByUuid,
                            data: {
                                uuid:uuid,
                            }
                        }).then(function (res) {
                            if (res.result==1){
                                that.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                that.$refs.table.loadData()
                            }else {
                                that.$message({
                                    message: '删除失败',
                                    type: 'error'
                                });
                            }
                        })
                        }).catch(function () {
                        })
                }
            },
            closeDialog: function (formName) {
                this.$refs[formName].resetFields();
                this.stryForm = {
                    uuid: "",
                    legalPersonName: "",
                    phone: "",
                    technicalTitle: "",
                    address: "",
                    postcode: "",
                    industryOrgName: "",
                    directorNum: "",
                    supervisorNum: "",
                    teamMemberNum: "",
                    totalNum: "",
                    personMemberNum: "",
                    professionalNum: "",
                    purpose: "",
                    businessScope: ""
                }
                this.checkedData = []
                this.$refs.table.loadData()
            },
            cancelDialog: function (formName) {
                this.dialogFormVisible = false;
                this.checkedData = []
                this.$refs[formName].resetFields();
            },
            saveDialog: function (formName) {
                this.$refs[formName].validate((valid) => {
                    let that = this;
                    if (valid) {
                        this.$axios({
                            method: 'post',
                            url: this.$api.hyglApi.saveIndustryOrg,
                            data: Object.assign(this.stryForm, {

                            })
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                that.dialogFormVisible = false;
                                this.checkedData = []
                                that.$refs.table.loadData();
                            } else {
                                that.$message({
                                    message: '操作失败',
                                    type: 'error'
                                });
                            }

                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            //查询
            searchBtn() {
                const that = this;
                let param = {
                    title: that.searchParams.title,
                    createUserName: that.searchParams.createUserName,
                    createOrgName: that.searchParams.createOrgName,
                    createTime: that.searchParams.createTime,
                    stateName: that.searchParams.stateName,
                }
                that.$set(that.getDataWay.params = param);
                that.$refs.table.loadData(param);
            },
        }

    }
</script>

<style scoped>
    .hyglStyle /deep/ .el-dialog {
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
    .hyglStyle /deep/ .el-dialog .el-dialog__body {
        flex: 1;
        overflow: auto;
    }
    .hyglStyle /deep/ .el-dialog__body::-webkit-scrollbar {
        width: 2px;
        height: 100%;
    }
    .wz {
        margin-top: 3px;
        margin-left: 0px;
        margin-bottom: 21px;
    }

    .rightMain {
        width: 800px;
        padding-left: 10px;
        min-width: 150px;
    }

    .mainContent {
        width: 800px;
        display: flex;
        padding: 0 10px 0 10px;
        box-sizing: border-box;
    }

    .form-item-wrap {
        display: flex;
        width: 100%;

    }

    .operateBtnWrap {
        margin-bottom: 15px;
        text-align: left;
        width: 900px;
    }

    .kd {
        width: 200px;
    }
</style>
