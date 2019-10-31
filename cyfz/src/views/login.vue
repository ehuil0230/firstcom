<template>
    <div class="login-wrap">
        <el-container>
            <el-header>
                <div class="login-copyright"></div>
            </el-header>
            <el-main>
                <div class="login-bg">
                    <div class="login-panel">
                        <div class="login-panel-tip">
                            账号密码登录
                        </div>
                        <el-form :model="loginForm" :rules="rules" ref="loginForm">
                            <el-form-item prop="name">
                            <el-input
                                    placeholder="请输入用户名"
                                    v-model.trim="loginForm.name"
                                    @keyup.enter.native="sumitForm">
                                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                            </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                            <el-input
                                    type="password"
                                    placeholder="请输入密码"
                                    v-model.trim="loginForm.password"
                                    @keyup.enter.native="sumitForm">
                                <i slot="prefix" class="el-input__icon fa fa-lock"></i>
                            </el-input>
                            </el-form-item>
                        </el-form>
                        <div class="login-btn" @click="login"></div>
                    </div>
                </div>
            </el-main>
            <el-footer>
                <div class="login-link">
                    <el-link disabled>版权所有:中国软件与技术服务股份有限公司</el-link>
                    <br>
                    <el-link disabled>京ICP备05050114号 400-160-1670</el-link>
                </div>
            </el-footer>
        </el-container>
    </div>

</template>

<script>
    export default {
        name: "logining",
        data(){
            return{
                loginForm:{
                    name: "baiyu",
                    password:"12345678",
                },
                rules: {
                    name: [
                        {required: true, message: '账号不能为空', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            sumitForm: function () {
                this.login();
            },
            login: function () {
                const that = this;
                let userName = that.loginForm.name;
                let password = that.loginForm.password;
                // that.$router.replace('/');
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'post',
                            url: this.$api.login.login,
                            data: {
                                userName: userName,
                                userPwd: password
                            }
                        }).then(function (res) {
                            window.console.log(res);
                            if (res.info != null) {
                                if(res.info.state) {//登录错误情况
                                    switch (res.info.state) {
                                        case "1" :
                                            that.$message({
                                                type:"error",
                                                message: '账号状态异常，请联系管理员！'
                                            });
                                            break;
                                        case "2" :
                                            that.$message({
                                                type:"error",
                                                message: '账号不存在，请重新输入！'
                                            });
                                            break;
                                        case "3" :
                                            that.$message({
                                                type:"error",
                                                message: '登录错误次数超过过多，请稍后再试！'
                                            });
                                            break;
                                        case "4" :
                                            that.$message({
                                                type:"error",
                                                message: '密码错误，请重新输入！'
                                            });
                                            break;
                                        default : break;
                                    }
                                    return false;
                                }
                                const refreshToken = res.info.refreshToken;
                                const token = res.info.accessToken;
                                // axios.defaults.headers.common['Authorization'] = token;//请求token信息配置
                                localStorage.setItem("refreshToken", refreshToken);
                                localStorage.setItem("Authorization", token);
                                that.$axios({
                                    method: 'post',
                                    url: that.$api.login.getLoginUser,
                                    data: {}
                                }).then(function (res) {
                                    let orgName = res.info.orgName;
                                    let userName = res.info.userName;
                                    localStorage.setItem("orgName", orgName);
                                    localStorage.setItem("userName", userName);
                                    if (that.$route.query.redirect) {
                                        that.$router.replace(that.$route.query.redirect);
                                    } else {
                                        that.$router.replace('/');
                                    }
                                }).catch(function (error) {
                                    window.console.log(error);
                                });
                            } else {
                                that.$alert(res.msg,"系统异常，请联系管理员！",{});
                            }
                        }).catch(function (error) {
                            that.$alert(error.msg,"系统异常，请联系管理员！",{});
                        });
                    } else {
                        return false;
                    }
                });

            }
        }
    }
</script>

<style lang="less">
    .login-wrap{
        width: 100%;
        .el-header{
            padding: 0;
            position: relative;
        }
        .el-main{
            padding: 0;
            .login-panel-tip{
                /*margin-top: 20px;
                margin-left: 90px;*/
                width: 260px;
                text-align: center;
                position: absolute;
                top: 20px;
                right: 110px;
                font-size: 18px;
            }
            .el-form{
                width: 260px;
                position: absolute;
                top: 70px;
                right: 110px;
                .el-form-item{
                    margin-bottom: 18px;
                }
            }
        }
        .el-footer{
            text-align: center;
            padding: 0;
            .login-link{
                margin: 10px auto;
                .el-link.el-link--default.is-disabled{
                    color:#606266;
                }
            }
        }
    }

    .login-copyright{
        width: 400px;
        height: 60px;
        background-image: url(../assets/login/login_copyright.png);
        background-size: 89% 70%;
        background-repeat: no-repeat;
        position: absolute;
        top: 15px;
        left: 150px;
    }

    .login-bg{
        position: relative;
        width:100% ;
        /*height:600px;*/
        height:calc(100vh - 120px);
        background-color: #fff;
        background-image: url(../assets/login/login_bg.jpg);
        background-repeat: no-repeat;
        background-position:top left;
        background-size:100% 100%;
    }
    .login-panel{
        width: 400px;
        height: 400px;
        background-image: url(../assets/login/login_panel.png);
        background-size: 80% 80%;
        background-repeat: no-repeat;
        position: absolute;
        top: 14%;
        right: 6%;
        opacity: 0.8;
    }

    .login-btn{
        width: 400px;
        height: 60px;
        background-image: url(../assets/login/login_btn.png);
        background-size: 67% 77%;
        background-repeat: no-repeat;
        margin-left: 26px;
        margin-top: 200px;
    }

    .login-btn:hover{
        opacity: 0.6;
    }


</style>
