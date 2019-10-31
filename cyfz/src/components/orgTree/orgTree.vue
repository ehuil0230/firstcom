<template>
    <el-tree :class="options.class"
             :ref="options.ref"
             :lazy="lazy"
             :load="loadNode"
             :data="orgTree"
             :props="options.props"
             :indent="options.indent"
             :node-key="options.nodeKey"
             :expand-on-click-node="options.expandOnClickNode"
             :check-on-click-node="options.checkOnClickNode"
             :highlight-current="options.highlightCurrent"
             :icon-class="options.iconClass"
             :current-node-key="options.currrentNodeKey"
             :default-expanded-keys="options.defaultExpandedKeys"
             @current-change="currentChange">
        <span class="org_tree_node" slot-scope="{ node, data }">
            <i :class="[node.icon?node.icon:'el-icon-notebook-2', 'org_tree_node_icon']"></i>
            <span>{{node.label}}</span>
        </span>
    </el-tree>
</template>

<script>

    export default {
        name: "deptTree",
        props: {
            treeProps: {
                type: Object,
                default: () => {
                    return {
                        label: "label"
                    }
                }
            },
            nodeKey: {
                type: String,
                default: "id"
            },
            lazy: {
                type: Boolean,
                default: false
            },
            pctrl: {
                type: String,
                default: '/qxgl-center/Qxgl002OrgCtrl/queryOrgTreeBySjorgId'
            }
        },
        data() {
            return {
                orgTree: [],
                searchText: "",
                CurrentNode: []
            }
        },
        /*假数据第一节点选中----白昱----start*/
        updated() {
            if(this.orgTree[0].code){
                this.$refs[this.options.ref].setCurrentKey(this.orgTree[0].code)
                this.$emit("currentChange",this.orgTree[0].code, this.orgTree[0].caption);
            }
        },
        /*假数据第一节点选中----白昱----end*/
        methods: {
            currentChange(data, node) {
                this.$emit("currentChange", data[this.options.nodeKey], data.caption);
            },
            loadNode(node, resolve) {
                let code = node.data[this.nodeKey]
                this.CurrentNode = node;
                this.$axios({
                    method: 'post',
                    // url: '/qxgl-center/Qxgl002OrgCtrl/queryOrgTreeBySjorgId',
                    url: this.pctrl,
                    data: {
                        code: code
                    }
                }).then(function (res) {
                    console.log(res.info)
                    resolve(res.info)
                    return res.info;
                }).then((info) => {
                    /*懒加载节点展开，第一节点选中----白昱----start*/
                    if (node.level === 0) {
                        for (let i = 0; i < info.length; i++) {
                            let mynode = node.childNodes[i];
                            mynode.expanded = true;
                            this.$refs["org_tree"].updateKeyChildren(info[i].code, info[i].children)
                        }
                        this.$refs["org_tree"].setCurrentKey(info[0].code)
                        this.$emit("currentChange", info[0].code, info[0].caption);
                    }
                    /*懒加载节点展开，第一节点选中----白昱----end*/
                }).catch(function (error) {
                    window.console.log(error);
                });
            },
            updateNode(key, data) {
                let options = this.options
                let nodeKey = options.nodeKey
                let label = options.props.label
                let ref = options.ref
                let tree = this.$refs[ref]
                if (tree) {
                    let node = tree.getNode({
                        code: key
                    })
                    let childrenNodes = node.childNodes
                    let children = []
                    let id = data[nodeKey]
                    let newFlag = true
                    childrenNodes.forEach((item) => {
                        let tId = item.data[nodeKey]
                        if (id == tId) {
                            item.data[label] = data[label]
                            newFlag = false
                        }
                        children.push(item.data)
                    })
                    if (newFlag) {
                        children.push(data)
                    }
                    tree.updateKeyChildren(key, children)
                    tree.store.nodesMap[key].expanded = true;
                    this.expandParent(node.parent)
                }
            },
            expandParent(node) {
                let ref = this.options.ref
                let tree = this.$refs[ref]
                if (node) {
                    let id = node.data[this.options.nodeKey]
                    tree.store.nodesMap[id].expanded = true;
                }
            },
            setCurrentKey(key) {
                let ref = this.options.ref
                let tree = this.$refs[ref]
                tree.setCurrentKey(key)
            }
        }, computed: {
            options() {
                let currentNodeKey = ""
                if (this.orgTree.length > 0) {
                    currentNodeKey = this.orgTree[0].code
                }

                return {
                    class: "org_tree",
                    ref: "org_tree",
                    indent: 12,
                    nodeKey: this.nodeKey,
                    props: this.treeProps,
                    expandOnClickNode: false,
                    checkOnClickNode: true,
                    highlightCurrent: true,
                    iconClass: "el-icon-arrow-right",
                    currrentNodeKey: currentNodeKey,
                    defaultExpandedKeys: [currentNodeKey]
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    /*部门树样式*/
    .org_main_container {
        height: 100%;
        font-size: 12px !important;
    }

    .org_main_container > .el-aside {
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, .12);
    }

    .org_container {
        background-color: @bgWhite;
        height: 100%;
        overflow: hidden;
    }

    .org_container > .el-main {
        height: 200px;
        padding: 0px;
        padding-left: 14px;
        overflow-y: scroll;
        margin-right: -17px;
        padding-right: 17px;
    }

    .org_tree {
    }

    .org_tree_node_icon {
        color: @themeColor;
        margin-right: 5px;
    }

    /*深度选择器"/deep/"*/
    .org_tree /deep/ .el-tree-node__content:hover {
        background-color: transparent;
        color: @themeColor;
    }

    .org_tree .org_tree_node > span {
        padding: 3px 4px;
    }

    .org_tree /deep/ .el-tree-node:focus > .el-tree-node__content {
        background-color: transparent;
    }

    .org_tree.el-tree--highlight-current /deep/ .el-tree-node.is-current > .el-tree-node__content {
        background-color: transparent;
    }

    .org_tree.el-tree--highlight-current /deep/ .el-tree-node.is-current > .el-tree-node__content > .org_tree_node > span {
        background-color: @themeColor;
        color: @bgWhite;
    }

    .tree_title {
        font-size: 12px;
        color: @textColor2;
        line-height: 32px;
        margin-top: 20px;
    }

    .tree_title > i {
        font-size: 21px;
        margin-right: 5px;
        vertical-align: middle;
    }

    /deep/ .search_input {
        margin: 20px 0px;
    }

    /deep/ .search_input .el-input__inner {
        height: 32px;
        line-height: 32px;
    }

    /deep/ .search_input .el-input__icon {
        line-height: 32px;
    }

    .org_main_container > .el-main {
        padding: 0px;
        width: 20px;
        display: flex;
        align-items: center;
    }

    .tree_toggle {
        width: 16px;
        height: 60px;
        background: #B5B5B5;
        border-radius: 0 100px 100px 0;
        cursor: pointer;
        font-size: 16px;
        line-height: 60px;
        color: @bgWhite;
    }

</style>
