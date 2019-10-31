<template>
    <div class="main-header">
        <!--<el-header height="80px" class="clearfix">
            <div class="header-logo"></div>
            <div class="header-right">
                <span class="cursor-pointer" @click.stop="goMain">首页</span>
                <span class="cursor-pointer" @click.stop="goHyglyjc">行业管理与检测</span>
                <span class="cursor-pointer" @click.stop="gocyfx">产业分析展示</span>
                <span class="cursor-pointer" @click="logout">揭榜项目申报</span>
                <span class="cursor-pointer" @click.stop="goxdqgl">先导区管理</span>
                <span class="cursor-pointer" @click.stop="goxtgl">系统管理</span>
            </div>
        </el-header>-->
        <div class="main-content">
            <div class="header-top">
                <div class="header-left">
                    <div class="top-icon"></div>
                    <div class="top-title">人工智能产业发展支撑信息系统</div>
                    <div class="top-en">Artificial intelligence industry development support information system</div>
                </div>
                <div class="header-right">
                    <el-input @click.native="goSearch($event)" @keyup.native.enter="goSearchByEnter" class="cursor-pointer" suffix-icon="el-icon-search" size="small" v-model="title"></el-input>
                    <!--<span v-if="isLogin==0" class="tar cursor-pointer">登录</span>
                    <span v-if="isLogin==0" class="cursor-pointer">注册</span>-->
                    <span class="cursor-pointer" v-if="isLogin==1">{{userName}}</span>
                    <span class="cursor-pointer" @click="goBack"><i class="el-icon-s-home"></i>返回首页</span>
                </div>
            </div>
            <!--政务内网和互联网-->
            <div class="header-bottom">
                <ul>
                    <li class="cursor-pointer" :class="{'isCurrent':pageType==='sy'}" @click.stop="goMain">首页</li>
                    <li class="cursor-pointer" :class="{'isCurrent':pageType==='hygl'}" @click.stop="goHyglyjc">行业管理与监测</li>
                    <li class="cursor-pointer" :class="{'isCurrent':pageType==='cyfx'}" @click.stop="gocyfx">产业分析展示</li>
