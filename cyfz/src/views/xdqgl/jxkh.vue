<template>
    <div class = "myStyle">
    <div class="rightMain">
        <!--工具栏-->
        <toolbar position=top :toolbarItem="toolbarItem" @toolbarClick="toolbarClick" center></toolbar>
        <!--工具栏-新建-->
        <screenFilter :searchParams="searchParams">
            <template slot="slot_two">
<!--                <el-input class="search-name" size="small" v-model="searchParams.pilotAreaName"-->
<!--                          placeholder="请输入先导区名称" prefix-icon="el-icon-search" @input="searchBtn">-->
<!--                </el-input>-->
                <el-select class="search-name" v-model="searchParams.pilotareaid" placeholder="请选择先导区名称">
                    <el-option
                            v-for="item in pilotAreas"
                            :key="item.uuid"
                            :label="item.pilotAreaName"
                            :value="item.uuid">
                    </el-option>
                </el-select>
            </template>
            <template slot="slot_search">
                <el-form-item label="状态">
<!--                    <el-input v-model="searchParams.state"></el-input>-->
                    <el-select v-model="searchParams.state" placeholder="请选择">
                        <el-option
                                v-for="item in state"
                                :key="item.CODE"
                                :label="item.CAPTION"
                                :value="item.CODE">
                        </el-option>
                    </el-select>
                </el-form-item>
            </template>
        </screenFilter>
        <tableList ref="table"
                   selection
                   index
                   style="border-top: none;text-align: center"
                   :getDataWay="getDataWay"
                   :columns="columns"
                   :pagination="pagination"
                   :checkedData.sync='checkedData'>
            <el-table-column label="先导区名称" slot="pilotAreaName" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="false" @click="selectJxkh(scope.row)" class="a-link">
                        {{scope.row.pilotAreaName}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>
        <el-dialog
                title="绩效考核详情"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :modal="true"
                v-dialogDrag
                width="50%"
                :center="true"
                @open="openDailog"
                @close="close">
            <div class="form-t" style="width:80% ; margin: 0 auto;">
                <el-form :rules="rules" :model="form" ref="jxkhForm" label-width="90px">
                    <el-row>
                        <el-col class="label-col" :span="formWidth.label">
                            <label>先导区名称</label>
                        </el-col>
                        <el-col :span="formWidth.content">
                            <el-form-item prop="pilotareaid">
<!--                                <el-input v-model="form.pilotAreaName"></el-input>-->
                                <el-select v-model="form.pilotareaid" placeholder="请选择先导区名称"
                                           @change="changePilotArea">
                                    <el-option
                                            v-for="item in pilotAreas"
                                            :key="item.uuid"
                                            :label="item.pilotAreaName"
                                            :value="item.uuid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="label-col" :span="formWidth.label">
                            <label>所在省份</label>
                        </el-col>
                        <el-col :span="formWidth.content">
                            <el-form-item prop="provinceName">
                                <el-input disabled v-model="form.provinceName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="label-col textarea-row" :span="formWidth.label">
                            <label>考核说明</label>
                        </el-col>
                        <el-col class="textarea-row" :span="formWidth.content">
                            <el-form-item prop="introduction">
                                <el-input type="textarea" v-model="form.introduction"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="label-col" :span="formWidth.label">
                            <label>绩效考核总结</label>
                        </el-col>
                        <el-col :span="formWidth.content">
                            <el-form-item prop="fj">
                                <cy-upload ref="upload" v-if="fileData.allowUpload"
                                           :file-num="fileData.fileNum" :auto-up="true"
                                           :relatedId="fileData.relatedId">
                                </cy-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSave('jxkhForm')">保存</el-button>
                <el-button @click="onSubmit('jxkhForm')">提交</el-button>
            </span>
        </el-dialog>
    </div>
    </div>
</template>

<script>
    import TableList from "../../components/grid/TableList";
    import toolbar from "@/components/toolbar/myToolbar";
    import cyUpload from "../../components/upAndDown/cyUpload";

    export default {
        name: "jxkh",
        components: {
            TableList,
            toolbar,
            cyUpload
        },
        data() {
            return {
                // form表单字段和label的宽度
                formWidth: {
                    label: 6,
                    content: 18
                },
                //表单字段
                pilotAreas: [

                ],
                columns: [
                    {
                        label: '先导区名称',
                        prop: 'pilotAreaName',
                        template: true
                    },{
                        label: '所在省份',
                        prop: 'provinceName'
                    },{
                        label: '发布人',
                        prop: 'createUserName'
                    },{
                        label: '发布部门',
                        prop: 'createOrgName'
                    },{
                        label: '发布时间',
                        prop: 'createTime',
                        formatter(row) {
                            return new Date(row.createTime).Format("yyyy-MM-dd hh:mm:ss")
                        }
                    },{
                        label: '状态',
                        prop: 'state',
                        formatter(row) {
                            //更改工作流后状态值统一改为： 0/1 未发布   1-9(不包括)审核中   9已发布
                            if (row.state <= 1) {
                                return '未发布'
                            } else if (row.state > 1 && row.state < 9) {
                                return '审核中'
                            } else if (row.state == 9) {
                                return '已发布'
                            } else {
                                return '未发布'
                            }
                        }

                    }
                ],
                provinces: [

                ],
                state: [{
                    CAPTION: '已发布',
                    //CODE: 1
                      CODE: 2   //更改工作流后状态值统一改为： 0/1 未发布   1-9(不包括)审核中   9已发布
                },{
                    CAPTION: '未发布',
                    CODE: 0
                }],
                //查询时需获取页面数据
                searchParams:{
                    pilotareaid: '',
                    // provinceDm:'',
                    state: ''
                },
                rules: {
                    pilotareaid: [
                        { required: true, message: '请选择先导区'}
                    ],
                    provinceName: [
                        { required: true, message: '所在省份不能为空'}
                    ],
                    introduction: [
                        { required: true, message: '请填写考核说明'},
                        { max: 200, message: '长度在200个字符串'}
                    ],
                    // uploadFile: [
                    //     { required: true, message: '请上传绩效考核总结'}
                    // ],
                },
                //调用组件传输返回页面数据
                getDataWay:{
                    dataType:"url",
                    data: this.$api.xdqglApi.pilotAssessQuery,
                    param: {}
                },
                pagination:{
                    // currentPage: 1,
                    // pageSize: 10,
                    // position: 'right',
                    // layout: 'total,prev, pager, next, jumper'
                    currentPage: 1,
                    pageSize: 10,
                    position: 'center',
                    pageSizes: [10, 50, 100],//默认每页显示多少条
                    layout: 'sizes ,prev, pager, next, jumper'
                },
                toolbarItem:[
                    {
                        type:"primary",
                        title:"新建",
                        icon:"el-icon-edit-outline",
                        disabled:false,
                        click:"create"
                    },
                    {
                        type:"primary",
                        title:"修改",
                        icon:"el-icon-edit",
                        disabled:false,
                        click:"update"
                    },
                    {
                        type:"primary",
                        title:"删除",
                        icon:"el-icon-delete",
                        disabled:false,
                        click:"delete"
                    },{
                        type:"primary",
                        title:"搜索",
                        icon:"el-icon-search",
                        disabled:false,
                        click:"search"
                    },
                ],
                //新建表单字段
                form: {
                    uuid: '',
                    pilotareaid: '',
                    pilotAreaName:'',//先导区名称
                    provinceDm: '',//所在省份
                    provinceName: '',
                    introduction : '',
                    // createOrg: '',
                    // createOrgName: '',
                    uploadFile: '',
                    state: ''
                },
                fileData: {
                    fileNum: 100,
                    relatedId: '',
                    allowUpload: true,
                    fromType: '0001',
                    spType: '010001'
                },
                //点击工具栏跳转
                dialogVisible: false,
                checkedData:[],
                ids:[],
                // fileList是首次加载的文件列表，用于和$ref.upload.fileList对比
                // 是否有新文件上传
                fileList:[]
            }
        },
        methods: {
            initData() {
                const that = this
                // 请求省份码表
                this.$$request({
                    method: 'post',
                    url: this.$api.getCodeData,
                    data: {
                        tableName : "DM_PROVINCE"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.provinces = res.info
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })

                // 请求先导区表
                this.$$request({
                    method: 'post',
                    url: this.$api.xdqglApi.pilotAreaQuery,
                    data: {
                        "pageSizeZero":"true",
                        "pageSize":0
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.pilotAreas = res.info.list
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员！", {})
                    return false
                })
            },
            // 打开dialog
            openDailog() {

            },
            //关闭dialog
            close() {
                this.dialogVisible = false;
            },
            toolbarClick(item) {
                let that = this;
                if (item.title == '新建') {
                    /*新建初始化*/
                    this.dialogVisible = true
                    this.$nextTick(function(){
                        that.$refs['jxkhForm'].resetFields()
                        that.form.uuid = ''
                        that.form.pilotareaid = ''
                        that.form.pilotAreaName = ''//先导区名称
                        that.form.provinceDm = ''//所在省份
                        that.form.provinceName =  ''
                        that.form.introduction = ''
                        that.form.uploadFile = ''
                        that.form.state = ''

                        // 文件上传数据
                        that.fileData.relatedId = ''
                        that.$refs.upload.fileList = []
                    })
                }
                if(item.title == '修改'){
                    /*修改初始化*/
                    if(this.checkedData.length === 0 || this.checkedData.length > 1){
                        this.$alert('请选择一条数据进行修改！', '提示',{
                            type: 'warning'
                        })
                    }else{
                        let state = this.checkedData[0].state
                        //更改工作流后状态值统一改为： 0/1 未发布   1-9(不包括)审核中   9已发布
                        if (state > 1 && state < 9) {
                            this.$alert('审核状态中无法修改！', '提示', {
                                type: 'warning'
                            })
                            return false
                        } else if(state == 9){
                            this.$alert('已发布内容无法修改！', '提示', {
                                type: 'warning'
                            })
                            return false
                        }else if(this.checkedData.editFlag===0){       //添加登录人操作权限限制
                            this.$alert('当前登录人不具有修改权限！', '提示', {
                                type: 'warning'
                            })
                            return false
                        }

                        this.$$request({
                            method: 'post',
                            url: this.$api.xdqglApi.pilotAssessDetail,
                            data: {
                                uuid : this.checkedData[0].uuid
                            }
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.dialogVisible = true

                                // 初始化文件上传
                                that.$nextTick(function(){
                                    that.$refs.upload.fileList = []
                                    that.form = res.info
                                    // 文件上传数据
                                    that.fileData.relatedId = that.form.uuid
                                    this.$$queryFileList({
                                        "relatedid": that.checkedData[0].uuid
                                    }).then((res) => {
                                        return res.infoe
                                    }).then((data) => {
                                        if (data.length > 0) {
                                            data.forEach((item) => {
                                                let obj = {
                                                    relatedid: item.relatedid,
                                                    uuid: item.uuid,
                                                    name: item.fileName,
                                                    url: item.md5path,
                                                };
                                                that.$refs.upload.fileList.push(obj);
                                            })
                                            // fileList是首次加载的文件列表，用于之后对比
                                            that.fileList = that.$refs.upload.fileList
                                        }
                                    }).catch(function (err) {
                                    })
                                })
                            }else {
                                that.$alert(res.msg, "系统异常，请联系管理员！", {});
                                return false;
                            }
                        }).catch(function (error) {
                            that.$alert(error, "系统异常，请联系管理员！", {});
                            return false;
                        });
                    }
                }
                if(item.title=='删除'){
                    if(this.checkedData.length === 0){
                        this.$alert('请选择至少一条数据进行删除！', '提示',{
                            type: 'warning'
                        })
                    }else {
                        for (let i=0; i<this.checkedData.length; i++) {
                            //更改工作流后状态值统一改为： 0/1 未发布   1-9(不包括)审核中   9已发布
                            if (this.checkedData[i].state > 1) {
                                this.$alert('审核中或已发布的无法删除！', '提示',{
                                    type: 'warning'
                                })
                                return false
                            }
                            //添加登录人操作权限限制
                            if(this.checkedData[i].editFlag===0){
                                this.$alert('当前登录人不具有修改权限！', '提示', {
                                    type: 'warning'
                                })
                                return false
                            }
                        }

                        this.$confirm('确认删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let uuids = this.ids.join(',')
                            this.$$request({
                                method: 'post',
                                url: this.$api.xdqglApi.pilotAssessDelete,
                                data: {
                                    uuid : uuids
                                }
                            }).then(function (res) {
                                if (res.result == 1) {
                                    that.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    that.checkedData = []
                                    that.ids = []
                                    that.$refs.table.loadData()
                                } else {
                                    that.$message({
                                        type: 'warning',
                                        message: '删除失败!'
                                    });
                                }
                            })
                        }).catch(() => {
                            that.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    }
                }
                if(item.title=='搜索'){
                    // window.console.log(...this.searchParams)
                    that.$refs.table.loadData(this.searchParams)
                    that.checkedData = []
                    that.ids = []
                }
            },
            // 统一保存方法，保存和提交都会调用
            uniformSave(formName){
                // 首先判断状态，审批完成后无法修改
                if (this.form.state > 0 && this.form.state < 9) {
                    this.$alert('审核状态中无法修改！', '提示', {
                        type: 'warning'
                    })
                    return false
                }else if (this.form.state == 9) {
                    this.$alert('已发布内容无法修改！', '提示', {
                        type: 'warning'
                    })
                    return false
                }

                let that = this
                let url = ''
                let data = {
                    ...this.form
                }
                if ($.isNotEmpty(this.form.uuid)) {
                    // 修改
                    url = this.$api.xdqglApi.pilotAssessUpdate
                    data.uuid = this.form.uuid
                } else {
                    // 新增
                    url = this.$api.xdqglApi.pilotAssessSave
                }
                let saveRequestPromise = null
                this.$refs[formName].validate((valid) => {
                    // 表单验证通过
                    if (valid) {
                        const promise = that.$$request({
                            method: 'post',
                            url: url,
                            data: data
                        }).then(function (res) {
                            if (res.result === 1) {
                                that.form.uuid = res.info.uuid
                                return res
                            }else {
                                that.$alert(res.msg, "系统异常，请联系管理员！", {})
                                return false
                            }
                        }).then(function (res) {
                            // 保存成功后，检查是否需要上传附件
                            let res1 = res
                            // 只有新增才需要单独处理上传，修改不需要
                            if (res1 && url == that.$api.xdqglApi.pilotAssessSave) {
                                const param = that.buildToUploadFile(res)
                                if (Object.keys(param).length != 0) {
                                    that.$$insertFileInfoBatch(param).
                                    then((resdata) => {
                                        res1 = resdata
                                    }).catch(function (err) {
                                        that.$message({
                                            message: '关联附件列表失败',
                                            type: 'warning'
                                        })
                                    })
                                }
                            }
                            return res1
                        })
                        saveRequestPromise = promise
                    }else {
                        window.console.log('验证未通过!')
                        return false
                    }
                })
                return saveRequestPromise
            },
            // 检测是否有新附件需要上传
            buildToUploadFile(res) {
                const that = this
                let param = {}
                let MD5Paths = [], fileNames = []
                let newFileList = that.$refs.upload.fileList
                // 比对新旧文件，新文件才需要上传
                if (newFileList.length > 0) {
                    newFileList.forEach((outerItem) => {
                        let flag = true
                        for (let i=0; i<that.fileList.length; i++) {
                            let innerItem = that.fileList[i]
                            if (outerItem.url == innerItem.url &&
                                outerItem.name == innerItem.name) {
                                flag = false
                                break
                            }
                        }
                        // 原文件列表中不存在文件，是新文件
                        if (flag) {
                            // 不要重复添加
                            if (MD5Paths.indexOf(outerItem.url) == -1) {
                                MD5Paths.push(outerItem.url)
                                fileNames.push(outerItem.name)
                            }
                        }
                    })
                    param = {
                        "relatedid": res.info.uuid,
                        "MD5Path": MD5Paths.join(','),
                        "fileName": fileNames.join(',')
                    }
                } else {
                    that.$message({
                        message: '新增成功',
                        type: 'success'
                    })
                }
                return param
            },
            // 保存
            onSave(formName) {
                // let that = this
                // let url = ''
                // let data = {
                //     ...this.form
                // }
                // let successTip = ''
                // if ($.isNotEmpty(this.form.uuid)) {
                //     // 修改
                //     url = this.$api.xdqglApi.pilotAssessUpdate
                //     data.uuid = this.form.uuid
                //     successTip = '修改成功'
                // } else {
                //     // 新增
                //     url = this.$api.xdqglApi.pilotAssessSave
                //     successTip = '保存成功'
                // }
                // this.$refs[formName].validate((valid) => {
                //     // 表单验证通过
                //     if (valid) {
                //         this.$$request({
                //             method: 'post',
                //             url: url,
                //             data: data
                //         }).then(function (res) {
                //             if (res.result === 1) {
                //                 that.$alert(successTip, '提示', {
                //                     type: 'success'
                //                 })
                //                 that.dialogVisible = false
                //                 that.$refs[formName].resetFields()
                //                 that.$refs.table.loadData()
                //                 that.checkedData = []
                //                 that.ids = []
                //             }else {
                //                 that.$alert(res.msg, "系统异常，请联系管理员！", {})
                //                 return false
                //             }
                //         }).catch(function (error) {
                //             that.$alert(error, "系统异常，请联系管理员！", {})
                //             return false
                //         })
                //     }else {
                //         window.console.log('验证未通过!')
                //         return false
                //     }
                // })
                let that = this
                let successTip = ''
                if ($.isNotEmpty(this.form.uuid)) {
                    // 修改
                    successTip = '修改成功'
                } else {
                    // 新增
                    successTip = '保存成功'
                }
                const savePromise = this.uniformSave(formName)
                if (savePromise instanceof Promise) {
                    savePromise.then((res) => {
                        if (res.result === 1) {
                            that.$alert(successTip, '提示', {
                                type: 'success'
                            })
                            that.dialogVisible = false
                            that.$refs[formName].resetFields()
                            that.$refs.table.loadData()
                            that.checkedData = []
                            that.ids = []
                        }
                    }).catch((error) => {
                        that.$alert(error, "保存时出现异常，请联系管理员！", {})
                        return false
                    })
                }
            },
            //提交表单
            onSubmit(formName) {
                let that = this
                let url = that.$api.xdqglApi.uniformSubmit
                let successTip = '提交成功'
                let approvalDm = '010007' // 审核代码
                const savePromise = this.uniformSave(formName)
                if (savePromise instanceof Promise) {
                    savePromise.then((res) => {
                        if (res.result === 1) {
                            that.form.tableid = that.form.uuid
                            that.form.uuid = ''
                            let data = {
                                ...that.form,
                                approvalDm: approvalDm
                            }
                            this.$$request({
                                method: 'post',
                                url: url,
                                data: data
                            }).then(function (res) {
                                if (res.result === 1) {
                                    that.$alert(successTip, '提示', {
                                        type: 'success'
                                    })
                                    that.dialogVisible = false
                                    that.$refs[formName].resetFields()
                                    that.$refs.table.loadData()
                                    that.checkedData = []
                                    that.ids = []
                                }else {
                                    that.$alert(res.msg, "系统异常，请联系管理员！", {})
                                    return false
                                }
                            })
                        }
                    }).catch((error) => {
                        that.$alert(error, "提交时出现异常，请联系管理员！", {})
                        return false
                    })
                }
            },
            searchBtn() {

            },
            handlePreview() {

            },
            // 改变先导区下拉框选项，同步变更所在省份
            changePilotArea(value){
                const that = this
                for (let i=0; i< this.pilotAreas.length; i++) {
                    if (this.pilotAreas[i].uuid == value){
                        that.form.provinceName = this.pilotAreas[i].provinceName
                        that.form.provinceDm = this.pilotAreas[i].provinceDm
                        break
                    }
                }
            },
            //点击标题跳转页面方法
            selectJxkh(data) {
                this.$router.push({
                    name: "jxkhDetail",
                    query: {
                        uuid: data.uuid,
                    }
                })
            }
        },
        //加载页面前获取Mock数据
        // beforeCreate: function () {
        //     const that = this
        //     this.$$request({
        //         url: "http://mockjs.com/api/jxkh",
        //         data: {type: 'top', key: '123456'}
        //     }).then(function (res) {
        //         that.getDataWay.data = res.info.list  //查询请求
        //         that.$refs.table.loadData()  //数据加载
        //     })
        // },
        mounted() {
            this.initData()
        },
        watch:{
            checkedData:function (val) {
                this.ids=[];
                for(let i=0; i<val.length ;i++) {
                    this.ids.push(val[i].uuid);
                }
            }
        }
    }
</script>

<style scoped>
    .myStyle /deep/ .search-part2 el-col el-col-24{
        width: 550px;
    }
    .myStyle /deep/ el-input__suffix{
        right: 21px;
    }
    .myStyle /deep/ el-select>.el-input{
        padding-right: 20px;
    }
    .rightMain {
        margin: 10px auto;
        width: 93%;
    }

    .form-t /deep/ .el-select {
        width: 100%;
    }
    .form-t /deep/ .el-row{
        margin-bottom: 10px;
    }
    .form-t /deep/ .el-col,
    .form-t /deep/ .el-input{
        position: relative;
        height: 60px;
        line-height: 60px;
    }
    .form-t /deep/ .el-col.textarea-row {
        height: 74px;
        line-height: 74px;
    }
    .form-t /deep/ .el-form-item{
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
    }

    .form-t .label-col {
        text-align: right;
        padding-right: 26px;
    }

    .form-t /deep/ .el-form-item__content{
        margin-left:0px !important;
    }
    .form-t /deep/ .el-form-item__error {
        /*margin-top: -10px;*/
    }
</style>
