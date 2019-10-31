<template>
    <div class="main-page">
        <el-container>
            <el-header height="165px">
                <header-bar></header-bar>
            </el-header>
            <el-container class="bottomPart">
                <router-view class="main-content"></router-view>
            </el-container>
            <el-footer height="110px">
                <div class="footer-worp">
                    <div class="footer-icon"></div>
                    <div class="footer-content">
                        <p>主办单位:中华人民共和国工业和信息化部 地址:中国北京西长安街13号 邮编:100804</p>
                        <p>工业和信息化部 版权所有 京ICP备04000001号 网站标识码:bm07000001</p>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>

</template>

<script>
    import headerBar from "../components/home/newHeader"
    import workMenu from "../components/home/WorkMenu"
    import workTab from "../components/home/WorkTab"

    export default {
        name: "Index",
        components: {
            headerBar: headerBar,
            workMenu: workMenu,
            workTab: workTab
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

<style lang="less" scoped>
    .bottomPart {
        min-height: calc(100vh - 195px);
    }

    .main-content{
        width: 1200px;
        margin:30px auto 0 auto;
        overflow-x: hidden;
    }

    .main-page /deep/ header {
        padding: 0px;
    }

    .main-page /deep/ main {
        padding: 0px;
    }

    .main-page /deep/ footer {
        margin-top: 30px;
        box-sizing: border-box;
        background-color: #01203D;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 13px;
        .footer-worp{
            padding: 10px;
            .footer-icon{
                vertical-align: middle;
                display: inline-block;
                width: 70px;
                height: 90px;
                background-position: center;
                background-image: url(../assets/img/header/logo_0.png);
                background-repeat: no-repeat;
            }
            .footer-content{
                vertical-align: middle;
                display: inline-block;
            }
        }

    }

</style>
