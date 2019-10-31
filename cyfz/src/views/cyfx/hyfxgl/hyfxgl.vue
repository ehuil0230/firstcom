<!--行业分析概览-->
<template>
    <div id="hyfxgl">
        <!--标准情况分析-->
        <el-backtop title="返回顶部" :bottom="120"></el-backtop>
        <div id="bzqkfx_out">
            <div class="bigtitle">
                <span>标准情况分析</span>
            </div>
            <div class="bzqkfx_page">
                <bzqkfx></bzqkfx>
            </div>
        </div>
        <!--产值收益分析（全国）-->
        <div id="czsy_qg">
            <div class="bigtitle">
                <span>产值收益分析（全国）</span>
            </div>
            <div class="czsyfx_qg_page">
                <qgsyfx></qgsyfx>
            </div>
        </div>
        <!--产值收益分析（先导区）-->
        <div id="czsy_xdq">
            <div class="bigtitle">
                <span>产值收益分析（先导区）</span>
            </div>
            <div class="czsyfx_xdq_page">
                <xdqsyfx></xdqsyfx>
            </div>
        </div>
        <!--产值收益分析（各省份）-->
        <div id="czsy_gef">
            <div class="bigtitle">
                <span>产值收益分析（各省份）</span>
            </div>
            <div class="czsyfx_gsf_page">
                <gssyfx></gssyfx>
            </div>
        </div>
        <!--知识产权分析-->
        <div id="zscqfx_out">
            <div class="bigtitle">
                <span>知识产权分析</span>
            </div>
            <div class="zscqfx_page">
                <zscqfx></zscqfx>
            </div>
        </div>
        <!--投资信息分析-->
        <div id="tzxxfx_out">
            <div class="bigtitle">
                <span>投资信息分析</span>
            </div>
            <div class="tzxxfx_page">
                <tzxxfx></tzxxfx>
            </div>
        </div>
        <!--骨干企业分析-->
        <div id="ggqyfx_out">
            <div class="bigtitle">
                <span>骨干企业分析</span>
            </div>
            <div class="ggqyfx_page">
                <ggqyfx></ggqyfx>
            </div>
        </div>
        <!--先导区展示-->
        <div id="xdqzs_out">
            <div class="bigtitle">
                <span>先导区展示</span>
            </div>
            <div class="xdqzs_page">
                <xdqzs></xdqzs>
            </div>
        </div>
    </div>
</template>

<script>
    import bzqkfx from "../bzqkfx/bzqkfx";
    import qgsyfx from "../czsyfx/qgsyfx";
    import xdqsyfx from "../czsyfx/xdqsyfx";
    import gssyfx from "../czsyfx/gssyfx";
    import zscqfx from "../zscqfx/zscqfx";
    import tzxxfx from "../tzxxfx/tzxxfx";
    import ggqyfx from "../ggqyfx/ggqyfx";
    import xdqzs from "../xdqzs/xdqzs";

    export default {
        name: "hyfxgl",
        components: {
            bzqkfx,
            qgsyfx,
            xdqsyfx,
            gssyfx,
            zscqfx,
            tzxxfx,
            ggqyfx,
            xdqzs,
        }
    }
</script>

<style lang="less" scoped>
    #hyfxgl {
        width: 100%;
        overflow: hidden;
        background-color: @bgGray;
    }

    #bzqkfx_out,
    #czsy_qg,
    #czsy_xdq,
    #czsy_gef,
    #zscqfx_out,
    #tzxxfx_out,
    #ggqyfx_out,
    #xdqzs_out{
        width: 100%;
        padding-bottom: 20px;
    }

    .bigtitle {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .bigtitle span {
        font-size: 20px;
        color: @textColor1;
        font-weight: bolder;
    }

    .bzqkfx_page ,
    .czsyfx_qg_page,
    .czsyfx_xdq_page,
    .czsyfx_gsf_page,
    .zscqfx_page,
    .tzxxfx_page,
    .ggqyfx_page,
    .xdqzs_page{
        width: 100%;
    }
</style>
