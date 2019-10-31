<template>
    <div class="yb-detail">
        <el-form :model="stryForm" ref="stryForm" label-width="150px" style="position:relative">
            <div class="demo-input-suffix">
                <div class="yb-title">揭榜产品指标月填报</div>
            </div>
            <table class="yb-form">
                <tr>
                    <td>
                        <el-form-item label="所属年月" prop="givenYearMonth">
                            <el-date-picker :disabled="true"
                                            v-model="stryForm.givenYearMonth"
                                            format="yyyy-MM"
                                            value-format="yyyy-MM"
                                            type="month"
                                            placeholder="选择年月">
                            </el-date-picker>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="电力消费额" prop="powerCost">
                            <el-input :disabled="true" v-model.number="stryForm.powerCost" class="kd"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="利润总额" prop="totalRevenue">
                            <el-input :disabled="true" v-model.number="stryForm.totalRevenue"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="税收" prop="taxRevenue">
                            <el-input :disabled="true" v-model.number="stryForm.taxRevenue"></el-input>
                        </el-form-item>
                    </td>
                </tr>
            </table>
            <el-form-item>
                <tableList ref="tableInfo"
                           highlight-current-row
                           :getDataWay="getprojectDataWay"
                           :columns="projectInfocolumns"
                           :pagination="pagination">
                    <el-table-column label="操作" slot="opts" width="180">
                        <template v-slot="scope">
                            <el-button type="primary" @click="See(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </tableList>
            </el-form-item>
        </el-form>
        <el-dialog title="产品详情"
                   :visible.sync="dialogprojectFormVisible"
                   :close-on-click-modal="false"
                   center
                   @close="closeDialog('productForm')">
            <el-form :model="productForm" ref="productForm" label-width="120px"
                     class="demo-ruleForm">
                <el-form-item label="产品名称">
                    <el-input :disabled="true" v-model="productForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="产品销售收入">
                    <el-input :disabled="true" v-model.number="productForm.productSellingRevenue"></el-input>
                </el-form-item>
                <el-form-item label="重点方向">
                    <el-select :disabled="true" v-model="productForm.majorDirectionDm">
                        <el-option v-for="item in zdList" :label="item.CAPTION" :value="item.CODE"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="揭榜方向">
                    <el-select :disabled="true" v-model="productForm.claimDirectionDm">
                        <el-option v-for="item in jbList" :label="item.CAPTION" :value="item.CODE"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="领域方向">
                    <el-select :disabled="true" v-model="productForm.areaDirectionDm">
                        <el-option v-for="item in lyList" :label="item.CAPTION" :value="item.CODE"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品描述">
                    <el-input :disabled="true" v-model="productForm.conclusion" type="textarea" :rows="2" placeholder="请输入内容" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogprojectFormVisible=false">关闭</el-button>
            </div>
        </el-dialog>
        <approval :apprData="$route.query"></approval>
    </div>
</template>

<script>
    import tableList from '@/components/grid/TableList.vue';
    import approval from "./approval";

    export default {
        name: "ybDetail",
        components: {
            tableList,
            approval
        },
        data() {
            return {
                packageStatus: this.$packageStatus,
                pagination: {     //分页
                    currentPage: 1,
                    pageSize: 5,
                    position: 'right',
                    layout: 'total,prev, pager, next, jumper'
                },
                stryForm: {
                    uuid: '',
                    taxRevenue: "",
                    totalRevenue: "",
                    givenYearMonth: "",
                    givenYear: "",
                    givenMonth: "",
                    powerCost: "",
                },
                productForm: {
                    uuid: '',
                    productName: "",
                    majorDirectionDm: "",
                    claimDirectionDm: "",
                    areaDirectionDm: "",
                    conclusion: "",
                    productSellingRevenue: "",
                },

                getprojectDataWay: {
                    dataType: "data",
                    data: [],
                },
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
                dialogprojectFormVisible: false,
                zdList: [],
                jbList: [],
                lyList: [],
            }
        },
        methods: {
            //产品查看
            See: function (row) {    //查看
                this.dialogprojectFormVisible = true;
                this.productForm.uuid = row.uuid;
                this.productForm.productName = row.productName;
                this.productForm.conclusion = row.conclusion;
                this.productForm.productSellingRevenue = row.productSellingRevenue;
                this.$set(this.productForm, 'majorDirectionDm', row.majorDirectionDm);
                this.$set(this.productForm, 'claimDirectionDm', row.claimDirectionDm);
                this.$set(this.productForm, 'areaDirectionDm', row.areaDirectionDm);
                this.getZdList();
                this.getjbList(row.majorDirectionDm);
                this.getlyList(row.claimDirectionDm);
            },
            //查询重点方向
            getZdList() {
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.queryTableFromRedisByTableName,
                    data: {
                        tableName: 'DM_MAJOR_DIRECTION',
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.zdList = res.info;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //揭榜方向
            getjbList(claimDirectionDm){
                let that = this
                this.$$request({
                    url: this.$api.hyglApi.querySubSelcetListByTableNameAndParentCode,
                    data: {
                        tableName:"DM_CLAIM_DIRECTION",
                        parentCode:claimDirectionDm
                    }
                }).then(function (res) {
                    if(res.result === 1){
                        that.jbList = res.info;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //领域方向
            getlyList(areaDirectionDm){
                let that = this
                this.$$request({
                    url: this.$api.hyglApi.querySubSelcetListByTableNameAndParentCode,
                    data: {
                        tableName:"DM_AREA_DIRECTION",
                        parentCode: areaDirectionDm
                    }
                }).then(function (res) {
                    if(res.result === 1){
                        that.lyList = res.info;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            }
        },
        created() {
            let that = this;
            this.$$request({
                url: that.$api.homeApi.getComMonthlyApprovalInfo,
                data: {
                    uuid:that.$route.query.uuid,
                }
            }).then((res)=>{
                that.stryForm.uuid=res.info.uuid;
                that.stryForm.givenYearMonth=res.info.yearMonth;
                that.stryForm.powerCost=res.info.powerCost;
                that.stryForm.taxRevenue=res.info.taxRevenue;
                that.stryForm.totalRevenue=res.info.totalRevenue;
                res.info.productList.forEach((item,index)=>{
                    that.$set(that.getprojectDataWay.data,index,item)
                })
            }).catch(function (err) {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .yb-title {
        font-size: 40px;
        padding-left: 400px;
    }
    .yb-form {
        margin-left: 150px;
        margin-top: 30px;
    }
</style>
