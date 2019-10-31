<template>
    <div>
        <div class="main-header">
            <div class="main-content">
                <div class="header-left">
                    <div class="top-icon"></div>
                    <div class="top-title">人工智能产业发展支撑信息系统</div>
                    <div class="top-en">Artificial intelligence industry development support information system</div>
                </div>
            </div>
        </div>
        <div class="main-fullsearch">
            <div class="search-header">
                <label style="font-size:16px;font-weight: 550;padding-left:40px">标题:</label>
                <el-input style="width: 80%;margin:0 10px" v-model="title" @keyup.native.enter="onSubmit" placeholder="请输入标题" size="medium " ></el-input>
                <el-button type="primary" @click="onSubmit"  size="medium ">搜索</el-button>
            </div>
            <div class="search-main" v-if="resuleList.length>0">
                <div class="search-content" v-for="item in resuleList" :key="item.uuid">
                    <div class="content-header">
                        <a @click="goDetail(item)">{{item.title}}</a>
                        <span>编辑时间{{item.createTime}}</span>
                    </div>
                    <div class="content-main" v-html="item.content"></div>
                </div>
            </div>
            <div class="search-main-nodata"  v-else>暂无数据</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fullSearch",
        data() {
            return {
                title: '',
                resuleList:[],
            }
        },

        mounted() {
            this.title = this.$route.query.title;
            this.onSubmit();
        },
        methods:{
            onSubmit(){
                let that = this;
                this.$axios({
                    method:'post',
                    url:this.$api.homeApi.queryByTitle,
                    data:{
                        title:this.title
                    }
                }).then((res)=>{
                    that.resuleList = res.info.list;
                }).catch(function () {

                })
            },
            goDetail(obj){
                this.$router.push({
                    name:'detail',
                    query:{
                        uuid:obj.uuid,
                        moduleCode:obj.moduleCode
                    }
                })
            }
        }
    }
</script>





<style scoped lang="less">
    .main-header {
        width: 100%;
        height: 100px;
        background-image: url(../../assets/img/header/top.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .main-content {
            width: 1200px;
            margin: 0 auto;

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

                .top-en {
                    position: absolute;
                    top: 60px;
                    left: 115px;
                }

            }
        }
    }
    .main-fullsearch {

        width: 1000px;
        margin:0 auto;

        .search-header {
            background-color: white;
            padding: 20px 10px 30px;
            margin-bottom:20px;
            top: 0;
            height: 60px;
            width: 100%;
            border-bottom: 1px solid #F5F5F5;
        }

        .search-main {
            width: 100%;
            height: calc(100vh - 80px);

            .search-content{
                padding: 10px;

                .content-header>a{
                    cursor: pointer;
                    display: inline-block;
                    width: 60%;
                    font-size: 18px;
                    color: #1A17EA;
                    text-decoration: underline;
                    text-align: left;
                }
                .content-header>span{
                    margin-top: 10px;
                    font-size: 12px;
                    float: right;
                    text-align: right;
                }

                .content-main{
                    padding-top: 20px;
                    color: #888;
                    font-size: 15px;
                    text-indent: 2em;
                }
            }
        }

        .search-main-nodata {
            margin-top: 70px;
            height: calc(100vh - 80px);
            width: 100%;
            color: #888;
            text-align: center;
        }
    }

</style>
