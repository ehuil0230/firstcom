<template>
    <div class="work_menu">
        <div class="menu-bar">
            <span>导航</span>
        </div>
        <div class="menu-main">
            <el-menu router class="leftPart" :default-openeds="defaultOpeneds"
                     :collapse="isCollapse"
                     :collapse-transition="false"
                     :class="{collmin:!isCollapse}">
                <template v-for="menu in menuTree">
                    <el-submenu v-if="menu.menus.length>0" :index="menu.id" :show-timeout="0" :hide-timeout="0">
                        <template slot="title">
                            <i :class="menu.icon" style="color: #03A9F4"></i>
                            <span slot="title">{{menu.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="subMenu in menu.menus" :index="subMenu.path">
                                {{subMenu.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-else :index="menu.path">
                        <i :class="menu.icon" style="color: #03A9F4"></i>
                        <span slot="title"> {{menu.name}}</span>
                    </el-menu-item>
                </template>
                <!--<el-submenu index="2328787420" :show-timeout="0" :hide-timeout="0">
                    <template slot="title">
                        <i class="el-icon-monitor"></i>
                        <span>demo</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/cyUploadDemo">cyUploadDemo</el-menu-item>
                        <el-menu-item index="/cyUpImageDemo">cyUpImageDemo</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>-->

               <!-- <el-submenu index="2328787420" :show-timeout="0" :hide-timeout="0">
                    <template slot="title">
                        <i class="el-icon-monitor"></i>
                        <span>demo</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/cyUploadDemo">cyUploadDemo</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>-->
                <!--<template v-for="(menu,index) in menuTree">
                    <el-submenu v-if="menu.children" :index="index" :show-timeout="0" :hide-timeout="0">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            &lt;!&ndash;                        <i v-if="menu.caption==='文件管理'" class="el-icon-message"></i>&ndash;&gt;
                            &lt;!&ndash;                        <i v-if="menu.caption==='权限管理'" class="el-icon-location"></i>&ndash;&gt;
                            <span slot="title">{{menu.caption}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="subMenu in menu.children" :index="subMenu.path">
                                {{subMenu.caption}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-else :index="menu.path">
                        <i class="el-icon-setting"></i>
                        <span slot="title"> {{menu.caption}}</span>
                    </el-menu-item>
                </template>-->
            </el-menu>
        </div>
    </div>

</template>

<script>
    export default {
        name: "WorkMenu",
        data() {
            return {
                // isCollapse: false,
                menuTree: [],
                defaultOpeneds: []
            }
        },
        computed: {
            isCollapse() {
                return this.$store.state.dbPage.isCollapse
            },
            pageType() {
                return this.$store.state.changePage.pageType
            }
        },
        watch:{
            '$store.state.changePage.pageType'(newValue, oldValue) {
                if(newValue==='sy'){
                    this.$router.push({
                        name: 'mainPage'
                    })
                }else if(newValue==='hygl'||newValue==='cyfx'||newValue==='xdqgl'||newValue==='xtgl') {
                    let that = this;
                    let uri = '';
                   if(that.$packageStatus==='hlw'){
                        /*互联网菜单项*/
                        uri=this.$api.homeApi.cquerySystemTree
                    }else {
                        /*政务内网菜单*/
                       uri=this.$api.homeApi.gquerySystemTree
                    }
                    this.$axios({
                        method:'post',
                        url:uri,
                        data:{
                            pageType:newValue
                        }
                    }).then((res)=>{
                        that.menuTree = res.info;
                    }).then(function () {
                        switch (newValue) {
                            case "hygl":
                                that.$router.push({
                                    name: 'qgcyxxjc'
                                })
                                break;
                            case "cyfx":
                                that.$router.push({
                                    name: 'hyfxgl'
                                })
                                break;
                            case "xdqgl":
                                if(that.$packageStatus==='zwww'){
                                    that.$router.push({
                                        name: 'xdqxxtb'
                                    })
                                }else {
                                    that.$router.push({
                                        name: 'zchz'
                                    })
                                }
                                break;
                            case "xtgl":
                                that.$router.push({
                                    name: 'tzgg'
                                })
                                break;
                            default:
                                break
                        }
                    }).catch((err)=>{})

                }else {
                    return
                }
            },
        },
        mounted() {
            let newValue = this.$store.state.changePage.pageType;
            if(newValue==='sy'){
                this.$router.push({
                    name: 'mainPage'
                })
            }else if(newValue==='hygl'||newValue==='cyfx'||newValue==='xdqgl'||newValue==='xtgl') {
                let that = this;
                let uri = '';
                if(that.$packageStatus==='hlw'){
                    /*互联网菜单项*/
                    uri=this.$api.homeApi.cquerySystemTree
                }else {
                    /*政务内网菜单*/
                   uri=this.$api.homeApi.gquerySystemTree
               }
                this.$axios({
                    method:'post',
                    url:uri,
                    data:{
                        pageType:newValue
                    }
                }).then((res)=>{
                    that.menuTree = res.info;
                    switch (newValue) {
                        case "hygl":
                            that.$router.push({
                                name: 'qgcyxxjc'
                            })
                            break;
                        case "cyfx":
                            that.$router.push({
                                name: 'hyfxgl'
                            })
                            break;
                        case "xdqgl":
                            if(that.$packageStatus==='zwww'){
                                that.$router.push({
                                    name: 'xdqxxtb'
                                })
                            }else {
                                that.$router.push({
                                    name: 'zchz'
                                })
                            }
                            break;
                        case "xtgl":
                            that.$router.push({
                                name: 'tzgg'
                            })
                            break;
                        default:
                            break
                    }
                })

            }else {
                return
            }
        },
        methods: {
            showOrHide() {
                this.$store.commit('dbPage/toggleCollapse');
            }
        }
    }
</script>

<style scoped lang="less">
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
</style>
