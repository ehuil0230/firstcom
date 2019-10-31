<template>
    <div class="orgTreeStyle">
        <div id="institutional_tree">
            <div id="tree_name" class="orgChoose">请选择组织机构</div>
            <el-tree
                    node-key="code"
                    :data="orgTree"
                    :props="leftTreeProps"
                    @node-click="orgNodeClick">
            </el-tree>
        </div>
        <div id="daixuan_tree">
            <div id="daixuan_name" class="orgChoose">
                <span>待选</span>
            </div>
            <div v-if="orgTreeObj.type==='zl' && daixuanData.length!==0" style="height: 328px">
                <ul style="padding-left: 10px">
                    <li>
                        <el-checkbox-group size="mini" v-model="checkedDaixuanData" @change="checkedChange">
                            <el-checkbox v-for="item in daixuanData" @change="isChecked" :label="item" :key="item"
                                         style="margin-left:15px;display:block;">
                                {{item.realName}} <br>
                            </el-checkbox>
                        </el-checkbox-group>
                    </li>
                    <br>
                </ul>
            </div>
            <!--审批人-->
            <div v-if="orgTreeObj.type==='' && daixuanData.length!==0" style="height: 328px">
                <ul style="padding-left: 10px">
                    <li>
                        <el-radio-group v-model="checkedDaixuanData" @change="spCheckedChange">
                            <el-radio v-for="item in daixuanData" :label="item" :key="item"
                                      style="margin-left:15px;display:block;margin-top: 15px;padding-bottom: 10px">
                                {{item.realName}} <br>
                            </el-radio>
                        </el-radio-group>
                    </li>
                    <br>
                </ul>
            </div>
            <div  v-if="daixuanData.length ==0" style="line-height:330px;text-align: center;color: gray" >
                暂无数据
            </div>
            <div class="" style="">
                <!--树形式显示-->
                <!--<el-tree
                        :data="daixuanData"
                        node-key="code"
                        :props="daixuanTreeProps"
                        :show-checkbox="orgTreeObj.type==='zl'"
                        @check-change="checkChange"
                        @node-click="nodeClick">
                </el-tree>-->
                <el-pagination v-if="daixuanData.length !== 0" style="text-align: center"
                               small
                               background
                               @current-change="handleCurrentChange"
                               :current-page="pagination.currentPage"
                               :page-size="pagination.pageSize"
                               :layout="pagination.layout"
                               :total="pagination.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrgTree",
        props: ['orgTreeObj'],
        data() {
            return {
                isMenuPagination: true,  //判断是否从菜单进入
                tempId: '', //分页暂存uuid
                checked: '',
                checkedDaixuanData: [], //已选待选人员
                //分页
                contentList: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 7,
                    position: 'center',
                    layout: 'total ,prev, pager, next',
                    total: '',
                },
                daixuanData: [], //待选数据
                orgTree: [], //接收左侧树列表
                leftTreeProps: {// 左侧树props
                    label: '',
                    children: ''
                },
                daixuanTreeProps: {// 待选树props
                    label: ''
                },
            }
        },
        methods: {
            //分页触发
            handleCurrentChange(val) {
                this.$set(this.pagination, 'currentPage', val);
                //this.pagination.currentPage = val
                let paramOrgId = {
                    uuid: this.tempId,
                };
                this.isMenuPagination = false
                this.orgNodeClick(paramOrgId)
            },
            orgNodeClick(data) {
                let that = this
                this.daixuanData = []
                this.tempId = data.uuid;
                if (that.isMenuPagination == true) {
                    that.pagination.currentPage = 1;
                }
                this.$$request({
                    method: 'post',
                    url: this.$api.homeApi.queryUsersByOrgId,
                    data: {
                        orgId: data.uuid,
                        currentPage: this.pagination.currentPage,
                        pageSize: this.pagination.pageSize,
                    }
                }).then(
                    function (res) {
                        that.daixuanData = res.info.results
                        that.pagination.total = res.info.total
                        that.isMenuPagination = true
                    }
                )
            },
            //树形式展示
            /*nodeClick(data, node) {
                if (node.checked === true) {
                    this.$set(node, 'checked', false);
                } else {
                    this.$set(node, 'checked', true);
                }
                this.$emit("nodeClick", data, node)
            },
            checkChange(data, checked) {
                this.$emit("checkChange", data, checked)
            },*/
            //选中与取消判断
            isChecked(check) {
                this.isChecked = check
            },
            checkedChange(data) {
                const isChecked = this.isChecked
                this.$emit("checkedChange", data, isChecked)
            },
            spCheckedChange(data){
                this.$emit("spCheckedChange", data)
            }
        },
        created() {
            this.leftTreeProps = this.orgTreeObj.leftTreeProps;
            this.daixuanTreeProps = this.orgTreeObj.daixuanTreeProps;
        },
        watch: {
            'orgTreeObj.orgTree': function (newVal) {
                this.orgTree = newVal;
            },
            'orgTreeObj.daixuanData': function (newVal) {
                this.daixuanData = newVal;
            }
        }
    }
</script>

<style scoped lang="less">
    a {
        color: inherit;
    }

    a:hover {
        color: #0066cc;
    }

    .orgTreeStyle #institutional_tree {
        width: 51%
    }

    .orgTreeStyle #daixuan_tree {
        width: 46%
    }

    .orgChoose {
        text-align: center;
    }

    #tree_name, #yixuan_name, #daixuan_name {
        width: 100%;
        height: 8%;
        border-bottom: 1px solid @borderColor2;
        font-size: 14px;
        line-height: 35px;
        background-color: @borderColor2;
    }

    #institutional_tree {
        width: 33%;
        height: 400px;
        float: left;
        border: 1px solid @borderColor2;
        margin-top: 15px;
        overflow: auto;
    }

    #daixuan_tree {
        width: 33%;
        height: 400px;
        float: left;
        border-top: 1px solid @borderColor2;
        border-bottom: 1px solid @borderColor2;
        border-right: 1px solid @borderColor2;
        margin-top: 15px;
    }

    #daixuan_tree .el-tree {
        width: 100%;
        height: 91.3%;
        overflow: auto;
    }

</style>