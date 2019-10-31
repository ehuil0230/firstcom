<template>
    <relate-transfer
            :data="leftData"
            :value="value"
            :props="props"
            :titles="titles"
            :button-texts="buttonTexts"
            @moveRight="handleMoveRight"
            @moveLeft="handleMoveLeft"
    >
        <template v-slot="{option}">
            <el-row>
                <el-col :span="16" :title="option.identityName"><span >{{option.identityName}}</span></el-col>
                <el-col :span="8"><span>{{getSjzt(option.sjzt)}}</span></el-col>
            </el-row>
        </template>
    </relate-transfer>
</template>

<script>
    import relateTransfer from "../../components/relateTransfer/relateTransfer"

    export default {
        name: "relateIdentity",
        components: {
            relateTransfer: relateTransfer
        },
        data() {
            return {
                leftData: [
                    {
                        xsxh: "3",
                        identityId: "asdidffa",
                        identityName: "王二",
                        sjzt: "1"
                    },
                    {
                        xsxh: "1",
                        identityId: "asdifa",
                        identityName: "张三",
                        sjzt: "1"
                    },

                    {
                        xsxh: "2",
                        identityId: "asdisdfa",
                        identityName: "李四",
                        sjzt: "1"
                    }
                ],
                rightData: [
                    {
                        xsxh: "2",
                        identityId: "asdisdfa",
                        identityName: "李四",
                        sjzt: "1"
                    }
                ],
                props: {
                    key: "identityId",
                    label: "identityName",
                    state: "sjzt"
                },
                titles: ["待添加", "已添加"],
                buttonTexts: ["删除", "添加"]
            }
        },
        computed: {
            value() {
                let value = []
                this.rightData.forEach((item) => {
                    value.push(item.identityId)
                })
                return value
            },
            sjztList() {
                return this.$store.state.dmb.sjztList
            }
        },
        created() {
            this.leftData = this.leftData.sort((a, b) => {
                return parseInt(a.xsxh) > parseInt(b.xsxh)
            })
            setTimeout(()=>{
                this.rightData.push(this.leftData[0])
            }, 2000)
        },
        methods: {
            getSjzt(sjzt) {
                let caption = ""
                let obj = this.sjztList.find(obj => obj.code === sjzt)
                if (obj) {
                    caption = obj.caption
                }
                return caption
            },
            handleMoveRight(insertList, cancelDeleteList){
                window.console.log("关联")
                window.console.log(insertList, cancelDeleteList)
                //TODO: 关联请求
            },
            handleMoveLeft(deleteList, cancelInsertList){
                window.console.log("取消关联")
                window.console.log(deleteList, cancelInsertList)
                //TODO: 取消关联请求
            }
        }
    }
</script>

<style scoped>

</style>