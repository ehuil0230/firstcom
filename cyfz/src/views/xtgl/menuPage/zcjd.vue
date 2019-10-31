<template>
    <div class="rightMain">
        <!--工具栏-->
        <toolbar position=top :toolbarItem="toolbarItem" @toolbarClick="toolbarClick" center></toolbar>
        <!--工具栏-新建-->
        <createbar key="zcjd" v-if="xjDialogVisible" :dialogData="dialogData" :taVisible="xjDialogVisible"
                   @refreshTable="refreshTable($event)"></createbar>
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
                    <el-select  v-model="searchParams.createOrg" placeholder="请选择所属方向">
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
        <tableList ref="table"
                   selection
                   index
                   style="border-top: none;text-align: center"
                   :getDataWay="getDataWay"
                   :columns="columns"
                   :pagination="pagination"
                   :checkedData='checkedData'
        >
            <el-table-column label="标题" slot="title" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="false" @click="selectGg(scope.row)" class="a-link">
                        {{scope.row.title}}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="是否置顶" slot="isTop" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span  v-if="scope.row.isTop=='1'">置顶</span>
                </template>
            </el-table-column>
        </tableList>
    </div>
</template>
<script>
    import TableList from "../../../components/grid/TableList";
    import toolbar from "@/components/toolbar/myToolbar";
    import createbar from "@/views/xtgl/myToolbar/tzggCreOperation";
    import _ from 'lodash'
    export default {
        name: "jbdw",
        components: {
            TableList,
            toolbar,
            createbar
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
                    createOrg:'',
                    timeStamp: [],
                },
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
                        width: '180',
                        showOverflowTooltip: true,
                        template: true
                    },
                    {
                        label: '提交人',
                        prop: 'createUserName',
                    },
                    {
                        label: '提交部门',
                        prop: 'createOrgName',
                    },
                    {
                        label: '提交时间',
                        prop: 'createTime',
                        formatter(row) {
                            return new Date(row.createTime).Format("yyyy-MM-dd hh:mm:ss")
                        },
                    },
                    {
                        label: '状态',
                        prop: 'stateName',
                        formatter: (row) => {
                            return this.getCaption(row.state)
                        }
                    },
                    {
                        label:'是否置顶',
                        prop:'isTop',
                        template: true
                    }
                ],
                //调用组件传输返回页面数据
                getDataWay: {dataType: "url", data: this.$api.xtglApi.xtglTzggQuery, type: "post",param:{proclamationDm:'0003'}},
            }
        },
        methods: {
            //查询时间处理
            timeSet(timeStamp){
                if(timeStamp[0] !== '' && timeStamp[1] !== ''){
                    this.searchParams.createTimeStart = timeStamp[0]
                    this.searchParams.createTimeEnd = timeStamp[1]
                }
            },
            //状态初始化
            getCaption(data){
                if(data <= 1){
                    return '未发布'
                }else if(data > 1 && data < 9){
                    return '审核中'
                }else if(data == 9){
                    return '已发布'
                }
            },
            refreshTable(refresh) {
                this.xjDialogVisible = false
                if (refresh == true) {
                    this.checkedData = []
                    this.$refs.table.loadData()
                }
            },
            //点击工具栏跳转
            toolbarClick(item, event) {
                const that = this;
                if (item.title == '新建') {
                    this.dialogData = {}
                    that.dialogData.showTip = true;
                    that.dialogData.allowUpload = false;
                    that.dialogData.fromType='0003';
                    that.dialogData.spType = '010003';
                    this.xjDialogVisible = true
                }
                if (item.title == '修改') {
                    if (this.checkedData.length == 1) {
                        if (this.checkedData[0].state > 1 && this.checkedData[0].state < 9) {
                            this.$alert('审核状态中无法修改！', '提示', {
                                type: 'warning'
                            })
                        } else if(this.checkedData[0].state == 9){
                            this.$alert('已发布内容无法修改！', '提示', {
                                type: 'warning'
                            })
                        } else if(this.checkedData.editFlag===0){
                            this.$alert('当前登录人不具有修改权限！', '提示', {
                                type: 'warning'
                            })
                        } else {
                            that.dialogData = this.checkedData[0]
                            that.dialogData.showTip = false;
                            that.dialogData.allowUpload = true;
                            that.dialogData.fromType = '0003';
                            that.dialogData.spType = '010003';
                            this.xjDialogVisible = true
                        }
                    } else {
                        this.checkedData = []
                        this.$refs.table.loadData()
                        this.$alert('请选中一条数据进行更新!', '提示', {
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
                                }else if(this.checkedData.editFlag===0){
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
                        moduleCode: 'zcjd',
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
            const that = this
            this.$$request({
                method: 'post',
                url: this.$api.xtglApi.xtglGetOrgList,
                data:{},
            }).then(function (res) {
                that.createOrgNameList = res.info;
            })
        },
        created() {
            this.searchTip = '' //首次进入清除提示
            /*var that = this
            this.$$request({
                url: "http://mockjs.com/api/zcjd",
                data: {type: 'top', key: '123456'}
            }).then(function (res) {
                that.getDataWay.data = res.info.list  //查询请求
                that.$refs.table.loadData()  //数据加载
            })*/
        }
        //加载页面前获取Mock数据
    }
</script>
<style scoped>
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