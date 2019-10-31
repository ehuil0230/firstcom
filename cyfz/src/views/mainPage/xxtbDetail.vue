<!--信息填报-->
<template>
    <div class="xxtb-detail">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="企业信息填报" name="first">
                <div>
                    <el-divider content-position="left">法人信息</el-divider>
                    <el-form ref="form" :model="form" label-width="170px">
                        <template class="sizes">
                            <div class="form-item-wrap">
                                <el-form-item label="法人代表姓名" class="form-item" prop="legalPersonName">
                                    <el-input :disabled="true" v-model="form.legalPersonName"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号码" class="form-item" prop="certNo">
                                    <el-input :disabled="true" v-model="form.certNo" class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="年龄" class="form-item" prop="age">
                                    <el-input :disabled="true" v-model.number="form.age" class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="职称" class="form-item" prop="technicalTitle">
                                    <el-input :disabled="true" v-model="form.technicalTitle"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="教育情况" class="form-item" prop="educationDm">
                                    <el-input :disabled="true" v-model="form.educationDm" class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱" class="form-item" prop="email">
                                    <el-input :disabled="true" v-model="form.email" class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="联系电话" class="form-item" prop="phone">
                                    <el-input :disabled="true" v-model="form.phone" clearable size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="毕业学校" class="form-item" prop="graduationSchool">
                                    <el-input :disabled="true" v-model="form.graduationSchool" clearable size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="工作简历" class="form-item" prop="resume">
                                    <el-input :disabled="true" v-model="form.resume" type="textarea" :rows="3"
                                              class="textwidth"></el-input>
                                </el-form-item>
                            </div>
                            <el-divider content-position="left">企业信息</el-divider>
                            <div class="form-item-wrap">
                                <el-form-item label="企业名称" class="form-item" prop="comName">
                                    <el-input :disabled="true" v-model="form.comName" clearable size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="并购金额(万元)" class="form-item">
                                    <el-input :disabled="true" v-model.number="form.mergerNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="融资金额(万元)" class="form-item" prop="financeNum">
                                    <el-input :disabled="true" v-model.number="form.financeNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="风险投资金额(万元)" class="form-item" prop="ventureNum">
                                    <el-input :disabled="true" v-model.number="form.ventureNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="一类知识产权" class="form-item" prop="primaryPropertyNum">
                                    <el-input :disabled="true" v-model.number="form.primaryPropertyNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="二类知识产权" class="form-item" prop="secondaryPropertyNum">
                                    <el-input :disabled="true" v-model.number="form.secondaryPropertyNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="本年新增知识产权数量" class="form-item" prop="freshPropertyNum">
                                    <el-input :disabled="true" v-model.number="form.freshPropertyNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="企业职工总数" class="form-item" prop="employeeNum">
                                    <el-input :disabled="true" v-model.number="form.employeeNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="企业职工在职人员数量" class="form-item" prop="onjobEmployeeNum">
                                    <el-input :disabled="true" v-model.number="form.onjobEmployeeNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="兼职人员数量" class="form-item" prop="ptjobEmployeeNum">
                                    <el-input :disabled="true" v-model.number="form.ptjobEmployeeNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="临时人员数量" class="form-item" prop="tempEmployeeNum">
                                    <el-input :disabled="true" v-model.number="form.tempEmployeeNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="本年新增人数" class="form-item" prop="freshmanNum">
                                    <el-input :disabled="true" v-model.number="form.freshmanNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">

                                <el-form-item label="本年吸纳高校应届毕业生人数" class="form-item" prop="graduatesNum">
                                    <el-input :disabled="true" v-model.number="form.graduatesNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="科技人员总数" class="form-item" prop="technicalEmployeeNum">
                                    <el-input :disabled="true" v-model.number="form.technicalEmployeeNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>

                            <div class="form-item-wrap">
                                <el-form-item label="科技人员在职数量" class="form-item" prop="onjobTechNum">
                                    <el-input :disabled="true" v-model.number="form.onjobTechNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="科技人员兼职数量" class="form-item" prop="ptjobTechNum">
                                    <el-input :disabled="true" v-model.number="form.ptjobTechNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="科技人员临时数量" class="form-item" prop="tempTechNum">
                                    <el-input :disabled="true" v-model.number="form.tempTechNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="标准数量" class="form-item" prop="standardNum">
                                    <el-input :disabled="true" v-model.number="form.standardNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="本年新增标准数量" class="form-item" prop="freshStandardNum">
                                    <el-input :disabled="true" v-model.number="form.freshStandardNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="研发机构数量" class="form-item" prop="freshmanNum">
                                    <el-input :disabled="true" v-model.number="form.researchOrgNum" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="所属省份" class="form-item" prop="provinceDm">
                                    <el-select class="inputwidth"
                                               :disabled="true"
                                               size="small"
                                               v-model="form.provinceDm"
                                               placeholder="请选择省份">
                                        <el-option
                                                v-for="item in provinces"
                                                :key="item.CODE"
                                                :label="item.CAPTION"
                                                :value="item.CODE">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属年份" class="form-item" prop="givenYear">
                                    <el-input :disabled="true" v-model.number="form.givenYear" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="企业是否属于先导区" class="form-item">
                                    <el-radio-group :disabled="true" v-model="form.isPilotArea" class="inputwidth">
                                        <el-radio :label="'1'">是</el-radio>
                                        <el-radio :label="'0'">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="所属行业" prop="industryDm">
                                    <el-select :disabled="true" v-model="form.industryDm" placeholder="请选择所属行业"
                                               class="inputwidth">
                                        <el-option label="电子信息" value="dzxx"></el-option>
                                        <el-option label="生物与新医药" value="swyxyy"></el-option>
                                        <el-option label="航空航天" value="hkht"></el-option>
                                        <el-option label="新材料" value="xcl"></el-option>
                                        <el-option label="高技术服务" value="gjsfw"></el-option>
                                        <el-option label="新能源与节能" value="xnyyjn"></el-option>
                                        <el-option label="资源与环境" value="zyyhj"></el-option>
                                        <el-option label="先进制造与自动化" value="xjzzyzdh"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap">
                                <el-form-item label="企业近五年内获得人工智能产品情况" class="form-item">
                                    <el-input :disabled="true" v-model="form.recentProductInfo" type="textarea"
                                              :rows="3"
                                              class="textwidth"></el-input>
                                </el-form-item>
                            </div>
                        </template>
                    </el-form>
                    <div class="btn-next">
                        <el-button type="primary" @click="formnext">下一页</el-button>
                    </div>

                </div>
            </el-tab-pane>
            <el-tab-pane label="主要财务指标年填报" name="second">
                <el-form ref="form1" :model="form1" label-width="250px">
                    <table>
                        <tr>
                            <td>
                                <el-form-item label="营业收入(万元)" class="form-item" prop="income">
                                    <el-input :disabled="true" v-model.number="form1.income" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="主营业务收入(万元)" class="form-item" prop="majorIncome">
                                    <el-input :disabled="true" v-model.number="form1.majorIncome" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="主营业务成本(万元)" class="form-item" prop="majorCost">
                                    <el-input :disabled="true" v-model.number="form1.majorCost" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="主营业务利润(万元)" class="form-item" prop="majorProfit">
                                    <el-input :disabled="true" v-model.number="form1.majorProfit" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="销售费用(万元)" class="form-item">
                                    <el-input :disabled="true" v-model.number="form1.sellingCost" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="管理费用(万元)" class="form-item" prop="manageCost">
                                    <el-input :disabled="true" v-model.number="form1.manageCost" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="税收(万元)" class="form-item" prop="taxRevenue">
                                    <el-input :disabled="true" v-model.number="form1.taxRevenue" clearable size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="享受优惠政策已退税额(万元)" class="form-item" prop="taxDrawback">
                                    <el-input :disabled="true" v-model.number="form1.taxDrawback" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="负债合计(万元)" class="form-item" prop="debts">
                                    <el-input :disabled="true" v-model.number="form1.debts" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="流动资产合计(万元)" class="form-item" prop="currentAssets">
                                    <el-input :disabled="true" v-model.number="form1.currentAssets" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="资产累计(万元)" class="form-item" prop="totalAssets">
                                    <el-input :disabled="true" v-model.number="form1.totalAssets" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="固定资产原价(万元)" class="form-item" prop="fixedAssets">
                                    <el-input :disabled="true" v-model.number="form1.fixedAssets" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="累计折旧(万元)" class="form-item" prop="totalDepreciation">
                                    <el-input :disabled="true" v-model.number="form1.totalDepreciation" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="本年折旧(万元)" class="form-item"
                                              prop="currentYearDepreciation">
                                    <el-input :disabled="true" v-model.number="form1.currentYearDepreciation"
                                              size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="所有者权益年末余额(万元)" class="form-item" prop="yearEndBalance">
                                    <el-input :disabled="true" v-model.number="form1.yearEndBalance" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="固定资产投资额(万元)" class="form-item" prop="fixedInvestments">
                                    <el-input :disabled="true" v-model.number="form1.fixedInvestments" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="研发经费(万元)" class="form-item" prop="researchCost">
                                    <el-input :disabled="true" v-model.number="form1.researchCost" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="所有者权益年初余额(万元)" class="form-item" prop="yearInitBalance">
                                    <el-input :disabled="true" v-model.number="form1.yearInitBalance" clearable
                                              size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                    </table>
                </el-form>
                <div class="btn-next">
                    <el-button type="primary" @click="form1next">下一页</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="揭榜产品指标年填报" name="third">
                <el-form ref="form2" :model="form2" label-width="250px">
                    <div class="form-item-wrap">
                        <el-form-item label="所属年度">
                            <el-input :disabled="true" type="productName" v-model="form.givenYear"
                                      class="inputwidth"></el-input>
                        </el-form-item>
                        <el-form-item label="出口额">
                            <el-input :disabled="true" v-model.number="form2.exportsAccounts"
                                      class="inputwidth"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <tableList ref="tableInfo"
                                   highlight-current-row
                                   :getDataWay="getDataWayInfo"
                                   :columns="columnsinfo">
                            <el-table-column label="操作" slot="opts" width="180">
                                <template v-slot="scope">
                                    <el-button type="primary" @click="See(scope.row)" icon="el-icon-search" size="small">查看</el-button>
                                </template>
                            </el-table-column>
                        </tableList>
                    </div>
                </el-form>
                <approval :apprData="$route.query"></approval>
            </el-tab-pane>
        </el-tabs>
        <el-dialog append-to-body
                   :close-on-click-modal="false"
                   title="产品添加"
                   :visible.sync="dialogprojectFormVisible"
                   center>
            <el-form :model="productForm" ref="productForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="产品名称">
                    <el-input :disabled="true" type="productName" v-model="productForm.productName"></el-input>
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
                <el-form-item label="产品描述"
                              prop="conclusion">
                    <el-input :disabled="true" v-model="productForm.conclusion" type="textarea"
                              :rows="2"
                              placeholder="请输入内容" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品销售收入">
                    <el-input :disabled="true" type="productSellingRevenue"
                              v-model.number="productForm.productSellingRevenue"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogprojectFormVisible=false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import tableList from "@/components/grid/TableList";
    import approval from "./approval";

    export default {
        name: "xxtbDetail",
        components: {
            tableList,
            approval
        },
        data() {
            return {
                //页签切换
                activeName: 'first',
                //获取产品列表
                getDataWayInfo: {
                    dataType: "data",
                    data: [],
                },
                //新增产品dialog
                dialogprojectFormVisible: false,
                //产品列表列名
                columnsinfo: [
                    {
                        label: ' 产品名称',
                        prop: 'productName',

                    }, {
                        label: '操作',
                        prop: 'opts',
                        template: true //添加模板，一般处理操作列(注意：tempate、formatter不能同时使用)
                    }
                ],
                //企业信息数据项
                form: {
                    uuid: '',
                    legalPersonName: "",
                    certNo: "",
                    age: "",
                    technicalTitle: "",
                    educationDm: "",
                    email: "",
                    phone: "",
                    graduationSchool: "",
                    resume: "",
                    comName: "",
                    mergerNum: "",
                    financeNum: "",
                    ventureNum: "",
                    standardNum: "",
                    industryDm: "",
                    freshPropertyNum: "",
                    primaryPropertyNum: "",
                    secondaryPropertyNum: "",
                    onjobEmployeeNum: "",
                    ptjobEmployeeNum: "",
                    employeeNum: "",
                    onjobTechNum: "",
                    tempEmployeeNum: "",
                    technicalEmployeeNum: "",
                    ptjobTechNum: "",
                    freshmanNum: "",
                    provinceDm: "",
                    researchOrgNum: "",
                    graduatesNum: "",
                    recentProductInfo: "",
                    givenYear: "",
                    tempTechNum: "",
                    freshStandardNum: "",
                    isPilotArea: "1",
                },
                //财务数据项
                form1: {
                    uuid: '',
                    income: "",
                    majorIncome: "",
                    majorCost: "",
                    majorProfit: "",
                    sellingCost: "",
                    manageCost: "",
                    taxRevenue: "",
                    taxDrawback: "",
                    debts: "",
                    currentAssets: "",
                    totalAssets: "",
                    fixedAssets: "",
                    totalDepreciation: "",
                    currentYearDepreciation: "",
                    yearEndBalance: "",
                    fixedInvestments: "",
                    researchCost: "",
                    yearInitBalance: "",
                },
                //第三页财务数据项
                form2: {
                    exportsAccounts: "",
                },
                //产品数据项
                productForm: {
                    uuid: '',
                    productName: "",
                    majorDirectionDm: "",
                    claimDirectionDm: "",
                    areaDirectionDm: "",
                    conclusion: "",
                    productSellingRevenue: "",
                },
                //重点方向下拉选数据
                zdList: [],
                //揭榜方向下拉选数据
                jbList: [],
                //领域方向下拉选数据
                lyList: [],
                // 字典表数据
                provinces: [],
            };
        },
        created() {
            let that = this;
            this.activeName = 'first';
            this.$$request({
                url:that.$api.homeApi.getComAnnualApprovalInfo,
                data: {
                    uuid: this.$route.query.uuid
                }
            }).then(function (res) {
                if (res.result === 1) {
                    console.log(res)
                    that.form = {
                        uuid: res.info.uuid,
                        legalPersonName: res.info.legalPersonName,
                        certNo: res.info.certNo,
                        age: res.info.age,
                        technicalTitle: res.info.technicalTitle,
                        educationDm: res.info.educationDm,
                        email: res.info.email,
                        phone: res.info.phone,
                        graduationSchool: res.info.graduationSchool,
                        resume: res.info.resume,
                        comName: res.info.comName,
                        mergerNum: res.info.mergerNum,
                        financeNum: res.info.financeNum,
                        ventureNum: res.info.ventureNum,
                        standardNum: res.info.standardNum,
                        industryDm: res.info.industryDm,
                        freshPropertyNum: res.info.freshPropertyNum,
                        primaryPropertyNum: res.info.primaryPropertyNum,
                        secondaryPropertyNum: res.info.secondaryPropertyNum,
                        onjobEmployeeNum: res.info.onjobEmployeeNum,
                        ptjobEmployeeNum: res.info.ptjobEmployeeNum,
                        employeeNum: res.info.employeeNum,
                        onjobTechNum: res.info.onjobTechNum,
                        tempEmployeeNum: res.info.tempEmployeeNum,
                        technicalEmployeeNum: res.info.technicalEmployeeNum,
                        ptjobTechNum: res.info.ptjobTechNum,
                        freshmanNum: res.info.freshmanNum,
                        provinceDm: res.info.provinceDm,
                        researchOrgNum: res.info.researchOrgNum,
                        graduatesNum: res.info.graduatesNum,
                        recentProductInfo: res.info.recentProductInfo,
                        givenYear: res.info.givenYear,
                        tempTechNum: res.info.tempTechNum,
                        freshStandardNum: res.info.freshStandardNum,
                        isPilotArea: res.info.isPilotArea,
                    };
                    that.form1 = {
                        uuid: res.info.uuid,
                        income: res.info.income,
                        majorIncome: res.info.majorIncome,
                        majorCost: res.info.majorCost,
                        majorProfit: res.info.majorProfit,
                        sellingCost: res.info.sellingCost,
                        manageCost: res.info.manageCost,
                        taxRevenue: res.info.taxRevenue,
                        taxDrawback: res.info.taxDrawback,
                        debts: res.info.debts,
                        currentAssets: res.info.currentAssets,
                        totalAssets: res.info.totalAssets,
                        fixedAssets: res.info.fixedAssets,
                        totalDepreciation: res.info.totalDepreciation,
                        currentYearDepreciation: res.info.currentYearDepreciation,
                        yearEndBalance: res.info.yearEndBalance,
                        fixedInvestments: res.info.fixedInvestments,
                        researchCost: res.info.researchCost,
                        yearInitBalance: res.info.yearInitBalance,
                    };
                    that.form2.exportsAccounts = res.info.exportsAccounts;
                    res.info.productList.forEach((item, index) => {
                        that.$set(that.getDataWayInfo.data, index, item)
                    })
                } else {
                    that.$alert(res.msg, "系统异常，请联系管理员！", {});
                }
            }).catch(function (error) {
                that.$alert(error, "系统异常，请联系管理员！", {});
            })
            that.getProvince();
        },
        methods: {
            //企业信息填报下一步
            formnext: function () {
                this.activeName = 'second';
            },
            //财务填报下一步
            form1next: function () {
                this.activeName = 'third';
            },
            //产品查看
            See: function (row) {
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
            getjbList(claimDirectionDm) {
                let that = this
                this.$$request({
                    url: this.$api.hyglApi.querySubSelcetListByTableNameAndParentCode,
                    data: {
                        tableName: "DM_CLAIM_DIRECTION",
                        parentCode: claimDirectionDm
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.jbList = res.info;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //领域方向
            getlyList(areaDirectionDm) {
                let that = this
                this.$$request({
                    url: this.$api.hyglApi.querySubSelcetListByTableNameAndParentCode,
                    data: {
                        tableName: "DM_AREA_DIRECTION",
                        parentCode: areaDirectionDm
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.lyList = res.info;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //获取省份
            getProvince() {
                let that = this;
                // 请求省份码表
                this.$$request({
                    url: this.$api.getCodeData,
                    data: {
                        tableName: "DM_PROVINCE"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.provinces = res.info;
                    } else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })
            }
        },
    }
</script>

<style scoped lang="less">
    .xxtb-detail {
        padding: 10px 20px;
        border: 1px solid #DDDDDD;;

        .form-item-wrap {
            display: flex;
            justify-content: center;
        }

        .btn-next {
            text-align: center;
            margin-top: 20px;
            width: 100%;
        }

        table {
            border-collapse: collapse;
            margin: 0 auto;
        }
    }

    .inputwidth {
        width: 250px;
    }

    .textwidth {
        width: 670px;
    }

    .wz {
        margin-left: 200px;
        margin-top: 50px;
    }

    .wz1 {
        margin-left: 150px;
    }

    .wz2 {
        margin-left: 240px;
    }

    .wz3 {
        margin-left: -100px;
    }

    .wz4 {
        margin-left: -310px;

    }

    .wz5 {
        margin-left: 180px;
    }

    .xx {
        padding-right: 30px;
    }

    /*.form-item-wrap1 {
        display: flex;
        width: 49%;
    }*/
</style>
