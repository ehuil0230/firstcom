<template>
    <div id="wpsTool">
        <el-container>
            <el-header>
                <el-row>
                    <el-button @click="InitFrame()" plain>初始化插件</el-button>
                    <el-button @click="createDocument()" type="success" plain>新建</el-button>
                    <el-button @click="openDocumentRemote()" type="primary" plain>打开文档</el-button>
                    <el-button @click="setField()" type="warning" plain>填充公文域</el-button>
                    <el-button @click="saveURL()" type="success" plain>保存</el-button>
                    <el-button @click="printwps()" type="info" plain>打印</el-button>
                    <el-button @click="closewps()" type="danger" plain>关闭文档</el-button>
                    <el-button @click="closePage()" type="danger" plain>关闭页面</el-button>
                </el-row>
            </el-header>
            <el-main>
                <div id="docDiv" align="right" style="width:90%; height:600px; background-color: beige"></div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    var ie = !!window.ActiveXObject || "ActiveXObject" in window; //edge为false,ie11为true
    var obj = null;
    var app = null;

    function init(ext, objH, objW) {
        var iframe = document.getElementById('docDiv');
        var _obj = null;
        var html = '';
        if (ext == "et") {
            if (ie) {
                var codes = [];
                codes.push('<object id=DocFrame height=' + objH + ' width=' + objW + ' ');
                codes.push('data=data:application/x-oleobject;base64,7Kd9juwHQ0OBQYiirbY6XwEABAA7DwMAAgAEAB0AAAADAAQAgICAAAQABAD///8ABQBcAFgAAABLAGkAbgBnAHMAbwBmAHQAIABBAGMAdABpAHYAZQBYACAARABvAGMAdQBtAGUAbgB0ACAARgByAGEAbQBlACAAQwBvAG4AdAByAG8AbAAgADEALgAwAAAA ');
                codes.push('classid=clsid:8E7DA7EC-07EC-4343-8141-88A2ADB63A5F viewastext=VIEWASTEXT></object> ');
                html = codes.join("");
            } else {
                var codes = [];
                codes.push("<object  name='webet' id=DocFrame type='application/x-et' data='../dzgw/zhengwen/editor/wps/normal.et'  width='" + objW + "'  height='" + objH + "'>");
                codes.push('<param name="quality" value="high" />');
                codes.push('<param name="bgcolor" value="#ffffff" />');
                codes.push('<param name="Enabled" value="1" />');
                codes.push('<param name="allowFullScreen" value="true" />');
                codes.push('</object>');
                html = codes.join("");
            }
        } else {
            if (ie) {
                var codes = [];
                codes.push('<object id=DocFrame height=' + objH + ' width=' + objW + ' ');
                codes.push('data=data:application/x-oleobject;base64,7Kd9juwHQ0OBQYiirbY6XwEABAA7DwMAAgAEAB0AAAADAAQAgICAAAQABAD///8ABQBcAFgAAABLAGkAbgBnAHMAbwBmAHQAIABBAGMAdABpAHYAZQBYACAARABvAGMAdQBtAGUAbgB0ACAARgByAGEAbQBlACAAQwBvAG4AdAByAG8AbAAgADEALgAwAAAA ');
                codes.push('classid=clsid:8E7DA7EC-07EC-4343-8141-88A2ADB63A5F viewastext=VIEWASTEXT></object> ');
                html = codes.join("");
            } else {
                html = "<object  name='webwps' id='DocFrame' type='application/x-wps'  data='/opt/kingsoft/wps-office/office6/mui/default/templates/Normal.dotm'  width='" + objW + "'  height='" + objH + "'> <param name='Enabled' value='1' />  </object>";
            }
        }
        iframe.innerHTML = html;
        _obj = document.getElementById('DocFrame');
        if (!ie && _obj) {
            if (!_obj) {
                alert('加载流式金山出错!');
            }
            window.onbeforeunload = function () {
                _obj.Application.Quit();
            };
            window.onresize = function () {
                _obj.sltReleaseKeyboard();
            };
        }
        return _obj;
    }

    function initF(fromUrl) {
        obj = init("wps", "100%", "100%");
        if (!ie && obj) {
            var Interval_control = setInterval(function () {
                app = obj.Application;
                if (app && app.IsLoad()) {
                    clearInterval(Interval_control);
                    app.openDocumentRemote(fromUrl, false)
                }
            }, 500);
        } else {
            app = obj;
            app.openDocumentRemote(fromUrl, false)
        }
    }

    export default {
        name: "wpsLinux",
        props: ["docData"],
        data() {
            return {
                wpsData: this.docData,
                fromUrl: "http://10.15.0.111:8085/wps/a.wpt",
                saveUrl: 'http://10.15.0.111:8085/wps/a.wpt',
                fields: [
                    {key: "各单位", value: "1111"},
                ]
            }
        },
        mounted() {
            /*初始化页面和打开文件在这写*/
            initF(this.fromUrl);
        },
        methods: {
            InitFrame: function () {
                obj = init("wps", "100%", "100%");
                if (!ie && obj) {
                    var Interval_control = setInterval(function () {
                        app = obj.Application;
                        if (app && app.IsLoad()) {
                            clearInterval(Interval_control);
                            app.createDocument("wps");
                        }
                    }, 500);
                } else {
                    app = obj;
                }
            },
            createDocument: function () {
                if (ie) {
                    app.createDocument("uot");
                } else {
                    app.createDocument("wps");
                }
            },
            openDocumentRemote: function () {
                app.openDocumentRemote("http://10.15.0.111:8085/wps/a.wpt", false);
            },
            setField() {
                for (let field of this.fields) {
                    app.setDocumentField(field.key, field.value);
                }
            },
            saveURL() {
                app.saveURL(this.saveUrl, "filename", function () {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    //回调
                });
            },
            printwps: function () {
                app.print();
            },
            closewps: function () {
                app.close();
            },
            closePage: function () {
                this.$confirm('确定要关闭页面?', '关闭', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.go(-1);
                    this.$message({
                        type: 'success',
                        message: '关闭页面!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .doc-wps {
        width: 95%;
        margin: 10px auto;
        min-height: 600px;
        background-color: beige;
    }

</style>
