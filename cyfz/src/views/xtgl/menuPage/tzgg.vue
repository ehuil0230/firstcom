<template>
    <div class="rightMain">
        <!--工具栏-->
        <toolbar position=top :toolbarItem="toolbarItem" @toolbarClick="toolbarClick" center></toolbar>
        <!--工具栏-新建-->
        <createbar key="tzgg" v-if="xjDialogVisible" :dialogData="dialogData" :taVisible="xjDialogVisible"
                   @refreshTable="refreshTable($event)"></createbar>
        <!--工具栏-搜索-->
        <screenFilter :searchParams="searchParams">
            <template slot="slot_two">
                <span style="font-size:8px;margin-right:14px;color: #B2B7B7;">{{searchTip}}</span>
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
                <el-form-item label="发布部门">
                    <el-select v-model="searchParams.createOrg" placeholder="请选择所属方向">
                        <el-option
                                v-for="item in createOrgNameList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <div class="block">
                        <el-date-picker style="width:384px"
                                        v-model="searchParams.timeStamp"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        @change="timeSet"
                        >
                        </el-date-picker>
                    </div>
                </el-form-item>
            </template>
        </screenFilter>
        <div class="myTableStyle" style="width:100%">
            <tableList ref="table"
                       selection
                       index
                       style="border-top: none;text-align: center"
                       :getDataWay="getDataWay"
                       :columns="columns"
                       :pagination="pagination"
                       :checkedData='checkedData'
            >
                <el-table-column label="标题" slot="title" show-overflow-tooltip width="227">
                    <template slot-scope="scope">
                        <!--<i class="el-icon-edit-outline" v-if="scope.row.editFlag===1&&scope.row.state===0"></i>-->
                        <el-link :underline="false" @click="selectGg(scope.row)" class="a-link">
                            <i class="fa fa-free-code-camp" v-if="scope.row.isTop=='Y'" style="color:red"></i>
                            {{scope.row.title}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" slot="name">
                    <template v-slot="scope">
                        <img src="https://www.baidu.com/img/bd_logo.png" width="15" height="15">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column label="是否置顶" slot="isTop" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.isTop=='1'">置顶</span>
                    </template>
                </el-table-column>
            </tableList>
        </div>
    </div>
</template>
<!--<script src="../../../views/xtgl/myStore/lodash.min.js"></script>-->
<script>
    import TableList from "../../../components/grid/TableList";
    import toolbar from "@/components/toolbar/myToolbar";
    import createbar from "@/views/xtgl/myToolbar/tzggCreOperation";
    import _ from 'lodash'

    export default {
        name: "tzgg",
        components: {
            TableList,
            toolbar,
            createbar,

        },
        data() {
            return {
                searchTip: '',
                createOrgNameList: [],//查询页部门列表
                stateList: [
                    {
                        caption: '未发布',
                        value: 0,
                    },
                    {
                        caption: '审核中',
                        value: 2,
                        formatter: (row) => {
                            return this.getState(row.value)
                        }
                    },
                    {
                        value: 9,
                        caption: '已发布',
                    },
                ],
                xjDialogVisible: false,
                dialogData: {},
                checkedData: [], //全选框
                uuids: [],
                //工具栏
                toolbarItem: [
                    {
                        type: "primary",
                        title: "新建",
                        icon: "el-icon-edit-outline",
                        disabled: false,
                        click: "create"
                    },
                    {
                        type: "primary",
                        title: "修改",
                        icon: "el-icon-edit",
                        disabled: false,
                        click: "update"
                    },
                    {
                        type: "primary",
                        title: "删除",
                        icon: "el-icon-delete",
                        disabled: false,
                        click: "delete"
                    },
                ],
                //查询
                searchParams: {
                    title: '',
                    createUserName: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    state: '',
                    createOrg: '',
                    timeStamp: [],
                },
                /*
                    createTimeStart: '',
                    createTimeEnd: '',
                    state: '',
                */
                /*timeOptions: {
                    shortcuts: [{
                        onClick(picker) {
                           /!* const end = new Date();
                            const start = new Date();
                            this.searchParams.createTimeStart = start.getTime()
                            this.searchParams.createTimeEnd = end.getTime()
                            picker.$emit('pick', [this.searchParams.createTimeStart, this.searchParams.createTimeEnd]);*!/
                            this.searchParams.createTimeStart = this.timeStamp[0]
                            this.searchParams.createTimeEnd = this.timeStamp[1]
                            picker.$emit('pick', [this.searchParams.createTimeStart, this.searchParams.createTimeEnd]);
                        }
                    }]
            },*/
                /* disabledDate: createTimeStart => {
                     if (this.timeStamp[0] !== '') {
                         this.searchParams.createTimeStart = this.timeStamp[0];
                     }
                     return createTimeStart
                 },
             },
             endTimeOptions: {
                 disabledDate: createTimeEnd => {
                     if(this.timeStamp[1] !== '') {
                         this.searchParams.createTimeEnd = this.timeStamp[1];
                     }
                     return createTimeEnd
                 }
             },*/
                //分页
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'center',
                    pageSizes: [10, 50, 100],//默认每页显示多少条
                    layout: 'sizes ,prev, pager, next, jumper'
                },
                //表单字段
                columns: [
                    {
                        label: '标题',
                        prop: 'title',
                        width: 227,
                        showOverflowTooltip: true,
                        template: true
                    },
                    {
                        label: '发布人',
                        prop: 'createUserName',
                        width: 64,
                    },
                    {
                        label: '发布部门',
                        prop: 'createOrgName',
                        width: 132,
                    },
                    {
                        label: '发布日期',
                        prop: 'createTime',
                        width: 173,
                        formatter(row) {
                            return new Date(row.createTime).Format("yyyy-MM-dd hh:mm:ss")
                        },
                    },
                    {
                        label: '发布状态',
                        prop: 'state',
                        width: 78,
                        formatter: (row) => {
                            return this.getCaption(row.state)
                        }
                    },
                    {
                        label: '是否置顶',
                        prop: 'isTop',
                        width: 91,
                        template: true
                    }
                ],
                //调用组件传输返回页面数据
                getDataWay: {
                    dataType: "url",
                    data: this.$api.xtglApi.xtglTzggQuery,
                    type: "post",
                    param: {proclamationDm: '0001'},
                },
            }
        },
        methods: {
            //查询时间处理
            timeSet(timeStamp) {
                if (timeStamp[0] !== '' && timeStamp[1] !== '') {
                    this.searchParams.createTimeStart = timeStamp[0]
                    this.searchParams.createTimeEnd = timeStamp[1]
                }
            },
            //状态初始化
            getCaption(data) {
                if (data <= 1) {
                    return '未发布'
                } else if (data > 1 && data < 9) {
                    //this.tableList.selection.columns.disabled = false
                    return '审核中'
                } else if (data == 9) {
                    return '已发布'
                }
            },
            //弹窗初始化
            dialogInit() {
                this.xjDialogVisible = true
            },
            //页面刷新
            refreshTable(refresh) {
                this.xjDialogVisible = false
                if (refresh == true) {
                    this.checkedData = [];
                    this.$refs.table.loadData()
                }
            },
            //点击工具栏跳转
            toolbarClick(item, event) {
                const that = this;
                if (item.title == '新建') {
                    this.dialogData = {};
                    that.dialogData.showTip = true;
                    that.dialogData.allowUpload = false;
                    this.xjDialogVisible = true;
                    that.dialogData.fromType = '0001';
                    that.dialogData.spType = '010001';
                }
                if (item.title == '修改') {
                    /*修改初始化*/
                    if (this.checkedData.length == 1) {
                        if (this.checkedData[0].state > 1 && this.checkedData[0].state < 9) {
                            this.$alert('审核状态中无法修改！', '提示', {
                                type: 'warning'
                            })
                        } else if (this.checkedData[0].state == 9) {
                            this.$alert('已发布内容无法修改！', '提示', {
                                type: 'warning'
                            })
                        } else if (this.checkedData.editFlag === 0) {
                            this.$alert('当前登录人不具有修改权限！', '提示', {
                                type: 'warning'
                            })
                        } else {
                            that.dialogData = this.checkedData[0];
                            that.dialogData.showTip = false;
                            that.dialogData.allowUpload = true;
                            that.dialogData.fromType = '0001';
                            that.dialogData.spType = '010001';
                            this.xjDialogVisible = true;
                        }
                    } else {
                        this.checkedData = []
                        this.$refs.table.loadData()
                        this.$alert('请选中一条数据进行修改！', '提示', {
                            type: 'error'
                        })
                    }
                }
                if (item.title == '删除') {
                    if (that.checkedData.length < 1) {
                        that.$alert('请选择至少一条数据进行删除！', '提示', {
                            type: 'warning'
                        })
                    } else if (that.checkedData.length >= 1) {
                        let isDel = true
                        if (isDel) {
                            this.checkedData.forEach((item) => {
                                if (item.state > 1 && item.state < 9) {
                                    this.$alert('审核状态中无法删除！', '提示', {
                                        type: 'warning'
                                    })
                                    isDel = false
                                } else if (item.state == 9) {
                                    this.$alert('已发布内容无法删除！', '提示', {
                                        type: 'warning'
                                    })
                                    isDel = false
                                } else if (this.checkedData.editFlag === 0) {
                                    this.$alert('当前登录人不具有修改权限！', '提示', {
                                        type: 'warning'
                                    })
                                    isDel = false
                                }
                            })
                        }
                        if (isDel) {
                            let ids = ''
                            this.checkedData.forEach((item) => {
                                ids += (item.uuid + ',')
                            })
                            that.$confirm('确认删除?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                that.$axios({
                                    method: 'post',
                                    url: that.$api.xtglApi.xtglTzggDelete,
                                    data: {
                                        uuid: ids
                                    },
                                }).then(
                                    function (res) {
                                        if (res.result == 1) {
                                            that.$message({
                                                message: res.msg,
                                                type: 'success'
                                            });
                                            that.checkedData = [];
                                            that.$refs.table.loadData()
                                        } else {
                                            that.$message({
                                                type: 'warning',
                                                message: '删除失败!'
                                            });
                                        }
                                    })
                            }).catch(() => {
                            });

                        }

                    }
                }
            },
            //点击标题跳转页面方法
            selectGg(data) {
                this.$router.push({
                    name: "detail",
                    query: {
                        uuid: data.uuid,
                        moduleCode: 'tzgg',
                    }
                })
            },
            //查询---防抖函数，限制后台访问频率
            searchBtn: _.debounce(function () {
                const that = this;
                if (this.searchParams.title.indexOf('?') === -1) {
                    this.searchTip = ''
                }
                let param = {
                    title: that.searchParams.title,
                    createUserName: that.searchParams.createUserName,
                    createOrgName: that.searchParams.createOrgName,
                    createTime: that.searchParams.createTime,
                    stateName: that.searchParams.stateName,
                }
                //that.searchTip = ''
                //that.searchTip = _.capitalize('')
                that.$set(that.getDataWay.params = param);
                that.$refs.table.loadData(param);
            }, 500),
            /*searchTipControl() {
                let tip = ''
                let tipA = '正在输入'
                let tipB = '.'
                tip = tipA + tipB
                window.console(tip)
                if (this.searchTip.valueOf().length < 11) {
                    this.searchTip = setTimeout(
                        function () {
                            this.searchTipControl()
                        }, 1000);
                } else {
                    this.searchTip = '正在输入'
                    this.searchTipControl()
                }
            }*/
        },
        computed: {},
        watch: {
            'searchParams.title': {
                handler(newParams, oldParams) {
                    this.searchTip = '正在输入...'
                    // this.searchTip = this.searchTipControl()
                    //this.debouncedGetSearch()
                },
                deep: true,
                immediate: true
            },
        },
        created() {
            this.searchTip = '' //首次进入清除提示
            //防抖动函数
            //this.debouncedGetSearch = _.debounce(this.searchBtn, 500)
        },
        //获取查询部门列表
        mounted() {
            const that = this
            this.$$request({
                method: 'post',
                url: this.$api.xtglApi.xtglGetOrgList,
                data: {},
            }).then(function (res) {
                that.createOrgNameList = res.info;
            })
        }
    }

    //加载页面前获取Mock数据
    /* created() {
var that = this
this.$$request({
 method:'post',
 url: this.$api.xtglApi.xtglTzggQuery,
 data: this.total
}).then(function (res) {
 that.getDataWay.data = res.info.list  //查询请求
 that.$refs.table.loadData()  //数据加载
})
}*/


</script>
<style scoped>
    /*.screenFilter{
       overflow-x: hidden;
       overflow-y: hidden;
   }*/
    .rightMain {
        margin: 10px auto;
        width: 93%;
        /*margin-right: 90px;
        align:0 auto;
        padding-left: 10px;
        padding-top: 20px;
        min-width: 150px;*/
    }

    .transition-box {
        margin-bottom: 10px;
        width: 100%;
        height: 300px;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
</style>
