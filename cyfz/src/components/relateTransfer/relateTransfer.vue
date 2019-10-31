<template>
    <el-transfer
            :data="leftData"
            v-model="rightValue"
            :props="props"
            :titles="titles"
            :button-texts="buttonTexts"
            @change="change"
    >
        <template v-slot="{ option }">
            <slot :option="option"></slot>
        </template>
    </el-transfer>
</template>

<script>
    export default {
        name: "relateTransfer",
        props: {
            data: Array,
            value: Array,
            props: Object,
            titles: {
                type: Array,
                default: () => {
                    return ["待添加", "已添加"]
                }
            },
            buttonTexts: {
                type: Array,
                default: () => {
                    return ["删除", "添加"]
                }
            }
        },
        data() {
            return {
                leftData:[],
                rightValue: []
            }
        },
        watch:{
            data(newVal){
                this.leftData = newVal
            },
            value(newVal){
                this.rightValue = newVal
            }
        },
        methods: {
            change(val, op, arr) {
                let state = this.props.state ? this.props.state : "state"
                let key = this.props.key ? this.props.key : "key"
                let insertList = [] //插入列表
                let deleteList = [] //删除列表
                let cancelInsertList = [] //取消插入列表
                let cancelDeleteList = []  //取消删除列表
                if (state) {
                    if ("left" === op) {
                        arr.forEach((item) => {
                            let obj = this.leftData.find(o => o[key] === item)
                            if (obj) {
                                if (obj[state] == "2") {
                                    obj[state] = "1"
                                    cancelInsertList.push(obj)
                                } else {
                                    obj[state] = "3"
                                    deleteList.push(obj)
                                }
                            }
                        })
                        this.$emit("moveLeft", deleteList, cancelInsertList)
                    } else if ("right" === op) {
                        arr.forEach((item) => {
                            let obj = this.leftData.find(o => o[key] === item)
                            if (obj) {
                                if (obj[state] == "3") {
                                    obj[state] = "1"
                                    cancelDeleteList.push(obj)
                                } else {
                                    obj[state] = "2"
                                    insertList.push(obj)
                                }
                            }
                        })
                        this.$emit("moveRight", insertList, cancelDeleteList)
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    /deep/ .el-transfer-panel {
        text-align: left;
        width: 400px;
    }

    /deep/ .el-transfer-panel .el-transfer-panel__header {
        background-color: transparent;
        padding-left: 10px;
    }

    /deep/ .el-transfer-panel__list {
        padding-top: 0px;
    }

    /deep/ .el-transfer-panel__item {
        display: block;
        margin: 0px;
        padding-left: 10px;
        border-bottom: 1px solid @borderColor2;
    }

    /deep/ .el-checkbox__label .el-col {
        border-left: 1px solid @borderColor2;
        padding-left: 5px;
    }
</style>