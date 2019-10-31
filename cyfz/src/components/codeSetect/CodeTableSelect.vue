/**
*  select-option公共组件 支持驱动联动，支持被联动 支持前后端disabled
*  @params
***
    字典项传值对应关系:
    dm_dy_dylx        代码_党员_党员类型

    dm_dzz_dnzw       代码_党组织_党内职务
    dm_dzz_dwxzlb     代码_党组织_党委性质类别
    dm_dzz_zzlb       代码_党组织_组织类别
    dm_dzz_dwxzlb     单位属性(单位性质类别)

    dm_fzdy_hyjg      代码_发展党员_会议结果
    dm_fzdy_kclb      代码_发展党员_考察类别
    dm_fzdy_scjg      代码_发展党员_审查结果
    dm_fzdy_zsfs      代码_发展党员_政审方式

    dm_zh_dyzzqk      代码_综合_党员转正情况
    dm_zh_gzgw        代码_综合_工作岗位
    dm_zh_mz          代码_综合_民族
    dm_zh_qtdt        代码_综合_其他党员
    dm_zh_rdlx        代码_综合_入党类型
    dm_zh_spyj        代码_综合_审批意见
    dm_zh_xb          代码_综合_性别
    dm_zh_xl          代码_综合_学历
    dm_zh_xshjc       代码_综合_新社会阶层
    dm_zh_ycybqsj     代码_综合_延长预备期时间
    dm_zh_yxqk        代码_综合_一线情况
    dm_zh_zjlx        代码_综合_转接类型
    dm_zh_zjyy        代码_综合_转接原因
    dm_zh_zyjszwjb    代码_综合_专业技术职务级别
    dm_zh_dzzsdgx     党组织属地关系
    dm_zh_dzzszdwqk   党组织所在单位情况
    dm_zh_xzqh        党组织所在所在行政区划
    dm_zh_kgqk        企业控制（控股情况）
    dm_zh_qygm        企业规模
    dm_zh_dwlsgx      隶属关系
    dm_zh_zwjb 职务级别

    dm_zzgxzj_blzt    代码_组织关系转接_办理状态
    dm_zzgxzj_czlx    代码_组织关系转接_操作类型
    dm_zzgxzj_spzt    代码_组织关系转接_审批状态
    dm_zzgxzj_zjzt    代码_组织关系转接_转接状态
***
*  :tableName 字典码
*  :placeholder  提示语
*  :clearable  是否可清空选项
*  :multiple  是否多选
*  :collapseTags  是否合并多选
*  :disabled  是否禁用
*  :filterable  是否可搜索
*  :defaultValue  多选传递数组，单选传递字符串
*  :change 获取选择值
*    url 请求url
*    showCode 是否展示代码
*    linkageable 是否可以被联动 支持根据value联动
*    ableItems 前端able数据，默认disabled 其他选项
*/
<template>
    <div>
        <el-select v-if="!linkage"
                   v-model="value"
                   :placeholder="placeholder"
                   :clearable="clearable"
                   :multiple="multiple"
                   :collapse-tags="collapseTags"
                   :disabled="disabled"
                   :filterable="filterable"
                   @change="getValue">
            <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="showCode?item.dm+item.label:item.label"
                    :value="item.value"
                    :disabled="item.disabled"
            >
                <span v-if="!item.pcode">{{showCode?item.dm:""}}{{ item.label }}</span>
                <span v-else>&nbsp;&nbsp;{{showCode?item.dm:""}}{{ item.label }}</span>
            </el-option>
        </el-select>
        <el-select v-else
                   v-model="value"
                   :placeholder="placeholder"
                   :clearable="clearable"
                   :multiple="multiple"
                   :collapse-tags="collapseTags"
                   :disabled="disabled"
                   :filterable="filterable"
                   @change="getValue">
            <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="showCode?item.dm+item.label:item.label"
                    :value="item.value"
                    :disabled="item.disabled"
            >
                <span v-if="!item.pcode">{{showCode?item.dm:""}}{{ item.label }}</span>
                <span v-else>&nbsp;&nbsp;{{showCode?item.dm:""}}{{ item.label }}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: "CodeTableSelect",
        components: {},
        props: {
            queryName: {
                type: String,
                default: ""
            },
            currentCode:{
                type: String,
                default: ""
            },
            placeholder: {
                type: String,
                default: "请选择"
            },
            clearable: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            collapseTags: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            filterable: {
                type: Boolean,
                default: false
            },
            defaultValue: {
                default: ""
            },
            url: {
                default: '',
            },
            showCode: {
                default: false
            },
            linkageable: {
                default: false
            },
            ableItems:{
                type: Array,
                default:function () {
                    return []
                }
            }
        },
        data() {
            return {
                options: [],
                value: "",
                selectedOption: {},
                localUrl:this.url,
                linkage:false,
                optionsCopy: [],

            };
        },
        mounted() {
            this.value = this.defaultValue;
            this.getOptions();
        },
        watch: {
            defaultValue(newValue, oldValue) {
                this.value = newValue;
                if (this.linkageable) {
                    this.linkage = !this.linkage

                }
            },
            queryName(newValue, oldValue) {
                this.queryName = newValue;
                this.getOptions();
            },
            ableItems(newValue) {

                if (newValue.length > 0) {
                    this.optionsCopy = JSON.parse(JSON.stringify(this.options))/*暂存,深拷贝，用于切换回去*/
                    for (let item of this.options.values()) {
                        if (newValue.indexOf(item.value) > -1) {//指定able条目，其他全部disable
                            item.disabled = false
                        } else {
                            item.disabled = true
                        }
                    }

                } else {//未指定，恢复数据
                    if (this.optionsCopy.length > 0) {
                        this.options = this.optionsCopy
                        this.optionsCopy=[]
                    }
                }
                /*刷新*/
                this.linkage = !this.linkage
            }
        },
        methods: {
            getOptions: function() {
                let data = {}
                this.options = [];
                let that = this;

                this.$store.getters["codeTable/getCodeTableByKey"]({
                    key: this.queryName,
                    url:this.$api.getSelect.getListData,
                    _that:this
                }).then(function (data) {
                    if (data) {
                        let dataOptions = data
                        for (let i = 0; i < dataOptions.length; i++) {
                            if (
                                !dataOptions[i].pcode &&
                                dataOptions[i + 1] &&
                                dataOptions[i + 1].pcode === dataOptions[i].code
                            ) {
                                that.options.push({
                                    label: dataOptions[i].caption,
                                    value: dataOptions[i].code,
                                    dm:dataOptions[i].dm,
                                    disabled: true
                                });
                            } else {
                                that.options.push({
                                    label: dataOptions[i].caption,
                                    value: dataOptions[i].code,
                                    pcode: dataOptions[i].pcode,
                                    disabled: dataOptions[i].disabled,
                                    dm:dataOptions[i].dm
                                });
                            }
                        }
                    } else {
                        that.msgAlert("数据异常，请联系管理员"+data.msg);
                    }
                }).catch(function(error) {
                    that.msgAlert("数据异常，请联系管理员"+error);
                })
            },
            getValue: function () {
                this.$emit("change", this.value);
            },
            resetVal: function() {
                this.value = "";
            }
        }
    };
</script>

<style>
</style>
