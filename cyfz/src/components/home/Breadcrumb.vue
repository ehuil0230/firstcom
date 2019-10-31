<template>
    <div class="breadcrumb">
        <span class="el-icon-notebook-2 breadcrumb_icon"></span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <transition-group name="breadcrumb">
                <template v-for="(item,index) in list">
                    <el-breadcrumb-item v-if="index!=0" :key="item.path + item.name">
                        {{item.meta.breadcrumb}}
                    </el-breadcrumb-item>
                </template>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumb',
        computed: {
            list () {
                return this.$route.matched
            },
            pageType() {
                return this.$store.state.changePage.pageType
            }
        },
        created () {
            console.log(this.$route)
        },
    }
</script>

<style scoped lang="less">
    .breadcrumb {
        line-height: 40px;
        border-radius: 4px;
        margin-bottom: 10px;
        .breadcrumb_icon{
            color: #03A9F4;
            font-size: 20px;
            text-align: center;
            margin-top: 2px;
            margin-right: 10px;
        }
        .breadcrumb_icon:before{
            vertical-align: middle;
        }
    }
    .el-breadcrumb {
        line-height: 2;
        padding-left: 4px;
    }

</style>
