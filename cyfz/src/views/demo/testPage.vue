<template>
    <div>
        <div>测试页面</div>
        <el-button @click="showDialog">关联身份</el-button>
        <el-dialog title="关联身份"
                   :visible.sync="dialogVisible"
                   :modal="false"
                   width="975px"
        >
            <relate-identity></relate-identity>
        </el-dialog>
    </div>
</template>

<script>
    import relateIdentity from "./relateIdentity"

    export default {
        name: "testPage",
        components: {
            relateIdentity: relateIdentity
        },
        data: () => {

            return {
                dialogVisible: false
            }
        },
        methods: {
            showDialog() {
                this.dialogVisible = true
            }
        }
    }
</script>

<style scoped>

</style>