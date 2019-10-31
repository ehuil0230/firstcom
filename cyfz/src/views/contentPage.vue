<template>
    <div class="content-page">
        <el-container>
            <el-aside width="250">
                <work-menu></work-menu>
            </el-aside>
            <el-main>
                <!--<work-tab></work-tab>-->
                <bread-crumb></bread-crumb>
                <router-view></router-view>
            </el-main>
        </el-container>
        <!--        <el-footer height="40px">Copyright @ 2019-{{nowTime+1}}中华人民共和国工业和信息化部 All Right Reserved</el-footer>-->
    </div>
</template>

<script>
    import workMenu from "../components/home/WorkMenu"
    import breadCrumb from '../components/home/Breadcrumb'

    export default {
        name: "contentPage",
        components: {
            workMenu: workMenu,
            breadCrumb,
        },
        data() {
            return {
                nowTime: (new Date()).getFullYear()
            }
        },
        computed: {
            mainHeight() {
                let mainHeight = this.$store.state.screenHeight - 60
                return mainHeight + "px"
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .content-page /deep/ .el-main{
        border: 1px solid #DDD;
        width: 950px;
        padding: 2px;
        min-height: calc(100vh - 195px);
    }

</style>
