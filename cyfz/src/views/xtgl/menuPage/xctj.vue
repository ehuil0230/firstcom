<template>
    <div class="rightMain">
        <!--工具栏-->
        <toolbar position=top :toolbarItem="toolbarItem" @toolbarClick="toolbarClick" center></toolbar>
        <!--工具栏-新建-->
        <creOperation key="xctj" v-if="xjDialogVisible" :dialogData="dialogData" :checkedData="checkedData"
                      @refreshTable="refreshTable($event)"
                      :taVisible="xjDialogVisible" :uuids="uuids"></creOperation>
        <screenFilter :searchParams="searchParams">
            <template slot="slot_two">
                <span style="font-size:8px;margin-right:14px;color: #B2B7B7;">{{searchTip}}</span>
                <el-input class="search-name" size="small" v-model="searchParams.comName" placeholder="请输入单位名称"
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
                <el-form-item label="所属方向">
                    <el-select v-model="searchParams.claimDirectionDm" placeholder="请选择所属方向">
                        <el-option
                                v-for="item in claimDirectionDm"
                                :key="item.CODE"
                                :label="item.CAPTION"
                                :value="item.CODE">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="产品与服务">
                    <el-input v-model="searchParams.productService"></el-input>
                </el-form-item>-->
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
            <el-table-column label="推荐重点单位名称" slot="comName" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :underline="false" @click="selectGg(scope.row)" class="a-link">
                        {{scope.row.comName}}
                    </el-link>
                </template>
            </el-table-column>
        </tableList>
    </div>
</template>
<script>
    import TableList from "../../../components/grid/TableList";
    import toolbar from "@/components/toolbar/myToolbar";
    import creOperation from "@/views/xtgl/myToolbar/creOperation";
    import _ from 'lodash'
    //import delOperation from "@/views/xtgl/myToolbar/delOperation";
    export default {
        name: "xctj",
        components: {
            TableList,
            toolbar,
            creOperation,
        },
        data() {
            return {
                searchTip:'',
                stateList: [
                    {
                        caption: '未发布',
                        value: '0',
                    },
                    {
                        caption: '审核中',
                        value: '2',
                        formatter: (row) => {
                            return this.getState(row.value)
                        }
                    },
                    {
                        value: '9',
                        caption: '已发布',
                    },
                ],
                xjDialogVisible: false,
                dialogData: {},
                checkedData: [],
                uuids: [],
                direct: [],
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
                    /*{
                        type: "primary",
                        title: "发布",
                        icon: "el-icon-thumb",
                        disabled: false,
                        click: "release"
                    },*/
                    {
                        type: "primary",
                        title: "删除",
                        icon: "el-icon-delete",
                        disabled: false,
                        click: "delete"
                    },
                ],
                //查询
                claimDirectionDm: [],
                searchParams: {
                    comName: '',
                    claimDirectionName: '',
                    productService: '',
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
                        label: '推荐重点单位名称',
                        prop: 'comName',
                        width: '180',
                        showOverflowTooltip: true,
                        template: true
                    },
                    {
                        label: '所属方向',
                        prop: 'claimDirectionName',
                    },
                    {
                        label: '揭榜产品与服务',
                        prop: 'productService',
                    },
                    {
                        label: '发布状态',
                        prop: 'state',
                        formatter: (row) => {
                            return this.getCaption(row.state)
                        }
                    },
                ],
                //调用组件传输返回页面数据
                getDataWay: {
                    dataType: "url",
                    data:
                    this.$api.xtglApi.xtglXctjQuery,
                    type: "post",
                    param: {
                        proclamationDm: '0007',
                        "tableName": "DM_AREA_DIRECTION",
                    }
                },
            }
        },
        methods: {
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
            refreshTable(refresh) {
                this.xjDialogVisible = false
                if (refresh == true) {
                    this.checkedData = []
                    this.$refs.table.loadData()
                }
            },
            initCodeData() {
                const that = this
                return new Promise(((resolve, reject) => {
                    this.$$request({
                        method: 'post',
                        url: this.$api.getCodeData,
                        data: {
                            tableName: "DM_CLAIM_DIRECTION"
                        }
                    }).then((res) => {
                        if (res.result === 1) {
                            resolve(res.info)
                        } else {
                            that.$alert(res.msg, "系统异常，请联系管理员！", {})
                            return false
                        }
                    }).catch(function (error) {
                        reject(error)
                    })
                }))
            },
            //点击工具栏跳转
            toolbarClick(item, event) {
                const that = this;
                if (item.title == '新建') {
                    this.dialogData = {}
                    // 加载下拉框字典数据
                    this.initCodeData().then(res => {
                        that.dialogData.Dm = res;
                        this.searchDm = res;
                        that.dialogData.fromType = '0007';
                        that.dialogData.spType = '010008';
                        this.xjDialogVisible = true
                    })
                }
                if (item.title == '修改') {
                    if (this.checkedData.length == 1) {
                        if (this.checkedData[0].state > 1 && this.checkedData[0].state < 9) {
                            this.$alert('审核状态中无法修改！', '提示', {
                                type: 'warning'
                            })
                        } else if (this.checkedData[0].state == 9) {
                            this.$alert('已发布内容无法修改！', '提示', {
                                type: 'warning'
                            })
                        } else if(this.checkedData.editFlag===0){
                            this.$alert('当前登录人不具有修改权限！', '提示', {
                                type: 'warning'
                            })
                        } else {
                            this.initCodeData().then(res => {
                                that.dialogData = this.checkedData[0]
                                that.dialogData.Dm = res;
                                that.dialogData.fromType = '0007';
                                that.dialogData.spType = '010008';
                                this.xjDialogVisible = true
                            })
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
                                    url: that.$api.xtglApi.xtglXctjDelete,
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
                    name: "xctjDetail",
                    query: {
                        uuid: data.uuid,
                        moduleCode: 'xctj',
                    }
                })
            },
            //查询---防抖函数，限制后台访问频率
            searchBtn: _.debounce(function () {
                const that = this;
                if (this.searchParams.comName.indexOf('?') === -1) {
                    this.searchTip = ''
                }
                let param = {
                    comName: that.searchParams.comName,
                    /*claimDirectionName: that.searchParams.claimDirectionName,
                    productService: that.searchParams.productService,*/
                }
                that.$set(that.getDataWay.params = param);
                that.$refs.table.loadData(param);
            }, 500),
        },
        watch: {
            'searchParams.comName': {
                handler(newParams, oldParams) {
                    this.searchTip = '正在输入...'
                    // this.searchTip = this.searchTipControl()
                    //this.debouncedGetSearch()
                },
                deep: true,
                immediate: true
            },
        },
        //获取查询部门列表
        mounted() {
            const that = this
            this.$$request({
                url: this.$api.getCodeData,
                data: {
                    tableName: "DM_CLAIM_DIRECTION"
                }
            }).then(function (res) {
                that.claimDirectionDm = res.info;
            })
        },
        created() {
            this.searchTip = '' //首次进入清除提示
            //码表字段转换
            /*this.initCodeData().then(res => {
                for(let i =0;i++;i<res.info.length){
                }
                this.res.forEach(item => {
                   this.direct.push(item.CAPTION)
                })
                return this.direct
            })*/
        }
        //加载页面前获取Mock数据
        /*var that = this
        this.$$request({
            url: "http://mockjs.com/api/xctj",
            data: {type: 'top', key: '123456'}
        }).then(function (res) {
            that.getDataWay.data = res.info.list  //查询请求
            that.$refs.table.loadData()  //数据加载
        })*/
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