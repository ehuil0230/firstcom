<template>
    <div class="rightMain">
        <!--工具栏-->
        <toolbar position=top :toolbarItem="toolbarItem" @toolbarClick="toolbarClick" center></toolbar>
        <!--工具栏-新建-->
        <createbar v-if="createDialogVisible" ref="createbar" @loadData="loadData"></createbar>
        <screenFilter :searchParams="searchParams">
            <template slot="slot_two">
                <span style="font-size:8px;margin-right:14px;color: #B2B7B7;">{{searchTip}}</span>
                <el-input class="search-name" size="small" v-model="searchParams.pilotAreaName"
                          placeholder="请输入先导区名称" prefix-icon="el-icon-search" @input="searchBtn">
                </el-input>
            </template>
            <template slot="slot_search">
                <el-form-item label="所在省份">
                    <el-select v-model="searchParams.provinceDm" placeholder="请选择">
                        <el-option
                                v-for="item in provinces"
                                :key="item.CODE"
                                :label="item.CAPTION"
                                :value="item.CODE">
                        </el-option>
                    </el-select>
<!--                    <el-input v-model="searchParams.provinceDm"></el-input>-->
                </el-form-item>
                <el-form-item label="先导区级别">
                    <el-select v-model="searchParams.pilotLevelDm" placeholder="请选择">
                        <el-option
                                v-for="item in pilotLevels"
                                :key="item.CODE"
                                :label="item.CAPTION"
                                :value="item.CODE">
                        </el-option>
                    </el-select>
<!--                    <el-input v-model="searchParams.pilotLevelDm"></el-input>-->
                </el-form-item>
