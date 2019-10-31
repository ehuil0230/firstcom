<template>
  <div>
    <ul class="track-tab" id="trackTab">
      <li class="axis" :class="{ active: !isList }">
        <el-button class="tab-btn-up" icon="el-icon-alarm-clock" @click="showAxis">跟踪时间轴</el-button>
      </li>
      <li class="list" :class="{ active: isList }">
        <el-button class="tab-btn-up" icon="el-icon-notebook-2" @click="showList">跟踪列表</el-button>
      </li>
    </ul>
    <div class="track-info">
      <div v-show="!isList" class="track-info-time">
        <el-timeline>
          <el-timeline-item timestamp="2019-07-15 16:08:21" placement="top">
            <div class="my-card right-card">
              <div class="card-tab">
                <h2><span class="">批阅</span>马咏华、潘健红、林燕娥 <i class="el-icon-arrow-down" @click="showOrHide"></i></h2>
              </div>
              <div class="card-info g-d-hidei">
                <p><span><i class="el-icon-edit-outline"></i>状态</span>1111111111</p>
                <p><span><i class="el-icon-user"></i>办理人</span>1111111111</p>
                <p><span><i class="el-icon-date"></i>办理时间</span>1111111111</p>
              </div>
            </div>
          </el-timeline-item>
          <el-timeline-item timestamp="2019-07-13 16:08:21" placement="top">
            <dot>
              <div class="my-card left-card">
                <div class="card-tab">
                  <h2><i class="el-icon-arrow-down" @click="showOrHide"></i>马咏华、潘健红、林燕娥<span class="">批阅</span></h2>
                </div>
                <div class="card-info g-d-hidei">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in activities"
                      :key="index"
                      :icon="activity.icon"
                      :type="activity.type"
                      :color="activity.color"
                      :size="activity.size"
                      :timestamp="activity.timestamp">
                      {{activity.content}}
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
            </dot>
          </el-timeline-item>
          <el-timeline-item timestamp="2019-07-13 16:08:21" placement="top">
            <dot>
              <div class="my-card right-card">
                <div class="card-tab">
                  <h2><span class="">批阅</span>马咏华、潘健红、林燕娥 <i class="el-icon-arrow-down" @click="showOrHide"></i></h2>
                </div>
                <div class="card-info g-d-hidei">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in activities"
                      :key="index"
                      :icon="activity.icon"
                      :type="activity.type"
                      :color="activity.color"
                      :size="activity.size"
                      :timestamp="activity.timestamp">
                      {{activity.content}}
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
            </dot>
          </el-timeline-item>
          <el-timeline-item timestamp="2019-07-13 16:08:21" placement="top">
            <dot>
              <div class="my-card left-card">
                <div class="card-tab">
                  <h2><i class="el-icon-arrow-down" @click="showOrHide"></i>马咏华、潘健红、林燕娥 <span class="">批阅</span></h2>
                </div>
                <div class="card-info g-d-hidei">
                  <p>1111111111<span>状态<i class="el-icon-edit-outline"></i></span></p>
                  <p>1111111111<span>办理人<i class="el-icon-user"></i></span></p>
                  <p>1111111111<span>办理时间<i class="el-icon-date"></i></span></p>
                </div>
              </div>
            </dot>
          </el-timeline-item>
          <el-timeline-item timestamp="2019-07-13 16:08:21" placement="top">
            <dot>
              <div class="my-card right-card">
                <div class="card-tab">
                  <h2><span class="">批阅</span>马咏华、潘健红、林燕娥 <i class="el-icon-arrow-down" @click="showOrHide"></i></h2>
                </div>
                <div class="card-info g-d-hidei">
                  <p><span><i class="el-icon-edit-outline"></i>状态</span>1111111111</p>
                  <p><span><i class="el-icon-user"></i>办理人</span>1111111111</p>
                  <p><span><i class="el-icon-date"></i>办理时间</span>1111111111</p>
                </div>
              </div>
            </dot>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div v-show="isList">
        <tableList
          ref="commonContactor"
          :getDataWay="tableData.getDataWay"
          :columns="tableData.columns"
          index
        ></tableList>
      </div>
    </div>
  </div>
</template>