<!--                    <li class="cursor-pointer" :class="{'isCurrent':pageType==='xmsb'}" @click.stop="gojbxm">揭榜项目申报</li>-->
                    <li class="cursor-pointer" :class="{'isCurrent':pageType==='xdqgl'}" @click.stop="goxdqgl">先导区管理</li>
                   <!--政务内网-->
                    <li v-if="packageStatus==='zwww'" class="cursor-pointer" :class="{'isCurrent':pageType==='xtgl'}" @click.stop="goxtgl">系统管理</li>
                </ul>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "newHeader",
        data() {
            return {
                userName: localStorage.getItem("userName"),
                orgName: localStorage.getItem('orgName'),
                title:'',
                packageStatus:this.$packageStatus
            }
        },
        methods: {
            goBack(){
                window.open('http://yth.miit.gou.cn','_blank')
                // if(this.packageStatus==='hlw'){
                //     window.open('http://10.15.255.8','_blank')
                //     window.open('http://yth.miit.gou.cn','_blank')
                // }else {
                //     // window.open('http://192.168.6.22:81','_blank')
                // }
            },
            goSearch(e){
                console.log(e.target)
                if(e.target.nodeName.toUpperCase()==='I'){
                    if(this.title){
                        this.$router.push({
                            name:'search',
                            query:{
                                title:this.title
                            }
                        })
                    }

                }
            },
            goSearchByEnter(){
                if(this.title){
                    this.$router.push({
                        name:'search',
                        query:{
                            title:this.title
                        }
                    })
                }
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

            goMain() {
                this.$store.commit('changePage/togglePageType', {type: 'sy'});
                this.$router.push({
                    name: 'mainPage'
                })
            },
            goHyglyjc() {
                /**/
                if(this.pageType!=='hygl'){
                    this.$store.commit('changePage/togglePageType', {type: 'hygl'});
                    this.$router.push({
                        name: 'contentPage',
                    })
                    this.$route.meta.breadcrumb='行业管理与监测'
                }else if(this.$route.name!=='contentPage'){
                    this.$store.commit('changePage/togglePageType', {type: 'hygl'});
                    this.$router.push({
                        name: 'qgcyxxjc'
                    })
                    // this.$route.meta.breadcrumb='行业管理与监测'
                }
            },
            gocyfx() {
                /**/
                if(this.pageType!=='cyfx'){
                    this.$store.commit('changePage/togglePageType', {type: 'cyfx'});
                    this.$router.push({
                        name: 'contentPage',
                    })
                    this.$route.meta.breadcrumb='产业分析展示'
                }else if(this.$route.name!=='contentPage'){
                    this.$store.commit('changePage/togglePageType', {type: 'cyfx'});
                    this.$router.push({
                        name: 'hyfxgl'
                    })
                }
            },
            goxdqgl() {
                /**/
                if(this.pageType!=='xdqgl'){
                    this.$store.commit('changePage/togglePageType', {type: 'xdqgl'});
                    this.$router.push({
                        name: 'contentPage',
                    })
                    this.$route.meta.breadcrumb='先导区管理'
                }else if(this.$route.name!=='contentPage'){
                    this.$store.commit('changePage/togglePageType', {type: 'xdqgl'});
                    if(this.$packageStatus==='zwww'){
                        this.$router.push({
                            name: 'xdqxxtb'
                        })
                    }else {
                        this.$router.push({
                            name: 'zchz'
                        })
                    }
                }
            },
            goxtgl() {
                if(this.pageType!=='xtgl'){
                    this.$store.commit('changePage/togglePageType', {type: 'xtgl'});
                    this.$router.push({
                        name: 'contentPage',
                    })
                    this.$route.meta.breadcrumb='系统管理'
                }else if(this.$route.name!=='contentPage'){
                    this.$store.commit('changePage/togglePageType', {type: 'xtgl'});
                    this.$router.push({
                        name: 'tzgg'
                    })
                }
            }
        },
        computed: {
            pageType() {
                return this.$store.state.changePage.pageType
            },
            isLogin() {
                return this.$store.state.ssoStatus.isLogin
            }
        },
        watch: {
            '$store.state.ssoStatus.isLogin':function (newval,oldval) {
                if (newval!=oldval){
                    this.userName=localStorage.getItem('userName')
                }
            }
        },
        mounted() {

        },
    }
</script>

<style lang="less" scoped>
    .main-header {
        width: 100%;
        height: 165px;
        background-image: url(../../assets/img/header/top.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .main-content {
            width: 1200px;
            margin: 0 auto;

            .header-top {
                position: relative;
                width: 100%;
                height: 115px;
                .header-left {
                    position: relative;
                    color: #fff;
                    .top-icon {
                        position: absolute;
                        top: 0;
                        left: 0;
                        display: inline-block;
                        width: 115px;
                        height: 115px;
                        background-image: url(../../assets/img/header/logo.png);
                        background-size: 80% 80%;
                        background-repeat: no-repeat;
                    }

                    .top-title {
                        position: absolute;
                        top: 20px;
                        left: 115px;
                        display: inline-block;
                        font-size: 30px;
                    }
                    .top-en{
                        position: absolute;
                        top: 60px;
                        left: 115px;
                    }

                }

                .header-right{
                    position: absolute;
                    right: 0;
                    top: 30px;
                    .el-input{
                        width: 180px;
                        border-radius: 5px;
                        /deep/ input{
                            background-color: #005DC2;
                            color: #fff;
                        }
                    }
                    span{
                        color: #3397d9;
                        padding: 0px 10px;
                        font-size: 17px;
                    }

                    span.tar{
                        border-right: 2px solid #3397d9;
                    }

                }
            }

            .header-bottom {
                width: 100%;
                height: 50px;
                text-align: center;
                ul {
                    list-style: none;

                    li {
                        border-top-left-radius: 4px;
                        border-top-right-radius: 4px;
                        margin: 0 10px;
                        padding: 10px 30px;
                        text-align: center;
                        color: #fff;
                        display: inline-block;
                        height: 50px;
                        font-size: 18px;
                    }

                    .isCurrent {
                        background-color: #0066cc;
                    }
                }
            }
        }
        .cursor-pointer {
            cursor: pointer;
        }
    }
</style>
