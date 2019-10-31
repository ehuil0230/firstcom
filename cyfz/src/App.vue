<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                timer: null
            };
        },
        mounted() {
            window.onresize = () => {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.$store.state.screenWidth = document.documentElement.clientWidth//窗口宽度
                    this.$store.state.screenHeight = document.documentElement.clientHeight//窗口高度
                }, 100)
            }
        }
    }
</script>
<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .el-dialog__header{
        text-align: center;
    }

    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
    }
</style>
