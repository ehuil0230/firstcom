import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

//表格数据
const postData = function(req) {
    let listData=[];

    for (let i = 1; i < 11; i++) {
        let post = {
            name: '企业名称'+i, // 企业名称
            dinamico:Random.paragraph(1, 2), // 企业动态
        }

        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        info:{list:listData}
    }
}
Mock.mock(`${domain}/getguganqiyefenxiData`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据

// 柱形图1
const postData1 = function(req) {
    let listData=[];
    for (let i = 1; i < 11; i++) {
        let post = {
            dinamico:Random.float(0, 50, 0, 2), // 金额
            name: '企业名称'+i, // 企业名称

        }
        listData.push(post);
    }
    let xData = [];
    let yData = [];
    for (let item of listData){
        xData.push(item.name);
        yData.push(item.dinamico);
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{
            xData:xData,
            yData:yData,
        }
    }
}
Mock.mock(`${domain}/getzhuxingtu1Data`, /get|post/i, postData1); // 定义请求链接，类型，还有返回数据
// 柱形图2
const postData2 = function(req) {
    let listData=[];
    for (let i = 1; i < 11; i++) {
        let post = {
            dinamico:Random.float(0, 50, 0, 2), // 金额
            name: '企业名称'+i, // 企业名称

        }
        listData.push(post);
    }
    let xData = [];
    let yData = [];
    for (let item of listData){
        xData.push(item.name);
        yData.push(item.dinamico);
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{
            xData:xData,
            yData:yData,
        }
    }
}
Mock.mock(`${domain}/getzhuxingtu2Data`, /get|post/i, postData2); // 定义请求链接，类型，还有返回数据
// 柱形图3
const postData3 = function(req) {
    let listData=[];
    for (let i = 1; i < 11; i++) {
        let post = {
            dinamico:Random.float(0, 50, 0, 2), // 金额
            name: '企业名称'+i, // 企业名称

        }
        listData.push(post);
    }
    let xData = [];
    let yData = [];
    for (let item of listData){
        xData.push(item.name);
        yData.push(item.dinamico);
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{
            xData:xData,
            yData:yData,
        }
    }
}
Mock.mock(`${domain}/getzhuxingtu3Data`, /get|post/i, postData3); // 定义请求链接，类型，还有返回数据
// 柱形图4
const postData4 = function(req) {
    let listData=[];
    for (let i = 1; i < 11; i++) {
        let post = {
            dinamico :Random.float(0, 50, 0, 2), // 金额
            name: '企业名称'+i, // 企业名称

        }
        listData.push(post);
    }
    let xData = [];
    let yData = [];
    for (let item of listData){
        xData.push(item.name);
        yData.push(item.dinamico);
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{
            xData:xData,
            yData:yData,
        }
    }
}
Mock.mock(`${domain}/getzhuxingtu4Data`, /get|post/i, postData4); // 定义请求链接，类型，还有返回数据