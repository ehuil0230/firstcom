<template>
    <div class="container-fluid" style="width: 1200px;padding: 0px">
        <div class="row" style="margin: 0;" >
            <span><img src="../../assets/img/ico_Home.png" style="margin-right: 15px;"></span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 25px">
                <!--                    <img src="../assets/img/header/ico_Notice.png" style="padding-left: 10px">-->
                <el-breadcrumb-item :to="{ name: 'mainPage' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-container style="margin: 30px">
            <el-aside width="250">
                <div class="work_menu">
                    <div class="menu-bar">
                        <span>导航</span>
                    </div>
                    <div class="menu-main">
                        <el-menu class="leftPart" >
                            <el-menu-item index="1" @click.native="mainContent('tzgg')">
                                <i class="el-icon-menu"></i>
                                <span slot="title" >通知公告</span>
                            </el-menu-item>
                            <el-menu-item index="2" @click.native="mainContent('jbjggs')">
                                <i class="el-icon-menu"></i>
                                <span slot="title" >揭榜公示</span>
                            </el-menu-item>
                            <el-menu-item index="3" @click.native="mainContent('zcwj')">
                                <i class="el-icon-menu" ></i>
                                <span slot="title" >政策文件与解读</span>
                            </el-menu-item>
                            <el-menu-item index="5" @click.native="mainContent('zdjbdw')">
                                <i class="el-icon-menu"></i>
                                <span slot="title" >重点揭榜单位</span>
                            </el-menu-item>
                            <el-menu-item index="6" @click.native="mainContent('pyqldw')">
                                <i class="el-icon-menu"></i>
                                <span slot="title" >培育潜力单位</span>
                            </el-menu-item>
                            <el-menu-item index="7"  @click.native="mainContent('xctj')">
                                <i class="el-icon-menu"></i>
                                <span slot="title">宣传推荐</span>
                            </el-menu-item>


                        </el-menu>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <div class="itemHeaderLeft" >
                    <img src="../../assets/img/header/ico_Notice.png" style="padding-left: 10px">
                    <span style="padding-left: 5px;">
                                {{title}}
                    </span>
                    <hr style="margin:2px 0px 20px;border: none;border-top: 2px solid #0066cc"/>
                </div>
                <!--<hr style="margin: 0px" />-->

                <div v-if="contentList.length!==0" >
                    <ul style="padding-left: 10px;" >
                        <ul style="font-family: Microsoft YaHei;padding-left: 10px" >
                            <li v-for="item in contentList" style="padding-top: 10px;" >
                                ·<a href="#"  @click="goDetail(item)" style="padding-left: 8px"> {{item.title}}</a>
                                <p style="float: right;padding-right: 20px">{{item.dateTime}}</p>
                            </li>
                            <br>
                        </ul>
                    </ul>
                </div>
                <div style="line-height:200px;text-align: center;color: gray" v-else >
                    暂无数据
                </div>
                <div style="float: right;margin: 40px 20px 20px;">
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page="pagination.currentPage"
                            :page-size="pagination.pageSize"
                            :layout="pagination.layout"
                            :total="pagination.total">
                    </el-pagination>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import workMenu from "../../components/home/WorkMenu"
    export default {
        name: "morePage",
        components: {
            workMenu: workMenu,
        },
        data() {
            return {
                title:'',
                contentList:[],
                pagination: {
                    currentPage: 1,
                    pageSize: 20,
                    position: 'right',
                    layout: 'total ,prev, pager, next',
                    total:1
                },
                code:''

            }
        },
        methods:{
            goDetail(obj){
                if(obj.moduleCode==='xctj'){
                    this.$router.push({
                        name:'xctjDetail',
                        query:{
                            uuid:obj.uuid,
                            moduleCode:obj.moduleCode
                        }
                    })
                }else{
                    this.$router.push({
                        name:'detail',
                        query:{
                            uuid:obj.uuid,
                            moduleCode:obj.moduleCode
                        }
                    })
                }
            },
            mainContent(obj){
                switch (obj) {
                    case 'tzgg':
                        this.title = "通知公告";
                        this.code = 'tzgg'
                        break;
                    case 'jbjggs':
                        this.title = "揭榜公示";
                        this.code = 'jbjggs'
                        break;
                    case 'zcwj':
                        this.title = "政策文件与解读";
                        this.code = 'zcwj'
                        break;
                    case 'zdjbdw':
                        this.title = "重点揭榜单位";
                        this.code = 'zdjbdw'
                        break;
                    case 'pyqldw':
                        this.title = "培育潜力单位";
                        this.code = 'pyqldw'
                        break;
                    case 'xctj':
                        this.title = "宣传推荐";
                        this.code = 'xctj'
                        break;
                }
                this.loadData()
            },
            handleCurrentChange(val){
                this.pagination.currentPage = val
                this.loadData()
            },
            loadData(){
                this.$api.homeApi.queryFrontPageList
                this.contentList = []
                let that = this
                this.$$request({
                    url: this.$api.homeApi.queryMore,
                    data: {moduleCode: this.code,pageSize: this.pagination.pageSize,currentPage: this.pagination.currentPage}
                }).then(function (res) {
                    for(let item of res.info.list){
                        that.contentList.push(item)
                    }
                    that.pagination.total = res.info.total
                })
            },
        },
        created(){
            this.code = this.$route.query.moduleCode
            this.mainContent(this.code)
        },
        mounted() {
            //alert($route.params.moduleCode)
        },
    }
</script>

<style scoped lang="less">
    a{
        color: inherit;
    }
    a:hover{
        color: #0066cc;
    }
    .itemHeaderLeft{
        font-size: 18px;
        font-weight: 580;
        color: #0066cc;
    }
    .work_menu {
        width: 210px;
        margin-right: 40px;
        height: 100%;
        .menu-main{
            min-height: calc(100vh - 235px);
            border: 1px solid #DDDDDD;
            box-sizing: border-box;
            text-align: left;
            position: relative;
        }

        .menu-bar{
            width: 210px;
            height: 30px;
            background-image: url(../../assets/img/header/table_public.png);
            background-size: 200% 100%;
            background-repeat: no-repeat;
            margin-bottom: 1px;

            span{
                color: #fff;
                font-size: 18px;
                margin-left:30px;
                padding: 10px;
            }
        }

    }

    .leftPart {
        border-right: 0px;
    }

    .collmin {
        min-width: 15em;
    }

    .show-menu {
        z-index: 10;
        line-height: 60px;
        position: absolute;
        top: 48%;
        right: 0;
        width: 14px;
        height: 60px;
        opacity: 0.7;
        background-color: #888;
        color: #fff;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .el-main{
        width: 950px;
        padding: 2px;
        min-height: calc(100vh - 195px);
    }
</style>