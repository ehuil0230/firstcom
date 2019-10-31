<template>
    <div :id="id" class="work-tab">
        <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" @tab-click="clickTab" ref="tabs">
            <el-tab-pane
                    v-for="t in worktabs"
                    :key="t.name"
                    :label="t.tabname"
                    :name="t.name"
                    :closable="!isInit(t.name)"
            >
            </el-tab-pane>
        </el-tabs>
        <div class="work-tab-content" :style="{height: contentHeight}">
            <keep-alive :include="cachePage">
                <router-view ref="content"></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            this.$store.state.workTab.current = [];
            this.$store.state.workTab.list = [];
            //添加current监听
            this.$watch("current", function (newVal) {
                this.activeTab = newVal.name
            })
        },
        mounted() {
            this.initCompleted = true;
            var _that = this
            $(".work-tab").on("mousedown",".el-tabs__item",function (e) {
                if (e.which == 3) {
                    document.body.oncontextmenu = function () {
                        return false
                    }
                    let currentTabIndex = $(this).index()
                    let currentTab = _that.worktabs[currentTabIndex]
                    _that.rightActiveTab = currentTab.name
                    let $wrapper = $('<div class="worktab-rightmenu-wrapper"><div class="worktab-menu"><ul></ul></div></div>')
                    $('body').append($wrapper)
                    let li = ''
                    _that.popItems.forEach((item,i)=>{
                        if(_that.isInit(currentTab.name) && i==0){
                            //li += '<li class="is-disabled">'+ item.txt +'</li>'
                        }else{
                            li += '<li data-id="'+ item.id +'">'+ item.txt +'</li>'
                        }
                    })
                    let $li = $(li)

                    $wrapper.find('ul').append($li)
                    $wrapper.find('ul li').on('click',function () {
                        let id = $(this).data("id")
                        let temp = [].concat(_that.worktabs)
                        if(id === 'current'){
                            if(!_that.isInit(currentTab.name)){
                                _that.removeTab(currentTab.name)
                            }
                        }else if(id === 'others'){
                            temp.forEach((item,i)=>{
                                if(!_that.isInit(item.name) && i!==currentTabIndex){
                                    _that.$store.dispatch("workTab/worktabRemove", item.name)
                                }
                            })
                            _that.$router.push({
                                name: currentTab.name
                            })
                        }else{
                            temp.forEach((item,i)=>{
                                if(!_that.isInit(item.name)){
                                    //关闭所有
                                    _that.$store.dispatch("workTab/worktabRemove", item.name)
                                }
                            })
                            if (_that.hasInitPage) {
                                _that.$router.push({
                                    name: _that.worktabs[0].name,
                                    params: _that.worktabs[0].params
                                })
                            } else {
                                _that.$router.push("/")
                            }
                        }
                    })
                    $wrapper.find('.worktab-menu').css({
                        'top':  $(this).offset().top+ $(this).height()+'px',
                        "left": $(this).offset().left + "px"
                    })


                    $wrapper.on('click',function(e){
                        $(this).remove()
                        setTimeout(()=>{
                            document.body.oncontextmenu = null;
                        },300)
                    });

                }
            })

            //打开初始页面
            if (this.initPage) {
                this.hasInitPage = true
                this.$router.replace("/")
                this.initPage.split(" ").forEach((item) => {
                    this.initPageCount++;
                    this.$router.replace({
                        name: item,
                        params: {
                            moduleName: this.id
                        }
                    })
                })
            }
            // this.contentHeight()
        },
        data() {
            return {
                initCompleted: false,
                activeTab: '',
                rightActiveTab: '',
                hasInitPage: false,
                initPageCount: 0,
                popItems:[
                    {
                        id: 'current',
                        txt:'关闭当前'
                    },
                    {
                        id: 'others',
                        txt:'关闭其他'
                    },
                    {
                        id: 'all',
                        txt:'关闭所有'
                    }
                ]
            }
        },
        props: [
            "id",
            "initPage"
        ],
        watch: {},
        computed: {
            current() {
                return this.$store.state.workTab.current
            },
            worktabs() {
                return this.$store.state.workTab.list
            },
            //需要Keep-Alive缓存的“组件名称”，组件name值，而非路由name值，所以不同页面复用同一组件时，请多封装一层。避免不同路由引用相同组件时，相互影响。
            cachePage() {
                var cachePage = [];
                this.$store.state.workTab.list.forEach((o) => {
                    cachePage.push(o.name)
                })
                return cachePage;
            },
            contentHeight() {
                var contentHeight = 100
                var h = this.$store.state.screenHeight
                var w = this.$store.state.screenWidth
                window.console.log("screen:" + h + "*" + w)
                if (this.initCompleted) {
                    var tabH = this.$refs.tabs.$el.offsetHeight
                    contentHeight = h - 70 - tabH - 20
                    this.$store.commit("contentHeight",contentHeight)
                }
                return contentHeight + "px"
            }
        },
        methods: {
            isInit(name) {
                var flag = false
                if (this.initPage) {
                    this.initPage.split(" ").forEach((item) => {
                        if (item == name) {
                            flag = true
                        }
                    })
                }
                return flag
            },
            clickTab(tab) {
                this.$router.push({
                    name: this.worktabs[1 * tab.index].leafName,
                    params: this.worktabs[1 * tab.index].params
                })
            },
           /* removeTab(name) {
                this.$store.dispatch("workTab/worktabRemove", name)
                if (name === this.current.name && this.worktabs.length >= this.initPageCount) {
                    if (this.worktabs.length > this.initPageCount) {
                        // 是当前页，返回上一页
                        this.$router.back();
                    } else {
                        if (this.hasInitPage) {
                            this.$router.push({
                                name: this.worktabs[0].leafName,
                                params: this.worktabs[0].params
                            })
                        } else {
                            this.$router.push("/")
                        }
                    }
                }
            }*/
            removeTab(name) {
                if (name === this.current.name && this.worktabs.length >= this.initPageCount) {
                    if (this.worktabs.length > this.initPageCount) {
                        // 是当前页，返回上一页
                        //this.$router.back();
                        let nowWorktabs = this.worktabs;
                        for (let i = 0; i < nowWorktabs.length; i++) {
                            if (nowWorktabs[i].name == name) {
                                if (nowWorktabs[i + 1]) {
                                    this.$router.push({
                                        name: nowWorktabs[i + 1].name,
                                        params: nowWorktabs[i + 1].params
                                    });
                                } else if (nowWorktabs[i - 1]) {
                                    this.$router.push({
                                        name: nowWorktabs[i - 1].name,
                                        params: nowWorktabs[i - 1].params
                                    })
                                }
                                break;
                            }
                        }
                    } else {
                        if (this.hasInitPage) {
                            this.$router.push({
                                name: this.worktabs[0].name,
                                params: this.worktabs[0].params
                            })
                        } else {
                            this.$router.push("/")
                        }
                    }
                }
                this.$store.dispatch("workTab/worktabRemove", name);
            }
        }
    }
