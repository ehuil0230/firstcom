<template>
    <div id="monthly">
        <div style="padding: 10px 20px;text-align: left"><!-- -->
            <el-button v-if="packageStatus === 'hlw'" icon="el-icon-edit-outline" type="primary" size="small" @click="add">新建</el-button>
            <el-button v-if="packageStatus === 'hlw'" icon="el-icon-edit" @click="update" size="small" type="primary">修改</el-button>
        </div>
        <tableList ref="table"
                   index
                   :getDataWay="getDataWaystry"
                   :columns="columns"
                   :pagination="pagination"
                   :checkedData='checkedData'
                   selection><!--v-bind:selection="packageStatus === 'hlw'?true:false"-->
            <el-table-column label="所属年月" :width="95" slot="yearMonth" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="true" @click.stop="show(scope.row)" class="a-link">
                        {{scope.row.yearMonth}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>
        <el-dialog title="揭榜产品指标月填报"
                   v-if="dialogFormVisible"
                   :visible.sync="dialogFormVisible"
                   width="1100px"
                   class="diawz"
                   :close-on-click-modal="false">
            <el-form :model="stryForm" :rules="rules" ref="stryForm" label-width="100px" class="demo-stryForm"
                     style="position:relative">
                <div class="demo-input-suffix">
                    <div class="btName">揭榜产品指标月填报</div>
                </div>
                <table class="monthTable">
                    <tr>
                        <td>
                            <el-form-item label="所属年月" prop="givenYearMonth"
                                          :rules="[{ required: true, message: '所属年月不能为空'}]">
                                <el-date-picker :disabled="state>=2"
                                                style="width: 250px"
                                        v-model="stryForm.givenYearMonth"
                                        format="yyyy-MM"
                                        value-format="yyyy-MM"
                                        type="month"
                                        @change="timeVal(stryForm.givenYearMonth)"
                                        size="small"
                                        :picker-options="pickerOptions"
                                        placeholder="选择年月">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="电力消费额" prop="powerCost"
                                          :rules="[{ required: true, message: '电力消费额不能为空'},
                                                    { type: 'number', message: '电力消费额必须为数字值'},
                                                    {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                <el-input :disabled="state>=2"
                                          v-model.number="stryForm.powerCost"
                                          class="kd inputwidth" size="small">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="利润总额" prop="totalRevenue"
                                          :rules="[{ required: true, message: '利润总额不能为空'},
                                                   { type: 'number', message: '利润总额必须为数字值'},
                                                    {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                <el-input :disabled="state>=2"
                                          v-model.number="stryForm.totalRevenue"
                                          class="inputwidth" size="small">
                                </el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="税收" prop="taxRevenue"
                                          :rules="[{ required: true, message: '税收不能为空'},
                                                   { type: 'number', message: '税收必须为数字值'},
                                                    {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                <el-input :disabled="state>=2"
                                          v-model.number="stryForm.taxRevenue"
                                          class="inputwidth" size="small">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <div class="cptjtwo">
                    <el-button type="primary" :disabled="state>=2" size="small" @click="projectadd" style="margin-bottom: 10px">产品添加</el-button>
                    <tableList
                                ref="tableInfo"
                               highlight-current-row
                               :getDataWay="getprojectDataWay"
                               :columns="projectInfocolumns"
                               :pagination="pagination1">
                        <el-table-column label="操作" slot="opts" width="180">
                            <template v-slot="scope">
                                <el-button type="primary" @click="See(scope.row)">编辑</el-button>
                                <el-button type="primary" :disabled="state>=2" @click="del(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </tableList>
                    <el-dialog v-if="dialogprojectFormVisible"
                               title="产品添加" append-to-body
                               :visible.sync="dialogprojectFormVisible"
                               width="600px"
                               :close-on-click-modal="false">
                        <el-form :model="productForm" ref="productForm" label-width="120px"
                                 class="demo-ruleForm">
                            <el-form-item
                                    label="产品名称"
                                    prop="productName"
                                    :rules="[{ required: true, message: '产品名称不能为空'},
                                    {min:1,max:50,message: '长度在1到50个字符'}]">
                                <el-input :disabled="state>=2" type="productName" v-model="productForm.productName" autocomplete="off"
                                          clearable></el-input>
                            </el-form-item>
                            <el-form-item
                                    label="产品销售收入"
                                    prop="productSellingRevenue"
                                    :rules="[{ required: true, message: '产品销售收入不能为空'},
                                    { type: 'number', message: '产品销售必须为数字值'},
                                    {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                <el-input :disabled="state>=2" type="productSellingRevenue"
                                          v-model.number="productForm.productSellingRevenue" autocomplete="off"
                                          clearable></el-input>
                            </el-form-item>
                            <el-form-item label="重点方向"
                                          prop="majorDirectionDm"
                                          :rules="[{ required: true, message: '重点方向不能为空'}]">
                                <el-select :disabled="state>=2" v-model="productForm.majorDirectionDm">
                                    <el-option v-for="item in zdList" :label="item.CAPTION" :value="item.CODE"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="揭榜方向"
                                          prop="claimDirectionDm"
                                          :rules="[{ required: true, message: '揭榜方向不能为空'}]">
                                <el-select  :disabled="productForm.majorDirectionDm === ''||state>=2" v-model="productForm.claimDirectionDm">
                                    <el-option v-for="item in jbList" :label="item.CAPTION" :value="item.CODE"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="领域方向"
                                          prop="areaDirectionDm"
                                          :rules="[{ required: true, message: '领域方向不能为空'}]">
                                <el-select :disabled="productForm.claimDirectionDm === ''||state>=2" v-model="productForm.areaDirectionDm">
                                    <el-option v-for="item in lyList" :label="item.CAPTION" :value="item.CODE"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                    label="产品描述"
                                    prop="conclusion"
                                    :rules="[{ required: true, message: '产品描述不能为空'},
                                            {min:1,max:1000,message: '长度在1到1000个字符'}]">
                                <el-input :disabled="state>=2" v-model="productForm.conclusion" type="textarea"
                                          :rows="2"
                                          placeholder="请输入内容" autocomplete="off"></el-input>
                            </el-form-item>

                            <div class="zt3">
                                <el-button :disabled="state>=2" type="primary" @click="submitForm('productForm')">保存</el-button>
                                <el-button :disabled="state>=2" @click="resetForm('productForm')">重置</el-button>
                            </div>
                        </el-form>
                    </el-dialog>
                </div>
                <div class="footer4">
                    <el-button type="primary" :disabled="state>=2" @click="submitFormyb('stryForm')">保存</el-button>
                    <el-button type="primary" :disabled="state>=2" @click="resetFormyb('stryForm')">提交</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import tableList from '@/components/grid/TableList.vue';

    export default {
        name: "MonthlyReportList",
        components: {
            tableList
        },
        data() {
            return {
                uuids:'',
                packageStatus:this.$packageStatus,
                checkedData: [],
                //月报分页
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [5, 10, 20, 50],//默认每页显示多少条
                    position: 'center',
                    layout: 'sizes ,total,prev, pager, next, jumper'
                },
                //月报产品分页
                //分页
                pagination1: {
                    currentPage: 1,
                    pageSize: 5,
                    pageSizes: [5, 10, 20],//默认每页显示多少条
                    position: 'center',
                    layout: 'sizes ,total,prev, pager, next, jumper'
                },
                stryForm: {
                    uuid:'',
                    taxRevenue: "",
                    totalRevenue: "",
                    givenYearMonth: "",
                    givenYear: "",
                    givenMonth: "",
                    powerCost: "",
                },
                productForm: {
                    uuid:'',
                    productName: "",
                    majorDirectionDm: "",
                    claimDirectionDm: "",
                    areaDirectionDm: "",
                    conclusion: "",
                    productSellingRevenue: "",
                },
                rules: {},
                // 查询月报列表  内外网
                getDataWaystry: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryComMonthly,
                    param: {
                        netType: this.$packageStatus==='zwww'?'in':'ex',
                    }
                }, // 通过url方式

                getprojectDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryClaimProduct,
                    param: {
                        flag:'month',
                        uuids: this.uuids,
                    }
                },
                columns: [
                    {
                        label: ' 所属年月',
                        prop: 'yearMonth',
                        template:true,
                    },
                    {
                        label: '企业名称',
                        prop: 'comName',
                        width: '140',
                    },
                    {
                        label: '利润总额',
                        prop: 'totalRevenue',
                        width: '140',
                    },
                    {
                        label: '税收',
                        prop: 'taxRevenue',
                        width: '140',
                    },
                    {
                        label: '电力消费',
                        prop: 'powerCost',
                        width: '140',
                    },
                    {
                        label: '填报时间',
                        prop: 'createTime',
                        showOverflowTooltip: false,
                    },
                ],
                projectInfocolumns: [
                    {
                        label: ' 产品名称',
                        prop: 'productName',

                    }, {
                        label: '操作',
                        prop: 'opts',
                        template: true //添加模板，一般处理操作列(注意：tempate、formatter不能同时使用)

                    },
                ],
                dialogFormVisible: false,
                dialogprojectFormVisible: false,
                formLabelWidth: '120px',
                zdList:[],
                jbList:[],
                lyList:[],
                isNotNew:'N',//判断是否新建按钮标识
                isNotProductUpdate:'N',//判断是否是产品编辑按钮酒标识
                state:'',//控制月报是否可修改
                tableid: '',
                //只能选择本月以前包含本月的月份
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() > Date.now()-8.64e7;
                    },
                },
            }
        },
        methods: {
            //年份改变事件
            timeVal(val){
                var arr = val.split('-');
                this.stryForm.givenYear = arr[0];
                this.stryForm.givenMonth = arr[1];
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComMonthlyYMStatus,
                    data: {
                        uuid:this.stryForm.uuid,
                        givenYear: this.stryForm.givenYear,
                        givenMonth: this.stryForm.givenMonth,
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        if(res.info) {
                            if(res.info==='N') {
                                that.stryForm.givenYearMonth = '';
                                that.$message({
                                    message: val+'月不可使用，请重新选择',
                                    type: 'error'
                                });
                            }
                        }
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })
            },
            //新建
            add: function () {
                this.stryForm = {
                    uuid:'',
                    taxRevenue: "",
                    totalRevenue: "",
                    givenYearMonth: "",
                    givenYear: "",
                    givenMonth: "",
                    powerCost: "",
                }
                this.uuids = '';
                this.state = -1;
                this.isNotNew = 'Y';
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComSelfcommentByAnnualId,
                    data: {

                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        if(res.info){
                            if(res.info.state===1){
                                that.dialogFormVisible = true;
                            }else {
                                that.$message({
                                    message: '请先保存并提交自评表',
                                    type: 'error'
                                });
                                return;
                            }
                        }else {
                            that.$message({
                                message: '请先保存并提交自评表',
                                type: 'error'
                            });
                            return;
                        }
                    }else{
                        that.$alert(res.msg, "系统异常，请联系管理员！", {});
                        return false;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                    return false;
                })
            },
            //修改
            update() {
                if (this.checkedData.length > 1 || this.checkedData.length == 0) {
                    this.$alert("请选择一条数据进行修改！", "提示", {
                        type: 'warning'
                    })
                } else {
                    this.dialogFormVisible=true;
                    this.stryForm.powerCost = this.checkedData[0].powerCost;
                    this.stryForm.uuid = this.checkedData[0].uuid;
                    this.stryForm.totalRevenue = this.checkedData[0].totalRevenue;
                    this.stryForm.taxRevenue = this.checkedData[0].taxRevenue;
                    this.stryForm.givenYearMonth = this.checkedData[0].yearMonth;
                    this.uuids = this.checkedData[0].uuids;
                    this.state = this.checkedData[0].state;
                    this.isNotNew = 'N';
                }
            },
            //产品添加按钮
            projectadd: function () {
                this.getZdList();
                this.dialogprojectFormVisible = true;
                this.productForm = {
                    uuid:'',
                    productName: "",
                    majorDirectionDm: "",
                    claimDirectionDm: "",
                    areaDirectionDm: "",
                    conclusion: "",
                    productSellingRevenue: "",
                }
                this.isNotProductUpdate = 'N';
            },
            //产品添加
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let that = this;
                    if (valid) {
                        this.$$request({
                            url: this.$api.hyglApi.saveClaimProduct,
                            data: Object.assign(this.productForm, {
                                "isMonthly":"1",
                                "state": "1"
                            })
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                if(that.uuids){
                                    that.uuids += ','+ res.info.uuid;
                                }else{
                                    that.uuids = res.info.uuid;
                                }
                                that.dialogprojectFormVisible = false;
                                that.$refs[formName].resetFields();
                            } else {
                                that.$message({
                                    message: '保存失败',
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //产品重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.productForm.majorDirectionDm = '';
                this.productForm.claimDirectionDm = '';
                this.productForm.areaDirectionDm = '';
            },
            //产品查看
            See: function (row) {    //查看
                this.dialogprojectFormVisible = true;
                this.productForm.uuid =  row.uuid;
                this.productForm.productName = row.productName;
                this.productForm.conclusion = row.conclusion;
                this.productForm.productSellingRevenue = row.productSellingRevenue;
                this.$set(this.productForm,'majorDirectionDm',row.majorDirectionDm);
                this.$set(this.productForm,'claimDirectionDm',row.claimDirectionDm);
                this.$set(this.productForm,'areaDirectionDm',row.areaDirectionDm);
                this.isNotProductUpdate = 'Y';
                this.getZdList();
            },
            //查询重点方向
            getZdList(){
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.queryTableFromRedisByTableName,
                    data: {
                        tableName:'DM_MAJOR_DIRECTION',
                    }
                }).then(function (res) {
                    if(res.result === 1){
                        that.zdList = res.info;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //产品删除
            del: function (row) {
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.deleteClaimProductByUuid,
                    data: {
                        uuid: row.uuid,
                    }
                }).then(function (res) {
                    if (res.result == 1) {
                        that.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        let arr = that.uuids.split(",");
                        arr.splice(arr.indexOf(row.uuid),1);
                        that.uuids = arr.join(',');
                    } else {
                        that.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                }).then(function () {
                    that.$refs.tableInfo.loadData()
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //保存月报
            submitFormyb: function (formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$$request({
                            method: 'post',
                            url: this.$api.hyglApi.saveComMonthly,
                            data: Object.assign(this.stryForm, {
                                "uuids": this.uuids,
                            })
                        }).then(function (res) {
                            if (res.result == 1) {
                                that.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                that.$set(that.stryForm,'uuid',res.info.uuid);
                                that.$refs.table.loadData();
                            }else{
                                that.$message({
                                    message: '保存失败',
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //提交月报
            resetFormyb: function (formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'post',
                            url: this.$api.hyglApi.saveComMonthly,
                            data:  Object.assign(this.stryForm, {
                                "uuids": this.uuids,
                            })
                        }).then(function (res) {
                            if (res.result == 1) {
                                that.$set(that.stryForm,'uuid',res.info.uuid);
                            }
                        }).then(function () {
                            that.changeStatus();
                        })
                    } else {
                        return false;
                    }
                });
            },
            //展示
            show:function (row) {
                this.dialogFormVisible=true;
                this.stryForm.powerCost = row.powerCost;
                this.stryForm.uuid = row.uuid;
                this.stryForm.totalRevenue = row.totalRevenue;
                this.stryForm.taxRevenue = row.taxRevenue;
                this.stryForm.givenYearMonth = row.yearMonth;
                this.uuids = row.uuids;
                this.state = row.state;
                this.isNotNew = 'N';
            },
            //提交改变状态
            changeStatus(){
                let that = this;
                this.$$request({
                    url: that.$api.hyglApi.saveSubmitInfo,
                    data: {
                        state : '0',
                        approvalDm : '020003',
                        tableid : that.stryForm.uuid,
                        title: that.stryForm.givenYear +'-'+that.stryForm.givenMonth+'月报',
                        isMonthly: '1',
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        that.dialogFormVisible = false;
                        that.$refs.table.loadData();
                    }else{
                        that.$message({
                            message: '提交失败',
                            type: 'error'
                        });
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                    return false;
                })
            },
        },
        watch:{
            uuids:function (newVal,oldVal) {
                if(newVal!=oldVal){
                    this.$set(this.getprojectDataWay,'param',{ uuids:this.uuids,flag : 'temp'});
                    if(this.$refs.tableInfo) {
                        this.$refs.tableInfo.loadData();
                    }
                }
            },
            'productForm.majorDirectionDm':function (val,oldVal) {
                let that = this;
                if(val !== oldVal){
                    if(this.isNotNew === 'Y'){//新建进来
                        if(this.isNotProductUpdate === 'N'){
                            this.productForm.claimDirectionDm = "";
                            this.productForm.areaDirectionDm = "";
                        }
                    }else{
                        if(this.state<0){//未提交
                            if(this.isNotProductUpdate === 'N'){
                                this.productForm.claimDirectionDm = "";
                                this.productForm.areaDirectionDm = "";
                            }
                        }
                    }
                    this.lyList = [];
                    if(val !== ''){
                        this.$$request({
                            url: this.$api.hyglApi.querySubSelcetListByTableNameAndParentCode,
                            data: {
                                tableName:"DM_CLAIM_DIRECTION",
                                parentCode: val
                            }
                        }).then(function (res) {
                            if(res.result === 1){
                                that.jbList = res.info;
                            }
                        }).catch(function (error) {
                            that.$alert(error, "系统异常，请联系管理员！", {});
                        })
                    }else{
                        this.jbList = [];
                    }
                }
            },
            'productForm.claimDirectionDm':function (val,old) {
                let that = this;
                if(val !== old){
                    if(this.isNotNew === 'Y'){//新建进来
                        if(this.isNotProductUpdate === 'N'){
                            this.productForm.areaDirectionDm = "";
                        }
                    }else{
                        if(this.state<0){//未提交
                            if(this.isNotProductUpdate === 'N') {
                                this.productForm.areaDirectionDm = "";
                            }
                        }
                    }
                    if(val !== ''){
                        this.$$request({
                            url: this.$api.hyglApi.querySubSelcetListByTableNameAndParentCode,
                            data: {
                                tableName:"DM_AREA_DIRECTION",
                                parentCode: val
                            }
                        }).then(function (res) {
                            if(res.result === 1){
                                that.lyList = res.info;
                            }
                        }).catch(function (error) {
                            that.$alert(error, "系统异常，请联系管理员！", {});
                        })
                    }else{
                        this.lyList = [];
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .btName {
        font-size: 40px;
        text-align: center;
    }

    .cptjtwo {
        width: 80%;
        margin: 10px auto;
    }

    .monthTable {
        width: 80%;
        text-align: center;
        margin: 15px auto 10px auto;
    }

    .zt3 {
        text-align: center;
    }


    .inputwidth {
        width: 250px;
    }

    .footer4{
        text-align: center;
    }
</style>
