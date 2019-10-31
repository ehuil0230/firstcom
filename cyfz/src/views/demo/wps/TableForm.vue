<template>
    <div class="form-t" style="margin: 10px auto;width: 80%">
        <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="fromTable">
            <table class="el-oa-tform el-oa-bred">
                <tr>
                    <td class="t-w-1 el-oa-bred">名称</td>
                    <td class="t-w-3 el-oa-bred">
                        <el-form-item prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </td>
                    <td class="t-w-1 el-oa-bred">单位</td>
                    <td class="t-w-3 el-oa-bred">
                        <el-form-item>
                            <el-input v-model="form.part"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="t-w-1 el-oa-bred">名称</td>
                    <td class="t-w-3 el-oa-bred">
                        <el-form-item prop="region">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </td>
                    <td class="t-w-1 el-oa-bred">单位</td>
                    <td class="t-w-3 el-oa-bred">
                        <el-form-item>
                            <el-col :span="11">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="选择时间" v-model="form.date2"
                                                    style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="t-w-1 el-oa-bred">名称</td>
                    <td colspan="3" class="el-oa-bred">
                        <el-form-item prop="type">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                <el-checkbox label="地推活动" name="type"></el-checkbox>
                                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="t-w-1 el-oa-bred">单位</td>
                    <td colspan="3" class="el-oa-bred">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </td>
                </tr>
                <tr>
                    <td class="t-w-1 el-oa-bred">人员</td>
                    <td colspan="3" class="el-oa-bred">
                        <el-form-item prop="people">
                            <el-input v-model="form.people"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="t-w-1 el-oa-bred">说明</td>
                    <td colspan="3" class="el-oa-bred">
                        <el-form-item prop="desc">
                            <el-input type="textarea" :rows="5" v-model="form.desc"></el-input>
                        </el-form-item>
                    </td>
                </tr>
            </table>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "TableForm",
        data() {
            return {
                form: {
                    name: "",
                    part: "",
                    people: "",
                    type: []
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    people: [
                        {required: true, message: '请输入人员', trigger: 'blur'},
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .form-t .t-w-1 {
        width: 12.5%;
    }

    .form-t .t-w-3 {
        width: 37.5%;
    }

    .form-t .el-form-item {
        margin-bottom: unset;
    }

    /* 影响全局样式，暂将下面两个注释*/
    /*.el-input > input {*/
    /*    border-radius: unset;*/
    /*    border: 1px solid #fff;*/
    /*}*/

    /*.el-textarea > textarea {*/
    /*    border-radius: unset;*/
    /*    border: 1px solid #fff;*/
    /*    background-color: #CDC9C9;*/
    /*}*/

    .form-t .el-form-item__error {
        z-index: 10;
        position: absolute;
        top: 0;
        /*bottom: 0;*/
        right: 0;
    }

    .form-t .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus {
        border-color: #fff;
    }

    .form-t .el-oa-tform {
        width: 100%;
        border-collapse: collapse;
    }

    .form-t .el-oa-bred {
        border: 1px solid red;
    }

    /*.fromTable>table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid red;
    }

    .fromTable>table>tr>td {
      border: 1px solid red;
    }*/

    .form-t td {
        height: 40px;
        text-align: center;
    }

</style>