</script>
<style>
    .work-tab {
        overflow: hidden;
    }

    .work-tab .el-tabs__header {
        margin: 0px;
    }

    .work-tab .el-tabs--card > .el-tabs__header {
        background-color: #FAFAFA;
        border-bottom-color: transparent;
    }

    .work-tab .el-tabs--card > .el-tabs__header .el-tabs__nav {
        border-color: transparent;
    }

    .work-tab .el-tabs--card > .el-tabs__header .el-tabs__item {
        background-color: #EDEDED;
        border-radius: 4px 4px 0px 0px;
        border-left-color: transparent;
    }

    .work-tab .el-tabs--card > .el-tabs__header .el-tabs__item:not(:first-child) {
        margin-left: 6px;
    }

    .work-tab .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        background-color: #FFFFFF;
        border-bottom-color: transparent;
    }

    .work-tab .el-tabs__nav-scroll {
        height: 41px;
        background-color: #f4f4f4;
    }

    .work-tab-content {
        /*margin-right: -17px;*/
        /*padding-right: 17px;*/
        background-color: #FFFFFF;
        overflow-y: auto;
        overflow-x: auto;
        position: relative;
        /*  padding:10px;*/
    }

    .worktab-rightmenu-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }
    .worktab-menu{
        width: 100px;
        position: absolute;
        z-index: 10;

        background-color: #fff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .worktab-menu >ul{
        margin: auto;
    }
    .worktab-menu ul li{
        list-style: none;
        line-height: 36px;
        padding: 0 20px;
        margin: 0;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        outline: none;
    }

    .worktab-menu ul li:hover{
        background-color: #ecf5ff;
        color: #66b1ff;
    }
    .worktab-menu ul li span{
        display: inline-block;
    }
    .worktab-menu ul li span:first-child{
        margin-right: 5px;
    }
    .worktab-menu ul li.is-disabled {
        cursor: not-allowed;
    }
</style>
