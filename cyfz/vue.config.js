'use strict'
const webpack = require('webpack');
module.exports = {
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,
    // 部署应用时的基本 URL
    publicPath:'/',
    //publicPath: process.env.NODE_ENV === 'production' ? '192.168.60.110:8080' : '192.168.60.110:8080',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    productionSourceMap: false,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
    //需要npm install style-resources-loader ; 然后执行 vue add style-resources-loader 选择预编译less
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: ['src/assets/common/css/theme.less']
        }
    },
    devServer: { //跨域
        port: "8089", //端口号
        // host: "localhost",
        open: true, //配置自动启动浏览器
        proxy: { // 配置跨域处理 可以设置多个
            '/axios': {
                // target: 'http://10.15.255.12:9000/',
                // target: 'http://10.15.8.192:8083/',// 朱越跨域信息
                target: 'http://10.15.8.194:8083/',// 朱越跨域信息
                // target: 'http://10.15.255.216:8083/',// 阳志安跨域信息
                // target: 'http://10.15.255.217:8083/',// 汪兴池跨域信息
                // target: 'http://192.168.100.217:9000/',// 郭海汪兴池部署环境
                changeOrigin: true,
                secure: false, // 如果是https接口，需要配置这个参数
                pathRewrite: {
                    '^/axios': ''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery",
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js'
            })
        ]
    }
}