<script>
  import tableList from '@/components/grid/TableList.vue';
  export default {
    name: "Timeline",
    components:{
      tableList
    },
    data() {
      return {
        isList: false,
        activities: [
          {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }],
        tableData: {
          // getDataWay:{dataType:"url",data:'/mockData/list/data.json',param:{}}, // 通过url方式
          getDataWay: {
            dataType: "data",
            data: [
              {
                name: '王小虎',
                phone: 10086,
                type: "党员",
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                name: '王小虎',
                phone: 10087,
                type: "党员",
                address: '上海市普陀区金沙江路 1517 弄'
              }, {
                name: '王小虎',
                phone: 10088,
                type: "党员",
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                name: '王小虎',
                phone: 10089,
                type: "党员",
                address: '上海市普陀区金沙江路 1516 弄'
              }
            ]
          }, // 直接展示
          columns: [
            {
              label: '姓名',
              prop: 'name'
            },
            {
              label: '手机号',
              prop: 'phone'
            },
            {
              label: '类别',
              prop: 'type'
            },
            {
              label: '地址',
              prop: 'address',
            }
          ],
        }
      }
    },
    methods:{
      showAxis:function () {
        this.isList=false
      },
      showList:function () {
        this.isList=true
      },
      showOrHide(e){
        console.log(e.target);
        var $teggle = $(e.target);
        if($teggle.hasClass("el-icon-arrow-down")){
          $teggle.removeClass("el-icon-arrow-down").addClass("el-icon-arrow-up");
        }else {
          $teggle.removeClass("el-icon-arrow-up").addClass("el-icon-arrow-down");
        }
        $teggle.closest('div.card-tab').next().toggleClass("g-d-hidei");
      }
    }
  }
</script>

<style lang="less">
  .track-tab {
    height: 35px;
    text-align: center;
  }

  .track-tab li {
    float: left;
    width: 50%;
    position: relative;
  }

  li {
    list-style: none;
  }

  .axis:before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 1px;
    background-color: #ccc;
  }

  .list:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 1px;
    background-color: #ccc;
  }
  .active:before {
    background-color: @themeColor;
  }
  .active>button{
    color: @themeColor;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .tab-btn-up {
    position: relative;
    z-index: 10;
  }

  .track-info{
    width: 100%;
    padding: 10px 0;
  }
  .track-info-time{
    width: 500px;
    position: relative;
    left: 48%;
  }

  .track-info-time>ul>li.el-timeline-item:nth-child(2n)>.el-timeline-item__wrapper{
    text-align: right;
    position: relative;
    padding-right: 28px;
    top: -3px;
    right: 100%;
    /*right: 450px;*/
  }
  .my-card{
    border: 1px solid #ccc;
    padding: 20px;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    overflow: hidden;
  }
  .left-card>.card-info>ul>li.el-timeline-item>.el-timeline-item__tail{
    left: unset;
    position: absolute;
    right: 30px;
    height: 100%;
    border-left: 2px solid #E4E7ED;
  }
  .left-card>.card-info>ul>li.el-timeline-item>.el-timeline-item__node--large{
    left: unset;
    right: 24px;
    width: 14px;
    height: 14px;
  }
  .left-card>.card-info>ul>li.el-timeline-item>.el-timeline-item__node--normal{
    left: unset;
    right: 24px;
    width: 14px;
    height: 14px;
  }
  .left-card>.card-info>ul>li.el-timeline-item>.el-timeline-item__wrapper{
    right: 53px;
  }
  .right-card{

  }

  .card-tab{
    border-bottom: 1px solid #D4D4D4;
    padding-bottom: 5px;
  }
  .card-tab h2{
    font-size: 15px;
  }
  .card-tab span{
    font-size: 14px;
    padding: 0 5px;
    border: 1px solid #ccc;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    margin: 0 5px 0 10px ;
    color: #888;
  }
  .left-card>.card-tab i{
    position: absolute;
    top: 33px;
    left: 38px;
    border: 1px solid #888;
    border-radius: 5px;
    color: #888;
  }
  .right-card>.card-tab i{
    position: absolute;
    top: 33px;
    right: 10px;
    border: 1px solid #888;
    border-radius: 5px;
    color: #888;
  }
  .card-tab i:hover{
    border-color: @themeColor;
    color: @themeColor;
  }
  .card-info{
    font-size: 14px;
    margin-top: 10px;
  }
  .card-info span {
    margin: 0 10px;
    color:#888 ;
  }
  .g-d-hidei{
    display: none;
  }


</style>
