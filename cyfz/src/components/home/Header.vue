<template>
    <el-header height="80px" class="clearfix">
        <div class="header-logo"></div>
        <div class="header-right">
            <span class="cursor-pointer" @click.stop="goMain">首页</span>
            <span class="cursor-pointer" @click.stop="goHyglyjc">行业管理与检测</span>
            <span class="cursor-pointer" @click.stop="gocyfx">产业分析展示</span>
            <span class="cursor-pointer" @click="logout">揭榜项目申报</span>
            <span class="cursor-pointer" @click.stop="goxdqgl">先导区管理</span>
            <span class="cursor-pointer" @click.stop="goxtgl">系统管理</span>
        </div>
        <!--<div class="right-info">
            <p>{{userName}}</p>
            <p>{{orgName}}</p>
        </div>-->
        <!--<div class="header-right">
            <div class="operate_btn">
                <i @click="toScjPage" class="el-icon-star-on cursor-pointer"></i>
                <span class="line"></span>
                <i class="el-icon-setting"></i>
                <span class="line"></span>
                <i class="el-icon-s-custom cursor-pointer" @click="logout"></i>
            </div>
            &lt;!&ndash;<el-dropdown class="select-role">
                <span class="el-dropdown-link">
                <span>{{role}}</span><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in roleList" :key="index">{{item.roleName}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>&ndash;&gt;
        </div>-->

    </el-header>
</template>

<script>

    export default {
        name: "header-bar",
        data() {
            return {
                userName:localStorage.getItem('userName'),
                orgName:localStorage.getItem('orgName'),
            }
        },
        methods: {
            toScjPage : function () {//转到收藏夹页面
                this.$router.push({
                    name:"scj",
                    params:{}
                })
            },
            logout: function () {
                let _this = this;
                this.$confirm('您确定退出登录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem("Authorization");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("orgName");
                    _this.$store.state.workTab.list = [];
                    _this.$router.replace("/login");
                }).catch(() => {
                });
            },

            goMain(){
                this.$router.push({
                    name:'mainPage'
                })
                this.$store.commit('changePage/togglePageType',{type:'sy'});
            },
            goHyglyjc(){
                /*this.$router.push({
                    name:''
                })*/
                this.$store.commit('changePage/togglePageType',{type:'hygl'});
            },
            gocyfx(){
                this.$store.commit('changePage/togglePageType',{type:'cyfx'});

            },
            goxdqgl(){
                this.$store.commit('changePage/togglePageType',{type:'xdqgl'});

            },
            goxtgl(){
                this.$store.commit('changePage/togglePageType',{type:'xtgl'});
            }
        },
        computed: {},
        watch: {},
        mounted() {

        },
    }
</script>

<style lang="less" scoped>
    .el-header {
        width: 100%;
        background: @bgWhite;
        border-bottom: 1px solid #DBDBDB ;
        margin-bottom: 10px;

        .header-logo {
            width: 500px;
            height: 79px;
            background-image: url(../../assets/img/Logo2.jpg);
            background-size: 170% 100%;
            background-repeat: no-repeat;
            float: left;
            margin-left: 50px;
            overflow: hidden;
        }

        .header-rool{
            float: left;
            margin-left: 100px;
            width: 500px;
            font-size: 16px;
            color: #fff;
            line-height: 70px;
            span{
                margin: 0 20px;
            }
        }

        .header-right {
            margin-right: 30px;
            float: right;
            font-size: 16px;
            color: #6A6A6A;
            line-height: 80px;
            span{
                margin: 0 20px;
            }
            .line {
                border-right: 2px solid #fff;
                margin: 0 5px;
            }
            .operate_btn {
                line-height: 60px;
                display: inline-block;
                color: #fff;
                font-size: 20px;
                i {
                    padding: 0 10px;
                }
            }
            .select-role{
                line-height: 60px;
                color: #fff;
                font-size: 16px;
            }
        }
        .right-info{
            float: right;
            line-height: 40px;
            display: inline-block;
            p{
                height: 20px;
                font-size: 16px;
                color: #fff;
                margin-right: 10px;
            }
        }
        .cursor-pointer {
            cursor: pointer;
        }
    }
</style>
