<!--信息填报-->
<template>
    <div class="xxtbone">
        <div style="padding: 10px 20px"><!--  -->
            <el-button v-if="packageStatus === 'hlw'" type="primary" size="small" :disabled="isCreated===1" @click="add" icon="el-icon-edit-outline">新建</el-button>
            <el-button v-if="packageStatus === 'hlw'" @click="update" size="small" type="primary" icon="el-icon-edit">修改</el-button>
        </div>
        <tableList
                ref="table"
                :getDataWay="getDataWay"
                index
                :columns="columns"
                :pagination="pagination"
                :checkedData='checkedData'
                selection><!--v-bind:selection="packageStatus === 'hlw'?true:false"-->
            <el-table-column label="年份" :width="55" slot="givenYear" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="true" @click.stop="show(scope.row)" class="a-link">
                        {{scope.row.givenYear}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>
        <el-dialog v-if="dialogFormVisible"
                   title="信息填报"
                   :visible.sync="dialogFormVisible"
                   width="1100px"
                   :close-on-click-modal="false">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="企业信息填报" name="first">
                    <div>
                        <el-divider content-position="left">法人信息</el-divider>
                        <el-form ref="form" :rules="rules" :model="form" label-width="170px">
                            <template class="sizes">
                                <div class="form-item-wrap">
                                    <el-form-item label="法人代表姓名" class="form-item" prop="legalPersonName">
                                        <el-input :disabled="state=== 'N'" v-model="form.legalPersonName" class="inputwidth" size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="身份证号码" class="form-item" prop="certNo">
                                        <el-input :disabled="state=== 'N'" v-model="form.certNo" class="inputwidth" size="small"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="年龄" class="form-item" prop="age">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.age" class="inputwidth" size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="职称" class="form-item" prop="technicalTitle">
                                        <el-input :disabled="state=== 'N'" v-model="form.technicalTitle" class="inputwidth" size="small"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="教育情况" class="form-item" prop="educationDm">
                                        <el-select class="inputwidth"
                                                   :disabled="state=== 'N'"
                                                   size="small"
                                                   v-model="form.educationDm"
                                                   placeholder="请选择教育情况">
                                            <el-option
                                                    v-for="item in eduList"
                                                    :key="item.CODE"
                                                    :label="item.CAPTION"
                                                    :value="item.CODE">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" class="form-item" prop="email">
                                        <el-input :disabled="state=== 'N'" v-model="form.email" class="inputwidth" size="small"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="联系电话" class="form-item" prop="phone">
                                        <el-input :disabled="state=== 'N'" v-model="form.phone" clearable size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="毕业学校" class="form-item" prop="graduationSchool">
                                        <el-input :disabled="state=== 'N'" v-model="form.graduationSchool" clearable size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="工作简历" class="form-item" prop="resume">
                                        <el-input :disabled="state=== 'N'" v-model="form.resume" type="textarea" :rows="3"
                                                  class="textwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <el-divider content-position="left">企业信息</el-divider>
                                <div class="form-item-wrap">
                                    <el-form-item label="企业名称" class="form-item" prop="comName">
                                        <el-input :disabled="state=== 'N'" v-model="form.comName" clearable size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="并购金额(万元)" class="form-item" prop="mergerNum"
                                                  :rules="[{ required: true,message: '并购金额不能为空'},
                                                  { type: 'number', message: '并购金额必须为数字值'},
                                                  {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.mergerNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="融资金额(万元)" class="form-item" prop="financeNum"
                                                  :rules="[{ required: true,message: '融资金额不能为空'},
                                                  { type: 'number', message: '融资金额必须为数字值'},
                                                  {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.financeNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="风险投资金额(万元)" class="form-item" prop="ventureNum"
                                                  :rules="[{ required: true,message: '风险投资金额不能为空'},
                                                  { type: 'number', message: '风险投资金额必须为数字值'},
                                                  {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.ventureNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="一类知识产权数量" class="form-item" prop="primaryPropertyNum"
                                                  :rules="[{ required: true,message: '一类知识产权数量不能为空'},
                                                  { type: 'number', message: '一类知识产权数量必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.primaryPropertyNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="二类知识产权数量" class="form-item" prop="secondaryPropertyNum"
                                                  :rules="[{ required: true,message: '二类知识产权数量不能为空'},
                                                  { type: 'number', message: '二类知识产权数量必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.secondaryPropertyNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="本年新增知识产权数量" class="form-item" prop="freshPropertyNum"
                                                  :rules="[{ required: true,message: '新增知识产权数量不能为空'},
                                                  { type: 'number', message: '新增知识产权数量必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.freshPropertyNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="企业职工总数" class="form-item" prop="employeeNum"
                                                  :rules="[{ required: true,message: '企业职工总数不能为空'},
                                                  { type: 'number', message: '企业职工总数必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.employeeNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="企业职工在职人员数量" class="form-item" prop="onjobEmployeeNum"
                                                  :rules="[{ required: true,message: '企业职工在职人员数量不能为空'},
                                                  { type: 'number', message: '在职人员必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.onjobEmployeeNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="兼职人员数量" class="form-item" prop="ptjobEmployeeNum"
                                                  :rules="[{ required: true,message: '兼职人员数量不能为空'},
                                                  { type: 'number', message: '兼职人员必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.ptjobEmployeeNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="临时人员数量" class="form-item" prop="tempEmployeeNum"
                                                  :rules="[{ required: true,message: '临时人员数量不能为空'},
                                                  { type: 'number', message: '临时人员必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.tempEmployeeNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="本年新增人数" class="form-item" prop="freshmanNum"
                                                  :rules="[{ required: true,message: '本年新增人数不能为空'},
                                                  { type: 'number', message: '新增人数必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.freshmanNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">

                                    <el-form-item label="本年吸纳高校应届毕业生人数" class="form-item" prop="graduatesNum"
                                                  :rules="[{ required: true,message: '毕业生人数不能为空'},
                                                  { type: 'number', message: '毕业生人数必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.graduatesNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="科技人员总数" class="form-item" prop="technicalEmployeeNum"
                                                  :rules="[{ required: true,message: '科技人员总数不能为空'},
                                                  { type: 'number', message: '科技人员必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.technicalEmployeeNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="科技人员在职数量" class="form-item" prop="onjobTechNum"
                                                  :rules="[{ required: true,message: '科技人员在职数量不能为空'},
                                                  { type: 'number', message: '科技人员必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.onjobTechNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="科技人员兼职数量" class="form-item" prop="ptjobTechNum"
                                                  :rules="[{ required: true,message: '科技人员兼职数量不能为空'},
                                                  { type: 'number', message: '科技人员兼职必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.ptjobTechNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="科技人员临时数量" class="form-item" prop="tempTechNum"
                                                  :rules="[{ required: true,message: '科技人员临时数量不能为空'},
                                                  { type: 'number', message: '科技人员临时必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.tempTechNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="标准数量" class="form-item" prop="standardNum"
                                                  :rules="[{ required: true,message: '标准数量不能为空'},
                                                  { type: 'number', message: '标准数量必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.standardNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="本年新增标准数量" class="form-item" prop="freshStandardNum"
                                                  :rules="[{ required: true,message: '新增标准数量不能为空'},
                                                  { type: 'number', message: '新增标准数量必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.freshStandardNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                    <el-form-item label="研发机构数量" class="form-item" prop="freshmanNum"
                                                  :rules="[{ required: true,message: '研发机构数量不能为空'},
                                                  { type: 'number', message: '研发机构必须为数字值'},
                                                  {pattern:/^\d{1,9}$/, message: '长度在1到9个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model.number="form.researchOrgNum" size="small"
                                                  class="inputwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="所属省份" class="form-item" prop="provinceDm"
                                                  :rules="[{ required: true,message: '所属省份不能为空'}]">
                                        <el-select class="inputwidth"
                                                   :disabled="state=== 'N'"
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
                                    <el-form-item label="所属年份" class="form-item" prop="givenYear"
                                                  :rules="[{ required: true,message: '所属年份不能为空'}]">
                                        <el-date-picker style="width: 250px"
                                                        v-model="form.givenYear"
                                                        size="small"
                                                        format="yyyy"
                                                        value-format="yyyy"
                                                        type="year"
                                                        :disabled="state === 'N'"
                                                        placeholder="选择年份"
                                                        :picker-options="pickerOptions"
                                                        @change="givenYearChange(form.givenYear)">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="企业是否属于先导区" class="form-item" prop="isPilotArea"
                                                  :rules="[{ required: true,message: '是否属于先导区不能为空'}]">
                                        <el-radio-group :disabled="state=== 'N'" v-model="form.isPilotArea" class="inputwidth">
                                      <span style="display: inline">
                                     <el-radio label="1">是</el-radio>
                                     <el-radio label="0">否</el-radio>
                                            </span>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="所属行业" class="form-item" prop="industryDm"
                                                  :rules="[{ required: true,message: '所属行业不能为空'}]">
                                        <el-select class="inputwidth"
                                                   :disabled="state=== 'N'"
                                                   size="small"
                                                   v-model="form.industryDm"
                                                   placeholder="请选择所属行业">
                                            <el-option
                                                    v-for="item in industryList"
                                                    :key="item.CODE"
                                                    :label="item.CAPTION"
                                                    :value="item.CODE">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="form-item-wrap">
                                    <el-form-item label="企业近五年内获得人工智能产品情况" class="form-item" prop="recentProductInfo"
                                                  :rules="[{ required: true,message: '企业近五年内获得人工智能产品情况不能为空'},
                                                  {min: 1,max:1000,message: '长度在1到1000个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model="form.recentProductInfo" type="textarea" :rows="3"
                                                  class="textwidth"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="wz">
                                    <el-button :disabled="state=== 'N'" type="primary" @click="onSubmitform('form')">保存</el-button>
                                    <el-button type="primary" @click="formnext">下一步</el-button>
                                </div>
                            </template>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="主要财务指标年填报" name="second">
                    <el-form ref="form1" :model="form1" label-width="250px">
                        <template class="sizes">
                            <div class="form-item-wrap5">
                                <el-form-item label="营业收入(万元)" class="form-item" prop="income"
                                              :rules="[{ required: true,message: '营业收入不能为空'},
                                                                { type: 'number', message: '营业收入必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.income" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="主营业务收入(万元)" class="form-item" prop="majorIncome"
                                              :rules="[{ required: true,message: '主营业务收入不能为空'},
                                                                { type: 'number', message: '主营业务收入必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.majorIncome" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap5">
                                <el-form-item label="主营业务成本(万元)" class="form-item" prop="majorCost"
                                              :rules="[{ required: true,message: '主营业务成本不能为空'},
                                                                { type: 'number', message: '主营业务成本必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.majorCost" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="主营业务利润(万元)" class="form-item" prop="majorProfit"
                                              :rules="[{ required: true,message: '主营业务利润不能为空'},
                                                                { type: 'number', message: '主营业务利润必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.majorProfit" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap5">
                                <el-form-item label="销售费用(万元)" class="form-item" prop="sellingCost"
                                              :rules="[{ required: true,message: '销售费用不能为空'},
                                                                { type: 'number', message: '销售费用必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.sellingCost" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="管理费用(万元)" class="form-item" prop="manageCost"
                                              :rules="[{ required: true,message: '管理费用不能为空'},
                                                                { type: 'number', message: '管理费用必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.manageCost" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap5">
                                <el-form-item label="税收(万元)" class="form-item" prop="taxRevenue"
                                              :rules="[{ required: true,message: '税收不能为空'},
                                                                { type: 'number', message: '税收必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.taxRevenue" clearable size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="享受优惠政策已退税额(万元)" class="form-item" prop="taxDrawback"
                                              :rules="[{ required: true,message: '享受优惠政策已退税额不能为空'},
                                                                { type: 'number', message: '享受优惠政策已退税额必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.taxDrawback" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap5">
                                <el-form-item label="负债合计(万元)" class="form-item" prop="debts"
                                              :rules="[{ required: true,message: '负债合计不能为空'},
                                                                { type: 'number', message: '负债合计必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.debts" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="流动资产合计(万元)" class="form-item" prop="currentAssets"
                                              :rules="[{ required: true,message: '流动资产合计不能为空'},
                                                                { type: 'number', message: '流动资产合计必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.currentAssets" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap5">
                                <el-form-item label="资产累计(万元)" class="form-item" prop="totalAssets"
                                              :rules="[{ required: true,message: '资产累计不能为空'},
                                                                { type: 'number', message: '资产累计必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.totalAssets" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="固定资产原价(万元)" class="form-item" prop="fixedAssets"
                                              :rules="[{ required: true,message: '固定资产原价不能为空'},
                                                                { type: 'number', message: '固定资产原价必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.fixedAssets" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap5">
                                <el-form-item label="累计折旧(万元)" class="form-item" prop="totalDepreciation"
                                              :rules="[{ required: true,message: '累计折旧不能为空'},
                                                                { type: 'number', message: '累计折旧必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.totalDepreciation" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="本年折旧(万元)" class="form-item"
                                              prop="currentYearDepreciation"
                                              :rules="[{ required: true,message: '本年折旧不能为空'},
                                                                { type: 'number', message: '本年折旧必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.currentYearDepreciation" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap5">
                                <el-form-item label="所有者权益年末余额(万元)" class="form-item" prop="yearEndBalance"
                                              :rules="[{ required: true,message: '年末余额不能为空'},
                                                                { type: 'number', message: '年末余额必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.yearEndBalance" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="固定资产投资额(万元)" class="form-item" prop="fixedInvestments"
                                              :rules="[{ required: true,message: '固定资产投资额不能为空'},
                                                                { type: 'number', message: '固定资产投资额必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.fixedInvestments" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="form-item-wrap5">
                                <el-form-item label="研发经费(万元)" class="form-item" prop="researchCost"
                                              :rules="[{ required: true,message: '研发经费不能为空'},
                                                                { type: 'number', message: '研发经费必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.researchCost" size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                                <el-form-item label="所有者权益年初余额(万元)" class="form-item" prop="yearInitBalance"
                                              :rules="[{ required: true,message: '所有者权益年初余额不能为空'},
                                                                { type: 'number', message: '所有者权益年初余额必须为数字值'},
                                                                {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                    <el-input :disabled="state=== 'N'" v-model.number="form1.yearInitBalance" clearable size="small"
                                              class="inputwidth"></el-input>
                                </el-form-item>
                            </div>
                            <div class="wz1">
                                <el-button :disabled="state=== 'N'" type="primary" @click="onSubmitform1('form1')">保存</el-button>
                                <el-button type="primary" @click="form1next">下一步</el-button>
                            </div>
                        </template>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="揭榜产品指标年填报" name="third">
                    <el-form ref="form2" :model="form2" label-width="250px">
                        <div class="form-item-wrap1">
                            <el-form-item
                                    label="所属年度">
                                <el-input type="productName" :disabled="true" v-model="form.givenYear" autocomplete="off"
                                          class="inputwidth" size="small"
                                          clearable></el-input>
                            </el-form-item>
                            <el-form-item label="出口额" prop="exportsAccounts" class="wz3"
                                          :rules="[
                                          { required: true, message: '出口额不能为空'},
                                          { type: 'number', message: '出口额必须为数字值'},
                                          {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                <el-input :disabled="state=== 'N'" v-model.number="form2.exportsAccounts"  class="inputwidth" size="small"></el-input>
                            </el-form-item>
                        </div>
                        <div class="chanpintj">
                            <el-button :disabled="state=== 'N'" size="small" type="primary" @click="addProduct" style="margin-bottom: 10px">
                                产品添加
                            </el-button>
                            <tableList ref="tableInfo"
                                       highlight-current-row
                                       :getDataWay="getDataWayInfo"
                                       :columns="columnsinfo"
                                       :pagination="pagination1">
                                <el-table-column label="操作" slot="opts" width="180">
                                    <template v-slot="scope">
                                        <el-button type="primary" @click="See(scope.row)">编辑</el-button>
                                        <el-button :disabled="state=== 'N'" type="primary" @click="del(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </tableList>
                            <el-dialog v-if="dialogprojectFormVisible"
                                       append-to-body :close-on-click-modal="false"
                                       title="产品添加"
                                       width="600px"
                                       :visible.sync="dialogprojectFormVisible"
                                       @close="closeDialog('productForm')">
                                <el-form :model="productForm" ref="productForm" label-width="120px"
                                         class="demo-ruleForm">
                                    <el-form-item
                                            label="产品名称"
                                            prop="productName"
                                            :rules="[{ required: true, message: '产品名称不能为空'},
                                            {min:1,max:50,message: '长度在1到50个字符'}]">
                                        <el-input :disabled="state=== 'N'" type="productName" v-model="productForm.productName"
                                                  autocomplete="off"
                                                  clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="重点方向" prop="majorDirectionDm"
                                                  :rules="[{ required: true, message: '重点方向不能为空'}]">
                                        <el-select :disabled="state=== 'N'" v-model="productForm.majorDirectionDm">
                                            <el-option v-for="item in zdList" :label="item.CAPTION" :value="item.CODE"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="揭榜方向" prop="claimDirectionDm"
                                                  :rules="[{ required: true, message: '揭榜方向不能为空'}]">
                                        <el-select  :disabled="state=== 'N'|| productForm.majorDirectionDm === ''" v-model="productForm.claimDirectionDm">
                                            <el-option v-for="item in jbList" :label="item.CAPTION" :value="item.CODE"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="领域方向" prop="areaDirectionDm"
                                                  :rules="[{ required: true, message: '领域方向不能为空'}]">
                                        <el-select :disabled="state=== 'N' || productForm.claimDirectionDm === ''" v-model="productForm.areaDirectionDm">
                                            <el-option v-for="item in lyList" :label="item.CAPTION" :value="item.CODE"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                            label="产品描述"
                                            prop="conclusion"
                                            :rules="[
                                            { required: true, message: '产品描述不能为空'},
                                            {min:1,max:1000,message: '长度在1到1000个字符'}]">
                                        <el-input :disabled="state=== 'N'" v-model="productForm.conclusion" type="textarea"
                                                  :rows="2"
                                                  placeholder="请输入内容" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item
                                            label="产品销售收入"
                                            prop="productSellingRevenue"
                                            :rules="[{ required: true, message: '产品销售收入不能为空'},
                                            { type: 'number', message: '产品销售必须为数字值'},
                                            {pattern:/^\d{1,12}$/, message: '长度在1到12个字符'}]">
                                        <el-input :disabled="state=== 'N'" type="productSellingRevenue"
                                                  v-model.number="productForm.productSellingRevenue"
                                                  autocomplete="off"
                                                  clearable></el-input>
                                    </el-form-item>
                                    <div class="foot4">
                                        <el-button :disabled="state=== 'N'" type="primary" @click="productFormonSunbmit('productForm')">保存</el-button>
                                        <el-button :disabled="state=== 'N'" type="primary" @click="resetproductForm('productForm')">重置</el-button>
                                    </div>
                                </el-form>
                            </el-dialog>
                        </div>
                        <div class="foot3">
                            <el-button :disabled="state=== 'N'" type="primary" @click="onSubmit('form2')">保存</el-button>
                            <el-button :disabled="state=== 'N'" type="primary" @click="submitForm">提交</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import tableList from '@/components/grid/TableList.vue';

    export default {
        name: "InformationReporting",
        components: {
            tableList
        },
        data() {
            return {
                uuids:'',
                givenYear:'',
                comid:'',
                packageStatus:this.$packageStatus,
                checkedData: [],
                //页签切换
                activeName: 'first',
                //年报分页
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    pageSizes: [5, 10, 20, 50],//默认每页显示多少条
                    position: 'center',
                    layout: 'sizes ,total,prev, pager, next, jumper'
                },
                //年报产品分页
                pagination1: {
                    currentPage: 1,
                    pageSize: 5,
                    pageSizes: [5, 10, 20],//默认每页显示多少条
                    position: 'center',
                    layout: 'sizes ,total,prev, pager, next, jumper'
                },
                //获取年报列表 内外网
                getDataWay: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryComInfo,
                    param: {
                        givenYear: (new Date().getFullYear()-1).toString(),
                        netType: this.$packageStatus==='zwww'?'in':'ex',
                    }
                },
                //获取产品列表
                getDataWayInfo: {
                    dataType: "url",
                    type: 'post',
                    data: this.$api.hyglApi.queryClaimProduct,
                    param: {
                        givenYear: '',
                        flag: 'year',
                        uuids: '',
                        comid:'',
                    }
                },
                //获取勾选的数据
                //新增报表dialog
                dialogFormVisible: false,
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
                //年报列表列名
                columns: [
                    {
                        label: ' 年份',
                        prop: 'givenYear',
                        template: true,
                        width: '60',
                    },
                    {
                        label: ' 企业名称',
                        prop: 'comName',
                        width: '80',
                    },
                    {
                        label: ' 企业税收(万元)',
                        prop: 'taxRevenue',
                        width: '80',
                    },
                    {
                        label: ' 企业利润(万元)',
                        prop: 'majorProfit',
                        width: '80',
                    },
                    {
                        label: ' 企业总收入(万元)',
                        prop: 'income',
                        width: '95',
                    }, {
                        label: ' 人工智能产品销售收入(万元)',
                        prop: 'aiIncome',
                        width: '95',
                    }, {
                        label: ' 出口额(万元)',
                        prop: 'exportsAccounts',
                        width: '70',
                    }, {
                        label: ' 研发经费(万元)',
                        prop: 'researchCost',
                        width: '80',
                    }, {
                        label: ' 科研人数',
                        prop: 'technicalEmployeeNum',
                        width: '80',
                    }, {
                        label: ' 知识产权数',
                        prop: 'propertyTotalNum',
                        width: '95',
                    }, {
                        label: ' 标准数量',
                        prop: 'standardNum',
                    },
                ],
                //企业信息数据项
                form: {
                    uuid:'',
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
                    uuid:'',
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
                    uuid:'',
                    productName: "",
                    majorDirectionDm: "",
                    claimDirectionDm: "",
                    areaDirectionDm: "",
                    conclusion: "",
                    productSellingRevenue: "",
                },
                //校验规则
                rules: {
                    legalPersonName: [
                        {
                            required: true,
                            message: '法人姓名不能为空',
                        },
                        {
                            min: 1,
                            max: 25,
                            message: '长度在1到25个字符'
                        }
                    ],
                    certNo: [
                        {
                            required: true,
                            message: '身份证号码格式不正确',
                            pattern: '(^\\d{8}(0\\d|10|11|12)([0-2]\\d|30|31)\\d{3}$)|(^\\d{6}(18|19|20)\\d{2}(0\\d|10|11|12)([0-2]\\d|30|31)\\d{3}(\\d|X|x)$)'
                        }
                    ],
                    age: [
                        {required: true, message: '年龄不能为空'},
                        {type: 'number', message: '年龄必须为数字值'},
                        {pattern:/^\d{2,3}$/, message: '长度在2到3个字符'}
                    ],
                    technicalTitle: [
                        {
                            required: true,
                            message: '职称不能为空',
                        },
                        {
                            min:1,
                            max:25,
                            message: '长度在1到25个字符'
                        }
                    ],
                    educationDm: [
                        {
                            required: true,
                            message: '教育情况不能为空',
                        },
                    ],
                    email: [
                        {
                            required: true,
                            message: '邮箱格式不正确',
                            pattern: '(^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)'
                        }
                    ],
                    phone: [
                        {
                            required: true,
                            message: '联系电话格式不正确',
                            pattern: '(^((\\+|00)86)?1[3-9]\\d{9}$)|(^(\\d{3}(-)?\\d{8}|\\d{4}(-)?\\d{7})$)'
                        }
                    ],
                    graduationSchool: [
                        {
                            required: true,
                            message: '毕业学校不能为空',
                        },
                        {
                            min:1,
                            max:25,
                            message: '长度在1到25个字符'
                        }
                    ],
                    resume: [
                        {
                            required: true,
                            message: '工作简历不能为空',
                        },
                        {
                            min:1,
                            max:1000,
                            message: '长度在1到1000个字符'
                        }
                    ],
                    comName: [
                        {
                            required: true,
                            message: '企业名称不能为空',
                        },
                        {
                            min:1,
                            max:50,
                            message: '长度在1到50个字符'
                        }
                    ],
                },
                //判断是否可以新建状态码
                isCreated: 0 ,
                //重点方向下拉选数据
                zdList:[],
                //揭榜方向下拉选数据
                jbList:[],
                //领域方向下拉选数据
                lyList:[],
                // 字典表数据
                provinces: [],
                //教育情况字典表数据
                eduList:[],
                industryList:[],
                state:'Y', //是否可点击状态码
                isNotNew:'N',//判断是否新建按钮标识
                isNotProductUpdate:'N',//判断是否是产品编辑按钮标识
                //只能选择今年及今年以前的年份
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() > Date.now()-8.64e7;
                    },
                },
            };
        },
        methods: {
            //新建年报打开dialog
            add: function () {
                this.activeName = 'first';
                this.state = 'Y';
                this.isNotNew = 'Y';
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComSelfcommentByAnnualId,
                    data: {}
                }).then(function (res) {
                    if (res.result === 1) {
                        if(res.info){
                            if(res.info.state===1){
                                that.dialogFormVisible = true;
                                that.uuids = '';
                                that.form = {
                                    uuid:'',
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
                                    isPilotArea: "Y",
                                }
                                that.form1 = {
                                    uuid:'',
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
                                }
                                that.form2 = {
                                    exportsAccounts: "",
                                }
                                that.getName();
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
            //获取企业名称
            getName(){
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComName,
                    data: {}
                }).then(function (res) {
                    if (res.result === 1) {
                        if(res.info.comName){
                            that.$set(that.form,'comName',res.info.comName)
                        }else {
                            that.form.comName = '';
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
                    this.getQyxx(this.checkedData[0]);
                    this.getQycw(this.checkedData[0]);
                    this.getClickstate(this.checkedData[0]);
                    this.activeName = 'first';
                    this.dialogFormVisible = true;
                    this.uuids = this.checkedData[0].uuids;
                    this.givenYear = this.checkedData[0].givenYear;
                    this.comid = this.checkedData[0].comid;
                    this.isNotNew = 'N';
                }
            },
            //打开产品添加dialog
            addProduct(){
                if(this.form.uuid){
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
                }else{
                    this.$message({
                        message: '请先保存企业信息',
                        type: 'error'
                    });
                }
            },
            //提交表单1
            async submitForm1(){
                let flag = false;
                let that = this;
                await this.$$request({
                    url: this.$api.hyglApi.saveComInfo,
                    data:Object.assign(this.form, {
                        "state": "-1",
                    })
                }).then(function (res) {
                    if (res.result === 1) {
                        flag = true;
                        that.$set(that.form,'uuid',res.info.uuid);
                    }else{
                        return false;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                    return false;
                })
                return flag;
            },
            //提交表单2
            async submitForm2() {
                let flag = false;
                let that = this;
                await this.$$request({
                    url: this.$api.hyglApi.saveComFinance,
                    data: Object.assign(this.form1, {
                        "givenYear": this.form.givenYear,
                        "exportsAccounts": this.form2.exportsAccounts,
                        "uuids": this.uuids,
                    })
                }).then(function (res) {
                    if (res.result === 1) {
                        that.$set(that.form1,'uuid',res.info.uuid);
                        flag = true;
                    } else {
                        return false;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                    return false;
                })
                return flag;
            },
            //提交改变状态
            async changeStatus(){
                let that = this;
                let flag = false;
                await this.$$request({
                    url: this.$api.hyglApi.saveSubmitInfo,
                    data: {
                        state : '0',
                        approvalDm : '020002',
                        title : this.form.comName+this.form.givenYear+'年报',
                        givenYear : this.form.givenYear,
                        isMonthly: '0'
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.$refs.table.loadData();
                        flag = true;
                    }else{
                        return false;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                    return false;
                })
                return flag;
            },
            //企业信息填报下一步
            formnext: function () {
                this.activeName = 'second';
            },
            //财务填报下一步
            form1next: function () {
                this.activeName = 'third';
            },
            //企业信息填报保存
            onSubmitform: function (formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$$request({
                            url: this.$api.hyglApi.saveComInfo,
                            data: this.form
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                that.form.uuid = res.info.uuid;
                                that.$refs.table.loadData();
                            }else{
                                that.$message({
                                    message: '保存失败',
                                    type: 'error'
                                });
                            }
                        }).catch(function (error) {
                            that.$alert(error, "系统异常，请联系管理员！", {});
                        })
                    }
                });
            },
            //财务填报保存
            onSubmitform1: function (formName) {
                let that = this;
                if(this.form.givenYear){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$$request({
                                url: this.$api.hyglApi.saveComFinance,
                                data: Object.assign(this.form1, {
                                    "givenYear": this.form.givenYear
                                })
                            }).then(function (res) {
                                if (res.result === 1) {
                                    that.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    that.form1.uuid = res.info.uuid;
                                    that.$refs.table.loadData();
                                }else{
                                    that.$message({
                                        message: '保存失败',
                                        type: 'error'
                                    });
                                }
                            }).catch(function (error) {
                                that.$alert(error, "系统异常，请联系管理员！", {});
                            })

                        }
                    });
                }else{
                    this.$message({
                        message: '请先保存企业信息',
                        type: 'error'
                    });
                }
            },
            //展示年报
            show: function (row) {
                this.getQyxx(row);
                this.getQycw(row);
                this.getClickstate(row);
                this.activeName = 'first';
                this.uuids = row.uuids;
                this.givenYear = row.givenYear;
                this.comid = row.comid;
                this.dialogFormVisible = true;
                this.isNotNew = 'N';
            },
            //查看企业信息
            getQyxx(row){
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComInfoByComIdYear,
                    data: {
                        givenYear: row.givenYear,
                        comid: row.comid,
                    }
                }).then(function (res) {
                    if(res.result === 1){
                        if(res.info){
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
                                givenYear: res.info.givenYear.toString(),
                                tempTechNum: res.info.tempTechNum,
                                freshStandardNum: res.info.freshStandardNum,
                                isPilotArea: res.info.isPilotArea,
                            };
                        }
                    }else{
                        that.$alert(res.msg, "系统异常，请联系管理员！", {});
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //查看企业财务
            getQycw(row){
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComFinanceByAnnualId,
                    data: {
                        givenYear: row.givenYear,
                        comid: row.comid,
                    }
                }).then(function (res) {
                    if(res.result === 1){
                        if(res.info){
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
                        }else{
                            that.form2.exportsAccounts = '';
                        }
                    }else{
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //获取点击状态
            getClickstate(row){
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComInfoState,
                    data: {
                        givenYear: row.givenYear,
                        comid: row.comid,
                    }
                }).then(function (res) {
                    if(res.result === 1){
                        that.state = res.info;
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {});
                })
            },
            //产品查看
            See: function (row) {
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
            //产品添加
            productFormonSunbmit: function (formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$$request({
                            url: this.$api.hyglApi.saveClaimProduct,
                            data: Object.assign(this.productForm, {
                                "isMonthly": "0"
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
                                that.$refs['productForm'].resetFields();
                            }else{
                                that.$message({
                                    message: '保存失败',
                                    type: 'error'
                                });
                            }
                        }).catch(function (error) {
                            that.$alert(error, "系统异常，请联系管理员！", {});
                        })
                    }
                });
            },
            //产品重置
            resetproductForm: function (formName) {
                this.$refs[formName].resetFields();
                this.productForm.majorDirectionDm = '';
                this.productForm.claimDirectionDm = '';
                this.productForm.areaDirectionDm = '';
            },
            //产品页面保存
            onSubmit: function (formName) {
                if(this.form1.uuid){
                    let that = this;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$$request({
                                url: this.$api.hyglApi.saveComFinance,
                                data: {
                                    uuid:this.form1.uuid,
                                    exportsAccounts: this.form2.exportsAccounts,
                                    givenYear: this.form.givenYear,
                                    uuids: this.uuids,
                                }
                            }).then(function (res) {
                                if (res.result === 1) {
                                    that.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                    that.$set(that.form1,'uuid',res.info.uuid);
                                    that.$refs.table.loadData();
                                }else{
                                    that.$message({
                                        message: '保存失败',
                                        type: 'error'
                                    });
                                }
                            }).catch(function (error) {
                                that.$alert(error, "系统异常，请联系管理员！", {});
                            })
                        }
                    });
                }else {
                    this.$message({
                        message: '请先保存财务指标年报',
                        type: 'error'
                    });
                }
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
            //提交
            submitForm: function () {
                let that = this;
                this.valid('form').then((valid) => {
                    this.valid('form1').then((valid) => { //form2
                        this.valid('form2').then((valid) => {
                            if(this.submitForm1()){ //form1
                                if(this.submitForm2()){
                                    if(this.changeStatus()) {
                                        that.$message({
                                            message: '提交成功',
                                            type: 'success'
                                        });
                                        that.dialogFormVisible = false;
                                    }else {
                                        that.$message({
                                            message: '提交失败',
                                            type: 'error'
                                        });
                                    }
                                }else {
                                    that.$message({
                                        message: '提交财务指标失败',
                                        type: 'error'
                                    });
                                }
                            }else {
                                that.$message({
                                    message: '提交企业信息失败',
                                    type: 'error'
                                });
                            }
                        },(valid) => {
                            that.$message({
                                type: "warning",
                                duration: 1000,
                                message: "请填写出口额"
                            })
                        })
                    },(valid) => {
                        that.$message({
                            type: "warning",
                            duration: 1000,
                            message: "请填写财务指标必填信息"
                        })
                    })
                }, (valid) => {//表单校验失败
                    that.$message({
                        type: "warning",
                        duration: 1000,
                        message: "请填写企业信息必填信息"
                    })
                });
            },
            //校验
            valid(formName) {
                return this.$refs[formName].validate();
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
            //关闭dialog
            closeDialog: function () {},
            //获取省份
            getProvince(){
                let that = this;
                // 请求省份码表
                this.$$request({
                    url: this.$api.getCodeData,
                    data: {
                        tableName : "DM_PROVINCE"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.provinces = res.info;
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })
            },
            //获取教育情况
            getEducation(){
                let that = this;
                // 请求省份码表
                this.$$request({
                    url: this.$api.getCodeData,
                    data: {
                        tableName : "DM_EDUCATION"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.eduList = res.info;
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })
            },
            //获取所属行业码表
            getIndustry(){
                let that = this;
                // 请求省份码表
                this.$$request({
                    url: this.$api.getCodeData,
                    data: {
                        tableName : "DM_INDUSTRY"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.industryList = res.info;
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })
            },
            //所属年份改变事件
            givenYearChange(val){
                let that = this;
                this.$$request({
                    url: this.$api.hyglApi.getComInfoYearStatus,
                    data: {
                        uuid:this.form.uuid,
                        givenYear: val,
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        if(res.info) {
                            if(res.info==='N') {
                                that.form.givenYear = '';
                                that.$message({
                                    message: val+'年不可使用，请重新选择',
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
        },
        created() {
            this.getProvince();
            this.getEducation();
            this.getIndustry();
    //         this.$$request({
    //             url: this.$api.hyglApi.getCreatedStatus,
    //             data: {}
    //         }).then(function (res) {
    //             if(res.result === 1){
    //                 that.isCreated = res.info.isCreated;
    //             }
    //         }).catch(function (error) {
    //             that.$alert(error, "系统异常，请联系管理员！", {});
    //         })
        },
        watch:{
            'productForm.majorDirectionDm':function (val,oldVal) {
                let that = this;
                if(val !== oldVal){
                    if(this.isNotNew === 'Y'){//新建进来
                        if(this.isNotProductUpdate === 'N'){
                            this.productForm.claimDirectionDm = "";
                            this.productForm.areaDirectionDm = "";
                        }
                    }else{
                        if(this.state === 'Y'){//未提交
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
                        if(this.state === 'Y'){//未提交
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
            },
            uuids:function (newVal,oldVal) {
                if(newVal!=oldVal){
                    this.$set(this.getDataWayInfo,'param',{
                        uuids:this.uuids,
                        givenYear: this.givenYear,
                        flag: 'temp',
                        comid: this.comid,
                    });
                    if(this.$refs.tableInfo) {
                        this.$refs.tableInfo.loadData();
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .xxtbone {
        /*margin: 10px auto;*/
    }

    .form-item-wrap {
        display: flex;
        width: 80%;
        margin-left: 80px;
    }

    .form-item-wrap1 {
        display: flex;
        width: 100%;
        height: 42px;
    }

    .form-item-wrap3 {
        display: flex;
        width: 40%;
    }

    .form-item-wrap5 {
        display: flex;
        width: 80%;
    }

    .form-item {
        width: 60%;
    }

    .inputwidth {
        width: 250px;
    }

    .textwidth {
        width: 673px;
    }

    .chanpintj {
        width: 80%;
        margin: 10px auto;
    }

    .wz {
       text-align: center;
    }

    .foot3 , .foot4{
        text-align: center;
    }

    .wz1 {
        text-align: center;
    }

    .wz3 {
        margin-left: -100px;
    }

    .xx {
        padding-right: 30px;
    }
</style>
