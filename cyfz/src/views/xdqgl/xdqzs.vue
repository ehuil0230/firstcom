<template>
    <div id='MapBox'>
        <div  class='baiduMap' id='mapShow'>asdasdasd</div>
    </div>
</template>

<script>
    import "src/static/bmap_offline_demo/map_load.js"
    export default {
        name:'baiduMap',
        data() {
            return{
                map:undefined,
                overView:undefined,
                marker:undefined,
            }
        },
        mounted(){
            this.baiduMap();
        },
        methods:{
            baiduMap:function(){
                var me=this;
                me.map = new BMap.Map("mapShow")
                var point = new BMap.Point(114.065537,22.553321);  // 创建点坐标
                me.marker=new BMap.Marker(point);
                me.overView=new BMap.OverviewMapControl({isOpen: true});//缩略地图控件。
                me.map.addControl(me.overView);
                me.map.addOverlay(me.marker);//添加一个标注
                me.map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别
                me.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            }
        }
    }
</script>

<style scoped>
    #MapBox {
        width: 100%;
        height: 100%;
        padding: 10px;
        position: relative;
    }
    /* 地图 */
    .baiduMap{
        height: 100%;
        width: 100%;
    }
    /* 去除地图上，左下字体标注 */
    .anchorBL{
        display:none;
    }
</style>