<!--                <el-form-item label="日期">-->
<!--                    <el-date-picker-->
<!--                        prefix-icon="el-icon-date"-->
<!--                        v-model="searchParams.startDate"-->
<!--                        type="date"-->
<!--                        :clearable="false"-->
<!--                        class="date-picker-155"-->
<!--                        placeholder="选择起始日期"-->
<!--                        value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                    <span class="range">至</span>-->
<!--                    <el-date-picker-->
<!--                        prefix-icon="el-icon-date"-->
<!--                        v-model="searchParams.endDate"-->
<!--                        type="date"-->
<!--                        :clearable="false"-->
<!--                        class="date-picker-155"-->
<!--                        placeholder="选择结束日期"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        :picker-options="controlTime1">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
            </template>
        </screenFilter>
        <tableList ref="table"
           selection
           index
           style="border-top: none;text-align: center"
           :getDataWay="getDataWay"
           :columns="columns"
           :pagination = "pagination"
           :checkedData.sync='checkedData'>
            <el-table-column label="先导区名称" slot="pilotAreaName" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="false" @click="selectXdq(scope.row)" class="a-link">
                        {{scope.row.pilotAreaName}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>
    </div>
</template>

<script>
    import TableList from "../../components/grid/TableList";
    import toolbar from "@/components/toolbar/myToolbar";
    import createbar from "@/views/xdqgl/myToolbar/xdqxxtbCreOperation";
    import _ from 'lodash'

    export default {
        name: "xdqxxtb",
        components: {
            TableList,
            toolbar,
            createbar
        },
        data() {
            return {
                searchTip: '',
                // 字典表数据
                provinces: [],
                pilotLevels: [],
                //查询时需获取页面数据
                searchParams:{
                    pilotAreaName:'',
                    pilotLevelDm:'',
                    provinceDm:'',
                    startDate:'',
                    endDate:''
                },
                createDialogVisible: false,
                checkedData: [], //全选框
                //工具栏
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
                    },
                    /*{
                        type:"primary",
                        title:"搜索",
                        icon:"el-icon-search",
                        disabled:false,
                        click:"search"
                    },*/
                ],
                //分页
                pagination: {
                    currentPage: 1,
                    position: 'center',
                    pageSizes: [10, 50, 100],//默认每页显示多少条
                    layout: 'sizes ,prev, pager, next, jumper'
                },
                //表单字段
                columns: [
                    {
                        label: '先导区名称',
                        prop: 'pilotAreaName',
                        template: true
                    },{
                        label: '先导区级别',
                        prop: 'pilotLevelName'
                    },{
                        label: '所在省份',
                        prop: 'provinceName'
                    },{
                        label: '发布人',
                        prop: 'createUserName'
                    },{
                        label: '批准机关',
                        prop: 'approvalOrg'
                    },{
                        label: '发布时间',
                        prop: 'createTime',
                        formatter(row) {
                            return new Date(row.createTime).Format("yyyy-MM-dd hh:mm:ss")
                        },
                    }
                ],
                //调用组件传输返回页面数据
                getDataWay:{
                    dataType:"url",
                    data: this.$api.xdqglApi.pilotAreaQuery,
                    param: {}
                },
                controlTime1: {

                },
            }
        },
        methods: {
            initData() {
                const that = this
                // 请求省份码表
                this.$$request({
                    method: 'post',
                    url: that.$api.getCodeData,
                    data: {
                        tableName : "DM_PROVINCE"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.provinces = res.info
                        // that.$refs.createbar.provinces = res.info
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员111！", {})
                    return false
                })
                // 请求先导区级别码表
                this.$$request({
                    method: 'post',
                    url: that.$api.getCodeData,
                    data: {
                        tableName : "DM_PILOT_LEVEL"
                    }
                }).then(function (res) {
                    if (res.result === 1) {
                        that.pilotLevels = res.info
                        // that.$refs.createbar.pilotLevels = res.info
                    }else {
                        that.$alert(res.msg, "系统异常，请联系管理员！", {})
                        return false
                    }
                }).catch(function (error) {
                    that.$alert(error, "系统异常，请联系管理员333！", {})
                    return false
                })
            },
            //点击工具栏跳转
            toolbarClick(item,event) {
                const that = this;
                if (item.title == '新建') {
                    /*新建初始化*/
                    that.createDialogVisible = true
                    // that.$refs.createbar.createDialogVisible = true
                    that.$nextTick(() => {
                        that.$refs.createbar.init()
                    })
                }
                if(item.title == '修改'){
                    /*修改初始化*/
                    if(this.checkedData.length === 0 || this.checkedData.length > 1){
                        this.$alert('请选择一条数据进行修改！', '提示',{
                            type: 'warning'
                        })
                    }else if(this.checkedData.editFlag===0){
                        this.$alert('当前登录人不具有修改权限！', '提示', {
                            type: 'warning'
                        })
                    }else{
                        if (this.checkedData[0].state > 0) {
                            this.$alert('审核中或已发布的无法修改！', '提示',{
                                type: 'warning'
                            })
                            return false
                        }

                        that.createDialogVisible = true
                        // that.$refs.createbar.createDialogVisible = true
                        that.$nextTick(() => {
                            that.$refs.createbar.init(this.checkedData[0].uuid)
                            that.$refs.createbar.$forceUpdate()
                        })
                    }
                }
                if(item.title=='删除'){
                    /*that.dialogVisible = true
                    that.$nextTick(() => {
                        that.$refs.delFunc.delete()
                    })*/
                    if(this.checkedData == ''){
                        this.$alert('请选择至少一条数据进行删除！', '提示',{
                            type: 'warning'
                        })
                    }else {
                        for (let i=0; i<this.checkedData.length; i++) {
                            if (this.checkedData[i].state > 0) {
                                this.$alert('审核中或已发布的无法删除！', '提示',{
                                    type: 'warning'
                                })
                                return false
                            }
                            if(this.checkedData.editFlag===0){
                                this.$alert('当前登录人不具有修改权限！', '提示', {
                                    type: 'warning'
                                })
                                return false
                            }
                        }

                        let ids = ''
                        this.checkedData.forEach((item, index)=>{
                            ids += item.uuid + ','
                            if (index == this.checkedData.length-1) {
                                ids = ids.substr(0,ids.length - 1)
                            }
                        })
                        that.$confirm('确认删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$$request({
                                method: 'post',
                                url: this.$api.xdqglApi.pilotAreaDelete,
                                data: {
                                    uuid: ids
                                }
                            }).then(function (res) {
                                if (res.result === 1) {
                                    that.$message({
                                        message: res.msg,
                                        type: 'success'
                                    })
                                    that.xdqxxtbForm = res.info
                                    that.$refs.table.loadData()
                                    that.checkedData = []
                                } else {
                                    that.$message({
                                        type: 'warning',
                                        message: '删除失败!'
                                    });
                                    return false
                                }
                            }).catch(function (error) {
                                that.$message({
                                    type: 'info',
                                    message: '删除失败!'
                                })
                                return false
                            })
                        })
                    }
                }
                if(item.title=='搜索'){
                    // window.console.log(...this.searchParams)
                    that.loadData(that.searchParams)
                }
            },
            loadData(searchParams) {
                this.$refs.table.loadData(searchParams)
                this.checkedData = []
            },
            displayDialog(showOrHide) {
                this.createDialogVisible = showOrHide
            },
            //点击标题跳转页面方法
            selectXdq(data) {
                this.$router.push({
                    name: "xdqDetail",
                    query: {
                        uuid: data.uuid,
                        moduleCode: 'xdq',
                        readOnly:'2'
                    }
                })
            },
            /*//查询
            searchBtn() {
                const that = this;
                let param = {
                    pilotAreaName: that.searchParams.pilotAreaName,
                }
                that.$set(that.getDataWay.params = param);
                that.$refs.table.loadData(param);
            },
        },*/
            //查询---防抖函数，限制后台访问频率
            searchBtn: _.debounce(function () {
                const that = this;
                if (this.searchParams.pilotAreaName.indexOf('?') === -1) {
                    this.searchTip = ''
                }
                let param = {
                    pilotAreaName: that.searchParams.pilotAreaName,
                }
                that.$set(that.getDataWay.params = param);
                that.$refs.table.loadData(param);
            }, 500),
        },
        watch: {
            'searchParams.title': {
                handler(newParams, oldParams) {
                    this.searchTip = '正在输入...'
                },
                deep: true,
                immediate: true
            },
        },
        mounted() {
            this.initData()
        },
        created(){
            this.searchTip = '' //首次进入清除提示
        }
    }
</script>

<style lang="less">
    .rightMain {
        margin: 10px auto;
        width: 93%;
        /*margin-right: 90px;
        align:0 auto;
        padding-left: 10px;
        padding-top: 20px;
        min-width: 150px;*/
    }

    /deep/ div.screenFilter {
        overflow-y: hidden;
    }
</style>
